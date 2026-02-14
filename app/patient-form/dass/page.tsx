"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitPatientQuestionnaire, getRecentPatients } from "@/lib/tier-mock-api";

const dassItems = [
    { code: "S1", label: "I found it hard to wind down" },
    { code: "A1", label: "I was aware of dryness of my mouth" },
    { code: "D1", label: "I couldn't seem to experience any positive feeling at all" },
    { code: "A2", label: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)" },
    { code: "D2", label: "I found it difficult to work up the initiative to do things" },
    { code: "S2", label: "I tended to over-react to situations" },
    { code: "A3", label: "I experienced trembling (e.g., in the hands)" },
    { code: "S3", label: "I felt that I was using a lot of nervous energy" },
    { code: "A4", label: "I was worried about situations in which I might panic and make a fool of myself" },
    { code: "D3", label: "I felt that I had nothing to look forward to" },
    { code: "S4", label: "I found myself getting agitated" },
    { code: "S5", label: "I found it difficult to relax" },
    { code: "D4", label: "I felt down-hearted and blue" },
    { code: "S6", label: "I was intolerant of anything that kept me from getting on with what I was doing" },
    { code: "A5", label: "I felt I was close to panic" },
    { code: "D5", label: "I was unable to become enthusiastic about anything" },
    { code: "D6", label: "I felt I wasn't worth much as a person" },
    { code: "S7", label: "I felt that I was rather touchy" },
    { code: "A6", label: "I was aware of the action of my heart in the absence of physical exertion" },
    { code: "A7", label: "I felt scared without any good reason" },
    { code: "D7", label: "I felt that life was meaningless" },
];

const options = [
    { value: 0, label: "Did not apply to me at all" },
    { value: 1, label: "Applied to me to some degree" },
    { value: 2, label: "Applied to me a considerable degree" },
    { value: 3, label: "Applied to me very much" },
];

const ITEMS_PER_PAGE = 7;

export default function DASSPage() {
    const router = useRouter();
    const [responses, setResponses] = useState<Record<string, number>>({});
    const [page, setPage] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalPages = Math.ceil(dassItems.length / ITEMS_PER_PAGE);
    const currentItems = dassItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    const setResponse = (code: string, value: number) => {
        setResponses((prev) => ({ ...prev, [code]: value }));
    };

    const handleNext = async () => {
        setIsSubmitting(true);
        try {
            const patients = await getRecentPatients(1);
            const patientId = patients[0]?.id;

            if (patientId) {
                await submitPatientQuestionnaire(patientId, "dass", responses);
            }
            router.push("/patient-form/cost-facit");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">DASS-21 Questionnaire</h2>
                <p className="text-slate-500 mt-1">
                    Please read each statement and select how much it applied to you during your cancer treatment over the past week.
                </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((page + 1) / totalPages) * 100}%` }}
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    />
                </div>
                <span className="text-xs text-slate-500 font-medium shrink-0">
                    Page {page + 1} of {totalPages}
                </span>
            </div>

            {/* Questions */}
            <div className="space-y-4">
                {currentItems.map((item, i) => (
                    <motion.div
                        key={item.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <GlassCard className="p-5">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="text-xs font-mono bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md shrink-0">
                                    {item.code}
                                </span>
                                <p className="text-sm text-slate-700 font-medium leading-relaxed">{item.label}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setResponse(item.code, opt.value)}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border text-left ${responses[item.code] === opt.value
                                            ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                                            : "bg-white/50 text-slate-600 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                {page > 0 ? (
                    <Button variant="secondary" onClick={() => setPage(page - 1)} className="bg-white/50">
                        <ArrowLeft size={18} className="mr-2" /> Previous
                    </Button>
                ) : (
                    <Link href="/patient-form/distress">
                        <Button variant="secondary" className="bg-white/50">
                            <ArrowLeft size={18} className="mr-2" /> Back
                        </Button>
                    </Link>
                )}

                {page < totalPages - 1 ? (
                    <Button
                        onClick={() => setPage(page + 1)}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                    >
                        Next Page <ArrowRight size={18} className="ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                    >
                        {isSubmitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                        ) : (
                            <>Next: COST FACIT <ArrowRight size={18} className="ml-2" /></>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
