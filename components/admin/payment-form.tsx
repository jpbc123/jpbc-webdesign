"use client";

import { useRef, useState } from "react";
import { savePayment, type PaymentFormState } from "@/app/admin/_actions/payments";
import { METHODS } from "@/lib/billing";
import { inputCls, labelCls } from "./ui";
import { uploadReceipt } from "./receipt-upload";

/** Records a payment; the optional proof uploads first, then the row is saved. */
export function PaymentForm({
  clientId,
  defaultAmount,
  defaultFromMonth,
  today,
}: {
  clientId: string;
  defaultAmount: number | null;
  defaultFromMonth: string;
  today: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<PaymentFormState>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    try {
      const file = fd.get("receipt") as File | null;
      fd.delete("receipt");
      if (file && file.size > 0) fd.set("receipt_path", await uploadReceipt(clientId, file));
      const result = await savePayment({}, fd);
      setState(result);
      if (result.ok) formRef.current?.reset();
    } catch (err) {
      setState({ error: `Upload failed: ${(err as Error).message}` });
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="card space-y-4 p-6">
      <h2 className="text-lg font-bold text-ink">Record a payment</h2>
      <input type="hidden" name="client_id" value={clientId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className={labelCls}>
            Amount (RM) *
          </label>
          <input id="amount" name="amount" type="number" step="0.01" min="0" required defaultValue={defaultAmount ?? ""} className={inputCls} />
        </div>
        <div>
          <label htmlFor="paid_on" className={labelCls}>
            Paid on *
          </label>
          <input id="paid_on" name="paid_on" type="date" required defaultValue={today} className={inputCls} />
        </div>
        <div>
          <label htmlFor="from_month" className={labelCls}>
            Covers from
          </label>
          <input id="from_month" name="from_month" type="month" required defaultValue={defaultFromMonth.slice(0, 7)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="month_count" className={labelCls}>
            Number of months
          </label>
          <input id="month_count" name="month_count" type="number" min="0" max="36" required defaultValue={1} className={inputCls} />
          <p className="mt-1 text-xs text-muted">0 for a one-off (setup, extra page…).</p>
        </div>
        <div>
          <label htmlFor="method" className={labelCls}>
            Method
          </label>
          <select id="method" name="method" defaultValue="Bank transfer" className={inputCls}>
            {METHODS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="invoice_no" className={labelCls}>
            Invoice no.
          </label>
          <input id="invoice_no" name="invoice_no" placeholder="INV-YYYYMMDD-NNN" className={inputCls} />
        </div>
      </div>
      <div>
        <label htmlFor="receipt" className={labelCls}>
          Payment proof (image or PDF)
        </label>
        <input
          id="receipt"
          name="receipt"
          type="file"
          accept="image/*,application/pdf"
          className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:font-semibold file:text-accent-text"
        />
      </div>
      <div>
        <label htmlFor="pay-notes" className={labelCls}>
          Notes
        </label>
        <input id="pay-notes" name="notes" className={inputCls} />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.ok && !state.error && <p className="text-sm font-semibold text-green-700 dark:text-green-400">Payment saved.</p>}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Saving…" : "Save payment"}
      </button>
    </form>
  );
}
