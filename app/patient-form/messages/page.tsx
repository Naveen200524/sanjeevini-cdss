
"use client";

import { useState } from "react";
import { ThreadList } from "@/components/messaging/thread-list";
import { MessageThread } from "@/components/messaging/message-thread";
import { cn } from "@/lib/utils";

export default function PatientMessagesPage() {
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

    // Mock Patient ID (In real app, get from auth context or URL param)
    // We'll use a hardcoded one for now that matches the seed
    // But ideally this page is for *the* patient user.
    // Let's assume we are "Rajesh Kumar" (RP001) for this demo
    // We need to fetch the ID of Rajesh Kumar from Supabase if we want to be accurate, 
    // or just use the ID we know from seed if it was deterministic. 
    // Since seed uses `gen_random_uuid()`, we can't know it for sure without fetching.
    // However, for the *purpose of this refactor*, we need a way to identify the patient.
    // The previous app used `mock-api.ts` which didn't have auth.
    // We'll trust that the `ThreadList` fetches threads for *this* user.
    // We need to pass a `currentUserId`. 
    // This is tricky without a login.
    // For Phase 1, I will fetch the *first* patient from Supabase and use their ID as "me".
    // This is a hack for the prototype.

    // Actually, `ThreadList` takes `currentUserId`. 
    // I'll make a small wrapper to fetch "me" first? 
    // Or just hardcode a placeholder and relies on `getThreads` returning everything for demo if I cheat?
    // `getThreads` in `supabase-api.ts` currently:
    // `if (role === 'doctor') ... else ...`
    // It filters by `patient_id` if I uncommented it. 
    // I'll uncomment it in `supabase-api.ts` later or just returns all threads for now for demo.

    const CURRENT_USER_ROLE = "patient";
    const CURRENT_USER_ID = "patient_id_placeholder"; // This needs to match a real DB ID for RLS to work if strict, but here we are in prototype mode.

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
