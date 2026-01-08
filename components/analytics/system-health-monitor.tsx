"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Server, Activity, AlertTriangle, Zap } from "lucide-react";

export function SystemHealthMonitor() {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-4 flex flex-col justify-between bg-emerald-50 border-emerald-100">
                    <div className="flex items-start justify-between">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <Server size={20} />
                        </div>
                        <Badge className="bg-emerald-200 text-emerald-800 border-none">99.9%</Badge>
                    </div>
                    <div className="mt-2">
                        <p className="text-xs text-emerald-600 font-bold uppercase">Uptime</p>
                        <p className="text-lg font-bold text-slate-800">Operational</p>
                    </div>
                </GlassCard>
                <GlassCard className="p-4 flex flex-col justify-between bg-blue-50 border-blue-100">
                    <div className="flex items-start justify-between">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Zap size={20} />
                        </div>
                        <Badge className="bg-blue-200 text-blue-800 border-none">24ms</Badge>
                    </div>
                    <div className="mt-2">
                        <p className="text-xs text-blue-600 font-bold uppercase">Latency</p>
                        <p className="text-lg font-bold text-slate-800">Excellent</p>
                    </div>
                </GlassCard>
            </div>

            <GlassCard className="flex-1 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-primary-500" />
                    System Load
                </h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-500">API Requests</span>
                            <span className="text-slate-700">85%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 w-[85%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-500">Database & Storage</span>
                            <span className="text-slate-700">42%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[42%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-500">AI Model Inference</span>
                            <span className="text-slate-700">60%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[60%] rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                    <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-red-700">Recent Alert</p>
                        <p className="text-xs text-red-600 mt-1">High latency detected in US-East region at 02:30 AM.</p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
