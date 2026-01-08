"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children?: React.ReactNode;
    intensity?: "low" | "medium" | "high";
    hoverEffect?: boolean;
}

export const GlassCard = ({
    children,
    className,
    intensity = "medium",
    hoverEffect = true,
    ...props
}: GlassCardProps) => {
    const intensityStyles = {
        low: "bg-white/30 backdrop-blur-md border-white/40",
        medium: "bg-white/40 backdrop-blur-xl border-white/50",
        high: "bg-white/60 backdrop-blur-2xl border-white/60",
    };

    return (
        <motion.div
            initial={hoverEffect ? { y: 0 } : undefined}
            whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "rounded-3xl border shadow-sm transition-all duration-300",
                intensityStyles[intensity],
                "shadow-slate-200/50", // Soft colored shadow
                className
            )}
            {...props}
        >
            {/* Inner highlight for 3D glass effect */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
