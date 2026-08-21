"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";

export default function PartnerPage() {
  const [partnerData, setPartnerData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    orgType: "Corporate CSR",
    proposedArea: "Clean Water & Infrastructure",
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
        body: JSON.stringify({
          name: `${partnerData.contactName} (${partnerData.orgName})`,
          email: partnerData.email,
          subject: `Partnership Inquiry: ${partnerData.orgType} - ${partnerData.proposedArea}`,
          message: partnerData.message,
          category: "Partnership",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const partnerTracks = [
    {
      title: "Corporate Social Responsibility (CSR)",
      desc: "Align your brand with high-impact Nigerian community programs with verifiable ESG reporting metrics.",
    },
    {
      title: "Academic & Research Collaborations",
      desc: "Partner with our team on grassroots baseline surveys, literacy research, and social impact data.",
    },
    {
      title: "Institutional Grants & Foundations",
      desc: "Co-finance scalable interventions in women's vocational seed funding and rural solar water infrastructure.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Partner for <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Sustainable Progress
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            We work with forward-thinking corporations, agencies, schools, and foundations to design and execute high-yield community programs in Nigeria.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Why Partner (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl font-bold text-thrive-purple-900">
                Strategic, Measurable, and Transparent Collaboration
              </h2>
              <p className="text-sm text-thrive-ink-600 leading-relaxed">
                THRIVE brings rigorous on-ground project execution and transparent fund stewardship to every alliance.
              </p>

              <div className="space-y-4 pt-2">
                {partnerTracks.map((trk) => (
                  <div
                    key={trk.title}
                    className="p-4 rounded-2xl bg-thrive-cream border border-gray-200 space-y-1 hover:border-thrive-purple-900 transition-colors"
                  >
                    <h3 className="font-serif text-base font-bold text-thrive-purple-900">
                      {trk.title}
                    </h3>
                    <p className="text-xs text-thrive-ink-600 leading-relaxed">{trk.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3 text-xs text-thrive-purple-900 font-semibold">
                <ShieldCheck className="w-5 h-5 text-thrive-purple-900 shrink-0" />
                <span>Full compliance auditing & customized impact reporting provided for every institutional partnership.</span>
              </div>
            </div>

            {/* Right Column: Partnership Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-thrive-purple-900 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                    Partnership Inquiry Received
                  </h3>
                  <p className="text-sm text-thrive-ink-600 max-w-md mx-auto">
                    Thank you, <strong>{partnerData.contactName}</strong> from <strong>{partnerData.orgName}</strong>. Our team will connect with you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 border-b border-gray-200 pb-3">
                    <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                      Initiate an Institutional Partnership
                    </h3>
                    <p className="text-xs text-thrive-ink-600">
                      Share your organization details and proposed areas of collaboration in Nigeria.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Organization / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Apex Financial Group"
                        value={partnerData.orgName}
                        onChange={(e) => setPartnerData({ ...partnerData, orgName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Dr. Funke Adeleke"
                        value={partnerData.contactName}
                        onChange={(e) => setPartnerData({ ...partnerData, contactName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="partnerships@apex.com"
                        value={partnerData.email}
                        onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                        Organization Type
                      </label>
                      <select
                        value={partnerData.orgType}
                        onChange={(e) => setPartnerData({ ...partnerData, orgType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                      >
                        <option value="Corporate CSR">Corporate / Private Enterprise (CSR)</option>
                        <option value="Philanthropic Foundation">Philanthropic Foundation / Trust</option>
                        <option value="International NGO">International NGO / Development Agency</option>
                        <option value="Academic Institution">University / Research Institution</option>
                        <option value="Government Agency">Government Ministry / MDA</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                      Primary Area of Interest
                    </label>
                    <select
                      value={partnerData.proposedArea}
                      onChange={(e) => setPartnerData({ ...partnerData, proposedArea: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                    >
                      <option value="Women Empowerment">Women Empowerment & Micro-Grants</option>
                      <option value="Child Education">Child Scholastic Kits & School Sponsorships</option>
                      <option value="Clean Water & Infrastructure">Clean Water Boreholes & Infrastructure</option>
                      <option value="Vocational Skills">Youth Vocational & Digital Bootcamps</option>
                      <option value="Community Health">Mobile Community Health Clinics</option>
                      <option value="Multi-Sector Alliance">Comprehensive Multi-Sector Alliance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                      Partnership Scope & Overview *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your proposed collaboration, target timeline, or geographic focus in Nigeria..."
                      value={partnerData.message}
                      onChange={(e) => setPartnerData({ ...partnerData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-thrive-purple-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    <span>{loading ? "Sending..." : "Submit Partnership Proposal"}</span>
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
