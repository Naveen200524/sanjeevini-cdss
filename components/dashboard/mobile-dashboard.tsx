
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScanLine, Mic, Bell, Search, ChevronRight } from "lucide-react";
import { Patient } from "@/lib/mock-api";

interface MobileDashboardProps {
    patients: Patient[];
}

export function MobileDashboard({ patients }: MobileDashboardProps) {
    const priorityPatients = patients.filter(p => p.status === "Critical" || p.status === "Review");

    return (
        <div className="space-y-6 pb-24 md:hidden">
            {/* Mobile Header */}
            <header className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md p-4 z-40 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        S
                    </div>
                    <span className="font-bold text-slate-800 text-lg">CDSS</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative text-slate-500 hover:text-primary-600">
                        <Bell size={24} />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                        <img src="https://ui-avatars.com/api/?name=Dr+Emily&background=random" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <div className="px-4 space-y-6">
                {/* Search & Scan */}
                <GlassCard className="p-4 flex flex-col gap-3">
                    <h2 className="font-semibold text-slate-700">Quick Actions</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Lookup patient..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-100 outline-none text-base"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button className="h-12 bg-slate-800 text-white shadow-lg flex items-center justify-center gap-2">
                            <ScanLine size={18} /> Scan QR
                        </Button>
                        <Button variant="secondary" className="h-12 border-slate-200 flex items-center justify-center gap-2">
                            <Mic size={18} /> Voice Note
                        </Button>
                    </div>
                </GlassCard>

                {/* Priority Alerts */}
                <div>
                    <h3 className="font-bold text-slate-800 mb-3 flex items-center justify-between">
                        <span>Priority Alerts</span>
                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{priorityPatients.length} New</span>
                    </h3>
                    <div className="space-y-3">
                        {priorityPatients.map(patient => (
                            <GlassCard key={patient.id} className={`p-4 border-l-4 active:scale-95 transition-transform ${patient.status === 'Critical' ? 'border-l-red-500' : 'border-l-amber-500'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-800">{patient.name}</h4>
                                    <span className="text-xs text-slate-500">Just now</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={patient.status === 'Critical' ? "bg-red-100 text-red-600 border-none" : "bg-amber-100 text-amber-600 border-none"}>
                                        {patient.diagnosis}
                                    </Badge>
                                    <span className={`text-sm font-medium flex items-center ${patient.status === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>
                                        ↗ Attention
                                    </span>
                                </div>
                            </GlassCard>
                        ))}
                        {priorityPatients.length === 0 && (
                            <p className="text-sm text-slate-500 italic">No priority alerts.</p>
                        )}
                    </div>
                </div>

                {/* Recent Patients */}
                <div>
                    <h3 className="font-bold text-slate-800 mb-3">Recent Patients</h3>
                    <div className="space-y-3">
                        {patients.slice(0, 3).map((patient) => (
                            <GlassCard key={patient.id} className="p-3 flex items-center justify-between active:bg-slate-50/80">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                                        {patient.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{patient.name}</p>
                                        <p className="text-xs text-slate-500">{patient.mrn} • {patient.diagnosis}</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-300" size={20} />
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
