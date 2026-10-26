import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Hidden client admin (same scheme as the Gary store).
 * - Requests to ADMIN_PATH/* are rewritten to the internal /admin/* routes.
 * - Direct requests to /admin/* get a 404, so the panel can't be discovered.
 * - Admin responses carry X-Robots-Tag: noindex and refresh the Supabase session.
 * Every other request passes straight through.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const raw = (process.env.ADMIN_PATH || "").trim().replace(/\/+$/, "");
  const base = raw ? (raw.startsWith("/") ? raw : `/${raw}`) : "";

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }

  if (!base || (pathname !== base && !pathname.startsWith(`${base}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/admin${pathname.slice(base.length)}`;

  let response = NextResponse.rewrite(url, { request });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return response;

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.rewrite(url, { request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });
  // Refreshes an expired access token; the admin layout does the real authorisation check.
  await supabase.auth.getUser();

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

// Skip build assets and static files; pages run the cheap pass-through above.
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|txt|xml|webmanifest)$).*)"],
};
