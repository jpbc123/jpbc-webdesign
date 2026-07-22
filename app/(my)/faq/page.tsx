import FaqPage, { faqMetadata } from "@/components/pages/FaqPage";
import { defaultMarket } from "@/config/markets";

export const metadata = faqMetadata(defaultMarket);

export default function Page() {
  return <FaqPage market={defaultMarket} />;
}
