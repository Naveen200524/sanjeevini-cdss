"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitPatientQuestionnaire } from "@/lib/tier-mock-api";
import { getRecentPatients } from "@/lib/supabase-api";

const costItems = [
    { code: "Q1", label: "I know that I have enough money in savings, retirement, or assets to cover the costs of my treatment", scoring: "FT1 = 0 + Response" },
    { code: "Q2", label: "My out-of-pocket medical expenses are more than I thought they would be", scoring: "FT2 = 4 − Response" },
    { code: "Q3", label: "I worry about the financial problems I will have in the future as a result of my illness or treatment", scoring: "FT3 = 4 − Response" },
    { code: "Q4", label: "I feel I have no choice about the amount of money I spend on care", scoring: "FT4 = 4 − Response" },
    { code: "Q5", label: "I am frustrated that I cannot work or contribute as much as I usually do", scoring: "FT5 = 4 − Response" },
    { code: "Q6", label: "I am satisfied with my current financial situation", scoring: "FT6 = 0 + Response" },
    { code: "Q7", label: "I am able to meet my monthly expenses", scoring: "FT7 = 0 + Response" },
    { code: "Q8", label: "I feel financially stressed", scoring: "FT8 = 4 − Response" },
    { code: "Q9", label: "I am concerned about keeping my job and income, including paid work at home", scoring: "FT9 = 4 − Response" },
    { code: "Q10", label: "My cancer or treatment has reduced my satisfaction with my present financial situation", scoring: "FT10 = 4 − Response" },
    { code: "Q11", label: "I feel in control of my financial situation", scoring: "FT11 = 0 + Response" },
    { code: "Q12", label: "My illness has been a financial hardship to my family and me", scoring: "N/A" },
];

const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "A little bit" },
    { value: 2, label: "Somewhat" },
    { value: 3, label: "Quite a bit" },
    { value: 4, label: "Very much" },
];

export default function CostFacitPage() {
    const router = useRouter();
    const [responses, setResponses] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setResponse = (code: string, value: number) => {
        setResponses((prev) => ({ ...prev, [code]: value }));
    };

    const handleNext = async () => {
        setIsSubmitting(true);
        try {
            const patients = await getRecentPatients(1);
            const patientId = patients[0]?.id;

            if (patientId) {
                await submitPatientQuestionnaire(patientId, "cost-facit", responses);
            }
            router.push("/patient-form/quality-of-life");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">COST FACIT</h2>
                <p className="text-slate-500 mt-1">
                    Financial Impact of Cancer Treatment — Please indicate how much each statement applies to you.
                </p>
            </div>

            <div className="space-y-4">
                {costItems.map((item, i) => (
                    <motion.div
                        key={item.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                    >
                        <GlassCard className="p-5">
                            <div className="flex items-start gap-3 mb-1">
                                <span className="text-xs font-mono bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md shrink-0">
                                    {item.code}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{item.label}</p>
                                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{item.scoring}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setResponse(item.code, opt.value)}
                                        className={`flex-1 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${responses[item.code] === opt.value
                                            ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                                            : "bg-white/50 text-slate-600 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                                            }`}
                                    >
                                        {opt.value}
                                    </button>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                <Link href="/patient-form/dass">
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
                        <>Next: Quality of Life <ArrowRight size={18} className="ml-2" /></>
                    )}
                </Button>
            </div>
        </div>
    );
}
