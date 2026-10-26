import { createBrowserSupabase, RECEIPTS_BUCKET } from "@/lib/supabase/browser";

/**
 * Uploads a payment proof straight from the browser into the private bucket
 * (the owner-only storage policy checks the session). Returns its path.
 */
export async function uploadReceipt(clientId: string, file: File): Promise<string> {
  if (file.size > 10 * 1024 * 1024) throw new Error("File is over 10 MB.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
  const path = `${clientId}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await createBrowserSupabase()
    .storage.from(RECEIPTS_BUCKET)
    .upload(path, file, { contentType: file.type });
  if (error) throw new Error(error.message);
  return path;
}
