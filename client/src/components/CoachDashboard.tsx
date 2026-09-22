import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Stethoscope,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  FileText,
  Plus,
  ArrowUpRight,
  Filter,
  Search,
} from "lucide-react";
import { DemoDataManager } from "@/lib/demoSession";

interface ClientRecord {
  id: number;
  name: string;
  cohort: string;
  dayCount: number;
  riskLevel: "low" | "medium" | "high";
  todayMood: string;
  checkedInToday: boolean;
  assignedGuide: string;
  notes: string;
}

export function CoachDashboard() {
  const [clients, setClients] = useState<ClientRecord[]>([
    {
      id: 1,
      name: "Sam Bennett",
      cohort: "Cohort 14",
      dayCount: 48,
      riskLevel: "low",
      todayMood: "4/5 (Calm, Grounded)",
      checkedInToday: true,
      assignedGuide: "The Evening Wind-Down Ritual",
      notes: "Steady engagement. Reported good progress on sleep boundaries. Supporter connection active.",
    },
    {
      id: 2,
      name: "Elena Rostova",
      cohort: "Cohort 12",
      dayCount: 112,
      riskLevel: "high",
      todayMood: "2/5 (Anxious, Craving Wave)",
      checkedInToday: true,
      assignedGuide: "When the Urge Arrives: 15-Min Rule",
      notes: "High stress reported yesterday. Urge wave documented at 9 PM. Outreach suggested before weekend.",
    },
    {
      id: 3,
      name: "Jordan Lee",
      cohort: "Cohort 15",
      dayCount: 19,
      riskLevel: "medium",
      todayMood: "Pending check-in",
      checkedInToday: false,
      assignedGuide: "A Ten-Minute Nervous System Reset",
      notes: "Missed yesterday's evening check-in. In early stages; monitoring weekend vulnerability.",
    },
    {
      id: 4,
      name: "Maya Lin",
      cohort: "Cohort 11",
      dayCount: 140,
      riskLevel: "low",
      todayMood: "5/5 (Clear, Hopeful)",
      checkedInToday: true,
      assignedGuide: "Repair Without Performance",
      notes: "Thriving. Actively mentoring newer cohort members in community discussion board.",
    },
  ]);

  const [selectedClient, setSelectedClient] = useState<ClientRecord>(clients[0]);
  const [newNote, setNewNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all");
  const [selectedGuideToAssign, setSelectedGuideToAssign] = useState("A Ten-Minute Nervous System Reset");

  const guides = DemoDataManager.getGuides();

  const handleSaveNote = () => {
    if (!newNote.trim()) return;
    const updated = clients.map((c) =>
      c.id === selectedClient.id
        ? { ...c, notes: `${newNote.trim()}\n\n[Previous]: ${c.notes}` }
        : c
    );
    setClients(updated);
    setSelectedClient((prev) => ({
      ...prev,
      notes: `${newNote.trim()}\n\n[Previous]: ${prev.notes}`,
    }));
    DemoDataManager.addLog("Logged Clinical Note", `Client: ${selectedClient.name}`, "info");
    setNewNote("");
    toast.success(`Progress note recorded for ${selectedClient.name}`, { className: "nature-toast" });
  };

  const handleAssignGuide = () => {
    const updated = clients.map((c) =>
      c.id === selectedClient.id ? { ...c, assignedGuide: selectedGuideToAssign } : c
    );
    setClients(updated);
    setSelectedClient((prev) => ({ ...prev, assignedGuide: selectedGuideToAssign }));
    DemoDataManager.addLog("Assigned Recovery Guide", `${selectedGuideToAssign} to ${selectedClient.name}`, "success");
    toast.success(`Assigned "${selectedGuideToAssign}" to ${selectedClient.name}`, { className: "nature-toast" });
  };

  const filteredClients = clients.filter((c) => {
    const matchesRisk = filterRisk === "all" || c.riskLevel === filterRisk;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.cohort.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[#25362a] text-[#f7eddc] shadow-[0_24px_60px_-40px_rgba(39,58,43,.8)]">
        <img
          src="/assets/journal-morning.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(37,54,42,.96),rgba(37,54,42,.75),rgba(118,74,48,.25))]" />
        <div className="relative p-6 sm:p-10 space-y-4 max-w-2xl">
          <Badge className="rounded-full bg-primary/20 text-emerald-200 border-primary/30 gap-1.5 px-3 py-1">
            <Stethoscope className="h-3.5 w-3.5" /> Clinical & Mentorship Portal
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl leading-tight">
            Caseload & Practitioner Care
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Monitor client check-in consistency, review clinical indicators and urge waves, log confidential practitioner notes, and prescribe targeted recovery dimensions.
          </p>
        </div>
      </section>

      {/* Caseload Stat Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Active Caseload</span>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <p className="font-serif text-3xl font-bold text-foreground mt-2">{clients.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Cohorts 11, 12, 14 & 15</p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Check-in Rate</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">75%</p>
            <p className="text-xs text-muted-foreground mt-1">3 of 4 checked in today</p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Attention Needed</span>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <p className="font-serif text-3xl font-bold text-amber-600 mt-2">1 Client</p>
            <p className="text-xs text-muted-foreground mt-1">Elena Rostova reported urge wave</p>
          </CardContent>
        </Card>

        <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider">
              <span>Average Practice</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <p className="font-serif text-3xl font-bold text-primary mt-2">80 Days</p>
            <p className="text-xs text-muted-foreground mt-1">Steady cohort recovery pace</p>
          </CardContent>
        </Card>
      </div>

      {/* Caseload Split View */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Client Roster (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients or cohorts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-xl text-xs"
              />
            </div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              aria-label="Filter clients by risk level"
              className="h-9 text-xs rounded-xl border border-border bg-card px-2 text-foreground"
            >
              <option value="all">All Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          <div className="space-y-2.5">
            {filteredClients.map((client) => {
              const isSelected = selectedClient.id === client.id;
              const riskBadgeClass =
                client.riskLevel === "high"
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30"
                  : client.riskLevel === "medium"
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";

              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/40"
                      : "border-border/70 bg-card/80 hover:bg-card hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-foreground">{client.name}</h4>
                      <p className="text-xs text-muted-foreground">{client.cohort} · Day {client.dayCount}</p>
                    </div>
                    <Badge variant="outline" className={`rounded-full capitalize text-[10px] px-2 py-0.5 ${riskBadgeClass}`}>
                      {client.riskLevel} risk
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-border/40">
                    <span className="text-muted-foreground">Today:</span>
                    <span className={client.checkedInToday ? "font-medium text-foreground" : "text-amber-600 italic"}>
                      {client.todayMood}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Client Detail & Care Action (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 mb-1">
                    Client Case Profile
                  </Badge>
                  <CardTitle className="font-serif text-2xl">{selectedClient.name}</CardTitle>
                  <CardDescription>
                    {selectedClient.cohort} · Practice Day {selectedClient.dayCount}
                  </CardDescription>
                </div>
                <div className="text-right text-xs">
                  <span className="text-muted-foreground block">Active Guide:</span>
                  <span className="font-semibold text-primary">{selectedClient.assignedGuide}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Prescribe/Assign Guide */}
              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" /> Assign Practice Guide
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedGuideToAssign}
                    onChange={(e) => setSelectedGuideToAssign(e.target.value)}
                    aria-label="Select recovery guide to assign"
                    className="flex-1 h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  >
                    {guides.map((g) => (
                      <option key={g.id} value={g.title}>
                        {g.title} ({g.type})
                      </option>
                    ))}
                  </select>
                  <Button size="sm" onClick={handleAssignGuide} className="rounded-xl text-xs">
                    Assign
                  </Button>
                </div>
              </div>

              {/* Clinical Progress Notes */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary" /> Clinician Notes & Guidance
                </label>
                <div className="p-4 rounded-xl border border-border/60 bg-muted/10 text-xs leading-relaxed whitespace-pre-wrap max-h-44 overflow-y-auto">
                  {selectedClient.notes}
                </div>

                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record session observation, boundary recommendation, or outreach note..."
                  className="min-h-24 rounded-xl text-xs"
                />

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleSaveNote}
                    disabled={!newNote.trim()}
                    className="rounded-full text-xs gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" /> Append Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
