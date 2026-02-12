import Image from "next/image";
import { Search, Bell, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="hidden md:flex items-center justify-between py-6 px-8 md:ml-24">
            {/* Left Section: Context / Breadcrumbs or Empty for now */}
            <div className="flex flex-col">
                {/* Placeholder for page title if needed, or keeping it clean as per design */}
            </div>

            {/* Center Section: Global Search */}
            <div className="relative w-96 hidden md:block group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted transition-colors group-focus-within:text-primary-500">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search for oncology patients, treatments..."
                    className="w-full bg-white/50 backdrop-blur-sm border-2 border-transparent focus:border-primary-200 focus:bg-white focus:ring-4 focus:ring-primary-100 rounded-2xl py-2.5 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-slate-400 text-sm shadow-sm"
                />
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center gap-4">
                {/* Date Display (reference image shows time/date) */}
                <div className="hidden lg:flex flex-col items-end mr-4">
                    <span className="text-xl font-bold text-slate-800">13:37</span>
                    <span className="text-xs font-medium text-slate-500">{currentDate}</span>
                </div>

                <Button variant="glass" size="icon" className="relative text-slate-500">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </Button>

                {/* Profile Dropdown Trigger */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200/60">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-bold text-slate-800">Dr. Sharma</span>
                        <span className="text-xs text-slate-500">Oncologist</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 p-0.5 shadow-sm ring-2 ring-white cursor-pointer hover:ring-primary-100 transition-all relative">
                        <Image
                            src="https://ui-avatars.com/api/?name=Dr+Sharma&background=0ea5e9&color=fff"
                            alt="Dr. Sharma"
                            fill
                            className="rounded-full object-cover"
                        />
                    </button>
                    <ChevronDown size={16} className="text-slate-400" />
                </div>
            </div>
        </header>
    );
}
