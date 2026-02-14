import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";




export interface RecentPatientsTableProps {
    patients: {
        id: string;
        name: string;
        mrn: string;
        diagnosis: string;
        date: string;
        status: "Critical" | "Stable" | "Review";
        avatar: string;
    }[];
}

export function RecentPatientsTable({ patients }: RecentPatientsTableProps) {
    return (
        <GlassCard className="flex-1 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800">Recent Patients</h3>
                <Link href="/patients">
                    <Button variant="ghost" size="sm" className="text-primary-600">
                        View All <ChevronRight size={16} className="ml-1" />
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                            <th className="px-6 py-4 font-medium">Patient</th>
                            <th className="px-6 py-4 font-medium">Diagnosis</th>
                            <th className="px-4 py-4 font-medium">Date</th>
                            <th className="px-4 py-4 font-medium">Status</th>
                            <th className="px-4 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm">
                                            {patient.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">{patient.name}</p>
                                            <p className="text-xs text-slate-500">{patient.mrn}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">
                                    {patient.diagnosis}
                                </td>
                                <td className="px-4 py-4 text-slate-500">
                                    {patient.date}
                                </td>
                                <td className="px-4 py-4">
                                    <Badge
                                        className={
                                            patient.status === "Critical" ? "bg-red-100 text-red-600 border-none shadow-none" :
                                                patient.status === "Stable" ? "bg-emerald-100 text-emerald-600 border-none shadow-none" :
                                                    "bg-amber-100 text-amber-600 border-none shadow-none"
                                        }
                                    >
                                        {patient.status}
                                    </Badge>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-600">
                                        <MoreHorizontal size={18} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
}

