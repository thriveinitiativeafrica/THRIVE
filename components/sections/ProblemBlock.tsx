import React from "react";
import Image from "next/image";
import { siteImages } from "@/content/images.config";
import { IconDroplet, IconBook, IconUsers } from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function ProblemBlock() {
  const issues = [
    {
      icon: <IconDroplet className="w-5 h-5 text-thrive-purple-900" />,
      title: "Lack of Clean Drinking Water",
      desc: "Over 60 million Nigerians lack access to safe drinking water, exposing children to recurring waterborne infections.",
    },
    {
      icon: <IconBook className="w-5 h-5 text-thrive-purple-900" />,
      title: "Out-of-School Children",
      desc: "Millions of primary-school-aged children in peri-urban areas are forced into street trading due to family economic distress.",
    },
    {
      icon: <IconUsers className="w-5 h-5 text-thrive-purple-900" />,
      title: "Vulnerable Informal Households",
      desc: "Families in densely populated settlements face extreme food price inflation without public social safety nets.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-thrive-cream border-t border-thrive-border relative overflow-hidden">
      {/* ProofDeck-style Animated Background */}
      <SectionBackground variant="cream" pattern="concentric-arcs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & 3 Bullet Issues (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-thrive-purple-700">
                The Grassroots Reality
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
                The Problem <br />
                <span className="italic font-normal font-serif text-thrive-gold-600">
                  We Can&apos;t Ignore
                </span>
              </h2>
            </div>

            <p className="text-base text-thrive-ink-600 leading-relaxed font-normal max-w-xl">
              Across peri-urban informal settlements and rural settlements in Nigeria, families face daily barriers to clean water, basic schooling, and adequate nutrition. We deploy direct, measurable interventions that address these crises at the root.
            </p>

            {/* 3 Issues List */}
            <div className="space-y-4 pt-2">
              {issues.map((issue) => (
                <div key={issue.title} className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-white border border-thrive-border flex items-center justify-center shrink-0 mt-0.5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                    {issue.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-thrive-purple-900 leading-snug">
                      {issue.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-thrive-ink-600 mt-0.5 leading-relaxed">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photo Frame with Authentic Representation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] isolate group">
              {/* Backing geometry */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-thrive-purple-100 border border-thrive-purple-200 rounded-tr-[100px] rounded-tl-3xl rounded-br-3xl -z-10 transition-transform duration-500 group-hover:scale-102" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white shadow-lg bg-thrive-cream">
                <Image
                  src={siteImages.problem.main.src}
                  alt={siteImages.problem.main.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
