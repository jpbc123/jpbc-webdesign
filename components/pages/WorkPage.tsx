import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";
import CtaBand from "@/components/CtaBand";
import KindTag from "@/components/KindTag";
import ProductsSection from "@/components/ProductsSection";
import SectionHeading from "@/components/SectionHeading";
import { industryDemosFor } from "@/data/industryDemos";
import { portfolioFor } from "@/data/portfolio";
import type { Market } from "@/config/markets/types";
import { waLink } from "@/lib/market";
import { marketMetadata } from "@/lib/seo";

export function workMetadata(market: Market): Metadata {
  return marketMetadata(market, "work", "/work");
}

export default function WorkPage({ market }: { market: Market }) {
  const projects = portfolioFor(market);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <p className="eyebrow mb-3">Our work</p>
        <h1 className="display text-[2.6rem] text-ink sm:text-5xl lg:text-6xl">Our work</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 text-lg text-muted">{market.voice.workAnswerFirst}</p>
        <p className="mt-4 text-lg text-muted">
          We also build custom software: web apps like our own MY Swift Audit and MyResit, AI chatbots for your website
          or WhatsApp, AI that reads receipts, invoices and statements into clean data, online stores, booking and
          ordering systems, dashboards and internal tools, and automations that connect the tools you already use.{" "}
          <a
            href={waLink(market, "Hi JPBC Web Designs, I'd like to talk about custom software for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent-text underline underline-offset-2"
          >
            Tell us what you need on WhatsApp →
          </a>
        </p>
      </section>

      <ProductsSection market={market} />

      {projects.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <SectionHeading eyebrow="Live projects" title="Recent work" />
          <div className="mt-8">
            <WorkGrid projects={projects} />
          </div>
        </section>
      )}

      {/* ---------- WEBSITES BY INDUSTRY (live demo sites, not client work) ---------- */}
      {market.workExamples.showIndustryDemos && (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <SectionHeading
            eyebrow="Demo sites"
            title="Websites by industry"
            intro="Live demo sites showing exactly what we build for your type of business. Explore one, then imagine it with your name on it — we'll build your free preview to prove it."
          />
          {market.workExamples.demosNote && (
            <p className="mt-3 max-w-3xl text-sm text-muted">{market.workExamples.demosNote}</p>
          )}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industryDemosFor(market).map((d) => (
              <a
                key={d.slug}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex flex-col p-6"
              >
                <span className="self-start"><KindTag kind="Concept / demo build" /></span>
                <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-accent-text">{d.name}</h3>
                <p className="mt-3 text-sm text-muted">{d.blurb}</p>
                <span className="mt-auto pt-4 text-sm font-semibold text-accent-text">Explore the demo →</span>
              </a>
            ))}
            <a
              href={waLink(market)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line-strong p-6 text-center transition-colors hover:bg-surface"
            >
              <span className="text-xl font-bold text-ink">Your industry next? →</span>
              <p className="mt-2 text-sm text-muted">WhatsApp us and we&apos;ll build your free preview.</p>
            </a>
          </div>
        </section>
      )}

      <CtaBand
        market={market}
        heading="Want yours on this page?"
        sub="Every project here started with one WhatsApp message."
      />
    </>
  );
}
