"use client";

import React from "react";
import Image from "next/image";
import { openDonateModal } from "@/components/shared/DonateModal";

export function HomeHero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden flex items-end p-6 sm:p-12 lg:p-16">
        {/* Full Width Rounded Authentic Nigerian Photo */}
        <Image
          src="/images/hero-children-center.webp"
          alt="Nigerian children and community members at a local outreach center in Lagos"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Solid Dark Overlay for Contrast (No Gradient) */}
        <div className="absolute inset-0 bg-[#2E1650]/60" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl text-white space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            Together, We Can Change Lives
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
            We partner with local communities across Lagos to expand access to clean water, child education, and women empowerment.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openDonateModal()}
              className="px-8 py-3.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm sm:text-base transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
