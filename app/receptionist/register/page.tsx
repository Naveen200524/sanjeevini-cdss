"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserPlus, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPatient } from "@/lib/tier-mock-api";

const inputClass = "w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-400 transition-all text-sm";
const labelClass = "text-xs font-semibold text-slate-600 uppercase tracking-wide";

export default function ReceptionistRegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "", age: "", sex: "Male", phone: "", email: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        studyParticipantNumber: "",
        hometown: "", distanceTravelled: "", followUpVisits: "",
        monthlyIncome: "", occupationHead: "", educationHead: "",
        isBreadwinner: "", stayDuration: "", stayCosts: "", disabilityLiability: "",
    });

    const updateField = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await createPatient({
            name: formData.name,
            age: parseInt(formData.age) || 0,
            sex: formData.sex as "Male" | "Female" | "Other",
            phone: formData.phone,
            email: formData.email,
            enrollmentDate: formData.enrollmentDate,
            studyParticipantNumber: formData.studyParticipantNumber,
            hometown: formData.hometown,
            distanceTravelled: formData.distanceTravelled,
            followUpVisits: formData.followUpVisits,
            monthlyIncome: formData.monthlyIncome,
            occupationHead: formData.occupationHead,
            educationHead: formData.educationHead,
            isBreadwinner: formData.isBreadwinner,
            stayDuration: formData.stayDuration,
            stayCosts: formData.stayCosts,
            disabilityLiability: formData.disabilityLiability,
        });
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/receptionist">
                        <Button variant="ghost" className="text-slate-500 hover:text-slate-800 mb-2">
                            <ArrowLeft size={18} className="mr-2" />
                            Back
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Register Oncology Patient
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Fill in oncology patient demographics and socioeconomic data
                    </p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6"
                        >
                            <CheckCircle size={40} className="text-emerald-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-slate-800">Oncology Patient Registered!</h2>
                        <p className="text-slate-500 mt-2">The oncology patient has been successfully enrolled in the system.</p>
                        <div className="flex gap-3 mt-8">
                            <Link href="/receptionist/register">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setFormData({
                                            name: "", age: "", sex: "Male", phone: "", email: "",
                                            enrollmentDate: new Date().toISOString().split("T")[0],
                                            studyParticipantNumber: "",
                                            hometown: "", distanceTravelled: "", followUpVisits: "",
                                            monthlyIncome: "", occupationHead: "", educationHead: "",
                                            isBreadwinner: "", stayDuration: "", stayCosts: "", disabilityLiability: "",
                                        });
                                    }}
                                >
                                    <UserPlus size={16} className="mr-2" />
                                    Register Another
                                </Button>
                            </Link>
                            <Link href="/receptionist">
                                <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                    >
                        <Tabs defaultValue="identity" className="w-full">
                            <div className="flex justify-center mb-8">
                                <TabsList>
                                    <TabsTrigger value="identity">Identity & Contact</TabsTrigger>
                                    <TabsTrigger value="socioeconomic">Socioeconomic</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="identity">
                                <GlassCard className="p-8">
                                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                                        <UserPlus size={20} className="text-teal-500" />
                                        Patient Identity
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className={labelClass}>Name of Patient *</label>
                                            <input className={inputClass} placeholder="Full Name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Age *</label>
                                            <input className={inputClass} type="number" placeholder="Age" value={formData.age} onChange={(e) => updateField("age", e.target.value)} required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Sex *</label>
                                            <select className={inputClass} value={formData.sex} onChange={(e) => updateField("sex", e.target.value)}>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Phone Number *</label>
                                            <input className={inputClass} type="tel" placeholder="10-digit mobile" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Email Address</label>
                                            <input className={inputClass} type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Date of Oncology Enrollment</label>
                                            <input className={inputClass} type="date" value={formData.enrollmentDate} onChange={(e) => updateField("enrollmentDate", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Oncology Study Participant Number</label>
                                            <input className={inputClass} placeholder="SPN-XXX" value={formData.studyParticipantNumber} onChange={(e) => updateField("studyParticipantNumber", e.target.value)} />
                                        </div>
                                    </div>
                                </GlassCard>
                            </TabsContent>

                            <TabsContent value="socioeconomic">
                                <GlassCard className="p-8">
                                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                                        📋 Socioeconomic Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className={labelClass}>Q1: Hometown</label>
                                            <input className={inputClass} placeholder="Hometown" value={formData.hometown} onChange={(e) => updateField("hometown", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q2: Distance Travelled from Hometown</label>
                                            <input className={inputClass} placeholder="e.g. 45 km" value={formData.distanceTravelled} onChange={(e) => updateField("distanceTravelled", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q3: Number of Follow-up Visits (Cat 2 & 3)</label>
                                            <input className={inputClass} type="number" placeholder="0" value={formData.followUpVisits} onChange={(e) => updateField("followUpVisits", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q4: Monthly Income of Family</label>
                                            <input className={inputClass} placeholder="e.g. ₹25,000" value={formData.monthlyIncome} onChange={(e) => updateField("monthlyIncome", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q5: Occupation of Head of Family</label>
                                            <select className={inputClass} value={formData.occupationHead} onChange={(e) => updateField("occupationHead", e.target.value)}>
                                                <option value="">Select...</option>
                                                <option>Agriculture</option>
                                                <option>Government Service</option>
                                                <option>Private Sector</option>
                                                <option>Self Employed</option>
                                                <option>Small Business</option>
                                                <option>Daily Wage</option>
                                                <option>Retired</option>
                                                <option>Unemployed</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q6: Education of Head of Family</label>
                                            <select className={inputClass} value={formData.educationHead} onChange={(e) => updateField("educationHead", e.target.value)}>
                                                <option value="">Select...</option>
                                                <option>Illiterate</option>
                                                <option>Primary School</option>
                                                <option>Middle School</option>
                                                <option>High School</option>
                                                <option>Graduate</option>
                                                <option>Post Graduate</option>
                                                <option>Professional</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q25: Are you the main bread-winner?</label>
                                            <select className={inputClass} value={formData.isBreadwinner} onChange={(e) => updateField("isBreadwinner", e.target.value)}>
                                                <option value="">Select...</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q26: Total stay duration in Vellore/Ranipet</label>
                                            <input className={inputClass} placeholder="e.g. 5 days" value={formData.stayDuration} onChange={(e) => updateField("stayDuration", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q27: Total costs due to stay (excl. treatment)</label>
                                            <input className={inputClass} placeholder="e.g. ₹8,000" value={formData.stayCosts} onChange={(e) => updateField("stayCosts", e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>Q28: Any disability/financial liability?</label>
                                            <select className={inputClass} value={formData.disabilityLiability} onChange={(e) => updateField("disabilityLiability", e.target.value)}>
                                                <option value="">Select...</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                </GlassCard>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end mt-8">
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20 h-12 px-8"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <UserPlus size={18} />
                                        Register Patient
                                    </span>
                                )}
                            </Button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
