import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkPage, { workMetadata } from "@/components/pages/WorkPage";
import { marketParams, resolveMarket } from "@/config/markets";

type Props = { params: Promise<{ market: string }> };

export function generateStaticParams() {
  return marketParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = resolveMarket((await params).market);
  return market ? workMetadata(market) : {};
}

export default async function Page({ params }: Props) {
  const market = resolveMarket((await params).market);
  if (!market) notFound();
  return <WorkPage market={market} />;
}
