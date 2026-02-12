
import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { RoleGuard } from "@/components/layout/role-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={["senior-doctor"]}>
            <div className="min-h-dvh bg-noise text-slate-800 font-sans selection:bg-primary-100 selection:text-primary-900 pb-12">
                <Sidebar />
                <Header />
                <main className="pb-20 md:pb-0 md:pl-24 md:pr-8 px-0 md:px-0">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}

