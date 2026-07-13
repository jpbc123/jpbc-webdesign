"use client";

import { useState } from "react";
import { isValidMalaysianPhone, waLink } from "@/lib/site";

// Multi-step intake: business name → industry → current website →
// package interest → WhatsApp number. Submissions POST to /api/leads,
// which stores them and fires the LEAD_WEBHOOK_URL webhook if configured.

const industries = [
  "Food & Beverage",
  "Clinic / Healthcare",
  "Salon / Beauty",
  "Workshop / Automotive",
  "Renovation / Construction",
  "Tuition / Education",
  "Professional Services",
  "Retail / E-commerce",
  "Other",
];

const websiteOptions = [
  { value: "no", label: "No website yet", hint: "We'll start fresh — the fun kind of project." },
  { value: "yes", label: "Yes, and it's okay", hint: "We can review it and suggest improvements." },
  { value: "outdated", label: "Yes, but it's outdated", hint: "Our speciality: rebuild fast, keep your domain." },
];

const packageOptions = [
  { value: "monthly", label: "Monthly — RM0 down, RM179/month", hint: "Everything included. Most popular." },
  { value: "lumpsum", label: "Lump sum — from RM3,500", hint: "Own it outright + RM49/month care." },
  { value: "unsure", label: "Not sure yet", hint: "No problem — we'll help you decide." },
];

type Answers = {
  business: string;
  industry: string;
  website: string;
  package: string;
  phone: string;
};

const STEPS = 5;

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ business: "", industry: "", website: "", package: "", phone: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof Answers, v: string) => setAnswers((a) => ({ ...a, [k]: v }));

  function next() {
    setError("");
    if (step === 0 && !answers.business.trim()) return setError("Please tell us your business name.");
    if (step === 1 && !answers.industry) return setError("Pick the closest match.");
    if (step === 2 && !answers.website) return setError("Pick one — no wrong answers.");
    if (step === 3 && !answers.package) return setError("Pick one, or choose 'Not sure yet'.");
    setStep((s) => s + 1);
  }

  async function submit() {
    setError("");
    if (!isValidMalaysianPhone(answers.phone)) {
      return setError("Please enter a valid Malaysian number, e.g. 012-345 6789");
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "get-started", ...answers }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border-2 border-accent/40 bg-surface p-8 text-center">
        <p className="display text-3xl text-ink">Terima kasih, {answers.business}! 🎉</p>
        <p className="mt-3 text-muted">
          We&apos;ve got your details and will WhatsApp you shortly. Want to skip the queue? Message us first:
        </p>
        <a
          href={waLink(`Hi JPBC! I just filled the get-started form for ${answers.business}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink glow-accent"
        >
          WhatsApp us now
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-8">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2" aria-hidden>
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-surface-2"}`} />
        ))}
      </div>
      <p className="mb-6 text-sm font-semibold text-muted">
        Step {step + 1} of {STEPS}
      </p>

      {step === 0 && (
        <fieldset>
          <legend className="display text-2xl text-ink">What&apos;s your business called?</legend>
          <input
            autoFocus
            value={answers.business}
            onChange={(e) => set("business", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && next()}
            maxLength={150}
            className="mt-4 w-full rounded-2xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent"
            placeholder="e.g. Klinik Pergigian Senyum"
            aria-label="Business name"
          />
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="display text-2xl text-ink">What industry are you in?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {industries.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => set("industry", ind)}
                aria-pressed={answers.industry === ind}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  answers.industry === ind ? "border-accent bg-surface-2 text-ink" : "border-line text-muted hover:text-ink"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="display text-2xl text-ink">Do you have a website now?</legend>
          <div className="mt-4 space-y-2">
            {websiteOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => set("website", o.value)}
                aria-pressed={answers.website === o.value}
                className={`block w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                  answers.website === o.value ? "border-accent bg-surface-2" : "border-line hover:border-muted"
                }`}
              >
                <span className="font-semibold text-ink">{o.label}</span>
                <span className="block text-sm text-muted">{o.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="display text-2xl text-ink">Which package interests you?</legend>
          <div className="mt-4 space-y-2">
            {packageOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => set("package", o.value)}
                aria-pressed={answers.package === o.value}
                className={`block w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                  answers.package === o.value ? "border-accent bg-surface-2" : "border-line hover:border-muted"
                }`}
              >
                <span className="font-semibold text-ink">{o.label}</span>
                <span className="block text-sm text-muted">{o.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend className="display text-2xl text-ink">What&apos;s your WhatsApp number?</legend>
          <p className="mt-2 text-sm text-muted">We&apos;ll reply here — no calls, no spam, no mailing lists.</p>
          <input
            autoFocus
            type="tel"
            value={answers.phone}
            onChange={(e) => set("phone", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="mt-4 w-full rounded-2xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent"
            placeholder="012-345 6789"
            aria-label="WhatsApp number (Malaysian)"
          />
        </fieldset>
      )}

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">Something went wrong — try again, or just WhatsApp us directly.</p>
      )}

      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-full px-5 py-2.5 font-semibold text-muted hover:text-ink">
            ← Back
          </button>
        ) : (
          <span />
        )}
        {step < STEPS - 1 ? (
          <button type="button" onClick={next} className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink">
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink glow-accent disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send & get my plan"}
          </button>
        )}
      </div>
    </div>
  );
}
