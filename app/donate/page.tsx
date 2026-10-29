"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import {
  IconCheck,
  IconCopy,
  IconHelp,
  IconLandmark,
  IconCreditCard,
} from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { cn, formatCurrency } from "@/lib/utils";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(15000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [copiedBank, setCopiedBank] = useState(false);
  const [activeTab, setActiveTab] = useState<"gateway" | "bank">("gateway");

  const currentTiers = siteConfig.donationTiers;
  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleProceed = (gateway: string) => {
    alert(
      `Redirecting to secure ${gateway} gateway for ${formatCurrency(effectiveAmount, "NGN")} (${frequency}). In production, this integrates directly with Paystack / Flutterwave.`
    );
  };

  const faqs = [
    {
      q: "How are my donation funds allocated in Nigeria?",
      a: "88% of all funds directly finance frontline program execution (scholastic kits, solar clean water boreholes, vocational toolkits, nutritious food parcels), 8% goes to monitoring & evaluation, and 4% to essential administration.",
    },
    {
      q: "Is my contribution acknowledged officially?",
      a: "Yes. THRIVE Initiative is a registered nonprofit entity. We issue official digital donation receipts and annual tax acknowledgment certificates upon request.",
    },
    {
      q: "Can I sponsor a specific community borehole or school project directly?",
      a: "Yes. For targeted community borehole sponsorships or school scholarships, please contact our directorate at contact@thriveinitiative.org.",
    },
  ];

  return (
    <div className="space-y-0 min-h-screen">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span>Grassroots Accountability</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Invest in Human <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Dignity &amp; Potential
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Your contribution directly funds clean water boreholes, school enrollment kits, and emergency nutrition across vulnerable Nigerian settlements.
          </p>
        </div>
      </section>

      {/* Main Donation Portal */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Giving Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-thrive-border shadow-lg space-y-6">
              {/* Frequency Switcher */}
              <div className="flex items-center justify-between p-1 bg-thrive-cream rounded-2xl border border-thrive-border">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                    frequency === "one-time"
                      ? "bg-thrive-purple-900 text-white shadow-xs"
                      : "text-thrive-ink-600 hover:text-thrive-purple-900"
                  )}
                >
                  One-Time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                    frequency === "monthly"
                      ? "bg-thrive-purple-900 text-white shadow-xs"
                      : "text-thrive-ink-600 hover:text-thrive-purple-900"
                  )}
                >
                  Monthly Partner
                </button>
              </div>

              {/* Payment Mode Tabs */}
              <div className="flex border-b border-thrive-border">
                <button
                  type="button"
                  onClick={() => setActiveTab("gateway")}
                  className={cn(
                    "flex items-center gap-2 pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                    activeTab === "gateway"
                      ? "border-thrive-purple-900 text-thrive-purple-900"
                      : "border-transparent text-thrive-ink-600 hover:text-thrive-purple-900"
                  )}
                >
                  <IconCreditCard size={16} />
                  Debit Card / Paystack
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("bank")}
                  className={cn(
                    "flex items-center gap-2 pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                    activeTab === "bank"
                      ? "border-thrive-purple-900 text-thrive-purple-900"
                      : "border-transparent text-thrive-ink-600 hover:text-thrive-purple-900"
                  )}
                >
                  <IconLandmark size={16} />
                  Direct Bank Transfer
                </button>
              </div>

              {activeTab === "gateway" ? (
                <div className="space-y-5">
                  {/* Tiers Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {currentTiers.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setIsCustom(false);
                        }}
                        className={cn(
                          "p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between shadow-2xs",
                          !isCustom && selectedAmount === tier.amount
                            ? "border-thrive-purple-900 bg-thrive-purple-900 text-white"
                            : "border-thrive-border bg-white text-thrive-ink-800 hover:bg-thrive-cream"
                        )}
                      >
                        <div
                          className={cn(
                            "font-serif text-base font-bold",
                            !isCustom && selectedAmount === tier.amount ? "text-white" : "text-thrive-purple-900"
                          )}
                        >
                          {tier.label}
                        </div>
                        <div
                          className={cn(
                            "text-[10px] line-clamp-2 mt-1",
                            !isCustom && selectedAmount === tier.amount ? "text-thrive-purple-100" : "text-thrive-ink-600"
                          )}
                        >
                          {tier.impact}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-thrive-purple-900 whitespace-nowrap">
                      Custom Amount (₦):
                    </label>
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-thrive-ink-400">
                        ₦
                      </span>
                      <input
                        type="number"
                        min="500"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setIsCustom(true);
                        }}
                        onFocus={() => setIsCustom(true)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-thrive-border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-thrive-purple-500"
                      />
                    </div>
                  </div>

                  {/* Impact Statement */}
                  <div className="p-4 rounded-2xl bg-thrive-cream border border-thrive-border text-xs text-thrive-ink-800 space-y-1">
                    <div className="font-bold text-thrive-purple-900">
                      Your Contribution Allocation:
                    </div>
                    <p className="leading-relaxed">
                      {currentTiers.find((t) => t.amount === selectedAmount)?.impact ||
                        "Deploys vital food supplies, scholarships, and clean water to Nigerian communities in need."}
                    </p>
                  </div>

                  {/* Submit CTA - Solid gold button without arrows */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleProceed("Paystack / Flutterwave")}
                      className="w-full py-4 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                    >
                      Proceed to Donate {formatCurrency(effectiveAmount, "NGN")}
                    </button>
                  </div>
                </div>
              ) : (
                /* Direct Bank Transfer */
                <div className="space-y-5">
                  <p className="text-xs text-thrive-ink-600 leading-relaxed">
                    Make direct wire or internet banking transfers into our registered account:
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

                  <div className="p-4 rounded-2xl bg-thrive-cream border border-thrive-border text-xs text-thrive-ink-800 leading-relaxed">
                    Please email transfer confirmations to <strong>{siteConfig.contact.email}</strong> to receive your formal donor receipt.
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Fund Accountability (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-thrive-purple-900 text-white rounded-3xl p-8 border border-thrive-purple-700 space-y-4 shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-wider text-thrive-gold-400">
                  Financial Integrity
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  How Every Donation is Allocated
                </h3>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Direct Program Execution</span>
                      <span className="text-thrive-gold-400 font-mono">88%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-thrive-gold-500 rounded-full" style={{ width: "88%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Monitoring &amp; Evaluation (MEL)</span>
                      <span className="text-white font-mono">8%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-white/60 rounded-full" style={{ width: "8%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Operational &amp; Administration</span>
                      <span className="text-thrive-purple-300 font-mono">4%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-thrive-purple-300 rounded-full" style={{ width: "4%" }} />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-thrive-purple-100/75 leading-relaxed pt-2">
                  Audited annually under the supervision of the Finance &amp; Resource Management team.
                </p>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border space-y-4 shadow-xs">
                <h4 className="font-serif text-xl font-bold text-thrive-purple-900 flex items-center gap-2">
                  <IconHelp size={20} className="text-thrive-purple-900" />
                  <span>Donation Questions</span>
                </h4>

                <div className="space-y-4 divide-y divide-thrive-border">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className={idx > 0 ? "pt-3.5" : ""}>
                      <div className="text-xs font-bold text-thrive-purple-900">{faq.q}</div>
                      <div className="text-xs text-thrive-ink-600 mt-1 leading-relaxed">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
