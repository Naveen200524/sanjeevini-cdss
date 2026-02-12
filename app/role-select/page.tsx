"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ClipboardList, User, Stethoscope, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const roles = [
    {
        id: "receptionist",
        title: "Receptionist",
        description: "Register oncology patients, collect demographics & socioeconomic data",
        icon: ClipboardList,
        href: "/receptionist",
        gradient: "from-teal-500 to-emerald-600",
        shadowColor: "shadow-teal-500/20",
        bgAccent: "bg-teal-50",
        textAccent: "text-teal-600",
        iconBg: "bg-gradient-to-br from-teal-500 to-emerald-600",
    },
    {
        id: "patient",
        title: "Patient",
        description: "Self-report questionnaires — distress, DASS, cost of cancer care & quality of life",
        icon: User,
        href: "/patient-form",
        gradient: "from-amber-500 to-orange-600",
        shadowColor: "shadow-amber-500/20",
        bgAccent: "bg-amber-50",
        textAccent: "text-amber-600",
        iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
        id: "junior-doctor",
        title: "Junior Doctor",
        description: "Cancer diagnosis, staging, oncology scoring, treatment & referral management",
        icon: Stethoscope,
        href: "/junior-doctor",
        gradient: "from-violet-500 to-indigo-600",
        shadowColor: "shadow-violet-500/20",
        bgAccent: "bg-violet-50",
        textAccent: "text-violet-600",
        iconBg: "bg-gradient-to-br from-violet-500 to-indigo-600",
    },
    {
        id: "senior-doctor",
        title: "Senior Doctor",
        description: "Full oncology dashboard — cancer analytics, risk predictions & clinical oversight",
        icon: ShieldCheck,
        href: "/",
        gradient: "from-primary-500 to-primary-700",
        shadowColor: "shadow-primary-500/20",
        bgAccent: "bg-primary-50",
        textAccent: "text-primary-600",
        iconBg: "bg-gradient-to-br from-primary-500 to-primary-700",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 25 } },
};

export default function RoleSelectPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <div className="w-16 h-16 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl shadow-xl mb-6">
                    S
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                    Sanjeevini CDSS
                </h1>
                <p className="text-slate-500 mt-3 text-lg font-medium">
                    Select your role to continue
                </p>
            </motion.div>

            {/* Role Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl"
            >
                {roles.map((role) => (
                    <motion.div key={role.id} variants={cardVariants}>
                        <GlassCard
                            className="p-6 cursor-pointer group hover:bg-white/70 transition-all duration-300"
                            onClick={() => router.push(role.href)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${role.iconBg} flex items-center justify-center text-white shadow-lg ${role.shadowColor} shrink-0`}>
                                    <role.icon size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                        {role.description}
                                    </p>
                                </div>
                                <ArrowRight
                                    size={20}
                                    className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all duration-300 mt-1 shrink-0"
                                />
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-slate-400 mt-10 text-center"
            >
                Clinical Decision Support System · Medical Oncology
            </motion.p>
        </div>
    );
}
