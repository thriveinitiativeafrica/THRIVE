import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlobImageFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  shape?: "quarter-tl" | "quarter-tr" | "quarter-br" | "quarter-bl" | "arch" | "rounded-3xl";
  accentColor?: "purple" | "cream";
  accentPosition?: "top-right" | "bottom-left" | "top-left" | "behind";
  className?: string;
  imageClassName?: string;
}

export function BlobImageFrame({
  src,
  alt,
  width = 600,
  height = 600,
  priority = false,
  shape = "quarter-tl",
  accentColor = "purple",
  accentPosition = "behind",
  className,
  imageClassName,
}: BlobImageFrameProps) {
  const shapeStyles = {
    "quarter-tl": "rounded-tl-[140px] sm:rounded-tl-[180px] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl",
    "quarter-tr": "rounded-tr-[140px] sm:rounded-tr-[180px] rounded-tl-3xl rounded-br-3xl rounded-bl-3xl",
    "quarter-br": "rounded-br-[140px] sm:rounded-br-[180px] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl",
    "quarter-bl": "rounded-bl-[140px] sm:rounded-bl-[180px] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl",
    arch: "rounded-t-full rounded-b-3xl",
    "rounded-3xl": "rounded-3xl",
  };

  const accentColorStyles = {
    purple: "bg-thrive-purple-100",
    cream: "bg-thrive-cream",
  };

  return (
    <div className={cn("relative inline-block isolate group", className)}>
      {/* Flat Backing Sector (Neutral border, No yellow) */}
      <div
        className={cn(
          "absolute -z-10 w-full h-full border border-gray-200 transition-transform duration-500 group-hover:scale-102",
          accentPosition === "top-right" && "top-3 -right-3",
          accentPosition === "bottom-left" && "-bottom-3 -left-3",
          accentPosition === "top-left" && "-top-3 -left-3",
          accentPosition === "behind" && "top-3 left-3",
          shapeStyles[shape],
          accentColorStyles[accentColor]
        )}
      />

      {/* Main Image Container (Flat, crisp neutral border, No yellow) */}
      <div
        className={cn(
          "relative overflow-hidden bg-thrive-cream border-2 border-white transition-transform duration-500 group-hover:scale-[1.01]",
          shapeStyles[shape],
          imageClassName
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
