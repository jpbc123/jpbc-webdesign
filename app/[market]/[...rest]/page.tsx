import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NotFoundSection from "@/components/NotFoundSection";
import { resolveMarket } from "@/config/markets";

// The 404 for prefixed markets. Anything under a market prefix that isn't a
// real page lands here: /ph/nope, /ph/locations/klang (city pages are
// Malaysia-only), and so on.
//
// WHY THIS IS A PAGE AND NOT A not-found.tsx BOUNDARY
//   Next.js renders not-found.tsx without route params, so a boundary at
//   app/[market]/ can't tell which market it's in — it would have to guess on
//   the client. Worse, notFound() on a dynamic route makes Next serve its
//   error document: an empty shell with the root layout's Malaysian metadata,
//   with every pixel client-rendered. Measured on this site, that response
//   contained no <nav>, <main>, or <footer> at all.
//
//   Rendering the 404 as an ordinary page keeps it server-rendered inside
//   app/[market]/layout.tsx, so the market's nav, footer, prices, and WhatsApp
//   number are all correct and present in the HTML.
//
//   The trade-off: an ordinary page returns HTTP 200, not 404. These URLs are
//   noindex (below) so they stay out of search results, but Search Console may
//   report them as soft 404s. If a true 404 status matters more than the
//   rendered page, swap this file for a notFound() call and accept the shell.

type Props = { params: Promise<{ market: string; rest: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = resolveMarket((await params).market);
  return {
    title: market ? market.voice.notFound.heading : "Page not found",
    robots: { index: false, follow: false },
  };
}

export default async function MarketNotFound({ params }: Props) {
  const market = resolveMarket((await params).market);
  // Unknown prefix — fall through to the root 404, which is a real 404.
  if (!market) notFound();
  return <NotFoundSection market={market} />;
}
