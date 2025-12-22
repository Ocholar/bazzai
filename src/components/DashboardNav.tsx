import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, LogOut, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export function DashboardNav() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Leads", href: "/leads", icon: "👥" },
    { label: "Submissions", href: "/submissions", icon: "📝" },
    { label: "Analytics", href: "/analytics", icon: "📈" },
    { label: "Configuration", href: "/configuration", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white">
        <h1 className="text-xl font-bold">BAZZ AI</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-slate-900 text-white p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">BAZZ AI</h1>
          <p className="text-sm text-slate-400">Agentic Team</p>
        </div>

        <nav className="space-y-2 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors block"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-700 pt-4">
          <div className="mb-4 p-3 bg-slate-800 rounded-lg">
            <p className="text-sm text-slate-400">Logged in as</p>
            <p className="font-semibold">{user?.name || "User"}</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full text-slate-900"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
