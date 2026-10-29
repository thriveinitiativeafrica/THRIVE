"use client";

import React from "react";
import Image from "next/image";
import { openDonateModal } from "@/components/shared/DonateModal";

export function HomeHero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
      <div className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[650px] rounded-3xl overflow-hidden flex items-end p-5 sm:p-10 lg:p-12">
        {/* Full Width Rounded Authentic Nigerian Photo */}
        <Image
          src="/images/hero-children-center.webp"
          alt="Nigerian children and community members at a THRIVE Initiative outreach in Abuja"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Subtle overall contrast scrim so photo stays vibrant */}
        <div className="absolute inset-0 bg-[#2E1650]/20" />

        {/* PureFlow-style Frosted Bottom-Left Card */}
        <div className="relative z-10 max-w-xl bg-[#2E1650]/85 backdrop-blur-md border border-white/15 rounded-2xl p-7 sm:p-10 text-white space-y-5 shadow-lg">
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-medium tracking-tight text-white leading-[1.08]">
            Together, We Can Change Lives
          </h1>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-md">
            We partner with underserved communities in Abuja, Nigeria to expand access to women empowerment, quality child education, and sustainable livelihoods.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => openDonateModal()}
              className="px-7 py-3.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-semibold rounded-full text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
