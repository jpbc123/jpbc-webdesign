import { RecordPaymentButton } from "@/components/admin/payment-form";
import { PaymentsTable } from "@/components/admin/payments-table";
import { requireOwner } from "@/lib/admin";
import { monthLabel, nextUnpaidMonth, rm, todayKL, type Client, type Payment } from "@/lib/billing";

export const metadata = { title: "Payments" };

/** Invoices awaiting payment first, then every payment, newest first, grouped by the month it was received. */
export default async function PaymentsPage() {
  const { supabase } = await requireOwner();
  const [{ data: payments }, { data: clients }] = await Promise.all([
    supabase.from("payments").select("*").order("issued_on", { ascending: false }),
    supabase.from("clients").select("*").order("business_name"),
  ]);
  const all = (payments ?? []) as Payment[];
  const allClients = (clients ?? []) as Client[];
  const names = new Map(allClients.map((c) => [c.id, c.business_name]));
  const today = todayKL();

  const awaiting = all.filter((p) => !p.paid_on).sort((a, b) => (a.due_on ?? a.issued_on).localeCompare(b.due_on ?? b.issued_on));
  const groups = new Map<string, Payment[]>();
  for (const p of all.filter((p) => p.paid_on).sort((a, b) => b.paid_on!.localeCompare(a.paid_on!))) {
    const key = `${p.paid_on!.slice(0, 7)}-01`;
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="display text-3xl text-ink">Payments</h1>
        {allClients.length > 0 && (
          <RecordPaymentButton
            label="+ Add payment record"
            clients={allClients
              .filter((c) => c.status !== "ended")
              .map((c) => ({ id: c.id, business_name: c.business_name, monthly_fee: c.monthly_fee, next_from: nextUnpaidMonth(c, all, today) }))}
            today={today}
          />
        )}
      </div>
      {all.length === 0 && <p className="text-muted">No payments recorded yet.</p>}

      {awaiting.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-ink">Awaiting payment</h2>
            <span className="text-sm font-bold text-ink">{rm(awaiting.reduce((s, p) => s + Number(p.amount), 0))}</span>
          </div>
          <div className="mt-3">
            <PaymentsTable payments={awaiting} today={today} names={names} />
          </div>
        </section>
      )}

      {[...groups].map(([month, list]) => (
        <section key={month}>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-ink">{monthLabel(month)}</h2>
            <span className="text-sm font-bold text-ink">{rm(list.reduce((s, p) => s + Number(p.amount), 0))}</span>
          </div>
          <div className="mt-3">
            <PaymentsTable payments={list} today={today} names={names} />
          </div>
        </section>
      ))}
    </div>
  );
}
