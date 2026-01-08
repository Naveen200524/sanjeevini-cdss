import React from "react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";
import { Pill, Clock, Printer, Save, FileText } from "lucide-react";
import { Button } from "../ui/button";

export function PrescriptionCard() {
    return (
        <GlassCard className="col-span-2 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Amoxicillin</h2>
                    <span className="text-xs text-slate-500 font-medium">500 mg, Soft gel</span>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white/50">Oral / Twice daily</Badge>
                </div>
            </div>

            {/* Main Stats Row */}
            <div className="flex items-center justify-between gap-8 mb-10">
                <div className="flex-1 p-4 bg-white/40 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center hover:bg-white/60 transition-colors">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Strength</span>
                    <span className="text-xl font-bold text-slate-700">500 mg</span>
                </div>
                <div className="flex-1 p-4 bg-white/40 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center hover:bg-white/60 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                        <Pill size={16} />
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Quantity</span>
                    <span className="text-md font-bold text-slate-700">30 tablets</span>
                </div>
                <div className="flex-1 p-4 bg-white/40 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center hover:bg-white/60 transition-colors">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Reason</span>
                    <span className="text-xs font-medium text-slate-700 leading-tight">Bacterial infection treatment</span>
                </div>
            </div>

            {/* Timeline Visual - Simplified for now using CSS */}
            <div className="relative h-12 mb-8 mx-4">
                {/* Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 rounded-full"></div>

                {/* Points */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></div>

                {/* Labels */}
                <span className="absolute -bottom-6 left-0 -translate-x-1/2 text-[10px] font-bold text-blue-600">Start</span>
                <span className="absolute -bottom-6 right-0 translate-x-1/2 text-[10px] text-slate-400">End</span>
            </div>


            {/* Actions Bottom Bar */}
            <div className="mt-6 flex items-center gap-3">
                <Button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Save size={16} className="mr-2" /> Submit
                </Button>
                <Button variant="glass" className="flex-1 rounded-xl text-slate-600">
                    <Printer size={16} className="mr-2" /> Print
                </Button>
                <Button variant="glass" className="flex-1 rounded-xl text-slate-600">
                    <FileText size={16} className="mr-2" /> Save Draft
                </Button>
            </div>

            {/* Blue Gradient overlay for depth */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </GlassCard>
    );
}
