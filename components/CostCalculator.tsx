"use client";

import { useMemo, useState } from "react";
import type { Market } from "@/config/markets/types";
import { jpbcEstimates, marketEstimate, rangeOver, totalOver, typical, type Choices, type Range } from "@/data/costCalculator";
import { price, waLink } from "@/lib/market";

const LANGUAGES = ["English or BM only", "Two languages", "Three languages"];

type Feature = { key: "store" | "booking" | "gbp" | "seo"; name: string; desc: string; short: string };
const FEATURES: Feature[] = [
  { key: "store", name: "Online store", desc: "Products, cart and payments", short: "an online store" },
  { key: "booking", name: "Booking system", desc: "Appointments or reservations online", short: "a booking system" },
  { key: "gbp", name: "Google Business Profile", desc: "Set up and optimised for Google Maps", short: "Google Business Profile setup" },
  { key: "seo", name: "Local SEO", desc: "Monthly work to rank in your area", short: "local SEO" },
];

const HORIZONS = [
  { months: 12, label: "First year" },
  { months: 36, label: "Over 3 years" },
];

export default function CostCalculator({ market }: { market: Market }) {
  const [c, setC] = useState<Choices>({ pages: 5, languages: 1, store: false, booking: false, gbp: false, seo: false });
  const [horizon, setHorizon] = useState(12);
  const p = (n: number) => price(market, Math.round(n));
  const pr = ([lo, hi]: Range) => (lo === hi ? p(lo) : `${p(lo)}–${p(hi).replace(market.currency.symbol, "")}`);

  const { monthlyPlan, lumpSum } = useMemo(() => jpbcEstimates(market, c), [market, c]);
  const others = useMemo(() => marketEstimate(c), [c]);

  const bars = [
    { name: "JPBC monthly plan", value: totalOver(monthlyPlan, horizon), ours: true },
    { name: "JPBC lump sum", value: totalOver(lumpSum, horizon), ours: true },
  ];
  const othersTotal = rangeOver(others, horizon);
  const scaleMax = Math.max(othersTotal[1], ...bars.map((b) => b.value));
  const pct = (n: number) => `${Math.max(1.5, (n / scaleMax) * 100)}%`;
  const bestOurs = Math.min(...bars.map((b) => b.value));
  const saving = othersTotal[0] - bestOurs;
  const horizonLabel = HORIZONS.find((h) => h.months === horizon)!.label.toLowerCase();

  const featureNames = FEATURES.filter((f) => c[f.key]).map((f) => f.short);
  const summary = [
    `${c.pages} page${c.pages === 1 ? "" : "s"}`,
    ["one language", "two languages", "three languages"][c.languages - 1],
    ...featureNames,
  ].join(", ");
  const waMessage = `Hi JPBC Web Designs, I used your website cost calculator: ${summary}. It estimated ${p(monthlyPlan.upfront)} upfront + ${p(monthlyPlan.monthly)}/month on the monthly plan. Can we talk?`;

  const set = <K extends keyof Choices>(k: K, v: Choices[K]) => setC((prev) => ({ ...prev, [k]: v }));
  const a = market.pricing.addons;
  const extraPages = Math.max(0, c.pages - 5);

  // Line-by-line breakdown: [item, JPBC, typical quote]
  const rows: [string, string, string][] = [
    ["Design and build, up to 5 pages", `${p(market.pricing.setup)} monthly plan / ${p(market.pricing.lumpSum)} lump sum`, pr(c.pages <= 1 ? typical.basePage1 : typical.base)],
    ...(extraPages
      ? [[`${extraPages} extra page${extraPages === 1 ? "" : "s"}`, p(extraPages * a.extraPage), pr([typical.extraPage[0] * extraPages, typical.extraPage[1] * extraPages])] as [string, string, string]]
      : []),
    ...(c.languages > 1
      ? [[`${c.languages - 1} extra language${c.languages > 2 ? "s" : ""}`, "Included", pr([typical.translationPerPage[0] * c.pages * (c.languages - 1), typical.translationPerPage[1] * c.pages * (c.languages - 1)])] as [string, string, string]]
      : []),
    ...(c.store ? [["Online store", `from ${p(a.onlineStoreFrom ?? 0)}`, pr(typical.onlineStore)] as [string, string, string]] : []),
    ...(c.booking ? [["Booking system", `from ${p(a.bookingFrom ?? 0)}`, pr(typical.booking)] as [string, string, string]] : []),
    ...(c.gbp ? [["Google Business Profile", p(a.googleBusinessProfile), "Often bundled in SEO"] as [string, string, string]] : []),
    ["Domain, hosting and care", `${p(market.pricing.monthly)}/month (incl. edits) / ${p(market.pricing.lumpSumCare)}/month`, `${pr(typical.careMonthly)}/month`],
    ...(c.seo ? [["Local SEO", `${p(a.localSeoMonthly)}/month`, `${pr(typical.localSeoMonthly)}/month`] as [string, string, string]] : []),
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      {/* ---------- inputs ---------- */}
      <div className="card space-y-8 p-6 sm:p-8">
        <fieldset>
          <legend className="flex w-full items-baseline justify-between">
            <span className="text-lg font-bold text-ink">1. How many pages?</span>
            <span className="text-2xl font-extrabold tracking-tight text-accent-text">{c.pages}</span>
          </legend>
          <p className="mt-1 text-sm text-muted">Home, about, services, gallery, contact… 5 pages suits most small businesses.</p>
          <input
            type="range"
            min={1}
            max={20}
            value={c.pages}
            onChange={(e) => set("pages", Number(e.target.value))}
            aria-label="Number of pages"
            className="mt-4 w-full accent-[var(--accent)]"
          />
          <div className="mt-1 flex justify-between text-xs text-faint">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold text-ink">2. How many languages?</legend>
          <p className="mt-1 text-sm text-muted">English, Bahasa Melayu, Chinese, in any combination.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {LANGUAGES.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={c.languages === i + 1}
                onClick={() => set("languages", i + 1)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                  c.languages === i + 1 ? "bg-accent text-on-accent" : "bg-surface-2 text-ink ring-1 ring-line hover:ring-line-strong"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold text-ink">3. Anything extra?</legend>
          <p className="mt-1 text-sm text-muted">Optional. Pick all that apply.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <label
                key={f.key}
                className={`flex cursor-pointer items-start gap-3 rounded-xl p-4 transition-colors ${
                  c[f.key] ? "bg-accent-soft ring-2 ring-accent" : "bg-surface-2 ring-1 ring-line hover:ring-line-strong"
                }`}
              >
                <input
                  type="checkbox"
                  checked={c[f.key]}
                  onChange={(e) => set(f.key, e.target.checked)}
                  className="mt-1 size-4 accent-[var(--accent)]"
                />
                <span>
                  <span className="block font-semibold text-ink">{f.name}</span>
                  <span className="block text-sm text-muted">{f.desc}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ---------- results ---------- */}
      <div className="space-y-4 lg:sticky lg:top-24" aria-live="polite">
        <div className="rounded-2xl bg-head p-6 text-head-ink sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-head-ink/60">Your estimate with JPBC</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-accent p-5 text-on-accent">
              <p className="text-sm font-semibold opacity-90">Monthly plan</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">
                {p(monthlyPlan.monthly)}
                <span className="text-base font-semibold">/month</span>
              </p>
              <p className="mt-1 text-sm opacity-90">{p(monthlyPlan.upfront)} upfront · edits included</p>
            </div>
            <div className="rounded-xl bg-head-ink/[0.07] p-5 ring-1 ring-head-ink/15">
              <p className="text-sm font-semibold text-head-ink/75">Lump sum</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">{p(lumpSum.upfront)}</p>
              <p className="mt-1 text-sm text-head-ink/75">then {p(lumpSum.monthly)}/month hosting &amp; care</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-head-ink/[0.07] p-5 ring-1 ring-head-ink/15">
            <p className="text-sm font-semibold text-head-ink/75">Typical quote elsewhere in Malaysia</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">{pr(others.upfront)}</p>
            <p className="mt-1 text-sm text-head-ink/75">then {pr(others.monthly)}/month for hosting and maintenance{c.seo ? " and SEO" : ""}</p>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-ink">Total you&apos;d pay</h3>
            <div className="flex rounded-full bg-surface-2 p-1 ring-1 ring-line" role="group" aria-label="Period">
              {HORIZONS.map((h) => (
                <button
                  key={h.months}
                  type="button"
                  aria-pressed={horizon === h.months}
                  onClick={() => setHorizon(h.months)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                    horizon === h.months ? "bg-accent text-on-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-4">
            {bars.map((b) => (
              <li key={b.name} title={`${b.name}: ${p(b.value)} ${horizonLabel}`}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{b.name}</span>
                  <span className="font-bold text-ink">{p(b.value)}</span>
                </div>
                <div className="mt-1.5 h-3 rounded-full bg-surface-2">
                  <div className="h-3 rounded-full bg-accent transition-[width] duration-500" style={{ width: pct(b.value) }} />
                </div>
              </li>
            ))}
            <li title={`Typical quote: ${pr(othersTotal)} ${horizonLabel}`}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-semibold text-ink">Typical quote elsewhere</span>
                <span className="font-bold text-ink">{pr(othersTotal)}</span>
              </div>
              <div className="relative mt-1.5 h-3 rounded-full bg-surface-2">
                {/* solid to the low end, hatched across the low–high spread */}
                <div className="absolute inset-y-0 left-0 rounded-full bg-faint transition-[width] duration-500" style={{ width: pct(othersTotal[0]) }} />
                <div
                  className="absolute inset-y-0 rounded-r-full bg-[repeating-linear-gradient(135deg,var(--faint)_0_3px,transparent_3px_7px)] transition-all duration-500"
                  style={{ left: pct(othersTotal[0]), width: `calc(${pct(othersTotal[1])} - ${pct(othersTotal[0])})` }}
                />
              </div>
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted">Hatched area: the spread between a budget freelancer and an agency.</p>

          {saving > 0 && (
            <p className="mt-5 rounded-xl bg-accent-soft p-4 text-sm text-ink">
              <strong className="text-accent-text">At least {p(saving)} less</strong> {horizonLabel} than the cheapest typical
              quote, with the build, domain, hosting and support included.
            </p>
          )}

          <details className="group mt-5 border-t border-line pt-4">
            <summary className="cursor-pointer text-sm font-semibold text-accent-text">See the breakdown</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead className="text-muted">
                  <tr className="border-b border-line">
                    <th className="py-2 pr-3 font-semibold">Item</th>
                    <th className="py-2 pr-3 font-semibold">JPBC</th>
                    <th className="py-2 font-semibold">Typical quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map(([item, ours, theirs]) => (
                    <tr key={item}>
                      <td className="py-2 pr-3 font-medium text-ink">{item}</td>
                      <td className="py-2 pr-3 text-muted">{ours}</td>
                      <td className="py-2 text-muted">{theirs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <a
            href={waLink(market, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6 w-full"
          >
            WhatsApp me this estimate →
          </a>
          <p className="mt-2 text-center text-xs text-muted">An estimate, not a quote. We confirm the final price after a short chat.</p>
        </div>
      </div>
    </div>
  );
}
