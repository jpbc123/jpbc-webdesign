"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/admin";

export type SettingsFormState = { error?: string; ok?: number };

const text = (fd: FormData, key: string) => {
  const v = String(fd.get(key) ?? "").trim();
  return v === "" ? null : v;
};

export async function saveSettings(_prev: SettingsFormState, fd: FormData): Promise<SettingsFormState> {
  const { supabase } = await requireOwner();
  const tradingName = text(fd, "trading_name");
  if (!tradingName) return { error: "Business name is required." };

  const { error } = await supabase
    .from("settings")
    .update({
      trading_name: tradingName,
      website: text(fd, "website"),
      operator_name: text(fd, "operator_name"),
      reg_no: text(fd, "reg_no"),
      address: text(fd, "address"),
      phone: text(fd, "phone"),
      bank_details: text(fd, "bank_details"),
      invoice_notes: text(fd, "invoice_notes"),
    })
    .eq("id", 1);
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/admin", "layout");
  return { ok: Date.now() };
}
