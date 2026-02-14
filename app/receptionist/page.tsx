"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, CheckCircle, Clock, Search, ChevronRight, X, Phone, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReceptionistStats, getReceptionistQueue, type ReceptionistStats, type ReceptionistQueueItem } from "@/lib/tier-mock-api";

export default function ReceptionistHomePage() {
    const [stats, setStats] = useState<ReceptionistStats | null>(null);
    const [queue, setQueue] = useState<ReceptionistQueueItem[]>([]);
    const [selectedQueueItem, setSelectedQueueItem] = useState<ReceptionistQueueItem | null>(null);

    useEffect(() => {
        getReceptionistStats().then(setStats);
        getReceptionistQueue().then(setQueue);
    }, []);

    const handleQueueItemClick = (item: ReceptionistQueueItem) => {
        setSelectedQueueItem(item);
    };

    const closeQueueItemDetails = () => {
        setSelectedQueueItem(null);
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Oncology Reception 🏥
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Today&apos;s oncology patient registration overview
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/receptionist/search">
                        <Button variant="secondary" className="bg-white/50 border-white/60 hover:bg-white text-slate-600">
                            <Search size={16} className="mr-2" />
                            Search Patient
                        </Button>
                    </Link>
                    <Link href="/receptionist/register">
                        <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20">
                            <UserPlus size={18} className="mr-2" />
                            New Registration
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Patients Today</p>
                            <p className="text-3xl font-bold text-slate-800 mt-0.5">{stats?.patientsToday ?? "—"}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pending</p>
                            <p className="text-3xl font-bold text-slate-800 mt-0.5">{stats?.pendingRegistration ?? "—"}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Completed</p>
                            <p className="text-3xl font-bold text-slate-800 mt-0.5">{stats?.completed ?? "—"}</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Queue Item Details Modal */}
            <AnimatePresence>
                {selectedQueueItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={closeQueueItemDetails}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800">Queue Details</h3>
                                <button
                                    onClick={closeQueueItemDetails}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Patient Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        {selectedQueueItem.patientName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800">{selectedQueueItem.patientName}</h4>
                                        <span className="font-mono text-sm text-slate-500">{selectedQueueItem.hospitalId}</span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500">Current Status:</span>
                                    <Badge className={
                                        selectedQueueItem.status === "Done"
                                            ? "bg-emerald-100 text-emerald-700 border-none"
                                            : selectedQueueItem.status === "In Progress"
                                                ? "bg-amber-100 text-amber-700 border-none"
                                                : "bg-slate-100 text-slate-600 border-none"
                                    }>
                                        {selectedQueueItem.status}
                                    </Badge>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Phone size={16} className="text-teal-500" />
                                            <p className="text-xs text-slate-500 uppercase font-semibold">Phone</p>
                                        </div>
                                        <p className="text-slate-800 font-medium">{selectedQueueItem.phone || "Not provided"}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock size={16} className="text-teal-500" />
                                            <p className="text-xs text-slate-500 uppercase font-semibold">Check-in Time</p>
                                        </div>
                                        <p className="text-slate-800 font-medium">{selectedQueueItem.time}</p>
                                    </div>
                                </div>

                                {/* Form Completion Status */}
                                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText size={16} className="text-teal-600" />
                                        <p className="text-sm font-semibold text-teal-700">Form Completion Progress</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">Demographics</span>
                                            <Badge className={
                                                selectedQueueItem.status !== "Waiting"
                                                    ? "bg-emerald-100 text-emerald-700 border-none"
                                                    : "bg-slate-100 text-slate-500 border-none"
                                            }>
                                                {selectedQueueItem.status !== "Waiting" ? "Complete" : "Pending"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">Questionnaires</span>
                                            <Badge className={
                                                selectedQueueItem.status === "Done"
                                                    ? "bg-emerald-100 text-emerald-700 border-none"
                                                    : selectedQueueItem.status === "In Progress"
                                                        ? "bg-amber-100 text-amber-700 border-none"
                                                        : "bg-slate-100 text-slate-500 border-none"
                                            }>
                                                {selectedQueueItem.status === "Done" ? "Complete" : selectedQueueItem.status === "In Progress" ? "In Progress" : "Pending"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Today's Queue */}
            <GlassCard className="overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Clock size={18} className="text-teal-500" />
                        Today&apos;s Queue
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-medium">Patient Name</th>
                                <th className="px-6 py-4 font-medium">Hospital ID</th>
                                <th className="px-6 py-4 font-medium">Phone</th>
                                <th className="px-6 py-4 font-medium">Time</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queue.map((item, i) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer"
                                    onClick={() => handleQueueItemClick(item)}
                                >
                                    <td className="px-6 py-4 font-medium text-slate-700">{item.patientName}</td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{item.hospitalId}</td>
                                    <td className="px-6 py-4 text-slate-500">{item.phone}</td>
                                    <td className="px-6 py-4 text-slate-500">{item.time}</td>
                                    <td className="px-6 py-4">
                                        <Badge className={
                                            item.status === "Done"
                                                ? "bg-emerald-100 text-emerald-700 border-none"
                                                : item.status === "In Progress"
                                                    ? "bg-amber-100 text-amber-700 border-none"
                                                    : "bg-slate-100 text-slate-600 border-none"
                                        }>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="text-teal-600 hover:bg-teal-50">
                                            View <ChevronRight size={14} className="ml-1" />
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
