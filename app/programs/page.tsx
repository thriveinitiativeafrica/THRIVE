import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/content/programs";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Explore THRIVE Initiative core intervention areas across clean water, child education, women empowerment, skills acquisition, and community outreach in Abuja, Nigeria.",
};

export default function ProgramsIndexPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pt-8 pb-24">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Our Programs
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          Integrated community programs designed for lasting progress.
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          We implement practical, community-owned interventions addressing basic needs, foundational education, and economic independence across Abuja.
        </p>
      </section>

      {/* Programs Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((prog) => (
            <div
              key={prog.slug}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 flex flex-col hover:border-gray-400 transition-colors"
            >
              <div className="relative w-full h-64 bg-gray-100">
                <Image
                  src={prog.heroImage}
                  alt={prog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#D4A017] uppercase tracking-wider">
                    {prog.badge}
                  </span>
                  <h2 className="text-xl font-medium text-[#2E1650]">{prog.title}</h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {prog.subtitle}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="text-xs sm:text-sm font-medium text-[#2E1650] hover:underline underline-offset-4"
                  >
                    View program details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
