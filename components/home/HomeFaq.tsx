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
      "Donations support direct program costs including clean water boreholes, school learning materials, and women vocational workshops in Lagos State. For specific financial allocations or institutional funding questions, please reach out through our Contact page.",
  },
  {
    question: "How can I volunteer with THRIVE Initiative?",
    answer:
      "We welcome volunteers who can support field outreach, educational clinics, and community logistics in Lagos. You can apply through our volunteer link or message our coordinator through the Contact page.",
  },
  {
    question: "Can our company or foundation partner with THRIVE?",
    answer:
      "Yes. We collaborate with corporate CSR departments, academic institutions, and non-profit trusts on community development initiatives. To submit a partnership inquiry, please connect with us via our Contact page.",
  },
  {
    question: "How can I follow project milestones and field updates?",
    answer:
      "You can subscribe to our newsletter in the footer, follow our official social channels, or check our Blog for dispatches on current community initiatives.",
  },
  {
    question: "Where is THRIVE Initiative registered and located?",
    answer:
      "THRIVE Initiative is an officially registered Nigerian non-governmental organization operating from Victoria Island, Lagos, Nigeria.",
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleIndex(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-medium text-[#2E1650]">
          Questions about our mission and work
        </h2>
      </div>

      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question} className="py-6">
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between text-left gap-4"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-medium text-[#2E1650]">
                  {item.question}
                </span>
                <IconChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="pt-3 pr-8">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-xs sm:text-sm text-gray-500">
        Have a question not covered above?{" "}
        <Link href="/contact" className="text-[#2E1650] font-medium hover:underline underline-offset-4">
          Contact our team directly.
        </Link>
      </div>
    </section>
  );
}
