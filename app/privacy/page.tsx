import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data governance practices of THRIVE Initiative in Nigeria.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-medium text-[#2E1650]">Privacy Policy</h1>
        <p className="text-xs text-gray-500">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 space-y-6 text-sm text-gray-700 leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">1. Introduction</h2>
          <p>
            THRIVE Initiative respects your privacy and is committed to protecting your personal data. This privacy statement explains how we collect, use, and safeguard personal information submitted through our website and operational communications in accordance with the Nigeria Data Protection Act (NDPA).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide when contacting us, subscribing to our email newsletter, submitting a volunteer application, or making a donation. This may include your full name, email address, telephone number, and messages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">3. How We Use Information</h2>
          <p>
            Information collected is used strictly for non-commercial purposes, including responding to inquiries, coordinating community volunteer outreaches, sending project milestone reports, and maintaining donor accounting records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">4. Data Protection and Retention</h2>
          <p>
            We implement appropriate technical security measures to prevent unauthorized disclosure or loss of personal data. We do not sell, rent, or lease donor or volunteer information to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">5. Contact Regarding Your Data</h2>
          <p>
            To request review, correction, or deletion of your personal data, please contact our data coordinator at <strong>contact@thriveinitiativeafrica.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
