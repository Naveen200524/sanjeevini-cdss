
"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock Types
interface Thread {
    id: string;
    patient_id: string;
    patient_name: string;
    doctor_id: string;
    doctor_name: string;
    last_message: string | null;
    last_message_at: string;
    unread_by_doctor: number;
    unread_by_patient: number;
    created_at: string;
}

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
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 600));

            // Mock Threads
            const mockThreads: Thread[] = [
                {
                    id: 'thread-1',
                    patient_id: 'PAT-1',
                    patient_name: 'Patient Name',
                    doctor_id: 'DOC-1',
                    doctor_name: 'Dr. Emily',
                    last_message: "Thank you for the update.",
                    last_message_at: new Date(Date.now() - 3600000).toISOString(),
                    unread_by_doctor: 0,
                    unread_by_patient: 1,
                    created_at: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 'thread-2',
                    patient_id: 'PAT-2',
                    patient_name: 'John Doe',
                    doctor_id: 'DOC-1',
                    doctor_name: 'Dr. Emily',
                    last_message: "When is my next appointment?",
                    last_message_at: new Date(Date.now() - 7200000).toISOString(),
                    unread_by_doctor: 1,
                    unread_by_patient: 0,
                    created_at: new Date(Date.now() - 90000000).toISOString()
                }
            ];

            setThreads(mockThreads);
            setIsLoading(false);
        };
        load();
    }, [currentUserRole, currentUserId]);

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
