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
                Donate
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

              {/* 5-Photo Mosaic with 100% Black African Subjects */}
              <div className="relative z-10 w-full h-full p-2 grid grid-cols-2 gap-3">
                {/* Photo 1: Top Left - Black African woman */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="African woman smiling"
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 2: Top Right - Black children in school classroom */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Black children learning in classroom"
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 3: Center Highlight - Smiling Black children with food at school */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-2xl overflow-hidden border-2 border-white z-20 shadow-md">
                  <Image
                    src="https://images.pexels.com/photos/19800837/pexels-photo-19800837.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Smiling Black children sitting together at school"
                    fill
                    sizes="180px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Photo 4: Bottom Left - Happy Black volunteers carrying aid boxes */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.pexels.com/photos/8061641/pexels-photo-8061641.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Happy Black volunteers carrying food boxes"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>

                {/* Photo 5: Bottom Right - Black woman and child */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/20">
                  <Image
                    src="https://images.pexels.com/photos/7849435/pexels-photo-7849435.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Black woman caring for young boy"
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
