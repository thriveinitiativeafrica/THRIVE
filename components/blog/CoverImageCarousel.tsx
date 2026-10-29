"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface CarouselSlide {
  url: string;
  alt?: string;
}

interface CoverImageCarouselProps {
  slides: CarouselSlide[];
  fallbackTitle: string;
}

export function CoverImageCarousel({ slides, fallbackTitle }: CoverImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fitMode, setFitMode] = useState<"contain" | "cover">("contain");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = slides.length;

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, goPrev, goNext]);

  if (count === 0) return null;

  const activeSlide = slides[currentIndex] || slides[0];

  return (
    <div className="space-y-4">
      {/* Main Carousel Stage */}
      <div
        className="relative w-full h-[380px] sm:h-[500px] lg:h-[580px] rounded-3xl overflow-hidden bg-[#1D0E33] border border-[#2E1650]/10 group select-none"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const diff = e.changedTouches[0].clientX - touchStartX;
          if (diff > 45 && count > 1) goPrev();
          if (diff < -45 && count > 1) goNext();
          setTouchStartX(null);
        }}
      >
        {/* Soft blurred backdrop when in "contain" mode so portrait flyers look studio-framed */}
        {fitMode === "contain" && (
          <Image
            src={activeSlide.url}
            alt=""
            fill
            unoptimized={activeSlide.url.startsWith("data:")}
            className="object-cover opacity-25 blur-xl scale-110 pointer-events-none"
            sizes="100vw"
          />
        )}

        <Image
          src={activeSlide.url}
          alt={activeSlide.alt || fallbackTitle}
          fill
          priority
          unoptimized={activeSlide.url.startsWith("data:")}
          className={`transition-all duration-300 ${
            fitMode === "contain" ? "object-contain p-2 sm:p-4" : "object-cover"
          }`}
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Top-Right Controls: Slide Counter + Fit/Fill Toggle */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFitMode((m) => (m === "contain" ? "cover" : "contain"))}
            className="px-3 py-1.5 rounded-full bg-[#2E1650]/80 hover:bg-[#2E1650] backdrop-blur-md text-white text-[11px] font-medium border border-white/15 transition-colors cursor-pointer"
            title="Switch between full-image fit and edge-to-edge fill"
          >
            {fitMode === "contain" ? "Fill Frame" : "Show Full Image"}
          </button>
          {count > 1 && (
            <span className="px-3.5 py-1.5 rounded-full bg-[#2E1650]/85 backdrop-blur-md text-[#D4A017] text-xs font-semibold border border-white/15">
              {currentIndex + 1} / {count}
            </span>
          )}
        </div>

        {/* Previous / Next Buttons (when multiple slides exist) */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2E1650]/85 hover:bg-[#D4A017] text-white hover:text-[#2E1650] border border-white/20 flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2E1650]/85 hover:bg-[#D4A017] text-white hover:text-[#2E1650] border border-white/20 flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Caption for active slide */}
      {activeSlide.alt && activeSlide.alt !== fallbackTitle && (
        <p className="text-xs text-[#2E1650]/65 text-center">{activeSlide.alt}</p>
      )}

      {/* Thumbnail Strip (when multiple slides exist) */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`${slide.url}-${idx}`}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-[#D4A017] ring-2 ring-[#D4A017]/40 scale-105"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt || `Slide ${idx + 1}`}
                  fill
                  unoptimized={slide.url.startsWith("data:")}
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
