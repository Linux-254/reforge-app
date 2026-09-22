import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemoSession, DemoRole } from "@/lib/demoSession";
import {
  Compass,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Monitor,
  User,
  HeartHandshake,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Maximize2,
} from "lucide-react";

export interface TourStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  route: string;
  role: DemoRole;
  targetArea: string;
  explanationNote: string;
  actionInstruction: string;
  keyHighlights: string[];
}

export const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    title: "Public Landing & 21-Dimension Philosophy",
    subtitle: "The entry portal introducing the holistic recovery architecture.",
    route: "/",
    role: "member",
    targetArea: "Home Hero & 21 Dimensions Grid",
    explanationNote: "This page establishes trust and showcases the 21 Core Dimensions of recovery (Physical, Emotional, Social, Spiritual). Visitors can explore categories or test live demo accounts immediately.",
    actionInstruction: "Explore the dimension cards or click 'Get Started' to test the intake survey.",
    keyHighlights: ["Hero value proposition", "Interactive 21-Dimension category filters", "Top Demo Sandbox bar"],
  },
  {
    stepNumber: 2,
    title: "Guided Member Onboarding Survey",
    subtitle: "A thoughtful 4-step intake establishing benchmark scores.",
    route: "/onboarding",
    role: "member",
    targetArea: "Onboarding Progress Stepper & Dimension Sliders",
    explanationNote: "New members complete a baseline assessment rating their current state (1–10) across key dimensions. This generates their initial Vitality Score and starter boundary rules.",
    actionInstruction: "Adjust the baseline sliders and select 2-3 starter boundary rules.",
    keyHighlights: ["Goal focus selection", "Interactive 1-10 dimension sliders", "Instant Vitality calculation"],
  },
  {
    stepNumber: 3,
    title: "Member Recovery Dashboard",
    subtitle: "The daily command center for tracking vitals & boundary rules.",
    route: "/dashboard",
    role: "member",
    targetArea: "Vitality Score Gauge & Streak Badge",
    explanationNote: "The dashboard centers on the Vitality Score Gauge (0–100), consecutive practice streak counter, quick check-in banner, and active boundary rules list.",
    actionInstruction: "Observe your Vitality Gauge and click 'Complete Daily Check-In'.",
    keyHighlights: ["Vitality Score Gauge", "Streak Counter Badge", "Active Boundary Rules Summary", "Supporter Pulse Status"],
  },
  {
    stepNumber: 4,
    title: "Daily Check-In & Mood Evaluation",
    subtitle: "A 60-second micro-evaluation logging emotional and physical states.",
    route: "/check-ins",
    role: "member",
    targetArea: "5-Point Mood Scale & Dual Energy Sliders",
    explanationNote: "Members log their mood (Restorative, Grounded, Steady, Vulnerable, Struggling), energy, clarity, and win/trigger tags. Submitting updates their Vitality Score immediately.",
    actionInstruction: "Select an emotional state icon, adjust energy sliders, and write an optional note.",
    keyHighlights: ["5 Emoji Mood Icons", "Physical & Emotional Sliders", "Trigger/Win Tags", "Freeform Journal Note"],
  },
  {
    stepNumber: 5,
    title: "Check-In History & Mood Pulse Trends",
    subtitle: "Longitudinal visual analytics of emotional growth.",
    route: "/check-in-history",
    role: "member",
    targetArea: "7-Day Mood Bar Chart & Calendar Heatmap",
    explanationNote: "Visualizes mood stability over 7-day and 30-day periods alongside a calendar completion heatmap and historical entry cards.",
    actionInstruction: "Inspect the bar chart trends and click past dates on the calendar.",
    keyHighlights: ["Mood Pulse Bar Chart", "Calendar Heatmap Grid", "Chronological Reflection Feed"],
  },
  {
    stepNumber: 6,
    title: "Personal Boundary Rules Engine",
    subtitle: "Defining and enforcing protective behavioral rules.",
    route: "/rules",
    role: "member",
    targetArea: "Boundary Presets Grid & Switch Toggles",
    explanationNote: "Members activate or pause 20+ preset rules (e.g., 'No Late Night Triggers', 'Dry Dinners') or create custom protective rules with guidance notes.",
    actionInstruction: "Toggle rules ON or OFF or click 'Add Custom Boundary Rule'.",
    keyHighlights: ["20+ Preset Boundary Rules", "Active/Paused Switches", "Custom Rule Creator Modal", "Supporter Visibility Badges"],
  },
  {
    stepNumber: 7,
    title: "Goals & Sobriety Milestones",
    subtitle: "Short-term and long-term milestone tracking.",
    route: "/goals",
    role: "member",
    targetArea: "Milestone Cards & Progress Bars",
    explanationNote: "Members set tangible recovery milestones (e.g., '30 Days Clean', 'Consistent Morning Meditation') and track completed achievements.",
    actionInstruction: "Click 'Add Milestone Goal' or mark a goal as completed.",
    keyHighlights: ["Short & Long Term Goals", "Progress Percentage Bars", "Milestone Celebrations"],
  },
  {
    stepNumber: 8,
    title: "Reflective Journal Workspace",
    subtitle: "Private markdown notes with privacy scope settings.",
    route: "/journal",
    role: "member",
    targetArea: "Markdown Editor & Entry Cards",
    explanationNote: "A calm workspace for freeform writing. Members can tag entries, apply markdown formatting, and set entries to Private or Shared with Supporters.",
    actionInstruction: "Draft a new entry or filter past entries by tag.",
    keyHighlights: ["Markdown Support", "Privacy Scope Toggles", "Tag Categorization"],
  },
  {
    stepNumber: 9,
    title: "Ambient Soundscapes & Audio Synth",
    subtitle: "Binaural sound generators for focus and restful sleep.",
    route: "/music",
    role: "member",
    targetArea: "Interactive Audio Player Controls",
    explanationNote: "Produces ambient nature sounds and binaural focus tones designed to reduce anxiety during craving or stress triggers.",
    actionInstruction: "Press Play on a soundscape track to experience ambient audio synthesis.",
    keyHighlights: ["Focus & Rest Soundscapes", "Frequency Sliders", "Calm Nature Visuals"],
  },
  {
    stepNumber: 10,
    title: "Restorative Guides & Coping Strategies",
    subtitle: "Situational guides for high-stress moments.",
    route: "/guides",
    role: "member",
    targetArea: "Situational Guides Library Grid",
    explanationNote: "A categorized library of actionable coping strategies (e.g., 'Handling Sudden Cravings', 'De-escalating Conflict', 'Somatic Breathing').",
    actionInstruction: "Filter guides by category or click a guide card to read body text.",
    keyHighlights: ["Categorized Coping Guides", "Estimated Read Times", "Actionable Step Lists"],
  },
  {
    stepNumber: 11,
    title: "Community Reflections Forum",
    subtitle: "Moderated peer support and encouragement.",
    route: "/community",
    role: "member",
    targetArea: "Discussion Thread Feed & Reply Form",
    explanationNote: "A safe space for members to share daily wins, ask questions, and leave encouraging comments for peers under moderation.",
    actionInstruction: "Post a reflection or click 'Like' / 'Reply' on an existing post.",
    keyHighlights: ["Moderated Discussion Feed", "Topic Filtering", "Encouragement Likes & Replies"],
  },
  {
    stepNumber: 12,
    title: "Editorial Restorative Newsletter",
    subtitle: "Weekly essays and deep recovery insights.",
    route: "/newsletter",
    role: "member",
    targetArea: "Newsletter Editions Catalog & Article View",
    explanationNote: "Published weekly by program leaders, featuring deep-dive essays on emotional sobriety, neurobiology of recovery, and community stories.",
    actionInstruction: "Select an edition to read the full published newsletter.",
    keyHighlights: ["Weekly Curated Essays", "Article Archive", "Markdown Formatting"],
  },
  {
    stepNumber: 13,
    title: "Supporter & Advocate Portal (Consented Care)",
    subtitle: "A non-intrusive window for trusted family & friends.",
    route: "/supporters",
    role: "supporter",
    targetArea: "7-Day Pulse Wave & Consent Matrix",
    explanationNote: "Supporters view member wellness trends without intruding on raw journal text. They see active boundary rules to help respect commitments.",
    actionInstruction: "Switch to 'Supporter' role to view the 7-Day Pulse Wave and active boundaries.",
    keyHighlights: ["7-Day Wellness Pulse Graph", "Consent Scope Permission Badges", "Active Boundaries Monitor", "Supporter Field Guides"],
  },
  {
    stepNumber: 14,
    title: "Coach Supervision & Caseload Roster",
    subtitle: "Clinical oversight for assigned coaches and therapists.",
    route: "/dashboard",
    role: "coach",
    targetArea: "Client Caseload Roster & Risk Indicators",
    explanationNote: "Coaches oversee assigned members, review recent check-in timestamps, detect low vitality alerts, and recommend tailored boundary rules.",
    actionInstruction: "Switch to 'Coach' role to inspect the assigned client caseload table.",
    keyHighlights: ["Client Caseload Roster Table", "Risk Flag Indicators", "Rule & Guide Recommendations"],
  },
  {
    stepNumber: 15,
    title: "Admin Tab 1: 21 Core Dimensions Management",
    subtitle: "Full CRUD control over recovery dimensions.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Dimensions Tab",
    explanationNote: "Administrators add, edit, category-filter, or delete the 21 Core Dimensions that form the foundation of the platform.",
    actionInstruction: "Click 'Add New Dimension' or edit an existing dimension card.",
    keyHighlights: ["Add/Edit/Delete Dimensions", "Category Filtering", "Daily Prompt Editor"],
  },
  {
    stepNumber: 16,
    title: "Admin Tab 2: Restorative Guides Manager",
    subtitle: "Managing situational coping strategies.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Restorative Guides Tab",
    explanationNote: "Create, format, search, and manage situational coping guides published to the member library.",
    actionInstruction: "Click 'Create Guide' or edit guide body markdown text.",
    keyHighlights: ["Guide Creation Dialog", "Category & Type Tags", "Body Markdown Editor"],
  },
  {
    stepNumber: 17,
    title: "Admin Tab 3: Boundary Rules Engine",
    subtitle: "Managing system-wide boundary presets.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Boundary Rules Tab",
    explanationNote: "Manage default boundary presets available to members during onboarding and daily practice.",
    actionInstruction: "Add a new boundary rule preset or adjust guidance text.",
    keyHighlights: ["Preset Rule CRUD", "Severity Ratings (Essential/Recommended)", "Category Groupings"],
  },
  {
    stepNumber: 18,
    title: "Admin Tab 4: Community Moderation",
    subtitle: "Moderating discussions and pinning top posts.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Community Tab",
    explanationNote: "Pin featured posts, review flagged discussions, and maintain a safe, constructive community environment.",
    actionInstruction: "Toggle 'Pin' on a post or remove inappropriate content.",
    keyHighlights: ["Pin/Unpin Community Threads", "Flagged Post Filtering", "Content Removal Controls"],
  },
  {
    stepNumber: 19,
    title: "Admin Tab 5: User Accounts & Role Governance",
    subtitle: "User roster management and instant role assignment.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Users Tab",
    explanationNote: "View all platform users, switch roles (Member, Supporter, Coach, Admin), assign cohorts, and update user status.",
    actionInstruction: "Change a user's role dropdown or edit cohort assignments.",
    keyHighlights: ["User Roster Table", "Instant Role Assignment", "Cohort Management"],
  },
  {
    stepNumber: 20,
    title: "Admin Tab 6: Supporter Links & Consent Governance",
    subtitle: "Pairing supporters, members, and configuring consent scopes.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Supporter Links Tab",
    explanationNote: "Issue new supporter connections, set consent scopes (Dashboard, Rules, Alerts, Journal), pause pairings, or revoke links.",
    actionInstruction: "Click 'Issue Supporter Link' to configure pairing details and permission switches.",
    keyHighlights: ["Supporter-Member Pairing Dialog", "Consent Scope Level Matrix", "Pause/Revoke Connection Controls"],
  },
  {
    stepNumber: 21,
    title: "Admin Tab 7: Editorial Newsletter Publisher",
    subtitle: "Publishing weekly restorative editions.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Newsletter Tab",
    explanationNote: "Draft, format, preview, and publish weekly editorial essays delivered to member feeds.",
    actionInstruction: "Write a new edition subject and body, then click 'Publish Edition'.",
    keyHighlights: ["Newsletter Draft & Publish Form", "Markdown Body Support", "Past Editions Archive"],
  },
  {
    stepNumber: 22,
    title: "Admin Tab 8: System Audit Logs & Reset Sandbox",
    subtitle: "Accountability trail and factory reset controls.",
    route: "/admin",
    role: "admin",
    targetArea: "Admin Dashboard → Audit Logs Tab & Factory Reset Button",
    explanationNote: "Review immutable security event logs recording administrative actions, and use 'Reset All Demo Data' to restore pristine demo states.",
    actionInstruction: "Inspect audit log timestamps and test the demo reset trigger.",
    keyHighlights: ["Immutable Audit Event Trail", "Severity Filters", "One-Click Demo Sandbox Reset"],
  },
];

export function InteractiveTourGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [location, setLocation] = useLocation();
  const { setRole } = useDemoSession();

  const activeStep = TOUR_STEPS[currentStepIndex];

  // Auto-switch role and route when step changes
  const jumpToStep = (index: number) => {
    const step = TOUR_STEPS[index];
    if (!step) return;
    setCurrentStepIndex(index);
    setRole(step.role);
    if (location !== step.route) {
      setLocation(step.route);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      jumpToStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      jumpToStep(currentStepIndex - 1);
    }
  };

  return (
    <>
      {/* Floating Tour Card Drawer */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:right-8 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] overflow-y-auto">
          <Card className="nature-card border-2 border-primary/50 shadow-2xl bg-card/95 backdrop-blur-xl space-y-3 p-5 text-foreground relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="rounded-full text-[10px] uppercase font-bold">
                  Step {activeStep.stepNumber} of {TOUR_STEPS.length}
                </Badge>
                <Badge variant="outline" className="text-[10px] rounded-full capitalize">
                  Role: {activeStep.role}
                </Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Title & Route */}
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-foreground leading-snug burnt-wood-heading">
                {activeStep.title}
              </h3>
              <p className="text-[11px] font-mono text-primary flex items-center gap-1">
                <Monitor className="h-3 w-3" /> Screen: {activeStep.route} ({activeStep.targetArea})
              </p>
            </div>

            {/* Explanation Note */}
            <div className="p-3 rounded-xl bg-muted/60 border border-border/60 text-xs space-y-1.5">
              <span className="font-semibold text-foreground text-[11px] block">Area Note & Purpose:</span>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {activeStep.explanationNote}
              </p>
            </div>

            {/* Key Feature Bullet Points */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Key Features on This Screen:
              </span>
              <ul className="space-y-1 text-[11px] text-muted-foreground pl-1">
                {activeStep.keyHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Instruction */}
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-[11px] text-primary font-medium flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              <span>{activeStep.actionInstruction}</span>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <Button
                size="sm"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="rounded-full text-xs gap-1 h-8"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </Button>

              <button
                type="button"
                onClick={() => setLocation("/presentation")}
                className="text-[10px] text-muted-foreground underline hover:text-primary"
              >
                Full Slide Deck
              </button>

              <Button
                size="sm"
                variant="default"
                onClick={handleNext}
                disabled={currentStepIndex === TOUR_STEPS.length - 1}
                className="rounded-full text-xs gap-1 h-8"
              >
                Next Step <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
