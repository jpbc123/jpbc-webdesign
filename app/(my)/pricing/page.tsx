import PricingPage, { pricingMetadata } from "@/components/pages/PricingPage";
import { defaultMarket } from "@/config/markets";

export const metadata = pricingMetadata(defaultMarket);

export default function Page() {
  return <PricingPage market={defaultMarket} />;
}
