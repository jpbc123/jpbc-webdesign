import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PricingPage, { pricingMetadata } from "@/components/pages/PricingPage";
import { marketParams, resolveMarket } from "@/config/markets";

type Props = { params: Promise<{ market: string }> };

export function generateStaticParams() {
  return marketParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = resolveMarket((await params).market);
  return market ? pricingMetadata(market) : {};
}

export default async function Page({ params }: Props) {
  const market = resolveMarket((await params).market);
  if (!market) notFound();
  return <PricingPage market={market} />;
}
