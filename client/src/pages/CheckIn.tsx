import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { REFORGE_ASSETS } from "@/config/assets";
import { trpc } from "@/lib/trpc";
import { optimisticTodayCheckIns } from "@/lib/checkInOptimistic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, BookOpen, Check, Heart, History, Save, ShieldCheck, Smile, Sparkles, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CheckInPart = "morning" | "evening";

type RatingCardProps = {
  title: string;
  description: string;
  lowLabel: string;
  middleLabel: string;
  highLabel: string;
  icon: typeof Smile;
  value: number;
  onChange: (value: number) => void;
};

function RatingCard({ title, description, lowLabel, middleLabel, highLabel, icon: Icon, value, onChange }: RatingCardProps) {
  return (
    <Card className="nature-card rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif text-2xl">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between gap-3 text-xs text-muted-foreground" aria-hidden="true">
          <span>{lowLabel}</span>
          <span>{middleLabel}</span>
          <span>{highLabel}</span>
        </div>
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0] ?? value)}
          min={1}
          max={10}
          step={1}
          aria-label={`${title}, ${value} out of 10`}
        />
        <p className="text-center" aria-live="polite">
          <span className="font-serif text-4xl text-primary">{value}</span>
          <span className="ml-2 text-sm text-muted-foreground">out of 10</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default function CheckIn() {
  const { user } = useAuth({ redirectOnUnauthenticated: true, redirectPath: "/" });
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const [part, setPart] = useState<CheckInPart>("morning");
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [cravings, setCravings] = useState(5);
  const [notes, setNotes] = useState("");

  const todayQuery = trpc.checkIn.getToday.useQuery();
  const entry = part === "morning" ? todayQuery.data?.morning : todayQuery.data?.evening;
  const createCheckInMutation = trpc.checkIn.create.useMutation({
    onMutate: async (input) => {
      await utils.checkIn.getToday.cancel();
      const previous = utils.checkIn.getToday.getData();
      utils.checkIn.getToday.setData(undefined, optimisticTodayCheckIns(previous, input, user?.id ?? 0));
      return { previous };
    },
    onSuccess: async () => {
      await Promise.all([
        utils.checkIn.getToday.invalidate(),
        utils.checkIn.history.invalidate(),
        utils.checkIn.streak.invalidate(),
        utils.dashboard.getOverview.invalidate(),
      ]);
      toast.success(`${part === "morning" ? "Morning" : "Evening"} check-in saved.`);
    },
    onError: (_error, _input, context) => {
      if (context?.previous) utils.checkIn.getToday.setData(undefined, context.previous);
      toast.error("We could not save your check-in. Your draft is still here; please try again.");
    },
  });

  useEffect(() => {
    if (!entry) {
      setMood(5);
      setEnergy(5);
      setCravings(5);
      setNotes("");
      return;
    }

    setMood(entry.mood ?? 5);
    setEnergy(entry.energy ?? 5);
    setCravings(entry.cravings ?? 5);
    const payload = entry.payload as { notes?: string } | null;
    setNotes(payload?.notes ?? "");
  }, [entry?.id, part]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCheckInMutation.mutate({
      part,
      mood,
      energy,
      cravings,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-7">
        <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#304333] text-[#f7eddc] shadow-[0_24px_60px_-40px_rgba(39,58,43,.8)]">
          <img src={REFORGE_ASSETS.checkIn} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(39,58,43,.98),rgba(39,58,43,.62),rgba(118,74,48,.18))]" />
          <div className="relative grid gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl space-y-4">
              <Badge className="rounded-full border-white/15 bg-white/10 text-amber-100 hover:bg-white/10">A private pause</Badge>
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Check in with the weather inside.</h1>
              <p className="max-w-xl text-sm leading-7 text-white/75 sm:text-base">There is no score to pass. A few honest signals help you notice what care might look like next.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setLocation("/check-in-history")} className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/12 hover:text-white">
                <History className="mr-2 h-4 w-4" /> History
              </Button>
              <Button variant="outline" onClick={() => setLocation("/dashboard")} className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/12 hover:text-white">
                Back to overview
              </Button>
            </div>
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Choose a check-in">
          {(["morning", "evening"] as const).map((item) => {
            const selected = part === item;
            const completed = item === "morning" ? Boolean(todayQuery.data?.morning) : Boolean(todayQuery.data?.evening);
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setPart(item)}
                className={`rounded-2xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? "border-primary bg-primary/10" : "border-border/65 bg-card/70 hover:border-primary/35"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item}</span>
                  {completed ? <Check className="h-4 w-4 text-primary" aria-label="Completed today" /> : <Sparkles className="h-4 w-4 text-primary/70" aria-hidden="true" />}
                </div>
                <p className="mt-3 font-serif text-xl">{item === "morning" ? "How are you arriving?" : "What can you set down?"}</p>
              </button>
            );
          })}
        </div>

        {todayQuery.isError && <Card className="rounded-2xl border-destructive/30 bg-destructive/5"><CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6 text-sm"><span className="text-destructive">Today’s saved check-ins are unavailable right now.</span><Button variant="outline" size="sm" onClick={() => void todayQuery.refetch()} className="rounded-full">Try again</Button></CardContent></Card>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <RatingCard title="How is your mood?" description="Name the emotional tone without needing to explain it." lowLabel="Very low" middleLabel="Neutral" highLabel="Very high" icon={Smile} value={mood} onChange={setMood} />
          <RatingCard title="What is your energy like?" description="Notice your physical and mental capacity today." lowLabel="Exhausted" middleLabel="Balanced" highLabel="Energized" icon={Zap} value={energy} onChange={setEnergy} />
          <RatingCard title="How strong are cravings?" description="A signal is not a command. Naming it can make room around it." lowLabel="None" middleLabel="Moderate" highLabel="Intense" icon={Heart} value={cravings} onChange={setCravings} />

          <Card className="nature-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-2xl"><BookOpen className="h-5 w-5 text-primary" aria-hidden="true" /> What else is here?</CardTitle>
              <CardDescription>Optional. Write a few words, or leave the page quiet.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={part === "morning" ? "What would support you today?" : "What are you ready to put down for the night?"} className="min-h-36 resize-y rounded-2xl bg-background/70" aria-label="Optional private check-in notes" />
              <div className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> Your notes are encrypted before storage and remain private to your account.</div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setLocation("/dashboard")} className="rounded-full">Leave for now</Button>
            <Button type="submit" disabled={createCheckInMutation.isPending || todayQuery.isLoading} className="rounded-full sm:min-w-48">
              <Save className="mr-2 h-4 w-4" />
              {createCheckInMutation.isPending ? "Saving your pause…" : entry ? "Update check-in" : "Save check-in"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
