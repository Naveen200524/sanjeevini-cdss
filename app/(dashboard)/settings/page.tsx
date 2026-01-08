"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Bell, Shield, Save, LogOut } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
                    <p className="text-slate-500 text-sm">Manage your profile and application preferences.</p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <div className="flex justify-start mb-6">
                    <TabsList>
                        <TabsTrigger value="profile"><User size={16} className="mr-2" /> My Profile</TabsTrigger>
                        <TabsTrigger value="notifications"><Bell size={16} className="mr-2" /> Notifications</TabsTrigger>
                        <TabsTrigger value="security"><Shield size={16} className="mr-2" /> Security</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="profile">
                    <GlassCard className="p-8 space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden relative border-4 border-white shadow-lg">
                                    <Image src="https://ui-avatars.com/api/?name=Dr+Emily&background=random&size=200" alt="Profile" fill className="object-cover" />
                                </div>
                                <Button variant="secondary" size="sm">Change Photo</Button>
                            </div>

                            <div className="flex-1 space-y-6 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input defaultValue="Dr. Emily Sharma" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Specialty</Label>
                                        <Input defaultValue="Cardiology" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input defaultValue="emily.sharma@sanjeevini.health" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input defaultValue="+91 98765 43210" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <textarea className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-100 outline-none" defaultValue="Senior Cardiologist with 15 years of experience in preventative care and AI-driven diagnostics." />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-6 border-t border-slate-100">
                            <Button className="bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                                <Save size={16} className="mr-2" /> Save Changes
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>

                <TabsContent value="notifications">
                    <GlassCard className="p-8 max-w-2xl">
                        <h3 className="font-bold text-slate-800 mb-6">Email Notifications</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Critical Alerts</Label>
                                    <p className="text-sm text-slate-500">Receive emails for high-risk patient predictions.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Daily Summary</Label>
                                    <p className="text-sm text-slate-500">Receive a morning digest of your schedule and tasks.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">System Updates</Label>
                                    <p className="text-sm text-slate-500">News about feature updates and maintenance.</p>
                                </div>
                                <Switch />
                            </div>
                        </div>

                        <h3 className="font-bold text-slate-800 mt-8 mb-6">Push Notifications</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">New Lab Results</Label>
                                    <p className="text-sm text-slate-500">Instant alert when patient reports are ready.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                        <div className="flex justify-end pt-6 border-t border-slate-100 mt-8">
                            <Button className="bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                                <Save size={16} className="mr-2" /> Save Preferences
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>

                <TabsContent value="security">
                    <GlassCard className="p-8 max-w-2xl space-y-8">
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4">Password</h3>
                            <div className="grid grid-cols-1 gap-4 max-w-md">
                                <Input type="password" placeholder="Current Password" />
                                <Input type="password" placeholder="New Password" />
                                <Input type="password" placeholder="Confirm New Password" />
                                <Button variant="secondary" className="w-fit">Update Password</Button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-4">Two-Factor Authentication</h3>
                            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-base font-semibold">Authenticator App</Label>
                                        <Badge className="bg-emerald-100 text-emerald-600 border-none">Enabled</Badge>
                                    </div>
                                    <p className="text-sm text-slate-500">Secure your account with Google Authenticator.</p>
                                </div>
                                <Button variant="secondary" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">Disable</Button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <h3 className="font-bold text-red-600 mb-4">Danger Zone</h3>
                            <Button variant="danger" className="w-full md:w-auto">
                                <LogOut size={16} className="mr-2" /> Sign out of all devices
                            </Button>
                        </div>
                    </GlassCard>
                </TabsContent>
            </Tabs>
        </div>
    );
}
