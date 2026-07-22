import MarketShell from "@/components/MarketShell";
import NotFoundSection from "@/components/NotFoundSection";
import { defaultMarket } from "@/config/markets";

// The root 404: unmatched URLs with no market prefix, e.g. /nonsense. Those
// belong to the default market, since Malaysia serves the root — so this
// brings its own chrome and its own market. Next returns a real HTTP 404 here.
//
// Prefixed markets can't use this boundary: Next.js renders not-found.tsx
// without route params, so it could never tell /ph from /au. They're handled
// by app/[market]/[...rest] instead.

export default function NotFound() {
  return (
    <MarketShell market={defaultMarket}>
      <NotFoundSection market={defaultMarket} />
    </MarketShell>
  );
}
