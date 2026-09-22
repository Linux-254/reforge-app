import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, HeartHandshake, CalendarDays } from "lucide-react";
import { useLocation } from "wouter";

export default function Devotional() {
  const { user } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: "/",
  });
  const [, setLocation] = useLocation();

  const demoMode = import.meta.env.VITE_DEMO_MODE !== "false";
  const devotionalQuery = trpc.devotional.today.useQuery(undefined, { enabled: !demoMode && Boolean(user) });

  if (devotionalQuery.isLoading) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <div className="border-b border-border/60 bg-card/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
            <Skeleton className="h-9 w-20 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-6 w-44 rounded-lg" />
              <Skeleton className="h-4 w-60 rounded-md" />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <div className="space-y-3 rounded-2xl border border-border/60 bg-card/60 p-6">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
          </div>
          <div className="space-y-3 rounded-2xl border border-border/60 bg-card/60 p-6">
            <Skeleton className="h-6 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  const devotional = devotionalQuery.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">Daily Devotional</h1>
            <p className="text-sm text-slate-600">
              A moment of grounding, refreshed each day
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-700 text-sm mb-2">
              <CalendarDays className="h-4 w-4" />
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            {devotional ? (
              <>
                <CardTitle className="flex items-start gap-3 text-xl leading-snug">
                  <HeartHandshake className="h-6 w-6 text-amber-600 mt-1 shrink-0" />
                  {devotional.title}
                </CardTitle>
                {devotional.tags && (
                  <Badge
                    variant="outline"
                    className="bg-white/60 border-amber-200 text-amber-900 self-start"
                  >
                    {devotional.tags}
                  </Badge>
                )}
              </>
            ) : (
              <CardTitle>Reflection</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            {devotional ? (
              <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                {devotional.body}
              </div>
            ) : (
              <p className="text-slate-700">
                Take a quiet moment today. Breathe deeply, notice where you are,
                and give yourself grace. Every day you show up is a step
                forward.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
