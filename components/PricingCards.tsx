import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { mpath, price } from "@/lib/market";

export default function PricingCards({ market }: { market: Market }) {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);

  const monthlyIncludes = [
    "Custom-designed, hand-coded 5-page website",
    `${market.voice.domainLine} domain included`,
    "Hosting + SSL certificate included",
    "Unlimited content edits — WhatsApp us, it's done",
    "Loads in under 1 second, guaranteed static",
    "WhatsApp support from the person who built it",
    "Live within 7 days of design approval",
  ];

  const lumpSumIncludes = [
    "Same custom, hand-coded 5-page website",
    "You own the site code outright from day one",
    `${care}/month hosting & care plan`,
    "Domain + SSL included in care plan",
    "Content edits billed per request (or add unlimited edits)",
    "Live within 7 days of design approval",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Monthly — flagship */}
      <div className="relative rounded-3xl border-2 border-accent bg-surface p-8 shadow-xl">
        <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-ink">
          Most popular
        </span>
        <h3 className="display text-2xl text-ink">Monthly Plan</h3>
        <p className="mt-1 text-sm text-muted">Best for cash flow — everything handled for you.</p>
        <p className="mt-6">
          <span className="display text-5xl text-ink">{monthly}</span>
          <span className="text-muted">/month</span>
        </p>
        {/* min-h keeps both cards' feature lists on the same line even though
            only this card carries a second terms line. */}
        <div className="min-h-11">
          <p className="text-sm font-semibold text-accent">{setup} down · No setup fee</p>
          {/* Terms line: quieter than the line above, still AA on both themes
              (muted on surface is 6.2:1 light, 7.3:1 dark). */}
          <p className="mt-1 text-pretty text-xs leading-relaxed text-muted">
            {market.pricing.minimumMonths}-month minimum term, then pay monthly — cancel anytime
          </p>
        </div>
        <ul className="mt-6 space-y-3 text-sm text-muted">
          {monthlyIncludes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent" aria-hidden>✓</span> {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <WhatsAppButton
            market={market}
            message={`Hi JPBC! I'm interested in the ${monthly}/month website plan.`}
            className="w-full justify-center"
          >
            WhatsApp us about monthly
          </WhatsAppButton>
        </div>
      </div>

      {/* Lump sum */}
      <div className="glow-card rounded-3xl border border-line bg-surface p-8">
        <h3 className="display text-2xl text-ink">Lump Sum</h3>
        <p className="mt-1 text-sm text-muted">Best long-term cost — own everything outright.</p>
        <p className="mt-6">
          <span className="display text-5xl text-ink">{lumpSum}</span>
          <span className="text-muted">+ · one-time</span>
        </p>
        <div className="min-h-11">
          <p className="text-sm font-semibold text-muted">then {care}/month hosting &amp; care</p>
        </div>
        <ul className="mt-6 space-y-3 text-sm text-muted">
          {lumpSumIncludes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent" aria-hidden>✓</span> {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href={mpath(market, "/get-started")}
            className="block w-full rounded-full border-2 border-ink/20 px-6 py-3 text-center font-semibold text-ink transition-colors hover:border-accent"
          >
            Get a lump-sum quote
          </Link>
        </div>
      </div>
    </div>
  );
}
