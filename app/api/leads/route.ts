import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { markets, DEFAULT_MARKET_CODE } from "@/config/markets";
import type { MarketCode } from "@/config/markets/types";
import { isValidPhone, normalisePhone } from "@/lib/market";

// Lead capture: stores every submission as a JSON line in .data/leads.jsonl
// AND forwards it to the webhook in LEAD_WEBHOOK_URL (if set) so leads pipe
// to WhatsApp/Sheets/Zapier. Swap the file store for Supabase later if needed.
//
// Forms post the market they were submitted from, so the phone number is
// validated against that market's rule and stored in international format.

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "leads.jsonl");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = (typeof body.market === "string" ? body.market : DEFAULT_MARKET_CODE) as MarketCode;
  const market = markets[code] ?? markets[DEFAULT_MARKET_CODE];

  const phone = typeof body.phone === "string" ? body.phone : "";
  if (!isValidPhone(market, phone)) {
    return NextResponse.json({ error: `Invalid ${market.label} phone number` }, { status: 400 });
  }

  // Keep only expected string fields, capped in length — never store raw junk.
  const allowed = ["type", "name", "business", "industry", "website", "package", "need"] as const;
  const lead: Record<string, string> = {
    receivedAt: new Date().toISOString(),
    market: market.code,
    phone: normalisePhone(market, phone),
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
