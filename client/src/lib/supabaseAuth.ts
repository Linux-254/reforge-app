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

export async function getSupabaseAccessToken() {
  const supabase = getSupabaseAuthClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function completeSupabaseCallback() {
  const supabase = getSupabaseAuthClient();
  if (!supabase) return { next: "/dashboard", error: new Error("Supabase Auth is not enabled") };

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const rawNext = params.get("next") ?? "/dashboard";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";
  if (!code) return { next, error: new Error("Supabase callback code is missing") };

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return { next, error };

  sessionStorage.removeItem("reforge-oauth-pending");
  window.dispatchEvent(new Event("reforge:oauth-complete"));
  return { next, error: null };
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
