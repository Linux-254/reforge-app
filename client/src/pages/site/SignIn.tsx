import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, User, HeartHandshake, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startLogin } from "@/const";
import { natureAsset } from "@/config/assets";
import { getSupabaseAuthClient, startSupabaseGoogleSignIn, supabaseAuthEnabled } from "@/lib/supabaseAuth";
import { useDemoSession } from "@/lib/demoSession";

export default function SignIn() {
  const demoMode = import.meta.env.VITE_DEMO_MODE !== "false";
  const [supabaseLoading, setSupabaseLoading] = useState(false);
  const { setRole } = useDemoSession();
  const [, setLocation] = useLocation();

  async function handleSupabaseSignIn() {
    setSupabaseLoading(true);
    const result = await startSupabaseGoogleSignIn();
    if (result.error) setSupabaseLoading(false);
  }

  const enterAsRole = (roleKey: "member" | "supporter" | "coach" | "admin") => {
    setRole(roleKey);
    if (roleKey === "admin") {
      setLocation("/admin");
    } else {
      setLocation("/dashboard");
    }
  };

  if (demoMode) {
    return (
      <main className="relative min-h-[calc(100vh-4.6rem)] overflow-hidden bg-background">
        <img
          src={natureAsset("signIn")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(247,245,232,.95),rgba(247,245,232,.75),rgba(39,58,43,.25))] dark:bg-[linear-gradient(110deg,rgba(20,28,22,.96),rgba(20,28,22,.8),rgba(15,22,17,.6))]" />
        
        <div className="container relative grid min-h-[calc(100vh-4.6rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_480px]">
          <section className="max-w-xl space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Leaf className="h-4 w-4" /> Return to ReForge home
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Public Demo Experience
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl leading-[1.05] text-foreground font-bold">
              Step into the garden.
            </h1>
            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              Experience the full ReForge ecosystem with zero authentication barriers. Select any persona to experience the tailored interface for members, loved ones, clinicians, or administrators.
            </p>
          </section>

          <section
            className="nature-card bg-card/85 p-6 sm:p-8 shadow-[0_24px_70px_-35px_rgba(39,58,43,.5)] backdrop-blur-xl border border-border/80 rounded-3xl"
            aria-labelledby="demo-title"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 id="demo-title" className="font-serif text-2xl font-bold text-foreground">
                  Select Your Demo Role
                </h2>
                <p className="text-xs text-muted-foreground">
                  Switch anytime using the top navigation bar.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => enterAsRole("member")}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 p-3.5 text-left hover:border-primary/60 hover:bg-primary/5 transition-all group"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <User className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-sm text-foreground">Recovering Member (Sam)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-xs text-muted-foreground block truncate">
                    Daily check-ins, private journal, somatic reset, 21 dimensions
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => enterAsRole("supporter")}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 p-3.5 text-left hover:border-primary/60 hover:bg-primary/5 transition-all group"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <HeartHandshake className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-sm text-foreground">Supporter & Partner (Morgan)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-xs text-muted-foreground block truncate">
                    Safety check-in signals, encouraging notes, boundary agreements
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => enterAsRole("coach")}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 p-3.5 text-left hover:border-primary/60 hover:bg-primary/5 transition-all group"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Stethoscope className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-sm text-foreground">Recovery Coach (Elena)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-xs text-muted-foreground block truncate">
                    Client caseload, somatic urge triage, session notes & protocols
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => enterAsRole("admin")}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 p-3.5 text-left hover:border-primary/60 hover:bg-primary/5 transition-all group"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-sm text-foreground">Platform Admin (Alex)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-xs text-muted-foreground block truncate">
                    Author dimensions, recovery guides, boundaries & role management
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 text-center">
              <Button
                onClick={() => enterAsRole("member")}
                className="w-full rounded-full gap-2 font-semibold shadow-sm"
              >
                Open Default Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-[11px] text-muted-foreground">
                No passwords, credit cards, or tracking cookies. Zero authentication required.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-4.6rem)] overflow-hidden bg-background">
      <img
        src={natureAsset("signIn")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(247,245,232,.95),rgba(247,245,232,.75),rgba(39,58,43,.25))]" />
      <div className="container relative grid min-h-[calc(100vh-4.6rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_430px]">
        <section className="max-w-xl space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Leaf className="h-4 w-4" /> Return to ReForge home
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Your private space
          </p>
          <h1 className="font-serif text-5xl leading-[0.98] text-foreground sm:text-6xl font-bold">
            Come back to what matters.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-muted-foreground">
            A quiet place for honest check-ins, private reflection, and the small steps that make a life feel more like your own.
          </p>
        </section>
        <section
          className="nature-card bg-card/85 p-7 shadow-[0_24px_70px_-35px_rgba(39,58,43,.6)] backdrop-blur-xl sm:p-9 border border-border/80 rounded-3xl"
          aria-labelledby="sign-in-title"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 id="sign-in-title" className="mt-7 font-serif text-3xl font-bold text-foreground">
            Sign in gently
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Use your secure ReForge account to continue. Your sensitive reflections remain private and encrypted.
          </p>
          <Button
            size="lg"
            className="mt-8 h-12 w-full rounded-full font-semibold"
            onClick={() => startLogin()}
          >
            Continue with secure sign-in <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {supabaseAuthEnabled && getSupabaseAuthClient() ? (
            <Button
              variant="outline"
              size="lg"
              className="mt-3 h-12 w-full rounded-full"
              disabled={supabaseLoading}
              onClick={handleSupabaseSignIn}
            >
              {supabaseLoading ? "Opening Supabase sign-in…" : "Try Supabase staging sign-in"}
            </Button>
          ) : null}
          <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline">
              Privacy
            </Link>
            .
          </p>
          <Link
            href="/"
            className="mt-7 block text-center text-sm text-foreground/60 hover:text-primary"
          >
            Not ready? Explore ReForge first
          </Link>
        </section>
      </div>
    </main>
  );
}
