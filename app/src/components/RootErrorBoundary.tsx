import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[HELIOS-3D] Top-level runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleSafeMode = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Ignore storage errors
    }
    window.location.href = '/?mode=briefing';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-obsidian-0 text-cream flex flex-col items-center justify-center p-6 select-none font-sans">
          <div className="max-w-lg w-full bg-obsidian-1 border border-obsidian-3 rounded-xl p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-amber animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-amber font-mono font-bold">
                HELIOS-3D · System Recovery
              </span>
            </div>

            <h1 className="text-xl font-bold text-cream mb-2 font-display">
              Spatial Interface Recovery
            </h1>

            <p className="text-sm text-sand/80 leading-relaxed mb-6">
              A runtime exception occurred in the spatial rendering layer. You can reload the interface or continue in 2D Executive Briefing mode.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 bg-obsidian-2 rounded border border-obsidian-3/60 text-xs font-mono text-amber/90 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 px-4 py-2.5 rounded-lg bg-amber text-obsidian-0 text-sm font-semibold hover:bg-amber/90 transition shadow-md cursor-pointer"
              >
                Reload Cosmos
              </button>
              <button
                type="button"
                onClick={this.handleSafeMode}
                className="flex-1 px-4 py-2.5 rounded-lg bg-obsidian-2 text-sand text-sm font-medium border border-obsidian-3 hover:bg-obsidian-3 hover:text-cream transition cursor-pointer"
              >
                2D Briefing Mode
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
