import React, { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Leads from "@/pages/Leads";
import Analytics from "@/pages/Analytics";
import Submissions from "@/pages/Submissions";
import Configuration from "@/pages/Configuration";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import superjson from "superjson";
import { Toaster } from "@/components/ui/sonner";

// Protected Route Wrapper
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    // We use useEffect to avoid state update during render if possible, 
    // but here we are in render. Better to return null and redirect.
    // However, wouter's setLocation might trigger state update.
    // Let's just render nothing and redirect.
    setTimeout(() => setLocation("/login"), 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Admin Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-slate-900">Bazztech Admin</div>
        <div className="flex gap-4">
          <a href="/dashboard" className="text-slate-600 hover:text-blue-600">Dashboard</a>
          <a href="/leads" className="text-slate-600 hover:text-blue-600">Leads</a>
          <a href="/analytics" className="text-slate-600 hover:text-blue-600">Analytics</a>
          <a href="/submissions" className="text-slate-600 hover:text-blue-600">Submissions</a>
          <a href="/configuration" className="text-slate-600 hover:text-blue-600">Config</a>
        </div>
      </nav>
      <div className="p-6 max-w-7xl mx-auto">
        <Component />
      </div>
    </div>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    // Cast to any to avoid type errors if AppRouter definition is missing or broken
    (trpc as any).createClient({
      links: [
        httpBatchLink({
          url: "https://bazz-ai-agentic-team-production-3203.up.railway.app/api/trpc",
          async headers() {
            return {};
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
          transformer: superjson,
        }),
      ],
    })
  );

  // Cast trpc.Provider to any to avoid type errors
  const TrpcProvider = (trpc as any).Provider;

  return (
    <TrpcProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />

            {/* Protected Routes */}
            <Route path="/dashboard">
              <ProtectedRoute component={Dashboard} />
            </Route>
            <Route path="/leads">
              <ProtectedRoute component={Leads} />
            </Route>
            <Route path="/submissions">
              <ProtectedRoute component={Submissions} />
            </Route>
            <Route path="/analytics">
              <ProtectedRoute component={Analytics} />
            </Route>
            <Route path="/configuration">
              <ProtectedRoute component={Configuration} />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </QueryClientProvider>
    </TrpcProvider>
  );
}
