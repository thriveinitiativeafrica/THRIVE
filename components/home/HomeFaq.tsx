"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconChevronDown } from "@/components/shared/Icons";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How are donations deployed across community programs?",
    answer:
      "Donations directly fund grassroots interventions including women empowerment workshops, school learning materials, skills acquisition clinics, and community health outreach across underserved communities in Africa.",
  },
  {
    question: "How can I volunteer with THRIVE Initiative?",
    answer:
      "We welcome passionate volunteers in Abuja, across Nigeria, and throughout Africa to support field outreach, mentorship, education clinics, and digital media advocacy. Visit our Contact page or click Get Involved to apply.",
  },
  {
    question: "Can our organization or foundation partner with THRIVE?",
    answer:
      "Yes. We collaborate with corporate CSR teams, civic foundations, schools, and international development agencies on sustainable community development across Africa.",
  },
  {
    question: "How can I follow project milestones and field updates?",
    answer:
      "Subscribe to our newsletter in the footer, follow our official Instagram (@thriveinitiativeng), or read our Blog for field dispatches and impact reports from our programs.",
  },
  {
    question: "Where is THRIVE Initiative located and registered?",
    answer:
      "THRIVE Initiative is an African non-governmental organization headquartered in Abuja, Nigeria, dedicated to empowering communities and transforming lives across the African continent.",
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleIndex(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Label + Big Heading + Subtext (PureFlow style) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
              FAQs
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#2E1650] leading-[1.1]">
            Frequently Asked Questions?
          </h2>
          <p className="text-sm sm:text-base text-[#2E1650]/70 leading-relaxed pt-1 max-w-sm">
            Everything you need to know about our mission, community programs, and how your support creates lasting impact across Africa.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 rounded-full border border-[#2E1650]/25 text-xs sm:text-sm font-medium text-[#2E1650] hover:bg-[#2E1650] hover:text-white transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>

        {/* Right Column: Individual White Rounded Accordion Cards (PureFlow style) */}
        <div className="lg:col-span-7 space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-white border border-[#2E1650]/10 rounded-2xl px-6 py-5 transition-colors hover:border-[#2E1650]/25"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-[#2E1650]">
                    {item.question}
                  </span>
                  <IconChevronDown
                    className={`w-4 h-4 text-[#2E1650]/60 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#D4A017]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-3 pr-6">
                    <p className="text-xs sm:text-sm text-[#2E1650]/75 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
