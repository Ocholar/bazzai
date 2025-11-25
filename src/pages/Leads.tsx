import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import { useState, useMemo } from "react";
import { exportLeadsToCSV } from "@/lib/csvExport";

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const { data: leads, isLoading } = trpc.leads.getAll.useQuery();

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter((lead: any) => {
      const matchesSearch =
        lead.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || lead.status === statusFilter;
      const matchesTag = !tagFilter || lead.tag === tagFilter;
      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [leads, searchTerm, statusFilter, tagFilter]);

  const statusOptions = ["new", "contacted", "qualified", "submitted", "installed", "failed"];
  const tagOptions = ["high_value", "high_volume"];

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-purple-100 text-purple-800",
      qualified: "bg-green-100 text-green-800",
      submitted: "bg-indigo-100 text-indigo-800",
      installed: "bg-emerald-100 text-emerald-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-slate-100 text-slate-800";
  };

  const getTagBadgeColor = (tag: string) => {
    return tag === "high_value"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-orange-100 text-orange-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Lead Management</h1>
        <p className="text-slate-600 mt-2">Track and manage all acquired leads</p>
      </div>

      {/* Export and Filter Bar */}
      <Card className="p-4">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => leads && exportLeadsToCSV(leads)}
            disabled={!leads || leads.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Download size={18} />
            Export to CSV
          </Button>
        </div>
      </Card>

      {/* Search and Filter Bar */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Status:</span>
              <select
                className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value || null)}
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Tag:</span>
              <select
                className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tagFilter || ""}
                onChange={(e) => setTagFilter(e.target.value || null)}
              >
                <option value="">All Tags</option>
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === "high_value" ? "High-Value" : "High-Volume"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No leads found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Tag
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {lead.customerName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div>{lead.phone}</div>
                      <div className="text-xs text-slate-500">{lead.email || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagBadgeColor(lead.tag)}`}>
                        {lead.tag === "high_value" ? "High-Value" : "High-Volume"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(lead.status)}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lead.preferredPackage ? lead.preferredPackage.toUpperCase() : "Unspecified"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="flex justify-between items-center text-sm text-slate-600">
        <div>Showing {filteredLeads.length} of {leads?.length || 0} leads</div>
        <Button
          onClick={() => leads && exportLeadsToCSV(leads)}
          disabled={!leads || leads.length === 0}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export All
        </Button>
      </div>
    </div>
  );
}
