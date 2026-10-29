import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/content/programs";
import { siteConfig } from "@/content/site.config";
import { SectionBackground } from "@/components/shared/SectionBackground";

export const metadata: Metadata = {
  title: "Integrated Program Pillars & Initiatives",
  description:
    "Explore THRIVE Initiative's core program tracks in Nigeria: Women Empowerment, Child Education, Skills Acquisition, Advocacy & Social Inclusion, and Community Development.",
  openGraph: {
    title: "Integrated Program Pillars & Initiatives | THRIVE",
    description:
      "Explore THRIVE Initiative's core program tracks in Nigeria: Women Empowerment, Child Education, Skills Acquisition, Advocacy & Social Inclusion, and Community Development.",
    url: `${siteConfig.url}/programs`,
  },
};

export default function ProgramsPage() {
  return (
    <div className="space-y-0 min-h-screen">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span>Community-Driven Interventions</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15]">
            Targeted Interventions, <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Sustainable Outcomes
            </span>
          </h1>

          <p className="text-base sm:text-lg text-thrive-purple-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Addressing the root causes of systemic poverty through integrated, evidence-backed community programs across Nigerian communities.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {programsData.map((prog, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={prog.slug}
                id={prog.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center rounded-3xl p-6 sm:p-10 border border-thrive-border shadow-xs hover:shadow-lg transition-all duration-300 ${
                  isEven ? "bg-thrive-cream" : "bg-white"
                }`}
              >
                {/* Photo Frame (5 cols) */}
                <div className={`lg:col-span-5 relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white shadow-md bg-thrive-cream">
                    <Image
                      src={prog.heroImage}
                      alt={prog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-thrive-purple-900/90 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      SDG {prog.sdgNumber}: {prog.sdgLabel}
                    </div>
                  </div>
                </div>

                {/* Content (7 cols) */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-thrive-purple-900 leading-tight">
                    {prog.title}
                  </h2>

                  <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal">
                    {prog.mandate}
                  </p>

                  {/* Impact Stat Chips */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {prog.impactStats.map((st) => (
                      <div key={st.label} className="p-3 rounded-2xl bg-white border border-thrive-border shadow-2xs">
                        <div className="font-serif text-base sm:text-lg font-bold text-thrive-purple-900">
                          {st.value}
                        </div>
                        <div className="text-[10px] text-thrive-ink-600 font-semibold line-clamp-1 mt-0.5">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Links */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/programs/${prog.slug}`}
                      className="px-7 py-3 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                    >
                      View Dedicated Portfolio
                    </Link>

                    <Link
                      href="/get-involved/volunteer"
                      className="px-7 py-3 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                    >
                      Volunteer
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
