import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, getLocation } from "@/data/locations";
import { services } from "@/data/services";
import PricingCards from "@/components/PricingCards";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { pricingFaqs } from "@/data/faqs";

// One shared template for every location — add a location object in
// data/locations.ts and this page (plus sitemap + nav) picks it up.

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return {
    title: `Web Designer in ${loc.name} — RM0 Down, RM179/month`,
    description: `Hand-coded custom websites for ${loc.name} small businesses. RM0 down, RM179/month including domain, hosting, and unlimited edits. Serving ${loc.areas.slice(0, 3).join(", ")} and beyond.`,
    alternates: { canonical: `/locations/${loc.slug}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const pageFaqs = [...loc.faqs, ...pricingFaqs.slice(0, 3)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `JPBC Web Designs — Web Designer in ${loc.name}`,
    url: `${SITE_URL}/locations/${loc.slug}`,
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: { "@type": "City", name: loc.name },
    address: { "@type": "PostalAddress", addressLocality: "Petaling Jaya", addressRegion: "Selangor", addressCountry: "MY" },
    priceRange: "RM179 - RM3500",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="mx-auto max-w-4xl px-6 pb-4 pt-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Serving {loc.name}</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">Web Designer in {loc.name}</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">{loc.answerFirst}</p>
        <p className="mt-4 text-muted">{loc.intro}</p>
        <p className="mt-4 text-sm text-muted">
          <span className="font-semibold text-ink">Areas we serve in {loc.name}:</span> {loc.areas.join(" · ")}
        </p>
        <div className="mt-8">
          <WhatsAppButton message={`Hi JPBC! I run a business in ${loc.name} and I'm interested in a website.`}>
            WhatsApp us about your {loc.short ?? loc.name} business
          </WhatsAppButton>
        </div>
      </section>

      {/* Services block (interlinks to service pages) */}
      <section className="bg-surface-2 py-14 dark:bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="display text-3xl text-ink sm:text-4xl">What we do for {loc.name} businesses</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-3xl bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-surface-2"
              >
                <h3 className="display text-xl text-ink">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-accent">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing block (same as /pricing, interlinked) */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="display text-3xl text-ink sm:text-4xl">Pricing for {loc.name} businesses</h2>
        <p className="mt-3 text-muted">
          Same honest pricing everywhere in the Klang Valley.{" "}
          <Link href="/pricing" className="font-semibold text-accent hover:underline">
            See the full breakdown →
          </Link>
        </p>
        <div className="mt-8">
          <PricingCards />
        </div>
      </section>

      {/* Embedded FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="display text-3xl text-ink sm:text-4xl">Questions from {loc.name} businesses</h2>
        <div className="mt-8">
          <FaqAccordion faqs={pageFaqs} />
        </div>
      </section>

      {/* Other locations interlink */}
      <section className="mx-auto max-w-4xl px-6 py-6 text-sm text-muted">
        Also serving:{" "}
        {locations
          .filter((l) => l.slug !== loc.slug)
          .map((l, i) => (
            <span key={l.slug}>
              {i > 0 && " · "}
              <Link href={`/locations/${l.slug}`} className="font-semibold text-accent hover:underline">
                {l.name}
              </Link>
            </span>
          ))}
      </section>

      <CtaBand
        heading={`Your ${loc.name} business, online in 7 days`}
        waMessage={`Hi JPBC! I run a business in ${loc.name} and I'm interested in a website.`}
      />
    </>
  );
}
