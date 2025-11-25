import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, RotateCcw, Download, X } from "lucide-react";
import { useState } from "react";
import { exportSubmissionsToCSV } from "@/lib/csvExport";

export default function Submissions() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

  const { data: submissions, isLoading } = trpc.submissions.getAll.useQuery();
  const { data: leads } = trpc.leads.getAll.useQuery();

  const getLeadName = (leadId: number) => {
    return leads?.find((l: any) => l.id === leadId)?.customerName || `Lead #${leadId}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "failed":
        return <AlertCircle className="text-red-500" size={20} />;
      case "retry":
        return <RotateCcw className="text-yellow-500" size={20} />;
      default:
        return <Clock className="text-blue-500" size={20} />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      retry: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-slate-100 text-slate-800";
  };

  const successCount = submissions?.filter((s: any) => s.status === "success").length || 0;
  const failedCount = submissions?.filter((s: any) => s.status === "failed").length || 0;
  const successRate =
    submissions && submissions.length > 0
      ? ((successCount / submissions.length) * 100).toFixed(2)
      : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Submissions Tracking</h1>
        <p className="text-slate-600 mt-2">Monitor all form submissions to Airtel</p>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => submissions && leads && exportSubmissionsToCSV(submissions, leads)}
          disabled={!submissions || submissions.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Download size={18} />
          Export to CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-sm text-slate-600">Total Submissions</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {submissions?.length || 0}
          </p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <p className="text-sm text-slate-600">Successful</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{successCount}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <p className="text-sm text-slate-600">Failed</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{failedCount}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <p className="text-sm text-slate-600">Success Rate</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{successRate}%</p>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading submissions...</div>
        ) : !submissions || submissions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No submissions found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Response Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Retries
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {submissions.map((submission: any) => (
                  <tr key={submission.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {getLeadName(submission.leadId)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(submission.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(submission.status)}`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {submission.responseCode || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {submission.retryCount || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedSubmission(submission.id)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Export Footer */}
      <div className="flex justify-end">
        <Button
          onClick={() => submissions && leads && exportSubmissionsToCSV(submissions, leads)}
          disabled={!submissions || submissions.length === 0}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export All
        </Button>
      </div>

      {/* Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 bg-white max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Submission Details
              </h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              {submissions
                ?.filter((s: any) => s.id === selectedSubmission)
                .map((submission: any) => (
                  <div key={submission.id}>
                    <p className="text-slate-600">
                      <strong>Error Message:</strong> {submission.errorMessage || "None"}
                    </p>
                    <p className="text-slate-600 mt-2">
                      <strong>Response:</strong>
                    </p>
                    <pre className="bg-slate-50 p-3 rounded border border-slate-300 mt-1 text-xs overflow-auto max-h-40">
                      {submission.responseBody || "No response"}
                    </pre>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
