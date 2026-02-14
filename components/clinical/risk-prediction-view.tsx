"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { RiskTrajectoryChart } from "@/components/clinical/risk-trajectory-chart";
import { ShapAnalysisChart } from "@/components/clinical/shap-analysis-chart";

const risks = [
    { name: "CVD Risk", score: 82, level: "High", color: "text-red-600", bg: "bg-red-100", bar: "bg-red-500" },
    { name: "Type 2 Diabetes", score: 65, level: "Moderate", color: "text-amber-600", bg: "bg-amber-100", bar: "bg-amber-500" },
    { name: "Chronic Kidney Disease", score: 24, level: "Low", color: "text-emerald-600", bg: "bg-emerald-100", bar: "bg-emerald-500" },
];

export function RiskPredictionView() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-8 rounded-full bg-primary-500"></span>
                Analysis Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {risks.map((risk, i) => (
                    <motion.div
                        key={risk.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <GlassCard className="p-6 relative overflow-hidden group hover:bg-white/60 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-slate-700">{risk.name}</h4>
                                <Info size={16} className="text-slate-400 cursor-pointer hover:text-primary-500" />
                            </div>

                            <div className="flex items-end gap-2 mb-4">
                                <span className={`text-4xl font-bold ${risk.color}`}>{risk.score}%</span>
                                <Badge className={`${risk.bg} ${risk.color} border-none mb-1`}>{risk.level}</Badge>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${risk.score}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full rounded-full ${risk.bar}`}
                                />
                            </div>

                            <Button variant="ghost" size="sm" className="w-full mt-6 text-slate-500 hover:text-primary-600 justify-between group-hover:bg-white/50">
                                View Factors <ArrowRight size={16} />
                            </Button>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <GlassCard className="p-6 border-l-4 border-l-red-500">
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div className="w-full">
                        <h4 className="font-bold text-slate-800 text-lg">Detailed Insight: CVD Risk</h4>
                        <p className="text-slate-600 mt-1 max-w-2xl">
                        The patient&apos;s cardiovascular risk is significantly elevated primarily due to uncontrolled <strong className="text-slate-800">systolic blood pressure</strong> and <strong className="text-slate-800">high LDL cholesterol</strong>. Immediate intervention is recommended.
                        </p>
                        <div className="mt-4 flex gap-3">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20">View Clinical Report</Button>
                            <Button size="sm" variant="secondary" className="bg-white border-slate-200">Add to Care Plan</Button>
                        </div>

                        {/* Advanced Visualizations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-red-100 w-full">
                            <RiskTrajectoryChart />
                            <ShapAnalysisChart />
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
