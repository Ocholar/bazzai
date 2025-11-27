import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { DashboardNav } from "./components/DashboardNav";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Submissions from "./pages/Submissions";
import Analytics from "./pages/Analytics";
import Configuration from "./pages/Configuration";
import { useAuth } from "./_core/hooks/useAuth";
import { getLoginUrl } from "./const";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100">
      <DashboardNav />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function RouterComponent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Public routes - always accessible */}
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />

      {/* Protected dashboard routes */}
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" component={() => <DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/leads" component={() => <DashboardLayout><Leads /></DashboardLayout>} />
          <Route path="/submissions" component={() => <DashboardLayout><Submissions /></DashboardLayout>} />
          <Route path="/analytics" component={() => <DashboardLayout><Analytics /></DashboardLayout>} />
          <Route path="/configuration" component={() => <DashboardLayout><Configuration /></DashboardLayout>} />
        </>
      ) : (
        <Route path="/dashboard*" component={() => {
          window.location.href = getLoginUrl();
          return null;
        }} />
      )}

      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router base="/bazzai">
            <RouterComponent />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
