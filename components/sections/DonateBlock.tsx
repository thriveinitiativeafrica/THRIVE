"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/content/images.config";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { DonateModal } from "../shared/DonateModal";

export function DonateBlock() {
  const [selectedOption, setSelectedOption] = useState<number | "custom">(15000);
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const options = [
    { value: 5000, label: "₦5,000", desc: "Learning supplies for 2 pupils" },
    { value: 15000, label: "₦15,000", desc: "Vocational tools for 1 trainee" },
    { value: 35000, label: "₦35,000", desc: "Emergency food for vulnerable family" },
    { value: 50000, label: "₦50,000", desc: "Clean water borehole maintenance" },
    { value: "custom" as const, label: "Custom Amount", desc: "Specify any contribution" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <SectionBackground variant="white" pattern="concentric-arcs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Donation Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-600">
                Direct Grassroots Giving
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
                <span className="italic font-normal font-serif text-thrive-gold-600">Make a Difference</span> <br />
                Today
              </h2>
            </div>

            <p className="text-base text-thrive-ink-600 leading-relaxed font-normal max-w-xl">
              Choose a contribution tier to fund essential food relief, clean borehole water, or classroom supplies in Nigerian communities. Every Naira is accounted for in our annual public impact reports.
            </p>

            {/* Radio Options with impact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {options.map((opt) => (
                <label
                  key={opt.label}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
                    selectedOption === opt.value
                      ? "border-thrive-purple-900 bg-thrive-purple-50 shadow-xs"
                      : "border-thrive-border bg-white hover:bg-thrive-cream"
                  }`}
                >
                  <input
                    type="radio"
                    name="donation-tier"
                    checked={selectedOption === opt.value}
                    onChange={() => setSelectedOption(opt.value)}
                    className="w-4 h-4 mt-0.5 text-thrive-purple-900 focus:ring-thrive-purple-500 accent-thrive-purple-900"
                  />
                  <div>
                    <div className="text-sm font-bold text-thrive-purple-900">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-thrive-ink-600 mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setDonateModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Donate
              </button>

              <Link
                href="/get-involved/volunteer"
                className="px-8 py-3.5 rounded-full bg-white border-2 border-thrive-purple-900 text-thrive-purple-900 hover:bg-thrive-cream font-bold text-xs uppercase tracking-wider transition-all"
              >
                Volunteer
              </Link>
            </div>
          </div>

          {/* Right Column: Flat Arch Frame with Black Nigerian Subject */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] isolate group">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-thrive-cream border border-thrive-border rounded-tl-full rounded-bl-full -z-10 transition-transform duration-500 group-hover:-translate-x-1" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-thrive-purple-100 border border-thrive-purple-200 rounded-tr-full rounded-br-full -z-10 transition-transform duration-500 group-hover:translate-x-1" />

              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden border-2 border-white shadow-lg bg-thrive-cream">
                <Image
                  src={siteImages.hero.motherChild.src}
                  alt={siteImages.hero.motherChild.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        initialAmount={typeof selectedOption === "number" ? selectedOption : 15000}
      />
    </section>
  );
}
