import React from "react";
import { cn } from "@/lib/utils";

interface SdgIconProps {
  number: number;
  className?: string;
  size?: number;
}

export function SdgIcon({ number, className = "w-6 h-6", size = 24 }: SdgIconProps) {
  switch (number) {
    case 3:
      // SDG 3: Good Health & Well-being
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-500 origin-center group-hover:scale-110", className)}
          width={size}
          height={size}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" className="transition-transform duration-500 origin-center group-hover:-rotate-6" />
          <path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h4.28" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 4:
      // SDG 4: Quality Education (Open Book wings)
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-500 origin-center group-hover:scale-110", className)}
          width={size}
          height={size}
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" className="transition-transform duration-500 origin-right group-hover:-rotate-12" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" className="transition-transform duration-500 origin-left group-hover:rotate-12" />
          <path d="M6 8h2" />
          <path d="M6 12h2" />
          <path d="M16 8h2" />
          <path d="M16 12h2" />
        </svg>
      );
    case 5:
      // SDG 5: Gender Equality (Female symbol wings)
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-500 origin-center group-hover:scale-115", className)}
          width={size}
          height={size}
        >
          <circle cx="12" cy="8" r="5" className="transition-transform duration-500 group-hover:scale-105" />
          <path d="M12 13v8" />
          <path d="M9 18h6" />
          <path d="M9 7h6" className="transition-transform duration-500 origin-left group-hover:-rotate-6" />
          <path d="M9 10h6" className="transition-transform duration-500 origin-right group-hover:rotate-6" />
        </svg>
      );
    case 10:
      // SDG 10: Reduced Inequalities (Equal bars wing spread)
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-500 origin-center group-hover:scale-110", className)}
          width={size}
          height={size}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="7" y1="9.5" x2="17" y2="9.5" strokeWidth="2.5" className="transition-transform duration-500 origin-center group-hover:-translate-y-0.5 group-hover:scale-x-110" />
          <line x1="7" y1="14.5" x2="17" y2="14.5" strokeWidth="2.5" className="transition-transform duration-500 origin-center group-hover:translate-y-0.5 group-hover:scale-x-110" />
        </svg>
      );
    case 11:
      // SDG 11: Sustainable Cities & Communities (Building doors unfold)
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-500 origin-center group-hover:scale-110", className)}
          width={size}
          height={size}
        >
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" className="transition-transform duration-500 origin-bottom group-hover:-rotate-3" />
          <path d="M13 10l6 3v8" className="transition-transform duration-500 origin-bottom group-hover:rotate-3" />
          <path d="M9 9v.01" />
          <path d="M9 13v.01" />
          <path d="M9 17v.01" />
          <path d="M17 17v.01" />
        </svg>
      );
    case 17:
      // SDG 17: Partnerships for the Goals (Interlocking handshakes butterfly wing spread)
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-500 origin-center group-hover:scale-115", className)}
          width={size}
          height={size}
        >
          <path d="m11 17 2 2a1 1 0 0 0 1.42 0l4.24-4.24a1 1 0 0 0 0-1.42l-2-2" className="transition-transform duration-500 origin-right group-hover:translate-x-1 group-hover:-translate-y-1" />
          <path d="m7 7 2-2a1 1 0 0 1 1.42 0l4.24 4.24a1 1 0 0 1 0 1.42l-2 2" className="transition-transform duration-500 origin-left group-hover:-translate-x-1 group-hover:translate-y-1" />
          <path d="M12 12v.01" />
          <path d="M18 10a6 6 0 0 0-12 0" className="transition-transform duration-500 group-hover:scale-110" />
          <path d="M6 14a6 6 0 0 0 12 0" className="transition-transform duration-500 group-hover:scale-110" />
        </svg>
      );
    default:
      return null;
  }
}
