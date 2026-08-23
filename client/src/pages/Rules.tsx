import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { REFORGE_ASSETS } from "@/config/assets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  History,
  Pencil,
  Save,
  ShieldCheck,
  TimerReset,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Cadence = "daily" | "weekly" | "monthly";

const CADENCE_LABEL: Record<Cadence, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export default function Rules() {
  useAuth({ redirectOnUnauthenticated: true, redirectPath: "/" });
  const [text, setText] = useState("");
  const [cadence, setCadence] = useState<Cadence>("weekly");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingCadence, setEditingCadence] = useState<Cadence>("weekly");
  const [reviewRuleId, setReviewRuleId] = useState<number | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const listQuery = trpc.rules.all.useQuery();
  const reviewsQuery = trpc.rules.reviews.useQuery(
    { ruleId: reviewRuleId ?? 0 },
    { enabled: reviewRuleId !== null, retry: false },
  );
  const createMutation = trpc.rules.create.useMutation({
    onSuccess: async () => {
      toast.success("Boundary saved");
      setText("");
      await listQuery.refetch();
    },
    onError: () => toast.error("We could not save that boundary yet."),
  });
  const updateMutation = trpc.rules.update.useMutation({
    onSuccess: async () => {
      toast.success("Boundary updated");
      setEditingId(null);
      await listQuery.refetch();
    },
    onError: () => toast.error("We could not update that boundary yet."),
  });
  const reviewMutation = trpc.rules.review.useMutation({
    onSuccess: async () => {
      toast.success("Review recorded");
      setReviewNotes("");
      await Promise.all([listQuery.refetch(), reviewsQuery.refetch()]);
    },
    onError: () => toast.error("We could not record that review yet."),
  });
  const deleteMutation = trpc.rules.remove.useMutation({
    onSuccess: async () => {
      toast.success("Boundary removed");
      setDeleteId(null);
      if (reviewRuleId === deleteId) setReviewRuleId(null);
      await listQuery.refetch();
    },
    onError: () => toast.error("We could not remove that boundary yet."),
  });

  const rules = listQuery.data ?? [];
  const handleCreate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    createMutation.mutate({ text: trimmed, reviewCadence: cadence });
  };
  const beginEdit = (rule: (typeof rules)[number]) => {
    setEditingId(rule.id);
    setEditingText(rule.text);
    setEditingCadence((rule.reviewCadence as Cadence | null) ?? "weekly");
  };
  const saveEdit = () => {
    if (editingId === null || !editingText.trim()) return;
    updateMutation.mutate({ ruleId: editingId, text: editingText.trim(), reviewCadence: editingCadence });
  };
  const recordReview = (kept: boolean) => {
    if (reviewRuleId === null) return;
    reviewMutation.mutate({ ruleId: reviewRuleId, kept, notes: reviewNotes.trim() || undefined });
  };

  if (listQuery.isLoading) {
    return <DashboardLayout><div className="mx-auto max-w-6xl space-y-6"><div className="h-72 animate-pulse rounded-[2rem] bg-muted/50" /><div className="h-96 animate-pulse rounded-2xl bg-muted/40" /></div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-7">
        <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#304333] text-[#f7eddc]">
          <img src={REFORGE_ASSETS.checkIn} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(39,58,43,.98),rgba(39,58,43,.65),rgba(118,74,48,.25))]" />
          <div className="relative grid gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl space-y-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Boundaries with care</p>
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Write the rules that protect your return.</h1>
              <p className="text-sm leading-7 text-white/75 sm:text-base">A boundary is not a punishment. It is a small promise that helps the future version of you stay in the room.</p>
            </div>
            <div className="rounded-full border border-white/15 bg-black/10 px-4 py-3 text-xs text-white/75"><TimerReset className="mr-2 inline h-4 w-4 text-amber-200" aria-hidden="true" /> Review cadence is yours to choose</div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none">
            <CardHeader><CardTitle className="font-serif text-2xl">Add a boundary</CardTitle><CardDescription>Keep it clear, kind, and possible to review.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label htmlFor="new-rule-text">What do you want to protect?</Label><Input id="new-rule-text" value={text} onChange={(event) => setText(event.target.value)} placeholder="I will not make big decisions after midnight." className="rounded-xl" maxLength={500} /></div>
              <div className="space-y-2"><Label htmlFor="new-rule-cadence">Review cadence</Label><select id="new-rule-cadence" value={cadence} onChange={(event) => setCadence(event.target.value as Cadence)} className="h-10 w-full rounded-xl border bg-background px-3 text-sm"><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></div>
              <Button className="w-full rounded-full" disabled={!text.trim() || createMutation.isPending} onClick={handleCreate}>{createMutation.isPending ? "Saving…" : "Save boundary"}</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 bg-card/80 shadow-none">
            <CardHeader><CardTitle className="font-serif text-2xl">Your boundaries</CardTitle><CardDescription>Review what is active, adjust without shame, and keep a private record of how it went.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {listQuery.isError ? <div className="space-y-3"><p className="text-sm text-destructive">We could not load your boundaries right now.</p><Button variant="outline" className="rounded-full" onClick={() => void listQuery.refetch()}>Try again</Button></div> : rules.length ? rules.map((rule) => (
                <article key={rule.id} className={`rounded-2xl border border-border/60 p-4 transition-colors ${rule.active === false ? "bg-muted/15 opacity-70" : "bg-muted/25"}`}>
                  {editingId === rule.id ? <div className="space-y-3"><Label htmlFor={`edit-rule-${rule.id}`} className="sr-only">Edit boundary</Label><Input id={`edit-rule-${rule.id}`} value={editingText} onChange={(event) => setEditingText(event.target.value)} maxLength={500} className="rounded-xl" /><div className="flex flex-wrap gap-2"><select aria-label="Edit review cadence" value={editingCadence} onChange={(event) => setEditingCadence(event.target.value as Cadence)} className="h-9 rounded-full border bg-background px-3 text-xs"><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select><Button type="button" size="sm" className="rounded-full" disabled={!editingText.trim() || updateMutation.isPending} onClick={saveEdit}><Save className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Save</Button><Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={() => setEditingId(null)}><X className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Cancel</Button></div></div> : <><div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-start gap-3"><div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${rule.active === false ? "bg-muted text-muted-foreground" : "bg-primary/12 text-primary"}`}><Check className="h-3.5 w-3.5" aria-hidden="true" /></div><div className="min-w-0"><p className="text-sm leading-6">{rule.text}</p><div className="mt-2 flex flex-wrap items-center gap-2"><Badge variant="secondary" className="rounded-full text-xs">{CADENCE_LABEL[(rule.reviewCadence as Cadence) ?? "daily"]} review</Badge><Badge variant="outline" className="rounded-full text-xs">{rule.active === false ? "Paused" : "Active"}</Badge></div></div></div><div className="flex shrink-0 items-center gap-1"><Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label={`Edit boundary: ${rule.text}`} onClick={() => beginEdit(rule)}><Pencil className="h-4 w-4" aria-hidden="true" /></Button><Button type="button" variant="ghost" size="icon" className="rounded-full text-destructive hover:text-destructive" aria-label={`Remove boundary: ${rule.text}`} onClick={() => setDeleteId(rule.id)}><Trash2 className="h-4 w-4" aria-hidden="true" /></Button></div></div><div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-3"><label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={rule.active !== false} onChange={(event) => updateMutation.mutate({ ruleId: rule.id, active: event.target.checked })} className="h-4 w-4 accent-[hsl(var(--primary))]" aria-label={`${rule.active === false ? "Activate" : "Pause"} boundary: ${rule.text}`} /> Keep active</label><Button type="button" variant="outline" size="sm" className="ml-auto rounded-full" onClick={() => { setReviewRuleId(reviewRuleId === rule.id ? null : rule.id); setReviewNotes(""); }}><ClipboardCheck className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> {reviewRuleId === rule.id ? "Close review" : "Review now"}</Button></div>{reviewRuleId === rule.id && <div className="mt-3 space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="flex items-center gap-2"><History className="h-4 w-4 text-primary" aria-hidden="true" /><p className="text-sm font-medium">How did this boundary hold?</p></div><Textarea value={reviewNotes} onChange={(event) => setReviewNotes(event.target.value)} maxLength={2000} placeholder="Optional private note about what you noticed…" className="min-h-20 rounded-xl bg-background/70" aria-label="Optional private boundary review note" /><div className="flex flex-wrap gap-2"><Button type="button" size="sm" className="rounded-full" disabled={reviewMutation.isPending} onClick={() => recordReview(true)}><CheckCircle2 className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Kept it</Button><Button type="button" variant="outline" size="sm" className="rounded-full" disabled={reviewMutation.isPending} onClick={() => recordReview(false)}>Needs more support</Button></div>{reviewsQuery.isLoading ? <p className="text-xs text-muted-foreground">Loading private review history…</p> : reviewsQuery.isError ? <p className="text-xs text-destructive">Review history is unavailable right now.</p> : reviewsQuery.data?.length ? <div className="space-y-2"><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Recent reviews</p>{reviewsQuery.data.slice(0, 3).map((review) => <div key={review.id} className="rounded-xl bg-background/55 p-3 text-xs"><div className="flex flex-wrap justify-between gap-2"><span className={review.kept ? "text-primary" : "text-destructive"}>{review.kept ? "Kept" : "Needs support"}</span><span className="text-muted-foreground">{new Date(review.reviewDate).toLocaleDateString()}</span></div>{review.notes && <p className="mt-1 leading-5 text-muted-foreground">{review.notes}</p>}</div>)}</div> : <p className="text-xs text-muted-foreground">No reviews recorded yet.</p>}</div>}</>}
                </article>
              )) : <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center"><p className="font-serif text-2xl">Nothing written yet.</p><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Start with the boundary that would make tonight a little safer.</p></div>}
            </CardContent>
          </Card>
        </div>
      </div>

      {deleteId !== null && <div role="dialog" aria-modal="true" aria-labelledby="remove-rule-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><Card className="w-full max-w-md rounded-2xl"><CardHeader><CardTitle id="remove-rule-title">Remove this boundary?</CardTitle><CardDescription>This cannot be undone, and its review history will no longer be available.</CardDescription></CardHeader><CardContent className="flex justify-end gap-2"><Button type="button" variant="ghost" className="rounded-full" onClick={() => setDeleteId(null)}>Cancel</Button><Button type="button" variant="destructive" className="rounded-full" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate({ ruleId: deleteId })}>{deleteMutation.isPending ? "Removing…" : "Remove"}</Button></CardContent></Card></div>}
    </DashboardLayout>
  );
}
