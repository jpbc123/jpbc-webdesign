import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { allFaqs } from "@/data/faqs";
import type { Market } from "@/config/markets/types";
import { editHours, price } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";

export function faqMetadata(market: Market): Metadata {
  return marketMetadata(market, "faq", "/faq");
}

function CalculatorCallout() {
  return (
    <Link
      href="/website-cost-calculator"
      className="group mt-6 flex items-center gap-4 rounded-2xl bg-accent-soft p-5 ring-1 ring-accent/30 transition hover:ring-accent motion-safe:hover:-translate-y-0.5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-on-accent" aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      </span>
      <span className="flex-1">
        <span className="block font-bold text-ink group-hover:text-accent-text">How much will my website cost?</span>
        <span className="block text-sm text-muted">Try our website cost calculator and compare us with typical quotes.</span>
      </span>
      <span className="text-accent-text transition-transform motion-safe:group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </Link>
  );
}

export default function FaqPage({ market }: { market: Market }) {
  const faqs = allFaqs(market);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <p className="eyebrow mb-3">FAQ</p>
        <h1 className="display text-[2.6rem] text-ink sm:text-5xl lg:text-6xl">Frequently asked questions</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 text-lg text-muted">
          {`The short version: ${price(market, market.pricing.setup)} down and ${price(market, market.pricing.monthly)}/month`} gets
          you a custom hand-coded website with domain, hosting, and {editHours(market)} of edits a month included; you always own your
          domain; and your site is live within 7 days of design approval. Details below.
        </p>
        {/* The calculator's market figures are Malaysian, so it is Malaysia-only. */}
        {market.code === "my" && <CalculatorCallout />}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <FaqAccordion faqs={faqs} />
      </section>

      <CtaBand
        market={market}
        heading="Question not here?"
        sub="WhatsApp us — a real person replies, usually within the hour."
        waMessage="Hi JPBC Web Designs, I have a question that's not in your FAQ."
      />
    </>
  );
}
