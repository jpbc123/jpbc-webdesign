import Link from "next/link";
import { adminHref, requireOwner } from "@/lib/admin";
import { dateLabel, monthLabel, rm, todayKL, unpaidMonths, type Client, type Payment } from "@/lib/billing";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const { supabase } = await requireOwner();
  const [{ data: clients }, { data: payments }] = await Promise.all([
    supabase.from("clients").select("*").order("business_name"),
    supabase.from("payments").select("*").order("paid_on", { ascending: false }),
  ]);
  const allClients = (clients ?? []) as Client[];
  const allPayments = (payments ?? []) as Payment[];
  const today = todayKL();
  const thisMonth = today.slice(0, 7);
  const thisYear = today.slice(0, 4);

  const owing = allClients
    .map((c) => ({ client: c, months: unpaidMonths(c, allPayments, today) }))
    .filter((o) => o.months.length > 0);
  const totalOwed = owing.reduce((sum, o) => sum + o.months.length * Number(o.client.monthly_fee), 0);
  const sumWhere = (pred: (p: Payment) => boolean) => allPayments.filter(pred).reduce((s, p) => s + Number(p.amount), 0);
  const active = allClients.filter((c) => c.status === "active");
  const monthlyRun = active.reduce((s, c) => s + Number(c.monthly_fee ?? 0), 0);
  const names = new Map(allClients.map((c) => [c.id, c.business_name]));

  const stats = [
    { label: "Owed now", value: rm(totalOwed), tone: totalOwed > 0 ? "text-red-600 dark:text-red-400" : "text-ink" },
    { label: "Received this month", value: rm(sumWhere((p) => p.paid_on.startsWith(thisMonth))), tone: "text-ink" },
    { label: `Received in ${thisYear}`, value: rm(sumWhere((p) => p.paid_on.startsWith(thisYear))), tone: "text-ink" },
    { label: `${active.length} active client${active.length === 1 ? "" : "s"}`, value: `${rm(monthlyRun)}/mo`, tone: "text-ink" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="display text-3xl text-ink">Dashboard</h1>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className={`mt-1 text-2xl font-extrabold tracking-tight ${s.tone}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h2 className="text-lg font-bold text-ink">Who owes</h2>
        {owing.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Everyone is paid up to {monthLabel(`${thisMonth}-01`)}.</p>
        ) : (
          <ul className="card mt-3 divide-y divide-line">
            {owing.map(({ client, months }) => (
              <li key={client.id}>
                <Link href={adminHref(`/clients/${client.id}`)} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 hover:bg-surface-2">
                  <span className="font-semibold text-ink">{client.business_name}</span>
                  <span className="text-sm text-muted">{months.map(monthLabel).join(", ")}</span>
                  <span className="font-bold text-red-600 dark:text-red-400">{rm(months.length * Number(client.monthly_fee))}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-ink">Latest payments</h2>
          <Link href={adminHref("/payments")} className="text-sm font-semibold text-accent-text hover:underline">
            All payments
          </Link>
        </div>
        {allPayments.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No payments recorded yet.</p>
        ) : (
          <ul className="card mt-3 divide-y divide-line">
            {allPayments.slice(0, 5).map((p) => (
              <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3 text-sm">
                <Link href={adminHref(`/clients/${p.client_id}`)} className="font-semibold text-ink hover:text-accent-text">
                  {names.get(p.client_id) ?? "Unknown client"}
                </Link>
                <span className="text-muted">{dateLabel(p.paid_on)}</span>
                <span className="font-bold text-ink">{rm(p.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {allClients.length === 0 && (
        <p>
          <Link href={adminHref("/clients/new")} className="btn btn-primary">
            Add your first client
          </Link>
        </p>
      )}
    </div>
  );
}
