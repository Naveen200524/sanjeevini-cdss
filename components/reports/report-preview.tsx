"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldCheck } from "lucide-react";

export function ReportPreview() {
    return (
        <div className="bg-slate-500/10 p-8 rounded-3xl overflow-y-auto max-h-[800px] flex justify-center">
            {/* A4 Paper Aspect Ratio */}
            <div className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative text-slate-800">
                {/* Report Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">Sanjeevini CDSS</span>
                        </div>
                        <p className="text-xs text-slate-500">Clinical Decision Support System Report</p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-bold text-2xl uppercase tracking-wider text-slate-900">Medical Report</h2>
                        <p className="text-slate-500 text-sm mt-1">Date: 12 Jan 2024</p>
                        <p className="text-slate-500 text-sm">Ref: RPT-2024-001</p>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div><span className="text-slate-500 w-24 inline-block">Name:</span> <span className="font-semibold">Rajesh Kumar</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">ID:</span> <span className="font-mono">MRN12345</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">DOB:</span> <span>12 Jan 1968 (55y)</span></div>
                        <div><span className="text-slate-500 w-24 inline-block">Gender:</span> <span>Male</span></div>
                    </div>
                </div>

                {/* Clinical Findings */}
                <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <Activity size={18} className="text-blue-600" /> Clinical Assessment
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                            <p className="text-xs text-blue-600 font-semibold uppercase">Blood Pressure</p>
                            <p className="text-lg font-bold text-slate-900">140/90</p>
                            <p className="text-xs text-red-500 font-medium">High</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="text-xs text-slate-500 font-semibold uppercase">HbA1c</p>
                            <p className="text-lg font-bold text-slate-900">6.2%</p>
                            <p className="text-xs text-amber-500 font-medium">Elevated</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="text-xs text-slate-500 font-semibold uppercase">BMI</p>
                            <p className="text-lg font-bold text-slate-900">28.4</p>
                            <p className="text-xs text-amber-500 font-medium">Overweight</p>
                        </div>
                    </div>
                </div>

                {/* AI Analysis */}
                <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-purple-600" /> AI Risk Stratification
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-700">Cardiovascular Risk Score</span>
                            <Badge className="bg-red-100 text-red-600 border-none">High Risk (82%)</Badge>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Analysis indicates a significantly elevated risk for cardiovascular events within the next 10 years. Primary contributing factors include unregulated systolic blood pressure and elevated LDL cholesterol levels.
                        </p>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                    <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Management Plan</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                        <li>Initiate antihypertensive therapy (e.g., Amlodipine 5mg).</li>
                        <li>Lifestyle modification: DASH diet and aerobic exercise (30 mins/day).</li>
                        <li>Follow-up lipid profile in 3 months.</li>
                        <li>Referral to Cardiology for further evaluation.</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="absolute bottom-12 left-12 right-12 border-t border-slate-200 pt-4 flex justify-between text-xs text-slate-400">
                    <p>Generated by Sanjeevini AI • Not a substitute for professional medical advice.</p>
                    <p>Page 1 of 1</p>
                </div>
            </div>
        </div>
    );
}
