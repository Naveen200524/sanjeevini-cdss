
"use client";

import { useState } from "react";
import { ThreadList } from "@/components/messaging/thread-list";
import { MessageThread } from "@/components/messaging/message-thread";
import { cn } from "@/lib/utils";

export default function PatientMessagesPage() {
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

    // In production, get the current patient ID from auth context
    const CURRENT_USER_ROLE = "patient";
    const CURRENT_USER_ID = "patient_id_placeholder";

    return (
        <div className="container mx-auto py-6 max-w-4xl h-[calc(100vh-6rem)]">
            <h1 className="text-2xl font-bold mb-6 text-slate-800">My Messages</h1>

            <div className="h-full flex gap-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Sidebar List */}
                <div className={cn(
                    "w-full md:w-72 flex-shrink-0 border-r border-slate-100 bg-white/60",
                    selectedThreadId ? "hidden md:block" : "block"
                )}>
                    <ThreadList
                        currentUserRole={CURRENT_USER_ROLE}
                        currentUserId={CURRENT_USER_ID}
                        activeThreadId={selectedThreadId || undefined}
                        onSelectThread={(id) => setSelectedThreadId(id)}
                    />
                </div>

                {/* Chat Area */}
                <div className={cn(
                    "flex-1 flex flex-col bg-white/40",
                    selectedThreadId ? "block" : "hidden md:flex"
                )}>
                    {selectedThreadId ? (
                        <div className="h-full flex flex-col">
                            <button
                                className="md:hidden p-2 text-sm text-slate-500 flex items-center gap-1 border-b border-slate-100"
                                onClick={() => setSelectedThreadId(null)}
                            >
                                ← Back
                            </button>
                            <MessageThread
                                threadId={selectedThreadId}
                                currentUserId={CURRENT_USER_ID}
                                currentUserRole={CURRENT_USER_ROLE}
                                currentUserName="Me"
                            />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400">
                            Select a conversation
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
