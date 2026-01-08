import React from "react";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";
import { User, Phone, Mail, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

export function PatientProfileCard() {
    return (
        <GlassCard className="flex flex-col gap-6 relative overflow-hidden group">
            {/* Header / Image */}
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative z-10">
                    <Image
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
                        alt="Martha Miller"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div className="flex-1 pt-1">
                    <h3 className="text-lg font-bold text-slate-800">Martha Miller</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted font-medium bg-slate-100 px-2 py-0.5 rounded-md">Patient Id: P-0012345</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Last visit: 18 May 2024</p>
                </div>
                <button className="text-slate-300 hover:text-primary-500 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/40 rounded-xl border border-white/50">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Gender</span>
                    <p className="text-sm font-semibold text-slate-700">Female</p>
                </div>
                <div className="p-3 bg-white/40 rounded-xl border border-white/50">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Age</span>
                    <p className="text-sm font-semibold text-slate-700">45 yo</p>
                </div>
                <div className="p-3 bg-white/40 rounded-xl border border-white/50">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Date of Birth</span>
                    <p className="text-sm font-semibold text-slate-700">18 May 1979</p>
                </div>
                <div className="p-3 bg-white/40 rounded-xl border border-white/50">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Status</span>
                    <Badge variant="success" size="sm" className="mt-0.5 border-none">Active</Badge>
                </div>
            </div>

            {/* Allergies */}
            <div className="mt-1">
                <span className="text-xs font-semibold text-slate-600 block mb-2">Allergies</span>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="warning" className="bg-amber-50 text-amber-600 border-amber-200">
                        • Pollen allergy
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-slate-200 text-[10px]">
                        May cause an allergy to fresh fruits
                    </Badge>
                </div>
            </div>

            {/* Decorative BG */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </GlassCard>
    );
}
