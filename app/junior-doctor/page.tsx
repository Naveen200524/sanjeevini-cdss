"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, CheckCircle, Clock, AlertTriangle, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getJuniorDoctorStats, getJuniorDoctorPatients, type JuniorDoctorStats, type JuniorDoctorPatient } from "@/lib/tier-mock-api";

export default function JuniorDoctorHomePage() {
    const [stats, setStats] = useState<JuniorDoctorStats | null>(null);
    const [patients, setPatients] = useState<JuniorDoctorPatient[]>([]);

    useEffect(() => {
        getJuniorDoctorStats().then(setStats);
        getJuniorDoctorPatients().then(setPatients);
    }, []);

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Oncology Clinical Assessments 🩺
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Cancer patient diagnosis, staging, scoring & treatment management
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Assessments Done</p>
                            <p className="text-3xl font-bold text-slate-800 mt-0.5">{stats?.assessmentsDone ?? "—"}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pending Scoring</p>
                            <p className="text-3xl font-bold text-slate-800 mt-0.5">{stats?.pendingScoring ?? "—"}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Referrals Needed</p>
                            <p className="text-3xl font-bold text-slate-800 mt-0.5">{stats?.referralsNeeded ?? "—"}</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Patient List */}
            <GlassCard className="overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Stethoscope size={18} className="text-violet-500" />
                        Patients Awaiting Assessment
                    </h3>
                </div>
                <div className="divide-y divide-slate-50">
                    {patients.map((patient, i) => (
                        <motion.div
                            key={patient.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/junior-doctor/patient/${patient.id}`}>
                                <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            {patient.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
                                                {patient.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-mono">{patient.hospitalId}</span>
                                                <span>•</span>
                                                <span>{patient.age} yrs, {patient.sex}</span>
                                                <span>•</span>
                                                <span>{patient.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs text-slate-400">Last Assessment</p>
                                            <p className="text-sm text-slate-600">{patient.lastAssessment}</p>
                                        </div>
                                        <Badge className={
                                            patient.assessmentStatus === "Complete"
                                                ? "bg-emerald-100 text-emerald-700 border-none"
                                                : patient.assessmentStatus === "In Progress"
                                                    ? "bg-amber-100 text-amber-700 border-none"
                                                    : "bg-slate-100 text-slate-600 border-none"
                                        }>
                                            {patient.assessmentStatus}
                                        </Badge>
                                        <ChevronRight className="text-slate-300 group-hover:text-violet-400 transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
