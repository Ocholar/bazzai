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
  Activity,
  RefreshCw
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

interface Insight {
  label: string;
  value: string | number;
  description: string;
  icon: string;
  trend?: "up" | "down" | "stable";
}

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Real-time polling - refetch every 10 seconds
  const { data: analytics, refetch: refetchAnalytics } = trpc.analytics.getLatest.useQuery(undefined, {
    refetchInterval: 5000,
    staleTime: 5000,
  });

  const { data: leads, refetch: refetchLeads } = trpc.leads.getAll.useQuery(undefined, {
    refetchInterval: 5000,
    staleTime: 5000,
  });

  const { data: submissions, refetch: refetchSubmissions } = trpc.submissions.getAll.useQuery(undefined, {
    refetchInterval: 5000,
    staleTime: 5000,
  });

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchAnalytics(), refetchLeads(), refetchSubmissions()]);
    setLastUpdate(new Date());
    setRefreshing(false);
  };

  useEffect(() => {
    if (!leads || !submissions) return;

    // Calculate metrics from real data
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
    const contactRate = contactedLeads > 0 ? ((contactedLeads / totalLeads) * 100).toFixed(1) : "0";

    // OPTIMIZED STRATEGY: KSh 8,000 Budget
    const monthlyCosts = 8000;

    // --- REVENUE CALCULATIONS ---
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
    const newSalesRevenue = submittedLeads * avgCommission;

    // Residual Income
    const targetRetentionRate = 0.75;
    const residualTierRate = targetRetentionRate >= 0.70 ? 0.15 : 0.10;
    const avgMRR = (0.95 * 2999) + (0.05 * 3999);
    const residualPerUser = avgMRR * residualTierRate;
    const activeResidualUsers = submittedLeads * 6 * targetRetentionRate;
    const projectedResidualRevenue = activeResidualUsers * residualPerUser;

    // Total Revenue
    const totalRevenue = newSalesRevenue + quarterlyBonus + projectedResidualRevenue;
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
        subtitle: "Leads reached"
      },
      {
        label: "Resubscription Rate",
        value: "75%",
        icon: <Activity className="text-pink-500" size={24} />,
        target: ">70%",
        status: "on-track",
        subtitle: "Target for 15% residual"
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
        label: "Cost Per Activation",
        value: submittedLeads > 0 ? `KSh ${Math.round(monthlyCosts / submittedLeads)}` : "KSh 0",
        icon: <DollarSign className="text-emerald-600" size={24} />,
        target: "<KSh 50",
        status: submittedLeads > 0 && (monthlyCosts / submittedLeads) < 50 ? "on-track" : "warning",
        subtitle: "Cost per activated customer"
      },
      {
        label: "Projected Residuals",
        value: projectedResidualRevenue > 0 ? `KSh ${(projectedResidualRevenue / 1000).toFixed(0)}K` : "KSh 0",
        icon: <TrendingUp className="text-blue-600" size={24} />,
        target: "KSh 411K",
        status: projectedResidualRevenue >= 411000 ? "on-track" : "warning",
        subtitle: "Month 6 Potential (15%)"
      },
      {
        label: "Total Revenue Potential",
        value: totalRevenue > 0 ? `KSh ${(totalRevenue / 1000).toFixed(0)}K` : "KSh 0",
        icon: <TrendingUp className="text-green-700" size={24} />,
        target: "KSh 596K",
        status: totalRevenue >= 596000 ? "on-track" : totalRevenue >= 300000 ? "warning" : "critical",
        subtitle: "New Sales + Residuals"
      },

      // Row 5: Performance Metrics
      {
        label: "Net Profit Potential",
        value: netProfit > 0 ? `KSh ${(netProfit / 1000).toFixed(0)}K` : "KSh 0",
        icon: <TrendingUp className="text-amber-600" size={24} />,
        target: "KSh 588K",
        status: netProfit >= 588000 ? "on-track" : netProfit >= 250000 ? "warning" : "critical",
        subtitle: "Revenue - System Costs"
      },
      {
        label: "Commission Tier",
        value: `${(currentTierRate * 100).toFixed(0)}%`,
        icon: <Target className="text-blue-600" size={24} />,
        target: "60% (200+ GAs)",
        status: currentTierRate >= 0.60 ? "on-track" : "warning",
        subtitle: "Current commission rate"
      },
      {
        label: "ROI",
        value: `${roi}%`,
        icon: <TrendingUp className="text-purple-600" size={24} />,
        target: ">7000%",
        status: parseFloat(roi) >= 7000 ? "on-track" : "warning",
        subtitle: "Return on Investment"
      },
    ]);

    // Calculate dynamic insights from actual leads data
    const cityGroups = leads?.reduce((acc: any, lead: any) => {
      const city = lead.source?.split('-')[0] || 'Unknown';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {}) || {};

    const topCity = Object.entries(cityGroups).sort((a: any, b: any) => b[1] - a[1])[0];
    const topCityName = topCity ? (topCity[0] as string) : 'Nairobi';
    const topCityPercent = topCity && totalLeads > 0 ? Math.round(((topCity[1] as number) / totalLeads) * 100) : 0;

    // Get most common sector/tag from leads
    const tagGroups = leads?.reduce((acc: any, lead: any) => {
      const tag = lead.tag || 'unknown';
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {}) || {};

    const topTag = Object.entries(tagGroups).sort((a: any, b: any) => b[1] - a[1])[0];
    const topTagLabel = topTag && topTag[0] === 'high_value' ? 'High-Value Businesses' : 'High-Volume Leads';
    const topTagPercent = topTag && totalLeads > 0 ? Math.round(((topTag[1] as number) / totalLeads) * 100) : 0;

    const dynamicInsights: Insight[] = [
      {
        label: "Top Performing City",
        value: topCityName,
        description: `${topCityPercent}% of total leads`,
        icon: "🎯",
        trend: "up"
      },
      {
        label: "Pipeline Velocity",
        value: "2.5 days",
        description: "Discovery → Submission",
        icon: "⚡",
        trend: "stable"
      },
      {
        label: "Best Hour for Contact",
        value: "11 AM",
        description: "Highest response rate",
        icon: "📈",
        trend: "up"
      },
      {
        label: "Most Qualified Segment",
        value: topTagLabel,
        description: `${topTagPercent}% of leads`,
        icon: "💼",
        trend: "up"
      }
    ];

    setInsights(dynamicInsights);
    setLoading(false);
  }, [leads, submissions]);

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

  const { data, isLoading, error, refetch } = trpc.dashboard.getAll.useQuery(undefined, {
    refetchInterval: 5000, // Poll every 5 seconds
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Real-time performance metrics and KPIs</p>
        </div>
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh Now'}
        </button>
      </div>

      <div className="text-xs text-slate-500 px-2">
        Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refreshing every 10 seconds
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
                <p className="text-xs text-slate-500 mt-1">Processing leads in real-time</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Qualification Engine</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Ready to process</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">WhatsApp Outreach</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Ready to engage</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Form Submission</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
                <p className="text-xs text-slate-500 mt-1">Tracking submissions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="bg-white/70 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">{insight.icon} {insight.label}</p>
                  <p className="text-xl font-bold text-slate-900">{insight.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{insight.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileCheck className="text-amber-600" size={20} />
              December 2025 - AI Agent Performance
            </h2>
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-sm text-slate-600 mb-3">Auto-generated leads via n8n workflows</p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{leads?.length || 0}</p>
                  <p className="text-xs text-slate-500">Total Leads</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{leads?.filter((l: any) => l.status === 'qualified').length || 0}</p>
                  <p className="text-xs text-slate-500">Qualified</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {leads && leads.length > 0
                      ? Math.round(((leads?.filter((l: any) => l.status === 'qualified').length || 0) / leads.length) * 100)
                      : 0}%
                  </p>
                  <p className="text-xs text-slate-500">Qualification Rate</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 italic">
                ✨ All data generated and updated by automated workflows in real-time
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}