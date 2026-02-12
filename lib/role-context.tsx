"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "receptionist" | "patient" | "junior-doctor" | "senior-doctor";

interface RoleContextValue {
    role: UserRole | null;
    isHydrated: boolean;
    setRole: (role: UserRole) => void;
    clearRole: () => void;
}

const RoleContext = createContext<RoleContextValue>({
    role: null,
    isHydrated: false,
    setRole: () => { },
    clearRole: () => { },
});

const ROLE_STORAGE_KEY = "sanjeevini-user-role";

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRoleState] = useState<UserRole | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(ROLE_STORAGE_KEY);
        if (stored && ["receptionist", "patient", "junior-doctor", "senior-doctor"].includes(stored)) {
            setRoleState(stored as UserRole);
        }
        setIsHydrated(true);
    }, []);

    const setRole = (newRole: UserRole) => {
        setRoleState(newRole);
        localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    };

    const clearRole = () => {
        setRoleState(null);
        localStorage.removeItem(ROLE_STORAGE_KEY);
    };

    return (
        <RoleContext.Provider value={{ role, isHydrated, setRole, clearRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    return useContext(RoleContext);
}
