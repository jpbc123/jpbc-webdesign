import type { Metadata } from "next";
import PricingCards from "@/components/PricingCards";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { pricingFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Website Pricing Malaysia - RM179/month or RM3,500 Lump Sum",
  description:
    "Honest website pricing for Malaysian small businesses: RM0 down RM179/month (domain, hosting, unlimited edits included) or lump sum from RM3,500 + RM49/month care.",
  alternates: { canonical: "/pricing" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Small business website by JPBC Web Designs",
  description: "Custom, hand-coded 5-page website for Malaysian small businesses.",
  offers: [
    {
      "@type": "Offer",
      name: "Monthly plan",
      price: "179",
      priceCurrency: "MYR",
      description: "RM0 down, RM179/month. Domain, hosting, SSL, unlimited edits included. 12-month minimum.",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Lump sum",
      price: "3500",
      priceCurrency: "MYR",
      description: "From RM3,500 one-time + RM49/month hosting & care. You own the site outright.",
      availability: "https://schema.org/InStock",
    },
  ],
};

const comparison: { label: string; monthly: string; lump: string }[] = [
  { label: "Upfront cost", monthly: "RM0", lump: "From RM3,500" },
  { label: "Monthly cost", monthly: "RM179", lump: "RM49 (hosting & care)" },
  { label: "Cost over 2 years", monthly: "RM4,296", lump: "RM4,676" },
  { label: "Cost over 4 years", monthly: "RM8,592", lump: "RM5,852" },
  { label: "Content edits", monthly: "Unlimited, included", lump: "Billed per request" },
  { label: "Who owns the site code", monthly: "JPBC (service)", lump: "You, from day one" },
  { label: "Who owns the domain", monthly: "You, always", lump: "You, always" },
  { label: "Best for", monthly: "Cash flow & hands-off owners", lump: "Long-term cost & full ownership" },
];

const addons = [
  { name: "Extra pages", price: "RM100/page one-time", desc: "Beyond the included 5 pages — menus, galleries, extra services." },
  { name: "Google Business Profile optimisation", price: "RM500 one-time", desc: "Claim, verify, and fully optimise your Maps listing." },
  { name: "Local SEO pages", price: "RM300/month", desc: "Ongoing location-page strategy to rank across your service areas." },
  { name: "E-commerce / booking features", price: "Custom quote", desc: "Online store, appointment booking, payment integration — tell us what you need." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={offersJsonLd} />

      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Pricing</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 max-w-3xl text-lg text-muted">
          How much does a small business website cost in Malaysia? With JPBC it&apos;s <strong className="text-ink">RM0 down and
          RM179/month</strong> — custom-designed, hand-coded, with domain, hosting, SSL, and unlimited edits included. Prefer
          to own it outright? Lump sum from RM3,500 plus RM49/month hosting &amp; care.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <PricingCards />
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
                <th className="px-6 py-4 font-semibold text-accent">Monthly (RM179)</th>
                <th className="px-6 py-4 font-semibold text-ink">Lump Sum (RM3,500+)</th>
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
          <WhatsAppButton message="Hi JPBC! I have a question about pricing and add-ons.">
            Not sure? WhatsApp us
          </WhatsAppButton>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="display text-3xl text-ink sm:text-4xl">Pricing questions, answered</h2>
        <div className="mt-8">
          <FaqAccordion faqs={pricingFaqs} />
        </div>
      </section>

      <CtaBand
        heading="Start with RM0 today"
        sub="Tell us about your business on WhatsApp — you'll have a price and a timeline in one conversation."
        waMessage="Hi JPBC! I'd like to get started with a website."
      />
    </>
  );
}
