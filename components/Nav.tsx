"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import ThemeToggle from "./ThemeToggle";
import OpenSign from "./OpenSign";
import { locations } from "@/data/locations";
import type { Market } from "@/config/markets/types";
import { mpath, waLink } from "@/lib/market";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
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

const linkClass =
  "whitespace-nowrap rounded-tag px-2.5 py-2 text-sm font-bold uppercase tracking-wide text-ink/80 transition-colors hover:bg-surface-2 hover:text-ink";

/** Dropdown on desktop: opens on hover or keyboard focus, no JS. */
function Dropdown({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  return (
    <div className="group relative">
      <button type="button" className={linkClass} aria-haspopup="true">
        {label} <span aria-hidden>▾</span>
      </button>
      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="board w-64 bg-surface p-1.5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-tag px-3 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Nav({ market }: { market: Market }) {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"services" | "locations" | null>(null);

  const close = () => {
    setOpen(false);
    setMobileGroup(null);
  };

  const services = serviceLinks.map((s) => ({ ...s, href: mpath(market, s.href) }));
  const places = locations.map((l) => ({ href: mpath(market, `/locations/${l.slug}`), label: l.name }));

  return (
    <header className="site-header sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href={mpath(market, "/")} aria-label="JPBC Web Designs" className="flex items-end gap-2" onClick={close}>
          {/* Signboard logo: JPBC in yellow on red, descriptor spread to the
              same width underneath. Knobs live in .brand-board (globals.css). */}
          <span className="brand-board">
            <span className="brand-name sign-lit">JPBC</span>
            <span className="brand-desc">
              <span>WEB</span>
              <span>DESIGNS</span>
            </span>
          </span>
          {/* "after hours" neon tag beside the logo, dark mode only. Letters warm
              up neon-sign style each time dark mode switches on (display:none ->
              inline restarts the CSS animations), then blink individually. */}
          <span className="hidden pb-0.5 font-script text-lg leading-none text-accent xl:dark:inline" aria-hidden>
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
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center lg:flex">
          {market.pages.services && <Dropdown label="Services" links={services} />}
          {market.pages.locations && <Dropdown label="Areas" links={places} />}
          {navLinks.map((l) => (
            <Link key={l.href} href={mpath(market, l.href)} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <OpenSign market={market} />
          <ThemeToggle />
          <a
            href={waLink(market)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden whitespace-nowrap !px-4 !py-2 sm:inline-flex"
          >
            WhatsApp us
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-tag border-2 border-frame bg-surface text-ink lg:hidden"
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
        <div className="border-t-2 border-frame bg-surface px-4 pb-5 pt-3 lg:hidden">
          {market.pages.services && (
            <>
              <button
                type="button"
                className="flex w-full items-center justify-between py-2.5 text-left font-bold uppercase tracking-wide text-ink"
                onClick={() => setMobileGroup(mobileGroup === "services" ? null : "services")}
                aria-expanded={mobileGroup === "services"}
              >
                Services <span aria-hidden>{mobileGroup === "services" ? "▴" : "▾"}</span>
              </button>
              {mobileGroup === "services" &&
                services.map((s) => (
                  <Link key={s.href} href={s.href} onClick={close} className="block py-2 pl-4 text-muted">
                    {s.label}
                  </Link>
                ))}
            </>
          )}

          {market.pages.locations && (
            <>
              <button
                type="button"
                className="flex w-full items-center justify-between py-2.5 text-left font-bold uppercase tracking-wide text-ink"
                onClick={() => setMobileGroup(mobileGroup === "locations" ? null : "locations")}
                aria-expanded={mobileGroup === "locations"}
              >
                Areas <span aria-hidden>{mobileGroup === "locations" ? "▴" : "▾"}</span>
              </button>
              {mobileGroup === "locations" &&
                places.map((l) => (
                  <Link key={l.href} href={l.href} onClick={close} className="block py-2 pl-4 text-muted">
                    {l.label}
                  </Link>
                ))}
            </>
          )}

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={mpath(market, l.href)}
              onClick={close}
              className="block py-2.5 font-bold uppercase tracking-wide text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link href={mpath(market, "/get-started")} onClick={close} className="btn btn-primary mt-3 w-full">
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}
