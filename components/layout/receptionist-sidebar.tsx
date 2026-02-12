"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, UserPlus, ClipboardList, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Home", href: "/receptionist" },
    { icon: Search, label: "Search", href: "/receptionist/search" },
    { icon: UserPlus, label: "Register", href: "/receptionist/register" },
];

export function ReceptionistSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 bottom-0 top-0 md:left-4 md:top-4 md:bottom-4 w-16 md:w-20 flex flex-col items-center py-4 md:py-8 z-50 pointer-events-none md:pointer-events-auto">
            {/* Desktop Sidebar */}
            <div className="glass-panel w-full h-full rounded-none md:rounded-full hidden md:flex flex-col items-center py-6 gap-8 shadow-glass-hover pointer-events-auto">
                <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-xl cursor-default shrink-0">
                    S
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full items-center justify-center">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "p-3 rounded-2xl transition-all duration-300 relative group",
                                    isActive
                                        ? "bg-teal-50 text-teal-600 shadow-sm scale-110"
                                        : "text-slate-400 hover:text-teal-500 hover:bg-white/50"
                                )}
                            >
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex flex-col gap-4 items-center mt-auto">
                    <Link
                        href="/role-select"
                        className="p-3 rounded-2xl text-slate-400 hover:text-teal-500 hover:bg-white/50 transition-all duration-300 relative group"
                    >
                        <ArrowLeft size={22} strokeWidth={2} />
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            Switch Role
                        </span>
                    </Link>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-slate-200 md:hidden flex items-center justify-around px-2 z-50 pointer-events-auto pb-safe">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "p-2 rounded-xl flex flex-col items-center gap-1 transition-colors",
                                isActive ? "text-teal-600" : "text-slate-400"
                            )}
                        >
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
