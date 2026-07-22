import MarketShell from "@/components/MarketShell";
import { defaultMarket } from "@/config/markets";

// Malaysia — the default market. It keeps the root URLs (no /my prefix), so
// this route group exists purely to give the MY pages their market chrome.
// Every other market is served from app/[market]/ using the same shared page
// components.

export default function MyMarketLayout({ children }: { children: React.ReactNode }) {
  return <MarketShell market={defaultMarket}>{children}</MarketShell>;
}
