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

const qolItems = [
    { id: "qol1", label: "How would you rate your quality of life?" },
    { id: "qol2", label: "How satisfied are you with your health?" },
    { id: "qol3", label: "Do you have enough energy for everyday life?" },
    { id: "qol4", label: "How satisfied are you with your ability to perform your daily activities?" },
    { id: "qol5", label: "How satisfied are you with yourself?" },
    { id: "qol6", label: "How satisfied are you with your personal relationships?" },
    { id: "qol7", label: "Have you enough money to meet your needs?" },
    { id: "qol8", label: "How satisfied are you with the conditions of your living place?" },
];

const ratingLabels = [
    { value: 1, label: "Very Poor", color: "bg-red-500" },
    { value: 2, label: "Poor", color: "bg-orange-500" },
    { value: 3, label: "Neither", color: "bg-amber-500" },
    { value: 4, label: "Good", color: "bg-emerald-400" },
    { value: 5, label: "Very Good", color: "bg-emerald-600" },
];

export default function QualityOfLifePage() {
    const router = useRouter();
    const [responses, setResponses] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setResponse = (id: string, value: number) => {
        setResponses((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = async () => {
        setIsSubmitting(true);
        try {
            const patients = await getRecentPatients(1);
            const patientId = patients[0]?.id;

            if (patientId) {
                await submitPatientQuestionnaire(patientId, "qol", responses);
            }
            router.push("/patient-form/history");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Quality of Life</h2>
                <p className="text-slate-500 mt-1">
                    Please rate the following aspects of your life during cancer treatment.
                </p>
            </div>

            <div className="space-y-4">
                {qolItems.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <GlassCard className="p-5">
                            <p className="text-sm text-slate-700 font-medium mb-4">{item.label}</p>
                            <div className="flex gap-2">
                                {ratingLabels.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setResponse(item.id, opt.value)}
                                        className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-200 border ${responses[item.id] === opt.value
                                            ? `${opt.color} text-white border-transparent shadow-lg`
                                            : "bg-white/50 text-slate-600 border-slate-200 hover:border-slate-300"
                                            }`}
                                    >
                                        <span className="text-lg font-bold">{opt.value}</span>
                                        <span className="text-[10px] font-medium">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                <Link href="/patient-form/cost-facit">
                    <Button variant="secondary" className="bg-white/50">
                        <ArrowLeft size={18} className="mr-2" /> Back
                    </Button>
                </Link>
                <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                >
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                    ) : (
                        <>Next: Medical History <ArrowRight size={18} className="ml-2" /></>
                    )}
                </Button>
            </div>
        </div>
    );
}
