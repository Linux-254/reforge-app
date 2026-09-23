import { useDemoSession, DemoRole } from "@/lib/demoSession";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, User, Users, HeartHandshake, Stethoscope, ChevronRight, Sparkles, Compass } from "lucide-react";
import { useLocation } from "wouter";

interface DemoRoleBarProps {
  compact?: boolean;
}

export function DemoRoleBar({ compact = false }: DemoRoleBarProps) {
  const { role, setRole, user } = useDemoSession();
  const [location, setLocation] = useLocation();

  const handleRoleSelect = (newRole: DemoRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      setLocation("/admin");
    } else if (location === "/admin") {
      setLocation("/dashboard");
    }
  };

  const rolesConfig: { role: DemoRole; label: string; description: string; icon: typeof ShieldCheck }[] = [
    { role: "admin", label: "Admin", description: "Full platform content CRUD, users, dimensions & logs", icon: ShieldCheck },
    { role: "member", label: "Member", description: "Personal recovery practice, check-ins, journal & goals", icon: User },
    { role: "supporter", label: "Supporter", description: "Recovery partner view, encouragement & shared metrics", icon: HeartHandshake },
    { role: "coach", label: "Coach", description: "Clinical caseload, risk flags, sentiment & guides", icon: Stethoscope },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1 overflow-x-auto p-1 bg-muted/60 rounded-full border border-border/60">
        {rolesConfig.map((item) => {
          const Icon = item.icon;
          const isActive = role === item.role;
          return (
            <button
              key={item.role}
              type="button"
              onClick={() => handleRoleSelect(item.role)}
              className={`flex min-h-[36px] items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-all touch-manipulation ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full border-b border-primary/15 bg-card/60 backdrop-blur-md px-3 sm:px-6 py-2.5 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 rounded-full border-primary/30 bg-primary/10 text-primary font-bold px-2.5 py-1 text-xs">
            <Sparkles className="h-3 w-3" /> Demo Sandbox
          </Badge>
          <span className="hidden xl:inline text-muted-foreground text-[11px]">
            · Switch roles to test all perspectives:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {rolesConfig.map((item) => {
            const Icon = item.icon;
            const isActive = role === item.role;
            return (
              <Button
                key={item.role}
                type="button"
                size="sm"
                variant={isActive ? "default" : "ghost"}
                onClick={() => handleRoleSelect(item.role)}
                className={`min-h-[40px] sm:min-h-[34px] rounded-full px-3.5 text-xs gap-1.5 transition-all touch-manipulation ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/75 hover:text-foreground hover:bg-muted/80"
                }`}
                title={item.description}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="font-semibold">{item.label}</span>
                {isActive && <span className="hidden md:inline text-[10px] opacity-85">({user.name.split(" ")[0]})</span>}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
