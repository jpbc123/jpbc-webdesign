import type { Metadata } from "next";
import Link from "next/link";
import PricingCards from "@/components/PricingCards";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { pricingFaqs } from "@/data/faqs";
import type { Market } from "@/config/markets/types";
import { editHours, price } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";

export function pricingMetadata(market: Market): Metadata {
  return marketMetadata(market, "pricing", "/pricing");
}

export default function PricingPage({ market }: { market: Market }) {
  const { monthly, setup, lumpSum, lumpSumCare } = market.pricing;
  const p = (amount: number) => price(market, amount);
  const faqs = pricingFaqs(market);
  const hours = editHours(market);
  const editRate = p(market.pricing.edits.hourlyRate);

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
        description: `${p(setup)} down, no setup fee, ${p(monthly)}/month. Domain, hosting, SSL and ${hours} of edits a month included. ${market.pricing.minimumMonths}-month minimum term, then pay monthly — cancel anytime.`,
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
    { label: "Content edits", monthly: `${hours}/month included, then ${editRate}/hr`, lump: `${editRate}/hour` },
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
      price:
        market.pricing.addons.bookingFrom !== undefined ? `From ${p(market.pricing.addons.bookingFrom)} one-time` : "Custom quote",
      desc:
        market.pricing.addons.onlineStoreFrom !== undefined && market.pricing.addons.bookingFrom !== undefined
          ? `Booking system from ${p(market.pricing.addons.bookingFrom)}, online store from ${p(market.pricing.addons.onlineStoreFrom)}. Final price after a quick chat.`
          : "Online store, appointment booking, payment integration — tell us what you need.",
    },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={offersJsonLd} />

      <section className="bg-gradient-to-b from-hero to-bg">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-16 text-center sm:px-6 sm:pt-20">
          <p className="eyebrow mb-3">Pricing</p>
          <h1 className="display mx-auto max-w-3xl text-[2.6rem] text-ink sm:text-5xl lg:text-6xl">Pricing</h1>
          {/* Answer-first for SEO/AEO */}
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted">
            {market.voice.pricingQuestion} With JPBC it&apos;s{" "}
            <strong className="text-ink">
              {p(setup)} down and {p(monthly)}/month
            </strong>{" "}
            — custom-designed, hand-coded, with domain, hosting, SSL, and {hours} of edits a month included. Prefer to own
            it outright? Lump sum from {p(lumpSum)} plus {p(lumpSumCare)}/month hosting &amp; care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PricingCards market={market} />
      </section>

      {/* Honest cost comparison */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="The math"
          title="Which one suits you: cash flow vs long-term cost"
          intro={`Honest answer: monthly is cheaper to start and includes ${hours} of edits a month; lump sum works out cheaper from around year three. Here's the math, no spin.`}
        />
        <div className="mt-8 overflow-x-auto rounded-2xl bg-surface ring-1 ring-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-6 py-4"></th>
                <th className="bg-accent-soft px-6 py-4 font-bold text-ink">Monthly ({p(monthly)})</th>
                <th className="px-6 py-4 font-bold text-ink">Lump sum ({p(lumpSum)}+)</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <td className="px-6 py-3.5 font-semibold text-ink">{row.label}</td>
                  <td className="bg-accent-soft/60 px-6 py-3.5 text-muted">{row.monthly}</td>
                  <td className="px-6 py-3.5 text-muted">{row.lump}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Add-ons"
          title="Only if you need them"
          intro="Web apps, online stores and AI automation are quoted per project."
          center
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {addons.map((a) => (
            <div key={a.name} className="card flex flex-col p-6 text-center">
              <h3 className="font-bold text-ink">{a.name}</h3>
              <p className="mt-2 text-xl font-extrabold tracking-tight text-accent-text">{a.price}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
            </div>
          ))}
        </div>
        {market.code === "my" && (
          <p className="mt-8 text-center">
            <Link href="/website-cost-calculator" className="font-semibold text-accent-text underline underline-offset-4">
              Add it all up with our website cost calculator →
            </Link>
          </p>
        )}
        <p className="mt-8 text-center text-sm text-muted">
          Thinking about Facebook or Google ads? Ask us. We&apos;ll tell you straight whether it&apos;s worth it for your
          business.
        </p>
        <div className="mt-6 text-center">
          <WhatsAppButton market={market} message="Hi JPBC Web Designs, I have a question about pricing and add-ons.">
            Not sure? WhatsApp us
          </WhatsAppButton>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Pricing questions, answered" center />
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand
        market={market}
        heading={`Start with ${p(setup)} today`}
        sub="Tell us about your business on WhatsApp — you'll have a price and a timeline in one conversation."
        waMessage="Hi JPBC Web Designs, I'd like to get started with a website."
      />
    </>
  );
}
