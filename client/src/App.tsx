import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import SiteHome from "@/pages/site/Home";
import About from "@/pages/site/About";
import HowItWorks from "@/pages/site/HowItWorks";
import Dimensions from "@/pages/site/Dimensions";
import DailyPractice from "@/pages/site/DailyPractice";
import Success from "@/pages/site/Success";
import Faq from "@/pages/site/Faq";
import Supporters from "@/pages/site/Supporters";
import Contact from "@/pages/site/Contact";
import SignIn from "@/pages/site/SignIn";
import SupabaseCallback from "@/pages/site/SupabaseCallback";
import Privacy from "@/pages/site/Privacy";
import Terms from "@/pages/site/Terms";
import Dashboard from "@/pages/Dashboard";
import CheckIn from "@/pages/CheckIn";
import CheckInHistory from "@/pages/CheckInHistory";
import Devotional from "@/pages/Devotional";
import Admin from "@/pages/Admin";
import { NewsletterPage } from "@/pages/AdditionalFeatures";
import RulesPage from "@/pages/Rules";
import { GoalsPage, JournalPage, MusicPage, ProgressPage } from "@/pages/RecoveryWorkspace";
import Guides from "@/pages/Guides";
import Community from "@/pages/Community";
import Settings from "@/pages/Settings";
import OnboardingPage from "@/pages/Onboarding";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OAuthLoadingOverlay } from "./components/OAuthLoadingOverlay";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={SiteHome} />
      <Route path={"/about"} component={About} />
      <Route path={"/how-it-works"} component={HowItWorks} />
      <Route path={"/dimensions"} component={Dimensions} />
      <Route path={"/daily-practice"} component={DailyPractice} />
      <Route path={"/success"} component={Success} />
      <Route path={"/faq"} component={Faq} />
      <Route path={"/supporters"} component={Supporters} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/sign-in"} component={SignIn} />
      <Route path={"/auth/supabase/callback"} component={SupabaseCallback} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/progress"} component={ProgressPage} />
      <Route path={"/check-ins"} component={CheckIn} />
      <Route path={"/check-in-history"} component={CheckInHistory} />
      <Route path={"/journal"} component={JournalPage} />
      <Route path={"/rules"} component={RulesPage} />
      <Route path={"/goals"} component={GoalsPage} />
      <Route path={"/guides"} component={Guides} />
      <Route path={"/community"} component={Community} />
      <Route path={"/music"} component={MusicPage} />
      <Route path={"/devotional"} component={Devotional} />
      <Route path={"/newsletter"} component={NewsletterPage} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/onboarding"} component={OnboardingPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <OAuthLoadingOverlay />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
