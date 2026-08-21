"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

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
          areaOfInterest: "General Volunteer",
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
      {/* Background B&W Crowd of African Community Members (No gradients) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80"
          alt="African community gathering backdrop"
          fill
          className="object-cover grayscale opacity-20"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-thrive-border">
          {/* Left Panel: Deep Brand Purple (No teal, No gradients, No shadows) */}
          <div className="bg-thrive-purple-900 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-thrive-gold-400 leading-[1.1]">
                Be a Part of <br />
                the <span className="italic font-normal font-serif text-white">Change</span>
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Whether it&apos;s teaching, organizing events, or providing on-the-ground help, your time and skills can make a huge difference. Sign up and join our volunteer network across Nigeria.
              </p>
            </div>

            <div>
              <a
                href="#volunteer-form"
                className="inline-block px-7 py-3 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Become a Volunteer
              </a>
            </div>
          </div>

          {/* Right Panel: Clean White Signup Form */}
          <div id="volunteer-form" className="p-8 sm:p-10 bg-white flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-thrive-purple-100 text-thrive-purple-900 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
                  Thank You for Signing Up!
                </h3>
                <p className="text-xs text-thrive-ink-600">
                  We have registered your application. Our volunteer coordinator will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-thrive-border bg-thrive-cream/40 text-thrive-ink-900 text-xs placeholder-thrive-ink-600/60 focus:outline-none focus:bg-white focus:border-thrive-purple-900"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-thrive-border bg-thrive-cream/40 text-thrive-ink-900 text-xs placeholder-thrive-ink-600/60 focus:outline-none focus:bg-white focus:border-thrive-purple-900"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Skills (e.g. Teaching, Logistics, Medical, Tech)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-thrive-border bg-thrive-cream/40 text-thrive-ink-900 text-xs placeholder-thrive-ink-600/60 focus:outline-none focus:bg-white focus:border-thrive-purple-900"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Availability (e.g. Weekends, Full-time)"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-thrive-border bg-thrive-cream/40 text-thrive-ink-900 text-xs placeholder-thrive-ink-600/60 focus:outline-none focus:bg-white focus:border-thrive-purple-900"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-lg bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Sign Up"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
