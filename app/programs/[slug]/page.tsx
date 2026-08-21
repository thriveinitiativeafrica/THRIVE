import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programsData } from "@/content/programs";
import { CheckCircle2, ArrowLeft, Star } from "lucide-react";

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
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-thrive-purple-100/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Programs</span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              {program.title}
            </h1>

            <p className="text-base sm:text-lg text-thrive-purple-100/85 font-normal leading-relaxed">
              {program.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Objectives */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Mandate */}
              <div className="space-y-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900">
                  Executive Mandate & Focus
                </h2>
                <p className="text-base text-thrive-ink-800 leading-relaxed font-normal">
                  {program.mandate}
                </p>
              </div>

              {/* Key Objectives */}
              <div className="space-y-4 bg-thrive-cream rounded-2xl p-6 sm:p-8 border border-gray-200">
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
                  Core Strategic Objectives
                </h3>
                <ul className="space-y-3">
                  {program.keyObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-thrive-ink-800">
                      <CheckCircle2 className="w-4 h-4 text-thrive-purple-900 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current Initiatives */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-thrive-purple-900">
                  Active Projects & Campaigns
                </h3>
                <div className="space-y-4">
                  {program.currentInitiatives.map((init) => (
                    <div
                      key={init.title}
                      className="p-6 rounded-2xl bg-white border border-gray-200 space-y-2 hover:border-thrive-purple-900 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-bold text-thrive-purple-900">
                          {init.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-thrive-purple-100 text-thrive-purple-900 text-[10px] font-bold uppercase tracking-wider">
                          {init.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed">
                        {init.description}
                      </p>
                      <div className="text-xs text-thrive-purple-900 font-semibold pt-1">
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-200 bg-thrive-cream">
                <Image
                  src={program.heroImage}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Gallery Grid (All Black African Subjects) */}
              <div className="grid grid-cols-3 gap-3">
                {program.gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-thrive-cream group">
                    <Image
                      src={img}
                      alt={`${program.title} photo ${idx + 1}`}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Beneficiary Testimonial Card */}
              <div className="bg-thrive-purple-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-thrive-purple-700">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-thrive-gold-400 text-thrive-gold-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-thrive-purple-100/90 leading-relaxed italic">
                  &ldquo;{program.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-thrive-gold-400">
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
                    <p className="text-[11px] text-thrive-purple-100/60">{program.testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Action Callout */}
              <div className="p-6 rounded-2xl bg-thrive-cream border border-gray-200 text-center space-y-4">
                <h4 className="font-serif text-lg font-bold text-thrive-purple-900">
                  Support this Program
                </h4>
                <p className="text-xs text-thrive-ink-600">
                  Your direct donation or volunteer time enables us to expand this program to more underserved communities.
                </p>
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/donate"
                    className="w-full py-3 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Donate
                  </Link>
                  <Link
                    href="/get-involved/volunteer"
                    className="w-full py-3 rounded-full bg-white hover:bg-gray-50 text-thrive-purple-900 border border-gray-200 font-bold text-xs uppercase tracking-wider transition-all"
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
