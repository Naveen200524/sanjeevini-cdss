"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DiseaseDistributionChartProps {
    data: { name: string; value: number; color: string; }[];
    totalPatients?: string;
}

export function DiseaseDistributionChart({ data, totalPatients = "1,284" }: DiseaseDistributionChartProps) {
    return (
        <div className="w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-800">{totalPatients}</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Patients</span>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 w-full flex justify-center gap-4 text-xs">
                {data.slice(0, 3).map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-slate-600 font-medium">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

