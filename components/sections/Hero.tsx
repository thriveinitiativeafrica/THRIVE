"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteImages } from "@/content/images.config";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { DonateModal } from "../shared/DonateModal";

export function Hero() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  return (
    <section className="relative bg-thrive-purple-900 text-white pt-32 pb-24 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-36 overflow-hidden border-b border-thrive-purple-800">
      {/* ProofDeck-style Animated Background Atmosphere */}
      <SectionBackground variant="purple" pattern="dual-corners" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Mission & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-thrive-gold-400 animate-pulse" />
              <span>Registered Nigerian NGO • Lagos, Nigeria</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white">
              <span className="relative inline-block">
                Together,
                <span className="absolute left-0 bottom-1 w-full h-1 bg-thrive-gold-400 rounded-full" />
              </span>{" "}
              <span className="italic font-normal font-serif text-thrive-gold-400">We Can</span>{" "}
              Change Lives
            </h1>

            <p className="text-base sm:text-lg text-thrive-purple-100/90 max-w-xl font-normal leading-relaxed">
              We deliver solar-powered clean water boreholes, school enrollment kits, nutrition relief, and vocational skills training to vulnerable families across peri-urban and rural Nigerian settlements.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setDonateModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Donate
              </button>

              <Link
                href="/get-involved/volunteer"
                className="px-8 py-3.5 rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Volunteer
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Photo Collage (5 cols) with 100% Black Nigerian/African Subjects */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Layered Decorative Shapes */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-thrive-purple-800/80 border border-thrive-purple-700/60 rounded-tr-[120px] rounded-tl-3xl rounded-br-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-thrive-purple-700/50 border border-thrive-purple-600/50 rounded-bl-[120px] rounded-br-3xl rounded-tl-3xl -z-0" />

              {/* 5-Photo Collage with Authentic Local Representation */}
              <div className="relative z-10 w-full h-full p-2 grid grid-cols-2 gap-3">
                {/* Photo 1: Top Left - African woman community leader */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20 shadow-sm bg-thrive-purple-800">
                  <Image
                    src={siteImages.hero.woman.src}
                    alt={siteImages.hero.woman.alt}
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 2: Top Right - Nigerian classroom pupils */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20 shadow-sm bg-thrive-purple-800">
                  <Image
                    src={siteImages.hero.classroom.src}
                    alt={siteImages.hero.classroom.alt}
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 3: Center Highlight Overlap */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-2xl overflow-hidden border-2 border-white z-20 shadow-xl bg-thrive-cream">
                  <Image
                    src={siteImages.hero.centerChildren.src}
                    alt={siteImages.hero.centerChildren.alt}
                    fill
                    sizes="180px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 4: Bottom Left - Volunteers carrying aid parcels */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20 shadow-sm bg-thrive-purple-800">
                  <Image
                    src={siteImages.hero.volunteers.src}
                    alt={siteImages.hero.volunteers.alt}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>

                {/* Photo 5: Bottom Right - Mother and child */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20 shadow-sm bg-thrive-purple-800">
                  <Image
                    src={siteImages.hero.motherChild.src}
                    alt={siteImages.hero.motherChild.alt}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonateModal isOpen={donateModalOpen} onClose={() => setDonateModalOpen(false)} />
    </section>
  );
}
