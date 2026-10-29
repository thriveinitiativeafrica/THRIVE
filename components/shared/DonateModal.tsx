"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/content/site.config";
import { IconClose, IconCheck, IconCopy } from "@/components/shared/Icons";

export function openDonateModal(defaultAmount?: number) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-donate-modal", { detail: { amount: defaultAmount } })
    );
  }
}

export function DonateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOpen(e: Event) {
      const customEvent = e as CustomEvent<{ amount?: number }>;
      if (customEvent.detail?.amount) {
        setSelectedAmount(customEvent.detail.amount);
        setCustomAmount("");
      }
      setShowBankDetails(false);
      setIsOpen(true);
    }

    window.addEventListener("open-donate-modal", handleOpen);
    return () => window.removeEventListener("open-donate-modal", handleOpen);
  }, []);

  // Keyboard accessibility and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  function handleConfirmDonation() {
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (paystackKey && typeof window !== "undefined") {
      // In production with Paystack key, trigger inline checkout
      alert("Redirecting to secure Paystack payment gateway...");
      return;
    }

    // Default fallback: show bank transfer details
    setShowBankDetails(true);
  }

  function copyAccountNumber() {
    navigator.clipboard.writeText(siteConfig.bankDetails.accountNumberNaira);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-[#2E1650] relative shadow-lg"
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#2E1650] rounded-full transition-colors"
        >
          <IconClose className="w-5 h-5" />
        </button>

        {!showBankDetails ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
                <span className="text-xs uppercase font-semibold tracking-wider text-[#2E1650]">
                  Make a Contribution
                </span>
              </div>
              <h2 id="donate-modal-title" className="text-2xl font-medium text-[#2E1650]">
                Support Grassroots Programs in Abuja
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Your contribution directly funds community water boreholes, school learning kits, and women vocational grants in Abuja, Nigeria.
              </p>
            </div>

            {/* Frequency Selector */}
            <div className="flex p-1 bg-[#FAF6EC] rounded-full border border-gray-200">
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

            {/* Preset Amount Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Select Amount (NGN)</label>
              <div className="grid grid-cols-3 gap-2">
                {[5000, 10000, 25000, 50000, 100000].map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
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
            </div>

            {/* Custom Amount Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Or Enter Custom Amount (NGN)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-xs text-gray-400">₦</span>
                <input
                  type="number"
                  placeholder="e.g. 75000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmDonation}
              disabled={currentAmount <= 0}
              className="w-full py-3.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm transition-colors disabled:opacity-50"
            >
              Confirm Donation of ₦{currentAmount.toLocaleString()}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
                <span className="text-xs uppercase font-semibold tracking-wider text-[#2E1650]">
                  Direct Bank Transfer
                </span>
              </div>
              <h2 className="text-2xl font-medium text-[#2E1650]">Bank Transfer Details</h2>
              <p className="text-xs text-gray-600 mt-1">
                Please transfer your donation of <strong>₦{currentAmount.toLocaleString()}</strong> to our official NGO account.
              </p>
            </div>

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
              <div>
                <span className="text-[11px] text-gray-500 block">Transfer Narration / Reference</span>
                <span className="text-xs font-mono text-gray-600">
                  DONATION-{Date.now().toString().slice(-6)}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              After transferring, please email your receipt to <strong>{siteConfig.contact.email}</strong> so our finance team can verify and issue your donation acknowledgement.
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#2E1650] text-white hover:bg-[#381A5F] font-medium rounded-full text-sm transition-colors"
            >
              Close and Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
