import React from "react";
import { PatientFormHeader } from "@/components/layout/patient-form-header";

export default function PatientFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh bg-gradient-to-b from-amber-50/30 to-slate-50 text-slate-800 font-sans">
            <PatientFormHeader />
            <main className="max-w-3xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
