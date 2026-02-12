"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ClipboardList } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const formSteps = [
    { title: "Distress Thermometer", desc: "Rate your cancer-related distress level and check concerns", time: "3 min" },
    { title: "DASS-21 Questionnaire", desc: "Depression, Anxiety & Stress screening for cancer patients", time: "5 min" },
    { title: "COST FACIT", desc: "Financial impact of cancer treatment assessment", time: "4 min" },
    { title: "Quality of Life", desc: "Daily life satisfaction during oncology care", time: "2 min" },
    { title: "Personal History", desc: "Medical, family cancer history & treatment background", time: "3 min" },
];

export default function PatientFormWelcome() {
    const totalTime = formSteps.reduce((acc, s) => acc + parseInt(s.time), 0);

    return (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Welcome Header */}
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20"
                >
                    <ClipboardList size={32} className="text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-800">Welcome</h1>
                <p className="text-slate-500 mt-2 text-lg">
                    Please complete the following oncology care questionnaires
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-slate-400">
                    <Clock size={16} />
                    <span>Estimated time: ~{totalTime} minutes</span>
                </div>
            </div>

            {/* Steps Preview */}
            <div className="space-y-3">
                {formSteps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                    >
                        <GlassCard className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-800">{step.title}</h3>
                                <p className="text-xs text-slate-500">{step.desc}</p>
                            </div>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-lg shrink-0">
                                ~{step.time}
                            </span>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Begin Button */}
            <div className="flex justify-center pt-4">
                <Link href="/patient-form/distress">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/20 h-12 px-10 text-base">
                        Begin Questionnaire
                        <ArrowRight size={20} className="ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
