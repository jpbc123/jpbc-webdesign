"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminHref, requireOwner } from "@/lib/admin";
import { monthKey, STATUSES, type ClientStatus } from "@/lib/billing";

export type ClientFormState = { error?: string };

const text = (fd: FormData, key: string) => {
  const v = String(fd.get(key) ?? "").trim();
  return v === "" ? null : v;
};

export async function saveClient(_prev: ClientFormState, fd: FormData): Promise<ClientFormState> {
  const { supabase } = await requireOwner();
  const id = text(fd, "id");

  const businessName = text(fd, "business_name");
  if (!businessName) return { error: "Business name is required." };

  const feeRaw = text(fd, "monthly_fee");
  const fee = feeRaw === null ? null : Number(feeRaw);
  if (fee !== null && (!Number.isFinite(fee) || fee < 0)) return { error: "Monthly fee must be a number." };

  const status = (text(fd, "status") ?? "active") as ClientStatus;
  if (!STATUSES.includes(status)) return { error: "Pick a valid status." };

  const billingStart = text(fd, "billing_start");

  const row = {
    business_name: businessName,
    contact_name: text(fd, "contact_name"),
    phone: text(fd, "phone"),
    email: text(fd, "email"),
    ssm_no: text(fd, "ssm_no"),
    domains: text(fd, "domains"),
    site_url: text(fd, "site_url"),
    hosting: text(fd, "hosting"),
    plan: text(fd, "plan"),
    monthly_fee: fee,
    billing_start: billingStart ? monthKey(billingStart) : null,
    status,
    notes: text(fd, "notes"),
    address: text(fd, "address"),
    agreement_date: text(fd, "agreement_date"),
    invoice_item: text(fd, "invoice_item"),
  };

  const { data, error } = id
    ? await supabase.from("clients").update(row).eq("id", id).select("id").single()
    : await supabase.from("clients").insert(row).select("id").single();
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/admin", "layout");
  redirect(adminHref(`/clients/${data.id}`));
}

export async function deleteClient(id: string) {
  const { supabase } = await requireOwner();
  const { count } = await supabase.from("payments").select("id", { count: "exact", head: true }).eq("client_id", id);
  // Payment history is the record of who paid; never wipe it with the client.
  if (count) redirect(adminHref(`/clients/${id}?error=has-payments`));
  await supabase.from("clients").delete().eq("id", id);
  revalidatePath("/admin", "layout");
  redirect(adminHref("/clients"));
}
