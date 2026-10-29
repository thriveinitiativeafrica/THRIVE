"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import { openDonateModal } from "@/components/shared/DonateModal";
import { IconCheck, IconCopy } from "@/components/shared/Icons";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [copied, setCopied] = useState(false);

  function copyAccountNumber() {
    navigator.clipboard.writeText(siteConfig.bankDetails.accountNumberNaira);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 pb-24">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Donate
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          Support sustainable community programs
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          Your donation funds direct community interventions across clean water, child literacy, and women economic empowerment in Abuja.
        </p>
      </section>

      {/* Main Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-medium text-[#2E1650]">Select Donation Amount</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Choose your contribution frequency and amount in Nigerian Naira (NGN).
            </p>
          </div>

          {/* Frequency Toggle */}
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

          {/* Amount Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[5000, 10000, 25000, 50000, 100000].map((amt) => {
              const isSelected = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3.5 px-3 rounded-2xl text-xs sm:text-sm font-medium border text-center transition-colors ${
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
              onClick={() => openDonateModal(selectedAmount)}
              className="px-8 py-3.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm transition-colors"
            >
              Donate ₦{selectedAmount.toLocaleString()} {frequency === "monthly" ? "/ month" : ""}
            </button>
          </div>

          {/* Bank Transfer Details Box */}
          <div className="pt-8 border-t border-gray-100 space-y-4">
            <h3 className="text-lg font-medium text-[#2E1650]">Direct Bank Transfer Instructions</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              You can also transfer directly to our official non-governmental organization account:
            </p>

            <div className="p-5 bg-[#FAF6EC] rounded-2xl border border-gray-200 space-y-3">
              <div>
                <span className="text-[11px] text-gray-500 block">Bank Name</span>
                <span className="text-sm font-semibold text-[#2E1650]">{siteConfig.bankDetails.bankName}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 block">Account Name</span>
                <span className="text-sm font-semibold text-[#2E1650]">{siteConfig.bankDetails.accountName}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block">Account Number</span>
                  <span className="text-base font-mono font-bold text-[#2E1650] tracking-wider">
                    {siteConfig.bankDetails.accountNumberNaira}
                  </span>
                </div>
                <button
                  onClick={copyAccountNumber}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs font-medium hover:border-[#2E1650] flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <IconCheck className="w-3.5 h-3.5 text-green-700" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Please email your transfer receipt to <strong>{siteConfig.contact.email}</strong> so our finance department can confirm and issue your donation acknowledgement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
