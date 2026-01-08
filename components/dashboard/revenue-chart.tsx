"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Dec", total: 4000, monthly: 2400 },
    { name: "Jan", total: 3000, monthly: 1398 },
    { name: "Feb", total: 9000, monthly: 5800 },
    { name: "Mar", total: 6000, monthly: 3908 },
    { name: "Apr", total: 8000, monthly: 4800 },
    { name: "May", total: 5000, monthly: 3800 },
    { name: "Jun", total: 7500, monthly: 4300 },
    { name: "Jul", total: 6000, monthly: 3500 },
];

export function RevenueChart() {
    return (
        <GlassCard className="col-span-1 md:col-span-2 lg:col-span-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">Revenue</h3>
                    <div className="flex gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="text-sm text-slate-500">
                                Total: <span className="text-slate-900 font-bold">$115,546</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                            <span className="text-sm text-slate-500">
                                Month: <span className="text-slate-900 font-bold">$13,876</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dropdown Placeholder */}
                <button className="text-sm font-medium text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    Monthly ▼
                </button>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                        />
                        <Area
                            type="monotone"
                            dataKey="monthly"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorMonthly)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
