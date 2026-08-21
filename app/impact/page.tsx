import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Impact, MEL & Transparency Reports | THRIVE Initiative",
  description:
    "Explore our Monitoring, Evaluation and Learning (MEL) metrics, field assessment frameworks, and audited impact achievements across Nigeria.",
};

export default function ImpactPage() {
  const annualMetrics = [
    {
      metric: "2,500+",
      label: "Vulnerable Families Reached",
      category: "Community Welfare",
      desc: "Emergency food security packs, clean water access, and economic rehabilitation support in Nigeria.",
    },
    {
      metric: "800+",
      label: "Out-of-School Children Enrolled",
      category: "Child Education",
      desc: "Provided with full tuition coverage, uniform sets, learning supplies, and literacy tutors.",
    },
    {
      metric: "450+",
      label: "Women Micro-Grant Graduates",
      category: "Women Empowerment",
      desc: "Equipped with business development bootcamps and initial seed grants for small enterprises.",
    },
    {
      metric: "120+",
      label: "Clean Water Installations",
      category: "Health & Sanitation",
      desc: "Solar-powered deep water boreholes and community hygiene infrastructure across rural clusters.",
    },
  ];

  const frameworks = [
    {
      title: "Participatory Baseline Surveys",
      desc: "Before launching any program, our field teams work with local Nigerian community leaders, women groups, and youth to map out critical gaps.",
    },
    {
      title: "Quarterly Field Outcome Audits",
      desc: "We track actual life-improvement indicators (school attendance rates, household income growth, reduction in waterborne ailments).",
    },
    {
      title: "Democratized Community Stewardship",
      desc: "Local maintenance committees are trained and equipped to manage water wells and skills hubs sustainably long after initial deployment.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Accountable Progress, <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Measurable Change
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            We hold ourselves to rigorous standards of transparency, data integrity, and evidence-driven development in Nigeria.
          </p>
        </div>
      </section>

      {/* Metrics Grid with Smooth Hover */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Verified Field Outcomes"
            italicWord="Outcomes"
            description="Cumulative impact metrics achieved across our project hubs through dedicated volunteer hours and donor investments."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {annualMetrics.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 border border-gray-200 space-y-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-thrive-purple-900 group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider transition-colors group-hover:text-thrive-purple-900">
                    {item.category}
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-thrive-purple-900 mt-2">
                    {item.metric}
                  </div>
                  <h3 className="font-serif text-base font-bold text-thrive-purple-900 mt-1">
                    {item.label}
                  </h3>
                </div>
                <p className="text-xs text-thrive-ink-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEL Methodology Section */}
      <section className="py-20 lg:py-28 bg-thrive-cream border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Our MEL Framework"
            italicWord="Framework"
            description="How our team guarantees accountability and high return on every philanthropic contribution."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {frameworks.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 border border-gray-200 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-thrive-purple-900 group"
              >
                <div className="w-12 h-12 rounded-xl bg-thrive-purple-100 text-thrive-purple-900 flex items-center justify-center font-bold font-serif text-lg border border-thrive-purple-200 transition-transform duration-300 group-hover:scale-110">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-thrive-purple-900">{f.title}</h3>
                <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-200 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-thrive-purple-900 text-white rounded-2xl p-8 sm:p-12 space-y-6 border border-thrive-purple-700">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium">
              Partner on Verified Community Impact
            </h2>
            <p className="text-sm sm:text-base text-thrive-purple-100/80 max-w-xl mx-auto">
              Review detailed baseline documentation or co-finance targeted initiatives in Nigerian communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/get-involved/partner"
                className="px-7 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Institutional Partnership
              </Link>
              <Link
                href="/donate"
                className="px-7 py-3.5 rounded-full bg-white text-thrive-purple-900 hover:bg-thrive-cream font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
