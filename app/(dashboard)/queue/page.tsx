"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, CheckCircle, AlertOctagon, MoreHorizontal } from "lucide-react";

export default function QueuePage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Work Queue</h1>
                    <p className="text-slate-500 text-sm">Manage pending reviews, alerts, and follow-ups.</p>
                </div>
                <Button className="bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                    Refresh Queue
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Queue Stats */}
                <GlassCard className="p-4 flex items-center justify-between bg-amber-50 border-amber-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-amber-600 font-bold uppercase">Pending</p>
                            <p className="text-xl font-bold text-slate-800">12</p>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between bg-red-50 border-red-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <AlertOctagon size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-red-600 font-bold uppercase">Critical</p>
                            <p className="text-xl font-bold text-slate-800">3</p>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between bg-emerald-50 border-emerald-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-600 font-bold uppercase">Completed</p>
                            <p className="text-xl font-bold text-slate-800">45</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Queue List */}
            <GlassCard className="flex-1 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="bg-slate-100/50">
                            <TabsTrigger value="all">All Tasks</TabsTrigger>
                            <TabsTrigger value="reviews">Review Requests</TabsTrigger>
                            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-medium">Task Type</th>
                                <th className="px-6 py-4 font-medium">Patient</th>
                                <th className="px-6 py-4 font-medium">Priority</th>
                                <th className="px-6 py-4 font-medium">Due Time</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 font-normal">
                                                Lab Review
                                            </Badge>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">
                                        Rajesh Kumar
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={i < 3 ? "bg-red-100 text-red-600 border-none" : "bg-amber-100 text-amber-600 border-none"}>
                                            {i < 3 ? "High" : "Medium"}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        Today, 2:00 PM
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">Review</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
