import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BlobImageFrame } from "@/components/shared/BlobImageFrame";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sdgList } from "@/content/sdgs";
import { leadershipData } from "@/content/leadership";
import { SdgIcon } from "@/components/shared/SdgIcon";
import { Target, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Mission, Vision & Core Values",
  description:
    "Learn about THRIVE Initiative's mission, founding vision, 7 core values, and alignment with the United Nations Sustainable Development Goals in Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15]">
            Empowering People. <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Transforming Communities.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            <strong>THRIVE</strong> stands for <em>Transforming Hope, Rights, Inclusion, Vision & Empowerment</em>. We are a Nigerian grassroots-led nonprofit committed to breaking cycles of poverty, ignorance, and inequality through targeted, sustainable initiatives.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="group bg-thrive-cream rounded-2xl p-8 sm:p-10 border border-gray-200 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-thrive-purple-900">
              <div className="w-12 h-12 rounded-xl bg-thrive-purple-900 text-thrive-gold-400 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Target className="w-6 h-6 butterfly-hover" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-thrive-ink-800 leading-relaxed">
                To empower vulnerable individuals—particularly women, children, and marginalized youth in Nigeria—with the education, vocational competencies, mentorship, and civic agency needed to lift themselves out of poverty and lead sustainable, dignified lives.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-thrive-purple-900 text-white rounded-2xl p-8 sm:p-10 border border-thrive-purple-700 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white/15 text-thrive-gold-400 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Compass className="w-6 h-6 butterfly-hover" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-thrive-purple-100/85 leading-relaxed">
                A just, equitable, and self-sustaining society where every individual has uninterrupted access to quality education, economic dignity, fundamental human rights, and the opportunity to realize their fullest potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Background Section */}
      <section className="py-20 lg:py-28 bg-thrive-cream border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-thrive-purple-900">
                Born from a Commitment to <span className="italic font-normal font-serif text-thrive-gold-600">Real Transformation</span>
              </h2>
              <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed">
                {leadershipData.purpose}
              </p>
              <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed">
                Unlike traditional top-down charity models, THRIVE anchors every project in grassroots community participation. We believe that true development is not delivered to communities—it is built from within by empowering local leaders, mothers, teachers, and youths.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <BlobImageFrame
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Community members in an empowerment session"
                width={540}
                height={500}
                shape="quarter-tr"
                accentColor="purple"
                accentPosition="bottom-left"
                className="max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7 Core Values Grid with Smooth Hover Animation */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Our 7 Core Values"
            italicWord="Values"
            description="Our team and volunteers work collaboratively to uphold these foundational ethical principles in every project."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leadershipData.coreValues.map((val, idx) => (
              <div
                key={val.name}
                className="group bg-white rounded-2xl p-6 border border-gray-200 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:border-thrive-purple-900"
              >
                <div className="text-xs uppercase font-bold text-thrive-purple-900 tracking-wider transition-colors group-hover:text-thrive-gold-600">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
                  {val.name}
                </h3>
                <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UN SDG Alignment Section with Butterfly Wing Unfold Icon Hover */}
      <section className="py-20 lg:py-28 bg-thrive-cream border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Alignment with United Nations SDGs"
            italicWord="SDGs"
            description="THRIVE Initiative actively contributes to 6 key Sustainable Development Goals through integrated, quantifiable community initiatives."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgList.map((sdg) => (
              <div
                key={sdg.number}
                className="group rounded-2xl p-6 text-white space-y-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{ backgroundColor: sdg.color }}
              >
                <div>
                  <div className="flex items-center justify-between font-extrabold text-2xl border-b border-white/20 pb-3">
                    <div className="flex items-center gap-2.5">
                      {/* Butterfly Wing Opening Container */}
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white/30 group-hover:scale-110">
                        <SdgIcon number={sdg.number} className="w-6 h-6 text-white" size={24} />
                      </div>
                      <span>SDG {sdg.number}</span>
                    </div>
                    <span className="text-xs uppercase font-semibold tracking-wider">{sdg.shortTitle}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mt-3 transition-transform duration-300 group-hover:translate-x-0.5">{sdg.title}</h3>
                  <p className="text-xs text-white/90 leading-relaxed mt-2">{sdg.description}</p>
                </div>

                <div className="pt-3 border-t border-white/20 text-xs text-white font-medium bg-black/15 p-3 rounded-xl">
                  <strong className="block text-[11px] uppercase tracking-wider text-white/80 mb-0.5">
                    THRIVE&apos;s Action:
                  </strong>
                  {sdg.initiativeAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-200 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-thrive-purple-900 text-white rounded-2xl p-8 sm:p-12 space-y-6 border border-thrive-purple-700">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium">
              Be Part of Our Next Chapter
            </h2>
            <p className="text-sm sm:text-base text-thrive-purple-100/80 max-w-xl mx-auto">
              Whether through volunteering, institutional partnerships, or donations, your participation creates direct impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/donate"
                className="px-7 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Donate
              </Link>
              <Link
                href="/get-involved/volunteer"
                className="px-7 py-3.5 rounded-full bg-white text-thrive-purple-900 hover:bg-thrive-cream font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Join as a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
