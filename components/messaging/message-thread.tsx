
"use client";

import { useEffect, useState, useRef } from "react";
import { Send, User, Bot, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock Types
interface Message {
    id: string;
    thread_id: string;
    content: string;
    sender_id: string;
    sender_role: 'patient' | 'doctor';
    sender_name: string;
    created_at: string;
    read_at: string | null;
    is_encrypted: boolean;
}

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

    // Initial mock fetch
    useEffect(() => {
        const load = async () => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockMessages: Message[] = [
                {
                    id: 'msg-1',
                    thread_id: threadId,
                    content: "Hello, I have a question about my medication.",
                    sender_id: 'PAT-1',
                    sender_role: 'patient',
                    sender_name: 'Patient Name',
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    read_at: new Date(Date.now() - 86000000).toISOString(),
                    is_encrypted: true
                },
                {
                    id: 'msg-2',
                    thread_id: threadId,
                    content: "Hi, I'm Dr. Emily. How can I help you today?",
                    sender_id: 'DOC-1',
                    sender_role: 'doctor',
                    sender_name: 'Dr. Emily',
                    created_at: new Date(Date.now() - 85000000).toISOString(),
                    read_at: null,
                    is_encrypted: true
                }
            ];
            setMessages(mockMessages);
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        };
        load();
    }, [threadId]);

    const handleSend = async () => {
        if (!newMessage.trim() || isLoading) return;
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const newMsg: Message = {
                id: Math.random().toString(),
                thread_id: threadId,
                content: newMessage,
                sender_id: currentUserId,
                sender_role: currentUserRole,
                sender_name: currentUserName,
                created_at: new Date().toISOString(),
                is_encrypted: true,
                read_at: null
            };
            setMessages(prev => [...prev, newMsg]);
            setNewMessage("");
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

            // Simulate auto-reply if patient
            if (currentUserRole === 'patient') {
                setTimeout(() => {
                    const reply: Message = {
                        id: Math.random().toString(),
                        thread_id: threadId,
                        content: "Thank you for your message. Dr. Emily will review it shortly.",
                        sender_id: 'DOC-BOT',
                        sender_role: 'doctor',
                        sender_name: 'System Bot',
                        created_at: new Date().toISOString(),
                        is_encrypted: true,
                        read_at: null
                    };
                    setMessages(prev => [...prev, reply]);
                    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                }, 1000);
            }

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
