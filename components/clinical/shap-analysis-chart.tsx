"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { GlassCard } from "@/components/ui/glass-card";

const data = [
    { feature: "Age (55y)", impact: 28, color: "#f87171" },
    { feature: "LDL (152)", impact: 24, color: "#f87171" },
    { feature: "Smoker", impact: 19, color: "#fb923c" },
    { feature: "BP (142/88)", impact: 16, color: "#fb923c" },
    { feature: "HDL (38)", impact: 12, color: "#fca5a5" },
    { feature: "HbA1c (6.8)", impact: 9, color: "#fdba74" },
    { feature: "Family Hx", impact: 6, color: "#fed7aa" },
];

export function ShapAnalysisChart() {
    return (
        <GlassCard className="p-6 h-[350px] flex flex-col">
            <div className="mb-4">
                <h4 className="font-bold text-slate-800">Top Risk Contributors</h4>
                <p className="text-xs text-slate-500">SHAP Feature Importance Analysis</p>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} width={80} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
