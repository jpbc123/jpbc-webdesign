import type { Metadata } from "next";
import Link from "next/link";
import CostCalculator from "@/components/CostCalculator";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import { defaultMarket } from "@/config/markets";
import { sources, typical } from "@/data/costCalculator";
import { editHours, price } from "@/lib/market";
import { BUSINESS_ID, SITE_URL } from "@/lib/site";

// Malaysia-only: the market figures are Malaysian price guides.
const market = defaultMarket;
const p = (n: number) => price(market, n);
const { monthly, setup, lumpSum, lumpSumCare } = market.pricing;
const PATH = "/website-cost-calculator";

export const metadata: Metadata = {
  title: "Website Cost Calculator Malaysia - Estimate Your Website Price",
  description: `Free website cost calculator for Malaysian businesses. Pick pages, languages and features to see what a website costs with JPBC (${p(setup)} down, ${p(monthly)}/month) next to typical quotes from freelancers and agencies.`,
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: "How much does a website cost in Malaysia?",
    a: `A small business website in Malaysia typically costs ${p(typical.base[0])} to ${p(typical.base[1])} to build, depending on whether a freelancer or an agency builds it, plus ${p(typical.careMonthly[0])} to ${p(typical.careMonthly[1])} a month for hosting and maintenance. With JPBC it's ${p(setup)} down and ${p(monthly)}/month for a custom 5-page site, or a lump sum of ${p(lumpSum)} plus ${p(lumpSumCare)}/month.`,
  },
  {
    q: "Is this estimate a final quote?",
    a: "No. It's an honest starting point. Online stores and booking systems vary the most with scope, so we confirm the final price after a short WhatsApp chat about what you need. You'll know the exact price before any work starts.",
  },
  {
    q: "Why is JPBC cheaper than typical quotes?",
    a: "We're a small studio with low overheads, and we hand-code sites without paid themes or plugins. On the monthly plan we spread the build cost over your subscription, so there's no big upfront bill.",
  },
  {
    q: "Do extra languages cost more?",
    a: "Not with JPBC: English, Bahasa Melayu and Chinese, in any combination, are included. Elsewhere, translation alone usually costs about RM40 to RM120 per page, per language.",
  },
  {
    q: "What does the monthly fee include?",
    a: `Your domain, hosting, SSL, ${editHours(market)} of edits a month and WhatsApp support on the monthly plan. On the lump-sum plan, ${p(lumpSumCare)}/month covers hosting and care, and edits are ${p(market.pricing.edits.hourlyRate)}/hour.`,
  },
  {
    q: "Where do the typical market prices come from?",
    a: "From published Malaysian price guides by web design agencies and freelancers, checked in October 2026. The sources are listed on this page. Where they disagree, we use the cheapest figures for the low end, so the comparison never overstates the difference.",
  },
];

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Website Cost Calculator Malaysia",
      url: `${SITE_URL}${PATH}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
      provider: { "@id": BUSINESS_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-gradient-to-b from-hero to-bg">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
          <p className="eyebrow mb-3">Free tool</p>
          <h1 className="display max-w-3xl text-[2.6rem] text-ink sm:text-5xl lg:text-6xl">Website cost calculator</h1>
          {/* Answer-first for SEO/AEO */}
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted">
            How much does a website cost in Malaysia? Typically {p(typical.base[0])} to {p(typical.base[1])} to build,
            plus monthly hosting and maintenance. Answer three quick questions to see your price with JPBC next to a
            typical quote from other freelancers and agencies. No sign-up needed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <CostCalculator market={market} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="How we worked it out"
          title="Where the market prices come from"
          intro="Typical quotes are ranges from published Malaysian price guides, checked in October 2026. The low end is the cheapest freelancer figure we found; the high end is a typical agency figure. Google Business Profile setup is counted as free on the market side, because it's usually bundled into SEO packages."
        />
        <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {sources.map((s) => (
            <li key={s.url} className="text-muted">
              {s.url.startsWith("/") ? (
                <Link href={s.url} className="font-semibold text-accent-text underline underline-offset-2">
                  {s.label}
                </Link>
              ) : (
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-accent-text">
                  {s.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          See exactly what each JPBC plan includes on our{" "}
          <Link href="/pricing" className="font-semibold text-accent-text underline underline-offset-2">
            pricing page
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Website cost questions" center />
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBand
        market={market}
        heading="Want an exact price?"
        sub="Tell us what you need on WhatsApp. We'll confirm the price, usually within the hour."
        waMessage="Hi JPBC Web Designs, I used your website cost calculator and would like an exact price."
      />
    </>
  );
}
