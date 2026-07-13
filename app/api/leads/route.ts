import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { isValidMalaysianPhone, normalisePhone } from "@/lib/site";

// Lead capture: stores every submission as a JSON line in .data/leads.jsonl
// AND forwards it to the webhook in LEAD_WEBHOOK_URL (if set) so leads pipe
// to WhatsApp/Sheets/Zapier. Swap the file store for Supabase later if needed.

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "leads.jsonl");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? body.phone : "";
  if (!isValidMalaysianPhone(phone)) {
    return NextResponse.json({ error: "Invalid Malaysian phone number" }, { status: 400 });
  }

  // Keep only expected string fields, capped in length — never store raw junk.
  const allowed = ["type", "name", "business", "industry", "website", "package", "need"] as const;
  const lead: Record<string, string> = {
    receivedAt: new Date().toISOString(),
    phone: normalisePhone(phone),
  };
  for (const key of allowed) {
    const val = body[key];
    if (typeof val === "string" && val.trim()) lead[key] = val.trim().slice(0, 2000);
  }

  try {
    await mkdir(STORE_DIR, { recursive: true });
    await appendFile(STORE_FILE, JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    console.error("Lead store failed:", err);
    return NextResponse.json({ error: "Storage failed" }, { status: 500 });
  }

  // Forward to webhook (best-effort — the lead is already saved locally)
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("Lead webhook failed (lead still saved):", err);
    }
  }

  return NextResponse.json({ ok: true });
}
