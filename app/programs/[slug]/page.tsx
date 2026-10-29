import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programsData, type Program } from "@/content/programs";
import { openDonateModal } from "@/components/shared/DonateModal";
import { siteConfig } from "@/content/site.config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programsData.find((p) => p.slug === slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.subtitle,
    openGraph: {
      title: `${program.title} | ${siteConfig.name}`,
      description: program.subtitle,
      images: [
        {
          url: program.heroImage,
          alt: program.title,
        },
      ],
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programsData.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 pb-24">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href="/programs"
            className="text-xs text-gray-500 hover:text-[#2E1650] transition-colors"
          >
            Programs
          </Link>
          <span className="text-xs text-gray-300">/</span>
          <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider">
            {program.badge}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          {program.title}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          {program.subtitle}
        </p>
      </section>

      {/* Program Hero Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-gray-100">
          <Image
            src={program.heroImage}
            alt={program.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </section>

      {/* Mandate & Core Objectives */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Program Mandate
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#2E1650]">
              Strategic focus and community purpose
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              {program.mandate}
            </p>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 space-y-6">
            <h3 className="text-xl font-medium text-[#2E1650]">Key Program Objectives</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              {program.keyObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4A017] mt-2 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Current Initiatives */}
      {program.currentInitiatives.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Initiatives
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#2E1650]">Active field projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {program.currentInitiatives.map((init) => (
              <div
                key={init.title}
                className="bg-white rounded-3xl p-8 border border-gray-200/90 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-[#2E1650]">{init.title}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FAF6EC] text-[#2E1650] border border-gray-200">
                    {init.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {init.description}
                </p>
                <p className="text-xs text-gray-400 pt-1">
                  Target: {init.targetBeneficiaries}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Band */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E1650] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-medium text-white">Support this program</h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              Your contribution or institutional grant accelerates these verified community projects across Abuja.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-[#2E1650] rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
