import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabaseAuthEnabled = import.meta.env.VITE_SUPABASE_AUTH_ENABLED === "true";

let client: SupabaseClient | null = null;

export function getSupabaseAuthClient() {
  if (!supabaseAuthEnabled || !url || !publishableKey) return null;
  client ??= createClient(url, publishableKey, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}

export async function startSupabaseGoogleSignIn(next = "/dashboard") {
  const supabase = getSupabaseAuthClient();
  if (!supabase) return { error: new Error("Supabase Auth is not enabled") };

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  const redirectTo = `${window.location.origin}/auth/supabase/callback?next=${encodeURIComponent(safeNext)}`;
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
}
