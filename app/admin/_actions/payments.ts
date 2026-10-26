"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/admin";
import { RECEIPTS_BUCKET } from "@/lib/supabase/browser";
import { addMonths, monthKey } from "@/lib/billing";

export type PaymentFormState = { error?: string; ok?: number };

export async function savePayment(_prev: PaymentFormState, fd: FormData): Promise<PaymentFormState> {
  const { supabase } = await requireOwner();
  const clientId = String(fd.get("client_id") ?? "");
  const amount = Number(fd.get("amount"));
  const paidOn = String(fd.get("paid_on") ?? "");
  const fromMonth = String(fd.get("from_month") ?? "");
  const count = Number(fd.get("month_count") ?? 1);
  const receiptPath = String(fd.get("receipt_path") ?? "") || null;

  if (!clientId) return { error: "Missing client." };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Enter the amount received." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paidOn)) return { error: "Enter the date it was paid." };
  if (!/^\d{4}-\d{2}/.test(fromMonth) || !Number.isInteger(count) || count < 0 || count > 36)
    return { error: "Pick which months this covers (0–36)." };

  const months = Array.from({ length: count }, (_, i) => addMonths(monthKey(fromMonth), i));
  const invoiceNo = String(fd.get("invoice_no") ?? "").trim() || null;

  const { error } = await supabase.from("payments").insert({
    client_id: clientId,
    amount,
    paid_on: paidOn,
    months,
    method: String(fd.get("method") ?? "").trim() || null,
    invoice_no: invoiceNo,
    notes: String(fd.get("notes") ?? "").trim() || null,
    item_title: String(fd.get("item_title") ?? "").trim() || null,
    item_details: String(fd.get("item_details") ?? "").trim() || null,
    receipt_path: receiptPath,
  });
  if (error) {
    if (receiptPath) await supabase.storage.from(RECEIPTS_BUCKET).remove([receiptPath]);
    return { error: error.code === "23505" ? `Invoice number ${invoiceNo} is already used.` : `Could not save: ${error.message}` };
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
  const { data } = await supabase.from("payments").select("receipt_path, invoice_path").eq("id", paymentId).single();
  await supabase.from("payments").delete().eq("id", paymentId);
  const files = [data?.receipt_path, data?.invoice_path].filter((p): p is string => Boolean(p));
  if (files.length) await supabase.storage.from(RECEIPTS_BUCKET).remove(files);
  revalidatePath("/admin", "layout");
}
