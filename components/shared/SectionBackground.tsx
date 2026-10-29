import React from "react";
import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  variant?: "purple" | "cream" | "white";
  pattern?: "concentric-arcs" | "floating-elements" | "spiral-wave" | "dual-corners";
  className?: string;
}

export function SectionBackground({
  variant = "purple",
  pattern = "concentric-arcs",
  className,
}: SectionBackgroundProps) {
  if (variant === "purple") {
    return (
      <div
        className={cn(
          "absolute inset-0 pointer-events-none select-none overflow-hidden z-0",
          className
        )}
        aria-hidden="true"
      >
        {/* Slow drifting radial gradient glow */}
        <div
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full animate-bg-glow opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(108, 63, 166, 0.45) 0%, rgba(226, 172, 31, 0.12) 40%, rgba(46, 22, 80, 0) 70%)",
          }}
        />

        <div
          className="absolute -bottom-[20%] -left-[10%] w-[550px] h-[550px] rounded-full animate-bg-blob opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(76, 36, 132, 0.5) 0%, rgba(46, 22, 80, 0) 70%)",
          }}
        />

        {/* Concentric Arcs / Spiral bleed on dark purple */}
        {(pattern === "concentric-arcs" || pattern === "dual-corners") && (
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] animate-bg-slow-rotate opacity-20">
            <svg
              viewBox="0 0 520 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle
                cx="260"
                cy="260"
                r="240"
                stroke="#E2AC1F"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />
              <circle cx="260" cy="260" r="190" stroke="#F5E39E" strokeWidth="1.25" />
              <circle
                cx="260"
                cy="260"
                r="140"
                stroke="#9F75D6"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <circle cx="260" cy="260" r="90" stroke="#E2AC1F" strokeWidth="1" />
            </svg>
          </div>
        )}

        {pattern === "dual-corners" && (
          <div className="absolute -bottom-36 -left-36 w-[480px] h-[480px] animate-bg-slow-reverse opacity-15">
            <svg
              viewBox="0 0 480 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle cx="240" cy="240" r="220" stroke="#9F75D6" strokeWidth="1.5" />
              <circle
                cx="240"
                cy="240"
                r="160"
                stroke="#E2AC1F"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <circle cx="240" cy="240" r="100" stroke="#F5E39E" strokeWidth="1.25" />
            </svg>
          </div>
        )}

        {pattern === "floating-elements" && (
          <div className="absolute right-12 bottom-12 flex gap-3 animate-bg-float opacity-30">
            <div className="w-10 h-10 rounded-2xl border border-thrive-gold-400/40 bg-thrive-gold-400/10" />
            <div className="w-8 h-8 rounded-xl border border-thrive-purple-300/40 bg-thrive-purple-300/10 mt-4" />
            <div className="w-6 h-6 rounded-lg border border-thrive-gold-200/40 bg-thrive-gold-200/10 -mt-2" />
          </div>
        )}
      </div>
    );
  }

  if (variant === "cream") {
    return (
      <div
        className={cn(
          "absolute inset-0 pointer-events-none select-none overflow-hidden z-0",
          className
        )}
        aria-hidden="true"
      >
        {/* Soft pastel tinted blobs */}
        <div
          className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full animate-bg-blob opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 231, 247, 0.8) 0%, rgba(250, 246, 236, 0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-28 -right-24 w-[520px] h-[520px] rounded-full animate-bg-glow opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 240, 211, 0.75) 0%, rgba(250, 246, 236, 0) 70%)",
          }}
        />

        {/* Concentric rings bleeding off edge in pale gold and lavender */}
        {(pattern === "concentric-arcs" || pattern === "spiral-wave") && (
          <div className="absolute -top-28 -right-28 w-[460px] h-[460px] animate-bg-slow-rotate opacity-35">
            <svg
              viewBox="0 0 460 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle
                cx="230"
                cy="230"
                r="210"
                stroke="#D4A017"
                strokeWidth="1.25"
                strokeDasharray="6 8"
                opacity="0.5"
              />
              <circle
                cx="230"
                cy="230"
                r="160"
                stroke="#9F75D6"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <circle
                cx="230"
                cy="230"
                r="110"
                stroke="#E2AC1F"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>
        )}

        {/* ProofDeck-style row of rounded squares that float and fade */}
        {pattern === "floating-elements" && (
          <div className="absolute left-8 bottom-10 hidden sm:flex items-center gap-3 animate-bg-float opacity-55">
            <div className="w-9 h-9 rounded-2xl border border-thrive-purple-300/40 bg-white/60 shadow-xs" />
            <div className="w-12 h-12 rounded-2xl border border-thrive-gold-400/40 bg-thrive-gold-100/50 shadow-xs" />
            <div className="w-7 h-7 rounded-xl border border-thrive-purple-300/30 bg-thrive-purple-100/60 shadow-xs" />
          </div>
        )}
      </div>
    );
  }

  // White variant
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden z-0",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/4 -right-24 w-[480px] h-[480px] rounded-full animate-bg-glow opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(239, 231, 247, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full animate-bg-blob opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(253, 248, 236, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
      />

      {pattern === "concentric-arcs" && (
        <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] animate-bg-slow-rotate opacity-20">
          <svg
            viewBox="0 0 420 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <circle cx="210" cy="210" r="190" stroke="#9F75D6" strokeWidth="1.25" />
            <circle
              cx="210"
              cy="210"
              r="130"
              stroke="#D4A017"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>
        </div>
      )}

      {pattern === "floating-elements" && (
        <div className="absolute right-12 top-12 hidden md:flex items-center gap-2.5 animate-bg-float opacity-40">
          <div className="w-8 h-8 rounded-xl border border-gray-200 bg-thrive-cream/80" />
          <div className="w-10 h-10 rounded-2xl border border-thrive-purple-100 bg-white" />
        </div>
      )}
    </div>
  );
}
