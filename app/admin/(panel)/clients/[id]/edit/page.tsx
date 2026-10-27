import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientForm } from "@/components/admin/client-form";
import { ConfirmButton } from "@/components/admin/ui";
import { deleteClient } from "@/app/admin/_actions/clients";
import { adminHref, requireOwner } from "@/lib/admin";
import type { Client } from "@/lib/billing";

export const metadata = { title: "Edit client" };

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireOwner();
  const { data: client } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (!client) notFound();
  const c = client as Client;

  return (
    <div className="space-y-6">
      <Link href={adminHref(`/clients/${c.id}`)} className="text-sm font-semibold text-accent-text hover:underline">
        ← {c.business_name}
      </Link>
      <h1 className="display text-3xl text-ink">Edit client</h1>
      <ClientForm client={c} />
      <ConfirmButton action={deleteClient.bind(null, c.id)} message={`Delete ${c.business_name}? This can't be undone.`}>
        Delete client
      </ConfirmButton>
    </div>
  );
}
