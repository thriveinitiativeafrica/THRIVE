"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DonateModal } from "../shared/DonateModal";

export function DonateBlock() {
  const [selectedOption, setSelectedOption] = useState<number | "custom">(15000);
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const options = [
    { value: 5000, label: "₦5,000" },
    { value: 15000, label: "₦15,000" },
    { value: 35000, label: "₦35,000" },
    { value: 50000, label: "₦50,000" },
    { value: "custom" as const, label: "Custom" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Donation Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
              <span className="italic font-normal font-serif">Make a Difference</span> <br />
              Today
            </h2>

            <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal max-w-xl">
              Choose a donation amount and help us provide essential food, clean water, and schooling to Nigerian communities. Every contribution, no matter the size, creates real change.
            </p>

            {/* Radio Options (Naira only) */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {options.map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-thrive-purple-900 select-none group"
                >
                  <input
                    type="radio"
                    name="donation-tier"
                    checked={selectedOption === opt.value}
                    onChange={() => setSelectedOption(opt.value)}
                    className="w-4 h-4 text-thrive-purple-900 focus:ring-thrive-purple-500 accent-thrive-purple-900"
                  />
                  <span className="group-hover:text-thrive-purple-700 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>

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
                className="px-7 py-3 rounded-full bg-white border border-thrive-purple-900 text-thrive-purple-900 hover:bg-gray-50 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Volunteer
              </Link>
            </div>
          </div>

          {/* Right Column: Flat Arch Frame with Black child portrait from Pexels */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] isolate group">
              {/* Flat Split Arch Background */}
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gray-100 border-l border-t border-b border-gray-200 rounded-tl-full rounded-bl-full -z-10 transition-transform duration-500 group-hover:-translate-x-1" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-thrive-purple-100 border-r border-t border-b border-thrive-purple-200 rounded-tr-full rounded-br-full -z-10 transition-transform duration-500 group-hover:translate-x-1" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden border-2 border-white bg-thrive-cream">
                <Image
                  src="https://images.pexels.com/photos/19800837/pexels-photo-19800837.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Young Black school child smiling"
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
