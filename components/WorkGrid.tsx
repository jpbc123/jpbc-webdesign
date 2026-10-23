"use client";

import { useState } from "react";
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
            className={`rounded-tag border-2 border-frame px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              filter === c.key ? "bg-sign-black text-sign-black-ink" : "bg-surface text-ink hover:bg-surface-2"
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
    <article className="board overflow-hidden bg-surface">
      <button type="button" onClick={onToggle} aria-expanded={open} className="block w-full text-left">
        <div className="relative h-44 border-b-2 border-frame">
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
            <span className="plate">{item.industry}</span>
            {item.loadTime && (
              <span className="plate !bg-sign-yellow !text-sign-yellow-ink">⚡ {item.loadTime}</span>
            )}
          </div>
        </div>
        <div className="p-5">
          <h2 className="sign text-xl text-ink">{item.name}</h2>
          <p className="mt-1 text-sm text-muted">{item.location}</p>
          <p className="mt-2 text-sm text-muted">{item.blurb}</p>
          <span className="mt-3 inline-block text-sm font-bold text-accent">
            {open ? "Hide case details ▴" : "View case details ▾"}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t-2 border-frame p-5 text-sm">
          {/* TODO: Replace with real before/after screenshots */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-tag bg-surface-2 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Before</p>
              <p className="mt-1 text-muted">{item.beforeAfter.before}</p>
            </div>
            <div className="rounded-tag border-2 border-frame bg-sign-yellow p-4 text-sign-yellow-ink">
              <p className="text-xs font-bold uppercase tracking-wide">After</p>
              <p className="mt-1">{item.beforeAfter.after}</p>
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
              className="btn btn-primary mt-5 !py-2 text-xs"
            >
              Visit live site
            </a>
          )}
        </div>
      )}
    </article>
  );
}
