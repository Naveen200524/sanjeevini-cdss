"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Search, Filter, ChevronRight, Activity, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getJuniorDoctorPatients, type JuniorDoctorPatient } from "@/lib/tier-mock-api";

export default function JuniorDoctorPatientsPage() {
    const [patients, setPatients] = useState<JuniorDoctorPatient[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        getJuniorDoctorPatients().then(setPatients);
    }, []);

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = 
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.hospitalId.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || patient.assessmentStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: patients.length,
        pending: patients.filter(p => p.assessmentStatus === "Pending").length,
        inProgress: patients.filter(p => p.assessmentStatus === "In Progress").length,
        complete: patients.filter(p => p.assessmentStatus === "Complete").length,
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Patient Directory 📋
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        All oncology patients assigned for clinical assessment
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">Total Patients</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">Pending</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.pending}</p>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                            <Activity size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">In Progress</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.inProgress}</p>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold">Complete</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.complete}</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Search & Filter */}
            <GlassCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or hospital ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 focus:ring-2 focus:ring-violet-100 focus:border-violet-300 outline-none transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-slate-400" />
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                </div>
            </GlassCard>

            {/* Patient List */}
            <div className="space-y-3">
                <p className="text-sm text-slate-500 font-medium">
                    Showing {filteredPatients.length} of {patients.length} patients
                </p>
                {filteredPatients.map((patient, i) => (
                    <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                    >
                        <Link href={`/junior-doctor/patient/${patient.id}`}>
                            <GlassCard className="p-4 flex items-center justify-between hover:bg-white/60 group cursor-pointer transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {patient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 text-lg group-hover:text-violet-600 transition-colors">
                                            {patient.name}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="font-mono text-xs">{patient.hospitalId}</span>
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
                            </GlassCard>
                        </Link>
                    </motion.div>
                ))}
                {filteredPatients.length === 0 && (
                    <GlassCard className="p-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <Users size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No Patients Found</h3>
                        <p className="text-slate-500 mt-2 text-sm max-w-md">
                            No patients match your search criteria. Try adjusting your filters.
                        </p>
                    </GlassCard>
                )}
            </div>
        </div>
    );
}
