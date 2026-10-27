"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/admin";
import { RECEIPTS_BUCKET } from "@/lib/supabase/browser";
import { buildInvoicePdf, type DocKind } from "@/lib/invoice-pdf";
import type { Client, Payment, Settings } from "@/lib/billing";

// Per kind: number prefix, the columns it is stored in and its storage folder.
const DOCS = {
  invoice: { prefix: "INV", noCol: "invoice_no", pathCol: "invoice_path", folder: "invoices" },
  receipt: { prefix: "OR", noCol: "receipt_no", pathCol: "receipt_pdf_path", folder: "receipts" },
} as const;

/**
 * Makes (or remakes) the invoice or official receipt PDF for a payment record
 * and stores it in the private bucket. Without a number yet, an invoice gets the
 * next INV-YYYYMMDD-NNN for its invoice date and a receipt the next
 * OR-YYYYMMDD-NNN for its paid date. Returns an error message, or null on success.
 */
export async function createDocument(paymentId: string, kind: DocKind): Promise<string | null> {
  const { supabase } = await requireOwner();
  const d = DOCS[kind];

  const { data: payment } = await supabase.from("payments").select("*").eq("id", paymentId).maybeSingle();
  if (!payment) return "Payment not found.";
  const p = payment as Payment;
  if (kind === "receipt" && !p.paid_on) return "Mark this as paid before making the official receipt.";
  const [{ data: client }, { data: settings }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", p.client_id).single(),
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (!client) return "Client not found.";
  if (!settings) return "Seller details are missing: run supabase/migrations/0002_jpbc_invoices.sql first.";

  let docNo = p[d.noCol];
  if (!docNo) {
    const date = kind === "receipt" ? p.paid_on! : p.issued_on;
    const prefix = `${d.prefix}-${date.replaceAll("-", "")}-`;
    const { data: taken } = await supabase.from("payments").select(d.noCol).like(d.noCol, `${prefix}%`);
    const used = new Set((taken ?? []).map((t) => (t as Record<string, string>)[d.noCol]));
    let n = 1;
    while (used.has(`${prefix}${String(n).padStart(3, "0")}`)) n++;
    docNo = `${prefix}${String(n).padStart(3, "0")}`;
  }

  const pdf = await buildInvoicePdf({ kind, docNo, payment: p, client: client as Client, settings: settings as Settings });
  const path = `${p.client_id}/${d.folder}/${docNo.replace(/[^A-Za-z0-9-]/g, "_")}.pdf`;
  const { error: upErr } = await supabase.storage
    .from(RECEIPTS_BUCKET)
    .upload(path, pdf, { contentType: "application/pdf", upsert: true });
  if (upErr) return `Could not store the PDF: ${upErr.message}`;

  const { error } = await supabase.from("payments").update({ [d.noCol]: docNo, [d.pathCol]: path }).eq("id", p.id);
  if (error) return error.code === "23505" ? `Number ${docNo} is already used.` : `Could not save: ${error.message}`;
  const old = p[d.pathCol];
  if (old && old !== path) await supabase.storage.from(RECEIPTS_BUCKET).remove([old]);

  revalidatePath("/admin", "layout");
  return null;
}
