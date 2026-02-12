"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"login" | "2fa">("login");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep("2fa");
        }, 1500);
    };

    return (
        <GlassCard className="p-8 backdrop-blur-xl border-white/40 shadow-2xl">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
                    S
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
                <p className="text-slate-500 text-sm">Sign in to Sanjeevini CDSS</p>
            </div>

            {step === "login" ? (
                <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                    onSubmit={handleLogin}
                >
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 uppercase">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                placeholder="doctor@hospital.com"
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-slate-600 uppercase">Password</label>
                            <Link href="#" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all text-sm"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 mt-4 h-11"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">Sign In <ArrowRight size={18} /></span>
                        )}
                    </Button>
                </motion.form>
            ) : (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl flex items-start gap-3 text-sm">
                        <ShieldCheck className="shrink-0 mt-0.5" size={18} />
                        <p>We've sent a 6-digit code to your registered device for verification.</p>
                    </div>

                    <div className="flex justify-between gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-10 h-12 text-center text-xl font-bold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-400 outline-none"
                            />
                        ))}
                    </div>

                    <Button
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 h-11"
                        onClick={() => router.push('/role-select')}
                    >
                        Verify & Access
                    </Button>

                    <button
                        onClick={() => setStep("login")}
                        className="w-full text-center text-slate-500 text-sm hover:text-primary-600"
                    >
                        Back to Login
                    </button>
                </motion.div>
            )}
        </GlassCard>
    );
}
