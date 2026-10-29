"use client";

import React, { useState } from "react";
import { IconCheckCircle } from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function VolunteerCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    availability: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          areaOfInterest: "General Field Volunteer",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-thrive-cream border-t border-thrive-border">
      {/* ProofDeck-style Background Atmosphere */}
      <SectionBackground variant="cream" pattern="floating-elements" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-thrive-border shadow-xl">
          {/* Left Panel: Deep Brand Purple */}
          <div className="bg-thrive-purple-900 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <SectionBackground variant="purple" pattern="concentric-arcs" />

            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-400">
                Community Network
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white leading-[1.1]">
                Be Part of <br />
                the <span className="italic font-normal font-serif text-thrive-gold-400">Change</span>
              </h2>

              <p className="text-sm text-thrive-purple-100/85 leading-relaxed font-normal">
                Our active field volunteers lead weekend reading tutoring, distribute nutrition parcels, and coordinate community clean water borehole maintenance across Lagos and Ogun communities.
              </p>

              <div className="pt-2 space-y-2 text-xs text-thrive-purple-100/90 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-thrive-gold-400" />
                  <span>Flexible commitments (weekend or project-based)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-thrive-gold-400" />
                  <span>Certified community service verification</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <a
                href="#volunteer-signup-form"
                className="inline-block px-7 py-3 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                Sign Up as a Volunteer
              </a>
            </div>
          </div>

          {/* Right Panel: Clean White Signup Form */}
          <div id="volunteer-signup-form" className="p-8 sm:p-10 bg-white flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                  <IconCheckCircle size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
                  Welcome to the Network!
                </h3>
                <p className="text-xs text-thrive-ink-600 leading-relaxed">
                  Thank you for stepping forward. Our volunteer coordinator will reach out to you with upcoming outreach schedules.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-thrive-purple-900">
                    Volunteer Application
                  </h3>
                  <p className="text-xs text-thrive-ink-600">
                    Connect with our team in Lagos.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Tunde Adeleke"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tunde@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                      Skills
                    </label>
                    <input
                      type="text"
                      placeholder="Teaching, Logistics, Tech"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-thrive-purple-900 mb-1">
                      Availability
                    </label>
                    <input
                      type="text"
                      placeholder="Weekends, Bi-weekly"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
