import React from "react";
import { cn } from "@/lib/utils";

interface BadgePillProps {
  children: React.ReactNode;
  variant?: "gold" | "purple" | "teal" | "dark" | "outline" | "cream";
  className?: string;
}

export function BadgePill({ children, variant = "gold", className }: BadgePillProps) {
  const variantStyles = {
    gold: "bg-thrive-gold-100 text-thrive-purple-900 border border-thrive-gold-400/40",
    purple: "bg-thrive-purple-100 text-thrive-purple-900 border border-thrive-purple-300/40",
    teal: "bg-thrive-teal-100 text-thrive-teal-700 border border-thrive-teal-400/40",
    dark: "bg-white/15 text-white border border-white/20",
    cream: "bg-thrive-cream text-thrive-purple-900 border border-thrive-gold-200",
    outline: "bg-transparent text-thrive-purple-900 border border-thrive-purple-900/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
