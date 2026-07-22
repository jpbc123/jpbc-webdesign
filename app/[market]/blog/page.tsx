import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPage, { blogMetadata } from "@/components/pages/BlogPage";
import { marketParams, resolveMarket } from "@/config/markets";

type Props = { params: Promise<{ market: string }> };

export function generateStaticParams() {
  return marketParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = resolveMarket((await params).market);
  return market ? blogMetadata(market) : {};
}

export default async function Page({ params }: Props) {
  const market = resolveMarket((await params).market);
  if (!market) notFound();
  return <BlogPage market={market} />;
}
