import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  Users,
  Leaf,
  LockKeyhole,
  Send,
  MessageCircle,
  Heart,
  Sparkles,
  ShieldCheck,
  Flame,
  Sun,
  HandHeart,
  CornerDownRight,
  SmilePlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { readGuestCommunityPosts, writeGuestCommunityPosts, type GuestCommunityPost } from "@/lib/guestDemoStorage";

const topics = ["All", "Daily rhythm", "Repair", "Courage", "Milestones", "Cravings & Resets"] as const;

const initialCommunityNotes: GuestCommunityPost[] = [
  {
    id: 101,
    topic: "Daily rhythm",
    body: "Day 48 here. The morning walk without headphones used to make me nervous. Today, hearing the birds and smelling the damp pine trees was the richest 20 minutes of my week. One breath at a time.",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 102,
    topic: "Courage",
    body: "Told my sister the honest truth about where I'm at instead of pretending everything is already fixed. Her response was just 'Thank you for not hiding.' Such a relief to lay down the mask.",
    createdAt: new Date(Date.now() - 9 * 3600000).toISOString(),
  },
  {
    id: 103,
    topic: "Repair",
    body: "Remembering that relational repair is not a single dramatic gesture, but fifty quiet mornings of being steady and predictable. Grateful for the boundaries feature helping me stay accountable.",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: 104,
    topic: "Milestones",
    body: "Marked 6 weeks sober today. Celebrating with quiet tea, a warm bath, and starting a new drawing in my sketchbook. Sobriety gave me my creativity back.",
    createdAt: new Date(Date.now() - 36 * 3600000).toISOString(),
  },
];

const prompts = [
  "What helped you choose the next honest step today?",
  "What would you like to practice without needing to be perfect?",
  "Where did you notice a tiny glimmer of vitality or peace this week?",
  "What boundary protected your calm during a difficult moment?",
];

function CommunityContent() {
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<GuestCommunityPost[]>(() => {
    const existing = readGuestCommunityPosts();
    if (!existing || existing.length === 0) {
      writeGuestCommunityPosts(initialCommunityNotes);
      return initialCommunityNotes;
    }
    return existing;
  });

  const [body, setBody] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]>("Daily rhythm");
  const [filter, setFilter] = useState<(typeof topics)[number]>("All");
  const [notice, setNotice] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<string | number, number>>({});

  const visiblePosts = useMemo(
    () => (filter === "All" ? posts : posts.filter((post) => post.topic === filter)),
    [filter, posts]
  );

  const toggleLike = (postId: string | number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const publish = () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    const next = [
      { id: Date.now(), body: trimmed, topic, createdAt: new Date().toISOString() },
      ...posts,
    ];
    setPosts(next);
    writeGuestCommunityPosts(next);
    setBody("");
    setNotice("Saved privately in your local circle session.");
    window.setTimeout(() => setNotice(""), 3500);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            <Users className="h-4 w-4" /> Community circle
          </p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            A gentler place to be witnessed.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Connect through honest reflection without public tracking or judgment. Share what is real, receive quiet solidarity, and witness fellow journeyers choosing the next kind step.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setLocation("/dashboard")}
          className="w-fit rounded-full"
        >
          Back to overview
        </Button>
      </header>

      {/* Community Circle Guidelines Banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-none">
          <CardContent className="flex items-start gap-3 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Privacy Guaranteed
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Reflections remain anonymous. No names, contacts, or identities are attached.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-amber-500/20 bg-amber-500/5 shadow-none">
          <CardContent className="flex items-start gap-3 p-4">
            <HandHeart className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                No Fixing or Lecturing
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We speak from our own lived experiences with “I” statements, not unsolicited advice.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-emerald-500/20 bg-emerald-500/5 shadow-none">
          <CardContent className="flex items-start gap-3 p-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Gentle Momentum
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Celebrate honest beginnings, hard days met with compassion, and small daily rhythms.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
        {/* Composer Card */}
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Offer one honest reflection</CardTitle>
            <CardDescription>
              Choose a topic, write from your own experience, and share with fellow circle members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Select category
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.slice(1).map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={topic === item ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setTopic(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Need a spark? Tap a prompt
              </p>
              <div className="grid gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() =>
                      setBody((current) =>
                        current ? `${current}\n\n${prompt} ` : `${prompt} `
                      )
                    }
                    className="w-full rounded-xl border border-border/70 bg-background/60 p-3 text-left text-xs leading-5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    “{prompt}”
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="What is true for you right now? Name what helped, what is heavy, or what you are tending today..."
                className="min-h-36 rounded-2xl text-sm leading-relaxed"
                aria-label="Community reflection note"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <Button
                onClick={publish}
                disabled={!body.trim()}
                className="gap-2 rounded-full px-6"
              >
                <Send className="h-4 w-4" /> Share with Circle
              </Button>
              {notice && <p role="status" className="text-xs font-medium text-primary">{notice}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Community Circle Notes Feed */}
        <Card className="rounded-2xl border-border/70 bg-card/80 shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="font-serif text-2xl">Circle reflections</CardTitle>
                <CardDescription>
                  {visiblePosts.length} shared voice
                  {visiblePosts.length === 1 ? "" : "s"} holding space
                </CardDescription>
              </div>
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {topics.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    filter === item
                      ? "border-primary bg-primary text-primary-foreground font-medium"
                      : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {visiblePosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center">
                <Leaf className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 font-serif text-xl">A quiet circle is still a circle.</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Offer a thought on the left to begin this category's rhythm.
                </p>
              </div>
            ) : (
              visiblePosts.map((post) => {
                const likes = (likedPosts[post.id] || 0) + 3;
                return (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-border/60 bg-background/60 p-4 space-y-3 hover:border-border transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Badge variant="outline" className="rounded-full text-[11px] font-medium border-primary/30 text-primary">
                        {post.topic}
                      </Badge>
                      <time className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/90 font-serif">
                      “{post.body}”
                    </p>

                    <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground border-t border-border/40">
                      <span className="flex items-center gap-1.5">
                        <Leaf className="h-3.5 w-3.5 text-primary/70" /> Anonymous member
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-full hover:bg-primary/10"
                        aria-label="Send quiet warmth"
                      >
                        <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
                        <span>{likes} standing with you</span>
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <ErrorBoundary>
      <DashboardLayout>
        <CommunityContent />
      </DashboardLayout>
    </ErrorBoundary>
  );
}
