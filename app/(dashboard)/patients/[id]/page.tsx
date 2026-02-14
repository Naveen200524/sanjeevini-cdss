"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, Edit, Activity, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HistoryTimeline } from "@/components/patient/history-timeline";
import { BiomarkerForm } from "@/components/patient/biomarker-form";
import { RiskPredictionView } from "@/components/clinical/risk-prediction-view";
import { BiomarkerTrendsChart } from "@/components/patient/biomarker-trends-chart";

export default function PatientProfilePage() {
    const params = useParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const patientId = params?.id as string;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Navigation & Actions */}
            <div className="flex items-center justify-between">
                <Link href="/patients">
                    <Button variant="ghost" className="text-slate-500 hover:text-slate-800">
                        <ChevronLeft size={18} className="mr-2" />
                        Back to Directory
                    </Button>
                </Link>
                <div className="flex gap-3">
                    <Button variant="secondary" className="text-slate-600 bg-white/40 border-slate-200">
                        <FileText size={16} className="mr-2" /> Generate Report
                    </Button>
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Activity size={18} className="mr-2" /> New Oncology Analysis
                    </Button>
                </div>
            </div>

            {/* Patient Header Card */}
            <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Activity size={120} className="text-slate-400" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white/50">
                        RK
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                                    Rajesh Kumar
                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none px-3 py-1 text-sm">
                                        High Risk
                                    </Badge>
                                </h1>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 mt-2 text-sm font-medium">
                                    <span>ID: <span className="text-slate-800">MRN12345</span></span>
                                    <span>DOB: <span className="text-slate-800">12 Jan 1968 (55y)</span></span>
                                    <span>Gender: <span className="text-slate-800">Male</span></span>
                                    <span>Blood: <span className="text-slate-800">O+</span></span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="bg-white/50 hover:bg-white text-slate-500">
                                <Edit size={18} />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="outline" className="border-slate-200 text-slate-600 bg-slate-50/50">
                                Lung Adenocarcinoma (Stage IIIA)
                            </Badge>
                            <Badge variant="outline" className="border-slate-200 text-slate-600 bg-slate-50/50">
                                ECOG PS 1
                            </Badge>
                            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50/50">
                                <AlertTriangle size={12} className="mr-1" />
                                Cisplatin Allergy
                            </Badge>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Main Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="biomarkers">Tumor Markers & Labs</TabsTrigger>
                        <TabsTrigger value="predictions">Cancer Risk Predictions</TabsTrigger>
                        <TabsTrigger value="history">Treatment History</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Vitals Summary */}
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Activity size={18} className="text-primary-500" /> Oncology Vitals
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Blood Pressure</p>
                                    <p className="text-xl font-bold text-slate-800 mt-1">140/90</p>
                                    <p className="text-xs text-red-500 font-medium mt-1">↑ High</p>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Heart Rate</p>
                                    <p className="text-xl font-bold text-slate-800 mt-1">78 bpm</p>
                                    <p className="text-xs text-emerald-500 font-medium mt-1">Normal</p>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">BMI</p>
                                    <p className="text-xl font-bold text-slate-800 mt-1">28.4</p>
                                    <p className="text-xs text-amber-500 font-medium mt-1">Overweight</p>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">SpO2</p>
                                    <p className="text-xl font-bold text-slate-800 mt-1">98%</p>
                                    <p className="text-xs text-emerald-500 font-medium mt-1">Normal</p>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Active Medications */}
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-primary-500" /> Active Cancer Medications
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Pembrolizumab", dose: "200mg", freq: "Q3W IV", status: "Active" },
                                    { name: "Carboplatin", dose: "AUC 5", freq: "Q3W IV", status: "Active" },
                                    { name: "Ondansetron", dose: "8mg", freq: "PRN", status: "Active" },
                                ].map((med, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                                        <div>
                                            <p className="font-semibold text-slate-800">{med.name}</p>
                                            <p className="text-xs text-slate-500">{med.dose} • {med.freq}</p>
                                        </div>
                                        <Badge className="bg-emerald-100 text-emerald-700 border-none scale-90">
                                            {med.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Trends Chart */}
                    <BiomarkerTrendsChart />
                </TabsContent>

                <TabsContent value="biomarkers">
                    <BiomarkerForm />
                </TabsContent>

                <TabsContent value="predictions">
                    <RiskPredictionView />
                </TabsContent>

                <TabsContent value="history">
                    <HistoryTimeline />
                </TabsContent>
            </Tabs>
        </div >
    );
}
