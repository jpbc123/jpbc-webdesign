import Link from "next/link";
import { adminHref, requireOwner } from "@/lib/admin";
import { rm, unpaidMonths, type Client, type Payment } from "@/lib/billing";

export const metadata = { title: "Clients" };

const STATUS_COLOURS: Record<Client["status"], string> = {
  active: "bg-[#dcfce7] text-[#166534]",
  lead: "bg-[#dbeafe] text-[#1e40af]",
  paused: "bg-[#fef3c7] text-[#92400e]",
  ended: "bg-surface-2 text-muted ring-1 ring-line",
};

export default async function ClientsPage() {
  const { supabase } = await requireOwner();
  const [{ data: clients }, { data: payments }] = await Promise.all([
    supabase.from("clients").select("*").order("business_name"),
    supabase.from("payments").select("id, client_id, months, paid_on"),
  ]);
  const allPayments = (payments ?? []) as Payment[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="display text-3xl text-ink">Clients</h1>
        <Link href={adminHref("/clients/new")} className="btn btn-primary">
          Add client
        </Link>
      </div>

      {!clients?.length ? (
        <p className="text-muted">No clients yet.</p>
      ) : (
        <ul className="card divide-y divide-line">
          {(clients as Client[]).map((c) => {
            const owed = unpaidMonths(c, allPayments);
            return (
              <li key={c.id}>
                <Link href={adminHref(`/clients/${c.id}`)} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-surface-2">
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{c.business_name}</span>
                    <span className="block text-sm text-muted">
                      {[c.contact_name, c.site_url?.replace(/^https?:\/\//, "")].filter(Boolean).join(" · ") || "—"}
                    </span>
                  </span>
                  <span className="text-sm text-muted">{c.monthly_fee ? `${rm(c.monthly_fee)}/mo` : ""}</span>
                  {owed.length > 0 && (
                    <span className="text-sm font-bold text-red-600 dark:text-red-400">owes {rm(owed.length * Number(c.monthly_fee))}</span>
                  )}
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLOURS[c.status]}`}>{c.status}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
