"use client";

import { cn } from "@/lib/utils";
import { Search, Hash, Phone } from "lucide-react";
import { useState } from "react";

type SearchMode = "id" | "phone";

interface SearchInputProps {
    onSearch: (query: string, mode: SearchMode) => void;
    className?: string;
    placeholder?: string;
}

export function SearchInput({ onSearch, className, placeholder }: SearchInputProps) {
    const [mode, setMode] = useState<SearchMode>("id");
    const [query, setQuery] = useState("");

    const handleChange = (val: string) => {
        setQuery(val);
        onSearch(val, mode);
    };

    const toggleMode = (newMode: SearchMode) => {
        setMode(newMode);
        if (query) onSearch(query, newMode);
    };

    return (
        <div className={cn("flex items-center gap-3 w-full", className)}>
            {/* Mode Toggle */}
            <div className="flex bg-slate-100/80 rounded-xl p-1 shrink-0">
                <button
                    onClick={() => toggleMode("id")}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                        mode === "id"
                            ? "bg-white text-primary-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <Hash size={14} />
                    Hospital ID
                </button>
                <button
                    onClick={() => toggleMode("phone")}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                        mode === "phone"
                            ? "bg-white text-primary-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <Phone size={14} />
                    Phone
                </button>
            </div>

            {/* Search Field */}
            <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder || (mode === "id" ? "Search by Hospital ID..." : "Search by Phone Number...")}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 outline-none transition-all text-sm"
                />
            </div>
        </div>
    );
}
