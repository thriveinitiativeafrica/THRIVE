import React from "react";
import type { Metadata } from "next";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";
import { IconUsers, IconBook, IconHeart, IconShieldCheck } from "@/components/shared/Icons";

export const metadata: Metadata = {
  title: "Volunteer With Us — Join the THRIVE Volunteer Corps",
  description:
    "Apply to become a volunteer with THRIVE Initiative. Discover volunteer roles, schedules, and perks for changemakers in Nigeria.",
};

export default function VolunteerPage() {
  const volunteerBenefits = [
    {
      icon: <IconUsers className="w-6 h-6 text-thrive-purple-900" />,
      title: "Community Mobilization",
      desc: "Work on the frontlines alongside seasoned community coordinators and grassroots leaders.",
    },
    {
      icon: <IconBook className="w-6 h-6 text-thrive-purple-900" />,
      title: "Capacity Building Workshops",
      desc: "Get access to exclusive quarterly training sessions on project management and monitoring.",
    },
    {
      icon: <IconShieldCheck className="w-6 h-6 text-thrive-purple-900" />,
      title: "Official Impact Credential",
      desc: "Receive formal certificates of service and personalized professional recommendation letters.",
    },
    {
      icon: <IconHeart className="w-6 h-6 text-thrive-purple-900" />,
      title: "Lifelong Changemaker Network",
      desc: "Connect with like-minded humanitarians, educators, doctors, and civic innovators across Nigeria.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Give Your Time. <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Transform Lives.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            Volunteers are the lifeblood of our initiatives. From rural health outreaches to youth mentoring in Nigeria, every hour you invest creates a ripple of positive change.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-thrive-purple-900">
              What You Gain as a Volunteer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerBenefits.map((b) => (
              <div
                key={b.title}
                className="group bg-thrive-cream p-6 rounded-2xl border border-gray-200 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-thrive-purple-900"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {b.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors">{b.title}</h3>
                <p className="text-xs text-thrive-ink-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Split Volunteer Form */}
      <VolunteerCTA />
    </div>
  );
}
