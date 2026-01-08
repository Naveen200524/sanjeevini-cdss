"use client";

import { FinancialImpactChart } from "@/components/analytics/financial-impact-chart";
import { SystemHealthMonitor } from "@/components/analytics/system-health-monitor";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Hospital Analytics</h1>
                    <p className="text-slate-500 text-sm">System performance and financial insights dashboard.</p>
                </div>
                <Badge className="bg-slate-800 text-white border-transparent px-3 py-1">
                    Live Data • Updated 2m ago
                </Badge>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6">
                    <p className="text-sm font-medium text-slate-500">Total Savings (YTD)</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-800">$1.2M</span>
                        <Badge className="bg-emerald-100 text-emerald-600 border-none flex items-center gap-1">
                            <TrendingUp size={12} /> +12%
                        </Badge>
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <p className="text-sm font-medium text-slate-500">Predictions Served</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-800">45k</span>
                        <Badge className="bg-blue-100 text-blue-600 border-none flex items-center gap-1">
                            <ArrowUpRight size={12} /> +8%
                        </Badge>
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <p className="text-sm font-medium text-slate-500">Avg. Risk Reduction</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-800">18%</span>
                        <Badge className="bg-emerald-100 text-emerald-600 border-none flex items-center gap-1">
                            <TrendingUp size={12} /> Target: 20%
                        </Badge>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <FinancialImpactChart />
                </div>
                <div className="lg:col-span-1">
                    <SystemHealthMonitor />
                </div>
            </div>
        </div>
    );
}
