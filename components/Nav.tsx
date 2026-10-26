"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
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

const serviceLinks = [
  { href: "/services/web-design", label: "Web Design" },
  { href: "/services/seo", label: "Local SEO" },
  { href: "/services/google-business-profile", label: "Google Business Profile" },
];

const linkClass =
  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium xl:px-4 text-muted transition-colors hover:text-accent-text";

/**
 * Dropdown on desktop: opens on hover, click or keyboard focus. Held in state
 * (not CSS :focus-within) so it closes once an option is picked: client-side
 * navigation keeps focus on the clicked link, which would hold a CSS-only
 * menu open on the new page.
 */
function Dropdown({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button type="button" className={linkClass} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}>
        {label} <span aria-hidden>▾</span>
      </button>
      <div className={`absolute left-0 top-full pt-2 transition-opacity ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="card w-64 p-1.5 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-surface-2 hover:text-accent-text"
            >
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
  const [mobileGroup, setMobileGroup] = useState<"services" | null>(null);

  const close = () => {
    setOpen(false);
    setMobileGroup(null);
  };

  const services = serviceLinks.map((s) => ({ ...s, href: mpath(market, s.href) }));

  return (
    <header className="site-header sticky top-0 z-50">
      {/* Three columns with equal outer tracks, so the links stay centred on the
          page whether or not the "after hours" neon is showing beside the logo. */}
      <nav className="mx-auto grid h-18 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
        <Link href={mpath(market, "/")} aria-label="JPBC Web Designs" className="justify-self-start" onClick={close}>
          <Logo afterHours="wide" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center lg:flex">
          {market.pages.services && <Dropdown label="Services" links={services} />}
          {navLinks.map((l) => (
            <Link key={l.href} href={mpath(market, l.href)} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <ThemeToggle />
          <a
            href={waLink(market)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden whitespace-nowrap !px-5 !py-2.5 text-sm sm:inline-flex"
          >
            WhatsApp us
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line lg:hidden"
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
        <div className="border-t border-line bg-surface px-4 pb-5 pt-3 lg:hidden">
          {market.pages.services && (
            <>
              <button
                type="button"
                className="flex w-full items-center justify-between py-2.5 text-left font-semibold text-ink"
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

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={mpath(market, l.href)}
              onClick={close}
              className="block py-2.5 font-semibold text-ink"
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
