import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "secondary" | "success" | "warning" | "danger" | "glass";
    size?: "sm" | "md";
}

export function Badge({
    className,
    variant = "default",
    size = "md",
    ...props
}: BadgeProps) {
    const variants = {
        default: "bg-primary-100 text-primary-700 border-transparent",
        outline: "bg-transparent text-slate-700 border-slate-200",
        secondary: "bg-slate-100 text-slate-700 border-transparent",
        success: "bg-emerald-100 text-emerald-700 border-transparent",
        warning: "bg-amber-100 text-amber-700 border-transparent",
        danger: "bg-rose-100 text-rose-700 border-transparent",
        glass: "bg-white/40 backdrop-blur-md border-white/50 text-slate-700",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
}
