import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { siteImages } from "@/content/images.config";
import { BlobImageFrame } from "@/components/shared/BlobImageFrame";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sdgList } from "@/content/sdgs";
import { leadershipData } from "@/content/leadership";
import { SdgIcon } from "@/components/shared/SdgIcon";
import { SectionBackground } from "@/components/shared/SectionBackground";

export const metadata: Metadata = {
  title: "About Us | Mission, Vision & Core Values",
  description:
    "Learn about THRIVE Initiative's mission, founding vision, 7 core values, and alignment with the United Nations Sustainable Development Goals in Nigeria.",
  openGraph: {
    title: "About Us | Mission, Vision & Core Values | THRIVE",
    description:
      "Learn about THRIVE Initiative's mission, founding vision, 7 core values, and alignment with the United Nations Sustainable Development Goals in Nigeria.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-0 min-h-screen">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span>Our Foundation &amp; Ethos</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15]">
            Empowering People. <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Transforming Communities.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/90 leading-relaxed font-normal">
            <strong>THRIVE</strong> stands for <em>Transforming Hope, Rights, Inclusion, Vision &amp; Empowerment</em>. We are a Nigerian grassroots-led nonprofit committed to breaking cycles of poverty, educational exclusion, and water scarcity through targeted, sustainable initiatives.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="group bg-thrive-cream rounded-3xl p-8 sm:p-10 border border-thrive-border space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-thrive-purple-900 text-thrive-gold-400 flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-thrive-ink-800 leading-relaxed font-normal">
                To empower vulnerable individuals, particularly women, children, and marginalized youths across Nigerian communities, with the education, vocational competencies, mentorship, and civic agency needed to lift themselves out of poverty and lead self-sufficient lives.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-thrive-purple-900 text-white rounded-3xl p-8 sm:p-10 border border-thrive-purple-700 space-y-4 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-white/15 text-thrive-gold-400 flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-thrive-purple-100/90 leading-relaxed font-normal">
                A just, equitable, and self-sustaining society where every child and mother in Nigeria has reliable access to clean water, quality schooling, economic dignity, and fundamental social rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Background Section */}
      <section className="py-20 lg:py-28 bg-thrive-cream border-t border-thrive-border relative overflow-hidden">
        <SectionBackground variant="cream" pattern="concentric-arcs" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-thrive-purple-700">
                The THRIVE Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-thrive-purple-900">
                Born from a Commitment to <span className="italic font-normal font-serif text-thrive-gold-600">Grassroots Transformation</span>
              </h2>
              <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal">
                {leadershipData.purpose}
              </p>
              <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal">
                Instead of top-down charity distribution, THRIVE anchors every initiative in local ownership. We consult community elders, mothers&apos; associations, and youth leaders before breaking ground on any project, ensuring that every solar borehole and classroom program lasts for generations.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <BlobImageFrame
                src={siteImages.whoWeAre.main.src}
                alt="Community members and volunteers in an empowerment session"
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

      {/* 7 Core Values Grid */}
      <section className="py-20 lg:py-28 bg-white border-t border-thrive-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Our 7 Core Values"
            italicWord="Values"
            description="Our team and field volunteers uphold these foundational ethical principles in every project we execute."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leadershipData.coreValues.map((val, idx) => (
              <div
                key={val.name}
                className="bg-white rounded-3xl p-6 border border-thrive-border space-y-3 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-xs uppercase font-extrabold text-thrive-gold-600 tracking-wider">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
                  {val.name}
                </h3>
                <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UN SDG Alignment Section */}
      <section className="py-20 lg:py-28 bg-thrive-cream border-t border-thrive-border relative overflow-hidden">
        <SectionBackground variant="cream" pattern="floating-elements" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <SectionHeading
            title="Alignment with United Nations SDGs"
            italicWord="SDGs"
            description="THRIVE Initiative actively advances 6 Sustainable Development Goals through integrated community programs in Nigeria."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgList.map((sdg) => (
              <div
                key={sdg.number}
                className="rounded-3xl p-6 text-white space-y-4 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: sdg.color }}
              >
                <div>
                  <div className="flex items-center justify-between font-extrabold text-2xl border-b border-white/20 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <SdgIcon number={sdg.number} className="w-6 h-6 text-white" size={24} />
                      </div>
                      <span>SDG {sdg.number}</span>
                    </div>
                    <span className="text-xs uppercase font-semibold tracking-wider">{sdg.shortTitle}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mt-3">{sdg.title}</h3>
                  <p className="text-xs text-white/90 leading-relaxed mt-2">{sdg.description}</p>
                </div>

                <div className="pt-3 border-t border-white/20 text-xs text-white font-medium bg-black/15 p-3 rounded-2xl">
                  <strong className="block text-[11px] uppercase tracking-wider text-white/80 mb-0.5">
                    THRIVE Action:
                  </strong>
                  {sdg.initiativeAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 bg-white border-t border-thrive-border text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-thrive-purple-900 text-white rounded-3xl p-8 sm:p-12 space-y-6 border border-thrive-purple-800 shadow-xl relative overflow-hidden">
            <SectionBackground variant="purple" pattern="concentric-arcs" />

            <div className="relative z-10 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Join Us in Empowering Nigerian Communities
              </h2>
              <p className="text-sm sm:text-base text-thrive-purple-100/85 max-w-xl mx-auto leading-relaxed">
                Connect with our team to volunteer, establish an institutional partnership, or sponsor a solar borehole.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-3">
                <Link
                  href="/donate"
                  className="px-8 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Donate
                </Link>
                <Link
                  href="/get-involved/volunteer"
                  className="px-8 py-3.5 rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
