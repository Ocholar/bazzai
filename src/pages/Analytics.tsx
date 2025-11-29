import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useMemo } from "react";

export default function Analytics() {
  const [daysBack, setDaysBack] = useState(30);

  const { data: leads } = trpc.leads.getAll.useQuery();
  const { data: submissions } = trpc.submissions.getAll.useQuery();

  // Calculate conversion funnel data
  const conversionFunnelData = useMemo(() => {
    if (!leads) return [];
    const statuses = ["new", "contacted", "qualified", "submitted", "installed"];
    return statuses.map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: leads.filter((l: any) => l.status === status).length,
    }));
  }, [leads]);

  // Calculate package mix data
  const packageMixData = useMemo(() => {
    if (!leads) return [];
    const package15 = leads.filter((l: any) => l.preferredPackage === "15mbps").length;
    const package30 = leads.filter((l: any) => l.preferredPackage === "30mbps").length;
    const unspecified = leads.filter((l: any) => l.preferredPackage === "unspecified").length;
    return [
      { name: "15Mbps", value: package15 },
      { name: "30Mbps", value: package30 },
      { name: "Unspecified", value: unspecified },
    ];
  }, [leads]);

  // Calculate source performance
  const sourcePerformanceData = useMemo(() => {
    if (!leads) return [];
    const sources = Array.from(new Set(leads.map((l: any) => l.source)));
    return sources.map((source: string) => {
      const sourceLeads = leads.filter((l: any) => l.source === source);
      const qualified = sourceLeads.filter((l: any) => l.status === "qualified").length;
      const submitted = sourceLeads.filter((l: any) => l.status === "submitted").length;
      return {
        name: source,
        total: sourceLeads.length,
        qualified,
        submitted,
        conversionRate: sourceLeads.length > 0 ? ((submitted / sourceLeads.length) * 100).toFixed(2) : "0",
      };
    });
  }, [leads]);

  // Calculate daily trends
  const dailyTrendsData = useMemo(() => {
    if (!leads) return [];
    const today = new Date();
    const data = [];
    for (let i = daysBack - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayLeads = leads.filter((l: any) => {
        const createdDate = typeof l.createdAt === 'string'
          ? l.createdAt.split("T")[0]
          : new Date(l.createdAt).toISOString().split("T")[0];
        return createdDate === dateStr;
      });
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        leads: dayLeads.length,
        qualified: dayLeads.filter((l: any) => l.status === "qualified").length,
        submitted: dayLeads.filter((l: any) => l.status === "submitted").length,
      });
    }
    return data;
  }, [leads, daysBack]);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics & Performance</h1>
        <p className="text-slate-600 mt-2">Detailed insights and performance trends</p>
      </div>

      {/* Time Range Selector */}
      <Card className="p-4">
        <div className="flex gap-2">
          {[7, 14, 30, 60].map((days) => (
            <button
              key={days}
              onClick={() => setDaysBack(days)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${daysBack === days
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              Last {days} days
            </button>
          ))}
        </div>
      </Card>

      {/* Daily Trends Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Daily Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#3b82f6" name="Total Leads" />
            <Line type="monotone" dataKey="qualified" stroke="#10b981" name="Qualified" />
            <Line type="monotone" dataKey="submitted" stroke="#f59e0b" name="Submitted" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Conversion Funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionFunnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Package Mix */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Package Mix</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={packageMixData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {packageMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Source Performance Table */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Source Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Source</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Total Leads</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Qualified</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Submitted</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sourcePerformanceData.map((source: any) => (
                <tr key={source.name} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{source.name}</td>
                  <td className="px-4 py-3 text-slate-600">{source.total}</td>
                  <td className="px-4 py-3 text-slate-600">{source.qualified}</td>
                  <td className="px-4 py-3 text-slate-600">{source.submitted}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{source.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
