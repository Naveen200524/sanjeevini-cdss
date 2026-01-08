"use client";

import { ReportConfigForm } from "@/components/reports/report-config-form";
import { ReportPreview } from "@/components/reports/report-preview";
import { GlassCard } from "@/components/ui/glass-card";

export default function ReportsPage() {
    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Report Generation</h1>
                    <p className="text-slate-500 text-sm">Configure and download comprehensive patient reports.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
                {/* Configuration Sidebar */}
                <div className="lg:col-span-4 h-full">
                    <ReportConfigForm />
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-8 h-full flex flex-col">
                    <GlassCard className="flex-1 bg-slate-100/50 backdrop-blur-sm border-slate-200 flex flex-col overflow-hidden relative">
                        <div className="absolute top-4 right-4 z-10 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-slate-500 backdrop-blur-md shadow-sm border border-white/50">
                            Preview Mode
                        </div>

                        <div className="flex-1 overflow-hidden p-6">
                            <ReportPreview />
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
