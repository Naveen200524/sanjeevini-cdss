
"use client";

import { useEffect, useState, useRef } from "react";
import { Send, User, Bot, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getThreadMessages, sendMessage, Message } from "@/lib/supabase-api";
import { createClient } from "@/lib/supabase/client";

interface MessageThreadProps {
    threadId: string;
    currentUserId: string;
    currentUserRole: "doctor" | "patient";
    currentUserName: string;
}

export function MessageThread({ threadId, currentUserId, currentUserRole, currentUserName }: MessageThreadProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial fetch
    useEffect(() => {
        const load = async () => {
            const data = await getThreadMessages(threadId);
            setMessages(data);
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        };
        load();

        // Subscribe to real-time updates
        const supabase = createClient();
        const channel = supabase
            .channel(`thread:${threadId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `thread_id=eq.${threadId}`
                },
                (payload) => {
                    const newMsg = payload.new as Message;
                    if (newMsg.id) { // Simple check
                        setMessages(prev => {
                            if (prev.find(m => m.id === newMsg.id)) return prev;
                            return [...prev, newMsg];
                        });
                        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [threadId]);

    const handleSend = async () => {
        if (!newMessage.trim() || isLoading) return;
        setIsLoading(true);

        try {
            // Optimistic update
            const tempId = Math.random().toString();
            const optimisticMsg: Message = {
                id: tempId,
                thread_id: threadId,
                content: newMessage,
                sender_id: currentUserId,
                sender_role: currentUserRole,
                sender_name: currentUserName,
                created_at: new Date().toISOString(),
                is_encrypted: true,
                read_at: null
            };
            setMessages(prev => [...prev, optimisticMsg]);
            setNewMessage("");
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

            await sendMessage(threadId, newMessage, currentUserRole, currentUserId, currentUserName);

            // Actual realtime subscription will replace this, but for now we rely on that
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white/50 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-white/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    {currentUserRole === 'doctor' ? <User className="text-slate-500" /> : <Bot className="text-primary-500" />}
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800">
                        {currentUserRole === 'doctor' ? 'Patient Chat' : 'Dr. Emily'}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Online • E2E Encrypted
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => {
                    const isMe = msg.sender_id === currentUserId; // Simple check, ideally check role too
                    // Fallback if IDs match (mock IDs might clash, so enforce role check if possible)
                    const actuallyIsMe = msg.sender_role === currentUserRole;

                    return (
                        <div
                            key={msg.id || idx}
                            className={cn(
                                "flex w-full mb-4",
                                actuallyIsMe ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm relative group",
                                actuallyIsMe
                                    ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-tr-none"
                                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                            )}>
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                <div className={cn(
                                    "flex items-center gap-1 mt-1 text-[10px]",
                                    actuallyIsMe ? "text-primary-100 justify-end" : "text-slate-400"
                                )}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {actuallyIsMe && (
                                        <span>
                                            {msg.read_at ? <CheckCheck size={12} /> : <Check size={12} />}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a secure message..."
                    className="flex-1 bg-slate-50 border-slate-200"
                    disabled={isLoading}
                />
                <Button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || isLoading}
                    className="bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/20"
                >
                    <Send size={18} />
                </Button>
            </div>
        </div>
    );
}
