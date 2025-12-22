import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Configuration() {
  const [config, setConfig] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const { data: configData } = trpc.config.getAll.useQuery();
  const setConfigMutation = trpc.config.set.useMutation();

  useEffect(() => {
    if (configData) {
      const configMap: Record<string, any> = {};
      configData.forEach((item: any) => {
        configMap[item.key] = item.value;
      });
      setConfig(configMap);
      setLoading(false);
    }
  }, [configData]);

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      for (const [key, value] of Object.entries(config)) {
        await setConfigMutation.mutateAsync({
          key,
          value,
          description: `Configuration for ${key}`,
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save configuration:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Configuration</h1>
        <p className="text-slate-600 mt-2">Manage system settings and workflow parameters</p>
      </div>

      {saved && (
        <Card className="p-4 bg-green-50 border border-green-200">
          <p className="text-green-800 font-medium">✓ Configuration saved successfully</p>
        </Card>
      )}

      {loading ? (
        <Card className="p-8 text-center text-slate-500">Loading configuration...</Card>
      ) : (
        <>
          {/* Lead Generation Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Lead Generation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  High-Value Lead Allocation (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.lead_gen_high_value_percentage || 60}
                  onChange={(e) =>
                    handleConfigChange("lead_gen_high_value_percentage", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Percentage of leads to acquire from high-value sources (LinkedIn, Google Maps)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lead Generation Frequency
                </label>
                <select
                  value={config.lead_gen_frequency || "6h"}
                  onChange={(e) => handleConfigChange("lead_gen_frequency", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2h">Every 2 hours</option>
                  <option value="4h">Every 4 hours</option>
                  <option value="6h">Every 6 hours</option>
                  <option value="12h">Every 12 hours</option>
                  <option value="24h">Daily</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Qualification Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Lead Qualification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  30Mbps Upselling Aggressiveness
                </label>
                <select
                  value={config.upsell_aggressiveness || "high"}
                  onChange={(e) => handleConfigChange("upsell_aggressiveness", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low (Subtle recommendations)</option>
                  <option value="medium">Medium (Balanced approach)</option>
                  <option value="high">High (Aggressive upselling)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Controls how aggressively the LLM promotes the 30Mbps package
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Qualification Frequency
                </label>
                <select
                  value={config.qualification_frequency || "2h"}
                  onChange={(e) => handleConfigChange("qualification_frequency", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1h">Every 1 hour</option>
                  <option value="2h">Every 2 hours</option>
                  <option value="4h">Every 4 hours</option>
                  <option value="6h">Every 6 hours</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Form Submission Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Form Submission</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Maximum Retry Attempts
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.submission_max_retries || 3}
                  onChange={(e) =>
                    handleConfigChange("submission_max_retries", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Number of times to retry failed form submissions
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Submission Frequency
                </label>
                <select
                  value={config.submission_frequency || "4h"}
                  onChange={(e) => handleConfigChange("submission_frequency", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2h">Every 2 hours</option>
                  <option value="4h">Every 4 hours</option>
                  <option value="6h">Every 6 hours</option>
                  <option value="12h">Every 12 hours</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.enable_weekly_reports !== false}
                    onChange={(e) =>
                      handleConfigChange("enable_weekly_reports", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Enable Weekly Performance Reports
                  </span>
                </label>
                <p className="text-xs text-slate-500 mt-2 ml-7">
                  Receive automated reports every Monday at 9 AM
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.enable_error_alerts !== false}
                    onChange={(e) =>
                      handleConfigChange("enable_error_alerts", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Enable Error Alerts
                  </span>
                </label>
                <p className="text-xs text-slate-500 mt-2 ml-7">
                  Get notified immediately when workflows encounter errors
                </p>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={setConfigMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {setConfigMutation.isPending ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
