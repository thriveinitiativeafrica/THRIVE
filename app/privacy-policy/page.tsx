import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy | THRIVE Initiative",
  description: "Privacy policy and data governance practices of THRIVE Initiative in Nigeria.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-thrive-purple-100/70 font-normal">
            Last Updated: January 2025 • {siteConfig.name}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-purple max-w-none text-thrive-ink-800 space-y-8 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">1. Information We Collect</h2>
              <p className="text-thrive-ink-600">
                THRIVE Initiative collects information when you visit our website, make a donation, register as a volunteer, or contact us. This includes your name, email address, phone number, and transaction records.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">2. How We Use Your Data</h2>
              <p className="text-thrive-ink-600">
                Your data is exclusively used to process donations, send impact updates, coordinate volunteer field missions, and fulfill Nigerian regulatory reporting requirements. We do not sell or rent your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">3. Financial Information & Security</h2>
              <p className="text-thrive-ink-600">
                All online payments are securely processed through regulated third-party payment gateways (Paystack / Flutterwave). We never store raw debit card numbers or CVVs on our servers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-3">4. Contact & Inquiries</h2>
              <p className="text-thrive-ink-600">
                If you have questions regarding our privacy practices, please contact us at <Link href="mailto:privacy@thriveinitiative.org" className="text-thrive-purple-900 underline font-semibold">privacy@thriveinitiative.org</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
