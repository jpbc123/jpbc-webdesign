import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// The client admin's data lives in the pvg-store Supabase project, inside its
// own `jpbc` schema (see supabase/migrations/0001_jpbc_admin.sql). These
// clients default to that schema, so .from("clients") means jpbc.clients.

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

/** Cookie-based client carrying the signed-in owner's session (admin pages & actions). */
export async function createAuthClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: "jpbc" },
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: the proxy refreshes the session instead.
        }
      },
    },
  });
}
