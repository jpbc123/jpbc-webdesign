import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketShell from "@/components/MarketShell";
import { marketParams, resolveMarket } from "@/config/markets";
import { mpath } from "@/lib/market";
import { marketRobots } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

// Every market except the default one is served from here: /ph, /au, and any
// market added later. The pages themselves are the same shared components the
// Malaysian routes use — see components/pages/.

type Props = { params: Promise<{ market: string }> };

export function generateStaticParams() {
  return marketParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = resolveMarket((await params).market);
  if (!market) return {};
  return {
    // A soft-launched market stays out of the index until `enabled` flips.
    robots: marketRobots(market),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: market.ogLocale,
      url: mpath(market, "/"),
    },
  };
}

export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const market = resolveMarket((await params).market);
  if (!market) notFound();
  return <MarketShell market={market}>{children}</MarketShell>;
}
