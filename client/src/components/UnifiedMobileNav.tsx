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
} from "lucide-react";

interface UnifiedMobileNavProps {
  /** Optional custom trigger button or icon styling */
  triggerClassName?: string;
  /** Optional variant indicator */
  variant?: "site" | "dashboard" | "admin";
}

const workspaceLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/progress", label: "21 Dimensions Progress", icon: BarChart3 },
  { href: "/check-ins", label: "Daily Check-in", icon: CheckCircle2 },
  { href: "/check-in-history", label: "Check-in History", icon: History },
  { href: "/journal", label: "Recovery Journal", icon: BookOpen },
  { href: "/goals", label: "Goals & Intentions", icon: Target },
  { href: "/rules", label: "Rules & Boundaries", icon: ShieldAlert },
  { href: "/guides", label: "Recovery Guides", icon: Compass },
  { href: "/community", label: "Community Circles", icon: Users },
  { href: "/music", label: "Calming Soundscapes", icon: Music },
  { href: "/devotional", label: "Daily Devotional", icon: HeartHandshake },
  { href: "/newsletter", label: "Newsletter", icon: Newspaper },
  { href: "/admin", label: "Admin Control Studio", icon: ShieldCheck, isSpecial: true },
  { href: "/settings", label: "Settings", icon: Settings },
];

const siteLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/how-it-works", label: "How It Works", icon: Sparkles },
  { href: "/dimensions", label: "21 Dimensions Explained", icon: Layers },
  { href: "/daily-practice", label: "Daily Practice Guide", icon: Compass },
  { href: "/success", label: "Recovery Stories", icon: Award },
  { href: "/supporters", label: "For Supporters & Allies", icon: HeartHandshake },
  { href: "/about", label: "Our Approach & Story", icon: Info },
  { href: "/faq", label: "Frequently Asked Questions", icon: HelpCircle },
  { href: "/contact", label: "Contact & Support", icon: Mail },
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
        className="w-[88vw] max-w-sm sm:max-w-md p-0 flex flex-col bg-background/98 backdrop-blur-2xl border-r border-border/70"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-4 sm:p-5 border-b border-border/60 text-left bg-muted/20">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleLinkClick("/")}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <BrandLogoIcon size={34} className="transition-transform group-hover:-rotate-6" />
              <div>
                <SheetTitle className="font-serif text-xl font-bold tracking-tight text-foreground leading-none">
                  Re<span className="text-primary font-extrabold">Forge</span>
                </SheetTitle>
                <p className="text-[11px] text-muted-foreground mt-0.5">Whole-Life Recovery Platform</p>
              </div>
            </button>
          </div>

          {/* Persona Switcher Inside Menu */}
          <div className="mt-3 pt-3 border-t border-border/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" /> Active Demo Role:
              </span>
              <Badge variant="outline" className="text-[10px] px-2 py-0 border-primary/40 bg-primary/10 text-primary font-semibold">
                {user.name}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleRoleChange("member")}
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border text-left transition-all touch-manipulation ${
                  role === "member"
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background/80 hover:bg-muted border-border/60 text-foreground"
                }`}
              >
                <User className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Member (Sam)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("supporter")}
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border text-left transition-all touch-manipulation ${
                  role === "supporter"
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background/80 hover:bg-muted border-border/60 text-foreground"
                }`}
              >
                <HeartHandshake className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Supporter (Sarah)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("coach")}
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border text-left transition-all touch-manipulation ${
                  role === "coach"
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background/80 hover:bg-muted border-border/60 text-foreground"
                }`}
              >
                <Stethoscope className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Coach (Marcus)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border text-left transition-all touch-manipulation ${
                  role === "admin"
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background/80 hover:bg-muted border-border/60 text-foreground"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Admin (Alex)</span>
              </button>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Navigation Body */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-6">
            {/* Recovery App Workspace Section */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-2.5 mb-2">
                Recovery Workspace
              </p>
              <div className="space-y-1">
                {workspaceLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-manipulation text-left ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/20"
                          : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                      } ${item.isSpecial && !isActive ? "text-primary/90" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : item.isSpecial ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.isSpecial && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
                          Studio
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Public Educational & Site Pages */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-2.5 mb-2">
                Public Exploration & Resources
              </p>
              <div className="space-y-1">
                {siteLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors touch-manipulation text-left ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/20"
                          : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border/60 bg-muted/20 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ThemeToggle compact />
            <span className="text-[11px]">Theme</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
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
