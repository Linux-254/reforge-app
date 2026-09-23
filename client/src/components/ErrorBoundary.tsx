import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home, Sparkles } from "lucide-react";
import { Component, ReactNode, ErrorInfo } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback(
            this.state.error || new Error("Unknown error"),
            this.resetErrorBoundary
          );
        }
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] w-full items-center justify-center p-6 bg-background">
          <div className="flex flex-col items-center w-full max-w-xl p-8 rounded-3xl border border-border/80 bg-card shadow-sm text-center">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 grid place-items-center mb-6">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2">
              This space is taking a quiet breath
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
              A temporary display pause occurred. Your recovery practice, check-in history, and private records remain safe and untouched.
            </p>

            {this.state.error?.message && (
              <div className="p-3 w-full rounded-xl bg-muted/60 text-xs text-muted-foreground font-mono mb-6 text-left overflow-auto max-h-28">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={this.resetErrorBoundary}
                className="rounded-full px-5 gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Resume space
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="rounded-full px-5 gap-2"
              >
                <Home className="h-4 w-4" />
                Return home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

