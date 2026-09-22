import { useState, useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Award, RefreshCw, ChevronRight } from "lucide-react";

interface SobrietyStreakCounterProps {
  initialStartDate?: string;
  className?: string;
  onStartDateChange?: (date: string) => void;
}

const MILESTONES = [
  { days: 1, label: "24 Hours", message: "Day one of a steady journey" },
  { days: 7, label: "1 Week", message: "A full cycle of gentle practice" },
  { days: 14, label: "2 Weeks", message: "New neural pathways taking root" },
  { days: 30, label: "30 Days", message: "A full month of showing up" },
  { days: 60, label: "60 Days", message: "Steadiness in all rhythms" },
  { days: 90, label: "90 Days", message: "A seasonal renewal" },
  { days: 180, label: "6 Months", message: "Deep somatic anchoring" },
  { days: 365, label: "1 Year", message: "A complete solar return clean" },
];

export function SobrietyStreakCounter({
  initialStartDate = "2026-08-01",
  className = "",
  onStartDateChange,
}: SobrietyStreakCounterProps) {
  const [startDate, setStartDate] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("reforge_sobriety_start_date");
      if (stored) return stored;
    } catch {
      // fallback
    }
    return initialStartDate;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [inputDate, setInputDate] = useState(startDate);
  const dateInputId = useId();

  // Calculate days clean based on start date
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - start.getTime();
  const daysClean = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  // Next milestone calculation
  const nextMilestone = MILESTONES.find((m) => m.days > daysClean) || {
    days: Math.ceil((daysClean + 1) / 365) * 365,
    label: `${Math.ceil((daysClean + 1) / 365)} Years`,
    message: "Walking in quiet strength",
  };

  const prevMilestoneDays =
    [...MILESTONES].reverse().find((m) => m.days <= daysClean)?.days || 0;
  const milestoneRange = Math.max(1, nextMilestone.days - prevMilestoneDays);
  const milestoneProgress = Math.min(
    100,
    Math.max(0, ((daysClean - prevMilestoneDays) / milestoneRange) * 100)
  );

  // SVG Circular Progress Math
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  // Progress towards next milestone: percentage out of 100
  const strokeDashoffset = circumference - (milestoneProgress / 100) * circumference;

  const handleSaveDate = () => {
    if (!inputDate) return;
    setStartDate(inputDate);
    setIsEditing(false);
    try {
      localStorage.setItem("reforge_sobriety_start_date", inputDate);
    } catch {
      // ignore
    }
    onStartDateChange?.(inputDate);
  };

  return (
    <Card
      id="sobriety-streak-card"
      className={`nature-card border-border/70 bg-card/90 backdrop-blur-md overflow-hidden ${className}`}
    >
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <Award className="h-4 w-4" />
            </span>
            <div>
              <CardTitle className="font-serif text-lg font-bold leading-tight">
                Sobriety Rhythm
              </CardTitle>
              <p className="text-[11px] text-muted-foreground">
                Honoring each day clean & clear
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="rounded-full text-[10px] px-2 py-0.5 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
          >
            <Sparkles className="h-3 w-3 mr-1" /> Active Streak
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4">
        {/* Circular Progress & Days Display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
          {/* Circular Progress Ring */}
          <div className="relative grid place-items-center shrink-0">
            <svg
              className="h-40 w-40 -rotate-90 transform"
              viewBox="0 0 160 160"
              aria-label={`Sobriety progress: ${daysClean} days clean, ${Math.round(milestoneProgress)}% towards ${nextMilestone.label}`}
            >
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-muted/40"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress stroke */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-primary transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-none">
                {daysClean}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-1">
                {daysClean === 1 ? "Day Clean" : "Days Clean"}
              </span>
            </div>
          </div>

          {/* Milestone Details & Milestone Badge */}
          <div className="flex-1 space-y-3 text-center sm:text-left w-full">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Next Milestone
              </span>
              <p className="font-serif text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                <span>{nextMilestone.label}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  ({nextMilestone.days - daysClean} {nextMilestone.days - daysClean === 1 ? "day" : "days"} away)
                </span>
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "{nextMilestone.message}"
              </p>
            </div>

            {/* Mini Progress Bar to Milestone */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Progress to {nextMilestone.label}</span>
                <span>{Math.round(milestoneProgress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>
            </div>

            {/* Clean start date anchor */}
            <div className="pt-1 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary/70" />
                <span>Since {new Date(startDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] font-medium text-primary hover:underline hover:text-primary/80"
              >
                {isEditing ? "Cancel" : "Change start date"}
              </button>
            </div>
          </div>
        </div>

        {/* Date Edit Collapse */}
        {isEditing && (
          <div className="p-3 rounded-xl border border-border/70 bg-muted/30 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
            <label htmlFor={dateInputId} className="block text-xs font-medium text-foreground">
              Select your clean date:
            </label>
            <div className="flex gap-2">
              <input
                id={dateInputId}
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button size="sm" onClick={handleSaveDate} className="rounded-lg text-xs h-8">
                Update
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
