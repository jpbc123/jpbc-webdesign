"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { locations } from "@/data/locations";
import { waLink } from "@/lib/site";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/web-design", label: "Web Design" },
  { href: "/services/seo", label: "Local SEO" },
  { href: "/services/google-business-profile", label: "Google Business Profile" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"services" | "locations" | null>(null);

  const close = () => {
    setOpen(false);
    setMobileGroup(null);
  };

  return (
    <header className="sticky top-3 z-50 px-3">
      {/* Rounded pill nav bar floating over the hero */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line bg-surface/90 px-4 py-2 shadow-lg shadow-navy/5 backdrop-blur sm:px-6">
        <Link href="/" className="group flex flex-col leading-none" onClick={close}>
          <span className="display text-lg tracking-wide text-ink">
            JPBC <span className="text-accent">Web Designs</span>
          </span>
          {/* "Lepas Kerja" tag appears under the logo in dark mode only */}
          <span className="hidden font-script text-sm leading-none text-accent dark:inline">
            lepas kerja
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button
              type="button"
              className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink"
              aria-haspopup="true"
            >
              Services ▾
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="w-64 rounded-2xl border border-line bg-surface p-2 shadow-xl">
                {serviceLinks.map((s) => (
                  <Link key={s.href} href={s.href} className="block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-ink">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button
              type="button"
              className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink"
              aria-haspopup="true"
            >
              Top Locations ▾
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="w-56 rounded-2xl border border-line bg-surface p-2 shadow-xl">
                {locations.map((l) => (
                  <Link key={l.slug} href={`/locations/${l.slug}`} className="block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-ink">
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={waLink()}
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
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-surface p-4 shadow-xl lg:hidden">
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
              <Link key={s.href} href={s.href} onClick={close} className="block rounded-xl px-6 py-2 text-sm text-muted">
                {s.label}
              </Link>
            ))}

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
              <Link key={l.slug} href={`/locations/${l.slug}`} onClick={close} className="block rounded-xl px-6 py-2 text-sm text-muted">
                {l.name}
              </Link>
            ))}

          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={close} className="block rounded-xl px-3 py-2 font-medium text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            onClick={close}
            className="mt-2 block rounded-full bg-accent px-4 py-3 text-center font-semibold text-accent-ink"
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}
