"use client";

import React, { useState } from "react";
import Image from "next/image";
import { openDonateModal } from "@/components/shared/DonateModal";

export function HomeDonateBand() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);

  function handleDonateClick() {
    openDonateModal(selectedAmount);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Make an Impact
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2E1650] leading-tight">
              Support sustainable community initiatives
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Your contribution enables direct grassroots programs in clean water infrastructure, youth literacy, and women economic independence in Lagos communities.
            </p>
          </div>

          <div className="space-y-5">
            {/* Once vs Monthly Toggle */}
            <div className="flex p-1 bg-[#FAF6EC] rounded-full border border-gray-200 max-w-xs">
              <button
                type="button"
                onClick={() => setFrequency("once")}
                className={`flex-1 py-2 text-xs font-medium rounded-full transition-colors ${
                  frequency === "once" ? "bg-[#2E1650] text-white" : "text-gray-600"
                }`}
              >
                Give Once
              </button>
              <button
                type="button"
                onClick={() => setFrequency("monthly")}
                className={`flex-1 py-2 text-xs font-medium rounded-full transition-colors ${
                  frequency === "monthly" ? "bg-[#2E1650] text-white" : "text-gray-600"
                }`}
              >
                Give Monthly
              </button>
            </div>

            {/* Amount Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[5000, 10000, 25000, 50000, 100000].map((amt) => {
                const isSelected = selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 px-2 rounded-2xl text-xs font-medium border text-center transition-colors ${
                      isSelected
                        ? "border-[#2E1650] bg-[#FAF6EC] text-[#2E1650] font-semibold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                );
              })}
            </div>

            <div>
              <button
                type="button"
                onClick={handleDonateClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm transition-colors"
              >
                Donate ₦{selectedAmount.toLocaleString()} {frequency === "monthly" ? "/ month" : ""}
              </button>
            </div>
          </div>
        </div>

        {/* Right Photo (5 cols) */}
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-gray-100">
          <Image
            src="/images/impact-water.webp"
            alt="Children and community members in a Lagos settlement at a clean water point"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
