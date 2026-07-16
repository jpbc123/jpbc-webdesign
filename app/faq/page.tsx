import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { allFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ - Pricing, Ownership, Timelines & Edits",
  description:
    "Answers to the 12 most common questions about JPBC Web Designs: what RM179/month includes, who owns the domain, how fast we build, unlimited edits, receipts, and languages.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="mx-auto max-w-3xl px-6 pb-4 pt-16">
        <h1 className="display text-5xl text-ink sm:text-6xl">Frequently asked questions</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 text-lg text-muted">
          The short version: RM0 down and RM179/month gets you a custom hand-coded website with domain, hosting, and
          unlimited edits included; you always own your domain; and your site is live within 7 days of design approval.
          Details below.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <FaqAccordion faqs={allFaqs} />
      </section>

      <CtaBand
        heading="Question not here?"
        sub="WhatsApp us — a real person replies, usually within the hour."
        waMessage="Hi JPBC! I have a question that's not in your FAQ."
      />
    </>
  );
}
