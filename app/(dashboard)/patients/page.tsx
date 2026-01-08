"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, UserPlus, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock Data matching ui.md
const patients = [
    { id: "1", name: "Rajesh Kumar", mrn: "MRN12345", age: 55, gender: "Male", lastTest: "2 days ago", risk: "High", condition: "CVD", riskColor: "bg-red-500", score: "82%" },
    { id: "2", name: "Priya Sharma", mrn: "MRN12346", age: 48, gender: "Female", lastTest: "5 days ago", risk: "Moderate", condition: "Diabetes", riskColor: "bg-amber-500", score: "58%" },
    { id: "3", name: "Amit Patel", mrn: "MRN12347", age: 62, gender: "Male", lastTest: "1 week ago", risk: "Low", condition: "Routine", riskColor: "bg-emerald-500", score: "12%" },
    { id: "4", name: "Sunita Reddy", mrn: "MRN12348", age: 34, gender: "Female", lastTest: "2 weeks ago", risk: "Low", condition: "Routine", riskColor: "bg-emerald-500", score: "5%" },
    { id: "5", name: "Vikram Singh", mrn: "MRN12349", age: 58, gender: "Male", lastTest: "3 days ago", risk: "High", condition: "CKD", riskColor: "bg-red-500", score: "78%" },
];

export default function PatientsPage() {
    return (
        <div className="space-y-8">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                        Patient Directory
                    </h1>
                    <p className="text-slate-500">Manage patient records and initiate new analyses.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" className="bg-white/50 border-white/60 hover:bg-white text-slate-600">
                        <FileText size={16} className="mr-2" />
                        Export
                    </Button>
                    <Button className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                        <UserPlus size={18} className="mr-2" />
                        Register New Patient
                    </Button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <GlassCard className="p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Name, MRN, Phone..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/50 border border-slate-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 outline-none transition-all"
                        />
                    </div>
                    <Button variant="secondary" className="whitespace-nowrap bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200">
                        <span className="mr-2">📷</span> Scan ID
                    </Button>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button variant="ghost" className="bg-slate-100/50 text-slate-600">
                        <Filter size={16} className="mr-2" />
                        Filters
                    </Button>
                    <select className="bg-slate-100/50 border-none rounded-lg px-3 py-2 text-sm text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                        <option>All Risk Levels</option>
                        <option>High Risk (Critical)</option>
                        <option>Moderate Risk</option>
                        <option>Low Risk</option>
                    </select>
                </div>
            </GlassCard>

            {/* Patients List */}
            <div className="grid gap-4">
                {patients.map((patient, i) => (
                    <Link href={`/patients/${patient.id}`} key={patient.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <GlassCard className="p-4 flex items-center justify-between hover:bg-white/60 group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${patient.risk === 'High' ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-blue-500 to-sky-600'}`}>
                                        {patient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 text-lg group-hover:text-primary-600 transition-colors">
                                            {patient.name}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span>{patient.mrn}</span>
                                            <span>•</span>
                                            <span>{patient.age} yrs, {patient.gender}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Last Test</p>
                                        <p className="text-sm font-medium text-slate-600">{patient.lastTest}</p>
                                    </div>

                                    <div className="flex flex-col items-end min-w-[100px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-2 h-2 rounded-full ${patient.riskColor} animate-pulse`}></span>
                                            <span className="font-bold text-slate-700">{patient.risk}</span>
                                        </div>
                                        <Badge className={`${patient.risk === 'High' ? 'bg-red-100 text-red-700' : patient.risk === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'} border-none`}>
                                            {patient.condition} ({patient.score})
                                        </Badge>
                                    </div>

                                    <ChevronRight className="text-slate-300 group-hover:text-primary-400 transition-colors" />
                                </div>
                            </GlassCard>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
