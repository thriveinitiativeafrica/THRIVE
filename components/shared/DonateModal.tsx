"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import { X, Check, Copy, ArrowRight, CreditCard, Landmark } from "lucide-react";
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
      `Thank you ${donorName || "generous donor"}! Redirecting to secure payment processor for ${formatCurrency(
        effectiveAmount,
        "NGN"
      )} (${frequency}). In production, this connects to Paystack / Flutterwave.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">
        {/* Minimalist Header */}
        <div className="bg-thrive-purple-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">Make a Donation</h3>
            <p className="text-xs text-thrive-purple-100/70">Support community programs across Nigeria</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Frequency Selector */}
          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setFrequency("one-time")}
              className={cn(
                "py-2 rounded-lg text-xs font-semibold transition-all text-center",
                frequency === "one-time" ? "bg-white text-thrive-purple-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
              )}
            >
              One-Time Gift
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={cn(
                "py-2 rounded-lg text-xs font-semibold transition-all text-center",
                frequency === "monthly" ? "bg-white text-thrive-purple-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Monthly Supporter
            </button>
          </div>

          {/* Payment Method Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("online")}
              className={cn(
                "flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all",
                activeTab === "online"
                  ? "border-thrive-purple-900 text-thrive-purple-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              )}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Card / Paystack</span>
            </button>
            <button
              onClick={() => setActiveTab("transfer")}
              className={cn(
                "flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all",
                activeTab === "transfer"
                  ? "border-thrive-purple-900 text-thrive-purple-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              )}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Bank Transfer</span>
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
                        ? "border-thrive-purple-900 bg-thrive-purple-900 text-white"
                        : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                    )}
                  >
                    <span>{tier.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-medium text-gray-600 whitespace-nowrap">Or Custom (₦):</label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₦</span>
                  <input
                    type="number"
                    min="500"
                    placeholder="e.g. 20000"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    onFocus={() => setIsCustom(true)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-thrive-purple-900"
                  />
                </div>
              </div>

              {/* Impact Note (Clean neutral, no yellow) */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700">
                <span className="font-semibold text-gray-900">Allocation: </span>
                {currentTiers.find((t) => t.amount === selectedAmount)?.impact ||
                  "Directly funds food relief, schooling kits, and clean water initiatives in Nigeria."}
              </div>

              {/* Donor Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Full Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Amina Bello"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-thrive-purple-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="amina@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-thrive-purple-900"
                  />
                </div>
              </div>

              {/* Submit CTA (Clean Solid Purple) */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed with {formatCurrency(effectiveAmount, "NGN")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            /* Bank Transfer Info */
            <div className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Transfer directly from your banking app to our official account:
              </p>

              <div className="p-4 rounded-xl bg-thrive-purple-900 text-white space-y-3">
                <div className="flex justify-between items-center text-xs text-thrive-purple-100/70 border-b border-white/10 pb-2">
                  <span>Bank Name</span>
                  <span className="font-semibold text-white">{siteConfig.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-thrive-purple-100/70 border-b border-white/10 pb-2">
                  <span>Account Name</span>
                  <span className="font-semibold text-white text-right">{siteConfig.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-thrive-purple-100/70">
                  <span>Naira (₦) Account No.</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-thrive-gold-400">
                      {siteConfig.bankDetails.accountNumberNaira}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(siteConfig.bankDetails.accountNumberNaira)}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Copy account number"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 italic">
                * Email confirmations to <strong>{siteConfig.contact.email}</strong> for your formal donor receipt.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
