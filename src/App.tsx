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
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import UserDataDeletion from "./pages/legal/UserDataDeletion";
import TermsOfService from "./pages/legal/TermsOfService";
import { useAuth } from "./_core/hooks/useAuth";
import { getLoginUrl } from "./const";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-100 overflow-hidden">
      <DashboardNav />
      <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
        <div className="p-4 md:p-8 pb-24 md:pb-8 min-h-full">
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
      {/* Public routes - always accessible */}
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/user-data-deletion-policy" component={UserDataDeletion} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/404" component={NotFound} />

      {/* Protected dashboard routes */}
      {isAuthenticated ? (
        <DashboardLayout>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/leads" component={Leads} />
            <Route path="/submissions" component={Submissions} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/configuration" component={Configuration} />
          </Switch>
        </DashboardLayout>
      ) : (
        <Route path="/dashboard*">
          {() => {
            window.location.href = getLoginUrl();
            return null;
          }}
        </Route>
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
          <Router>
            <RouterComponent />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
