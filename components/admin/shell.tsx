"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

/** Admin navigation: sidebar on desktop, scrollable tab bar on phones. */
export function AdminNav({ items, base }: { items: NavItem[]; base: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === base ? pathname === href || pathname === `${href}/` : pathname.startsWith(href));

  return (
    <>
      <nav aria-label="Admin" className="sticky top-14 z-30 -mx-4 overflow-x-auto border-b border-line bg-surface px-2 lg:hidden">
        <ul className="flex">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className={`block whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium ${
                  isActive(i.href) ? "border-accent text-accent-text" : "border-transparent text-muted"
                }`}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Admin" className="hidden w-48 shrink-0 lg:block">
        <ul className="sticky top-20 space-y-1">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(i.href) ? "bg-accent-soft text-accent-text" : "text-ink hover:bg-surface-2"
                }`}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
