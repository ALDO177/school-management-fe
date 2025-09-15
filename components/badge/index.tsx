import React from "react";

export type BadgeProps = {
    label: string;
    variant?: "primary" | "secondary" | "success" | "warning" | "danger";
    className?: string;
};


const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
    warning: "bg-amber-400 text-white hover:bg-amber-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
};


export default function Badge({ label, variant = "primary", className = "" }: BadgeProps) {
    return (
        <span
            className={[
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm transition",
                variantClasses[variant],
                className,
            ].join(" ")}
        >
            {label}
        </span>
    );
}