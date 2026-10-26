import Link from "next/link";
import { adminHref, requireOwner } from "@/lib/admin";
import { dateLabel, monthLabel, rm, type Payment } from "@/lib/billing";

export const metadata = { title: "Payments" };

/** Every payment, newest first, grouped by the month it was received. */
export default async function PaymentsPage() {
  const { supabase } = await requireOwner();
  const [{ data: payments }, { data: clients }] = await Promise.all([
    supabase.from("payments").select("*").order("paid_on", { ascending: false }),
    supabase.from("clients").select("id, business_name"),
  ]);
  const names = new Map((clients ?? []).map((c) => [c.id as string, c.business_name as string]));

  const groups = new Map<string, Payment[]>();
  for (const p of (payments ?? []) as Payment[]) {
    const key = `${p.paid_on.slice(0, 7)}-01`;
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }

  return (
    <div className="space-y-8">
      <h1 className="display text-3xl text-ink">Payments</h1>
      {groups.size === 0 && <p className="text-muted">No payments recorded yet. Record them from a client&apos;s page.</p>}
      {[...groups].map(([month, list]) => (
        <section key={month}>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-ink">{monthLabel(month)}</h2>
            <span className="text-sm font-bold text-ink">{rm(list.reduce((s, p) => s + Number(p.amount), 0))}</span>
          </div>
          <ul className="card mt-3 divide-y divide-line">
            {list.map((p) => (
              <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3 text-sm">
                <Link href={adminHref(`/clients/${p.client_id}`)} className="font-semibold text-ink hover:text-accent-text">
                  {names.get(p.client_id) ?? "Unknown client"}
                </Link>
                <span className="text-muted">
                  {dateLabel(p.paid_on)}
                  {p.invoice_no ? ` · ${p.invoice_no}` : ""}
                  {p.receipt_path ? "" : " · no proof"}
                </span>
                <span className="font-bold text-ink">{rm(p.amount)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
