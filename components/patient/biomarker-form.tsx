"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Save } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function BiomarkerForm() {
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Step Progress */}
            <div className="mb-8 flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>

                {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= i ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20 scale-110' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                        {i}
                    </div>
                ))}
            </div>

            <GlassCard className="p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800">
                        {step === 1 && "Vitals & Physio"}
                        {step === 2 && "Blood Chemistry"}
                        {step === 3 && "Review & Submit"}
                    </h3>
                    <p className="text-slate-500 text-sm">Step {step} of 3</p>
                </div>

                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Systolic BP (mmHg)</Label>
                            <Input placeholder="120" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Diastolic BP (mmHg)</Label>
                            <Input placeholder="80" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Heart Rate (bpm)</Label>
                            <Input placeholder="72" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>SPO2 (%)</Label>
                            <Input placeholder="98" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Temperature (°C)</Label>
                            <Input placeholder="36.5" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>BMI</Label>
                            <Input placeholder="24" type="number" />
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>HbA1c (%)</Label>
                            <Input placeholder="5.7" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fasting Glucose (mg/dL)</Label>
                            <Input placeholder="90" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Total Cholesterol (mg/dL)</Label>
                            <Input placeholder="180" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>HDL (mg/dL)</Label>
                            <Input placeholder="50" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>LDL (mg/dL)</Label>
                            <Input placeholder="100" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Triglycerides (mg/dL)</Label>
                            <Input placeholder="150" type="number" />
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center space-y-6">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Save size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">Ready for Analysis</h4>
                        <p className="text-slate-500 max-w-md mx-auto">Please review the entered data. Submitting will trigger the AI prediction engine for risk stratification.</p>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left max-w-sm mx-auto text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-500">BP</span>
                                <span className="font-semibold text-slate-800">120/80</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">HbA1c</span>
                                <span className="font-semibold text-slate-800">6.2%</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
                    <Button
                        variant="secondary"
                        onClick={() => setStep(s => Math.max(1, s - 1))}
                        disabled={step === 1}
                    >
                        Back
                    </Button>

                    {step < 3 ? (
                        <Button
                            className="bg-primary-600 text-white hover:bg-primary-700"
                            onClick={() => setStep(s => Math.min(3, s + 1))}
                        >
                            Next Step <ChevronRight size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20">
                            Run Analysis
                        </Button>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
