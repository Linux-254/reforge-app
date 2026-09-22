import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Leaf, Menu, ArrowUpRight, X, Sparkles, ShieldCheck, Compass } from "lucide-react";
import { BrandLogoIcon } from "@/components/BrandLogo";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/dimensions", label: "21 dimensions" },
  { href: "/daily-practice", label: "Daily practice" },
  { href: "/success", label: "Stories" },
  { href: "/supporters", label: "Supporters" },
  { href: "/faq", label: "FAQ" },
];

const footerColumns = [
  {
    heading: "Explore",
    links: navLinks.slice(0, 3),
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "Our approach" },
      { href: "/supporters", label: "For supporters" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Care",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Top Demo Banner */}
      <div className="border-b border-primary/20 bg-primary/10 px-4 py-1.5 text-center text-xs font-medium text-primary flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Open Public Demo: Explore all recovery tools and roles without signing in.</span>
        <Link href="/dashboard" className="underline font-bold hover:text-primary/80">
          Open Demo →
        </Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3" aria-label="ReForge home">
            <BrandLogoIcon size={40} className="transition-transform duration-300 group-hover:-rotate-6" />
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Re<span className="text-primary font-extrabold">Forge</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-foreground/75"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle compact />
            
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex rounded-full text-xs font-semibold border-amber-600/40 text-amber-900 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20">
              <Link href="/presentation">
                <Compass className="mr-1.5 h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> Presentation Deck
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex rounded-full text-xs">
              <Link href="/admin">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-primary" /> Admin Studio
              </Link>
            </Button>

            <Button asChild size="sm" className="rounded-full px-4 text-xs font-semibold shadow-sm">
              <Link href="/dashboard">
                Explore Demo <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-card/60 text-foreground/80 hover:bg-muted lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-border/70 bg-background/95 backdrop-blur-2xl px-6 py-5 lg:hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary py-1 border-b border-border/30"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Button asChild className="w-full rounded-full text-xs font-semibold" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/presentation">
                    <Compass className="mr-1.5 h-4 w-4" /> Presentation Deck (22 Slides)
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full text-xs" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/dashboard">Enter Demo Workspace</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full text-xs" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/admin">Admin Studio</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="relative overflow-hidden border-t border-border/70 bg-[#1a251c] text-[#ece2d0]">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="container relative py-14">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-3 text-white">
                <BrandLogoIcon size={40} className="transition-transform duration-300 hover:scale-105" />
                <span className="font-serif text-2xl font-bold">
                  Re<span className="text-[#f2d39c]">Forge</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
                A gentle, evidence-based whole-life recovery companion for the honest work of becoming well again.
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f2d39c] hover:underline"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Launch Demo Roles
                </Link>
              </div>
            </div>
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                  {column.heading}
                </h3>
                <ul className="space-y-2.5 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 ReForge. Public demo architecture. Not an emergency medical service.</p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Built with care for steady days and hard mornings.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SiteNav() {
  return navLinks;
}
