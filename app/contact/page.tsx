"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import { IconCheck } from "@/components/shared/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError("Unable to submit message right now. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please try again or reach out by phone.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 pb-24">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Contact & Location
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          Get in touch with our team in Abuja
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          Reach out with questions about our community programs, donations, or volunteering opportunities across Abuja.
        </p>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200/90 space-y-6">
              <h2 className="text-xl font-medium text-[#2E1650]">Head Office</h2>
              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Physical Address</span>
                  <span className="text-[#2E1650] font-medium">{siteConfig.contact.address}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Telephone</span>
                  <span className="text-[#2E1650] font-medium">{siteConfig.contact.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Official Email</span>
                  <span className="text-[#2E1650] font-medium">{siteConfig.contact.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Office Hours</span>
                  <span className="text-[#2E1650] font-medium">{siteConfig.contact.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* Partner With Us Paragraph */}
            <div className="bg-[#FAF6EC] rounded-3xl p-8 border border-gray-200 space-y-3">
              <h2 className="text-xl font-medium text-[#2E1650]">Partner with us</h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                We work with corporate social responsibility (CSR) programs, institutional foundations, and research groups to implement high-yield community infrastructure in Nigeria. To propose an alliance, sponsor a borehole installation, or review our project accountability frameworks, please email <strong>{siteConfig.contact.email}</strong> or use the form on this page with your organization details.
              </p>
            </div>
          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-6">
            <h2 className="text-2xl font-medium text-[#2E1650]">Send a Message</h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-green-900 space-y-2">
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-700" />
                  <span className="font-semibold text-sm">Message received</span>
                </div>
                <p className="text-xs text-green-800 leading-relaxed">
                  Thank you for contacting THRIVE Initiative. A member of our community team will review your message and reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="babatunde@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Clean water project inquiry or partnership proposal"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Share your inquiry, question, or proposal details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                  />
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
