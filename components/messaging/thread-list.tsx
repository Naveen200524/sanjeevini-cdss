
"use client";

import { useEffect, useState } from "react";
import { Search, User, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getThreads, Thread, getRecentPatients } from "@/lib/supabase-api";
import { createClient } from "@/lib/supabase/client";

interface ThreadListProps {
    currentUserRole: "doctor" | "patient";
    currentUserId: string;
    onSelectThread: (threadId: string, userName: string) => void;
    activeThreadId?: string;
}

export function ThreadList({ currentUserRole, currentUserId, onSelectThread, activeThreadId }: ThreadListProps) {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            let data = await getThreads(currentUserRole, currentUserId);

            // If no threads yet (e.g. fresh seed), maybe fetch recent patients and allow starting a chat?
            // For now, we seed threads for first 5 patients, so we should see something.
            setThreads(data);
            setIsLoading(false);
        };
        load();

        // Subscribe to thread updates (new messages update last_message)
        const supabase = createClient();
        const channel = supabase
            .channel('threads-list')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'threads'
                },
                (payload) => {
                    const updated = payload.new as Thread;
                    setThreads(prev => {
                        const idx = prev.findIndex(t => t.id === updated.id);
                        if (idx >= 0) {
                            const newArr = [...prev];
                            newArr[idx] = updated;
                            return newArr.sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
                        }
                        return [updated, ...prev];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const filtered = threads.filter(t =>
        t.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.doctor_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-white/50 backdrop-blur-md border border-slate-200 shadow-sm overflow-hidden md:rounded-2xl">
            <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Messages</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <Input
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-slate-50 border-slate-200"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center text-slate-400 text-sm">Loading chats...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-sm">No conversations found.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filtered.map(thread => {
                            const otherName = currentUserRole === 'doctor' ? thread.patient_name : thread.doctor_name;
                            const unread = currentUserRole === 'doctor' ? thread.unread_by_doctor : thread.unread_by_patient;
                            const isActive = activeThreadId === thread.id;

                            return (
                                <button
                                    key={thread.id}
                                    onClick={() => onSelectThread(thread.id, otherName)}
                                    className={cn(
                                        "w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left",
                                        isActive && "bg-primary-50 hover:bg-primary-50 border-l-4 border-primary-500"
                                    )}
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-semibold text-sm">
                                            {otherName.charAt(0)}
                                        </div>
                                        {/* Online indicator mock */}
                                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className={cn("font-medium truncate", isActive ? "text-primary-900" : "text-slate-800")}>
                                                {otherName}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {new Date(thread.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className={cn(
                                            "text-xs truncate",
                                            unread > 0 ? "font-bold text-slate-800" : "text-slate-500"
                                        )}>
                                            {thread.last_message || "Start a conversation..."}
                                        </p>
                                    </div>
                                    {unread > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] flex items-center justify-center font-bold">
                                            {unread}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
