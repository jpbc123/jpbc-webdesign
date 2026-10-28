import type { Metadata } from "next";
import type { ReactNode } from "react";
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

// Stroke icons (24px grid, Lucide-style) for the "What else" tiles.
const icons = {
  app: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20M6 6.5h.01M9 6.5h.01" /></>,
  store: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  chart: <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  lead: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
  star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />,
  book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  plus: <path d="M12 5v14M5 12h14" />,
};
type IconName = keyof typeof icons;

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {icons[name]}
    </svg>
  );
}

// Mini UI mockups that slide into the top-right of the custom software cards on hover.
// Drawn with theme tokens so they follow light/dark mode; illustrative only, not client screenshots.
const box = "fill-surface stroke-line-strong";
const bar = "fill-line-strong";
const peeks: Partial<Record<IconName, ReactNode>> = {
  app: (
    <>
      <rect x="1" y="1" width="142" height="94" rx="8" className={box} />
      <path d="M1 16h142" className="stroke-line-strong" />
      <circle cx="10" cy="8.5" r="2.5" className="fill-accent" /><circle cx="18" cy="8.5" r="2.5" className={bar} /><circle cx="26" cy="8.5" r="2.5" className={bar} />
      <rect x="8" y="23" width="30" height="65" rx="4" className="fill-accent-soft" />
      <rect x="13" y="30" width="20" height="4" rx="2" className="fill-accent" />
      <rect x="13" y="40" width="16" height="4" rx="2" className={bar} /><rect x="13" y="50" width="18" height="4" rx="2" className={bar} />
      <rect x="46" y="23" width="90" height="10" rx="3" className={bar} />
      <rect x="46" y="39" width="42" height="49" rx="4" className="fill-accent-soft" /><rect x="94" y="39" width="42" height="49" rx="4" className="fill-accent-soft" />
      <rect x="52" y="76" width="30" height="6" rx="3" className="fill-accent" /><rect x="100" y="76" width="22" height="6" rx="3" className={bar} />
    </>
  ),
  store: (
    <>
      {[4, 52, 100].map((x, i) => (
        <g key={x}>
          <rect x={x} y="6" width="40" height="84" rx="6" className={box} />
          <rect x={x + 5} y="11" width="30" height="34" rx="4" className="fill-accent-soft" />
          <rect x={x + 5} y="52" width="24" height="4" rx="2" className={bar} />
          <rect x={x + 5} y="61" width="14" height="4" rx="2" className="fill-accent" />
          <rect x={x + 5} y="72" width="30" height="11" rx="3" className={i === 1 ? "fill-accent" : bar} />
        </g>
      ))}
      <circle cx="132" cy="10" r="8" className="fill-accent" />
      <text x="132" y="13.5" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-on-accent">3</text>
    </>
  ),
  calendar: (
    <>
      <rect x="1" y="1" width="142" height="94" rx="8" className={box} />
      <rect x="10" y="9" width="44" height="6" rx="3" className="fill-ink/70" />
      {Array.from({ length: 21 }, (_, i) => {
        const booked = [3, 9, 10, 16].includes(i);
        return <rect key={i} x={10 + (i % 7) * 18} y={24 + Math.floor(i / 7) * 22} width="14" height="16" rx="3" className={booked ? "fill-accent" : i === 12 ? "fill-accent-soft stroke-accent" : "fill-accent-soft"} />;
      })}
    </>
  ),
  chart: (
    <>
      <rect x="1" y="1" width="142" height="94" rx="8" className={box} />
      <rect x="10" y="10" width="38" height="20" rx="4" className="fill-accent-soft" /><rect x="14" y="15" width="22" height="5" rx="2" className="fill-accent" />
      <rect x="54" y="10" width="38" height="20" rx="4" className="fill-accent-soft" /><rect x="58" y="15" width="16" height="5" rx="2" className={bar} />
      {[52, 44, 58, 38, 30].map((y, i) => (
        <rect key={i} x={14 + i * 18} y={y} width="10" height={86 - y} rx="2" className={i === 4 ? "fill-accent" : "fill-accent-soft"} />
      ))}
      <path d="M19 56 37 48 55 60 73 42 91 34 128 22" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent" />
      <circle cx="128" cy="22" r="3.5" className="fill-accent" />
    </>
  ),
  link: (
    <>
      <path d="M30 22 72 48M30 74 72 48M72 48h42" fill="none" strokeWidth="2" strokeDasharray="4 4" className="stroke-accent" />
      {[[16, 22], [16, 74], [128, 48]].map(([cx, cy]) => (
        <g key={cx + cy}>
          <rect x={cx - 15} y={cy - 13} width="30" height="26" rx="6" className={box} />
          <rect x={cx - 8} y={cy - 5} width="16" height="3" rx="1.5" className={bar} />
          <rect x={cx - 8} y={cy + 2} width="11" height="3" rx="1.5" className={bar} />
        </g>
      ))}
      <circle cx="72" cy="48" r="15" className="fill-accent" />
      <path d="m66 48 4 4 8-8" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-on-accent" />
    </>
  ),
};

type Offer = [IconName, string, string];

const customSoftware: Offer[] = [
  ["app", "Web apps and client portals", "Built to fit how your business works, like our own MY Swift Audit and MyResit."],
  ["store", "Online stores", "A product catalogue, cart and orders you manage from your own private admin."],
  ["calendar", "Booking and ordering systems", "Customers book or order online, and you see everything in one place."],
  ["chart", "Dashboards and internal tools", "Sales, stock, jobs or payments at a glance, instead of scattered spreadsheets."],
  ["link", "Integrations", "Connect the tools you already use, such as Google Sheets, email and accounting software."],
];

const aiAutomation: Offer[] = [
  ["chat", "AI customer chat", "An assistant on your website or WhatsApp Business number that answers common questions any time and hands real leads to you."],
  ["lead", "Lead follow-up", "New enquiries get an instant reply and are sorted and logged in a sheet or CRM, so none slip through."],
  ["doc", "Quotes and reports", "Drafted from your own templates and data, ready for you to check and send."],
  ["star", "Google review replies", "Polite, on-brand replies drafted for every review."],
  ["book", "Staff assistant", "An internal helper that answers questions from your SOPs, price lists and policies."],
  ["pen", "Content and translation", "Product descriptions, posts and translations drafted for you to approve."],
  ["zap", "Workflow automation", "Repetitive admin such as reminders, data entry and file sorting, done automatically."],
];

export default function WorkPage({ market }: { market: Market }) {
  const projects = portfolioFor(market);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16">
        <p className="eyebrow mb-3">Our work</p>
        <h1 className="display text-[2.6rem] text-ink sm:text-5xl lg:text-6xl">Our work</h1>
        {/* Answer-first for SEO/AEO */}
        <p className="mt-4 text-lg text-muted">{market.voice.workAnswerFirst}</p>
      </section>

      {/* ---------- BEYOND WEBSITES (question heading + lists for AEO) ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeading
          eyebrow="Beyond websites"
          title="What else does JPBC build?"
          intro="Custom software and AI automation for small businesses: tools that save your team hours of admin each week. Our own products, MyResit and MY Swift Audit, run on the same technology."
        />

        <h3 className="mt-12 text-2xl font-bold text-ink">Custom software</h3>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {customSoftware.map(([icon, name, body]) => (
            <li key={name} className="card group relative overflow-hidden p-6 transition duration-300 ease-out motion-safe:hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_rgb(29_78_216/0.45),0_18px_40px_-20px_rgb(29_78_216/0.45)]">
              {peeks[icon] && (
                <svg
                  viewBox="0 0 144 96"
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-4 hidden w-24 opacity-0 transition duration-500 ease-out sm:block motion-safe:translate-x-3 motion-safe:-rotate-2 group-hover:opacity-100 motion-safe:group-hover:translate-x-0 motion-safe:group-hover:rotate-0 [@media(hover:none)]:opacity-60"
                >
                  {peeks[icon]}
                </svg>
              )}
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent-text transition duration-300 group-hover:bg-accent group-hover:text-on-accent motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                <Icon name={icon} />
              </span>
              <h4 className="mt-4 text-lg font-bold text-ink transition-colors group-hover:text-accent-text">{name}</h4>
              <p className="mt-1.5 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
          <li>
            <a
              href={waLink(market, "Hi JPBC Web Designs, I'd like to talk about custom software or AI automation for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-center rounded-2xl border-2 border-dashed border-line-strong p-6 transition duration-300 ease-out motion-safe:hover:-translate-y-1 hover:border-accent hover:bg-accent-soft"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-on-accent transition duration-300 motion-safe:group-hover:rotate-90">
                <Icon name="plus" />
              </span>
              <span className="mt-4 text-lg font-bold text-ink group-hover:text-accent-text">Something else in mind?</span>
              <span className="mt-1.5 leading-relaxed text-muted">Tell us the problem on WhatsApp and we&apos;ll suggest the simplest fix.{" "}
                <span className="inline-block transition-transform motion-safe:group-hover:translate-x-1">→</span>
              </span>
            </a>
          </li>
        </ul>

        <div className="mt-14 rounded-3xl bg-head p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-head-ink/60">Save hours every week</p>
          <h3 className="mt-2 text-2xl font-bold text-head-ink sm:text-3xl">AI automation</h3>
          <p className="mt-3 leading-relaxed text-head-ink/75">
            Let AI automation handle the repetitive work, while you stay in control of anything that matters.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiAutomation.map(([icon, name, body]) => (
              <li key={name} className="group rounded-2xl bg-head-ink/[0.06] p-5 ring-1 ring-head-ink/10 transition duration-300 ease-out motion-safe:hover:-translate-y-1 hover:bg-head-ink/[0.1] hover:ring-accent/70 hover:shadow-[0_18px_40px_-16px_rgb(29_78_216/0.55)]">
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-on-accent transition duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                  <Icon name={icon} />
                </span>
                <h4 className="mt-4 font-bold text-head-ink">{name}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-head-ink/70">{body}</p>
              </li>
            ))}
            <li>
              <a
                href={waLink(market, "Hi JPBC Web Designs, I'd like to talk about custom software or AI automation for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-center rounded-2xl bg-accent p-5 text-on-accent transition duration-300 ease-out motion-safe:hover:-translate-y-1 hover:bg-accent-hover hover:shadow-[0_18px_40px_-16px_rgb(29_78_216/0.7)]"
              >
                <span className="font-bold">Not sure where AI automation fits?</span>
                <span className="mt-1.5 text-sm leading-relaxed opacity-90">Tell us what eats your week, and we&apos;ll show you what can be automated.{" "}
                  <span className="inline-block transition-transform motion-safe:group-hover:translate-x-1">→</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
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
            <p className="mt-3 text-sm text-muted">{market.workExamples.demosNote}</p>
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
