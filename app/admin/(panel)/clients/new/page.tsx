import Link from "next/link";
import { ClientForm } from "@/components/admin/client-form";
import { adminHref, requireOwner } from "@/lib/admin";

export const metadata = { title: "New client" };

export default async function NewClientPage() {
  await requireOwner();
  return (
    <div className="space-y-6">
      <Link href={adminHref("/clients")} className="text-sm font-semibold text-accent-text hover:underline">
        ← Clients
      </Link>
      <h1 className="display text-3xl text-ink">New client</h1>
      <ClientForm />
    </div>
  );
}
