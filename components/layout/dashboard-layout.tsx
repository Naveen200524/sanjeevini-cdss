
import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-noise text-slate-800 font-sans selection:bg-primary-100 selection:text-primary-900 pb-12">
            <Sidebar />
            <Header />
            <main className="ml-28 mr-8">
                {children}
            </main>
        </div>
    );
}
