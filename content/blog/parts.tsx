import Link from "next/link";
import type { Market } from "@/config/markets/types";
import { waLink } from "@/lib/market";

// Small building blocks shared by the article bodies in content/blog/.

/** Yellow notice board for the one thing a skimming reader must not miss. */
export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="board my-8 bg-sign-yellow p-5 text-sign-yellow-ink sm:p-6">
      <p className="sign text-sm tracking-wider">{title}</p>
      <div className="mt-2 text-base leading-relaxed [&_a]:font-bold [&_a]:text-sign-yellow-ink [&_a]:underline">{children}</div>
    </aside>
  );
}

/** A table that scrolls sideways on narrow phones instead of widening the page. */
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="min-w-[34rem]">{children}</table>
    </div>
  );
}

/** Internal link to another page on the site. */
export function To({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href}>{children}</Link>;
}

/** Link out to a source; opens in a new tab and passes no referrer weight. */
export function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow">
      {children}
    </a>
  );
}

/** A soft, in-article invitation to ask us on WhatsApp. */
export function AskUs({ market, message, children }: { market: Market; message: string; children: React.ReactNode }) {
  return (
    <p className="board bg-surface p-5 text-base">
      {children}{" "}
      <a href={waLink(market, message)} target="_blank" rel="noopener noreferrer">
        WhatsApp us
      </a>
      .
    </p>
  );
}
