"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Circle, FilePlus, FlaskConical, Stethoscope, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const events = [
    { type: "visit", title: "General Checkup", date: "12 Oct 2023", doctor: "Dr. Sharma", details: "Routine follow-up for hypertension.", icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-100" },
    { type: "lab", title: "Blood Work", date: "10 Oct 2023", doctor: "Lab Dept", details: "HbA1c: 6.8%, Lipid Profile: Normal range.", icon: FlaskConical, color: "text-purple-500", bg: "bg-purple-100" },
    { type: "alert", title: "High BP Alert", date: "05 Oct 2023", doctor: "System", details: "Recorded reading 160/100 mmHg at home.", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-100" },
    { type: "prescription", title: "Medication Adjustment", date: "28 Sep 2023", doctor: "Dr. Emily", details: "Increased Lisinopril dosage to 10mg.", icon: FilePlus, color: "text-emerald-500", bg: "bg-emerald-100" },
];

export function HistoryTimeline() {
    return (
        <div className="space-y-8 relative pl-8 border-l-2 border-slate-100 ml-4 py-4">
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                >
                    {/* Timeline Node */}
                    <div className={`absolute -left-[45px] top-4 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${event.bg}`}>
                        <div className={`w-2 h-2 rounded-full bg-current ${event.color}`}></div>
                    </div>

                    <GlassCard className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${event.bg} ${event.color} shrink-0`}>
                                    <event.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{event.title}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{event.details}</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Badge variant="secondary" className="scale-90 origin-left text-xs bg-slate-100 text-slate-500 border-none">
                                            {event.doctor}
                                        </Badge>
                                        <span className="text-xs text-slate-400">•</span>
                                        <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">{event.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
}
