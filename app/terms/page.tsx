import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of the THRIVE Initiative website and digital platforms.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-medium text-[#2E1650]">Terms of Service</h1>
        <p className="text-xs text-gray-500">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 space-y-6 text-sm text-gray-700 leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using this website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please discontinue using the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">2. Intellectual Property and Content</h2>
          <p>
            All original text, images, logos, and materials published on this website are the property of THRIVE Initiative Africa or its licensors. Content may be shared for educational or non-profit purposes with appropriate attribution to THRIVE Initiative.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">3. Donations and Fund Stewardship</h2>
          <p>
            Donations made to THRIVE Initiative are deployed toward verified community programs in clean water, education, and vocational training across Nigeria. All contributions are final, and receipts or acknowledgements are issued upon verification of bank transfer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">4. Limitation of Liability</h2>
          <p>
            While we strive for accurate, up-to-date information regarding our initiatives, THRIVE Initiative makes no warranties regarding uninterrupted availability or total absence of technical errors on this digital platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[#2E1650]">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
          </p>
        </section>
      </div>
    </div>
  );
}
