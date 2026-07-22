import GetStartedPage, { getStartedMetadata } from "@/components/pages/GetStartedPage";
import { defaultMarket } from "@/config/markets";

export const metadata = getStartedMetadata(defaultMarket);

export default function Page() {
  return <GetStartedPage market={defaultMarket} />;
}
