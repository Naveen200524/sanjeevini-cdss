import React from "react";
import { JuniorDoctorSidebar } from "@/components/layout/junior-doctor-sidebar";
import { RoleGuard } from "@/components/layout/role-guard";

export default function JuniorDoctorLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={["junior-doctor"]}>
            <div className="min-h-dvh bg-noise text-slate-800 font-sans selection:bg-violet-100 selection:text-violet-900 pb-12">
                <JuniorDoctorSidebar />
                <main className="pb-20 md:pb-0 md:pl-24 md:pr-8 px-4 md:px-0 pt-6 md:pt-8">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}

