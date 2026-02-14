"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { UserPlus, ChevronRight, UserSearch, SearchX, X, Phone, Mail, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchPatients, type RegisteredPatient } from "@/lib/tier-mock-api";

export default function ReceptionistSearchPage() {
    const [results, setResults] = useState<RegisteredPatient[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<RegisteredPatient | null>(null);

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }
        setIsSearching(true);
        setHasSearched(true);
        const data = await searchPatients(query);
        setResults(data);
        setIsSearching(false);
    };

    const handlePatientClick = (patient: RegisteredPatient) => {
        setSelectedPatient(patient);
    };

    const closePatientDetails = () => {
        setSelectedPatient(null);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                    Patient Search
                </h1>
                <p className="text-slate-500 font-medium mt-1">
                    Find existing patients by Hospital ID or Phone Number
                </p>
            </div>

            {/* Search Bar */}
            <GlassCard className="p-5">
                <SearchInput onSearch={handleSearch} />
            </GlassCard>

            {/* Patient Details Modal */}
            <AnimatePresence>
                {selectedPatient && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={closePatientDetails}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800">Patient Details</h3>
                                <button
                                    onClick={closePatientDetails}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Patient Avatar & Name */}
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {selectedPatient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-mono text-sm text-slate-500">{selectedPatient.hospitalId}</span>
                                            <Badge className={
                                                selectedPatient.status === "Complete"
                                                    ? "bg-emerald-100 text-emerald-700 border-none"
                                                    : selectedPatient.status === "In Progress"
                                                        ? "bg-amber-100 text-amber-700 border-none"
                                                        : "bg-slate-100 text-slate-600 border-none"
                                            }>
                                                {selectedPatient.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Basic Info (Receptionist Level Access) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Age</p>
                                        <p className="text-lg font-bold text-slate-800">{selectedPatient.age} years</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Sex</p>
                                        <p className="text-lg font-bold text-slate-800">{selectedPatient.sex}</p>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Contact Information</h5>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Phone size={18} className="text-teal-500" />
                                        <span className="text-slate-700">{selectedPatient.phone || "Not provided"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Mail size={18} className="text-teal-500" />
                                        <span className="text-slate-700">{selectedPatient.email || "Not provided"}</span>
                                    </div>
                                    {selectedPatient.hometown && (
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <MapPin size={18} className="text-teal-500" />
                                            <span className="text-slate-700">{selectedPatient.hometown}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Registration Info */}
                                <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Registration Details</h5>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Calendar size={18} className="text-teal-500" />
                                        <div>
                                            <p className="text-xs text-slate-500">Enrollment Date</p>
                                            <p className="text-slate-700">{selectedPatient.enrollmentDate || "Not set"}</p>
                                        </div>
                                    </div>
                                    {selectedPatient.studyParticipantNumber && (
                                        <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
                                            <p className="text-xs text-teal-600 uppercase font-semibold">Study Participant Number</p>
                                            <p className="text-lg font-mono font-bold text-teal-700">{selectedPatient.studyParticipantNumber}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results */}
            <AnimatePresence mode="wait">
                {isSearching && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center py-16"
                    >
                        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                )}

                {!isSearching && hasSearched && results.length === 0 && (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <GlassCard className="p-12 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <SearchX size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700">No Patient Found</h3>
                            <p className="text-slate-500 mt-2 text-sm max-w-md">
                                No matching records found. You can register a new patient entry.
                            </p>
                            <Link href="/receptionist/register" className="mt-6">
                                <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20">
                                    <UserPlus size={18} className="mr-2" />
                                    Register New Patient
                                </Button>
                            </Link>
                        </GlassCard>
                    </motion.div>
                )}

                {!isSearching && results.length > 0 && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <p className="text-sm text-slate-500 font-medium">
                            {results.length} result{results.length !== 1 ? "s" : ""} found
                        </p>
                        {results.map((patient, i) => (
                            <motion.div
                                key={patient.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => handlePatientClick(patient)}
                            >
                                <GlassCard className="p-4 flex items-center justify-between hover:bg-white/60 group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                            {patient.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800 text-lg group-hover:text-teal-600 transition-colors">
                                                {patient.name}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                                <span className="font-mono text-xs">{patient.hospitalId}</span>
                                                <span>•</span>
                                                <span>{patient.phone}</span>
                                                <span>•</span>
                                                <span>{patient.age} yrs, {patient.sex}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={
                                            patient.status === "Complete"
                                                ? "bg-emerald-100 text-emerald-700 border-none"
                                                : patient.status === "In Progress"
                                                    ? "bg-amber-100 text-amber-700 border-none"
                                                    : "bg-slate-100 text-slate-600 border-none"
                                        }>
                                            {patient.status}
                                        </Badge>
                                        <ChevronRight className="text-slate-300 group-hover:text-teal-400 transition-colors" />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State when no search yet */}
            {!hasSearched && (
                <div className="flex flex-col items-center text-center pt-8">
                    <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                        <UserSearch size={40} className="text-teal-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-600">Search for a Patient</h3>
                    <p className="text-slate-400 mt-2 text-sm max-w-sm">
                        Enter a Hospital ID or Phone Number to find an existing patient record.
                    </p>
                </div>
            )}
        </div>
    );
}
