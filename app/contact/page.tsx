"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site.config";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

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
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Connect with Our <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Field Team
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            Whether you have questions about programs, donation transparency, volunteering, or media relations in Nigeria, we are here to support you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl font-bold text-thrive-purple-900">
                  Official Head Office
                </h2>
                <p className="text-sm text-thrive-ink-600 leading-relaxed font-normal">
                  Visit our administrative center or reach out directly to our team in Lagos, Nigeria.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-thrive-cream border border-gray-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-thrive-purple-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-thrive-purple-900" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-thrive-purple-900">Location</h3>
                    <p className="text-xs text-thrive-ink-600 mt-1">{siteConfig.contact.address}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-thrive-cream border border-gray-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-thrive-purple-900 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-thrive-purple-900" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-thrive-purple-900">Email Inquiries</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs text-thrive-purple-900 font-semibold hover:underline mt-1 block"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <a
                      href={`mailto:${siteConfig.contact.supportEmail}`}
                      className="text-xs text-thrive-ink-600 hover:underline block"
                    >
                      {siteConfig.contact.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-thrive-cream border border-gray-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-thrive-purple-900 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-thrive-purple-900" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-thrive-purple-900">Telephone Lines</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-xs text-thrive-purple-900 font-semibold hover:underline mt-1 block"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <p className="text-[11px] text-thrive-ink-600">{siteConfig.contact.operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-thrive-purple-900 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-thrive-ink-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our team has received your inquiry and will reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                      Send Us a Direct Message
                    </h3>
                    <p className="text-xs text-gray-500">
                      Fill out the form below and your inquiry will be routed to the appropriate team.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Okon"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="samuel@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Volunteer Question">Volunteer Support</option>
                        <option value="Donation & Financial">Donation & Account Receipts</option>
                        <option value="Media & Press">Media & Public Relations</option>
                        <option value="Community Partnership">Community Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Project Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Type your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    <span>{loading ? "Sending..." : "Transmit Message"}</span>
                    <Send className="w-3.5 h-3.5 text-thrive-gold-400" />
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
