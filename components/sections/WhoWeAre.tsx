import React from "react";
import Image from "next/image";
import { siteImages } from "@/content/images.config";
import { IconShieldCheck, IconUsers, IconHeart } from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function WhoWeAre() {
  const trustPoints = [
    {
      icon: <IconShieldCheck className="w-5 h-5 text-thrive-purple-900" />,
      title: "Transparent & Community Audited",
      desc: "Every project budget is shared directly with local project committees.",
    },
    {
      icon: <IconUsers className="w-5 h-5 text-thrive-purple-900" />,
      title: "Grassroots Ownership",
      desc: "Initiatives are designed and maintained alongside community leaders.",
    },
    {
      icon: <IconHeart className="w-5 h-5 text-thrive-purple-900" />,
      title: "Direct Field Impact",
      desc: "100% of public program donations support on-the-ground supplies and training.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <SectionBackground variant="white" pattern="floating-elements" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Arch Photo (5 cols) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm aspect-[4/5] isolate group">
              {/* Geometric Backing Panels */}
              <div className="absolute top-0 left-0 w-1/2 h-full bg-thrive-cream border border-thrive-border rounded-tl-full rounded-bl-full -z-10 transition-transform duration-500 group-hover:-translate-x-1" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-thrive-purple-100 border border-thrive-purple-200 rounded-tr-full rounded-br-full -z-10 transition-transform duration-500 group-hover:translate-x-1" />

              {/* Central Arch Frame */}
              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden border-2 border-white shadow-lg bg-thrive-cream">
                <Image
                  src={siteImages.whoWeAre.main.src}
                  alt={siteImages.whoWeAre.main.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Trust Points (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-600">
                Grassroots Humanitarian Action
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
                Who We Are
              </h2>
            </div>

            <p className="text-base text-thrive-ink-600 leading-relaxed font-normal">
              Founded in Lagos, THRIVE Initiative works to eliminate systemic poverty in Nigerian communities. We partner directly with residents to deliver sustainable clean water boreholes, school sponsorships for out-of-school children, vocational skills acquisition for women, and emergency food relief during periods of acute economic hardship.
            </p>

            {/* Trust Points */}
            <div className="space-y-4 pt-2">
              {trustPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-thrive-purple-100 border border-thrive-purple-200 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-thrive-purple-900 leading-snug">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-thrive-ink-600 mt-0.5">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
