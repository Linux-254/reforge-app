import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Sparkles, Activity, ShieldCheck } from "lucide-react";

// Realistically calibrated progression data representing whole-life dimensions over the last 30 days
const MONTH_TREND_DATA = [
  {
    week: "Day 1",
    date: "Aug 19",
    overall: 48,
    somatic: 42,
    emotional: 45,
    boundaries: 52,
    purpose: 44,
  },
  {
    week: "Day 7",
    date: "Aug 26",
    overall: 54,
    somatic: 50,
    emotional: 51,
    boundaries: 58,
    purpose: 52,
  },
  {
    week: "Day 14",
    date: "Sep 02",
    overall: 62,
    somatic: 59,
    emotional: 58,
    boundaries: 68,
    purpose: 60,
  },
  {
    week: "Day 21",
    date: "Sep 09",
    overall: 71,
    somatic: 68,
    emotional: 69,
    boundaries: 76,
    purpose: 70,
  },
  {
    week: "Day 30",
    date: "Sep 18",
    overall: 82,
    somatic: 78,
    emotional: 80,
    boundaries: 88,
    purpose: 81,
  },
];

const DIMENSION_METRICS = [
  { key: "overall", label: "Whole-Life Vitality", color: "#2e7d32", stroke: "#1b5e20" },
  { key: "boundaries", label: "Clean Boundaries", color: "#d97706", stroke: "#b45309" },
  { key: "somatic", label: "Somatic Calm & Sleep", color: "#059669", stroke: "#047857" },
  { key: "emotional", label: "Emotional Literacy", color: "#0284c7", stroke: "#0369a1" },
  { key: "purpose", label: "Purpose & Craft", color: "#7c3aed", stroke: "#6d28d9" },
];

export function DimensionsImprovementChart({
  className = "",
}: {
  className?: string;
}) {
  const [activeMetric, setActiveMetric] = useState<string>("overall");

  const activeMeta =
    DIMENSION_METRICS.find((m) => m.key === activeMetric) || DIMENSION_METRICS[0];

  // Improvement calculation
  const startVal = MONTH_TREND_DATA[0][activeMetric as keyof (typeof MONTH_TREND_DATA)[0]] as number;
  const currentVal =
    MONTH_TREND_DATA[MONTH_TREND_DATA.length - 1][
      activeMetric as keyof (typeof MONTH_TREND_DATA)[0]
    ] as number;
  const growth = currentVal - startVal;

  return (
    <Card
      id="dimensions-trends-chart"
      className={`nature-card border-border/70 bg-card/90 backdrop-blur-md overflow-hidden ${className}`}
    >
      <CardHeader className="p-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                <Activity className="h-4 w-4" />
              </span>
              <CardTitle className="font-serif text-2xl font-bold leading-tight">
                Life Dimensions Improvement
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Tracking whole-person recovery progression across the last 30 days
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 gap-1.5 text-xs font-semibold"
            >
              <TrendingUp className="h-3.5 w-3.5" /> +{growth}% this month
            </Badge>
          </div>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {DIMENSION_METRICS.map((metric) => {
            const isSelected = activeMetric === metric.key;
            return (
              <Button
                key={metric.key}
                variant="ghost"
                size="sm"
                onClick={() => setActiveMetric(metric.key)}
                className={`h-7 rounded-full text-xs font-medium px-3 transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {metric.label}
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4 space-y-4">
        {/* Metric Highlight Summary Banner */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/50 text-center">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
              30 Days Ago
            </span>
            <span className="font-serif text-xl font-bold text-foreground">
              {startVal}%
            </span>
          </div>
          <div className="border-x border-border/40">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
              Current Vitality
            </span>
            <span className="font-serif text-xl font-bold text-primary">
              {currentVal}%
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
              Net Renewal
            </span>
            <span className="font-serif text-xl font-bold text-emerald-600 dark:text-emerald-400">
              +{growth}%
            </span>
          </div>
        </div>

        {/* Recharts Area Curve */}
        <div className="h-60 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={MONTH_TREND_DATA}
              margin={{ top: 10, right: 12, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="dimensionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="stroke-border/40"
              />
              <XAxis
                dataKey="date"
                stroke="currentColor"
                className="text-[11px] text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[30, 100]}
                stroke="currentColor"
                className="text-[11px] text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-border bg-popover p-3 shadow-xl text-xs space-y-1">
                        <div className="font-semibold text-foreground flex items-center justify-between gap-3">
                          <span>{dataPoint.week} ({label})</span>
                          <span className="text-primary font-bold">{payload[0].value}%</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {activeMeta.label}
                        </p>
                        <div className="pt-1 text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Steadily strengthening week over week</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke="var(--primary)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#dimensionGrad)"
                dot={{
                  r: 4,
                  fill: "var(--primary)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "var(--primary)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Insight */}
        <div className="pt-2 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Reflects averaged ratings across self-check-ins and boundary reflections.</span>
          </span>
          <span className="text-[11px] font-medium text-primary">
            Measured across 21 core recovery areas
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
