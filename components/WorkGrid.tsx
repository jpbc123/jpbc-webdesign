"use client";

import { useState } from "react";
import KindTag from "./KindTag";
import { categoriesFor, type PortfolioItem } from "@/data/portfolio";

/** Filterable grid; clicking a card expands its case details. */
export default function WorkGrid({ projects }: { projects: PortfolioItem[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const items = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {categoriesFor(projects).map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            aria-pressed={filter === c.key}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === c.key ? "bg-accent text-on-accent" : "bg-surface text-ink ring-1 ring-line hover:text-accent-text"
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
    <article className="card overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={open} className="block w-full text-left">
        <div className="relative m-3 mb-0 h-44 overflow-hidden rounded-xl bg-surface-2">
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
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
            <span className="pill !bg-surface">{item.industry}</span>
            {item.loadTime && (
              <span className="pill !bg-surface">⚡ {item.loadTime}</span>
            )}
          </div>
        </div>
        <div className="p-5">
          <KindTag kind={item.kind} />
          <h2 className="mt-3 text-xl font-bold text-ink">{item.name}</h2>
          <p className="mt-1 text-sm text-muted">{item.location}</p>
          <p className="mt-2 text-sm text-muted">{item.blurb}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-accent-text">
            {open ? "Hide case details ▴" : "View case details ▾"}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-line p-5 text-sm">
          {/* TODO: Replace with real before/after screenshots */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface-2 p-4">
              <p className="text-xs font-bold text-muted">Before</p>
              <p className="mt-1 text-muted">{item.beforeAfter.before}</p>
            </div>
            <div className="rounded-xl bg-accent-soft p-4">
              <p className="text-xs font-bold text-accent-text">After</p>
              <p className="mt-1 text-ink">{item.beforeAfter.after}</p>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold text-ink">What we built</p>
          <ul className="mt-2 space-y-1.5 text-muted">
            {item.built.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-accent-text" aria-hidden>✓</span> {b}
              </li>
            ))}
          </ul>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-5 !py-2 text-sm"
            >
              Visit live site
            </a>
          )}
        </div>
      )}
    </article>
  );
}
