"use client";

import { useState } from "react";
import { isValidMalaysianPhone } from "@/lib/site";

const inputCls =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!isValidMalaysianPhone(data.phone)) {
      setPhoneError("Please enter a valid Malaysian number, e.g. 012-345 6789");
      return;
    }
    setPhoneError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-6 rounded-2xl bg-surface-2 p-6 font-semibold text-ink">
        Message received — terima kasih! We&apos;ll get back to you within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="c-name" className="mb-1 block text-sm font-semibold text-ink">Your name</label>
        <input id="c-name" name="name" required maxLength={100} className={inputCls} placeholder="Ali / Mei Ling / Kumar" />
      </div>
      <div>
        <label htmlFor="c-business" className="mb-1 block text-sm font-semibold text-ink">Business name</label>
        <input id="c-business" name="business" required maxLength={150} className={inputCls} placeholder="e.g. Restoran Selera Kampung" />
      </div>
      <div>
        <label htmlFor="c-phone" className="mb-1 block text-sm font-semibold text-ink">Phone (Malaysian number)</label>
        <input id="c-phone" name="phone" type="tel" required className={inputCls} placeholder="012-345 6789" aria-describedby={phoneError ? "c-phone-err" : undefined} />
        {phoneError && <p id="c-phone-err" className="mt-1 text-sm text-red-500">{phoneError}</p>}
      </div>
      <div>
        <label htmlFor="c-need" className="mb-1 block text-sm font-semibold text-ink">What do you need?</label>
        <textarea id="c-need" name="need" required rows={4} maxLength={2000} className={inputCls} placeholder="e.g. New website for my clinic, or my current site is too slow…" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong — please try again or just WhatsApp us.</p>
      )}
    </form>
  );
}
