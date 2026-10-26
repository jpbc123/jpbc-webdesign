"use client";

import { saveClient, type ClientFormState } from "@/app/admin/_actions/clients";
import { STATUSES, type Client } from "@/lib/billing";
import { inputCls, labelCls, useFormAction } from "./ui";

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        step={type === "number" ? "0.01" : undefined}
        className={inputCls}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function ClientForm({ client }: { client?: Client }) {
  const [state, onSubmit, pending] = useFormAction<ClientFormState>(saveClient, {});
  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      {client && <input type="hidden" name="id" value={client.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="business_name" label="Business name *" defaultValue={client?.business_name} placeholder="Perniagaan Vertex Global" />
        <Field name="contact_name" label="Contact person" defaultValue={client?.contact_name} />
        <Field name="phone" label="Phone / WhatsApp" defaultValue={client?.phone} type="tel" />
        <Field name="email" label="Email" defaultValue={client?.email} type="email" />
        <Field name="ssm_no" label="SSM no." defaultValue={client?.ssm_no} hint="Never store IC numbers here." />
        <div>
          <label htmlFor="status" className={labelCls}>
            Status
          </label>
          <select id="status" name="status" defaultValue={client?.status ?? "active"} className={inputCls}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
        <Field name="site_url" label="Live site URL" defaultValue={client?.site_url} type="url" placeholder="https://…" />
        <Field name="domains" label="Domain(s)" defaultValue={client?.domains} placeholder="example.com.my" />
        <Field name="hosting" label="Hosting" defaultValue={client?.hosting} placeholder="Cloudflare Worker, Supabase pvg-store…" />
        <Field name="plan" label="Plan" defaultValue={client?.plan} placeholder="Website Starter Plan" hint="Printed on invoices, e.g. “Website Starter Plan: monthly fee”." />
        <Field name="monthly_fee" label="Monthly fee (RM)" defaultValue={client?.monthly_fee} type="number" />
        <Field
          name="billing_start"
          label="First billed month"
          defaultValue={client?.billing_start?.slice(0, 7)}
          type="month"
          hint="Months from here to now count as due until a payment covers them."
        />
      </div>

      <div className="grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelCls}>
            Billing address
          </label>
          <textarea id="address" name="address" rows={2} defaultValue={client?.address ?? ""} className={inputCls} />
          <p className="mt-1 text-xs text-muted">Printed under “Bill to”. Line breaks are kept.</p>
        </div>
        <Field
          name="invoice_item"
          label="Invoice line (monthly)"
          defaultValue={client?.invoice_item}
          placeholder="Online store example.com.my: hosting, maintenance and support."
        />
        <Field name="agreement_date" label="Agreement signed on" defaultValue={client?.agreement_date} type="date" />
      </div>

      <div>
        <label htmlFor="notes" className={labelCls}>
          Notes
        </label>
        <textarea id="notes" name="notes" rows={4} defaultValue={client?.notes ?? ""} className={inputCls} />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Saving…" : client ? "Save changes" : "Add client"}
      </button>
    </form>
  );
}
