import React from "react";
import { type SDGItem } from "@/content/sdgs";
import { SdgIcon } from "./SdgIcon";
import { cn } from "@/lib/utils";

interface SdgRoundelProps {
  sdg: SDGItem;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
  className?: string;
}

export function SdgRoundel({
  sdg,
  size = "md",
  showDescription = false,
  className,
}: SdgRoundelProps) {
  const sizeStyles = {
    sm: "w-16 h-16 p-2 text-xs",
    md: "w-24 h-24 p-3 text-xs",
    lg: "w-32 h-32 p-4 text-sm",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-between rounded-2xl p-3 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        sizeStyles[size],
        className
      )}
      style={{ backgroundColor: sdg.color }}
    >
      <div className="flex w-full items-center justify-between font-bold leading-none">
        <span className="text-sm md:text-base font-extrabold">{sdg.number}</span>
        <div className="opacity-95">
          <SdgIcon number={sdg.number} size={size === "sm" ? 16 : 20} className="text-white" />
        </div>
      </div>
      <div className="mt-1 text-center font-bold tracking-tight uppercase line-clamp-2 text-[10px] md:text-xs">
        {sdg.shortTitle}
      </div>

      {showDescription && (
        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] opacity-90 leading-tight">
          {sdg.initiativeAction}
        </div>
      )}
    </div>
  );
}
