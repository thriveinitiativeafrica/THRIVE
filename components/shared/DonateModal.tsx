"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import {
  IconClose,
  IconCheck,
  IconCopy,
  IconCreditCard,
  IconLandmark,
} from "@/components/shared/Icons";
import { cn, formatCurrency } from "@/lib/utils";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
}

export function DonateModal({
  isOpen,
  onClose,
  initialAmount = 15000,
}: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"online" | "transfer">("online");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  if (!isOpen) return null;

  const currentTiers = siteConfig.donationTiers;
  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleDonateProceed = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you ${donorName || "generous donor"}! Initializing contribution of ${formatCurrency(
        effectiveAmount,
        "NGN"
      )} (${frequency}). In production, this directs to Paystack / Flutterwave.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden border border-thrive-border shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-thrive-purple-900 text-white px-6 py-5 flex items-center justify-between border-b border-thrive-purple-800">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Make a Donation</h3>
            <p className="text-xs text-thrive-gold-200">Direct grassroots impact in Nigerian communities</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <IconClose size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Frequency Selector */}
          <div className="grid grid-cols-2 p-1 bg-thrive-cream rounded-2xl border border-thrive-border">
            <button
              type="button"
              onClick={() => setFrequency("one-time")}
              className={cn(
                "py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center",
                frequency === "one-time" ? "bg-white text-thrive-purple-900 shadow-xs" : "text-thrive-ink-600 hover:text-thrive-purple-900"
              )}
            >
              One-Time Gift
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={cn(
                "py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center",
                frequency === "monthly" ? "bg-white text-thrive-purple-900 shadow-xs" : "text-thrive-ink-600 hover:text-thrive-purple-900"
              )}
            >
              Monthly Supporter
            </button>
          </div>

          {/* Payment Method Tabs */}
          <div className="flex border-b border-thrive-border">
            <button
              onClick={() => setActiveTab("online")}
              className={cn(
                "flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                activeTab === "online"
                  ? "border-thrive-purple-900 text-thrive-purple-900"
                  : "border-transparent text-thrive-ink-600 hover:text-thrive-purple-900"
              )}
            >
              <IconCreditCard size={16} />
              <span>Card / Paystack</span>
            </button>
            <button
              onClick={() => setActiveTab("transfer")}
              className={cn(
                "flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                activeTab === "transfer"
                  ? "border-thrive-purple-900 text-thrive-purple-900"
                  : "border-transparent text-thrive-ink-600 hover:text-thrive-purple-900"
              )}
            >
              <IconLandmark size={16} />
              <span>Direct Bank Transfer</span>
            </button>
          </div>

          {activeTab === "online" ? (
            <form onSubmit={handleDonateProceed} className="space-y-4">
              {/* Preset Amounts Grid */}
              <div className="grid grid-cols-3 gap-2">
                {currentTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      setIsCustom(false);
                    }}
                    className={cn(
                      "py-2.5 px-2 rounded-xl border text-center font-bold text-xs transition-all",
                      !isCustom && selectedAmount === tier.amount
                        ? "border-thrive-purple-900 bg-thrive-purple-900 text-white shadow-xs"
                        : "border-thrive-border bg-white text-thrive-ink-800 hover:bg-thrive-cream"
                    )}
                  >
                    <span>{tier.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-bold text-thrive-purple-900 whitespace-nowrap">Or Custom (₦):</label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-thrive-ink-400">₦</span>
                  <input
                    type="number"
                    min="500"
                    placeholder="e.g. 25000"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    onFocus={() => setIsCustom(true)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-thrive-border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-thrive-purple-500"
                  />
                </div>
              </div>

              {/* Allocation Note */}
              <div className="p-3.5 rounded-xl bg-thrive-cream border border-thrive-border text-xs text-thrive-ink-800">
                <span className="font-bold text-thrive-purple-900">Program Allocation: </span>
                {currentTiers.find((t) => t.amount === selectedAmount)?.impact ||
                  "Directly funds food relief, schooling kits, and clean water boreholes in Nigeria."}
              </div>

              {/* Donor Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Amina Bello"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="amina@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA - Solid gold Donate primary action without arrows */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Proceed with {formatCurrency(effectiveAmount, "NGN")} Donation
              </button>
            </form>
          ) : (
            /* Bank Transfer Info */
            <div className="space-y-4">
              <p className="text-xs text-thrive-ink-600 leading-relaxed">
                Direct wire transfer from your banking mobile app or USSD:
              </p>

              <div className="p-5 rounded-2xl bg-thrive-purple-900 text-white space-y-3 border border-thrive-purple-800">
                <div className="flex justify-between items-center text-xs text-thrive-purple-100/80 border-b border-white/10 pb-2">
                  <span>Bank Name</span>
                  <span className="font-bold text-white">{siteConfig.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-thrive-purple-100/80 border-b border-white/10 pb-2">
                  <span>Account Name</span>
                  <span className="font-bold text-white text-right">{siteConfig.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-thrive-purple-100/80">
                  <span>Naira (₦) Account No.</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-thrive-gold-400">
                      {siteConfig.bankDetails.accountNumberNaira}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(siteConfig.bankDetails.accountNumberNaira)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Copy account number"
                    >
                      {copiedBank ? <IconCheck size={16} className="text-emerald-400" /> : <IconCopy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-thrive-ink-600 italic">
                * Send transfer notification or receipt to <strong>{siteConfig.contact.email}</strong> for your tax deduction certificate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
