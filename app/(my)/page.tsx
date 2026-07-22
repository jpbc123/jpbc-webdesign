import HomePage, { homeMetadata } from "@/components/pages/HomePage";
import { defaultMarket } from "@/config/markets";

export const metadata = homeMetadata(defaultMarket);

export default function Page() {
  return <HomePage market={defaultMarket} />;
}
