"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
    label: string;
    description?: string;
}

interface FormStepperProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

export function FormStepper({ steps, currentStep, className }: FormStepperProps) {
    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <div key={index} className={cn("flex items-center", !isLast && "flex-1")}>
                        <div className="flex flex-col items-center relative">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: isActive ? 1.1 : 1 }}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 shrink-0",
                                    isComplete
                                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                        : isActive
                                            ? "bg-white border-primary-500 text-primary-600 shadow-lg shadow-primary-500/20 ring-4 ring-primary-100"
                                            : "bg-slate-100 border-slate-200 text-slate-400"
                                )}
                            >
                                {isComplete ? <Check size={18} strokeWidth={3} /> : index + 1}
                            </motion.div>
                            <span
                                className={cn(
                                    "text-[11px] font-semibold mt-2 text-center max-w-[80px] leading-tight hidden sm:block",
                                    isActive ? "text-primary-600" : isComplete ? "text-emerald-600" : "text-slate-400"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>

                        {!isLast && (
                            <div className="flex-1 mx-2 h-0.5 rounded-full overflow-hidden bg-slate-200 relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: isComplete ? "100%" : "0%" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
