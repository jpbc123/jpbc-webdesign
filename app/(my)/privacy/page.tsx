import PrivacyPage, { privacyMetadata } from "@/components/pages/PrivacyPage";
import { defaultMarket } from "@/config/markets";

export const metadata = privacyMetadata(defaultMarket);

export default function Page() {
  return <PrivacyPage market={defaultMarket} />;
}
