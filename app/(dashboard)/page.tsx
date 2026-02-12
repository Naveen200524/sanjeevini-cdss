
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Plus, Activity, UserPlus, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentPatientsTable } from "@/components/dashboard/recent-patients-table";
import { DiseaseDistributionChart } from "@/components/dashboard/disease-distribution-chart";
import { PredictionAccuracyChart } from "@/components/dashboard/prediction-accuracy-chart";
import { MobileDashboard } from "@/components/dashboard/mobile-dashboard";
import { getDashboardStats, getDiseaseDistribution, getPredictionAccuracy, getRecentPatients, StatData } from "@/lib/mock-api";

// Icon mapping helper
const ICON_MAP = {
  Activity: Activity,
  AlertCircle: AlertCircle,
  Clock: Clock,
};

export default async function Home() {
  // Parallel data fetching
  const [stats, patients, diseaseData, accuracyData] = await Promise.all([
    getDashboardStats(),
    getRecentPatients(),
    getDiseaseDistribution(),
    getPredictionAccuracy(),
  ]);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">

      {/* Desktop Dashboard */}
      <div className="hidden md:block space-y-8">
        {/* Page Header Area */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Hello, Dr. Sharma 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Your oncology department overview
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50 shadow-sm flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-semibold text-slate-700">Oncology OPD Active</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="space-y-6">

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = ICON_MAP[stat.iconName] || Activity;
              return (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  trend={stat.trend}
                  trendUp={stat.trendUp}
                  icon={Icon}
                  colorClass={stat.colorClass}
                />
              );
            })}

            <GlassCard className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary-600 to-primary-500 text-white border-none shadow-lg shadow-primary-500/20 group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="bg-white/20 p-3 rounded-2xl mb-3 group-hover:bg-white/30 transition-colors">
                <UserPlus size={24} />
              </div>
              <h3 className="font-bold text-lg">New Cancer Screening</h3>
              <p className="text-blue-100 text-xs mt-1">Start a new oncology analysis</p>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Area: Recent Patients & Activity */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <RecentPatientsTable patients={patients} />
            </div>

            {/* Right Sidebar: Quick Actions & Notifications */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <GlassCard className="p-6 h-[340px] flex flex-col relative overflow-visible">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary-500" />
                  Cancer Type Distribution
                </h3>
                <div className="flex-1 -mt-4">
                  <DiseaseDistributionChart data={diseaseData} />
                </div>
              </GlassCard>

              {/* Prediction Accuracy Mini */}
              <GlassCard className="p-6 h-[280px] flex flex-col">
                <h3 className="font-bold text-slate-800 mb-2">Model Accuracy</h3>
                <div className="flex-1 -ml-4">
                  <PredictionAccuracyChart data={accuracyData} />
                </div>
              </GlassCard>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Dashboard */}
      <MobileDashboard patients={patients} />

    </div>
  );
}

