import React from "react";
import { type SDGItem } from "@/content/sdgs";
import { HeartPulse, BookOpen, Scale, Building2, Handshake, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SdgRoundelProps {
  sdg: SDGItem;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
  className?: string;
}

export function SdgRoundel({ sdg, size = "md", showDescription = false, className }: SdgRoundelProps) {
  const getIcon = () => {
    switch (sdg.number) {
      case 5:
        return <Users className="w-5 h-5" />;
      case 3:
        return <HeartPulse className="w-5 h-5" />;
      case 4:
        return <BookOpen className="w-5 h-5" />;
      case 10:
        return <Scale className="w-5 h-5" />;
      case 11:
        return <Building2 className="w-5 h-5" />;
      case 17:
        return <Handshake className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const sizeStyles = {
    sm: "w-14 h-14 p-2 text-xs",
    md: "w-20 h-20 p-2.5 text-xs",
    lg: "w-28 h-28 p-3 text-sm",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-between rounded-2xl p-3 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      style={{ backgroundColor: sdg.color }}
    >
      <div className="flex w-full items-center justify-between font-bold leading-none">
        <span className="text-sm md:text-base font-extrabold">{sdg.number}</span>
        <div className="opacity-90">{getIcon()}</div>
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
