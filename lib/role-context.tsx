"use client";

import React, { createContext, useContext, useState, useLayoutEffect } from "react";

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

// Helper to safely get stored role
function getStoredRole(): UserRole | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(ROLE_STORAGE_KEY);
    if (stored && ["receptionist", "patient", "junior-doctor", "senior-doctor"].includes(stored)) {
        return stored as UserRole;
    }
    return null;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
    // Use lazy initializer - returns null on server, real value on client
    const [role, setRoleState] = useState<UserRole | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Use layout effect to synchronize with localStorage before paint
    // This is a legitimate hydration pattern to sync with localStorage
    useLayoutEffect(() => {
        const storedRole = getStoredRole();
        if (storedRole) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRoleState(storedRole);
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
