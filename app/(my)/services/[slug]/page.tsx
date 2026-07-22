import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import WhatsAppButton from "@/components/WhatsAppButton";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { defaultMarket } from "@/config/markets";
import { SITE_URL } from "@/lib/site";

// Service pages are Malaysia-only for now — the copy in data/services.ts is
// written for the Malaysian market. A market opts in with `pages.services`
// in its config once it has its own service copy.
const market = defaultMarket;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: "JPBC Web Designs",
      url: SITE_URL,
      ...(market.schema.address
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: market.schema.address.locality,
              addressRegion: market.schema.address.region,
              addressCountry: market.schema.address.country,
            },
          }
        : {}),
    },
    areaServed: { "@type": "AdministrativeArea", name: "Klang Valley, Malaysia" },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <section className="mx-auto max-w-4xl px-6 pb-4 pt-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Service</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{service.name}</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-6 text-lg text-muted">{service.answerFirst}</p>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="display text-3xl text-ink sm:text-4xl">{service.problem.heading}</h2>
        <p className="mt-4 text-muted">{service.problem.body}</p>
      </section>

      {/* Approach */}
      <section className="bg-surface-2 py-14 dark:bg-surface">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="display text-3xl text-ink sm:text-4xl">{service.approach.heading}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {service.approach.points.map((p, i) => (
              <div key={p.title} className="rounded-3xl bg-surface p-6 dark:bg-surface-2">
                <span className="display text-3xl text-accent">{i + 1}</span>
                <h3 className="mt-2 font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="display text-3xl text-ink sm:text-4xl">{service.outcome.heading}</h2>
        <p className="mt-4 text-muted">{service.outcome.body}</p>
      </section>

      {/* Malaysia angle */}
      <section className="mx-auto max-w-4xl px-6 pb-6">
        <div className="rounded-3xl border-2 border-accent/40 bg-surface p-8">
          <h2 className="display text-2xl text-ink sm:text-3xl">🇲🇾 {service.malaysiaAngle.heading}</h2>
          <p className="mt-4 text-muted">{service.malaysiaAngle.body}</p>
          <div className="mt-6">
            <WhatsAppButton market={market} message={`Hi JPBC! I'd like to ask about ${service.name}.`}>
              {service.cta}
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="mx-auto max-w-4xl px-6 py-6 text-sm text-muted">
        Related:{" "}
        {services
          .filter((s) => s.slug !== service.slug)
          .map((s, i) => (
            <span key={s.slug}>
              {i > 0 && " · "}
              <Link href={`/services/${s.slug}`} className="font-semibold text-accent hover:underline">
                {s.name}
              </Link>
            </span>
          ))}
        {" · "}
        <Link href="/pricing" className="font-semibold text-accent hover:underline">
          Pricing
        </Link>
      </section>

      <CtaBand market={market} waMessage={`Hi JPBC! I'm interested in ${service.name}.`} />
    </>
  );
}
