import React from "react";

export default function RoleSelectLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-slate-50">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-400/20 blur-[100px] animate-pulse" />
                <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-violet-400/10 blur-[80px] animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-4 py-8">
                {children}
            </div>
        </div>
    );
}
