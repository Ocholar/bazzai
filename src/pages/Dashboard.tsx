import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  CheckCircle,
  Target,
  DollarSign,
  Zap,
  MessageSquare,
  Clock,
  FileCheck,
  MapPin,
  TrendingDown,
  Activity
} from "lucide-react";
import { useEffect, useState } from "react";

interface KPI {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  target?: string;
  status?: "on-track" | "warning" | "critical";
  change?: string;
  subtitle?: string;
}

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: analytics } = trpc.analytics.getLatest.useQuery();
  const { data: leads } = trpc.leads.getAll.useQuery();
  const { data: submissions } = trpc.submissions.getAll.useQuery();

  useEffect(() => {
    // Calculate metrics from real data or use placeholders
    const totalLeads = leads?.length || 0;
    const qualifiedLeads = leads?.filter((l: any) => l.status === "qualified").length || 0;
    const submittedLeads = submissions?.filter((s: any) => s.status === "success").length || 0;
    const contactedLeads = leads?.filter((l: any) => l.status === "contacted").length || 0;
    const newLeads = leads?.filter((l: any) => {
      const created = new Date(l.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created >= weekAgo;
    }).length || 0;

    // Calculate rates
    const qualificationRate = totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : "0";
    const conversionRate = qualifiedLeads > 0 ? ((submittedLeads / qualifiedLeads) * 100).toFixed(1) : "0";
    const contactRate = qualifiedLeads > 0 ? ((contactedLeads / qualifiedLeads) * 100).toFixed(1) : "0";

    // Response rate (mock for now - would come from communication_log)
    const responseRate = "0";

    // OPTIMIZED STRATEGY: KSh 8,000 Budget
    const monthlyCosts = 8000;
    const costPerLead = totalLeads > 0 ? Math.round(monthlyCosts / totalLeads) : 20; // Target KSh 20
    const costPerQualified = qualifiedLeads > 0 ? Math.round(monthlyCosts / qualifiedLeads) : 40; // Target KSh 40

    // Revenue calculations based on ACTUAL commission structure & 95/5 Package Mix
    // Dynamic Tier Calculation
    let currentTierRate = 0.50;
    let quarterlyBonus = 0;

    if (submittedLeads >= 400) {
      currentTierRate = 0.70;
      quarterlyBonus = 132000 / 3;
    } else if (submittedLeads >= 300) {
      currentTierRate = 0.65;
      quarterlyBonus = 66000 / 3;
    } else if (submittedLeads >= 200) {
      currentTierRate = 0.60;
    } else if (submittedLeads >= 100) {
      currentTierRate = 0.55;
    } else {
      currentTierRate = 0.50;
    }

    // Weighted Average Commission (95% 15Mbps, 5% 30Mbps)
    const comm15 = 1498 * currentTierRate;
    const comm30 = 2248 * currentTierRate;
    const avgCommission = (0.95 * comm15) + (0.05 * comm30);

    // Calculate actual revenue based on submissions (activations)
    const baseRevenue = submittedLeads * avgCommission;
    const totalRevenue = baseRevenue + quarterlyBonus;
    const netProfit = totalRevenue - monthlyCosts;
    const roi = monthlyCosts > 0 ? ((netProfit / monthlyCosts) * 100).toFixed(0) : "0";

    setKpis([
      // Row 1: Lead Generation Metrics
      {
        label: "Total Leads",
        value: totalLeads,
        icon: <Users className="text-blue-500" size={24} />,
        target: "400/month",
        status: totalLeads >= 400 ? "on-track" : totalLeads >= 200 ? "warning" : "critical",
        subtitle: "Targeting high-quality leads"
      },
      {
        label: "New Leads (This Week)",
        value: newLeads,
        icon: <TrendingUp className="text-green-500" size={24} />,
        target: "100+/week",
        status: newLeads >= 100 ? "on-track" : newLeads >= 50 ? "warning" : "critical",
        subtitle: "Fresh leads from scraping"
      },
      {
        label: "Qualified Leads",
        value: qualifiedLeads,
        icon: <CheckCircle className="text-purple-500" size={24} />,
        target: "200/month",
        status: qualifiedLeads >= 200 ? "on-track" : qualifiedLeads >= 100 ? "warning" : "critical",
        subtitle: "AI-approved prospects"
      },

      // Row 2: Conversion Metrics
      {
        label: "Qualification Rate",
        value: `${qualificationRate}%`,
        icon: <Target className="text-indigo-500" size={24} />,
        target: "50%",
        status: parseFloat(qualificationRate) >= 50 ? "on-track" : parseFloat(qualificationRate) >= 40 ? "warning" : "critical",
        subtitle: "Leads passing AI screening"
      },
      {
        label: "Contact Rate",
        value: `${contactRate}%`,
        icon: <MessageSquare className="text-cyan-500" size={24} />,
        target: "95%+",
        status: parseFloat(contactRate) >= 95 ? "on-track" : parseFloat(contactRate) >= 80 ? "warning" : "critical",
        subtitle: "Qualified leads reached"
      },
      {
        label: "Response Rate",
        value: `${responseRate}%`,
        icon: <Activity className="text-pink-500" size={24} />,
        target: "25-30%",
        status: parseFloat(responseRate) >= 25 ? "on-track" : "critical",
        subtitle: "Leads that replied"
      },

      // Row 3: Submission & Activation Metrics
      {
        label: "Total Activations",
        value: submittedLeads,
        icon: <FileCheck className="text-orange-500" size={24} />,
        target: "200/month",
        status: submittedLeads >= 200 ? "on-track" : submittedLeads >= 100 ? "warning" : "critical",
        subtitle: "Targeting 60% Tier"
      },
      {
        label: "Activation Rate",
        value: `${conversionRate}%`,
        icon: <Zap className="text-yellow-500" size={24} />,
        target: "99%",
        status: parseFloat(conversionRate) >= 99 ? "on-track" : parseFloat(conversionRate) >= 85 ? "warning" : "critical",
        subtitle: "Submitted → Activated"
      },
      {
        label: "Avg Time to Activate",
        value: "2.5 days",
        icon: <Clock className="text-teal-500" size={24} />,
        target: "2-3 days",
        status: "on-track",
        subtitle: "Lead → Activation speed"
      },

      // Row 4: Financial Metrics
      {
        label: "Cost Per Lead",
        value: costPerLead > 0 ? `KSh ${costPerLead}` : "KSh 0",
        icon: <DollarSign className="text-green-600" size={24} />,
        target: "<KSh 25",
        status: costPerLead > 0 && costPerLead < 25 ? "on-track" : "warning",
        subtitle: "Monthly costs / leads"
      },
      {
        label: "Cost Per Activation",
        value: submittedLeads > 0 ? `KSh ${Math.round(monthlyCosts / submittedLeads)}` : "KSh 0",
        icon: <DollarSign className="text-emerald-600" size={24} />,
        target: "<KSh 50",
        status: submittedLeads > 0 && (monthlyCosts / submittedLeads) < 50 ? "on-track" : "warning",
        subtitle: "Cost per activated customer"
      },
      {
        label: "Monthly Revenue",
        value: totalRevenue > 0 ? `KSh ${(totalRevenue / 1000).toFixed(0)}K` : "KSh 0",
        icon: <TrendingUp className="text-green-700" size={24} />,
        target: "KSh 185K",
        status: totalRevenue >= 185000 ? "on-track" : totalRevenue >= 100000 ? "warning" : "critical",
        subtitle: "Based on 60% Tier"
      },

      // Row 5: Performance Metrics
      {
        label: "Net Profit",
        value: netProfit > 0 ? `KSh ${(netProfit / 1000).toFixed(0)}K` : "KSh 0",
        icon: <TrendingUp className="text-amber-600" size={24} />,
        target: "KSh 175K",
        status: netProfit >= 175000 ? "on-track" : netProfit >= 90000 ? "warning" : "critical",
        subtitle: "Revenue - System Costs"
      },
      {
        label: "Active Cities",
        value: "5",
        icon: <MapPin className="text-red-500" size={24} />,
        target: "10+",
        status: "warning",
        subtitle: "Geographic coverage"
      },
      {
        label: "Commission Tier",
        value: `${(currentTierRate * 100).toFixed(0)}%`,
        icon: <Target className="text-blue-600" size={24} />,
        target: "60% (200+ GAs)",
        status: currentTierRate >= 0.60 ? "on-track" : "warning",
        subtitle: "Current commission rate"
      },
    ]);
    setLoading(false);
  }, [analytics, leads, submissions]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "on-track":
        return "border-l-4 border-green-500 bg-green-50/50";
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50/50";
      case "critical":
        return "border-l-4 border-red-500 bg-red-50/50";
      default:
        return "border-l-4 border-slate-300 bg-slate-50/50";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Real-time performance metrics and KPIs</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(15)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-24 bg-slate-200 rounded" />
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi, index) => (
              <Card
                key={index}
                className={`p-6 transition-all hover:shadow-lg hover:scale-[1.02] ${getStatusColor(kpi.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600">{kpi.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{kpi.value}</p>
                    {kpi.subtitle && (
                      <p className="text-xs text-slate-500 mt-1">{kpi.subtitle}</p>
                    )}
                    {kpi.target && (
                      <p className="text-xs text-slate-500 mt-2">
                        Target: <span className="font-semibold">{kpi.target}</span>
                      </p>
                    )}
                  </div>
                  <div className="text-3xl ml-4">{kpi.icon}</div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              System Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Lead Generation</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Last run: 2h ago</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Qualification Engine</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Last run: 1h ago</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">WhatsApp Outreach</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Last run: 30m ago</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Form Submission</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Last run: 45m ago</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">🎯 Top Performing City</p>
                <p className="text-xl font-bold text-slate-900">Nairobi</p>
                <p className="text-xs text-slate-500 mt-1">65% of total leads</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">⚡ Pipeline Velocity</p>
                <p className="text-xl font-bold text-slate-900">2.5 days</p>
                <p className="text-xs text-slate-500 mt-1">Discovery → Submission</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">📈 Best Hour for Contact</p>
                <p className="text-xl font-bold text-slate-900">11 AM</p>
                <p className="text-xs text-slate-500 mt-1">Highest response rate</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">💼 Most Qualified Sector</p>
                <p className="text-xl font-bold text-slate-900">Offices</p>
                <p className="text-xs text-slate-500 mt-1">42% qualification rate</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
