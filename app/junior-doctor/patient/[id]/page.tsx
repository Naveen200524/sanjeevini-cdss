"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, Activity, FileText, Stethoscope, AlertTriangle, Calendar, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getClinicalScores, type ClinicalScores } from "@/lib/tier-mock-api";

const inputClass = "w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400 transition-all text-sm";
const labelClass = "text-xs font-semibold text-slate-600 uppercase tracking-wide";

const tabOrder = ["diagnosis", "scoring", "treatment", "referral", "dates"];

export default function JuniorDoctorPatientPage() {
    const params = useParams();
    const id = params?.id as string;
    const [scores, setScores] = useState<ClinicalScores | null>(null);
    const [activeTab, setActiveTab] = useState("diagnosis");

    useEffect(() => {
        getClinicalScores(id).then(setScores);
    }, [id]);

    const handleSaveAndNext = () => {
        const currentIndex = tabOrder.indexOf(activeTab);
        if (currentIndex < tabOrder.length - 1) {
            setActiveTab(tabOrder[currentIndex + 1]);
        }
    };

    const isLastTab = activeTab === tabOrder[tabOrder.length - 1];

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Back Button */}
            <Link href="/junior-doctor">
                <Button variant="ghost" className="text-slate-500 hover:text-slate-800">
                    <ChevronLeft size={18} className="mr-2" />
                    Back to Patients
                </Button>
            </Link>

            {/* Patient Header */}
            <GlassCard className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Stethoscope size={100} className="text-slate-400" />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        R
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Rajesh Kumar</h1>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="font-mono text-xs">HSP-2024-0451</span>
                            <span>•</span>
                            <span>55 yrs, Male</span>
                            <span>•</span>
                            <Badge variant="outline" className="border-violet-200 text-violet-600 bg-violet-50">Category 1</Badge>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Assessment Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList>
                        <TabsTrigger value="diagnosis">Cancer Diagnosis</TabsTrigger>
                        <TabsTrigger value="scoring">Oncology Scoring</TabsTrigger>
                        <TabsTrigger value="treatment">Cancer Treatment</TabsTrigger>
                        <TabsTrigger value="referral">Referral</TabsTrigger>
                        <TabsTrigger value="dates">Assessment Dates</TabsTrigger>
                    </TabsList>
                </div>

                {/* Tab 1: Cancer Diagnosis & Staging */}
                <TabsContent value="diagnosis">
                    <GlassCard className="p-8">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                            <Stethoscope size={20} className="text-violet-500" />
                            Cancer Diagnosis & Staging
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <label className={labelClass}>Final Diagnosis</label>
                                <input className={inputClass} placeholder="Enter final diagnosis..." />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Site of Disease</label>
                                <select className={inputClass}>
                                    <option value="">Select site...</option>
                                    <option>Head & Neck</option>
                                    <option>Breast</option>
                                    <option>Thorax</option>
                                    <option>Abdomen</option>
                                    <option>Pelvis</option>
                                    <option>Extremities</option>
                                    <option>Hematological</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Date of Diagnosis</label>
                                <input className={inputClass} type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Category</label>
                                <select className={inputClass}>
                                    <option value="">Select category...</option>
                                    <option>Category 1</option>
                                    <option>Category 2</option>
                                    <option>Category 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button 
                                onClick={handleSaveAndNext}
                                className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                            >
                                Save & Continue <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>

                {/* Tab 2: Oncology Scoring (Auto-Computed) */}
                <TabsContent value="scoring">
                    <GlassCard className="p-8">
                        <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-lg">
                            <Activity size={20} className="text-violet-500" />
                            Oncology Scoring & Interpretation
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">Auto-computed from oncology patient questionnaire responses.</p>

                        {scores ? (
                            <div className="space-y-6">
                                {/* DASS Scores */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 mb-4">DASS-21 Scores</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <ScoreCard
                                            label="Stress (S)"
                                            score={scores.stressScore}
                                            referral={scores.stressReferral}
                                            max={42}
                                            thresholds={[14, 18, 25, 33]}
                                        />
                                        <ScoreCard
                                            label="Anxiety (A)"
                                            score={scores.anxietyScore}
                                            referral={scores.anxietyReferral}
                                            max={42}
                                            thresholds={[7, 9, 14, 19]}
                                        />
                                        <ScoreCard
                                            label="Depression (D)"
                                            score={scores.depressionScore}
                                            referral={scores.depressionReferral}
                                            max={42}
                                            thresholds={[9, 13, 20, 27]}
                                        />
                                    </div>
                                </div>

                                {/* COST FACIT */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-bold">COST FACIT Total Score</p>
                                        <p className="text-3xl font-bold text-slate-800 mt-1">{scores.costFacitTotal}</p>
                                        <Badge className="mt-2 bg-violet-100 text-violet-700 border-none">{scores.costFacitGrade}</Badge>
                                    </div>
                                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-bold">Quality of Life Score</p>
                                        <p className="text-3xl font-bold text-slate-800 mt-1">{scores.qolTotal}</p>
                                        <p className="text-xs text-slate-400 mt-2">Out of 100</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-8 h-8 border-3 border-violet-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                        <div className="flex justify-end mt-8">
                            <Button 
                                onClick={handleSaveAndNext}
                                className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                            >
                                Continue to Treatment <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>

                {/* Tab 3: Cancer Treatment Details */}
                <TabsContent value="treatment">
                    <GlassCard className="p-8">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                            <FileText size={20} className="text-violet-500" />
                            Cancer Treatment Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <label className={labelClass}>Q9: Treatment Modality Planned/Received</label>
                                <select className={inputClass}>
                                    <option value="">Select...</option>
                                    <option>Surgery</option>
                                    <option>Chemotherapy</option>
                                    <option>Radiotherapy</option>
                                    <option>Chemo + RT</option>
                                    <option>Surgery + Chemo</option>
                                    <option>Surgery + RT</option>
                                    <option>Surgery + Chemo + RT</option>
                                    <option>Palliative Care</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q10: Type of Systemic Therapy</label>
                                <input className={inputClass} placeholder="e.g. Cisplatin-based" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q11: Duration of Systemic Therapy</label>
                                <input className={inputClass} placeholder="e.g. 6 cycles" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q12: Ward Admissions due to Adverse Events</label>
                                <input className={inputClass} type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q13: ICU Admissions</label>
                                <input className={inputClass} type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q14: Use of Generic Drugs?</label>
                                <select className={inputClass}>
                                    <option value="">Select...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                    <option>Mixed</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q15: RT Technique</label>
                                <select className={inputClass}>
                                    <option value="">Select...</option>
                                    <option>2D</option>
                                    <option>3D-CRT</option>
                                    <option>IMRT</option>
                                    <option>VMAT</option>
                                    <option>SRS/SBRT</option>
                                    <option>Not Applicable</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q16: Number of Fractions</label>
                                <input className={inputClass} type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q17: Any Surgical Procedure?</label>
                                <select className={inputClass}>
                                    <option value="">Select...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Q18: Post-op Complications (Prolonged Admission)?</label>
                                <select className={inputClass}>
                                    <option value="">Select...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className={labelClass}>Q19: Longest Duration of Hospital Admission</label>
                                <input className={inputClass} placeholder="e.g. 14 days" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button 
                                onClick={handleSaveAndNext}
                                className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                            >
                                Save & Continue <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>

                {/* Tab 4: Oncology Referral & Intervention */}
                <TabsContent value="referral">
                    <GlassCard className="p-8">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                            <AlertTriangle size={20} className="text-violet-500" />
                            Oncology Referral & Intervention
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClass}>Referral Required?</label>
                                <select className={inputClass}>
                                    <option value="">Select...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Referral Details</label>
                                <input className={inputClass} placeholder="Department/ Specialist name" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className={labelClass}>Physical Concerns (Review)</label>
                                <textarea
                                    className={`${inputClass} min-h-[80px] resize-y`}
                                    placeholder="Document any physical concerns reviewed..."
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className={labelClass}>Intervention Notes</label>
                                <textarea
                                    className={`${inputClass} min-h-[100px] resize-y`}
                                    placeholder="Document intervention details..."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button 
                                onClick={handleSaveAndNext}
                                className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                            >
                                Save & Continue <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>

                {/* Tab 5: Assessment Dates */}
                <TabsContent value="dates">
                    <GlassCard className="p-8">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                            <Calendar size={20} className="text-violet-500" />
                            Assessment Dates
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClass}>Date of 1st Assessment</label>
                                <input className={inputClass} type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Date of 2nd Assessment</label>
                                <input className={inputClass} type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Date of 3rd Assessment</label>
                                <input className={inputClass} type="date" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Link href="/junior-doctor">
                                <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                                    <CheckCircle size={16} className="mr-2" /> Complete Assessment
                                </Button>
                            </Link>
                        </div>
                    </GlassCard>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// ─── Score Card Sub-Component ─────────────────────────────

function ScoreCard({ label, score, referral, max, thresholds }: {
    label: string;
    score: number;
    referral: boolean;
    max: number;
    thresholds: number[];
}) {
    const getSeverity = () => {
        if (score <= thresholds[0]) return { level: "Normal", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
        if (score <= thresholds[1]) return { level: "Mild", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
        if (score <= thresholds[2]) return { level: "Moderate", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
        if (score <= thresholds[3]) return { level: "Severe", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
        return { level: "Extremely Severe", color: "text-red-700", bg: "bg-red-100", border: "border-red-300" };
    };

    const severity = getSeverity();
    const percentage = Math.min((score / max) * 100, 100);

    return (
        <div className={`p-5 rounded-2xl border ${severity.border} ${severity.bg}`}>
            <p className="text-xs text-slate-500 uppercase font-bold">{label}</p>
            <div className="flex items-end gap-2 mt-2">
                <p className={`text-3xl font-bold ${severity.color}`}>{score}</p>
                <span className="text-xs text-slate-400 mb-1">/ {max}</span>
            </div>
            <div className="w-full h-1.5 bg-white/50 rounded-full mt-3 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${percentage > 75 ? "bg-red-500" : percentage > 50 ? "bg-orange-500" : percentage > 25 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                />
            </div>
            <div className="flex items-center justify-between mt-3">
                <Badge className={`${severity.bg} ${severity.color} border-none text-xs`}>
                    {severity.level}
                </Badge>
                <div className="flex items-center gap-1">
                    {referral ? (
                        <><AlertTriangle size={12} className="text-red-500" /><span className="text-[10px] text-red-600 font-semibold">Referral</span></>
                    ) : (
                        <><CheckCircle size={12} className="text-emerald-500" /><span className="text-[10px] text-emerald-600 font-semibold">OK</span></>
                    )}
                </div>
            </div>
        </div>
    );
}
