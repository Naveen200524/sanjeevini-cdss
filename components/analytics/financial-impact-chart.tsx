"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/glass-card";

const data = [
    { month: "Jan", cost: 4000, revenue: 2400 },
    { month: "Feb", cost: 3000, revenue: 1398 },
    { month: "Mar", cost: 2000, revenue: 9800 },
    { month: "Apr", cost: 2780, revenue: 3908 },
    { month: "May", cost: 1890, revenue: 4800 },
    { month: "Jun", cost: 2390, revenue: 3800 },
    { month: "Jul", cost: 3490, revenue: 4300 },
];

export function FinancialImpactChart() {
    return (
        <GlassCard className="p-6 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-slate-800">Financial Impact & ROI</h3>
                    <p className="text-sm text-slate-500">Projected savings vs operational costs</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-600">Projected Value</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                        <span className="text-slate-600">Cost</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="cost" stroke="#94a3b8" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
