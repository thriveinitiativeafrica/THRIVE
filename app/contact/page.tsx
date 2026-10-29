"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site.config";
import { IconCheck } from "@/components/shared/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function fetchCaptcha() {
    setLoadingCaptcha(true);
    try {
      const res = await fetch("/api/contact/captcha");
      const data = await res.json();
      if (data.question && data.token) {
        setCaptchaQuestion(data.question);
        setCaptchaToken(data.token);
        setCaptchaAnswer("");
      }
    } catch {
      setCaptchaQuestion("What is 5 + 3 ?");
    } finally {
      setLoadingCaptcha(false);
    }
  }

  useEffect(() => {
    fetchCaptcha();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaAnswer.trim()) {
      setError("Please answer the security math question below.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captchaAnswer,
          captchaToken,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setCaptchaAnswer("");
      } else {
        setError(data.error || "Unable to submit message right now. Please try again.");
        fetchCaptcha();
      }
    } catch {
      setError("Network error. Please try again or reach out by email.");
      fetchCaptcha();
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
            Contact &amp; Connect
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          Get in touch with THRIVE Initiative
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          Connect with our team regarding community partnerships, program alliances, sponsorships, or volunteering initiatives across Africa.
        </p>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200/90 space-y-6">
              <h2 className="text-xl font-medium text-[#2E1650]">Headquarters &amp; Office</h2>
              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Physical Coordination Base</span>
                  <span className="text-[#2E1650] font-medium">{siteConfig.contact.address}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Telephone</span>
                  <span className="text-[#2E1650] font-medium">
                    {siteConfig.contact.phone} • {siteConfig.contact.altPhone}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Official Email</span>
                  <span className="text-[#2E1650] font-medium">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#D4A017] transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">Office Hours</span>
                  <span className="text-[#2E1650] font-medium">{siteConfig.contact.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* Partner With Us Block */}
            <div className="bg-[#FAF6EC] rounded-3xl p-8 border border-gray-200 space-y-3">
              <h2 className="text-xl font-medium text-[#2E1650]">Partner with us across Africa</h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                We collaborate with corporate social responsibility (CSR) initiatives, institutional foundations, and grassroots development groups to implement sustainable community programs. To propose an alliance, sponsor an outreach project, or review our accountability frameworks, please email <strong>{siteConfig.contact.email}</strong> or use this contact form.
              </p>
            </div>

            {/* Volunteer Application Card */}
            <div className="bg-[#2E1650] text-white rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4A017]">
                  Volunteer Application
                </span>
              </div>
              <h2 className="text-xl font-medium text-white">Join the THRIVE Volunteer Movement</h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                Want to mentor youth, support women empowerment, or participate in grassroots field missions across Africa? Submit your application directly through our official volunteer form.
              </p>
              <div className="pt-1">
                <a
                  href="https://forms.gle/nPNYHSViBTPUryRB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A017] hover:bg-[#b88912] text-[#2E1650] text-xs font-semibold transition-colors"
                >
                  <span>Open Volunteer Application Form</span>
                  <span>→</span>
                </a>
              </div>
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
                  Thank you for contacting THRIVE Initiative. A member of our coordination team will review your message and reply promptly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      fetchCaptcha();
                    }}
                    className="text-xs font-semibold text-[#2E1650] underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
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
                    placeholder="e.g. Partnership proposal, volunteer inquiry, or project sponsorship"
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
                    placeholder="Share your inquiry, proposal, or questions with our team..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                  />
                </div>

                {/* Math Security Challenge (Bot Protection) */}
                <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#2E1650]">
                      Security Check *{" "}
                      <span className="font-normal text-gray-500">(To verify you are human)</span>
                    </label>
                    <button
                      type="button"
                      onClick={fetchCaptcha}
                      disabled={loadingCaptcha}
                      className="text-[11px] text-[#2E1650] hover:text-[#D4A017] underline transition-colors cursor-pointer"
                    >
                      {loadingCaptcha ? "Refreshing..." : "New problem"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="px-4 py-2 bg-white rounded-xl border border-gray-300 font-semibold text-sm text-[#2E1650] select-none tracking-wide">
                      {captchaQuestion || "What is 4 + 3 ?"}
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Your answer"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="w-full sm:w-36 px-4 py-2 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#2E1650]"
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-semibold rounded-full text-sm transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Sending Message..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
