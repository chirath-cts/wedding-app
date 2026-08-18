"use client";

import { createClient } from "@supabase/supabase-js";

// Browser-side client using only the public anon key — safe to ship to
// guests/admins. It is used exclusively for uploading files directly to
// Storage via a short-lived signed URL minted by a server action; it has
// no access to the guests table (RLS blocks that entirely for this key).
let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowser() {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Uploads aren't configured yet. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
    );
  }

  cachedClient = createClient(url, anonKey);
  return cachedClient;
}
