
"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, gradient = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                // Subtle lift on hover, not "cheap" huge scaling
                whileHover={{ y: -4, boxShadow: "var(--shadow-glass-hover)" }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
                className={cn(
                    "glass-panel rounded-3xl p-6 transition-colors duration-300",
                    gradient &&
                    "bg-gradient-to-br from-white/70 to-white/40 border-white/60",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";
