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
} from "lucide-react";

interface UnifiedMobileNavProps {
  /** Optional custom trigger button or icon styling */
  triggerClassName?: string;
  /** Optional variant indicator */
  variant?: "site" | "dashboard" | "admin";
}

const workspaceLinks = [
  { href: "/dashboard", label: "Dashboard Overview", icon: LayoutDashboard, desc: "Personal recovery rhythm & daily pulse" },
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
  { href: "/", label: "Home", icon: Home },
  { href: "/how-it-works", label: "How It Works", icon: Sparkles },
  { href: "/dimensions", label: "21 Dimensions", icon: Layers },
  { href: "/daily-practice", label: "Daily Practice", icon: Compass },
  { href: "/success", label: "Recovery Stories", icon: Award },
  { href: "/supporters", label: "For Supporters & Allies", icon: HeartHandshake },
  { href: "/about", label: "Our Story & Method", icon: Info },
  { href: "/faq", label: "FAQs", icon: HelpCircle },
  { href: "/contact", label: "Contact & Help", icon: Mail },
];

const rolesList: {
  id: DemoRole;
  name: string;
  roleTitle: string;
  icon: typeof User;
  badge: string;
}[] = [
  {
    id: "member",
    name: "Sam",
    roleTitle: "Member / Practitioner",
    icon: User,
    badge: "Recovery Mode",
  },
  {
    id: "supporter",
    name: "Sarah",
    roleTitle: "Supporter / Ally",
    icon: HeartHandshake,
    badge: "Partner View",
  },
  {
    id: "coach",
    name: "Dr. Marcus",
    roleTitle: "Clinical Coach",
    icon: Stethoscope,
    badge: "Caseload View",
  },
  {
    id: "admin",
    name: "Alex",
    roleTitle: "Platform Admin",
    icon: ShieldCheck,
    badge: "Full Access",
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
            "min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-border/70 bg-card/70 text-foreground hover:bg-muted/80 transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          }
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[92vw] max-w-sm sm:max-w-md p-0 flex flex-col bg-background/98 backdrop-blur-2xl border-r border-border/70"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-4 sm:p-5 border-b border-border/60 text-left bg-muted/30">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleLinkClick("/")}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <BrandLogoIcon size={34} className="transition-transform group-hover:-rotate-6 shrink-0" />
              <div>
                <SheetTitle className="font-serif text-xl font-bold tracking-tight text-foreground leading-none">
                  Re<span className="text-primary font-extrabold">Forge</span>
                </SheetTitle>
                <p className="text-[11px] text-muted-foreground mt-0.5">Whole-Life Recovery Platform</p>
              </div>
            </button>
            <ThemeToggle compact />
          </div>

          {/* Persona / Member Mode Switcher with Spaced Touch-Friendly Stack */}
          <div className="mt-4 pt-3.5 border-t border-border/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Active Persona
              </span>
              <Badge variant="outline" className="text-[10px] px-2 py-0 border-primary/40 bg-primary/10 text-primary font-semibold">
                {user.name}
              </Badge>
            </div>

            {/* Role Buttons Stack with Clear Labels and Spacing */}
            <div className="grid grid-cols-2 gap-2">
              {rolesList.map((r) => {
                const Icon = r.icon;
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all touch-manipulation min-h-[44px] ${
                      isActive
                        ? "bg-primary text-primary-foreground border border-primary shadow-xs font-semibold"
                        : "bg-background/90 hover:bg-muted border border-border/70 text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium leading-tight truncate">{r.name}</p>
                      <p className={`text-[10px] truncate ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
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
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Recovery Practice Workspace
                </p>
                <span className="text-[10px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                  14 tools
                </span>
              </div>
              
              <div className="space-y-1">
                {workspaceLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[46px] flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all touch-manipulation text-left ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/25 shadow-2xs"
                          : "text-foreground/80 hover:bg-muted/70 hover:text-foreground border border-transparent"
                      } ${item.isSpecial && !isActive ? "text-primary/95" : ""}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : item.isSpecial
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-tight truncate">{item.label}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
                        </div>
                      </div>
                      {item.isSpecial && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary shrink-0 ml-2">
                          Studio
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Public Educational & Site Pages */}
            <div className="pt-2 border-t border-border/40">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">
                Public Exploration & Resources
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {siteLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`min-h-[44px] flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors touch-manipulation text-left ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/20"
                          : "text-foreground/75 hover:bg-muted/70 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Drawer Footer */}
        <div className="p-3.5 sm:p-4 border-t border-border/60 bg-muted/25 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => handleLinkClick("/settings")}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors text-[11px] min-h-[36px] touch-manipulation"
          >
            <Settings className="h-3.5 w-3.5 text-primary" />
            <span>Settings & Privacy</span>
          </button>

          <div className="flex items-center gap-2.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleLinkClick("/privacy")}
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleLinkClick("/terms")}
              className="hover:text-foreground transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
