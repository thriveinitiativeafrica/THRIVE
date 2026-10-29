import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { openDonateModal } from "@/components/shared/DonateModal";

export const metadata: Metadata = {
  title: "Our Story & Values",
  description:
    "Learn about THRIVE Initiative, our founding mission, grassroots methodology, and core values driving community development in Abuja, Nigeria.",
};

export default function StoryPage() {
  const values = [
    {
      title: "Community Ownership",
      description:
        "We believe lasting progress happens when local residents, elders, and youth lead project design and long-term facility maintenance.",
    },
    {
      title: "Uncompromising Integrity",
      description:
        "Every donated Naira is stewarded with strict transparency. We deploy resources directly where they create tangible, verifiable impact.",
    },
    {
      title: "Equity and Inclusion",
      description:
        "We prioritize vulnerable and historically underserved groups, specifically out-of-school children, widowed mothers, and persons with disabilities.",
    },
    {
      title: "Sustainable Execution",
      description:
        "We design solutions that continue thriving independently, including solar-powered water infrastructure and self-sustaining women cooperatives.",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pt-8 pb-24">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Our Story & Values
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          Dedicated to sustainable grassroots progress in Nigeria.
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          THRIVE Initiative was founded to bridge the critical gap in basic infrastructure, youth literacy, and women economic empowerment across underserved communities in Abuja.
        </p>
      </section>

      {/* Hero Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-gray-100">
          <Image
            src="/images/who-we-are.webp"
            alt="THRIVE Initiative community members and field organizers in Abuja"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 space-y-4">
            <h2 className="text-2xl font-medium text-[#2E1650]">Our Mission</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              To empower individuals and transform vulnerable communities by delivering clean water solutions, equitable learning opportunities, vocational capacity training, and human rights advocacy.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 space-y-4">
            <h2 className="text-2xl font-medium text-[#2E1650]">Our Vision</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              A self-reliant Nigeria where every child has access to quality education, every household enjoys clean potable water, and women have the resources to build sustainable enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
              Principles
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#2E1650]">
            The values guiding our daily work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-3xl p-8 border border-gray-200/90 space-y-3"
            >
              <h3 className="text-xl font-medium text-[#2E1650]">{v.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Band */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E1650] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-medium text-white">Join us in driving change</h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Whether through financial support, volunteering your skills, or institutional collaboration, your partnership makes our field interventions possible.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-[#2E1650] rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
