import React from "react";
import { ReceptionistSidebar } from "@/components/layout/receptionist-sidebar";
import { RoleGuard } from "@/components/layout/role-guard";

export default function ReceptionistLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={["receptionist"]}>
            <div className="min-h-dvh bg-noise text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900 pb-12">
                <ReceptionistSidebar />
                <main className="pb-20 md:pb-0 md:pl-24 md:pr-8 px-4 md:px-0 pt-6 md:pt-8">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}

