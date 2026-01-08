"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const data = [
    { date: "Jan", sbp: 130, dbp: 85, glucose: 95 },
    { date: "Feb", sbp: 135, dbp: 88, glucose: 102 },
    { date: "Mar", sbp: 142, dbp: 92, glucose: 110 },
    { date: "Apr", sbp: 138, dbp: 90, glucose: 108 },
    { date: "May", sbp: 145, dbp: 95, glucose: 115 },
    { date: "Jun", sbp: 140, dbp: 90, glucose: 112 },
];

export function BiomarkerTrendsChart() {
    const [activeMetric, setActiveMetric] = useState<'bp' | 'glucose'>('bp');

    return (
        <GlassCard className="p-6 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Biomarker Trends</h3>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveMetric('bp')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activeMetric === 'bp' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Blood Pressure
                    </button>
                    <button
                        onClick={() => setActiveMetric('glucose')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activeMetric === 'glucose' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Glucose
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        {activeMetric === 'bp' ? (
                            <>
                                <Line type="monotone" dataKey="sbp" name="Systolic BP" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="dbp" name="Diastolic BP" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </>
                        ) : (
                            <Line type="monotone" dataKey="glucose" name="Fasting Glide" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4, stroke: '#fff' }} activeDot={{ r: 6 }} />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
