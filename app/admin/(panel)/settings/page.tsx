import { SettingsForm } from "@/components/admin/settings-form";
import { requireOwner } from "@/lib/admin";
import type { Settings } from "@/lib/billing";

export const metadata = { title: "Settings" };

/** Seller details printed at the top of every invoice. */
export default async function SettingsPage() {
  const { supabase } = await requireOwner();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-3xl text-ink">Settings</h1>
        <p className="mt-2 text-muted">Your details as they appear on invoices. Changes apply to invoices you create or remake from now on.</p>
      </div>
      {data ? (
        <SettingsForm settings={data as Settings} />
      ) : (
        <p className="rounded-xl bg-[#fef3c7] p-4 text-sm text-[#92400e]">
          Run <code>supabase/migrations/0002_jpbc_invoices.sql</code> in the Supabase SQL editor first.
        </p>
      )}
    </div>
  );
}
