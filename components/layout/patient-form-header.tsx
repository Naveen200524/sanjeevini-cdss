"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FormStepper } from "@/components/ui/form-stepper";

const steps = [
    { label: "Distress", href: "/patient-form/distress" },
    { label: "DASS-21", href: "/patient-form/dass" },
    { label: "COST FACIT", href: "/patient-form/cost-facit" },
    { label: "Quality of Life", href: "/patient-form/quality-of-life" },
    { label: "History", href: "/patient-form/history" },
];

export function PatientFormHeader() {
    const pathname = usePathname();

    const currentStep = steps.findIndex((s) => pathname?.startsWith(s.href));

    return (
        <header className="w-full bg-white/60 backdrop-blur-lg border-b border-white/50 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                            S
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-slate-800">Sanjeevini CDSS</h1>
                            <p className="text-xs text-slate-500">Patient Questionnaire</p>
                        </div>
                    </div>
                    <Link href="/role-select" className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium">
                        Exit
                    </Link>
                </div>

                {currentStep >= 0 && (
                    <FormStepper
                        steps={steps.map((s) => ({ label: s.label }))}
                        currentStep={currentStep}
                    />
                )}
            </div>
        </header>
    );
}
