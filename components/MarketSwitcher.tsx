"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Small footer switcher. Visitors choose their own market — we never
// auto-redirect on IP or browser locale (it breaks crawling and annoys
// people). The stored choice only marks the market in this list; it never
// forces a redirect.

const STORAGE_KEY = "jpbc-market";

export type SwitcherMarket = {
  code: string;
  label: string;
  flag: string;
  /** BCP-47 tag for the link's hreflang, e.g. "en-PH" */
  locale: string;
  pathPrefix: string;
};

type Props = {
  /** Enabled markets only — soft-launched ones stay unlinked */
  markets: SwitcherMarket[];
  /** Code of the market being viewed */
  current: string;
  /** Path prefix of the market being viewed, so we can find the current page */
  currentPrefix: string;
  /** Paths that exist in every market; anything else falls back to that market's home */
  sharedPaths: string[];
};

export default function MarketSwitcher({ markets, current, currentPrefix, sharedPaths }: Props) {
  const pathname = usePathname() ?? "/";
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    try {
      setSaved(localStorage.getItem(STORAGE_KEY));
    } catch {
      /* storage unavailable — the switcher still works */
    }
  }, []);

  // The current page without its market prefix, e.g. "/ph/pricing" → "/pricing".
  const basePath =
    currentPrefix && pathname.startsWith(currentPrefix)
      ? pathname.slice(currentPrefix.length) || "/"
      : pathname;

  const hrefFor = (market: SwitcherMarket) => {
    const home = market.pathPrefix || "/";
    if (basePath === "/" || !sharedPaths.includes(basePath)) return home;
    return `${market.pathPrefix}${basePath}`;
  };

  const remember = (code: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    setSaved(code);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-hero-muted">
      <span className="uppercase tracking-wider">Market</span>
      {markets.map((market) => {
        const isCurrent = market.code === current;
        return (
          <Link
            key={market.code}
            href={hrefFor(market)}
            hrefLang={market.locale}
            onClick={() => remember(market.code)}
            aria-current={isCurrent ? "true" : undefined}
            className={
              isCurrent
                ? "font-semibold text-accent"
                : "transition-colors hover:text-accent"
            }
          >
            <span aria-hidden>{market.flag}</span> {market.label}
            {!isCurrent && saved === market.code && (
              <span title="Your saved market" aria-label="Your saved market"> ·</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
