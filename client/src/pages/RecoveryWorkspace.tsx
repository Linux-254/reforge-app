import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { REFORGE_ASSETS } from "@/config/assets";
import { trpc } from "@/lib/trpc";
import { filterJournalEntries, parseJournalDimensionFilter } from "@/lib/journalFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, BookOpen, Check, Headphones, Heart, Lock, Music2, Pencil, Plus, Save, Search, ShieldCheck, Sparkles, Target, Trash2, TrendingUp, X } from "lucide-react";

function Workspace({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="space-y-3"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p><h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h1><p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p></header>;
}

function EmptyState({ title, description, icon: Icon = Sparkles }: { title: string; description: string; icon?: typeof Sparkles }) {
  return <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div><p className="font-serif text-2xl">{title}</p><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p></div>;
}

export function ProgressPage() {
  const query = trpc.dashboard.getDimensionScores.useQuery();
  return <Workspace><div className="mx-auto max-w-5xl space-y-7"><PageHeading eyebrow="Your whole-life view" title="Progress across 21 dimensions" description="Small, honest steps count. This view helps you notice where care is already taking root." />{query.isLoading ? <div className="space-y-4"><Progress value={35} className="h-2" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Card key={index} className="h-28 animate-pulse rounded-2xl bg-muted/50" />)}</div></div> : query.isError ? <Card className="rounded-2xl border-destructive/30"><CardContent className="pt-6"><p className="text-sm text-destructive">We could not load your progress right now. Please try again in a moment.</p></CardContent></Card> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(query.data ?? []).map((dimension) => <Card key={dimension.dimensionId} className="rounded-2xl border-border/70 bg-card/80 shadow-none"><CardHeader className="pb-3"><CardTitle className="font-serif text-xl">{dimension.dimensionLabel}</CardTitle></CardHeader><CardContent><div className="mb-2 flex items-center justify-between text-sm"><span className="text-muted-foreground">Current signal</span><span className="font-semibold text-primary">{dimension.score}%</span></div><Progress value={dimension.score} /></CardContent></Card>)}</div>}</div></Workspace>;
}

const journalPrompts = [
  { label: "Name what is true", text: "Right now, what feels most true is…" },
  { label: "Notice the win", text: "One thing I did today that helped me stay connected was…" },
  { label: "Make room for repair", text: "A place in my life that deserves a little care next is…" },
  { label: "Speak to tomorrow", text: "Tomorrow, I want to remember…" },
];

export function JournalPage() {
  const [body, setBody] = useState("");
  const [activePrompt, setActivePrompt] = useState<string>();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number>();
  const [editingBody, setEditingBody] = useState("");
  const [deleteId, setDeleteId] = useState<number>();
  const [dimensionFilter, setDimensionFilter] = useState("all");
  const dimensionsQuery = trpc.onboarding.getDimensions.useQuery(undefined, { staleTime: 5 * 60 * 1000 });
  const parsedDimensionFilter = parseJournalDimensionFilter(dimensionFilter);
  const listInput = useMemo(() => ({
    limit: 50,
    offset: 0,
    ...(parsedDimensionFilter === undefined ? {} : { dimensionId: parsedDimensionFilter }),
  }), [parsedDimensionFilter]);
  const listQuery = trpc.journal.list.useQuery(listInput);
  const utils = trpc.useUtils();
  const createMutation = trpc.journal.create.useMutation({
    onSuccess: async () => {
      setBody("");
      setActivePrompt(undefined);
      await utils.journal.list.invalidate();
      toast.success("Your reflection is safely tucked away.");
    },
    onError: () => toast.error("We could not save this reflection. Your draft is still here; please try again."),
  });
  const updateMutation = trpc.journal.update.useMutation({
    onSuccess: async () => {
      setEditingId(undefined);
      setEditingBody("");
      await utils.journal.list.invalidate();
      toast.success("Reflection updated.");
    },
    onError: () => toast.error("We could not update this reflection. Please try again."),
  });
  const deleteMutation = trpc.journal.remove.useMutation({
    onSuccess: async () => {
      setDeleteId(undefined);
      await utils.journal.list.invalidate();
      toast.success("Reflection deleted from your journal.");
    },
    onError: () => toast.error("We could not delete this reflection. Please try again."),
  });
  const selectPrompt = (prompt: typeof journalPrompts[number]) => {
    setActivePrompt(prompt.label);
    setBody((current) => current ? `${current}\n\n${prompt.text} ` : `${prompt.text} `);
  };
  const visibleEntries = filterJournalEntries(listQuery.data ?? [], { search });

  return <Workspace>
    <div className="mx-auto max-w-5xl space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#304333] text-[#f7eddc]">
        <img src={REFORGE_ASSETS.journal} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,58,43,.96),rgba(39,58,43,.54),rgba(39,58,43,.14))]" />
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl space-y-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200"><BookOpen className="h-4 w-4" aria-hidden="true" /> Private reflection</p><h1 className="font-serif text-4xl leading-tight sm:text-5xl">Make room for the truth.</h1><p className="text-sm leading-7 text-white/75 sm:text-base">Your journal is not a performance. It is a private place to notice what you have been carrying, learning, and choosing.</p></div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-4 py-3 text-xs text-white/75"><Lock className="h-4 w-4 text-amber-200" aria-hidden="true" /> Encrypted before storage</div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none">
          <CardHeader><CardTitle className="font-serif text-2xl">Choose a doorway in</CardTitle><CardDescription>Use a prompt if it helps. Or begin anywhere.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">{journalPrompts.map((prompt) => <Button key={prompt.label} type="button" variant={activePrompt === prompt.label ? "default" : "outline"} onClick={() => selectPrompt(prompt)} className="rounded-full text-xs">{prompt.label}</Button>)}</div>
            <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="What feels important today?" className="min-h-56 resize-y rounded-2xl bg-background/70" aria-label="Private journal reflection" />
            <div className="flex items-center gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" /> Your entry is private to you and sensitive text is encrypted before it is stored.</div>
            <Button disabled={!body.trim() || createMutation.isPending} onClick={() => createMutation.mutate({ body: body.trim() })} className="w-full gap-2 rounded-full"><Save className="h-4 w-4" aria-hidden="true" />{createMutation.isPending ? "Saving your page…" : "Save reflection"}</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 bg-card/80 shadow-none">
          <CardHeader className="space-y-4"><div><CardTitle className="font-serif text-2xl">Recent reflections</CardTitle><CardDescription>A gentle record of what you have been carrying and learning.</CardDescription></div><div className="grid gap-2 sm:grid-cols-[1fr_200px]"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your reflections" className="rounded-xl pl-9" aria-label="Search private reflections" /></div><div className="space-y-1"><label htmlFor="journal-dimension-filter" className="sr-only">Filter by life dimension</label><select id="journal-dimension-filter" value={dimensionFilter} onChange={(event) => setDimensionFilter(event.target.value)} className="h-10 w-full rounded-xl border bg-background px-3 text-sm" disabled={dimensionsQuery.isLoading}><option value="all">All dimensions</option>{(dimensionsQuery.data ?? []).map((dimension) => <option key={dimension.id} value={dimension.id}>{dimension.label}</option>)}</select></div></div></CardHeader>
          <CardContent className="space-y-3">
            {listQuery.isLoading ? <div className="space-y-3">{[1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse rounded-2xl bg-muted/50" />)}</div> : listQuery.isError ? <div className="space-y-3"><p className="text-sm text-destructive">We could not load your private reflections right now.</p><Button variant="outline" size="sm" onClick={() => void listQuery.refetch()} className="rounded-full">Try again</Button></div> : visibleEntries.length ? visibleEntries.map((entry) => <article key={entry.id} className="rounded-2xl border border-border/50 bg-muted/30 p-4">
              {editingId === entry.id ? <div className="space-y-3"><Textarea value={editingBody} onChange={(event) => setEditingBody(event.target.value)} className="min-h-32 rounded-xl bg-background/70" aria-label="Edit private journal reflection" /><div className="flex flex-wrap justify-end gap-2"><Button type="button" variant="ghost" size="sm" onClick={() => { setEditingId(undefined); setEditingBody(""); }} className="rounded-full"><X className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Cancel</Button><Button type="button" size="sm" disabled={!editingBody.trim() || updateMutation.isPending} onClick={() => updateMutation.mutate({ entryId: entry.id, body: editingBody.trim() })} className="rounded-full"><Save className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Save changes</Button></div></div> : <><p className="whitespace-pre-wrap text-sm leading-6">{entry.body}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleString()}</p><div className="flex items-center gap-1">{deleteId === entry.id ? <><Button type="button" variant="destructive" size="sm" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate({ entryId: entry.id })} className="rounded-full">Delete forever</Button><Button type="button" variant="ghost" size="sm" onClick={() => setDeleteId(undefined)} className="rounded-full">Keep</Button></> : <><Button type="button" variant="ghost" size="sm" onClick={() => { setEditingId(entry.id); setEditingBody(entry.body); }} className="rounded-full"><Pencil className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Edit</Button><Button type="button" variant="ghost" size="sm" onClick={() => setDeleteId(entry.id)} className="rounded-full text-destructive hover:text-destructive"><Trash2 className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Delete</Button></>}</div></div></>}
            </article>) : search.trim() ? <EmptyState title="No reflections found." description="Try a different word, or clear the search to see all your pages." icon={Search} /> : <EmptyState title="Your first page is waiting." description="There is no right way to begin. A few honest words are enough." icon={BookOpen} />}
          </CardContent>
        </Card>
      </div>
    </div>
  </Workspace>;
}

type GoalRecord = {
  id: number;
  userId: number;
  horizon: "30" | "90" | "180";
  dimensionId: number | null;
  title: string;
  description: string | null;
  status: "active" | "completed" | "abandoned" | null;
  createdAt: Date;
  completedAt: Date | null;
  updatedAt: Date | null;
};

const goalStatuses = ["active", "completed", "abandoned"] as const;

function GoalCard({ goal, dimensionLabel, onChanged }: { goal: GoalRecord; dimensionLabel?: string; onChanged: () => void }) {
  const [stepInput, setStepInput] = useState("");
  const stepsQuery = trpc.goals.steps.useQuery({ goalId: goal.id });
  const historyQuery = trpc.goals.history.useQuery({ goalId: goal.id });
  const addStepMutation = trpc.goals.addStep.useMutation({
    onSuccess: () => { setStepInput(""); void stepsQuery.refetch(); },
    onError: () => toast.error("We could not add that step. Try again."),
  });
  const toggleStepMutation = trpc.goals.toggleStep.useMutation({
    onSuccess: () => { void stepsQuery.refetch(); onChanged(); },
    onError: () => toast.error("We could not update that step. Try again."),
  });
  const statusMutation = trpc.goals.updateStatus.useMutation({
    onSuccess: () => { toast.success("Goal status updated"); void historyQuery.refetch(); onChanged(); },
    onError: () => toast.error("We could not update the goal status. Try again."),
  });
  const steps = stepsQuery.data ?? [];
  const completed = steps.filter(step => step.doneAt != null).length;
  const progress = steps.length ? Math.round((completed / steps.length) * 100) : 0;
  const nextStep = steps.find(step => step.doneAt == null);
  const currentStatus = goal.status ?? "active";

  return <Card className="rounded-2xl border-border/70 bg-card/80 shadow-none">
    <CardHeader>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle className="font-serif text-xl">{goal.title}</CardTitle>
          <CardDescription className="mt-2">{goal.description || "A meaningful step in your recovery practice."}</CardDescription>
        </div>
        <Badge variant="secondary" className="rounded-full">{goal.horizon} days</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">{dimensionLabel ?? "Whole-life practice"}</Badge>
        <span className="text-xs text-muted-foreground">Started {new Date(goal.createdAt).toLocaleDateString()}</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="space-y-2" aria-label={`${completed} of ${steps.length} goal steps complete`}>
        <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Next actions</span><span>{steps.length ? `${completed} of ${steps.length} complete` : "No steps yet"}</span></div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground">{nextStep ? `Next: ${nextStep.title}` : steps.length ? "All steps complete. Let the goal settle into your story." : "Add one small action to make this goal easier to return to."}</p>
      </div>
      <div className="space-y-2">
        {stepsQuery.isLoading ? <p className="text-sm text-muted-foreground">Loading steps…</p> : stepsQuery.isError ? <p className="text-sm text-destructive">Steps are unavailable right now.</p> : steps.map(step => <label key={step.id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 text-sm"><input type="checkbox" checked={Boolean(step.doneAt)} onChange={() => toggleStepMutation.mutate({ goalId: goal.id, stepId: step.id })} className="h-4 w-4 accent-primary" /> <span className={step.doneAt ? "text-muted-foreground line-through" : ""}>{step.title}</span></label>)}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input aria-label={`Add a step to ${goal.title}`} value={stepInput} onChange={(event) => setStepInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && stepInput.trim()) addStepMutation.mutate({ goalId: goal.id, title: stepInput.trim() }); }} placeholder="Add a small next action" className="rounded-xl" maxLength={255} />
        <Button variant="outline" className="rounded-full" disabled={!stepInput.trim() || addStepMutation.isPending} onClick={() => addStepMutation.mutate({ goalId: goal.id, title: stepInput.trim() })}><Plus className="mr-2 h-4 w-4" /> Add step</Button>
      </div>
      <div className="space-y-3 border-t border-border/60 pt-4">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Status</p><div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Update status for ${goal.title}`}>{goalStatuses.map(status => <Button key={status} size="sm" variant={currentStatus === status ? "default" : "outline"} className="rounded-full capitalize" disabled={statusMutation.isPending || currentStatus === status} onClick={() => statusMutation.mutate({ goalId: goal.id, status })}>{status}</Button>)}</div></div>
        {historyQuery.isLoading ? <p className="text-xs text-muted-foreground">Loading status history…</p> : historyQuery.isError ? <p className="text-xs text-destructive">Status history is unavailable.</p> : historyQuery.data?.length ? <div className="space-y-2"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Recent history</p>{historyQuery.data.slice(0, 4).map(entry => <div key={entry.id} className="flex items-center justify-between gap-3 text-xs text-muted-foreground"><span className="capitalize">{entry.status}</span><time dateTime={new Date(entry.changedAt).toISOString()}>{new Date(entry.changedAt).toLocaleDateString()}</time></div>)}</div> : null}
      </div>
    </CardContent>
  </Card>;
}

export function GoalsPage() {
  const [title, setTitle] = useState("");
  const [horizon, setHorizon] = useState<"30" | "90" | "180">("30");
  const [description, setDescription] = useState("");
  const [dimensionId, setDimensionId] = useState("none");
  const goalsQuery = trpc.goals.all.useQuery();
  const dimensionsQuery = trpc.onboarding.getDimensions.useQuery(undefined, { staleTime: 5 * 60 * 1000 });
  const createMutation = trpc.goals.create.useMutation({
    onSuccess: () => { toast.success("Goal created"); setTitle(""); setDescription(""); setDimensionId("none"); void goalsQuery.refetch(); },
    onError: () => toast.error("We could not create that goal. Try again."),
  });
  const dimensionsById = new Map((dimensionsQuery.data ?? []).map(dimension => [dimension.id, dimension.label]));
  return <Workspace><div className="mx-auto max-w-5xl space-y-7">
    <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#4a3024] text-[#f7eddc]"><img src={REFORGE_ASSETS.goals} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(74,48,36,.96),rgba(74,48,36,.55),rgba(74,48,36,.12))]" /><div className="relative max-w-2xl space-y-3 p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Forward, not perfect</p><h1 className="font-serif text-4xl leading-tight sm:text-5xl">Goals that fit your real life.</h1><p className="text-sm leading-7 text-white/75 sm:text-base">Choose one next step at a time. You can change the shape of the journey as you learn.</p></div></section>
    <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none"><CardHeader><CardTitle className="flex items-center gap-2 font-serif text-2xl"><Plus className="h-5 w-5 text-primary" /> Add a goal</CardTitle><CardDescription>Give the next season a direction, then keep the action small enough to return to.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="grid gap-4 md:grid-cols-[1fr_160px]"><div className="space-y-2"><Label htmlFor="goal-title">What would you like to move toward?</Label><Input id="goal-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Take a walk after work three days this week" className="rounded-xl" maxLength={255} /></div><div className="space-y-2"><Label htmlFor="goal-horizon">Horizon</Label><select id="goal-horizon" value={horizon} onChange={(event) => setHorizon(event.target.value as "30" | "90" | "180")} className="h-10 w-full rounded-xl border bg-background px-3 text-sm"><option value="30">30 days</option><option value="90">90 days</option><option value="180">180 days</option></select></div></div><div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="goal-dimension">Life dimension (optional)</Label><select id="goal-dimension" value={dimensionId} onChange={(event) => setDimensionId(event.target.value)} className="h-10 w-full rounded-xl border bg-background px-3 text-sm"><option value="none">Whole-life practice</option>{(dimensionsQuery.data ?? []).map(dimension => <option key={dimension.id} value={dimension.id}>{dimension.label}</option>)}</select></div><div className="space-y-2"><Label htmlFor="goal-description">Why it matters (optional)</Label><Textarea id="goal-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will this unlock for you?" className="min-h-20 rounded-xl" maxLength={2000} /></div></div><Button disabled={!title.trim() || createMutation.isPending} onClick={() => createMutation.mutate({ title: title.trim(), horizon, description: description.trim() || undefined, dimensionId: dimensionId === "none" ? undefined : Number(dimensionId) })} className="rounded-full">{createMutation.isPending ? "Creating…" : "Create goal"}</Button></CardContent></Card>
    <div className="grid gap-4 md:grid-cols-2">{goalsQuery.isLoading ? [1, 2].map(item => <Card key={item} className="h-72 animate-pulse rounded-2xl bg-muted/50" />) : goalsQuery.isError ? <Card className="md:col-span-2 rounded-2xl border-destructive/30"><CardContent className="pt-6 text-sm text-destructive">We could not load your goals right now. Please try again in a moment.</CardContent></Card> : goalsQuery.data?.length ? goalsQuery.data.map(goal => <GoalCard key={goal.id} goal={goal} dimensionLabel={goal.dimensionId ? dimensionsById.get(goal.dimensionId) : undefined} onChanged={() => void goalsQuery.refetch()} />) : <Card className="md:col-span-2 rounded-2xl border-border/70 shadow-none"><CardContent className="pt-6"><EmptyState title="No goals yet." description="Start with something small enough to keep. You can revise the shape of the journey as you learn." icon={Target} /></CardContent></Card>}</div>
  </div></Workspace>;
}

export function MusicPage() {
  const profileQuery = trpc.music.getProfile.useQuery();
  const updateMutation = trpc.music.updateProfile.useMutation({ onSuccess: () => void profileQuery.refetch() });
  const [triggerGenres, setTriggerGenres] = useState("");
  const [triggerArtists, setTriggerArtists] = useState("");
  const [safeGenres, setSafeGenres] = useState("");
  const profile = profileQuery.data;
  if (profileQuery.isLoading) return <Workspace><div className="mx-auto max-w-3xl"><Card className="h-64 animate-pulse rounded-3xl bg-muted/50" /></div></Workspace>;
  return <Workspace><div className="mx-auto max-w-3xl space-y-7"><section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#2e2824] text-[#f7eddc]"><img src={REFORGE_ASSETS.music} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" /><div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(46,40,36,.96),rgba(46,40,36,.48),rgba(46,40,36,.08))]" /><div className="relative max-w-2xl space-y-3 p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Sound with intention</p><h1 className="font-serif text-4xl leading-tight sm:text-5xl">Your music reset.</h1><p className="text-sm leading-7 text-white/75 sm:text-base">Notice what pulls you backward, then make space for sounds that support the life you are building.</p></div></section><Card className="relative overflow-hidden rounded-2xl border-border/70 bg-card/85 shadow-none"><div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/8 blur-3xl" /><CardHeader className="relative"><CardTitle className="flex items-center gap-2 font-serif text-2xl"><Music2 className="h-5 w-5 text-primary" /> Trigger and safe-list assessment</CardTitle><CardDescription>Use commas to separate genres or artists. This stays connected to your account preferences.</CardDescription></CardHeader><CardContent className="relative space-y-4"><div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Trigger genres</Label><Input value={triggerGenres || profile?.triggerGenres || ""} onChange={(event) => setTriggerGenres(event.target.value)} placeholder="e.g. club mixes, aggressive trap" className="rounded-xl" /></div><div className="space-y-2"><Label>Trigger artists</Label><Input value={triggerArtists || profile?.triggerArtists || ""} onChange={(event) => setTriggerArtists(event.target.value)} placeholder="e.g. artist names" className="rounded-xl" /></div></div><div className="space-y-2"><Label>Safe genres to explore</Label><Input value={safeGenres || profile?.safeGenres || ""} onChange={(event) => setSafeGenres(event.target.value)} placeholder="e.g. gospel, jazz, acoustic" className="rounded-xl" /></div><Button onClick={() => updateMutation.mutate({ triggerGenres: triggerGenres || profile?.triggerGenres || "", triggerArtists: triggerArtists || profile?.triggerArtists || "", safeGenres: safeGenres || profile?.safeGenres || "" })} disabled={updateMutation.isPending} className="rounded-full">{updateMutation.isPending ? "Saving…" : "Save music profile"}</Button></CardContent></Card><Card className="rounded-2xl border-primary/20 bg-primary/7 shadow-none"><CardContent className="flex gap-3 p-6"><Headphones className="mt-0.5 h-5 w-5 text-primary" /><p className="text-sm leading-6 text-muted-foreground">This feature is opt-in. ReForge does not connect to streaming accounts or change what you listen to; it helps you make deliberate choices.</p></CardContent></Card></div></Workspace>;
}

const motivationByKeyword: Record<string, string> = { body: "Your body is not a problem to fix. It is a place to come home to, one caring choice at a time.", mind: "A thought can be loud without being a command. Notice it, then choose your next small action.", emotion: "You are allowed to feel the whole weather of a day and still move gently through it.", relationship: "Repair begins with honesty, boundaries, and one conversation that does not need to be perfect.", work: "A sustainable life is built with rhythms you can return to, not standards that punish you.", money: "Small acts of stewardship can become evidence that your future deserves care.", home: "Your environment can become a quiet ally. Start with one corner that helps you breathe.", meaning: "Meaning is not always found in grand answers. Sometimes it is made in the way you show up today.", music: "You can change the soundtrack without erasing where you came from.", default: "There is no perfect entry point. Choose one small practice and let it teach you what comes next." };
function motivationFor(label: string) { const key = Object.keys(motivationByKeyword).find((candidate) => candidate !== "default" && label.toLowerCase().includes(candidate)); return motivationByKeyword[key ?? "default"]; }

export function GuidesPage() {
  const dimensionsQuery = trpc.onboarding.getDimensions.useQuery();
  const [dimensionId, setDimensionId] = useState<number>();
  const resourcesQuery = trpc.resources.getByDimension.useQuery({ dimensionId: dimensionId ?? 0 }, { enabled: Boolean(dimensionId) });
  const selectedDimension = dimensionsQuery.data?.find((dimension) => dimension.id === dimensionId);
  return <Workspace><div className="mx-auto max-w-5xl space-y-7"><section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#304333] text-[#f7eddc]"><img src={REFORGE_ASSETS.guides} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,58,43,.94),rgba(39,58,43,.45),rgba(39,58,43,.08))]" /><div className="relative max-w-2xl space-y-3 p-7 sm:p-10"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200"><BookOpen className="h-4 w-4" /> Context when you need it</p><h1 className="font-serif text-4xl leading-tight sm:text-5xl">Guides for the next right step.</h1><p className="text-sm leading-7 text-white/75 sm:text-base">Choose a life dimension and find activities, situation guides, and repair practices that meet you there.</p></div></section><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{dimensionsQuery.isLoading ? Array.from({ length: 9 }).map((_, index) => <div key={index} className="h-14 animate-pulse rounded-xl bg-muted/50" />) : (dimensionsQuery.data ?? []).map((dimension) => <Button key={dimension.id} variant={dimensionId === dimension.id ? "default" : "outline"} className="h-auto min-h-14 justify-start whitespace-normal rounded-xl p-4 text-left" onClick={() => setDimensionId(dimension.id)}>{dimension.label}</Button>)}</div>{selectedDimension && <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><Card className="rounded-2xl border-primary/20 bg-primary/7 shadow-none"><CardContent className="space-y-4 p-6"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary"><Sparkles className="h-5 w-5" /></div><Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">{selectedDimension.label}</Badge><p className="font-serif text-2xl leading-tight">{motivationFor(selectedDimension.label)}</p><p className="text-sm leading-6 text-muted-foreground">Let this be the reason you keep the practice small enough to return to.</p></CardContent></Card><Card className="rounded-2xl border-border/70 bg-card/80 shadow-none"><CardHeader><CardTitle className="font-serif text-2xl">Resources for this dimension</CardTitle><CardDescription>Read, reflect, then choose one action that feels possible.</CardDescription></CardHeader><CardContent className="space-y-3">{resourcesQuery.isLoading ? <p className="text-sm text-muted-foreground">Loading resources…</p> : resourcesQuery.isError ? <p className="text-sm text-destructive">We could not load these guides right now.</p> : resourcesQuery.data?.length ? resourcesQuery.data.map((resource) => <article key={resource.id} className="rounded-2xl border border-border/60 bg-muted/25 p-4"><h3 className="font-serif text-xl">{resource.title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{resource.body}</p></article>) : <EmptyState title="This shelf is still being written." description="Choose another dimension or return later as new guides are added." icon={BookOpen} />}</CardContent></Card></div>}{!selectedDimension && <EmptyState title="Choose a dimension to begin." description="Every guide is connected to one of the 21 places where life can be restored." icon={BookOpen} />}</div></Workspace>;
}

export function SettingsPage() {
  const profileQuery = trpc.profile.get.useQuery();
  const preferencesQuery = trpc.preferences.get.useQuery();
  const profileMutation = trpc.profile.update.useMutation({ onSuccess: () => void profileQuery.refetch() });
  const preferencesMutation = trpc.preferences.update.useMutation({ onSuccess: () => void preferencesQuery.refetch() });
  const [displayName, setDisplayName] = useState("");
  const [faithPreference, setFaithPreference] = useState<"faith" | "secular" | "both">("both");
  const profile = profileQuery.data;
  const preferences = preferencesQuery.data;
  return <Workspace><div className="mx-auto max-w-3xl space-y-7"><section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#3f4632] text-[#f7eddc]"><img src={REFORGE_ASSETS.settings} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(63,70,50,.96),rgba(63,70,50,.56),rgba(63,70,50,.08))]" /><div className="relative max-w-2xl space-y-3 p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Your pace, your choices</p><h1 className="font-serif text-4xl leading-tight sm:text-5xl">Settings and privacy.</h1><p className="text-sm leading-7 text-white/75 sm:text-base">Personalize the language and rhythm of your recovery space. Devotional content is always opt-in.</p></div></section><Card className="rounded-2xl border-border/70 bg-card/85 shadow-none"><CardHeader><CardTitle className="font-serif text-2xl">Profile and content preference</CardTitle><CardDescription>Choose how ReForge addresses you and which reflection style you want to see.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label>Display name</Label><Input value={displayName || profile?.displayName || ""} onChange={(event) => setDisplayName(event.target.value)} placeholder="How should ReForge address you?" className="rounded-xl" /></div><div className="space-y-2"><Label>Devotional preference</Label><select value={faithPreference || profile?.faithPreference || "both"} onChange={(event) => setFaithPreference(event.target.value as "faith" | "secular" | "both")} className="h-10 w-full rounded-xl border bg-background px-3 text-sm"><option value="faith">Faith-based prompts</option><option value="secular">Secular prompts</option><option value="both">Show both, clearly labelled</option></select></div><Button onClick={() => profileMutation.mutate({ displayName: displayName || profile?.displayName || "", faithPreference })} disabled={profileMutation.isPending} className="rounded-full">{profileMutation.isPending ? "Saving…" : "Save profile"}</Button></CardContent></Card><Card className="rounded-2xl border-border/70 bg-card/80 shadow-none"><CardHeader><CardTitle className="font-serif text-2xl">Notifications and privacy</CardTitle><CardDescription>Keep the thread visible without allowing it to become noise.</CardDescription></CardHeader><CardContent className="space-y-3"><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={preferences?.notificationsEnabled ?? true} onChange={(event) => preferencesMutation.mutate({ notificationsEnabled: event.target.checked })} /> In-app reminders</label><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={preferences?.emailNotifications ?? true} onChange={(event) => preferencesMutation.mutate({ emailNotifications: event.target.checked })} /> Email reminders</label><div className="flex items-center gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Sensitive journal and check-in text is encrypted before storage and never written to application logs.</div></CardContent></Card></div></Workspace>;
}

export function OnboardingPage() {
  const [, setLocation] = useLocation();
  const dimensionsQuery = trpc.onboarding.getDimensions.useQuery();
  const startMutation = trpc.onboarding.startAssessment.useMutation();
  const saveMutation = trpc.onboarding.saveResponse.useMutation();
  const completeMutation = trpc.onboarding.completeAssessment.useMutation();
  const dimensions = dimensionsQuery.data ?? [];
  const [step, setStep] = useState(0);
  const [assessmentId, setAssessmentId] = useState<number>();
  const [substanceFocus, setSubstanceFocus] = useState<"alcohol" | "nicotine" | "marijuana" | "codeine" | "prescription">("alcohol");
  const [score, setScore] = useState(3);
  const [response, setResponse] = useState("");
  const [started, setStarted] = useState(false);
  const isSubstanceStep = step === 0;
  const dimensionIndex = step - 1;
  const dimension = dimensions[dimensionIndex];
  const totalSteps = dimensions.length + 1;
  const begin = async () => { const result = await startMutation.mutateAsync(); setAssessmentId(result?.id); setStarted(true); };
  const next = async () => { if (!assessmentId || !dimension) return; await saveMutation.mutateAsync({ assessmentId, dimensionId: dimension.id, response: { score, reflection: response } }); setResponse(""); setScore(3); if (dimensionIndex === dimensions.length - 1) { await completeMutation.mutateAsync({ assessmentId, substanceFocus }); setLocation("/dashboard"); } else setStep((current) => current + 1); };
  return <Workspace><div className="mx-auto max-w-3xl space-y-7"><section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#304333] text-[#f7eddc]"><img src={REFORGE_ASSETS.guides} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-[#304333]/75" /><div className="relative space-y-3 p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">A conversation with yourself</p><h1 className="font-serif text-4xl leading-tight sm:text-5xl">Start with where you are.</h1><p className="max-w-xl text-sm leading-7 text-white/75 sm:text-base">This is not a test. It is a gentle starting map across the parts of life you want to restore.</p></div></section>{!started ? <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none"><CardHeader><CardTitle className="font-serif text-2xl">What are you focusing on first?</CardTitle><CardDescription>Choose one primary substance or habit. You can revisit your focus later.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="grid gap-2 sm:grid-cols-2">{(["alcohol", "nicotine", "marijuana", "codeine", "prescription"] as const).map((substance) => <Button key={substance} variant={substanceFocus === substance ? "default" : "outline"} onClick={() => setSubstanceFocus(substance)} className="justify-start rounded-xl capitalize">{substance}</Button>)}</div><Button onClick={begin} disabled={startMutation.isPending || !dimensions.length} className="w-full rounded-full">{startMutation.isPending ? "Opening your assessment…" : "Begin assessment"}<ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent></Card> : <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none"><CardHeader><div className="mb-2 flex items-center justify-between text-sm text-muted-foreground"><span>Step {step + 1} of {totalSteps}</span><span>{Math.round(((step + 1) / totalSteps) * 100)}%</span></div><Progress value={((step + 1) / totalSteps) * 100} /><CardTitle className="pt-4 font-serif text-2xl">{dimension?.label || "Your focus"}</CardTitle><CardDescription>{isSubstanceStep ? "Your focus is saved with your assessment." : dimension?.description || "What would care look like here?"}</CardDescription></CardHeader><CardContent className="space-y-5">{isSubstanceStep ? <div className="rounded-2xl bg-primary/8 p-4 text-sm">Focus selected: <strong className="capitalize">{substanceFocus}</strong>. The next steps will move through all 21 life dimensions.</div> : <><div className="space-y-3"><Label>How supported does this area feel today? <span className="font-semibold text-primary">{score}/5</span></Label><input type="range" min="1" max="5" value={score} onChange={(event) => setScore(Number(event.target.value))} className="w-full accent-[var(--primary)]" /></div><div className="space-y-2"><Label htmlFor="reflection">A few words, if you want</Label><Textarea id="reflection" value={response} onChange={(event) => setResponse(event.target.value)} placeholder="What is true here right now?" className="rounded-xl" /></div></>}<Button onClick={() => isSubstanceStep ? setStep(1) : void next()} disabled={saveMutation.isPending || completeMutation.isPending} className="w-full rounded-full">{isSubstanceStep ? "Continue" : dimensionIndex === dimensions.length - 1 ? "Finish assessment" : "Save and continue"}<ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent></Card>}</div></Workspace>;
}

export function FeaturePlaceholder({ title, description }: { title: string; description: string }) { return <Workspace><Card className="mx-auto max-w-2xl rounded-2xl"><CardHeader><CardTitle className="font-serif text-2xl">{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent><Button onClick={() => window.history.back()} variant="outline" className="gap-2 rounded-full"><ArrowLeft className="h-4 w-4" /> Back</Button></CardContent></Card></Workspace>; }

export default function RecoveryWorkspace() { return null; }
