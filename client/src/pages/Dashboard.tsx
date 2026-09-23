import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { REFORGE_ASSETS } from "@/config/assets";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Flame,
  Goal,
  HeartPulse,
  Leaf,
  LockKeyhole,
  MessageCircle,
  Music2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLocation } from "wouter";
import { getMoodTrendState } from "@/lib/moodTrend";
import { DashboardStaggerContainer, DashboardAnimatedCard } from "@/components/DashboardAnimations";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useDemoSession } from "@/lib/demoSession";

const quickLinks = [
  { label: "Check in", description: "Name what is here today.", path: "/check-ins", icon: HeartPulse, tone: "bg-primary/10 text-primary" },
  { label: "Journal", description: "Make room for the truth.", path: "/journal", icon: BookOpen, tone: "bg-[#ead8bf]/55 text-[#85533b]" },
  { label: "Goals", description: "Choose the next kind step.", path: "/goals", icon: Target, tone: "bg-[#dbe4c7]/70 text-[#4d684b]" },
  { label: "Boundaries", description: "Protect the life returning.", path: "/rules", icon: ShieldCheck, tone: "bg-[#e5d5c9]/70 text-[#714935]" },
  { label: "Community", description: "Share courage in a quiet circle.", path: "/community", icon: Users, tone: "bg-[#d9e7f5]/70 text-[#305a80]" },
  { label: "Music reset", description: "Make sound an ally.", path: "/music", icon: Music2, tone: "bg-[#d5e3df]/75 text-[#416b63]" },
  { label: "Guides", description: "Find a gentle doorway in.", path: "/guides", icon: Compass, tone: "bg-[#ece4ba]/75 text-[#7a6a32]" },
];

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-7" aria-label="Loading your dashboard">
      {/* Hero Banner Skeleton */}
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted/40 p-7 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-4 max-w-2xl">
            <Skeleton className="h-5 w-36 rounded-full" />
            <Skeleton className="h-10 w-3/4 max-w-md rounded-xl" />
            <Skeleton className="h-4 w-full max-w-lg rounded-md" />
            <Skeleton className="h-4 w-2/3 max-w-md rounded-md" />
            <div className="flex flex-wrap gap-3 pt-2">
              <Skeleton className="h-10 w-36 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
          <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-4 space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-4 space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Grid: Mood trend & Today's check-in & Progress */}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <Card className="nature-card lg:col-span-2">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-44 rounded-lg" />
              <Skeleton className="h-5 w-28 rounded-full" />
            </div>
            <Skeleton className="h-4 w-72 rounded-md" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 items-end gap-2 pt-4">
              {[40, 65, 80, 50, 75, 60, 85].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-full rounded-xl" style={{ height: `${val + 20}px` }} />
                  <Skeleton className="h-3 w-8 rounded-sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="nature-card">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-36 rounded-lg" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-48 rounded-md" />
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
          </CardContent>
        </Card>

        <Card className="nature-card lg:col-span-2">
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-48 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </CardContent>
        </Card>
      </div>

      {/* Quick links doorway skeleton grid */}
      <div className="space-y-4">
        <div className="space-y-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-7 w-48 rounded-lg" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card/60 p-4 space-y-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardInner() {
  const demoMode = import.meta.env.VITE_DEMO_MODE !== "false";
  const { user, loading: authLoading } = useAuth();
  const { user: demoUser } = useDemoSession();
  const [, setLocation] = useLocation();

  const isDemoOrGuest = demoMode || !user;

  const dashboardQuery = trpc.dashboard.getOverview.useQuery(undefined, {
    enabled: Boolean(user) && !demoMode,
  });
  const moodHistoryQuery = trpc.checkIn.history.useQuery(
    { limit: 7 },
    { enabled: Boolean(user) && !demoMode }
  );
  const onboardingStatusQuery = trpc.onboarding.status.useQuery(undefined, {
    retry: false,
    enabled: Boolean(user) && !demoMode,
  });

  const { data: overview, isLoading, isError } = dashboardQuery;

  if (authLoading || (Boolean(user) && !demoMode && isLoading)) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  if (Boolean(user) && !demoMode && isError) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl py-16">
          <Card className="nature-card text-center">
            <CardContent className="space-y-4 p-8">
              <Leaf className="mx-auto h-8 w-8 text-primary" />
              <h1 className="font-serif text-3xl">Your space is taking a breath.</h1>
              <p className="text-sm leading-6 text-muted-foreground">
                We could not load the dashboard right now. Your private data is completely safe.
              </p>
              <Button onClick={() => void dashboardQuery.refetch()} className="rounded-full">
                Try again
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Determine display values (authenticated data or rich demo defaults)
  const displayName = isDemoOrGuest
    ? demoUser?.name?.split(" ")[0] || "Sam"
    : overview?.profile?.displayName || user?.name?.split(" ")[0] || "friend";

  const currentStreak = isDemoOrGuest ? 48 : overview?.streak?.current || 0;
  const longestStreak = isDemoOrGuest ? 48 : overview?.streak?.longest || 0;
  const dimensionCount = isDemoOrGuest ? 21 : overview?.dimensionScores?.length || 0;
  const needsOnboarding = !isDemoOrGuest && onboardingStatusQuery.data?.needsOnboarding;

  const moodPoints = isDemoOrGuest
    ? [
        { id: 1, mood: 7, createdAt: new Date(Date.now() - 6 * 86400000).toISOString() },
        { id: 2, mood: 6, createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
        { id: 3, mood: 8, createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
        { id: 4, mood: 7, createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
        { id: 5, mood: 9, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
        { id: 6, mood: 8, createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
        { id: 7, mood: 8, createdAt: new Date().toISOString() },
      ]
    : [...(moodHistoryQuery.data ?? [])].filter((entry) => entry.mood != null).slice(0, 7).reverse();

  const moodTrendState = isDemoOrGuest
    ? "ready"
    : getMoodTrendState({
        isLoading: moodHistoryQuery.isLoading,
        isError: moodHistoryQuery.isError,
        moodCount: moodPoints.length,
      });

  const goalsList = isDemoOrGuest
    ? [
        {
          id: "g1",
          title: "Morning light walk (20 min)",
          horizon: 30,
          stepCount: 3,
          completedStepCount: 2,
          nextStepTitle: "Hydrate and stretch afterwards",
        },
        {
          id: "g2",
          title: "Evening acoustic transition ritual",
          horizon: 90,
          stepCount: 4,
          completedStepCount: 3,
          nextStepTitle: "Dim screens 45 min before sleep",
        },
      ]
    : overview?.activeGoals || [];

  return (
    <DashboardLayout>
      <DashboardStaggerContainer className="mx-auto max-w-6xl space-y-7">
        {/* Hero Welcome Banner */}
        <DashboardAnimatedCard>
          <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#304333] text-[#f7eddc] shadow-[0_24px_60px_-40px_rgba(39,58,43,.8)]">
            <img
              src={REFORGE_ASSETS.dashboard}
              alt="Soft light across a leafy path"
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(39,58,43,.98),rgba(39,58,43,.66),rgba(118,74,48,.2))]" />
            <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl space-y-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                  <Sparkles className="h-4 w-4" /> Your daily landing place
                </p>
                <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
                  Welcome back, {displayName}.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/76 sm:text-base">
                  You do not have to solve the whole life today. Notice the next honest thing, then let that be enough for this morning.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    onClick={() => setLocation("/check-ins")}
                    className="rounded-full bg-[#f2d39c] text-[#304333] hover:bg-[#f6dfb1]"
                  >
                    Begin today <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/progress")}
                    className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/12 hover:text-white"
                  >
                    See my map
                  </Button>
                </div>
              </div>
              <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/15 bg-black/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/65">
                    <Flame className="h-4 w-4 text-amber-200" /> Current rhythm
                  </div>
                  <p className="mt-2 font-serif text-4xl">
                    {currentStreak}
                    <span className="ml-2 text-base text-white/65">days</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/65">
                    <TrendingUp className="h-4 w-4 text-amber-200" /> Longest rhythm
                  </div>
                  <p className="mt-2 font-serif text-4xl">
                    {longestStreak}
                    <span className="ml-2 text-base text-white/65">days</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </DashboardAnimatedCard>

        {needsOnboarding && (
          <DashboardAnimatedCard>
            <section className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/7 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-serif text-2xl">Let us build your starting map.</p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  A ten-minute conversation across 21 areas gives you a place to stand, not a verdict.
                </p>
              </div>
              <Button onClick={() => setLocation("/onboarding")} className="shrink-0 rounded-full">
                Start gently <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </section>
          </DashboardAnimatedCard>
        )}

        {/* Core Daily Practice & Rhythms */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <DashboardAnimatedCard className="lg:col-span-2">
            <Card className="nature-card h-full">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-serif text-2xl">Your recent mood</CardTitle>
                    <CardDescription>
                      A small pattern, not a verdict. Check-ins stay private to you.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    Last 7 check-ins
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {moodTrendState === "loading" ? (
                  <Skeleton className="h-24 w-full rounded-2xl" aria-label="Loading mood trend" />
                ) : moodTrendState === "error" ? (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-destructive/25 bg-destructive/5 p-4 text-sm">
                    <span className="text-destructive">
                      Mood history is taking a pause. Your saved check-ins are unchanged.
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void moodHistoryQuery.refetch()}
                      className="shrink-0 rounded-full"
                    >
                      Try again
                    </Button>
                  </div>
                ) : moodTrendState === "ready" ? (
                  <div
                    className="grid grid-cols-7 items-end gap-2"
                    role="img"
                    aria-label={`Mood trend from ${moodPoints.length} recent check-ins`}
                  >
                    {moodPoints.map((entry, index) => {
                      const mood = entry.mood ?? 0;
                      return (
                        <div key={`${entry.id}-${index}`} className="flex min-w-0 flex-col items-center gap-2">
                          <div className="flex h-24 w-full items-end rounded-xl bg-primary/8 p-1">
                            <div
                              className="w-full rounded-lg bg-primary transition-[height] duration-200"
                              style={{ height: `${Math.max(10, mood * 10)}%` }}
                              title={`Mood ${mood} out of 10`}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleDateString(undefined, {
                              weekday: "short",
                            })}
                          </span>
                          <span className="text-xs font-semibold text-primary">{mood}/10</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
                    Complete a check-in to begin noticing your mood rhythm.
                  </p>
                )}
              </CardContent>
            </Card>
          </DashboardAnimatedCard>

          <DashboardAnimatedCard>
            <Card className="nature-card h-full overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-serif text-2xl">Today’s check-in</CardTitle>
                    <CardDescription>Two small pauses can change the shape of a day.</CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    Private
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    label: "Morning",
                    complete: isDemoOrGuest ? true : Boolean(overview?.todayCheckIns?.morning),
                    prompt: "How are you arriving?",
                  },
                  {
                    label: "Evening",
                    complete: isDemoOrGuest ? false : Boolean(overview?.todayCheckIns?.evening),
                    prompt: "What can you set down?",
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setLocation("/check-ins")}
                    className="rounded-2xl border border-border/65 bg-muted/20 p-4 text-left transition-colors hover:border-primary/35 hover:bg-primary/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${
                          item.complete ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {item.complete ? <Check className="h-4 w-4" /> : <HeartPulse className="h-4 w-4" />}
                      </span>
                    </div>
                    <p className="mt-5 font-serif text-xl">{item.complete ? "You showed up." : item.prompt}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.complete ? "Recorded for today" : "Take a couple of minutes"}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </DashboardAnimatedCard>

          <DashboardAnimatedCard className="lg:col-span-2">
            <Card className="nature-card relative overflow-hidden">
              <img
                src={REFORGE_ASSETS.reflection}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-card via-card/92 to-primary/8" />
              <div className="relative">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Your whole-life map</CardTitle>
                  <CardDescription>
                    There are 21 places to notice. None of them define your worth.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3">
                    <span className="font-serif text-5xl text-primary">{dimensionCount}</span>
                    <span className="pb-2 text-sm text-muted-foreground">dimensions in view</span>
                  </div>
                  <Progress
                    value={Math.min(100, (dimensionCount / 21) * 100)}
                    className="mt-5 h-2"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/progress")}
                    className="mt-6 w-full rounded-full"
                  >
                    Explore your progress <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </DashboardAnimatedCard>
        </section>

        {/* Quick Doors / Features Structure */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Keep moving gently
              </p>
              <h2 className="mt-1 font-serif text-3xl">Choose a doorway.</h2>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Nothing here is mandatory.
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {quickLinks.map((link) => (
              <DashboardAnimatedCard key={link.path}>
                <button
                  onClick={() => setLocation(link.path)}
                  className="group w-full h-full rounded-2xl border border-border/65 bg-card/80 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_15px_35px_-25px_rgba(39,58,43,.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.tone}`}>
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-serif text-xl">{link.label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </DashboardAnimatedCard>
            ))}
          </div>
        </section>

        {/* Community Circle Spotlight */}
        <DashboardAnimatedCard>
          <Card className="nature-card border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-2xl">Community Circle</CardTitle>
                    <CardDescription>
                      Gentle, private encouragement from fellow members practicing recovery.
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/community")}
                  className="rounded-full text-xs"
                >
                  Enter Circle <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] rounded-full">
                      Daily Rhythm
                    </Badge>
                    <span className="text-xs text-muted-foreground">Anonymous reflection</span>
                  </div>
                  <p className="text-sm italic text-foreground/90 font-serif">
                    “Waking up with clear eyes on Day 48. When the afternoon noise started, I took the 3-minute somatic breath instead of reaching out for old habits.”
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setLocation("/community")}
                  className="shrink-0 rounded-full text-xs"
                >
                  Share reflection
                </Button>
              </div>
            </CardContent>
          </Card>
        </DashboardAnimatedCard>

        {/* Upcoming Goals */}
        <DashboardAnimatedCard>
          <Card className="nature-card">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 font-serif text-2xl">
                    <Goal className="h-5 w-5 text-primary" /> Upcoming goals
                  </CardTitle>
                  <CardDescription>Keep the next step close enough to touch.</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/goals")}
                  className="rounded-full"
                >
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {goalsList.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {goalsList.slice(0, 4).map((goal) => {
                    const progress = goal.stepCount
                      ? Math.round((goal.completedStepCount / goal.stepCount) * 100)
                      : 0;
                    return (
                      <div
                        key={goal.id}
                        className="rounded-2xl border border-border/55 bg-muted/20 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium">{goal.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              A {goal.horizon}-day horizon
                            </p>
                          </div>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-4 w-4" />
                          </span>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                          {goal.nextStepTitle
                            ? `Next: ${goal.nextStepTitle}`
                            : goal.stepCount
                            ? "All steps complete"
                            : "Add a first step when you are ready"}
                        </p>
                        {goal.stepCount ? (
                          <>
                            <Progress value={progress} className="mt-3 h-1.5" />
                            <p className="mt-2 text-[11px] text-muted-foreground">
                              {goal.completedStepCount} of {goal.stepCount} steps complete
                            </p>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border/70 bg-muted/15 p-6 text-center">
                  <p className="font-serif text-xl">No goals waiting yet.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When you are ready, choose one small direction for the next stretch.
                  </p>
                  <Button onClick={() => setLocation("/goals")} className="mt-4 rounded-full">
                    Create a goal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </DashboardAnimatedCard>

        {/* Privacy Note */}
        <DashboardAnimatedCard>
          <p className="flex items-center justify-center gap-2 pb-2 text-center text-xs text-muted-foreground">
            <LockKeyhole className="h-3.5 w-3.5 text-primary" /> Sensitive reflections and check-in
            notes are encrypted before storage.
          </p>
        </DashboardAnimatedCard>
      </DashboardStaggerContainer>
    </DashboardLayout>
  );
}

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <DashboardInner />
    </ErrorBoundary>
  );
}
