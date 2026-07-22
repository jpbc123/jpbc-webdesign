import ContactPage, { contactMetadata } from "@/components/pages/ContactPage";
import { defaultMarket } from "@/config/markets";

export const metadata = contactMetadata(defaultMarket);

export default function Page() {
  return <ContactPage market={defaultMarket} />;
}
