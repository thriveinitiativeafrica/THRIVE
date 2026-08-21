import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "gold" | "purple" | "teal" | "dark" | "outline";
  title: string;
  italicWord?: string;
  description?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  title,
  italicWord,
  description,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  // Split title if italicWord is provided
  const renderTitle = () => {
    if (!italicWord || !title.includes(italicWord)) {
      return title;
    }
    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <span
          className={cn(
            "italic font-normal font-serif",
            isDark ? "text-thrive-gold-400" : "text-thrive-gold-600"
          )}
        >
          {italicWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 max-w-3xl",
        align === "center" && "mx-auto text-center items-center",
        align === "left" && "text-left items-start",
        align === "right" && "ml-auto text-right items-end",
        className
      )}
    >
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15]",
          isDark ? "text-white" : "text-thrive-purple-900"
        )}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed max-w-2xl font-normal",
            isDark ? "text-thrive-purple-100/80" : "text-thrive-ink-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
