import TermsPage, { termsMetadata } from "@/components/pages/TermsPage";
import { defaultMarket } from "@/config/markets";

export const metadata = termsMetadata(defaultMarket);

export default function Page() {
  return <TermsPage market={defaultMarket} />;
}
