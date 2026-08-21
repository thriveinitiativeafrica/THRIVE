import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, Building, HeartHandshake, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved — Volunteer, Partner & Donate",
  description:
    "Discover how you can get involved with THRIVE Initiative as an active volunteer, institutional partner, or community donor in Nigeria.",
};

export default function GetInvolvedPage() {
  const tracks = [
    {
      icon: <HandHeart className="w-8 h-8 text-thrive-purple-900 butterfly-hover" />,
      title: "Become a Volunteer",
      desc: "Lend your time, specialized skills, and passion. Join our frontline field missions in teaching, health, logistics, or creative storytelling.",
      href: "/get-involved/volunteer",
      cta: "Join Volunteer Registry",
      perks: [
        "Direct community field experience",
        "Skill-building & leadership mentorship",
        "Official volunteer impact certificate",
      ],
    },
    {
      icon: <Building className="w-8 h-8 text-thrive-purple-900 butterfly-hover" />,
      title: "Partner With Us",
      desc: "Collaborate with THRIVE on CSR programs, research initiatives, scholastic kit donations, or large-scale community infrastructure.",
      href: "/get-involved/partner",
      cta: "Explore Partnership Tracks",
      perks: [
        "Verifiable CSR & ESG impact tracking",
        "Grassroots co-design & transparent reporting",
        "Strategic joint campaign opportunities",
      ],
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-thrive-purple-900 butterfly-hover" />,
      title: "Donate",
      desc: "Provide seed capital for women entrepreneurs, sponsor a child's academic scholarship, or fund a village solar water borehole.",
      href: "/donate",
      cta: "Make a Donation",
      perks: [
        "100% accountable project fund allocation",
        "Direct beneficiary updates & receipts",
        "Tax-deductible registered non-profit contribution",
      ],
    },
  ];

  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15]">
            Every Hand Can <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Transform a Community
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            Whether you are an individual wanting to volunteer your time, an institution looking for verified CSR impact, or a donor in Nigeria, there is a place for you at THRIVE.
          </p>
        </div>
      </section>

      {/* 3 Tracks Cards */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="group bg-white rounded-2xl p-8 border border-gray-200 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-thrive-purple-900"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-thrive-cream border border-gray-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {track.icon}
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors">
                    {track.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed">
                    {track.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {track.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-thrive-ink-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-thrive-purple-900 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={track.href}
                  className="w-full py-3 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{track.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-thrive-gold-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
