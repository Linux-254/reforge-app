import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Users, Leaf, LockKeyhole, Send, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { readGuestCommunityPosts, writeGuestCommunityPosts, type GuestCommunityPost } from "@/lib/guestDemoStorage";

const topics = ["All", "Daily rhythm", "Repair", "Courage"] as const;
const prompts = [
  "What helped you choose the next honest step today?",
  "What would you like to practice without needing to be perfect?",
  "Where could a little support change the shape of this week?",
];

export default function Community() {
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<GuestCommunityPost[]>(readGuestCommunityPosts);
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]>("Daily rhythm");
  const [filter, setFilter] = useState<(typeof topics)[number]>("All");
  const [notice, setNotice] = useState("");
  const visiblePosts = useMemo(() => filter === "All" ? posts : posts.filter((post) => post.topic === filter), [filter, posts]);

  const publish = () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    const next = [{ id: Date.now(), body: trimmed, topic, createdAt: new Date().toISOString() }, ...posts];
    setPosts(next);
    writeGuestCommunityPosts(next);
    setBody("");
    setNotice("Saved privately in this browser. Nothing was shared with a server.");
    window.setTimeout(() => setNotice(""), 3000);
  };

  return <div className="mx-auto max-w-5xl space-y-7">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3"><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary"><Users className="h-4 w-4" /> Community circle</p><h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">A gentler place to be witnessed.</h1><p className="max-w-2xl text-base leading-7 text-muted-foreground">Try the shape of peer encouragement without creating an account. This demo is a private rehearsal, not a live community.</p></div>
      <Button variant="outline" onClick={() => setLocation("/dashboard")} className="w-fit rounded-full">Back to overview</Button>
    </header>

    <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-none"><CardContent className="flex gap-3 p-5"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Demo boundary</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Posts stay in this browser under a ReForge-specific local key. There are no public feeds, profiles, likes, or shared anonymous writes in demo mode.</p></div></CardContent></Card>

    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
      <Card className="rounded-2xl border-border/70 bg-card/85 shadow-none"><CardHeader><CardTitle className="font-serif text-2xl">Offer one honest sentence</CardTitle><CardDescription>Choose a topic, write from your own experience, and keep identifying details out of a public demo.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="flex flex-wrap gap-2">{topics.slice(1).map((item) => <Button key={item} type="button" variant={topic === item ? "default" : "outline"} className="rounded-full text-xs" onClick={() => setTopic(item)}>{item}</Button>)}</div><div className="space-y-2"><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Try a prompt</p><div className="space-y-2">{prompts.map((prompt) => <button key={prompt} type="button" onClick={() => setBody((current) => current ? `${current}\n\n${prompt} ` : `${prompt} `)} className="w-full rounded-xl border border-border/70 bg-background/60 p-3 text-left text-sm leading-6 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{prompt}</button>)}</div></div><Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Something I want to remember…" className="min-h-36 rounded-2xl" aria-label="Community demo post" /><Button onClick={publish} disabled={!body.trim()} className="gap-2 rounded-full"><Send className="h-4 w-4" /> Save post locally</Button>{notice && <p role="status" className="text-sm text-primary">{notice}</p>}</CardContent></Card>

      <Card className="rounded-2xl border-border/70 bg-card/80 shadow-none"><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle className="font-serif text-2xl">Circle notes</CardTitle><CardDescription>{posts.length ? `${posts.length} private demo note${posts.length === 1 ? "" : "s"}` : "Your first note can begin here."}</CardDescription></div><MessageCircle className="h-5 w-5 text-primary" /></div><div className="flex flex-wrap gap-2 pt-2">{topics.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full border px-3 py-1.5 text-xs ${filter === item ? "border-primary bg-primary text-primary-foreground" : "border-border/70 text-muted-foreground hover:border-primary/40"}`}>{item}</button>)}</div></CardHeader><CardContent className="space-y-3">{visiblePosts.length === 0 ? <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center"><Leaf className="mx-auto h-6 w-6 text-primary" /><p className="mt-3 font-serif text-xl">A quiet circle is still a circle.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Write a note on the left to explore the interaction.</p></div> : visiblePosts.map((post) => <article key={post.id} className="rounded-2xl border border-border/60 bg-background/60 p-4"><div className="flex items-center justify-between gap-3"><Badge variant="outline" className="rounded-full">{post.topic}</Badge><time className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</time></div><p className="mt-3 whitespace-pre-wrap text-sm leading-7">{post.body}</p><p className="mt-3 text-xs text-muted-foreground">Private browser note · no profile attached</p></article>)}</CardContent></Card>
    </div>
  </div>;
}
