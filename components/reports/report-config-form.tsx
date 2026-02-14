"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download } from "lucide-react";

export function ReportConfigForm() {
    return (
        <GlassCard className="p-6 h-full flex flex-col">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <FileText size={18} className="text-primary-500" />
                    Report Configuration
                </h3>
                <p className="text-sm text-slate-500 mt-1">Select sections to include in the generated report.</p>
            </div>

            <div className="space-y-6 flex-1">
                <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">Core Data</Label>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/60">
                        <Checkbox id="patient-info" defaultChecked />
                        <Label htmlFor="patient-info" className="font-medium">Patient Demographics</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/60">
                        <Checkbox id="clinical-summary" defaultChecked />
                        <Label htmlFor="clinical-summary" className="font-medium">Clinical Summary</Label>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">Analytics</Label>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/60">
                        <Checkbox id="risk-analysis" defaultChecked />
                        <Label htmlFor="risk-analysis" className="font-medium">Risk Analysis (AI)</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/60">
                        <Checkbox id="biomarker-trends" />
                        <Label htmlFor="biomarker-trends" className="font-medium">Biomarker Trends Charts</Label>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">Plan</Label>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/60">
                        <Checkbox id="recommendations" defaultChecked />
                        <Label htmlFor="recommendations" className="font-medium">AI Recommendations</Label>
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                    <Printer size={16} className="mr-2" /> Generate Preview
                </Button>
                <Button variant="secondary" className="w-full">
                    <Download size={16} className="mr-2" /> Download PDF
                </Button>
            </div>
        </GlassCard>
    );
}
