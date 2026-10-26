"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/admin";
import { RECEIPTS_BUCKET } from "@/lib/supabase/browser";
import { buildInvoicePdf } from "@/lib/invoice-pdf";
import type { Client, Payment, Settings } from "@/lib/billing";

/**
 * Makes (or remakes) the invoice PDF for a payment and stores it in the private
 * bucket. A payment without an invoice number gets the next INV-YYYYMMDD-NNN
 * for its paid-on date. Returns an error message, or null on success.
 */
export async function createInvoice(paymentId: string): Promise<string | null> {
  const { supabase } = await requireOwner();

  const { data: payment } = await supabase.from("payments").select("*").eq("id", paymentId).maybeSingle();
  if (!payment) return "Payment not found.";
  const p = payment as Payment;
  const [{ data: client }, { data: settings }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", p.client_id).single(),
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (!client) return "Client not found.";
  if (!settings) return "Seller details are missing: run supabase/migrations/0002_jpbc_invoices.sql first.";

  let invoiceNo = p.invoice_no;
  if (!invoiceNo) {
    const prefix = `INV-${p.paid_on.replaceAll("-", "")}-`;
    const { data: taken } = await supabase.from("payments").select("invoice_no").like("invoice_no", `${prefix}%`);
    const used = new Set((taken ?? []).map((t) => t.invoice_no as string));
    let n = 1;
    while (used.has(`${prefix}${String(n).padStart(3, "0")}`)) n++;
    invoiceNo = `${prefix}${String(n).padStart(3, "0")}`;
  }

  const pdf = await buildInvoicePdf({ invoiceNo, payment: p, client: client as Client, settings: settings as Settings });
  const path = `${p.client_id}/invoices/${invoiceNo.replace(/[^A-Za-z0-9-]/g, "_")}.pdf`;
  const { error: upErr } = await supabase.storage
    .from(RECEIPTS_BUCKET)
    .upload(path, pdf, { contentType: "application/pdf", upsert: true });
  if (upErr) return `Could not store the PDF: ${upErr.message}`;

  const { error } = await supabase.from("payments").update({ invoice_no: invoiceNo, invoice_path: path }).eq("id", p.id);
  if (error) return error.code === "23505" ? `Invoice number ${invoiceNo} is already used.` : `Could not save: ${error.message}`;
  if (p.invoice_path && p.invoice_path !== path) await supabase.storage.from(RECEIPTS_BUCKET).remove([p.invoice_path]);

  revalidatePath("/admin", "layout");
  return null;
}
