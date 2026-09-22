import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AlertTriangle, Leaf, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completeSupabaseCallback, supabaseAuthEnabled } from "@/lib/supabaseAuth";

export default function SupabaseCallback() {
  const [, navigate] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseAuthEnabled) {
      setError("Supabase staging sign-in is not enabled.");
      return;
    }

    let cancelled = false;
    void completeSupabaseCallback().then(result => {
      if (cancelled) return;
      if (result.error) {
        setError(result.error.message || "We could not complete that sign-in.");
        return;
      }
      navigate(result.next, { replace: true });
    });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <main className="grid min-h-[calc(100vh-4.6rem)] place-items-center bg-[oklch(0.96_0.025_105)] px-5 py-16">
      <section className="nature-card w-full max-w-md bg-background/90 p-8 text-center shadow-[0_24px_70px_-35px_rgba(39,58,43,.6)] backdrop-blur-xl" aria-live="polite">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-primary">
          {error ? <AlertTriangle className="h-7 w-7" /> : <LoaderCircle className="h-7 w-7 animate-spin" aria-hidden="true" />}
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Supabase staging</p>
        <h1 className="mt-3 font-serif text-3xl text-[oklch(0.3_0.055_145)]">{error ? "The handoff needs another try" : "Returning to your private space"}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {error ?? "We are securely completing your sign-in and preparing your ReForge session."}
        </p>
        {error ? (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => navigate("/sign-in", { replace: true })}>Return to sign in</Button>
            <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/70 hover:text-primary"><Leaf className="h-4 w-4" /> Explore ReForge</Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
