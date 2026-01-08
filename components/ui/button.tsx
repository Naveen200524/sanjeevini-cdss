import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "glass" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

        const variants = {
            primary: "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5",
            secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm",
            ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            glass: "bg-white/40 backdrop-blur-md border border-white/50 text-slate-800 hover:bg-white/60 shadow-sm",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs rounded-xl",
            md: "h-10 px-5 text-sm rounded-2xl",
            lg: "h-12 px-8 text-base rounded-2xl",
            icon: "h-10 w-10 p-2 flex items-center justify-center rounded-2xl",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
