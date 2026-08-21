import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Terms of Service | THRIVE Initiative",
  description: "Terms and conditions governing the use of THRIVE Initiative services and donations in Nigeria.",
};

export default function TermsPage() {
  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-thrive-purple-100/70 font-normal">
            Last Updated: January 2025 • {siteConfig.name}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-purple max-w-none text-thrive-ink-800 space-y-8 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-thrive-ink-600">
                By accessing and using this website, donating, or participating in THRIVE volunteer operations, you agree to comply with and be bound by these terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">2. Donations & Financial Stewardship</h2>
              <p className="text-thrive-ink-600">
                All donations are voluntary and non-refundable unless processed in error. THRIVE Initiative commits to allocating at least 88% of received funds directly toward frontline program execution in Nigeria.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">3. Volunteer Conduct & Safety</h2>
              <p className="text-thrive-ink-600">
                Volunteers registered with THRIVE agree to uphold our child protection guidelines, code of ethics, and community respect protocols during all field activities.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">4. Governance & Legal Jurisdiction</h2>
              <p className="text-thrive-ink-600">
                These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. For questions, contact <Link href="mailto:legal@thriveinitiative.org" className="text-thrive-purple-900 underline font-semibold">legal@thriveinitiative.org</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
