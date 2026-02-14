
"use client";

import { useState } from "react";
import { ThreadList } from "@/components/messaging/thread-list";
import { MessageThread } from "@/components/messaging/message-thread";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
    // Layout state
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

    // Mock Doctor ID (In real app, get from auth context)
    const CURRENT_USER_ID = "doc_123";
    const CURRENT_USER_ROLE = "doctor";

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            {/* Sidebar List */}
            <div className={cn(
                "w-full md:w-80 lg:w-96 flex-shrink-0 transition-all duration-300",
                selectedThreadId ? "hidden md:block" : "block"
            )}>
                <ThreadList
                    currentUserRole={CURRENT_USER_ROLE}
                    currentUserId={CURRENT_USER_ID} // Fixed Doctor ID
                    activeThreadId={selectedThreadId || undefined}
                    onSelectThread={(id) => {
                        setSelectedThreadId(id);
                    }}
                />
            </div>

            {/* Chat Area */}
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-300",
                selectedThreadId ? "block" : "hidden md:flex"
            )}>
                {selectedThreadId ? (
                    <div className="h-full flex flex-col">
                        {/* Mobile Back Button - visible only on small screens when thread selected */}
                        <button
                            className="md:hidden mb-2 text-sm text-slate-500 flex items-center gap-1"
                            onClick={() => setSelectedThreadId(null)}
                        >
                            ← Back to threads
                        </button>

                        <MessageThread
                            threadId={selectedThreadId}
                            currentUserId={CURRENT_USER_ID}
                            currentUserRole={CURRENT_USER_ROLE}
                            currentUserName="Dr. Emily"
                        />
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300 text-slate-400">
                        <div className="text-center">
                            <p className="font-medium">No chat selected</p>
                            <p className="text-sm">Choose a patient from the list to start messaging.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
