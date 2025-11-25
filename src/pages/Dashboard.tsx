import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, CheckCircle, Target, DollarSign, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface KPI {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  target?: string;
  status?: "on-track" | "warning" | "critical";
}

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: analytics } = trpc.analytics.getLatest.useQuery();
  const { data: leads } = trpc.leads.getAll.useQuery();
  const { data: submissions } = trpc.submissions.getAll.useQuery();

  useEffect(() => {
    if (analytics && leads && submissions) {
      const totalLeads = leads.length;
      const qualifiedLeads = leads.filter((l: any) => l.status === "qualified").length;
      const submittedLeads = submissions.filter((s: any) => s.status === "success").length;
      const package30Count = leads.filter((l: any) => l.preferredPackage === "30mbps").length;
      const conversionRate = totalLeads > 0 ? ((submittedLeads / totalLeads) * 100).toFixed(2) : "0";
      const package30Mix = totalLeads > 0 ? ((package30Count / totalLeads) * 100).toFixed(2) : "0";

      setKpis([
        {
          label: "Monthly Gross Adds",
          value: submittedLeads,
          icon: <TrendingUp className="text-green-500" />,
          target: "400+",
          status: submittedLeads >= 400 ? "on-track" : submittedLeads >= 200 ? "warning" : "critical",
        },
        {
          label: "Total Leads",
          value: totalLeads,
          icon: <Users className="text-blue-500" />,
          target: "600+",
          status: totalLeads >= 600 ? "on-track" : totalLeads >= 300 ? "warning" : "critical",
        },
        {
          label: "Conversion Rate",
          value: `${conversionRate}%`,
          icon: <CheckCircle className="text-purple-500" />,
          target: "20%+",
          status: parseFloat(conversionRate) >= 20 ? "on-track" : parseFloat(conversionRate) >= 10 ? "warning" : "critical",
        },
        {
          label: "30Mbps Package Mix",
          value: `${package30Mix}%`,
          icon: <Target className="text-orange-500" />,
          target: "70%+",
          status: parseFloat(package30Mix) >= 70 ? "on-track" : parseFloat(package30Mix) >= 50 ? "warning" : "critical",
        },
        {
          label: "Avg Commission per GA",
          value: "KES 2,500+",
          icon: <DollarSign className="text-green-600" />,
          target: "KES 2,500+",
        },
        {
          label: "Submission Success Rate",
          value: submissions.length > 0 ? `${((submittedLeads / submissions.length) * 100).toFixed(2)}%` : "0%",
          icon: <Zap className="text-yellow-500" />,
          target: ">97%",
          status: submissions.length > 0 && (submittedLeads / submissions.length) >= 0.97 ? "on-track" : "warning",
        },
      ]);
      setLoading(false);
    }
  }, [analytics, leads, submissions]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "on-track":
        return "border-l-4 border-green-500 bg-green-50";
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "critical":
        return "border-l-4 border-red-500 bg-red-50";
      default:
        return "border-l-4 border-slate-300 bg-slate-50";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Real-time performance metrics and KPIs</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-20 bg-slate-200 rounded" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi, index) => (
            <Card
              key={index}
              className={`p-6 transition-all hover:shadow-lg ${getStatusColor(kpi.status)}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{kpi.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{kpi.value}</p>
                  {kpi.target && (
                    <p className="text-xs text-slate-500 mt-2">Target: {kpi.target}</p>
                  )}
                </div>
                <div className="text-3xl">{kpi.icon}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-slate-600">Lead Generation</p>
            <p className="text-lg font-semibold text-green-600">✓ Active</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Qualification Engine</p>
            <p className="text-lg font-semibold text-green-600">✓ Active</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Form Submission</p>
            <p className="text-lg font-semibold text-green-600">✓ Active</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
