import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    colorClass?: string;
    className?: string;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, colorClass = "text-primary-500", className }: StatCardProps) {
    return (
        <GlassCard className={cn("p-6 flex items-center justify-between overflow-hidden relative group", className)}>
            {/* Background Icon Decoration */}
            <div className={cn("absolute -right-4 -bottom-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 group-hover:scale-110", colorClass)}>
                <Icon size={100} />
            </div>

            <div>
                <p className="text-slate-500 font-medium text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
                {trend && (
                    <div className={cn("flex items-center text-xs font-semibold mt-2", trendUp ? "text-emerald-600" : "text-red-500")}>
                        <span className="mr-1">{trendUp ? "↑" : "↓"}</span>
                        {trend}
                        <span className="text-slate-400 font-normal ml-1">vs last month</span>
                    </div>
                )}
            </div>

            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", colorClass.replace("text-", "bg-").replace("500", "100"), colorClass)}>
                <Icon size={24} />
            </div>
        </GlassCard>
    );
}
