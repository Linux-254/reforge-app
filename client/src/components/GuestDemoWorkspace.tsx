import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Check,
  Compass,
  FileHeart,
  Goal,
  HeartPulse,
  Home,
  Leaf,
  LockKeyhole,
  LogOut,
  Menu,
  Music2,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Stethoscope,
  HeartHandshake,
  ArrowRight,
  Send,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import {
  clearGuestDemoData,
  readGuestBoolean,
  readGuestJournal,
  writeGuestBoolean,
  writeGuestJournal,
  type GuestJournalEntry,
} from "@/lib/guestDemoStorage";
import Guides from "@/pages/Guides";
import Community from "@/pages/Community";
import { DemoRoleBar } from "@/components/DemoRoleBar";
import ThemeToggle from "@/components/ThemeToggle";
import { useDemoSession } from "@/lib/demoSession";
import { SupporterDashboard } from "@/components/SupporterDashboard";
import { CoachDashboard } from "@/components/CoachDashboard";
import { SobrietyStreakCounter } from "@/components/SobrietyStreakCounter";
import { DimensionsImprovementChart } from "@/components/DimensionsImprovementChart";
import { BrandLogoIcon } from "@/components/BrandLogo";

const navItems = [
  { path: "/dashboard", label: "Overview", icon: Home },
  { path: "/check-ins", label: "Today", icon: HeartPulse },
  { path: "/progress", label: "Progress", icon: TrendingUp },
  { path: "/journal", label: "Journal", icon: BookOpen },
  { path: "/goals", label: "Goals", icon: Goal },
  { path: "/rules", label: "Boundaries", icon: ShieldCheck },
  { path: "/guides", label: "Guides", icon: Compass },
  { path: "/community", label: "Community", icon: Users },
  { path: "/music", label: "Music reset", icon: Music2 },
  { path: "/devotional", label: "Devotional", icon: Sparkles },
  { path: "/newsletter", label: "Newsletter", icon: FileHeart },
  { path: "/admin", label: "Admin Studio", icon: ShieldCheck, adminOnly: true },
];

const dimensions = [
  "Somatic Grounding",
  "Sleep & Rhythm",
  "Nourishment",
  "Emotional Literacy",
  "Urge Surfing",
  "Cognitive Nuance",
  "Relational Safety",
  "Clean Boundaries",
  "Living Amends",
  "Purpose & Craft",
  "Financial Clarity",
  "Sanctuary Space",
];

function MemberOverviewContent({
  checkedIn,
  setCheckedIn,
  entriesCount,
  goalStep,
  setGoalStep,
  ruleKept,
  setRuleKept,
  notify,
}: {
  checkedIn: boolean;
  setCheckedIn: (v: boolean) => void;
  entriesCount: number;
  goalStep: boolean;
  setGoalStep: (v: boolean) => void;
  ruleKept: boolean;
  setRuleKept: (v: boolean) => void;
  notify: (msg: string) => void;
}) {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#2b3a2e] text-[#f7eddc] shadow-[0_24px_60px_-40px_rgba(39,58,43,.8)]">
        <img
          src="/assets/hero-dawn.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(39,58,43,.96),rgba(39,58,43,.7),rgba(118,74,48,.25))]" />
        <div className="relative p-6 sm:p-10 space-y-4 max-w-2xl">
          <Badge className="rounded-full bg-primary/20 text-emerald-200 border-primary/30 gap-1.5 px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Day 48 · Gentle Practice
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl leading-tight">
            Welcome back, Sam.
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            You do not have to conquer the whole journey today. Notice what is here right now, honor one clear boundary, and let that be enough.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => setLocation("/check-ins")}
              className="rounded-full bg-[#f2d39c] text-[#2b3a2e] hover:bg-[#f6dfb1] font-semibold gap-2 shadow-sm"
            >
              Begin Morning Check-In <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation("/journal")}
              className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Write Reflection
            </Button>
          </div>
        </div>
      </section>

      {/* Sobriety Streak Counter with Circular Progress */}
      <SobrietyStreakCounter initialStartDate="2026-08-01" />

      {/* Vital Pulse Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Today's Check-In</span>
              <HeartPulse className="h-4 w-4 text-primary" />
            </div>
            <p className="font-serif text-2xl font-bold text-foreground mt-2">
              {checkedIn ? "Completed" : "Awaiting"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {checkedIn ? "Saved at 7:30 AM" : "Name what is present today"}
            </p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Private Journal</span>
              <BookOpen className="h-4 w-4 text-amber-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-foreground mt-2">
              {entriesCount} {entriesCount === 1 ? "page" : "pages"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Local to this browser only
            </p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Next Goal Step</span>
              <Goal className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-foreground mt-2">
              {goalStep ? "Accomplished" : "Step 1 Ready"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {goalStep ? "Steadiness maintained" : "Prepare tomorrow tonight"}
            </p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Active Boundary</span>
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <p className="font-serif text-2xl font-bold text-foreground mt-2">
              {ruleKept ? "Reviewed" : "Active"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              No decisions while overwhelmed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Somatic Reset Quick Action */}
      <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Somatic Micro-Practice
              </span>
            </div>
            <h3 className="font-serif text-xl font-semibold">
              Drop your shoulders. Unclench your jaw.
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Take one slow inhale through your nose for 4 counts, hold gently for 2, and exhale for 6 counts. Healing happens in safe physical moments.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLocation("/music")}
            className="rounded-full shrink-0 gap-2 border-primary/30"
          >
            <Music2 className="h-4 w-4 text-primary" /> Music Reset
          </Button>
        </CardContent>
      </Card>

      {/* Life Dimensions Month Improvement Chart (Recharts) */}
      <DimensionsImprovementChart />

      {/* Dimensions Snapshot */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold burnt-wood-heading">
              Your 21 Dimensions Vitality Map
            </h3>
            <p className="text-xs text-muted-foreground">
              Holistic balance across Body, Mind, Emotions, Relational, Purpose, and Environment.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/progress")}
            className="text-xs gap-1 rounded-full"
          >
            Explore all <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.slice(0, 6).map((dim, idx) => {
            const score = 65 + (idx % 4) * 8;
            return (
              <div
                key={dim}
                className="p-4 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-serif font-semibold text-foreground">{dim}</span>
                  <span className="font-bold text-primary">{score}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${score}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AdminHubOverview() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#273429] text-[#f7eddc] shadow-[0_24px_60px_-40px_rgba(39,58,43,.8)]">
        <img
          src="/assets/journal-morning.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(39,52,41,.96),rgba(39,52,41,.72),rgba(118,74,48,.25))]" />
        <div className="relative p-6 sm:p-10 space-y-4 max-w-2xl">
          <Badge className="rounded-full bg-primary/20 text-emerald-200 border-primary/30 gap-1.5 px-3 py-1 text-xs">
            <ShieldCheck className="h-3.5 w-3.5" /> Alex Rivera · Platform Lead & Admin
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl leading-tight">
            Administrator Command Hub
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            You hold master keys to the platform: authoring 21 Dimensions, publishing recovery guides, moderating community discussions, and governing user accounts.
          </p>
          <div className="pt-2">
            <Button
              onClick={() => setLocation("/admin")}
              className="rounded-full bg-[#f2d39c] text-[#273429] hover:bg-[#f6dfb1] font-semibold gap-2 shadow-sm"
            >
              Open Full Content & CRUD Studio <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          onClick={() => setLocation("/admin")}
          className="nature-card cursor-pointer border-border/70 bg-card/85 hover:border-primary/50 transition-all"
        >
          <CardContent className="p-5">
            <Compass className="h-5 w-5 text-primary mb-2" />
            <p className="font-serif text-lg font-bold">21 Dimensions</p>
            <p className="text-xs text-muted-foreground mt-1">Manage categories, prompts & aspects</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => setLocation("/admin")}
          className="nature-card cursor-pointer border-border/70 bg-card/85 hover:border-primary/50 transition-all"
        >
          <CardContent className="p-5">
            <BookOpen className="h-5 w-5 text-primary mb-2" />
            <p className="font-serif text-lg font-bold">Recovery Guides</p>
            <p className="text-xs text-muted-foreground mt-1">Author exercises & urge waves</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => setLocation("/admin")}
          className="nature-card cursor-pointer border-border/70 bg-card/85 hover:border-primary/50 transition-all"
        >
          <CardContent className="p-5">
            <ShieldCheck className="h-5 w-5 text-primary mb-2" />
            <p className="font-serif text-lg font-bold">Boundary Rules</p>
            <p className="text-xs text-muted-foreground mt-1">Configure preset agreements</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => setLocation("/admin")}
          className="nature-card cursor-pointer border-border/70 bg-card/85 hover:border-primary/50 transition-all"
        >
          <CardContent className="p-5">
            <Users className="h-5 w-5 text-primary mb-2" />
            <p className="font-serif text-lg font-bold">Users & Roles</p>
            <p className="text-xs text-muted-foreground mt-1">Promote coaches & supporters</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DemoContent({
  path,
  notify,
}: {
  path: string;
  notify: (message: string) => void;
}) {
  const { role } = useDemoSession();
  const [, setLocation] = useLocation();
  const [journalBody, setJournalBody] = useState("");
  const [entries, setEntries] = useState<GuestJournalEntry[]>(readGuestJournal);
  const [checkedIn, setCheckedIn] = useState(() => readGuestBoolean("checkIn"));
  const [goalStep, setGoalStep] = useState(() => readGuestBoolean("goalStep"));
  const [ruleKept, setRuleKept] = useState(() => readGuestBoolean("rule"));

  const saveJournal = () => {
    const body = journalBody.trim();
    if (!body) return;
    const next = [
      { id: Date.now(), body, createdAt: new Date().toISOString() },
      ...entries,
    ];
    setEntries(next);
    writeGuestJournal(next);
    setJournalBody("");
    notify("Saved privately in this browser.");
  };

  // Dedicated role views when on dashboard
  if (path === "/dashboard") {
    if (role === "supporter") {
      return <SupporterDashboard />;
    }
    if (role === "coach") {
      return <CoachDashboard />;
    }
    if (role === "admin") {
      return <AdminHubOverview />;
    }
    return (
      <MemberOverviewContent
        checkedIn={checkedIn}
        setCheckedIn={setCheckedIn}
        entriesCount={entries.length}
        goalStep={goalStep}
        setGoalStep={setGoalStep}
        ruleKept={ruleKept}
        setRuleKept={setRuleKept}
        notify={notify}
      />
    );
  }

  if (path === "/journal") {
    return (
      <Page
        title="Private Reflection"
        description="This demo journal is strictly local to your browser. Make room for the truth without fear of observation."
      >
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">What is here right now?</CardTitle>
            <CardDescription>
              Write whatever needs light. No cloud sync, no tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={journalBody}
              onChange={(e) => setJournalBody(e.target.value)}
              placeholder="What thoughts or feelings are stirring under the surface?"
              className="min-h-40 rounded-2xl text-sm leading-relaxed"
            />
            <Button
              onClick={saveJournal}
              disabled={!journalBody.trim()}
              className="rounded-full gap-2"
            >
              <Save className="h-4 w-4" /> Save Privately
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {entries.length === 0 ? (
            <Empty
              title="Your reflection pages are waiting."
              body="Use the private composer above to record your first honest entry."
            />
          ) : (
            entries.map((entry) => (
              <Card
                key={entry.id}
                className="nature-card border-border/70 bg-card/85 backdrop-blur-md"
              >
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-foreground">
                    {entry.body}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Page>
    );
  }

  if (path === "/check-ins") {
    return (
      <Page
        title="Today's Check-In"
        description="A steady check-in anchors the nervous system before the day's demands accumulate."
      >
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Morning Vitality Pulse</CardTitle>
            <CardDescription>
              On a scale from 1 (overwhelmed) to 5 (calm & grounded), where do you find yourself?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <input
              aria-label="Demo check-in score"
              type="range"
              min="1"
              max="5"
              defaultValue="4"
              className="w-full accent-[var(--primary)] h-2 bg-muted rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 - Overwhelmed / Craving</span>
              <span>3 - Steady</span>
              <span>5 - Grounded & Clear</span>
            </div>
            <Button
              onClick={() => {
                setCheckedIn(true);
                writeGuestBoolean("checkIn", true);
                notify("Check-in saved locally.");
              }}
              className="rounded-full"
            >
              {checkedIn ? "✓ Checked in for today" : "Record Check-In"}
            </Button>
          </CardContent>
        </Card>
        <Empty
          title="Evening Wind-Down"
          body="Return tonight to notice what helped hold you steady and what you release into sleep."
        />
      </Page>
    );
  }

  if (path === "/progress") {
    return (
      <Page
        title="21 Dimensions Progress"
        description="Recovery is a holistic practice across every aspect of your life—not an all-or-nothing score."
      >
        <SobrietyStreakCounter className="mb-6" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((dim, index) => (
            <Card
              key={dim}
              className="nature-card border-border/70 bg-card/85 backdrop-blur-md"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-lg font-semibold">{dim}</p>
                  <span className="font-semibold text-primary">{60 + (index % 5) * 8}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${60 + (index % 5) * 8}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Practiced consistently over the last 14 days.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Page>
    );
  }

  if (path === "/goals") {
    return (
      <Page
        title="Small, Achievable Horizons"
        description="Choose one small structure and make the next step visible."
      >
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-primary/10 text-primary hover:bg-primary/10">
              30-Day Recovery Horizon
            </Badge>
            <CardTitle className="font-serif text-3xl">Return to an anchored morning</CardTitle>
            <CardDescription>
              One gentle routine that sets an unhurried, grounded baseline for the entire day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button
              type="button"
              onClick={() => {
                setGoalStep(!goalStep);
                writeGuestBoolean("goalStep", !goalStep);
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-border/70 p-4 text-left hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors bg-card/50"
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                  goalStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {goalStep ? <Check className="h-4 w-4" /> : "1"}
              </span>
              <div>
                <strong className="block text-foreground">Prepare tomorrow night before bed</strong>
                <span className="text-xs text-muted-foreground">
                  Tap to mark this milestone step complete in your local demo sandbox.
                </span>
              </div>
            </button>
          </CardContent>
        </Card>
      </Page>
    );
  }

  if (path === "/rules") {
    return (
      <Page
        title="Personal Boundaries"
        description="Clear, non-negotiable boundaries that protect the life you are rebuilding."
      >
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardHeader>
            <Badge variant="outline" className="w-fit rounded-full text-xs">
              Daily Boundary Agreement
            </Badge>
            <CardTitle className="font-serif text-3xl">
              "I do not make life-altering decisions while overwhelmed."
            </CardTitle>
            <CardDescription>
              When adrenaline or exhaustion peaks, pause for 24 hours and consult a safe person.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                setRuleKept(!ruleKept);
                writeGuestBoolean("rule", !ruleKept);
                notify(!ruleKept ? "Boundary honored for today." : "Boundary review reopened.");
              }}
              className="rounded-full gap-2"
            >
              {ruleKept ? <Check className="h-4 w-4" /> : null}
              {ruleKept ? "Boundary Honored Today" : "Mark as Honored Today"}
            </Button>
          </CardContent>
        </Card>
      </Page>
    );
  }

  if (path === "/guides") return <Guides />;
  if (path === "/community") return <Community />;

  if (path === "/settings") {
    return (
      <Page
        title="Settings & Privacy Controls"
        description="ReForge is built on zero-knowledge architecture. Your reflections remain private."
      >
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-5 w-5 text-primary shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-sm">Demo Privacy Sandbox</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No tracking cookies or personal credentials are required. All reflections, check-ins, and boundary logs in this demo stay local to your browser session.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                clearGuestDemoData();
                window.location.reload();
              }}
              className="rounded-full text-xs"
            >
              Reset Browser Demo Data
            </Button>
          </CardContent>
        </Card>
      </Page>
    );
  }

  return (
    <Page
      title="A Quiet Place to Begin Again"
      description="Explore ReForge without authentication barriers. Experience all perspectives freely."
    >
      <MemberOverviewContent
        checkedIn={checkedIn}
        setCheckedIn={setCheckedIn}
        entriesCount={entries.length}
        goalStep={goalStep}
        setGoalStep={setGoalStep}
        ruleKept={ruleKept}
        setRuleKept={setRuleKept}
        notify={notify}
      />
    </Page>
  );
}

function Page({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <Badge variant="outline" className="text-[10px] rounded-full text-primary border-primary/30">
          ReForge Practice
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl leading-tight font-semibold burnt-wood-heading">
          {title}
        </h1>
        <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>
      {children}
    </div>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <Card className="nature-card border-dashed border-border/80 bg-card/60">
      <CardContent className="p-8 text-center space-y-2">
        <Leaf className="mx-auto h-6 w-6 text-primary" />
        <p className="font-serif text-xl font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}

function DemoWorkspaceSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200" aria-label="Loading page content">
      <header className="space-y-2">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-10 w-3/4 max-w-lg rounded-xl" />
        <Skeleton className="h-4 w-full max-w-md rounded-md" />
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border/70 bg-card/70 p-6 space-y-4">
        <Skeleton className="h-7 w-1/3 rounded-lg" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="flex gap-3 justify-end">
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function GuestDemoWorkspace({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const { role, user } = useDemoSession();

  const notify = (message: string) => {
    setToastMsg(message);
    window.setTimeout(() => setToastMsg(""), 2500);
  };

  const path = useMemo(() => location.split("?")[0], [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Global Interactive Demo Role Switcher at the very top */}
      <DemoRoleBar />

      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar with Frosted Glass */}
        <aside
          className={`${
            mobileOpen ? "fixed inset-y-0 left-0 z-50 flex" : "hidden"
          } w-72 shrink-0 flex-col border-r border-border/70 bg-sidebar/95 backdrop-blur-md p-4 lg:flex`}
        >
          <div className="flex flex-col gap-2.5 border-b border-sidebar-border/60 pb-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLocation("/dashboard")}
                className="text-left flex items-center gap-2.5 hover:opacity-85 transition-opacity"
              >
                <BrandLogoIcon size={38} className="transition-transform duration-300 hover:scale-105" />
                <div>
                  <span className="font-serif text-xl font-bold text-sidebar-foreground block leading-none">
                    Re<span className="text-primary font-extrabold">Forge</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60 font-semibold">
                    Demo Sandbox
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent lg:hidden"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active User & Role Switcher Card in Sidebar */}
          <div className="my-3 p-3 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/50 space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs">
              <div className="h-9 w-9 rounded-full bg-primary/20 text-primary grid place-items-center font-bold font-serif shrink-0 border border-primary/30">
                {user.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-[10px] text-sidebar-foreground/70 capitalize font-medium">{user.role} role</p>
              </div>
            </div>
            {/* Interactive role switcher pills */}
            <div className="grid grid-cols-2 gap-1 pt-1">
              {[
                { id: "member" as const, label: "Member" },
                { id: "supporter" as const, label: "Supporter" },
                { id: "coach" as const, label: "Coach" },
                { id: "admin" as const, label: "Admin" },
              ].map((r) => {
                const isCurrent = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      if (r.id === "admin") {
                        setLocation("/admin");
                      } else if (path === "/admin") {
                        setLocation("/dashboard");
                      }
                      notify(`Switched to ${r.label} perspective`);
                    }}
                    className={`py-1 px-2 rounded-lg text-[11px] font-medium transition-all text-center ${
                      isCurrent
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "bg-sidebar/60 text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground border border-sidebar-border/50"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-1" aria-label="Demo navigation">
            {navItems.map((item) => {
              const isActive = path === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    setLocation(item.path);
                    setMobileOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.adminOnly && (
                    <Badge variant="outline" className="ml-auto text-[9px] px-1.5 py-0 border-primary/30">
                      Studio
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-sidebar-border/60 space-y-1">
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Exit to Public Website</span>
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {mobileOpen && (
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <div className="min-w-0 flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/95 px-3 sm:px-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-1.5 text-foreground/70 hover:bg-muted lg:hidden shrink-0"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <button
                type="button"
                onClick={() => setLocation("/dashboard")}
                className="flex items-center gap-2 hover:opacity-85 transition-opacity shrink-0"
              >
                <BrandLogoIcon size={28} />
                <span className="font-serif text-lg font-bold leading-none">
                  Re<span className="text-primary font-extrabold">Forge</span>
                </span>
              </button>

              <span className="hidden sm:inline text-border">|</span>

              <span className="hidden sm:inline font-serif text-sm font-medium text-muted-foreground truncate">
                {navItems.find((item) => item.path === path)?.label ?? "Overview"}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center">
                <DemoRoleBar compact />
              </div>
              <ThemeToggle compact />
              <Badge variant="outline" className="hidden sm:inline-flex rounded-full text-[11px] gap-1 border-primary/30 text-primary font-medium">
                <Sparkles className="h-3 w-3" /> {role.toUpperCase()}
              </Badge>
            </div>
          </header>

          <main className="mx-auto max-w-6xl w-full p-4 sm:p-6 lg:p-8 flex-1 pb-24 lg:pb-8">
            <DemoContent path={path} notify={notify} />
          </main>
        </div>
      </div>

      {/* Backdrop overlay when mobile drawer is open */}
      {mobileOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-border/70 bg-background/95 backdrop-blur-xl px-2 lg:hidden shadow-[0_-8px_25px_rgba(0,0,0,0.06)]"
      >
        <button
          type="button"
          onClick={() => {
            setLocation("/dashboard");
            setMobileOpen(false);
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            path === "/dashboard"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setLocation("/check-ins");
            setMobileOpen(false);
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            path === "/check-ins"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HeartPulse className="h-5 w-5" />
          <span>Today</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setLocation("/progress");
            setMobileOpen(false);
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            path === "/progress"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="h-5 w-5" />
          <span>Progress</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setLocation("/journal");
            setMobileOpen(false);
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            path === "/journal"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span>Journal</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setLocation("/goals");
            setMobileOpen(false);
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            path === "/goals"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Goal className="h-5 w-5" />
          <span>Goals</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            mobileOpen ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Menu className="h-5 w-5" />
          <span>Menu</span>
        </button>
      </nav>

      {toastMsg && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[60] rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-xl font-medium animate-in fade-in slide-in-from-bottom-3"
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
