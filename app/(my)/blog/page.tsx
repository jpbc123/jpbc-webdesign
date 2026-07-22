import BlogPage, { blogMetadata } from "@/components/pages/BlogPage";
import { defaultMarket } from "@/config/markets";

export const metadata = blogMetadata(defaultMarket);

export default function Page() {
  return <BlogPage market={defaultMarket} />;
}
