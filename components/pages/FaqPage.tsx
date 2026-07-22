import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { allFaqs } from "@/data/faqs";
import type { Market } from "@/config/markets/types";
import { price } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";

export function faqMetadata(market: Market): Metadata {
  return marketMetadata(market, "faq", "/faq");
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
        <h1 className="display text-5xl text-ink sm:text-6xl">Frequently asked questions</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 text-lg text-muted">
          {`The short version: ${price(market, market.pricing.setup)} down and ${price(market, market.pricing.monthly)}/month`} gets
          you a custom hand-coded website with domain, hosting, and unlimited edits included; you always own your
          domain; and your site is live within 7 days of design approval. Details below.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <FaqAccordion faqs={faqs} />
      </section>

      <CtaBand
        market={market}
        heading="Question not here?"
        sub="WhatsApp us — a real person replies, usually within the hour."
        waMessage="Hi JPBC! I have a question that's not in your FAQ."
      />
    </>
  );
}
