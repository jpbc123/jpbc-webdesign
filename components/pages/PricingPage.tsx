import type { Metadata } from "next";
import PricingCards from "@/components/PricingCards";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { pricingFaqs } from "@/data/faqs";
import type { Market } from "@/config/markets/types";
import { price } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";

export function pricingMetadata(market: Market): Metadata {
  return marketMetadata(market, "pricing", "/pricing");
}

export default function PricingPage({ market }: { market: Market }) {
  const { monthly, setup, lumpSum, lumpSumCare } = market.pricing;
  const p = (amount: number) => price(market, amount);
  const faqs = pricingFaqs(market);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Small business website by JPBC Web Designs",
    description: market.voice.productDescription,
    offers: [
      {
        "@type": "Offer",
        name: "Monthly plan",
        price: String(monthly),
        priceCurrency: market.currency.code,
        description: `${p(setup)} down, no setup fee, ${p(monthly)}/month. Domain, hosting, SSL, unlimited edits included. ${market.pricing.minimumMonths}-month minimum term, then pay monthly — cancel anytime.`,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Lump sum",
        price: String(lumpSum),
        priceCurrency: market.currency.code,
        description: `From ${p(lumpSum)} one-time + ${p(lumpSumCare)}/month hosting & care. You own the site outright.`,
        availability: "https://schema.org/InStock",
      },
    ],
  };

  // Two- and four-year totals are derived, so they can never drift from the
  // prices above when a market's numbers change.
  const comparison: { label: string; monthly: string; lump: string }[] = [
    { label: "Upfront cost", monthly: p(setup), lump: `From ${p(lumpSum)}` },
    { label: "Monthly cost", monthly: p(monthly), lump: `${p(lumpSumCare)} (hosting & care)` },
    { label: "Cost over 2 years", monthly: p(monthly * 24), lump: p(lumpSum + lumpSumCare * 24) },
    { label: "Cost over 4 years", monthly: p(monthly * 48), lump: p(lumpSum + lumpSumCare * 48) },
    { label: "Content edits", monthly: "Unlimited, included", lump: "Billed per request" },
    { label: "Who owns the site code", monthly: "JPBC (service)", lump: "You, from day one" },
    { label: "Who owns the domain", monthly: "You, always", lump: "You, always" },
    { label: "Best for", monthly: "Cash flow & hands-off owners", lump: "Long-term cost & full ownership" },
  ];

  const addons = [
    {
      name: "Extra pages",
      price: `${p(market.pricing.addons.extraPage)}/page one-time`,
      desc: "Beyond the included 5 pages — menus, galleries, extra services.",
    },
    {
      name: "Google Business Profile optimisation",
      price: `${p(market.pricing.addons.googleBusinessProfile)} one-time`,
      desc: "Claim, verify, and fully optimise your Maps listing.",
    },
    {
      name: "Local SEO pages",
      price: `${p(market.pricing.addons.localSeoMonthly)}/month`,
      desc: "Ongoing location-page strategy to rank across your service areas.",
    },
    {
      name: "E-commerce / booking features",
      price: "Custom quote",
      desc: "Online store, appointment booking, payment integration — tell us what you need.",
    },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={offersJsonLd} />

      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Pricing</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 max-w-3xl text-lg text-muted">
          {market.voice.pricingQuestion} With JPBC it&apos;s{" "}
          <strong className="text-ink">
            {p(setup)} down and {p(monthly)}/month
          </strong>{" "}
          — custom-designed, hand-coded, with domain, hosting, SSL, and unlimited edits included. Prefer to own it
          outright? Lump sum from {p(lumpSum)} plus {p(lumpSumCare)}/month hosting &amp; care.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <PricingCards market={market} />
      </section>

      {/* Honest comparison table */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="display text-3xl text-ink sm:text-4xl">Which one suits you: cash flow vs long-term cost</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Honest answer: monthly is cheaper to start and includes unlimited edits; lump sum works out cheaper from
          around year three. Here&apos;s the math, no spin.
        </p>
        <div className="glow-card mt-8 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[560px] bg-surface text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-6 py-4 font-semibold text-muted"></th>
                <th className="px-6 py-4 font-semibold text-accent">Monthly ({p(monthly)})</th>
                <th className="px-6 py-4 font-semibold text-ink">Lump Sum ({p(lumpSum)}+)</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <td className="px-6 py-3 font-medium text-ink">{row.label}</td>
                  <td className="px-6 py-3 text-muted">{row.monthly}</td>
                  <td className="px-6 py-3 text-muted">{row.lump}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="display text-3xl text-ink sm:text-4xl">Add-ons</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {addons.map((a) => (
            <div key={a.name} className="glow-card rounded-3xl border border-line bg-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-ink">{a.name}</h3>
                <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-accent">
                  {a.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <WhatsAppButton market={market} message="Hi JPBC! I have a question about pricing and add-ons.">
            Not sure? WhatsApp us
          </WhatsAppButton>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="display text-3xl text-ink sm:text-4xl">Pricing questions, answered</h2>
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand
        market={market}
        heading={`Start with ${p(setup)} today`}
        sub="Tell us about your business on WhatsApp — you'll have a price and a timeline in one conversation."
        waMessage="Hi JPBC! I'd like to get started with a website."
      />
    </>
  );
}
