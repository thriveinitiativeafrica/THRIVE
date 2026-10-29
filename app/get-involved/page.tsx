import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { IconCheckCircle } from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export const metadata: Metadata = {
  title: "Get Involved | Volunteer, Partner & Donate",
  description:
    "Discover how you can get involved with THRIVE Initiative as an active volunteer, institutional partner, or community donor in Nigeria.",
  openGraph: {
    title: "Get Involved | THRIVE Initiative",
    description:
      "Discover how you can get involved with THRIVE Initiative as an active volunteer, institutional partner, or community donor in Nigeria.",
    url: `${siteConfig.url}/get-involved`,
  },
};

export default function GetInvolvedPage() {
  const tracks = [
    {
      number: "01",
      title: "Become a Volunteer",
      desc: "Contribute your time and specialized skills. Join our frontline field missions in teaching, health logistics, relief packaging, or community storytelling.",
      href: "/get-involved/volunteer",
      cta: "Join Volunteer Registry",
      perks: [
        "Hands-on community field outreach",
        "Mentorship from experienced development leads",
        "Official volunteer service certification",
      ],
    },
    {
      number: "02",
      title: "Partner With Us",
      desc: "Collaborate with THRIVE on verified CSR programs, solar water infrastructure, educational kit distributions, and joint advocacy campaigns.",
      href: "/get-involved/partner",
      cta: "Explore Corporate Partnership",
      perks: [
        "Measurable ESG and CSR impact tracking",
        "Transparent grassroots project co-design",
        "Published annual co-branded impact documentation",
      ],
    },
    {
      number: "03",
      title: "Donate to Programs",
      desc: "Provide seed equipment for women-led cooperatives, fund a child's academic scholarship, or sponsor a village solar water borehole.",
      href: "/donate",
      cta: "Make a Donation",
      perks: [
        "100% accountable project fund allocation",
        "Direct beneficiary updates and receipts",
        "Registered non-profit tax acknowledgment",
      ],
    },
  ];

  return (
    <div className="space-y-0 min-h-screen">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span>Collaborate for Grassroots Change</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15]">
            Every Hand Can <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Transform a Community
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Join our community network as an active field volunteer, institutional CSR partner, or program donor across Lagos and Nigerian communities.
          </p>
        </div>
      </section>

      {/* 3 Tracks Editorial Cards */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="bg-white rounded-3xl p-8 border border-thrive-border shadow-xs hover:shadow-lg flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-thrive-purple-100 text-thrive-purple-900 flex items-center justify-center font-serif text-lg font-bold">
                    {track.number}
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors">
                    {track.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed font-normal">
                    {track.desc}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-thrive-border">
                    {track.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-thrive-ink-800">
                        <IconCheckCircle className="text-thrive-purple-900 shrink-0" size={15} />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={track.href}
                  className="w-full py-3.5 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-sm"
                >
                  {track.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
