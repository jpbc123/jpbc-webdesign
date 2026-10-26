import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { AdminNav } from "@/components/admin/shell";
import { adminHref, requireOwner } from "@/lib/admin";
import { signOut } from "../_actions/auth";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireOwner();

  const nav = [
    { href: adminHref(""), label: "Dashboard" },
    { href: adminHref("/clients"), label: "Clients" },
    { href: adminHref("/payments"), label: "Payments" },
    { href: adminHref("/settings"), label: "Settings" },
  ];

  return (
    <>
      <header className="site-header sticky top-0 z-40 h-14">
        <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4">
          <Link href={adminHref("")} className="block origin-left scale-75">
            <Logo />
          </Link>
          <span className="pill">Admin</span>
          <div className="ml-auto flex items-center gap-2">
            <a href="/" target="_blank" className="hidden text-sm text-muted hover:text-accent-text sm:inline">
              View site ↗
            </a>
            <span className="hidden text-sm text-muted md:inline">{user.email}</span>
            <ThemeToggle />
            <form action={signOut}>
              <button className="rounded-full px-3 py-1.5 text-sm font-semibold text-ink hover:bg-surface-2">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 lg:flex lg:gap-8 lg:py-8">
        <AdminNav items={nav} base={adminHref("")} />
        <main className="min-w-0 flex-1 py-5 lg:py-0">{children}</main>
      </div>
    </>
  );
}
