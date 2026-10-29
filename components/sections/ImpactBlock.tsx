import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/content/images.config";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function ImpactBlock() {
  const primaryHighlight = {
    stat: "120+",
    statLabel: "Community Solar Boreholes",
    title: "Clean Water That Reaches The Last Mile",
    desc: "We build solar-powered deep aquifer boreholes with multi-tap distribution stations and democratically elected village water stewardship committees across rural Lagos and Ogun states.",
    image: siteImages.impact.water,
    href: "/programs/community-development",
    tag: "Health & Sanitation • SDG 3 & 6",
  };

  const secondaryHighlights = [
    {
      stat: "10,000+",
      statLabel: "Nutritious Family Meals",
      title: "Targeted Nutrition Relief",
      desc: "Emergency grain and protein hampers distributed to elderly residents, nursing mothers, and families experiencing severe inflation pressure in informal settlements.",
      image: siteImages.impact.food,
      href: "/programs/community-development",
      tag: "Food Security • SDG 2",
    },
    {
      stat: "800+",
      statLabel: "Scholastic Sponsorships",
      title: "Direct Classroom Enrollment",
      desc: "Comprehensive tuition coverage, learning textbooks, sturdy shoes, and uniform stipends enabling out-of-school children to return to accredited partner primary schools.",
      image: siteImages.impact.education,
      href: "/programs/child-education",
      tag: "Quality Education • SDG 4",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-thrive-purple-900 text-white relative overflow-hidden border-y border-thrive-purple-800">
      {/* ProofDeck-style Background Atmosphere */}
      <SectionBackground variant="purple" pattern="dual-corners" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        <div className="space-y-4 max-w-2xl text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-400">
            Verified Field Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.15]">
            Our <span className="italic font-normal font-serif text-thrive-gold-400">Impact</span> So Far
          </h2>
          <p className="text-sm sm:text-base text-thrive-purple-100/80 leading-relaxed font-normal">
            Every intervention is tracked through transparent community monitoring. Here is what our partners and donors achieved across Nigerian communities this past year.
          </p>
        </div>

        {/* Editorial Layout: Large Featured Item Left + Vertical Editorial Stack Right (Non-templated) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Item: 7 cols */}
          <div className="lg:col-span-7 bg-white text-thrive-purple-900 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-thrive-cream border border-thrive-border shadow-xs">
                <Image
                  src={primaryHighlight.image.src}
                  alt={primaryHighlight.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-thrive-purple-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                  {primaryHighlight.tag}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl sm:text-5xl font-extrabold text-thrive-purple-900 tracking-tight">
                    {primaryHighlight.stat}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-thrive-gold-600">
                    {primaryHighlight.statLabel}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-tight">
                  {primaryHighlight.title}
                </h3>

                <p className="text-sm text-thrive-ink-600 leading-relaxed">
                  {primaryHighlight.desc}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-thrive-border flex items-center justify-between">
              <Link
                href={primaryHighlight.href}
                className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
              >
                Explore Water Program Details
              </Link>
              <span className="text-[11px] font-semibold text-thrive-teal-700 bg-thrive-teal-50 px-2.5 py-1 rounded-full border border-thrive-teal-100">
                Lagos &amp; Ogun Projects
              </span>
            </div>
          </div>

          {/* Secondary Editorial Items: 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {secondaryHighlights.map((item) => (
              <div
                key={item.title}
                className="bg-white text-thrive-purple-900 rounded-3xl p-6 border border-white/20 shadow-lg flex flex-col justify-between group flex-1"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-36 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-thrive-cream border border-thrive-border">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-thrive-teal-700">
                      {item.tag}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-extrabold text-thrive-purple-900">
                        {item.stat}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-thrive-gold-600">
                        {item.statLabel}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-thrive-ink-600 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-thrive-border flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="text-[11px] font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                  >
                    View Program Outputs
                  </Link>
                  <span className="w-1.5 h-1.5 rounded-full bg-thrive-gold-600" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
