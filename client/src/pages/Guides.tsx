import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { DEMO_GUIDES, filterDemoGuides, guideTypeLabel, type DemoGuideType } from "@/lib/demoGuides";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, BookOpen, Compass, HeartHandshake, Newspaper, Search, Sparkles, Users } from "lucide-react";
import { useLocation } from "wouter";
import { useMemo, useState } from "react";

type ResourceType = DemoGuideType;

type Resource = {
  id: number | string;
  type: string;
  title: string;
  body: string | null;
  tags: string | null;
  faithVariant: string | null;
  dimension?: string | null;
  summary?: string | null;
  duration?: string | null;
};

const TABS: { type: ResourceType; label: string; icon: typeof BookOpen }[] = [
  { type: "activity_guide", label: "Activities", icon: Compass },
  { type: "situation_guide", label: "Situations", icon: Sparkles },
  { type: "relationship_guide", label: "Relationships", icon: Users },
  { type: "devotional", label: "Devotionals", icon: HeartHandshake },
  { type: "article", label: "Articles", icon: Newspaper },
];

const TYPE_LABEL: Record<ResourceType, string> = {
  activity_guide: "Activity guide",
  situation_guide: "Situation guide",
  relationship_guide: "Relationship guide",
  devotional: "Devotional",
  article: "Article",
};

export default function Guides() {
  useAuth({ redirectOnUnauthenticated: true, redirectPath: "/" });
  const [, setLocation] = useLocation();
  const demoMode = import.meta.env.VITE_DEMO_MODE !== "false";
  const [tab, setTab] = useState<ResourceType>("activity_guide");
  const [query, setQuery] = useState("");
  const [dimension, setDimension] = useState("");
  const [selected, setSelected] = useState<Resource | null>(null);

  const resourcesQuery = trpc.resources.getByType.useQuery(
    { type: tab, limit: 50 },
    { enabled: !demoMode, retry: 1 }
  );

  const demoResults = useMemo(
    () => filterDemoGuides(DEMO_GUIDES, query, dimension).filter(guide => guide.type === tab),
    [dimension, query, tab]
  );

  const authResources: Resource[] = useMemo(
    () => (resourcesQuery.data ?? []).map(resource => ({ ...resource, id: resource.id })),
    [resourcesQuery.data]
  );

  const resources: Resource[] = demoMode
    ? demoResults.map(guide => ({
        id: guide.id,
        type: guide.type,
        title: guide.title,
        body: guide.body,
        tags: guide.tags.join(" · "),
        faithVariant: guide.faithVariant,
        dimension: guide.dimension,
        summary: guide.summary,
        duration: guide.duration,
      }))
    : authResources;

  const dimensions = Array.from(new Set(DEMO_GUIDES.map(guide => guide.dimension))).sort();
  const isLoading = !demoMode && resourcesQuery.isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f2e8] to-[#edf1e5] text-[#203b2a]">
      <header className="border-b border-[#203b2a]/10 bg-[#f8f7ef]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-5 sm:px-6">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to workspace
          </Button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a05d3d]">ReForge library</p>
            <h1 className="font-serif text-2xl font-semibold">A next step for this season</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <section className="max-w-3xl space-y-3">
          <Badge variant="outline" className="border-[#7c9567] text-[#416142]">Practical, gentle, repeatable</Badge>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Choose a guide that meets you where you are.</h2>
          <p className="max-w-2xl text-[#58705a]">Explore short practices for urges, relationships, meaning, and the daily rhythm of rebuilding. The demo library is available without sign-in and stays in this browser.</p>
        </section>

        <section aria-label="Guide filters" className="space-y-4 rounded-3xl border border-[#203b2a]/10 bg-white/65 p-4 shadow-[0_18px_60px_rgba(37,57,39,0.08)] sm:p-5">
          <div className="flex flex-wrap gap-2">
            {TABS.map(tabItem => {
              const Icon = tabItem.icon;
              const active = tabItem.type === tab;
              return (
                <Button key={tabItem.type} variant={active ? "default" : "outline"} onClick={() => setTab(tabItem.type)} className="gap-2">
                  <Icon className="h-4 w-4" /> {tabItem.label}
                </Button>
              );
            })}
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
            <label className="relative block">
              <span className="sr-only">Search guides</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#58705a]" />
              <Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by need, practice, or keyword" className="border-[#203b2a]/15 bg-white/80 pl-9" />
            </label>
            <label className="block">
              <span className="sr-only">Filter by life dimension</span>
              <select value={dimension} onChange={event => setDimension(event.target.value)} className="h-10 w-full rounded-md border border-[#203b2a]/15 bg-white/80 px-3 text-sm text-[#203b2a] focus:outline-none focus:ring-2 focus:ring-[#416142]">
                <option value="">All dimensions</option>
                {dimensions.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </section>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Skeleton className="h-52" /><Skeleton className="h-52" /><Skeleton className="h-52" /></div>
        ) : resources.length === 0 ? (
          <Card className="border-[#203b2a]/10 bg-white/70"><CardContent className="py-14 text-center"><BookOpen className="mx-auto mb-4 h-10 w-10 text-[#a05d3d]" /><p className="text-[#58705a]">No guides match this view yet. Try another dimension or search term.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map(resource => (
              <button key={resource.id} type="button" onClick={() => setSelected(resource)} className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#416142] focus-visible:ring-offset-2">
                <Card className="h-full border-[#203b2a]/10 bg-white/75 transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2"><Badge variant="outline" className="border-[#7c9567] text-[#416142]">{TYPE_LABEL[resource.type as ResourceType] ?? "Resource"}</Badge>{resource.duration && <Badge variant="secondary">{resource.duration}</Badge>}</div>
                    <CardTitle className="font-serif text-xl text-[#203b2a]">{resource.title}</CardTitle>
                    <CardDescription className="text-[#58705a]">{resource.summary ?? "A practical reflection for your next step."}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3"><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#a05d3d]">{resource.dimension ?? "Whole-life practice"}</p>{resource.tags && <p className="text-xs text-[#58705a]">{resource.tags}</p>}</CardContent>
                </Card>
              </button>
            ))}
          </div>
        )}
      </main>

      <Dialog open={selected !== null} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-h-[82vh] overflow-y-auto border-[#203b2a]/10 bg-[#fbfaf3] sm:max-w-2xl">
          <DialogHeader><DialogTitle className="font-serif text-3xl text-[#203b2a]">{selected?.title}</DialogTitle></DialogHeader>
          {selected && <div className="space-y-5"><div className="flex flex-wrap gap-2"><Badge variant="outline">{TYPE_LABEL[selected.type as ResourceType] ?? "Resource"}</Badge>{selected.dimension && <Badge variant="secondary">{selected.dimension}</Badge>}{selected.duration && <Badge variant="secondary">{selected.duration}</Badge>}</div><p className="text-base leading-8 text-[#3f5945]">{selected.body}</p><div className="rounded-2xl bg-[#e9efe1] p-4 text-sm text-[#416142]"><strong>Try this next:</strong> choose one sentence or action from this guide and add it to today’s check-in.</div></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
