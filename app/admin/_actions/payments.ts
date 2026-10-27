"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/admin";
import { RECEIPTS_BUCKET } from "@/lib/supabase/browser";
import { addMonths, monthKey } from "@/lib/billing";
import { createDocument } from "./invoices";

export type PaymentFormState = { error?: string; ok?: number };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Saves a new record: either money already received ("paid"), or an amount
 * still to come ("unpaid"), which is what an invoice is issued for.
 */
export async function savePayment(_prev: PaymentFormState, fd: FormData): Promise<PaymentFormState> {
  const { supabase } = await requireOwner();
  const clientId = String(fd.get("client_id") ?? "");
  const paid = fd.get("status") !== "unpaid";
  const amount = Number(fd.get("amount"));
  const paidOn = String(fd.get("paid_on") ?? "");
  const issuedOn = String(fd.get("issued_on") ?? "");
  const dueOn = String(fd.get("due_on") ?? "");
  const fromMonth = String(fd.get("from_month") ?? "");
  const count = Number(fd.get("month_count") ?? 1);
  const receiptPath = String(fd.get("receipt_path") ?? "") || null;

  if (!clientId) return { error: "Pick a client." };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Enter the amount." };
  if (paid && !DATE.test(paidOn)) return { error: "Enter the date it was paid." };
  if (!paid && !DATE.test(issuedOn)) return { error: "Enter the invoice date." };
  if (!paid && dueOn && !DATE.test(dueOn)) return { error: "Enter a valid due date." };
  if (!/^\d{4}-\d{2}/.test(fromMonth) || !Number.isInteger(count) || count < 0 || count > 36)
    return { error: "Pick which months this covers (0–36)." };

  const months = Array.from({ length: count }, (_, i) => addMonths(monthKey(fromMonth), i));
  const invoiceNo = String(fd.get("invoice_no") ?? "").trim() || null;

  const { data: row, error } = await supabase.from("payments").insert({
    client_id: clientId,
    amount,
    paid_on: paid ? paidOn : null,
    issued_on: paid ? paidOn : issuedOn,
    due_on: paid ? null : dueOn || null,
    months,
    method: paid ? String(fd.get("method") ?? "").trim() || null : null,
    invoice_no: invoiceNo,
    notes: String(fd.get("notes") ?? "").trim() || null,
    item_title: String(fd.get("item_title") ?? "").trim() || null,
    item_details: String(fd.get("item_details") ?? "").trim() || null,
    receipt_path: receiptPath,
  }).select("id").single();
  if (error) {
    if (receiptPath) await supabase.storage.from(RECEIPTS_BUCKET).remove([receiptPath]);
    return { error: error.code === "23505" ? `Invoice number ${invoiceNo} is already used.` : `Could not save: ${error.message}` };
  }

  // An unpaid record exists to be invoiced, so make the invoice straight away.
  if (!paid) {
    const docError = await createDocument(row.id, "invoice");
    if (docError) return { ok: Date.now(), error: `Saved, but the invoice PDF failed: ${docError} Use "Create invoice" on the record to retry.` };
  }

  revalidatePath("/admin", "layout");
  return { ok: Date.now() };
}

/** Records that an invoiced amount has arrived: date, method and optional proof. */
export async function markPaid(_prev: PaymentFormState, fd: FormData): Promise<PaymentFormState> {
  const { supabase } = await requireOwner();
  const id = String(fd.get("payment_id") ?? "");
  const paidOn = String(fd.get("paid_on") ?? "");
  const receiptPath = String(fd.get("receipt_path") ?? "") || null;
  if (!id) return { error: "Missing payment." };
  if (!DATE.test(paidOn)) return { error: "Enter the date it was paid." };

  const { error } = await supabase
    .from("payments")
    .update({
      paid_on: paidOn,
      method: String(fd.get("method") ?? "").trim() || null,
      ...(receiptPath ? { receipt_path: receiptPath } : {}),
    })
    .eq("id", id)
    .is("paid_on", null);
  if (error) {
    if (receiptPath) await supabase.storage.from(RECEIPTS_BUCKET).remove([receiptPath]);
    return { error: `Could not save: ${error.message}` };
  }
  revalidatePath("/admin", "layout");
  return { ok: Date.now() };
}

/** Attach (or replace) the payment proof on an existing payment. */
export async function attachReceipt(paymentId: string, path: string) {
  const { supabase } = await requireOwner();
  const { data: old } = await supabase.from("payments").select("receipt_path").eq("id", paymentId).single();
  const { error } = await supabase.from("payments").update({ receipt_path: path }).eq("id", paymentId);
  if (error) {
    await supabase.storage.from(RECEIPTS_BUCKET).remove([path]);
    throw new Error(error.message);
  }
  if (old?.receipt_path && old.receipt_path !== path) await supabase.storage.from(RECEIPTS_BUCKET).remove([old.receipt_path]);
  revalidatePath("/admin", "layout");
}

export async function deletePayment(paymentId: string) {
  const { supabase } = await requireOwner();
  const { data } = await supabase.from("payments").select("receipt_path, invoice_path, receipt_pdf_path").eq("id", paymentId).single();
  await supabase.from("payments").delete().eq("id", paymentId);
  const files = [data?.receipt_path, data?.invoice_path, data?.receipt_pdf_path].filter((p): p is string => Boolean(p));
  if (files.length) await supabase.storage.from(RECEIPTS_BUCKET).remove(files);
  revalidatePath("/admin", "layout");
}
