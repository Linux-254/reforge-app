import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DemoDataManager, SupporterConnectionItem } from "@/lib/demoSession";
import {
  HeartHandshake,
  HeartPulse,
  Send,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  BookOpen,
  Sparkles,
  PhoneCall,
  Lock,
  Leaf,
  Eye,
  Activity,
  UserCheck,
  Clock,
  TrendingUp,
} from "lucide-react";

export function SupporterDashboard() {
  const [encouragementNote, setEncouragementNote] = useState("");
  const [noteType, setNoteType] = useState<"feed" | "urge" | "quiet">("feed");
  const [isSending, setIsSending] = useState(false);
  const [historyNotes, setHistoryNotes] = useState([
    { id: 1, text: "Proud of you for holding your sleep boundary this week. Looking forward to our Saturday walk.", date: "Yesterday, 6:15 PM", type: "Quiet Reflection Card" },
    { id: 2, text: "Just saw your morning check-in. Thinking of you as you head into that work meeting today.", date: "3 days ago", type: "Practice Feed Note" },
  ]);

  const [connection, setConnection] = useState<SupporterConnectionItem | null>(null);

  useEffect(() => {
    const connections = DemoDataManager.getSupporterConnections();
    const sarahConn = connections.find(c => c.supporterEmail === "sarah.m@reforge.app") || connections[0] || null;
    setConnection(sarahConn);
  }, []);

  const handleSendEncouragement = (textToSend?: string) => {
    const text = textToSend || encouragementNote;
    if (!text.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setHistoryNotes([
        { id: Date.now(), text: text.trim(), date: "Just now", type: noteType === "feed" ? "Practice Feed Note" : noteType === "urge" ? "Urge Wave Support" : "Quiet Reflection Card" },
        ...historyNotes,
      ]);
      setEncouragementNote("");
      setIsSending(false);

      // Add to global Audit Logs
      DemoDataManager.addLog(
        "Sent Supporter Encouragement",
        `To: Sam Bennett (${noteType.toUpperCase()})`,
        "success"
      );

      toast.success("Encouragement delivered to Sam's daily practice feed!", {
        className: "nature-toast",
      });
    }, 400);
  };

  const quickPrompts = [
    "Proud of your steadiness today. One hour at a time.",
    "Rooting for you. Remember to take five deep breaths.",
    "So glad we're on this walk together. Let me know if you need to talk tonight.",
  ];

  // 7-Day Pulse Mock Data
  const weeklyPulse = [
    { day: "Thu", score: 3, label: "Steady", date: "Mar 16" },
    { day: "Fri", score: 4, label: "Calm", date: "Mar 17" },
    { day: "Sat", score: 4, label: "Peaceful", date: "Mar 18" },
    { day: "Sun", score: 5, label: "Grounded", date: "Mar 19" },
    { day: "Mon", score: 4, label: "Steady", date: "Mar 20" },
    { day: "Tue", score: 5, label: "Inspired", date: "Mar 21" },
    { day: "Today", score: 4, label: "Grounded", date: "Mar 22" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#2d3a30] text-[#f7eddc] shadow-[0_24px_60px_-40px_rgba(39,58,43,.8)]">
        <img
          src="/assets/hero-dawn.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(39,58,43,.96),rgba(39,58,43,.72),rgba(118,74,48,.3))]" />
        <div className="relative p-6 sm:p-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-primary/20 text-emerald-200 border-primary/30 gap-1.5 px-3 py-1">
              <HeartHandshake className="h-3.5 w-3.5" /> Supporter & Accountability Portal
            </Badge>
            <Badge className="rounded-full bg-amber-500/20 text-amber-200 border-amber-500/30 gap-1 px-2.5 py-0.5 text-xs">
              <UserCheck className="h-3 w-3" /> Consented Pairing Active
            </Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl leading-tight">
            Walking alongside Sam Bennett.
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Your presence is an anchor. ReForge provides you with consented recovery pulses so you can encourage Sam without becoming an investigator or manager.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200/90 pt-1 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-300" />
              <span>Private journal entries remain 100% confidential to Sam.</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-amber-300" />
              <span>Consent Scope: {connection?.scope || "Dashboard & Rules"}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Vitality Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Today's Check-in</span>
              <HeartPulse className="h-4 w-4 text-primary" />
            </div>
            <p className="font-serif text-2xl font-bold text-primary mt-2">Completed</p>
            <p className="text-xs text-muted-foreground mt-1">7:30 AM · Mood rated 4 / 5</p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Current Practice</span>
              <Sparkles className="h-4 w-4 text-amber-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-foreground mt-2">Day 48</p>
            <p className="text-xs text-muted-foreground mt-1">Cohort 14 · Continuous streak</p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Boundaries Kept</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-foreground mt-2">4 of 4</p>
            <p className="text-xs text-muted-foreground mt-1">Sleep & screen rules honored</p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Risk Status</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">Low Risk</p>
            <p className="text-xs text-muted-foreground mt-1">No emergency distress alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Vitality & Mood Pulse Visualizer */}
      <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> 7-Day Consented Vitality & Mood Trend
            </CardTitle>
            <CardDescription>
              Aggregated daily emotional score shared by Sam (1 = Low Energy, 5 = Peak Vitality).
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs gap-1 font-mono">
            <Activity className="h-3 w-3 text-emerald-500" /> Average: 4.1 / 5
          </Badge>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 text-center">
            {weeklyPulse.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors">
                <span className="text-[11px] font-medium text-muted-foreground">{item.day}</span>
                <div className="w-full bg-muted rounded-full h-24 relative flex items-end justify-center p-1">
                  <div
                    style={{ height: `${(item.score / 5) * 100}%` }}
                    className={`w-full rounded-xl transition-all duration-500 ${
                      item.score >= 4
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                        : item.score === 3
                        ? "bg-gradient-to-t from-amber-600 to-amber-400"
                        : "bg-gradient-to-t from-rose-600 to-rose-400"
                    }`}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-sm text-foreground">{item.score}/5</span>
                  <span className="text-[10px] text-muted-foreground">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Interaction Split */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Send Encouragement & History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" /> Send Quiet Encouragement
              </CardTitle>
              <CardDescription>
                A gentle note waiting in Sam's dashboard can change the tone of a hard afternoon.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Delivery Mode Selector */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-border/50">
                <button
                  type="button"
                  onClick={() => setNoteType("feed")}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    noteType === "feed"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Practice Feed Note
                </button>
                <button
                  type="button"
                  onClick={() => setNoteType("urge")}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    noteType === "urge"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Urge Wave Support
                </button>
                <button
                  type="button"
                  onClick={() => setNoteType("quiet")}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    noteType === "quiet"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Quiet Reflection Card
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setEncouragementNote(prompt)}
                    className="text-xs rounded-full border border-border/70 bg-muted/40 hover:bg-muted px-3 py-1.5 text-left transition-colors"
                  >
                    "{prompt.slice(0, 36)}..."
                  </button>
                ))}
              </div>

              <Textarea
                value={encouragementNote}
                onChange={(e) => setEncouragementNote(e.target.value)}
                placeholder="Write a warm, non-judgmental note of support..."
                className="min-h-28 rounded-2xl"
              />

              <div className="flex flex-wrap justify-between items-center gap-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Delivered straight to Sam's active workspace view.
                </span>
                <Button
                  onClick={() => handleSendEncouragement()}
                  disabled={isSending || !encouragementNote.trim()}
                  className="rounded-full gap-2"
                >
                  <Send className="h-4 w-4" /> {isSending ? "Delivering..." : "Send Encouragement"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Past Notes */}
          <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="font-serif text-xl">Recent Notes Sent</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {historyNotes.length} Notes Delivered
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {historyNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground flex items-center gap-1.5">
                      <HeartHandshake className="h-3.5 w-3.5 text-primary" /> From Sarah Miller
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] py-0 px-2">
                        {note.type}
                      </Badge>
                      <span>{note.date}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed text-foreground/90">{note.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Supporter Resources, Consent Scope & Safety Plan */}
        <div className="space-y-6">
          {/* Consented Scope Matrix */}
          <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" /> Consented Data Permissions
              </CardTitle>
              <CardDescription className="text-xs">
                Permissions explicitly granted by Sam Bennett.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between">
                <span>Daily Check-In Status</span>
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px]">
                  Shared
                </Badge>
              </div>
              <div className="p-2.5 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between">
                <span>Boundary Agreement Status</span>
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px]">
                  Shared
                </Badge>
              </div>
              <div className="p-2.5 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between">
                <span>Emergency Distress Alert</span>
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px]">
                  Active
                </Badge>
              </div>
              <div className="p-2.5 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between opacity-75">
                <span>Raw Journal & Personal Reflections</span>
                <Badge variant="outline" className="text-muted-foreground text-[10px]">
                  Private
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-primary" /> Consented Safety Plan
              </CardTitle>
              <CardDescription>
                Agreed protocol if Sam signals crisis or strong relapse pressure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-foreground">
                <strong className="block text-amber-800 dark:text-amber-300 font-semibold mb-1">
                  Step 1: 15-Minute Pause
                </strong>
                Call Sam directly; invite them to step outside for 5 deep breaths without interrogating.
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <strong className="block font-semibold mb-1">Step 2: Backup Contact</strong>
                Dr. Marcus Vance (Clinical Guide): Available via secure clinic triage.
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <strong className="block font-semibold mb-1">Step 3: National 24/7 Helpline</strong>
                SAMHSA Helpline: 1-800-662-4357 (Free, confidential 24/7).
              </div>
            </CardContent>
          </Card>

          <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Supporter Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <a
                href="#guide-boundaries"
                className="block p-3 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold block text-foreground">Loving Without Managing</span>
                <span className="text-muted-foreground">How to hold boundaries without policing your partner's sobriety.</span>
              </a>
              <a
                href="#guide-nervous-system"
                className="block p-3 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold block text-foreground">Recognizing Subtle Triggers</span>
                <span className="text-muted-foreground">Notice when fatigue and isolation signal vulnerability.</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
