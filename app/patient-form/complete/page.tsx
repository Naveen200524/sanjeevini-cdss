"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PatientFormCompletePage() {
    return (
        <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center"
            >
                <CheckCircle size={56} className="text-emerald-600" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className="text-3xl font-bold text-slate-800">Thank You!</h1>
                <p className="text-slate-500 mt-3 max-w-md mx-auto text-lg">
                    Your oncology care questionnaires have been submitted successfully. Your oncology team will review your responses.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-6"
            >
                <Link href="/role-select">
                    <Button variant="secondary" className="bg-white/50 border-slate-200">
                        Back to Home
                    </Button>
                </Link>
                <Link href="/patient-form">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                        Review Responses <ArrowRight size={18} className="ml-2" />
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
