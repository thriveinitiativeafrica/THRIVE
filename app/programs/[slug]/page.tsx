import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programsData } from "@/content/programs";
import { IconCheckCircle } from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = programsData.find((p) => p.slug === slug);
  if (!program) return { title: "Program Not Found" };

  return {
    title: `${program.title} | THRIVE Initiative`,
    description: program.subtitle,
    openGraph: {
      title: program.title,
      description: program.subtitle,
      images: [{ url: program.heroImage }],
    },
  };
}

export default async function SingleProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = programsData.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="space-y-0 min-h-screen">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/programs"
            className="inline-block text-xs font-bold uppercase tracking-wider text-thrive-gold-400 editorial-link hover:text-thrive-gold-300 transition-colors"
          >
            Back to All Programs
          </Link>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              {program.title}
            </h1>

            <p className="text-base sm:text-lg text-thrive-purple-100/90 font-normal leading-relaxed">
              {program.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Objectives */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Mandate */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-600">
                  Strategic Pillar
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900">
                  Executive Mandate &amp; Focus
                </h2>
                <p className="text-base text-thrive-ink-800 leading-relaxed font-normal">
                  {program.mandate}
                </p>
              </div>

              {/* Key Objectives */}
              <div className="space-y-4 bg-thrive-cream rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-xs">
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
                  Core Strategic Objectives
                </h3>
                <ul className="space-y-3">
                  {program.keyObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-thrive-ink-800">
                      <IconCheckCircle className="text-thrive-purple-900 shrink-0 mt-0.5" size={16} />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current Initiatives */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                  Active Projects &amp; Field Campaigns
                </h3>
                <div className="space-y-4">
                  {program.currentInitiatives.map((init) => (
                    <div
                      key={init.title}
                      className="p-6 rounded-3xl bg-white border border-thrive-border space-y-2 hover:border-thrive-purple-900 shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-bold text-thrive-purple-900">
                          {init.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-thrive-purple-100 text-thrive-purple-900 text-[10px] font-bold uppercase tracking-wider">
                          {init.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed font-normal">
                        {init.description}
                      </p>
                      <div className="text-xs text-thrive-purple-900 font-bold pt-1">
                        Beneficiaries: {init.targetBeneficiaries}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Photo Gallery & Testimonial (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Big Hero Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-lg bg-thrive-cream">
                <Image
                  src={program.heroImage}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-3 gap-3">
                {program.gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-thrive-border bg-thrive-cream group shadow-2xs">
                    <Image
                      src={img}
                      alt={`${program.title} documentation ${idx + 1}`}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Beneficiary Testimonial Card */}
              <div className="bg-thrive-purple-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-thrive-purple-700 shadow-md">
                <div className="flex items-center gap-1" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 fill-thrive-gold-400 text-thrive-gold-400"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-thrive-purple-100/90 leading-relaxed italic">
                  &ldquo;{program.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-thrive-gold-400 bg-thrive-cream">
                    <Image
                      src={program.testimonial.avatar}
                      alt={program.testimonial.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-white">{program.testimonial.author}</h5>
                    <p className="text-[11px] text-thrive-purple-100/70">{program.testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Action Callout */}
              <div className="p-6 rounded-3xl bg-thrive-cream border border-thrive-border text-center space-y-4 shadow-xs">
                <h4 className="font-serif text-lg font-bold text-thrive-purple-900">
                  Support this Program
                </h4>
                <p className="text-xs text-thrive-ink-600 leading-relaxed">
                  Your direct donation or volunteer participation helps us expand this program to more underserved Nigerian communities.
                </p>
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/donate"
                    className="w-full py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Donate
                  </Link>
                  <Link
                    href="/get-involved/volunteer"
                    className="w-full py-3.5 rounded-full bg-white hover:bg-thrive-cream text-thrive-purple-900 border border-thrive-border font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
