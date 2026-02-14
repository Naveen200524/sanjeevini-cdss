"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitPatientQuestionnaire, getRecentPatients } from "@/lib/tier-mock-api";

const problemCategories = [
    {
        title: "Physical Concerns",
        items: ["Pain", "Fatigue", "Nausea", "Sleep Problems", "Appetite Changes", "Constipation", "Breathing Issues", "Skin Problems", "Tingling/Numbness", "Swelling"],
    },
    {
        title: "Emotional Concerns",
        items: ["Worry", "Sadness", "Depression", "Fear", "Nervousness", "Loss of Interest", "Anger", "Guilt"],
    },
    {
        title: "Social Concerns",
        items: ["Family Problems", "Feeling Alone", "School/Work Issues", "Relationship Difficulties"],
    },
    {
        title: "Practical Concerns",
        items: ["Housing", "Insurance", "Transportation", "Financial", "Work/School", "Child Care"],
    },
    {
        title: "Spiritual / Religious Concerns",
        items: ["Relating to God", "Loss of Faith", "Loss of Meaning", "Questioning Beliefs"],
    },
    {
        title: "Other Concerns",
        items: ["Other (specify)"],
    },
];

export default function DistressThermometerPage() {
    const router = useRouter();
    const [distressScore, setDistressScore] = useState(0);
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleItem = (item: string) => {
        const next = new Set(checkedItems);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        setCheckedItems(next);
    };

    const getThermometerColor = (score: number) => {
        if (score <= 3) return "from-emerald-400 to-emerald-500";
        if (score <= 6) return "from-amber-400 to-amber-500";
        return "from-red-400 to-red-500";
    };

    const handleNext = async () => {
        setIsSubmitting(true);
        try {
            // Demo: fetch a patient to attach this to
            const patients = await getRecentPatients(1);
            const patientId = patients[0]?.id;

            if (patientId) {
                await submitPatientQuestionnaire(patientId, "distress", {
                    score: distressScore,
                    concerns: Array.from(checkedItems)
                });
            }
            router.push("/patient-form/dass");
        } catch (error) {
            console.error("Failed to submit", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Distress Thermometer</h2>
                <p className="text-slate-500 mt-1">Rate your cancer-related distress level and select any concerns you&apos;re experiencing.</p>
            </div>

            {/* Thermometer */}
            <GlassCard className="p-8">
                <h3 className="font-bold text-slate-800 mb-6">
                    How distressed have you been during cancer treatment in the past week? (0–10)
                </h3>
                <div className="flex items-center gap-6">
                    <div className="flex-1">
                        <input
                            type="range"
                            min={0}
                            max={10}
                            value={distressScore}
                            onChange={(e) => setDistressScore(parseInt(e.target.value))}
                            className="w-full h-3 rounded-full appearance-none cursor-pointer accent-amber-500"
                            style={{
                                background: `linear-gradient(to right, #10b981 0%, #f59e0b 50%, #ef4444 100%)`,
                            }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                            <span>No Distress</span>
                            <span>Moderate</span>
                            <span>Extreme</span>
                        </div>
                    </div>
                    <motion.div
                        key={distressScore}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getThermometerColor(distressScore)} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                    >
                        {distressScore}
                    </motion.div>
                </div>
            </GlassCard>

            {/* Problem List */}
            <div>
                <h3 className="font-bold text-lg text-slate-800 mb-4">Problem List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {problemCategories.map((cat) => (
                        <GlassCard key={cat.title} className="p-5">
                            <h4 className="font-semibold text-slate-700 text-sm mb-3">{cat.title}</h4>
                            <div className="space-y-2">
                                {cat.items.map((item) => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={checkedItems.has(item)}
                                            onChange={() => toggleItem(item)}
                                            className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-200 cursor-pointer"
                                        />
                                        <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                                            {item}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 h-11 px-8"
                >
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                    ) : (
                        <>Next: DASS-21 <ArrowRight size={18} className="ml-2" /></>
                    )}
                </Button>
            </div>
        </div>
    );
}
