import AboutPage, { aboutMetadata } from "@/components/pages/AboutPage";
import { defaultMarket } from "@/config/markets";

export const metadata = aboutMetadata(defaultMarket);

export default function Page() {
  return <AboutPage market={defaultMarket} />;
}
