"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { GlassCard } from "@/components/ui/glass-card";

const data = [
    { year: "Now", noIntervention: 82, withIntervention: 82 },
    { year: "2yr", noIntervention: 85, withIntervention: 75 },
    { year: "4yr", noIntervention: 89, withIntervention: 68 },
    { year: "6yr", noIntervention: 92, withIntervention: 60 },
    { year: "8yr", noIntervention: 95, withIntervention: 55 },
    { year: "10yr", noIntervention: 98, withIntervention: 45 },
];

export function RiskTrajectoryChart() {
    return (
        <GlassCard className="p-6 h-[350px] flex flex-col">
            <div className="mb-4">
                <h4 className="font-bold text-slate-800">10-Year Use Case Projections</h4>
                <p className="text-xs text-slate-500">Predicted CVD Risk Trajectory</p>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="noIntervention" name="No Intervention" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="withIntervention" name="With Treatment" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
