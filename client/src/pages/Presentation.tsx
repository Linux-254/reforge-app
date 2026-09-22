import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandLogoIcon } from "@/components/BrandLogo";
import { InteractiveTourGuide } from "@/components/InteractiveTourGuide";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  CheckCircle2,
  Users,
  ShieldCheck,
  HeartHandshake,
  HeartPulse,
  BookOpen,
  Sliders,
  Calendar,
  Lock,
  Eye,
  Sparkles,
  Flame,
  FileText,
  Activity,
  Award,
  Music,
  MessageSquare,
  Newspaper,
  Settings,
  Layers,
  ChevronRight,
  Monitor,
  UserCheck,
  Check,
  AlertTriangle,
  Leaf,
  Printer,
  Play,
  RotateCcw,
  Maximize2,
  LayoutGrid,
} from "lucide-react";

interface StepDetail {
  id: string;
  stepNumber: number;
  phase: "Public Onboarding" | "Member Journey" | "Supporter Portal" | "Coach Supervision" | "Admin Operations";
  title: string;
  subtitle: string;
  route: string;
  roleRequired: string;
  targetAudience: string;
  keyFeatures: string[];
  sequenceEvents: string[];
  mockupDescription: string;
  mockupComponent: React.ReactNode;
}

export default function PresentationPage() {
  const [, setLocation] = useLocation();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [isGridMode, setIsGridMode] = useState(false);

  // All 22 Steps for Complete Screen Coverage
  const PRESENTATION_STEPS: StepDetail[] = [
    {
      id: "public-landing",
      stepNumber: 1,
      phase: "Public Onboarding",
      title: "1. Public Discovery & Landing Page",
      subtitle: "The primary entry portal establishing trust, philosophy, and immediate engagement.",
      route: "/",
      roleRequired: "Visitor / Any",
      targetAudience: "New visitors, prospective members, family supporters, and clinical partners",
      keyFeatures: [
        "Hero value proposition introducing the 21-Dimension recovery architecture",
        "Interactive 21 Dimensions preview cards with category filters",
        "Instant 'Try Live Demo' action trigger bypassing registration hurdles",
        "Supporter & Family Care invitation banner",
        "Top Demo Sandbox bar for immediate role switching",
      ],
      sequenceEvents: [
        "Visitor arrives at root URL (/)",
        "Examines core mission and 21 Dimensions of holistic wellness",
        "Uses top Demo Role Bar to test Member, Supporter, Coach, or Admin views",
        "Clicks 'Get Started' to enter Guided Onboarding",
      ],
      mockupDescription: "Hero Header, 21-Dimension Filter Cards, Demo Role Switcher",
      mockupComponent: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
              <Sparkles className="h-3 w-3" /> 21-Dimension Recovery Framework
            </div>
            <h3 className="font-serif font-bold text-lg text-emerald-100">REFORGE: Holistic Recovery Re-imagined</h3>
            <p className="text-xs text-emerald-200/80 max-w-md mx-auto">A multi-role ecosystem uniting daily self-care, family supporters, and clinical coaching.</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Physical Sobriety", "Emotional Regulation", "Relational Boundaries", "Mindful Presence", "Purpose & Spirit", "Sleep & Vitals"].map((dim, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-background/80 border border-border text-[10px] space-y-1">
                <span className="font-bold text-primary block truncate">{dim}</span>
                <span className="text-[9px] text-muted-foreground block">Daily practices & check-ins</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "onboarding",
      stepNumber: 2,
      phase: "Public Onboarding",
      title: "2. Guided Onboarding & Baseline Survey",
      subtitle: "A thoughtful 4-step intake establishing baseline scores and initial boundary rules.",
      route: "/onboarding",
      roleRequired: "Member / New User",
      targetAudience: "Newly registered members initiating their recovery journey",
      keyFeatures: [
        "Multi-step progress indicator (Personal Focus → Baseline Ratings → Starter Rules → Confirmation)",
        "Interactive slider scales (1–10) for key recovery dimensions",
        "Instant selection of starter Boundary Rules (e.g., 'No Late Night Triggers')",
        "Automated calculation of initial Vitality Score",
      ],
      sequenceEvents: [
        "Member initiates onboarding flow",
        "Selects primary focus areas (e.g., Physical Sobriety, Sleep)",
        "Rates current state across 5 core dimensions to set baseline benchmark",
        "Selects starter boundary rules and submits intake",
      ],
      mockupDescription: "Progress Stepper, Dimension Rating Sliders, Boundary Selector",
      mockupComponent: (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-primary border-b pb-2">
            <span>Step 2 of 4: Baseline Rating</span>
            <span>Vitality Calculation: 72%</span>
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]"><span>Emotional Regulation</span><span className="font-bold text-primary">7/10</span></div>
              <div className="h-2 rounded-full bg-primary/20"><div className="h-2 rounded-full bg-primary w-[70%]" /></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]"><span>Sleep & Physical Energy</span><span className="font-bold text-primary">8/10</span></div>
              <div className="h-2 rounded-full bg-primary/20"><div className="h-2 rounded-full bg-primary w-[80%]" /></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "member-dashboard",
      stepNumber: 3,
      phase: "Member Journey",
      title: "3. Member Recovery Dashboard",
      subtitle: "The daily command center for tracking vitality, active rules, check-ins, and supporter pulse.",
      route: "/dashboard",
      roleRequired: "Member Role",
      targetAudience: "Active recovery members conducting daily practice",
      keyFeatures: [
        "Vitality Score Gauge (0-100) with visual status indicator",
        "Streak Counter tracking continuous days of mindful practice",
        "Quick Check-In Banner trigger with mood energy selectors",
        "Active Boundary Rules summary card with status switches",
        "Supporter Link status panel showing active connections and consent level",
      ],
      sequenceEvents: [
        "Member logs in or switches to 'Member' role via Demo Bar",
        "Reviews today's Vitality Score and active streak count",
        "Clicks 'Complete Daily Check-In' to log reflection",
        "Monitors active boundary rules and supporter pulse status",
      ],
      mockupDescription: "Vitality Gauge Wheel, Streak Badge, Active Boundaries Card",
      mockupComponent: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center">
              <span className="text-[10px] text-amber-200/80 block">Vitality Score</span>
              <span className="font-serif font-bold text-2xl text-amber-300">84</span>
              <span className="text-[9px] text-emerald-400 block">+4% from last week</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-emerald-200/80 block">Mindful Streak</span>
              <span className="font-serif font-bold text-2xl text-emerald-300">18 Days</span>
              <span className="text-[9px] text-emerald-400 block">Personal Best!</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-background/80 border text-[10px] flex items-center justify-between">
            <span className="font-semibold text-foreground">Active Rules: 5 Enforced</span>
            <Badge variant="outline" className="text-[9px]">Supporter Synced</Badge>
          </div>
        </div>
      ),
    },
    {
      id: "daily-checkin",
      stepNumber: 4,
      phase: "Member Journey",
      title: "4. Daily Check-In & Mood Evaluation",
      subtitle: "A frictionless 60-second reflection logging emotional, physical, and mental states.",
      route: "/check-ins",
      roleRequired: "Member Role",
      targetAudience: "Members completing morning/evening micro-evaluations",
      keyFeatures: [
        "5-Point Mood Scale (Restorative, Grounded, Steady, Vulnerable, Struggling)",
        "Physical Energy & Emotional Clarity sliders (1-10)",
        "Triggers & Wins tags selection (e.g., 'Good Sleep', 'Stressful Call')",
        "Freeform Journal Reflection textarea",
        "Instant Vitality Score update upon submission",
      ],
      sequenceEvents: [
        "Member navigates to /check-ins or clicks check-in button",
        "Selects primary emotional state from styled emoji icon options",
        "Adjusts energy and clarity sliders",
        "Taps relevant win/trigger tags and submits reflection",
      ],
      mockupDescription: "5-Button Emoji Mood Selector, Dual Energy Sliders, Reflection Box",
      mockupComponent: (
        <div className="space-y-3">
          <div className="text-[10px] font-semibold text-center text-muted-foreground">Select Current Emotional State:</div>
          <div className="flex justify-between gap-1">
            {["🌟 Restorative", "🌿 Grounded", "⚖️ Steady", "⚡ Vulnerable", "🌧️ Struggling"].map((m, i) => (
              <div key={i} className={`p-1.5 rounded-lg border text-[9px] text-center font-medium ${i === 1 ? "bg-primary text-primary-foreground border-primary" : "bg-background"}`}>
                {m}
              </div>
            ))}
          </div>
          <div className="p-2 rounded-lg bg-muted/40 border space-y-1">
            <span className="text-[9px] font-semibold text-foreground">Physical Energy: 8/10</span>
            <div className="h-1.5 rounded-full bg-primary/20"><div className="h-1.5 rounded-full bg-primary w-[80%]" /></div>
          </div>
        </div>
      ),
    },
    {
      id: "checkin-history",
      stepNumber: 5,
      phase: "Member Journey",
      title: "5. Check-In History & Mood Pulse Trends",
      subtitle: "Visualizing emotional trends, mood heatmaps, and past journal logs over time.",
      route: "/check-in-history",
      roleRequired: "Member / Coach",
      targetAudience: "Members reviewing growth trends and coaches analyzing client consistency",
      keyFeatures: [
        "7-Day & 30-Day Mood Trend Bar Chart",
        "Calendar Heatmap showing check-in completion density",
        "Chronological list of past check-in entries with mood badges and notes",
      ],
      sequenceEvents: [
        "Member clicks 'Check-In History' from navigation menu",
        "Observes weekly volatility vs. steadiness trends on interactive chart",
        "Clicks a specific calendar date to view details of that day's log",
      ],
      mockupDescription: "Visual Bar Chart of Mood Ratings, Interactive Calendar Grid, Entry Cards List",
      mockupComponent: (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs space-y-2">
            <span className="font-semibold text-blue-200 text-[11px] block">7-Day Mood Pulse Trend</span>
            <div className="flex items-end gap-1.5 h-16 pt-2">
              {[60, 75, 80, 70, 85, 90, 88].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/30 rounded-t hover:bg-primary transition-colors flex items-end justify-center text-[8px] text-white pb-1" style={{ height: `${h}%` }}>
                  {h}%
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "boundary-rules",
      stepNumber: 6,
      phase: "Member Journey",
      title: "6. Personal Boundary Rules & Presets Engine",
      subtitle: "Empowering members to define, toggle, and enforce behavioral protective rules.",
      route: "/rules",
      roleRequired: "Member Role",
      targetAudience: "Members setting healthy boundaries in daily life",
      keyFeatures: [
        "20+ Pre-populated Boundary Rules categorized by triggers (e.g., Evening Quiet, Social Environments)",
        "One-click Active / Paused status toggle",
        "Custom Rule Creator modal with title, guidance, category, and priority level",
        "Supporter Visibility badge indicating if rule is shared with trusted supporters",
      ],
      sequenceEvents: [
        "Member navigates to /rules",
        "Browses recommended rules or searches by keyword",
        "Toggles rules ON or OFF depending on current needs",
        "Adds custom rules with personalized guidance notes",
      ],
      mockupDescription: "Rule Cards Grid with Switch Toggles, Category Chips, Custom Rule Dialog",
      mockupComponent: (
        <div className="space-y-2">
          {[
            { title: "No Phone After 9 PM", cat: "Evening Quiet", status: "Active" },
            { title: "Dry Dinners Only", cat: "Social Triggers", status: "Active" },
            { title: "30 Min Morning Walk", cat: "Somatic Rest", status: "Paused" },
          ].map((r, i) => (
            <div key={i} className="p-2 rounded-lg bg-background border flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-foreground block">{r.title}</span>
                <span className="text-[9px] text-muted-foreground">{r.cat}</span>
              </div>
              <Badge variant={r.status === "Active" ? "default" : "outline"} className="text-[8px] rounded-full">
                {r.status}
              </Badge>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "goals",
      stepNumber: 7,
      phase: "Member Journey",
      title: "7. Goals & Sobriety Milestones",
      subtitle: "Short-term and long-term milestone tracking.",
      route: "/goals",
      roleRequired: "Member Role",
      targetAudience: "Members celebrating recovery milestones",
      keyFeatures: [
        "Short-term and long-term milestone progress meters",
        "Celebration triggers for key milestones (30 Days, 60 Days, 1 Year)",
        "Goal creation modal with target dates and category tags",
      ],
      sequenceEvents: [
        "Member opens Goals page",
        "Creates a new milestone goal (e.g., 'Complete 30 Days Clean')",
        "Marks progress and celebrates completed goals",
      ],
      mockupDescription: "Milestone Cards, Progress Percentage Bars",
      mockupComponent: (
        <div className="space-y-2">
          <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs space-y-1.5">
            <div className="flex justify-between text-[10px]"><span className="font-bold text-purple-200">30 Days Mindful Practice</span><span className="text-purple-300">18 / 30 Days (60%)</span></div>
            <div className="h-2 rounded-full bg-purple-950"><div className="h-2 rounded-full bg-purple-500 w-[60%]" /></div>
          </div>
        </div>
      ),
    },
    {
      id: "journal",
      stepNumber: 8,
      phase: "Member Journey",
      title: "8. Reflective Journal Workspace",
      subtitle: "Private markdown notes with privacy scope settings.",
      route: "/journal",
      roleRequired: "Member Role",
      targetAudience: "Members engaging in reflective writing",
      keyFeatures: [
        "Markdown editor supporting headers, bullet lists, and quotes",
        "Privacy Scope Toggles (Private vs. Shared with Supporter)",
        "Tag categorization (e.g., Gratitude, Vulnerability, Somatic)",
      ],
      sequenceEvents: [
        "Member opens Journal workspace",
        "Drafts a new entry with markdown formatting",
        "Sets privacy scope to Private or Supporter-Visible",
      ],
      mockupDescription: "Markdown Editor View, Entry Cards with Privacy Badges",
      mockupComponent: (
        <div className="p-3 rounded-xl bg-background border space-y-2 text-xs">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-foreground">Morning Gratitude Reflection</span>
            <Badge variant="secondary" className="text-[8px]">Private</Badge>
          </div>
          <p className="text-[10px] text-muted-foreground italic">"Today I feel grounded after morning meditation. The boundary rule helped me sleep deeply..."</p>
        </div>
      ),
    },
    {
      id: "music",
      stepNumber: 9,
      phase: "Member Journey",
      title: "9. Ambient Soundscapes & Audio Synth",
      subtitle: "Binaural sound generators for focus and restful sleep.",
      route: "/music",
      roleRequired: "Member Role",
      targetAudience: "Members needing calming audio during triggers or rest",
      keyFeatures: [
        "Interactive audio player producing ambient soundscapes",
        "Focus, Sleep, and Stress-Relief frequency tracks",
        "Visual wave animation matching audio rhythm",
      ],
      sequenceEvents: [
        "Member accesses Music page during a stressful moment",
        "Selects an ambient soundscape track (e.g., 'Forest Rain & Delta Tones')",
        "Plays track to assist relaxation or meditation",
      ],
      mockupDescription: "Interactive Audio Player Controls, Waveforms",
      mockupComponent: (
        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-center space-y-2">
          <span className="font-bold text-xs text-indigo-200 block">Delta Sleep & Forest Stream</span>
          <div className="flex justify-center items-center gap-2">
            <Button size="sm" className="rounded-full h-8 w-8 p-0"><Play className="h-4 w-4" /></Button>
            <div className="h-1 flex-1 bg-indigo-900 rounded-full"><div className="h-1 bg-indigo-400 rounded-full w-[45%]" /></div>
          </div>
        </div>
      ),
    },
    {
      id: "guides",
      stepNumber: 10,
      phase: "Member Journey",
      title: "10. Restorative Guides & Coping Strategies",
      subtitle: "Situational guides for high-stress moments.",
      route: "/guides",
      roleRequired: "Member Role",
      targetAudience: "Members encountering triggers or seeking structured coping steps",
      keyFeatures: [
        "Categorized library of actionable coping strategies",
        "Estimated read times and step-by-step instructions",
        "Category filters (Somatic, Mindful, Relationships, In the Moment)",
      ],
      sequenceEvents: [
        "Member encounters a trigger and opens Guides library",
        "Filters by 'In the Moment' category",
        "Reads a guide (e.g., 'De-escalating Sudden Urges') and executes steps",
      ],
      mockupDescription: "Guide Grid Cards with Category Chips and Read Times",
      mockupComponent: (
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded-lg bg-background border space-y-1">
            <Badge variant="outline" className="text-[8px]">In the moment</Badge>
            <span className="font-bold text-foreground block truncate">4-7-8 Somatic Breathing</span>
            <span className="text-[9px] text-muted-foreground block">3 min read</span>
          </div>
          <div className="p-2 rounded-lg bg-background border space-y-1">
            <Badge variant="outline" className="text-[8px]">Relationships</Badge>
            <span className="font-bold text-foreground block truncate">Communicating Limits</span>
            <span className="text-[9px] text-muted-foreground block">5 min read</span>
          </div>
        </div>
      ),
    },
    {
      id: "community",
      stepNumber: 11,
      phase: "Member Journey",
      title: "11. Community Reflections Forum",
      subtitle: "Moderated peer support and encouragement.",
      route: "/community",
      roleRequired: "Member Role",
      targetAudience: "Members seeking peer connection and mutual support",
      keyFeatures: [
        "Moderated discussion threads categorized by recovery topics",
        "Encouragement likes and reply interactions",
        "Pinned featured posts from program leaders",
      ],
      sequenceEvents: [
        "Member opens Community Reflections forum",
        "Reads peer encouraging posts or shares a daily victory",
        "Leaves an encouraging comment or like for a fellow member",
      ],
      mockupDescription: "Discussion Thread Feed, Reply Form",
      mockupComponent: (
        <div className="p-3 rounded-xl bg-background border space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="font-bold text-foreground">Sarah M.</span>
            <span className="text-muted-foreground">· 2h ago</span>
          </div>
          <p className="text-[10px] text-muted-foreground">"Celebrated 60 days clean today! Grateful for the daily check-ins."</p>
          <div className="flex gap-3 text-[9px] text-primary pt-1 font-semibold">
            <span>❤️ 14 Likes</span>
            <span>💬 5 Replies</span>
          </div>
        </div>
      ),
    },
    {
      id: "newsletter",
      stepNumber: 12,
      phase: "Member Journey",
      title: "12. Editorial Restorative Newsletter",
      subtitle: "Weekly essays and deep recovery insights.",
      route: "/newsletter",
      roleRequired: "Member Role",
      targetAudience: "Members reading weekly program essays",
      keyFeatures: [
        "Weekly published restorative essays by recovery leaders",
        "Article archive catalog with category tags",
        "Markdown formatting for easy reading",
      ],
      sequenceEvents: [
        "Member opens Newsletter page from navigation menu",
        "Selects latest weekly edition (e.g., 'The Neurobiology of Boundaries')",
        "Reads essay and saves insights",
      ],
      mockupDescription: "Article Catalog with Reading Layout",
      mockupComponent: (
        <div className="p-3 rounded-xl bg-background border space-y-1 text-xs">
          <Badge variant="outline" className="text-[8px]">Weekly Restorative Edition</Badge>
          <h4 className="font-serif font-bold text-sm text-foreground">Understanding Emotional Triggers</h4>
          <p className="text-[10px] text-muted-foreground line-clamp-2">How neural pathways reshape during continuous mindful practice...</p>
        </div>
      ),
    },
    {
      id: "supporter-portal",
      stepNumber: 13,
      phase: "Supporter Portal",
      title: "13. Supporter & Advocate Portal (Consented Care)",
      subtitle: "A non-intrusive window for family & friends to monitor member health with full privacy consent.",
      route: "/supporters",
      roleRequired: "Supporter Role (Switch via Demo Bar)",
      targetAudience: "Spouses, family members, sponsors, and close supporters",
      keyFeatures: [
        "7-Day Vitality & Mood Pulse Visualizer (shows wellness trend without exposing private text)",
        "Explicit Consent Scope Matrix (shows what member has consented to share)",
        "Active Boundary Rules Monitor (displays member's boundaries so supporters can respect them)",
        "Educational Supporter Guides ('Loving Without Managing')",
      ],
      sequenceEvents: [
        "Supporter switches to 'Supporter' role via top Demo Role Bar",
        "Navigates to Supporter Dashboard (/supporters)",
        "Views member's 7-day mood pulse graph to verify steadiness without intruding on privacy",
        "Checks active boundary rules to support member commitments",
      ],
      mockupDescription: "7-Day Pulse Wave Chart, Consent Badges, Active Boundaries List",
      mockupComponent: (
        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2 text-xs">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-rose-200">Consented Pulse: Alex M.</span>
            <Badge variant="default" className="text-[8px]">Full Consented Access</Badge>
          </div>
          <div className="p-2 rounded bg-background/60 text-[9px] space-y-1">
            <span className="font-semibold text-foreground block">Active Boundaries to Respect:</span>
            <span className="text-muted-foreground block">· Evening Quiet Time after 9 PM</span>
            <span className="text-muted-foreground block">· Dry Dinners Only</span>
          </div>
        </div>
      ),
    },
    {
      id: "coach-supervision",
      stepNumber: 14,
      phase: "Coach Supervision",
      title: "14. Professional Coach & Supervision Roster",
      subtitle: "Clinical roster overview and guidance management for assigned recovery coaches.",
      route: "/dashboard (Coach View)",
      roleRequired: "Coach Role (Switch via Demo Bar)",
      targetAudience: "Certified recovery coaches, therapists, and case managers",
      keyFeatures: [
        "Assigned Cohort Member Roster with recent check-in timestamps and risk levels",
        "One-click access to member's public check-in history and dimension scores",
        "Ability to assign custom boundary rules or suggest restorative guides",
      ],
      sequenceEvents: [
        "Coach switches to 'Coach' role via top Demo Role Bar",
        "Reviews client roster and identifies members with recent low vitality scores",
        "Opens client profile to review dimension scores and recommend boundary rules",
      ],
      mockupDescription: "Client Roster Table, Vitality Trend Badges",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2 text-xs">
          <div className="flex justify-between text-[10px] font-bold text-indigo-200">
            <span>Assigned Client: Marcus K.</span>
            <Badge variant="secondary" className="text-[8px] bg-emerald-500/20 text-emerald-300">Vitality: 88%</Badge>
          </div>
          <span className="text-[9px] text-indigo-300/80 block">Last Check-in: Today at 8:30 AM · Streak: 18 Days</span>
        </div>
      ),
    },
    {
      id: "admin-dimensions",
      stepNumber: 15,
      phase: "Admin Operations",
      title: "15. Admin Tab 1: 21 Core Dimensions Management",
      subtitle: "Full CRUD control over recovery dimensions.",
      route: "/admin?tab=dimensions",
      roleRequired: "Admin Role",
      targetAudience: "System administrators and program directors",
      keyFeatures: [
        "Add, Edit, Category-Filter, or Delete the 21 Core Recovery Dimensions",
        "Custom daily prompt editor for each dimension",
        "Aspect tags management for structured intake",
      ],
      sequenceEvents: [
        "Admin opens /admin and selects 'Dimensions' tab",
        "Clicks 'Add New Dimension' or edits existing dimension card",
        "Updates daily prompts and category tags",
      ],
      mockupDescription: "Dimension Table Cards with Edit/Delete Controls",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2 text-xs">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-white">Dimension: Somatic Awareness</span>
            <div className="flex gap-1"><Badge variant="outline" className="text-[8px]">Body</Badge><Badge variant="default" className="text-[8px]">Active</Badge></div>
          </div>
          <span className="text-[9px] text-slate-400 block">Daily Prompt: "How rested and connected to your body do you feel today?"</span>
        </div>
      ),
    },
    {
      id: "admin-guides",
      stepNumber: 16,
      phase: "Admin Operations",
      title: "16. Admin Tab 2: Restorative Guides Manager",
      subtitle: "Managing situational coping strategies.",
      route: "/admin?tab=guides",
      roleRequired: "Admin Role",
      targetAudience: "System administrators creating content",
      keyFeatures: [
        "Create, edit, search, and manage situational coping guides",
        "Markdown editor for guide body text",
        "Category and read-time controls",
      ],
      sequenceEvents: [
        "Admin selects 'Restorative Guides' tab",
        "Clicks 'Create Guide' and drafts body markdown text",
        "Publishes guide to member library",
      ],
      mockupDescription: "Guide Management Table with Creation Dialog",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5 text-xs">
          <div className="flex justify-between text-[10px] font-bold text-white">
            <span>Guide: De-escalating Sudden Urges</span>
            <Badge variant="secondary" className="text-[8px]">Published</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Category: In the Moment · Read Time: 4 min</span>
        </div>
      ),
    },
    {
      id: "admin-rules",
      stepNumber: 17,
      phase: "Admin Operations",
      title: "17. Admin Tab 3: Boundary Rules Engine",
      subtitle: "Managing system-wide boundary presets.",
      route: "/admin?tab=rules",
      roleRequired: "Admin Role",
      targetAudience: "System administrators setting rule defaults",
      keyFeatures: [
        "Manage system-wide boundary presets available during onboarding",
        "Severity level ratings (Essential, Recommended, Aspirational)",
        "Guidance text formatting",
      ],
      sequenceEvents: [
        "Admin opens 'Boundary Rules' tab",
        "Creates a new preset rule or updates guidance text",
      ],
      mockupDescription: "Preset Rules Roster with Category Switches",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5 text-xs">
          <div className="flex justify-between text-[10px] font-bold text-white">
            <span>Preset: No Late Night Trigger Calls</span>
            <Badge variant="outline" className="text-[8px]">Essential</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Guidance: "Turn phone to Do Not Disturb starting at 9 PM."</span>
        </div>
      ),
    },
    {
      id: "admin-community",
      stepNumber: 18,
      phase: "Admin Operations",
      title: "18. Admin Tab 4: Community Moderation",
      subtitle: "Moderating discussions and pinning top posts.",
      route: "/admin?tab=community",
      roleRequired: "Admin Role",
      targetAudience: "Community managers and moderators",
      keyFeatures: [
        "Pin featured threads to the top of community feeds",
        "Review flagged discussions and enforce safety guidelines",
        "Delete inappropriate messages",
      ],
      sequenceEvents: [
        "Admin opens 'Community' moderation tab",
        "Reviews flagged posts and toggles 'Pin' on community announcements",
      ],
      mockupDescription: "Moderation Queue with Pin/Delete Triggers",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5 text-xs">
          <div className="flex justify-between text-[10px] font-bold text-white">
            <span>Post: "Celebrating 60 Days Clean!"</span>
            <Badge variant="default" className="text-[8px] bg-amber-500">Pinned</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Author: Sarah M. · Likes: 14</span>
        </div>
      ),
    },
    {
      id: "admin-users",
      stepNumber: 19,
      phase: "Admin Operations",
      title: "19. Admin Tab 5: User Accounts & Role Governance",
      subtitle: "User roster management and instant role assignment.",
      route: "/admin?tab=users",
      roleRequired: "Admin Role",
      targetAudience: "Platform administrators managing accounts",
      keyFeatures: [
        "Real-time user account roster table",
        "Instant role switching (Admin, Member, Supporter, Coach)",
        "Cohort assignments and account status updates",
      ],
      sequenceEvents: [
        "Admin opens 'User Accounts' tab",
        "Changes a user's role or updates cohort assignment",
      ],
      mockupDescription: "User Account Table with Role Dropdown Switches",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5 text-xs">
          <div className="flex justify-between text-[10px] font-bold text-white">
            <span>User: Alex Morgan (alex@reforge.app)</span>
            <Badge variant="outline" className="text-[8px] text-primary border-primary">Role: Member</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Cohort: Cohort 16 · Status: Active</span>
        </div>
      ),
    },
    {
      id: "admin-supporters",
      stepNumber: 20,
      phase: "Admin Operations",
      title: "20. Admin Tab 6: Supporter Links Governance",
      subtitle: "Pairing supporters, members, and configuring consent scopes.",
      route: "/admin?tab=supporters",
      roleRequired: "Admin Role",
      targetAudience: "Program directors managing supporter connections",
      keyFeatures: [
        "Issue new Supporter-Member connection links",
        "Configure Consent Scope levels (Dashboard, Rules, Alerts, Journal)",
        "Pause, Reactivate, or Revoke connection links",
      ],
      sequenceEvents: [
        "Admin opens 'Supporter Links' tab",
        "Clicks 'Issue Supporter Link' dialog",
        "Sets supporter & member details, configures consent scope, and saves pairing",
      ],
      mockupDescription: "Supporter Pairing Cards with Consent Scope Matrices",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2 text-xs">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-rose-300">Supporter: David M. ↔ Member: Alex M.</span>
            <Badge variant="default" className="text-[8px] bg-emerald-600">Active</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Scope: Full Consented Access · Linked: 2026-09-01</span>
        </div>
      ),
    },
    {
      id: "admin-newsletter",
      stepNumber: 21,
      phase: "Admin Operations",
      title: "21. Admin Tab 7: Editorial Newsletter Publisher",
      subtitle: "Publishing weekly restorative editions.",
      route: "/admin?tab=newsletter",
      roleRequired: "Admin Role",
      targetAudience: "Editorial directors publishing essays",
      keyFeatures: [
        "Draft and publish weekly restorative newsletter editions",
        "Markdown editor for rich formatting",
        "Edition catalog archive",
      ],
      sequenceEvents: [
        "Admin opens 'Newsletter' tab",
        "Drafts edition title and body text",
        "Clicks 'Publish Edition' to deliver to member library",
      ],
      mockupDescription: "Newsletter Draft Form & Article Preview",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5 text-xs">
          <div className="flex justify-between text-[10px] font-bold text-white">
            <span>Edition: "The Neurobiology of Boundaries"</span>
            <Badge variant="secondary" className="text-[8px]">Published</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Published Date: Today · Category: Weekly Restorative</span>
        </div>
      ),
    },
    {
      id: "admin-logs",
      stepNumber: 22,
      phase: "Admin Operations",
      title: "22. Admin Tab 8: Audit Logs & Demo Reset",
      subtitle: "Accountability trail and factory reset controls.",
      route: "/admin?tab=logs",
      roleRequired: "Admin Role",
      targetAudience: "System administrators and security auditors",
      keyFeatures: [
        "Immutable audit event log trail tracking administrative actions",
        "Severity level badges (Info, Warning, Success)",
        "One-click 'Reset All Demo Data' trigger to restore initial state",
      ],
      sequenceEvents: [
        "Admin opens 'Audit Logs' tab to inspect system events",
        "Uses 'Reset All Demo Data' whenever preparing a fresh client presentation",
      ],
      mockupDescription: "Audit Event Trail List with Factory Reset Button",
      mockupComponent: (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2 text-xs">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-emerald-400">[Audit Event] Created Supporter Pairing Link</span>
            <Badge variant="outline" className="text-[8px]">Success</Badge>
          </div>
          <span className="text-[9px] text-slate-400 block">Timestamp: Just now · Actor: Admin User</span>
        </div>
      ),
    },
  ];

  const currentStep = PRESENTATION_STEPS[activeStepIndex];

  const handleNext = () => {
    if (activeStepIndex < PRESENTATION_STEPS.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredSteps = selectedPhase === "all"
    ? PRESENTATION_STEPS
    : PRESENTATION_STEPS.filter((s) => s.phase === selectedPhase);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans print:bg-white print:text-black">
      <InteractiveTourGuide />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 nature-glass border-b border-border/70 backdrop-blur-md px-4 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
              <BrandLogoIcon size={34} className="transition-transform duration-300 hover:scale-105" />
              <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                Re<span className="text-primary font-extrabold">Forge</span>
              </span>
            </Link>
            <Badge variant="outline" className="text-[10px] rounded-full uppercase font-bold text-primary border-primary/30">
              Interactive Slide Deck Presentation
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
            <a
              href="/api/presentation/download"
              download="ReForge_Client_Executive_Presentation.html"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all shrink-0"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Client Document (.html)
            </a>
            <a
              href="/ReForge_Executive_Client_Presentation.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border/80 bg-background hover:bg-muted text-foreground transition-all shrink-0"
            >
              <Eye className="h-3.5 w-3.5 text-primary" />
              Open Standalone Dossier
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsGridMode(!isGridMode)}
              className="rounded-full text-xs gap-1.5 shadow-sm shrink-0"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              {isGridMode ? "Single Slide View" : "All 22 Slides Grid"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="rounded-full text-xs gap-1.5 shadow-sm shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / PDF
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setLocation(currentStep.route)}
              className="rounded-full text-xs gap-1.5 shadow-sm shrink-0"
            >
              <Monitor className="h-3.5 w-3.5" />
              Launch Live
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-muted/40 border-b border-border/60 py-6 px-4 print:py-2">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
            Sequence of Events · Interactive Client Guide Deck
          </Badge>
          <h1 className="font-serif text-2xl md:text-3xl font-bold burnt-wood-heading">
            REFORGE Complete Platform Walkthrough Presentation
          </h1>
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Exhaustive step-by-step visual slide deck & tutorial covering every single page, dashboard, tab, feature, and operational tool in sequence of usage.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-2 pb-2 border-b border-border/50 print:hidden overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center py-1">
          <span className="text-xs font-semibold text-muted-foreground shrink-0 mr-1">Phase:</span>
          {["all", "Public Onboarding", "Member Journey", "Supporter Portal", "Coach Supervision", "Admin Operations"].map((phase) => (
            <Button
              key={phase}
              size="sm"
              variant={selectedPhase === phase ? "default" : "outline"}
              onClick={() => {
                setSelectedPhase(phase);
                if (phase !== "all") {
                  const idx = PRESENTATION_STEPS.findIndex((s) => s.phase === phase);
                  if (idx !== -1) setActiveStepIndex(idx);
                }
              }}
              className="rounded-full text-xs capitalize shrink-0 h-8"
            >
              {phase === "all" ? "All 22 Screens" : phase}
            </Button>
          ))}
        </div>

        {/* Slide Grid View vs Single Slide View Mode */}
        {isGridMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESENTATION_STEPS.map((step, idx) => (
              <Card key={step.id} className="nature-card border-border/80 hover:border-primary/50 transition-all">
                <CardHeader className="p-4 border-b pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[9px]">Slide {step.stepNumber}</Badge>
                    <Badge variant="secondary" className="text-[9px]">{step.roleRequired.split(" ")[0]}</Badge>
                  </div>
                  <CardTitle className="font-serif text-sm font-bold mt-1 line-clamp-1">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/60">
                    {step.mockupComponent}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{step.subtitle}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsGridMode(false);
                    }}
                    className="w-full rounded-full text-xs"
                  >
                    Inspect Full Slide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Single Interactive Slide Presentation Card */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left Column: Event Notes & User Action Sequence */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="nature-card border-border/80 bg-card/90 shadow-md">
                <CardHeader className="space-y-2 pb-4 border-b border-border/50">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary" className="rounded-full text-[10px] uppercase font-bold">
                      {currentStep.phase} · Slide {currentStep.stepNumber} of 22
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Role: <strong className="text-foreground">{currentStep.roleRequired}</strong></span>
                      <span>·</span>
                      <span>Route: <strong className="text-primary font-mono">{currentStep.route}</strong></span>
                    </div>
                  </div>
                  <CardTitle className="font-serif text-2xl burnt-wood-heading">
                    {currentStep.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {currentStep.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-6 text-xs">
                  {/* Target Audience */}
                  <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                    <span className="font-semibold text-foreground block mb-1">Target Persona:</span>
                    <p className="text-muted-foreground">{currentStep.targetAudience}</p>
                  </div>

                  {/* Sequence of Events Flow */}
                  <div className="space-y-3">
                    <h3 className="font-serif font-semibold text-sm text-foreground flex items-center gap-1.5">
                      <Compass className="h-4 w-4 text-primary" />
                      Sequence of User Actions & System Workflow:
                    </h3>
                    <div className="space-y-2 pl-2">
                      {currentStep.sequenceEvents.map((evt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-foreground/90 leading-relaxed pt-0.5">{evt}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features & Functional Highlights */}
                  <div className="space-y-3 pt-2 border-t border-border/50">
                    <h3 className="font-serif font-semibold text-sm text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Key Features & Operational Notes:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStep.keyFeatures.map((feat, i) => (
                        <div key={i} className="p-2.5 rounded-xl border border-border/50 bg-background/60 flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-muted-foreground leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Navigation Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/60 print:hidden">
                    <Button
                      variant="outline"
                      onClick={handlePrev}
                      disabled={activeStepIndex === 0}
                      className="rounded-full text-xs gap-1"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Previous Slide
                    </Button>

                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Slide {activeStepIndex + 1} of 22
                    </span>

                    <Button
                      variant="default"
                      onClick={handleNext}
                      disabled={activeStepIndex === PRESENTATION_STEPS.length - 1}
                      className="rounded-full text-xs gap-1"
                    >
                      Next Slide <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Visual UI Mockup Representation ("Screenshot") & Live Launcher */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="nature-card border-border/80 bg-card/90 shadow-md">
                <CardHeader className="pb-3 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-lg burnt-wood-heading flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-primary" />
                      UI Component Layout
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] rounded-full">
                      {currentStep.route}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Simulated Screen Mockup Card */}
                  <div className="p-5 rounded-2xl border border-primary/30 bg-card space-y-4 shadow-inner min-h-[260px]">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[10px] font-mono text-muted-foreground ml-2">reforge{currentStep.route}</span>
                      </div>
                      <Badge variant="secondary" className="text-[9px] rounded-full">
                        {currentStep.roleRequired}
                      </Badge>
                    </div>

                    {/* Interactive UI Mockup Component */}
                    <div className="pt-1">
                      {currentStep.mockupComponent}
                    </div>

                    <p className="text-[10px] text-muted-foreground italic border-t pt-2">
                      Visual Representation: {currentStep.mockupDescription}
                    </p>
                  </div>

                  {/* Launch Live Action */}
                  <div className="space-y-2 pt-2 print:hidden">
                    <Button
                      size="sm"
                      onClick={() => setLocation(currentStep.route)}
                      className="w-full rounded-full text-xs gap-1.5 shadow-sm"
                    >
                      Launch Live Interactive Screen <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Jump Index List */}
              <Card className="nature-card border-border/80 bg-card/90 print:hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-base font-semibold">22-Slide Quick Jump Index</CardTitle>
                </CardHeader>
                <CardContent className="p-3 max-h-60 overflow-y-auto space-y-1 text-xs">
                  {PRESENTATION_STEPS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors ${
                        idx === activeStepIndex
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <Badge variant="outline" className={`text-[9px] shrink-0 ${idx === activeStepIndex ? "border-white text-white" : ""}`}>
                        {s.roleRequired.split(" ")[0]}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-border/70 py-6 text-xs text-muted-foreground bg-card/60 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BrandLogoIcon size={24} />
            <span className="font-serif text-sm font-bold tracking-tight text-foreground">
              Re<span className="text-primary font-extrabold">Forge</span>
            </span>
            <span className="text-[11px] text-muted-foreground ml-1">· 21-Dimension Recovery Framework Presentation</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <Link href="/supporters" className="hover:text-foreground">Supporter Portal</Link>
            <Link href="/admin" className="hover:text-foreground">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
