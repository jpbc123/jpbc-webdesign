import { createBrowserClient } from "@supabase/ssr";

/** Browser client for receipt uploads (uses the owner's session cookie). */
export function createBrowserSupabase() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    db: { schema: "jpbc" },
  });
}

export const RECEIPTS_BUCKET = "jpbc-receipts";
