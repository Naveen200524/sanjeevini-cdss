"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitPatientQuestionnaire } from "@/lib/tier-mock-api";
import { getRecentPatients } from "@/lib/tier-mock-api";

const inputClass = "w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm";
const labelClass = "text-xs font-semibold text-slate-600 uppercase tracking-wide";

const comorbidOptions = ["Diabetes", "Hypertension", "Heart Disease", "Kidney Disease", "Liver Disease", "Asthma/COPD", "Thyroid Disorder", "None"];
const habitOptions = ["Smoking", "Alcohol", "Tobacco Chewing", "Betel Nut", "None"];

export default function PersonalHistoryPage() {
    const router = useRouter();
    const [comorbids, setComorbids] = useState<Set<string>>(new Set());
    const [habits, setHabits] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        diagnosisAwareness: "",
        prognosisAwareness: "",
        psychiatricHistory: "",
        chronicComorbid: "",
        familyCancer: "",
        previousDebts: "",
        financialBurden: "",
    });

    const toggle = (set: Set<string>, item: string, setter: (s: Set<string>) => void) => {
        const next = new Set(set);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        setter(next);
    };

    const updateField = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const patients = await getRecentPatients(1);
            const patientId = patients[0]?.id;

            if (patientId) {
                await submitPatientQuestionnaire(patientId, "history", {
                    ...formData,
                    comorbids: Array.from(comorbids),
                    habits: Array.from(habits)
                });
            }
            router.push("/patient-form/complete");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Personal & Medical History</h2>
                <p className="text-slate-500 mt-1">
                    Cancer-relevant medical, family, and personal background.
                </p>
            </div>

            {/* Comorbids & Habits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassCard className="p-5">
                    <h4 className="font-semibold text-slate-700 text-sm mb-3">Comorbids</h4>
                    <div className="space-y-2">
                        {comorbidOptions.map((item) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={comorbids.has(item)}
                                    onChange={() => toggle(comorbids, item, setComorbids)}
                                    className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-200"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{item}</span>
                            </label>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-5">
                    <h4 className="font-semibold text-slate-700 text-sm mb-3">Personal Habits</h4>
                    <div className="space-y-2">
                        {habitOptions.map((item) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={habits.has(item)}
                                    onChange={() => toggle(habits, item, setHabits)}
                                    className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-200"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{item}</span>
                            </label>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Awareness & History Questions */}
            <GlassCard className="p-6 space-y-5">
                <h4 className="font-semibold text-slate-700 text-lg">Cancer Awareness & Family History</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className={labelClass}>Q7: Aware of cancer diagnosis?</label>
                        <select className={inputClass} value={formData.diagnosisAwareness} onChange={(e) => updateField("diagnosisAwareness", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Partially</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Q8: Aware of cancer prognosis?</label>
                        <select className={inputClass} value={formData.prognosisAwareness} onChange={(e) => updateField("prognosisAwareness", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Partially</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Q20: Personal/family psychiatric illness?</label>
                        <select className={inputClass} value={formData.psychiatricHistory} onChange={(e) => updateField("psychiatricHistory", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Q21: Personal chronic comorbid illness?</label>
                        <select className={inputClass} value={formData.chronicComorbid} onChange={(e) => updateField("chronicComorbid", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Q22: Family history of cancer?</label>
                        <select className={inputClass} value={formData.familyCancer} onChange={(e) => updateField("familyCancer", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Q23: History of previous debts?</label>
                        <select className={inputClass} value={formData.previousDebts} onChange={(e) => updateField("previousDebts", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className={labelClass}>Q24: Did financial burden affect cancer treatment compliance?</label>
                        <select className={inputClass} value={formData.financialBurden} onChange={(e) => updateField("financialBurden", e.target.value)}>
                            <option value="">Select...</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Partially</option>
                        </select>
                    </div>
                </div>
            </GlassCard>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                <Link href="/patient-form/quality-of-life">
                    <Button variant="secondary" className="bg-white/50">
                        <ArrowLeft size={18} className="mr-2" /> Back
                    </Button>
                </Link>
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                >
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                    ) : (
                        <>Submit <ArrowRight size={18} className="ml-2" /></>
                    )}
                </Button>
            </div>
        </div>
    );
}
