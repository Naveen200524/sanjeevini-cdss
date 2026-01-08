import React from "react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";

export function ProductivityHeatmap() {
    // Mock data for grid - 7 days x 24 hours approximation (simplified)
    // Generating a grid of 7 rows x 20 cols
    const rows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const cols = Array.from({ length: 20 }, (_, i) => i);

    return (
        <GlassCard className="col-span-1 md:col-span-2 lg:col-span-8 min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">Provider Productivity</h3>
                    <div className="flex items-baseline gap-4 mt-2">
                        <span className="text-4xl font-bold text-slate-900">20</span>
                        <span className="text-sm text-slate-500">Patient/ Day</span>

                        <span className="text-4xl font-bold text-slate-900 ml-4">88%</span>
                        <span className="text-sm text-slate-500">Attendance</span>
                    </div>
                </div>
                <button className="text-sm font-medium text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    Monthly ▼
                </button>
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-4">
                {/* Y Axis Labels */}
                <div className="flex flex-col justify-between py-1 h-[140px]">
                    {rows.map((day) => (
                        <span key={day} className="text-[10px] font-medium text-slate-400">{day}</span>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-7 gap-1.5 h-[140px]">
                    {rows.map((_, r) => (
                        cols.map((_, c) => {
                            // Deterministic value based on position
                            const value = ((r + 1) * (c + 1) * 37) % 100 / 100;
                            const opacity = value > 0.7 ? "opacity-100" : value > 0.4 ? "opacity-60" : "opacity-20";
                            const color = value > 0.2 ? "bg-blue-500" : "bg-slate-200";

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    className={`rounded-sm transition-all duration-500 hover:scale-125 ${color} ${opacity}`}
                                ></div>
                            )
                        })
                    ))}
                </div>
            </div>

            {/* Legend / Footer */}
            <div className="mt-8 flex justify-end gap-6 text-[10px] text-slate-500">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-sm"></span> Provider Attendance</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-300 rounded-sm"></span> No-show Rate</div>
            </div>

        </GlassCard>
    );
}
