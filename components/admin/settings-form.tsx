"use client";

import { saveSettings, type SettingsFormState } from "@/app/admin/_actions/settings";
import type { Settings } from "@/lib/billing";
import { inputCls, labelCls, useFormAction } from "./ui";

const FIELDS: { name: keyof Settings; label: string; placeholder?: string; hint?: string; rows?: number }[] = [
  { name: "trading_name", label: "Business name *", placeholder: "JPBC Web Designs" },
  { name: "website", label: "Website", placeholder: "jpbcwebdesigns.com" },
  { name: "operator_name", label: "Registered business", placeholder: "RYC Software and Web Solutions", hint: "Printed as “Operated by …”." },
  { name: "reg_no", label: "SSM reg. no.", placeholder: "202603276004 (RA0140571-V)" },
  { name: "phone", label: "Phone", placeholder: "019-551 3944" },
  {
    name: "bank_details",
    label: "Bank details",
    placeholder: "Public Bank, account holder …",
    hint: "Used in “Received in full … by bank transfer to <this>.”",
  },
  { name: "address", label: "Business address", rows: 2, hint: "Line breaks are kept." },
  { name: "invoice_notes", label: "Notes on every invoice", rows: 3, hint: "One note per line. The next-due line is added automatically." },
];

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, onSubmit, pending] = useFormAction<SettingsFormState>(saveSettings, {});
  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name} className={f.rows ? "sm:col-span-2" : undefined}>
            <label htmlFor={f.name} className={labelCls}>
              {f.label}
            </label>
            {f.rows ? (
              <textarea id={f.name} name={f.name} rows={f.rows} defaultValue={settings[f.name] ?? ""} placeholder={f.placeholder} className={inputCls} />
            ) : (
              <input id={f.name} name={f.name} defaultValue={settings[f.name] ?? ""} placeholder={f.placeholder} className={inputCls} />
            )}
            {f.hint && <p className="mt-1 text-xs text-muted">{f.hint}</p>}
          </div>
        ))}
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.ok && !state.error && <p className="text-sm font-semibold text-green-700 dark:text-green-400">Saved.</p>}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
