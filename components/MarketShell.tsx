import Nav from "./Nav";
import Footer from "./Footer";
import type { Market } from "@/config/markets/types";

/**
 * Chrome around every page: nav, main, footer — all wired to one market.
 * Used by the market layouts (app/(my) and app/[market]) and by the 404 page,
 * which sits outside both.
 */
export default function MarketShell({
  market,
  children,
}: {
  market: Market;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav market={market} />
      <main id="main">{children}</main>
      <Footer market={market} />
    </>
  );
}
