import { redirect } from "next/navigation";
import { createAuthClient, hasSupabase } from "./supabase/server";

/**
 * The client admin lives in app/admin but is only reachable at the secret
 * ADMIN_PATH (e.g. /manage-xyz). proxy.ts rewrites ADMIN_PATH/* → /admin/*
 * and returns 404 for direct /admin requests.
 */
export function adminBasePath(): string {
  const raw = (process.env.ADMIN_PATH || "").trim().replace(/\/+$/, "");
  if (!raw) return "";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

/** Public URL for an admin page, e.g. adminHref("/clients") → "/manage-xyz/clients". */
export function adminHref(path = ""): string {
  return `${adminBasePath()}${path}`;
}

/**
 * Ensures the request comes from the signed-in owner (a user in jpbc.admins).
 * Use in every admin page and action. Never the store's is_admin(): Gary is a
 * store admin in the same project.
 */
export async function requireOwner() {
  if (!hasSupabase) redirect(adminHref("/login?error=no-supabase"));
  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(adminHref("/login"));

  const { data: isOwner } = await supabase.rpc("is_owner");
  if (!isOwner) redirect(adminHref("/login?error=not-owner"));

  return { supabase, user };
}
