import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrandLogoIcon } from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useDemoSession, DemoRole } from "@/lib/demoSession";
import {
  Menu,
  LayoutDashboard,
  BarChart3,
  CheckCircle2,
  History,
  BookOpen,
  Target,
  ShieldAlert,
  Compass,
  Users,
  Music,
  HeartHandshake,
  Newspaper,
  Settings,
  ShieldCheck,
  Home,
  Sparkles,
  HelpCircle,
  Mail,
  User,
  Stethoscope,
  Info,
  Layers,
  Award,
  ChevronRight,
  Check,
} from "lucide-react";

interface UnifiedMobileNavProps {
  /** Optional custom trigger button or icon styling */
  triggerClassName?: string;
  /** Optional variant indicator */
  variant?: "site" | "dashboard" | "admin";
}

const workspaceLinks = [
  { href: "/dashboard", label: "Dashboard Overview", icon: LayoutDashboard, desc: "Daily practice rhythm & vitality pulse" },
  { href: "/progress", label: "21 Dimensions Progress", icon: BarChart3, desc: "Holistic life balance & progress meters" },
  { href: "/check-ins", label: "Daily Check-In", icon: CheckCircle2, desc: "Morning vitality & evening reflection" },
  { href: "/check-in-history", label: "Check-In History", icon: History, desc: "Past logs, patterns & mood trends" },
  { href: "/journal", label: "Recovery Journal", icon: BookOpen, desc: "Private reflections & somatic notes" },
  { href: "/goals", label: "Goals & Intentions", icon: Target, desc: "Gentle 30/90-day recovery horizons" },
  { href: "/rules", label: "Rules & Boundaries", icon: ShieldAlert, desc: "Protective agreements & trigger alerts" },
  { href: "/guides", label: "Recovery Guides", icon: Compass, desc: "Urge surfing & nervous system soothing" },
  { href: "/community", label: "Community Circles", icon: Users, desc: "Safe, moderated peer support rooms" },
  { href: "/music", label: "Calming Soundscapes", icon: Music, desc: "Ambient somatic audio resets" },
  { href: "/devotional", label: "Daily Devotional", icon: HeartHandshake, desc: "Grounded morning wisdom & prayers" },
  { href: "/newsletter", label: "Newsletter", icon: Newspaper, desc: "Weekly recovery essays & resources" },
  { href: "/admin", label: "Admin Control Studio", icon: ShieldCheck, desc: "Full CRUD content, users & dimensions", isSpecial: true },
  { href: "/settings", label: "Settings", icon: Settings, desc: "Account preferences & privacy sandbox" },
];

const siteLinks = [
  { href: "/", label: "Home", icon: Home, desc: "Landing & overview" },
  { href: "/how-it-works", label: "How It Works", icon: Sparkles, desc: "The ReForge 4-pillar methodology" },
  { href: "/dimensions", label: "21 Dimensions", icon: Layers, desc: "Holistic recovery framework" },
  { href: "/daily-practice", label: "Daily Practice", icon: Compass, desc: "Rhythms, journaling & breathwork" },
  { href: "/success", label: "Recovery Stories", icon: Award, desc: "Real journeys & testimonials" },
  { href: "/supporters", label: "For Supporters & Allies", icon: HeartHandshake, desc: "Guiding family & partners" },
  { href: "/about", label: "Our Story & Method", icon: Info, desc: "Mission, ethics & foundation" },
  { href: "/faq", label: "FAQs", icon: HelpCircle, desc: "Common questions & support" },
  { href: "/contact", label: "Contact & Help", icon: Mail, desc: "Reach our care team" },
];

const rolesList: {
  id: DemoRole;
  name: string;
  roleTitle: string;
  icon: typeof User;
  badge: string;
  desc: string;
}[] = [
  {
    id: "member",
    name: "Sam",
    roleTitle: "Member / Practitioner",
    icon: User,
    badge: "Recovery Mode",
    desc: "Personal check-ins, journal & dimensions",
  },
  {
    id: "supporter",
    name: "Sarah",
    roleTitle: "Supporter / Ally",
    icon: HeartHandshake,
    badge: "Partner View",
    desc: "Encouragement & shared milestones",
  },
  {
    id: "coach",
    name: "Dr. Marcus",
    roleTitle: "Clinical Coach",
    icon: Stethoscope,
    badge: "Caseload View",
    desc: "Client caseload, risk alerts & notes",
  },
  {
    id: "admin",
    name: "Alex",
    roleTitle: "Platform Admin",
    icon: ShieldCheck,
    badge: "Full Access",
    desc: "Full CRUD content, dimensions & users",
  },
];

export function UnifiedMobileNav({ triggerClassName }: UnifiedMobileNavProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { role, setRole, user } = useDemoSession();

  const handleLinkClick = (href: string) => {
    setLocation(href);
    setOpen(false);
  };

  const handleRoleChange = (newRole: DemoRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      setLocation("/admin");
    } else {
      setLocation("/dashboard");
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open main navigation menu"
          className={
            triggerClassName ||
            "min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl border border-border/70 bg-card/80 text-foreground hover:bg-muted transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
          }
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[94vw] max-w-sm sm:max-w-md p-0 flex flex-col bg-background/98 backdrop-blur-2xl border-r border-border/70 shadow-2xl"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-4 sm:p-5 border-b border-border/60 text-left bg-muted/20">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleLinkClick("/")}
              className="flex items-center gap-3 text-left group focus:outline-none min-h-[44px]"
            >
              <BrandLogoIcon size={36} className="transition-transform group-hover:-rotate-6 shrink-0" />
              <div>
                <SheetTitle className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-none">
                  Re<span className="text-primary font-extrabold">Forge</span>
                </SheetTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Whole-Life Recovery Platform</p>
              </div>
            </button>
            <ThemeToggle compact />
          </div>

          {/* Persona / Member Mode Switcher with Spacious Touch-Friendly Cards */}
          <div className="mt-4 pt-3.5 border-t border-border/50 space-y-2.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Active Demo Persona
              </span>
              <Badge variant="outline" className="text-[11px] px-2.5 py-0.5 border-primary/40 bg-primary/10 text-primary font-semibold">
                {user.name}
              </Badge>
            </div>

            {/* Role Buttons in a spacious grid with generous touch targets */}
            <div className="grid grid-cols-2 gap-2">
              {rolesList.map((r) => {
                const Icon = r.icon;
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl text-left transition-all touch-manipulation min-h-[52px] ${
                      isActive
                        ? "bg-primary text-primary-foreground border border-primary shadow-sm ring-1 ring-primary/40 font-semibold"
                        : "bg-card/90 hover:bg-muted border border-border/70 text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-tight truncate">{r.name}</p>
                      <p className={`text-[10px] truncate mt-0.5 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {r.roleTitle.split(" / ")[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Navigation Body */}
        <ScrollArea className="flex-1 px-3 sm:px-4 py-4">
          <div className="space-y-6">
            {/* Recovery App Workspace Section */}
            <div>
              <div className="flex items-center justify-between px-2 mb-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Recovery Practice Workspace
                </p>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
                  14 tools
                </span>
              </div>
              
              <div className="space-y-1.5">
                {workspaceLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[52px] flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-all touch-manipulation text-left ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/30 shadow-xs"
                          : "text-foreground/85 hover:bg-muted/80 hover:text-foreground border border-transparent"
                      } ${item.isSpecial && !isActive ? "text-primary font-medium" : ""}`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : item.isSpecial
                            ? "bg-primary/15 text-primary"
                            : "bg-muted/80 text-muted-foreground"
                        }`}>
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-tight truncate">{item.label}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      {item.isSpecial ? (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/40 text-primary shrink-0 ml-2 font-semibold">
                          Studio
                        </Badge>
                      ) : (
                        <ChevronRight className={`h-4 w-4 shrink-0 transition-opacity ${isActive ? "text-primary opacity-100" : "text-muted-foreground/40 opacity-0 group-hover:opacity-100"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Public Educational & Site Pages */}
            <div className="pt-3 border-t border-border/40">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2.5">
                Public Exploration & Resources
              </p>
              <div className="space-y-1.5">
                {siteLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors touch-manipulation text-left ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/20"
                          : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                          isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-tight truncate">{item.label}</p>
                        </div>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/30"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Drawer Footer with Spacious Touch Targets */}
        <div className="p-4 border-t border-border/60 bg-muted/25 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => handleLinkClick("/settings")}
            className="flex items-center gap-2 hover:text-foreground transition-colors text-xs font-medium min-h-[44px] px-2.5 py-2 rounded-xl hover:bg-muted/60 touch-manipulation"
          >
            <Settings className="h-4 w-4 text-primary" />
            <span>Settings & Privacy</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleLinkClick("/privacy")}
              className="hover:text-foreground transition-colors min-h-[44px] px-2 flex items-center touch-manipulation"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleLinkClick("/terms")}
              className="hover:text-foreground transition-colors min-h-[44px] px-2 flex items-center touch-manipulation"
            >
              Terms
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
