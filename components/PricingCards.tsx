import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import type { Market } from "@/config/markets/types";
import { editHours, mpath, price } from "@/lib/market";

export default function PricingCards({ market }: { market: Market }) {
  const monthly = price(market, market.pricing.monthly);
  const setup = price(market, market.pricing.setup);
  const lumpSum = price(market, market.pricing.lumpSum);
  const care = price(market, market.pricing.lumpSumCare);
  const editRate = price(market, market.pricing.edits.hourlyRate);

  const monthlyIncludes = [
    "Custom-designed, hand-coded 5-page website",
    `${market.voice.domainLine} domain included`,
    "Hosting + SSL certificate included",
    `${editHours(market)} of edits a month included — just WhatsApp us`,
    "Loads in under 1 second, guaranteed static",
    "WhatsApp support from the person who built it",
    "Live within 7 days of design approval",
  ];

  const lumpSumIncludes = [
    "Same custom, hand-coded 5-page website",
    "You own the site code outright from day one",
    `${care}/month hosting & care plan`,
    "Domain + SSL included in care plan",
    `Content edits at ${editRate}/hour, only when you need them`,
    "Live within 7 days of design approval",
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Monthly — flagship, on the red signboard */}
      <div className="board flex flex-col overflow-hidden bg-surface">
        <div className="screws relative border-b-2 border-frame bg-sign-red px-8 py-6 text-sign-red-ink [--sign-glow:var(--sign-red-ink)]">
          <span className="plate absolute right-6 top-6 !bg-sign-yellow !text-sign-yellow-ink">Most popular</span>
          <h3 className="sign sign-lit text-3xl">Monthly</h3>
          <p className="mt-2 text-sm text-[#fff3dc]">Best for cash flow — everything handled for you.</p>
        </div>
        <div className="flex flex-1 flex-col p-8">
          <p>
            <span className="sign text-5xl text-ink">{monthly}</span>
            <span className="ml-1 font-semibold text-muted">/month</span>
          </p>
          {/* min-h keeps both cards' feature lists on the same line even though
              only this card carries a second terms line. */}
          <div className="mt-2 min-h-11">
            <p className="text-sm font-bold text-accent">{setup} down · No setup fee</p>
            {/* Terms line: quieter than the line above, still AA on both themes. */}
            <p className="mt-1 text-pretty text-xs leading-relaxed text-muted">
              {market.pricing.minimumMonths}-month minimum term, then pay monthly — cancel anytime
            </p>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ink">
            {monthlyIncludes.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="font-black text-accent" aria-hidden>✓</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <WhatsAppButton
              market={market}
              message={`Hi JPBC! I'm interested in the ${monthly}/month website plan.`}
              className="w-full"
            >
              WhatsApp us about monthly
            </WhatsAppButton>
          </div>
        </div>
      </div>

      {/* Lump sum — the green board */}
      <div className="board flex flex-col overflow-hidden bg-surface">
        <div className="screws border-b-2 border-frame bg-sign-green px-8 py-6 text-sign-green-ink [--sign-glow:var(--sign-green-ink)]">
          <h3 className="sign sign-lit text-3xl">Lump sum</h3>
          <p className="mt-2 text-sm opacity-90">Best long-term cost — own everything outright.</p>
        </div>
        <div className="flex flex-1 flex-col p-8">
          <p>
            <span className="sign text-5xl text-ink">{lumpSum}</span>
            <span className="ml-1 font-semibold text-muted">+ one-time</span>
          </p>
          <div className="mt-2 min-h-11">
            <p className="text-sm font-bold text-muted">then {care}/month hosting &amp; care</p>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ink">
            {lumpSumIncludes.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="font-black text-accent" aria-hidden>✓</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <Link href={mpath(market, "/get-started")} className="btn btn-secondary w-full">
              Get a lump-sum quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
