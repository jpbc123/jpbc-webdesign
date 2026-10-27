"use client";

import { useState } from "react";
import { markPaid, savePayment, type PaymentFormState } from "@/app/admin/_actions/payments";
import { addDays, METHODS } from "@/lib/billing";
import { Modal } from "./modal";
import { inputCls, labelCls } from "./ui";
import { uploadReceipt } from "./receipt-upload";

/** A client as the payment form needs it: who, the usual fee and the next month to bill. */
export type PaymentClient = { id: string; business_name: string; monthly_fee: number | null; next_from: string };

const fileCls =
  "block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:font-semibold file:text-accent-text";

/** Uploads the optional proof first (it needs the client's folder), then runs the action. */
async function submitWithProof(
  fd: FormData,
  clientId: string,
  action: (prev: PaymentFormState, fd: FormData) => Promise<PaymentFormState>,
): Promise<PaymentFormState> {
  try {
    const file = fd.get("receipt") as File | null;
    fd.delete("receipt");
    if (file && file.size > 0) fd.set("receipt_path", await uploadReceipt(clientId, file));
    return await action({}, fd);
  } catch (err) {
    return { error: `Upload failed: ${(err as Error).message}` };
  }
}

function PaidFields({ today, idPrefix }: { today: string; idPrefix: string }) {
  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}paid_on`} className={labelCls}>
          Paid on *
        </label>
        <input id={`${idPrefix}paid_on`} name="paid_on" type="date" required defaultValue={today} className={inputCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}method`} className={labelCls}>
          Method
        </label>
        <select id={`${idPrefix}method`} name="method" defaultValue="Bank transfer" className={inputCls}>
          {METHODS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}receipt`} className={labelCls}>
          Payment proof (image or PDF)
        </label>
        <input id={`${idPrefix}receipt`} name="receipt" type="file" accept="image/*,application/pdf" className={fileCls} />
      </div>
    </>
  );
}

/**
 * Records a payment, or an amount still to come that an invoice is issued for.
 * With one client it is fixed; with several, a dropdown picks who it's for.
 */
export function PaymentForm({ clients, today, onDone }: { clients: PaymentClient[]; today: string; onDone?: () => void }) {
  const single = clients.length === 1 ? clients[0] : null;
  const [clientId, setClientId] = useState(single?.id ?? "");
  const [paid, setPaid] = useState(true);
  const [state, setState] = useState<PaymentFormState>({});
  const [pending, setPending] = useState(false);
  const client = clients.find((c) => c.id === clientId);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!clientId) return setState({ error: "Pick a client." });
    setPending(true);
    const result = await submitWithProof(new FormData(form), clientId, savePayment);
    setPending(false);
    setState(result);
    if (result.ok) {
      if (result.error) alert(result.error);
      setState({});
      form.reset();
      setPaid(true);
      if (!single) setClientId("");
      onDone?.();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="client_id" value={clientId} />
      {!single && (
        <div>
          <label htmlFor="pay-client" className={labelCls}>
            Client *
          </label>
          <select id="pay-client" required value={clientId} onChange={(e) => setClientId(e.target.value)} className={inputCls}>
            <option value="">Choose a client…</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.business_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <fieldset>
        <legend className={labelCls}>Status</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
          <label className="flex items-center gap-2">
            <input type="radio" name="status" value="paid" checked={paid} onChange={() => setPaid(true)} />
            Paid: money received
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="status" value="unpaid" checked={!paid} onChange={() => setPaid(false)} />
            Not paid yet: issue an invoice
          </label>
        </div>
      </fieldset>

      {/* Keyed by client so the amount and months refill with that client's defaults. */}
      <div key={clientId} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className={labelCls}>
            Amount (RM) *
          </label>
          <input id="amount" name="amount" type="number" step="0.01" min="0" required defaultValue={client?.monthly_fee ?? ""} className={inputCls} />
        </div>
        <div>
          <label htmlFor="invoice_no" className={labelCls}>
            Invoice no.
          </label>
          <input id="invoice_no" name="invoice_no" placeholder="INV-YYYYMMDD-NNN" className={inputCls} />
          <p className="mt-1 text-xs text-muted">Leave blank to number it automatically when you create the invoice.</p>
        </div>
        <div>
          <label htmlFor="from_month" className={labelCls}>
            Covers from
          </label>
          <input
            id="from_month"
            name="from_month"
            type="month"
            required
            defaultValue={(client?.next_from ?? today).slice(0, 7)}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="month_count" className={labelCls}>
            Number of months
          </label>
          <input id="month_count" name="month_count" type="number" min="0" max="36" required defaultValue={1} className={inputCls} />
          <p className="mt-1 text-xs text-muted">0 for a one-off (setup, extra page…).</p>
        </div>
        {paid ? (
          <PaidFields today={today} idPrefix="pay-" />
        ) : (
          <>
            <div>
              <label htmlFor="issued_on" className={labelCls}>
                Invoice date *
              </label>
              <input id="issued_on" name="issued_on" type="date" required defaultValue={today} className={inputCls} />
            </div>
            <div>
              <label htmlFor="due_on" className={labelCls}>
                Due date
              </label>
              <input id="due_on" name="due_on" type="date" defaultValue={addDays(today, 7)} className={inputCls} />
            </div>
          </>
        )}
      </div>

      <details className="rounded-xl border border-line p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">Custom invoice line (optional)</summary>
        <p className="mt-2 text-xs text-muted">
          For one-off payments, or to change what the invoice says. Left blank, monthly payments use the client&apos;s plan and invoice line.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="item_title" className={labelCls}>
              Item title
            </label>
            <input id="item_title" name="item_title" placeholder="Website setup" className={inputCls} />
          </div>
          <div>
            <label htmlFor="item_details" className={labelCls}>
              Item details
            </label>
            <input id="item_details" name="item_details" placeholder="5-page website, domain and first year of hosting." className={inputCls} />
          </div>
        </div>
      </details>
      <div>
        <label htmlFor="pay-notes" className={labelCls}>
          Notes (private, not on the invoice)
        </label>
        <input id="pay-notes" name="notes" className={inputCls} />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Saving…" : paid ? "Save payment" : "Save and create invoice"}
      </button>
    </form>
  );
}

/** "Record payment" button that opens the payment form in a modal. */
export function RecordPaymentButton({
  clients,
  today,
  label = "Record payment",
  className,
}: {
  clients: PaymentClient[];
  today: string;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <Modal label={label} title="Record a payment" className={className}>
      {(close) => <PaymentForm clients={clients} today={today} onDone={close} />}
    </Modal>
  );
}

/** "Mark paid" on an invoiced record: when it arrived, how, and the proof. */
export function MarkPaidButton({ paymentId, clientId, today }: { paymentId: string; clientId: string; today: string }) {
  const [state, setState] = useState<PaymentFormState>({});
  const [pending, setPending] = useState(false);

  return (
    <Modal label="Mark paid" title="Mark as paid" className="text-sm font-semibold text-accent-text hover:underline">
      {(close) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setPending(true);
            const result = await submitWithProof(new FormData(form), clientId, markPaid);
            setPending(false);
            setState(result);
            if (result.ok) {
              form.reset();
              close();
            }
          }}
          className="space-y-4"
        >
          <input type="hidden" name="payment_id" value={paymentId} />
          <div className="grid gap-4 sm:grid-cols-2">
            <PaidFields today={today} idPrefix={`paid-${paymentId}-`} />
          </div>
          {state.error && (
            <p role="alert" className="text-sm text-red-600">
              {state.error}
            </p>
          )}
          <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
            {pending ? "Saving…" : "Mark paid"}
          </button>
        </form>
      )}
    </Modal>
  );
}
