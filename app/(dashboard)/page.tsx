import { MobileDashboard } from "@/components/dashboard/mobile-dashboard";
import { RecentPatientsTable } from "@/components/dashboard/recent-patients-table";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  getDashboardPatients,
  getJuniorDoctorStats,
  getReceptionistStats
} from "@/lib/tier-mock-api";
import { Activity, AlertTriangle, Users } from "lucide-react";

export default async function Home() {
  // Parallel data fetching for Oncology Workflow
  const [recStats, docStats, patients] = await Promise.all([
    getReceptionistStats(),
    getJuniorDoctorStats(),
    getDashboardPatients(),
  ]);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
      {/* Desktop Dashboard */}
      <div className="hidden md:block space-y-8">
        {/* Page Header Area */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Department Overview
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Oncology Patient Flow & Alerts
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50 shadow-sm flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-semibold text-slate-700">System Active</span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Oncology Specific */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Registered Today"
            value={recStats.patientsToday}
            trend={`${recStats.pendingRegistration} pending`}
            trendUp={true}
            icon={Users}
            colorClass="text-blue-500"
          />
          <StatCard
            title="Pending Assessments"
            value={docStats.pendingScoring}
            trend="Junior Doctor Queue"
            trendUp={false}
            icon={Activity}
            colorClass="text-amber-500"
          />
          <StatCard
            title="Critical Alerts"
            value={patients.filter(p => p.status === 'Critical').length}
            trend="High Toxicity/Distress"
            trendUp={false}
            icon={AlertTriangle}
            colorClass="text-red-500"
          />
        </div>


        {/* Recent Patients Table */}
        <RecentPatientsTable patients={patients} />

        {/* Enterprise System Health Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200/60">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase">API Latency</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-lg font-bold text-slate-700">145ms</span>
              <span className="text-xs text-emerald-600 mb-1">● Optimal</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase">DPDP Compliance</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-lg font-bold text-slate-700">100%</span>
              <span className="text-xs text-emerald-600 mb-1">✔ Audited</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase">AI Model Accuracy</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-lg font-bold text-slate-700">94.2%</span>
              <span className="text-xs text-blue-600 mb-1">AUC-ROC</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase">Tumor Board Cases</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-lg font-bold text-purple-700">{patients.filter(p => p.tumorBoardReview).length}</span>
              <span className="text-xs text-purple-600 mb-1">Pending Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dashboard */}
      <MobileDashboard patients={patients} />
    </div>
  );
}
