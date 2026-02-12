import React from "react";
import { PatientFormHeader } from "@/components/layout/patient-form-header";
import { RoleGuard } from "@/components/layout/role-guard";

export default function PatientFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={["patient"]}>
            <div className="min-h-dvh bg-gradient-to-b from-amber-50/30 to-slate-50 text-slate-800 font-sans">
                <PatientFormHeader />
                <main className="max-w-3xl mx-auto px-4 py-8">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}

