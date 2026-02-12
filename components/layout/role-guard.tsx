"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole, type UserRole } from "@/lib/role-context";

interface RoleGuardProps {
    allowedRoles: UserRole[];
    children: React.ReactNode;
}

const roleHomeMap: Record<UserRole, string> = {
    receptionist: "/receptionist",
    patient: "/patient-form",
    "junior-doctor": "/junior-doctor",
    "senior-doctor": "/",
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
    const { role, isHydrated } = useRole();
    const router = useRouter();

    useEffect(() => {
        if (!isHydrated) return; // Wait for localStorage read to complete

        if (!role) {
            router.replace("/role-select");
            return;
        }

        if (!allowedRoles.includes(role)) {
            router.replace(roleHomeMap[role] || "/role-select");
        }
    }, [role, isHydrated, allowedRoles, router]);

    // Still loading from localStorage — show nothing (prevents flash)
    if (!isHydrated) {
        return null;
    }

    // Role loaded but not authorized — show spinner while redirect happens
    if (!role || !allowedRoles.includes(role)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                    <p className="text-sm text-slate-400 font-medium">
                        Redirecting...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
