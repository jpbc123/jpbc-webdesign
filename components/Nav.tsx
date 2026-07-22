"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import ThemeToggle from "./ThemeToggle";
import { locations } from "@/data/locations";
import type { Market } from "@/config/markets/types";
import { mpath, waLink } from "@/lib/market";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/* Per-letter idle-blink timing [duration, delay] in seconds — deliberately
   uneven so the neon letters flick off and back on out of sync. */
const neonBlink: [number, number][] = [
  [4.7, 0.4], [6.1, 2.3], [3.9, 1.1], [5.3, 2.9], [4.1, 0.2], [5.9, 1.7],
  [3.6, 2.6], [6.7, 0.8], [4.4, 1.9], [5.1, 3.1], [3.3, 0.6],
];

const serviceLinks = [
  { href: "/services/web-design", label: "Web Design" },
  { href: "/services/seo", label: "Local SEO" },
  { href: "/services/google-business-profile", label: "Google Business Profile" },
];

export default function Nav({ market }: { market: Market }) {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"services" | "locations" | null>(null);
  const [expanded, setExpanded] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Expand the pill into a full-width bar once the top-of-page sentinel
  // scrolls out of view (no per-scroll-event work; the morph is pure CSS).
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setExpanded(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const close = () => {
    setOpen(false);
    setMobileGroup(null);
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="pointer-events-none absolute top-0 h-[60px] w-px" />
      <header className={"site-header sticky z-50 " + (expanded ? "site-header--expanded" : "")}>
      {/* Rounded pill nav bar floating over the hero */}
      <nav className="site-header-bar glow-card mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line bg-surface/90 px-4 py-2 shadow-lg shadow-navy/5 backdrop-blur sm:px-6">
        <Link
          href={mpath(market, "/")}
          aria-label="JPBC Web Designs"
          className="group flex flex-col items-start leading-none"
          onClick={close}
        >
          {/* Stacked wordmark: brand name over a descriptor spread to the same
              width. The bottom margin keeps the tag below clear of the
              descriptor. See .brand-lockup in globals.css for the knobs. */}
          <span className="brand-lockup mb-0.5">
            <span className="brand-name display">JPBC</span>
            <span className="brand-desc display">
              <span>Web</span>
              <span>Designs</span>
            </span>
          </span>
          {/* "Lepas Kerja" tag appears under the logo in dark mode only.
              Letters warm up neon-sign style each time dark mode switches on
              (display:none -> inline restarts the CSS animations), then keep
              blinking off/on individually per the neonBlink timings. */}
          <span className="neon-tag hidden self-end font-script text-base leading-none text-accent dark:inline" aria-hidden>
            {"after hours".split("").map((ch, i) =>
              ch === " " ? (
                <span key={i}>{" "}</span>
              ) : (
                <span
                  key={i}
                  className={i === 2 ? "neon-letter neon-letter--flicker" : "neon-letter"}
                  style={
                    {
                      "--d": `${i * 0.1}s`,
                      "--fdur": `${neonBlink[i % neonBlink.length][0]}s`,
                      "--fdel": `${neonBlink[i % neonBlink.length][1]}s`,
                    } as CSSProperties
                  }
                >
                  {ch}
                </span>
              )
            )}
          </span>
          {/* Holds the tag's line open in light mode so the wordmark sits at
              the same height in both themes. The tag itself stays display:none
              there — that's what restarts its warm-up on the switch to dark. */}
          <span aria-hidden className="block h-4 dark:hidden" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {market.pages.services && (
            <div className="group relative">
              <button
                type="button"
                className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink"
                aria-haspopup="true"
              >
                Services ▾
              </button>
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="glow-card w-64 rounded-2xl border border-line bg-surface p-2 shadow-xl">
                  {serviceLinks.map((s) => (
                    <Link key={s.href} href={mpath(market, s.href)} className="block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-ink">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {market.pages.locations && (
            <div className="group relative">
              <button
                type="button"
                className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink"
                aria-haspopup="true"
              >
                Top Locations ▾
              </button>
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="glow-card w-56 rounded-2xl border border-line bg-surface p-2 shadow-xl">
                  {locations.map((l) => (
                    <Link key={l.slug} href={mpath(market, `/locations/${l.slug}`)} className="block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-ink">
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {navLinks.map((l) => (
            <Link key={l.href} href={mpath(market, l.href)} className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={waLink(market)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink glow-accent sm:inline-block"
          >
            WhatsApp us
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="site-mobile-menu glow-card mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-surface p-4 shadow-xl lg:hidden">
          {market.pages.services && (
            <>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-medium text-ink"
                onClick={() => setMobileGroup(mobileGroup === "services" ? null : "services")}
                aria-expanded={mobileGroup === "services"}
              >
                Services <span aria-hidden>{mobileGroup === "services" ? "▴" : "▾"}</span>
              </button>
              {mobileGroup === "services" &&
                serviceLinks.map((s) => (
                  <Link key={s.href} href={mpath(market, s.href)} onClick={close} className="block rounded-xl px-6 py-2 text-sm text-muted">
                    {s.label}
                  </Link>
                ))}
            </>
          )}

          {market.pages.locations && (
            <>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-medium text-ink"
                onClick={() => setMobileGroup(mobileGroup === "locations" ? null : "locations")}
                aria-expanded={mobileGroup === "locations"}
              >
                Top Locations <span aria-hidden>{mobileGroup === "locations" ? "▴" : "▾"}</span>
              </button>
              {mobileGroup === "locations" &&
                locations.map((l) => (
                  <Link key={l.slug} href={mpath(market, `/locations/${l.slug}`)} onClick={close} className="block rounded-xl px-6 py-2 text-sm text-muted">
                    {l.name}
                  </Link>
                ))}
            </>
          )}

          {navLinks.map((l) => (
            <Link key={l.href} href={mpath(market, l.href)} onClick={close} className="block rounded-xl px-3 py-2 font-medium text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            href={mpath(market, "/get-started")}
            onClick={close}
            className="mt-2 block rounded-full bg-accent px-4 py-3 text-center font-semibold text-accent-ink"
          >
            Get started
          </Link>
        </div>
      )}
      </header>
    </>
  );
}
