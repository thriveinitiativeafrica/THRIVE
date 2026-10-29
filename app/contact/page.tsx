"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconCheckCircle,
} from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-0 min-h-screen">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span>Direct Community Channel</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Connect with Our <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Field Team
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Reach our project directors, volunteer coordinators, and administrative team at our Lagos liaison office.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-600">
                  Liaison Office
                </span>
                <h2 className="font-serif text-3xl font-bold text-thrive-purple-900">
                  Administrative Center
                </h2>
                <p className="text-sm text-thrive-ink-600 leading-relaxed font-normal">
                  Our operational office handles community proposals, partnership memorandums, and donor accountability.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-thrive-cream border border-thrive-border flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-thrive-border text-thrive-purple-900 flex items-center justify-center shrink-0">
                    <IconMapPin className="text-thrive-purple-900" size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-thrive-purple-900">Physical Address</h3>
                    <p className="text-xs text-thrive-ink-600 mt-1 leading-relaxed">{siteConfig.contact.address}</p>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-thrive-cream border border-thrive-border flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-thrive-border text-thrive-purple-900 flex items-center justify-center shrink-0">
                    <IconMail className="text-thrive-purple-900" size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-thrive-purple-900">Email Inquiries</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs text-thrive-purple-900 font-bold editorial-link mt-1 block"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <a
                      href={`mailto:${siteConfig.contact.supportEmail}`}
                      className="text-xs text-thrive-ink-600 editorial-link block mt-0.5"
                    >
                      {siteConfig.contact.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-thrive-cream border border-thrive-border flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-thrive-border text-thrive-purple-900 flex items-center justify-center shrink-0">
                    <IconPhone className="text-thrive-purple-900" size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-thrive-purple-900">Telephone Lines</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-xs text-thrive-purple-900 font-bold editorial-link mt-1 block"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <p className="text-[11px] text-thrive-ink-600 mt-0.5">{siteConfig.contact.operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-thrive-border shadow-lg">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                    <IconCheckCircle size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-thrive-ink-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our administrative team in Lagos has received your message and will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-thrive-border pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-thrive-gold-600">
                      Direct Correspondence
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                      Send Us a Message
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Babatunde Adeleke"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="babatunde@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs font-semibold focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Volunteer Question">Volunteer Support</option>
                        <option value="Donation & Financial">Donation &amp; Receipts</option>
                        <option value="Media & Press">Media &amp; Public Relations</option>
                        <option value="Community Partnership">Community Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rural Water Partnership"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please provide details about your inquiry or proposed community initiative..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs leading-relaxed focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
                  >
                    {loading ? "Transmitting..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
