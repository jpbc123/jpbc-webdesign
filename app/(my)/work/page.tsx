import WorkPage, { workMetadata } from "@/components/pages/WorkPage";
import { defaultMarket } from "@/config/markets";

export const metadata = workMetadata(defaultMarket);

export default function Page() {
  return <WorkPage market={defaultMarket} />;
}
