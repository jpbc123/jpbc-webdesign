"use client";

import { useState } from "react";
import { portfolio, portfolioCategories, type PortfolioItem } from "@/data/portfolio";

/** Filterable grid; clicking a card expands its case details. */
export default function WorkGrid() {
  const [filter, setFilter] = useState<string>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const items = portfolio.filter((p) => filter === "all" || p.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {portfolioCategories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            aria-pressed={filter === c.key}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === c.key
                ? "bg-accent text-accent-ink"
                : "border border-line bg-surface text-muted hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Card key={p.slug} item={p} open={openSlug === p.slug} onToggle={() => setOpenSlug(openSlug === p.slug ? null : p.slug)} />
        ))}
      </div>
    </div>
  );
}

function Card({ item, open, onToggle }: { item: PortfolioItem; open: boolean; onToggle: () => void }) {
  return (
    <article className={`overflow-hidden rounded-3xl border bg-surface transition-all ${open ? "border-accent shadow-xl" : "glow-card border-line"}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="block w-full text-left">
        <div className="relative h-40">
          {item.image ? (
            <img
              src={item.image}
              alt={`Screenshot of the ${item.name} website`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} aria-hidden />
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">{item.industry}</span>
            {item.loadTime && (
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">⚡ {item.loadTime}</span>
            )}
          </div>
        </div>
        <div className="p-5">
          <h2 className="font-bold text-ink">{item.name}</h2>
          <p className="mt-1 text-sm text-muted">{item.location}</p>
          <p className="mt-2 text-sm text-muted">{item.blurb}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-accent">
            {open ? "Hide case details ▴" : "View case details ▾"}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-line p-5 text-sm">
          {/* TODO: Replace with real before/after screenshots */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-2 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Before</p>
              <p className="mt-1 text-muted">{item.beforeAfter.before}</p>
            </div>
            <div className="rounded-2xl border border-accent/40 bg-surface-2 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">After</p>
              <p className="mt-1 text-muted">{item.beforeAfter.after}</p>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">What we built</p>
          <ul className="mt-2 space-y-1.5 text-muted">
            {item.built.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-accent" aria-hidden>✓</span> {b}
              </li>
            ))}
          </ul>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold text-accent hover:underline"
            >
              Visit live site
            </a>
          )}
        </div>
      )}
    </article>
  );
}
