"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DonateModal } from "../shared/DonateModal";

export function Hero() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  return (
    <section className="relative bg-thrive-purple-900 text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 overflow-hidden border-b border-thrive-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white">
              <span className="relative inline-block">
                Together,
                <span className="absolute left-0 bottom-1 w-full h-1 bg-thrive-gold-400 rounded-full" />
              </span>{" "}
              <span className="italic font-normal font-serif text-thrive-gold-400">We Can</span>{" "}
              Change Lives
            </h1>

            <p className="text-base sm:text-lg text-thrive-purple-100/85 max-w-xl font-normal leading-relaxed">
              Every small effort can make a big change. With your help, we can transform lives and build a better tomorrow for Nigerian communities.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setDonateModalOpen(true)}
                className="px-7 py-3 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Donate Now
              </button>

              <Link
                href="/get-involved/volunteer"
                className="px-7 py-3 rounded-full bg-white text-thrive-purple-900 hover:bg-thrive-cream font-bold text-xs uppercase tracking-wider transition-all"
              >
                Volunteer
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Photo Collage (5 cols) with 100% Black African Subjects */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Flat Geometry Backdrops (No gradients, no green) */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-thrive-purple-800/80 border border-thrive-purple-700 rounded-tr-full rounded-tl-3xl rounded-br-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-thrive-purple-700/60 border border-thrive-purple-600 rounded-bl-full rounded-br-3xl rounded-tl-3xl -z-0" />

              {/* 5-Photo Mosaic with 100% Black / West African Subjects (No shadows) */}
              <div className="relative z-10 w-full h-full p-2 grid grid-cols-2 gap-3">
                {/* Photo 1: Top Left */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80"
                    alt="African mother and child smiling"
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 2: Top Right */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80"
                    alt="African children learning in classroom"
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 3: Center Highlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-2xl overflow-hidden border-2 border-white z-20">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80"
                    alt="African young child with hopeful expression"
                    fill
                    sizes="180px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 4: Bottom Left */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=500&q=80"
                    alt="African children at clean water well"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>

                {/* Photo 5: Bottom Right */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                    alt="African young woman smiling"
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
