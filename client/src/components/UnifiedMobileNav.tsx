import { useState } from "react";
import { useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  { href: "/", label: "Home", icon: Home, desc: "Landing & holistic overview" },
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
    desc: "Client caseload, risk alerts & clinical notes",
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
        className="w-[92vw] max-w-[400px] sm:max-w-md p-0 flex flex-col bg-background/98 backdrop-blur-2xl border-r border-border/70 shadow-2xl overflow-hidden"
      >
        {/* Drawer Header: Clear space with pr-14 so nothing collides with Radix Close (X) button */}
        <SheetHeader className="p-4 sm:p-5 pr-14 border-b border-border/60 text-left bg-muted/20 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleLinkClick("/")}
              className="flex items-center gap-3 text-left group focus:outline-none min-h-[48px]"
            >
              <BrandLogoIcon size={36} className="transition-transform group-hover:-rotate-6 shrink-0" />
              <div>
                <SheetTitle className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight">
                  Re<span className="text-primary font-extrabold">Forge</span>
                </SheetTitle>
                <p className="text-xs text-muted-foreground">Whole-Life Recovery</p>
              </div>
            </button>
            <ThemeToggle compact />
          </div>
        </SheetHeader>

        {/* Scrollable Navigation Body */}
        <ScrollArea className="flex-1 px-3 sm:px-4 py-4">
          <div className="space-y-6 pb-6">
            
            {/* Section 1: Active Demo Persona & Role Switcher */}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-3.5 sm:p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Active Demo Persona
                  </span>
                </div>
                <Badge variant="outline" className="text-xs px-2.5 py-0.5 border-primary/40 bg-primary/10 text-primary font-semibold">
                  {user.name} ({role})
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Tap any persona to switch roles instantly with live contextual data:
              </p>

              {/* Roles List: Full-width spacious buttons with distinct padding & touch targets */}
              <div className="space-y-2">
                {rolesList.map((r) => {
                  const Icon = r.icon;
                  const isActive = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleChange(r.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl text-left transition-all touch-manipulation min-h-[56px] ${
                        isActive
                          ? "bg-primary text-primary-foreground border border-primary shadow-sm font-semibold"
                          : "bg-background/80 hover:bg-muted border border-border/60 text-foreground/90 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}>
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold leading-tight truncate">{r.name}</span>
                            <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                              isActive ? "bg-primary-foreground/25 text-primary-foreground font-medium" : "bg-muted text-muted-foreground"
                            }`}>
                              {r.badge}
                            </span>
                          </div>
                          <p className={`text-xs truncate mt-0.5 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {r.desc}
                          </p>
                        </div>
                      </div>
                      {isActive && (
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-foreground/25 text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Recovery App Workspace */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Compass className="h-4 w-4" /> Recovery Workspace
                </p>
                <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full font-medium">
                  {workspaceLinks.length} tools
                </span>
              </div>
              
              <div className="space-y-2">
                {workspaceLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[58px] flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-all touch-manipulation ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/35 shadow-xs"
                          : "bg-card/60 hover:bg-muted text-foreground/90 hover:text-foreground border border-border/50"
                      } ${item.isSpecial && !isActive ? "border-primary/30 text-primary" : ""}`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : item.isSpecial
                            ? "bg-primary/15 text-primary"
                            : "bg-muted/90 text-muted-foreground"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-medium leading-tight truncate">{item.label}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      {item.isSpecial ? (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-primary/40 text-primary shrink-0 ml-2 font-semibold">
                          Studio
                        </Badge>
                      ) : (
                        <ChevronRight className={`h-4.5 w-4.5 shrink-0 transition-opacity ${isActive ? "text-primary opacity-100" : "text-muted-foreground/40 opacity-70"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Public Educational & Site Pages */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
                <Info className="h-4 w-4" /> Exploration & Resources
              </p>
              <div className="space-y-2">
                {siteLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[52px] flex items-center justify-between px-4 py-3 rounded-xl text-left transition-colors touch-manipulation ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/25"
                          : "bg-card/40 hover:bg-muted text-foreground/80 hover:text-foreground border border-border/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                          isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-tight truncate">{item.label}</p>
                          <p className="text-[11px] text-muted-foreground truncate mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/30"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Drawer Footer: Clear Touch Targets & Equal Spacing */}
        <div className="p-4 border-t border-border/60 bg-muted/30 shrink-0 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => handleLinkClick("/settings")}
            className="flex items-center gap-2 hover:text-foreground transition-colors text-xs font-semibold min-h-[48px] px-3 py-2 rounded-xl bg-card border border-border/60 hover:bg-muted touch-manipulation"
          >
            <Settings className="h-4 w-4 text-primary" />
            <span>Settings</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => handleLinkClick("/privacy")}
              className="hover:text-foreground transition-colors min-h-[48px] px-2.5 flex items-center rounded-lg hover:bg-muted/60 touch-manipulation"
            >
              Privacy
            </button>
            <span className="text-muted-foreground/50">•</span>
            <button
              type="button"
              onClick={() => handleLinkClick("/terms")}
              className="hover:text-foreground transition-colors min-h-[48px] px-2.5 flex items-center rounded-lg hover:bg-muted/60 touch-manipulation"
            >
              Terms
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
