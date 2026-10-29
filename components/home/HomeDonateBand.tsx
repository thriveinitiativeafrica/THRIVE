"use client";

import React, { useState } from "react";
import Image from "next/image";
import { openDonateModal } from "@/components/shared/DonateModal";

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

export function HomeDonateBand() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);

  function handleDonateClick() {
    openDonateModal(selectedAmount ?? undefined);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-[#2E1650]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        {/* Left Form (7 cols - PureFlow layout) */}
        <div className="lg:col-span-7 p-7 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#2E1650] leading-[1.12]">
              Every Contribution Powers Real Grassroots Impact
            </h2>

            {/* Subtitle + Give Once / Monthly Toggle on the same row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#2E1650]/75 leading-relaxed max-w-xs">
                Empower women, educate children, and build resilient communities in Abuja.
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setFrequency("once")}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    frequency === "once"
                      ? "bg-[#D4A017] text-[#2E1650]"
                      : "bg-white border border-[#2E1650]/20 text-[#2E1650] hover:bg-[#FAF6EC]"
                  }`}
                >
                  Give Once
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    frequency === "monthly"
                      ? "bg-[#D4A017] text-[#2E1650]"
                      : "bg-white border border-[#2E1650]/20 text-[#2E1650] hover:bg-[#FAF6EC]"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>

          <hr className="border-[#2E1650]/10 my-7" />

          {/* Choose an Amount (PureFlow 2x3 pill grid) */}
          <div className="space-y-5">
            <p className="text-sm sm:text-base font-medium text-[#2E1650]">
              Choose an Amount
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRESET_AMOUNTS.map((amt) => {
                const isSelected = selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3.5 px-4 rounded-full text-xs sm:text-sm font-medium border text-center transition-colors cursor-pointer ${
                      isSelected
                        ? "border-[#2E1650] bg-[#2E1650] text-white font-semibold"
                        : "border-[#2E1650]/20 hover:border-[#2E1650] text-[#2E1650] bg-white"
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setSelectedAmount(null);
                  openDonateModal();
                }}
                className={`py-3.5 px-4 rounded-full text-xs sm:text-sm font-medium border text-center transition-colors cursor-pointer ${
                  selectedAmount === null
                    ? "border-[#2E1650] bg-[#2E1650] text-white font-semibold"
                    : "border-[#2E1650]/20 hover:border-[#2E1650] text-[#2E1650] bg-white"
                }`}
              >
                Other amount
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDonateClick}
                className="w-full py-4 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-semibold rounded-full text-sm transition-colors cursor-pointer"
              >
                {selectedAmount
                  ? `Donate ₦${selectedAmount.toLocaleString()}${frequency === "monthly" ? " / month" : ""}`
                  : "Donate Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Photo (5 cols - flush full height) */}
        <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-gray-100">
          <Image
            src="/images/impact-water.webp"
            alt="Community outreach and clean water access in Abuja, Nigeria"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
      </div>
    </section>
  );
}
