import React from "react";
import Image from "next/image";
import { siteImages } from "@/content/images.config";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function Testimonials() {
  const testimonialsList = [
    {
      quote:
        "The emergency food relief arrived when our community had exhausted all options. My household received wholesome staple grains and cooking essentials that sustained my three children.",
      name: "Babatunde Alabi",
      location: "Makoko Waterfront Settlement, Lagos",
      avatar: siteImages.avatars.babatunde,
    },
    {
      quote:
        "Before THRIVE installed the solar borehole in Olomowewe, our young daughters spent hours fetching turbid water every morning. Today, our community clinic records zero dysentery cases.",
      name: "Amina Okoro",
      location: "Olomowewe Water Committee Chair",
      avatar: siteImages.avatars.amina,
    },
    {
      quote:
        "Through the vocational tailoring scholarship, I mastered garment design and received my start-up sewing machine. I now train three younger apprentices and support my family.",
      name: "Grace Adeyemi",
      location: "THRIVE Skills Academy Graduate, Lagos",
      avatar: siteImages.avatars.grace,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-thrive-cream border-t border-thrive-border relative overflow-hidden">
      {/* ProofDeck-style Animated Background */}
      <SectionBackground variant="cream" pattern="floating-elements" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center relative z-10">
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-thrive-purple-700">
            Voices of the Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
            Real <span className="italic font-normal font-serif text-thrive-gold-600">Stories, Real Impact</span>
          </h2>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {testimonialsList.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* 5 Literal Rating Stars (Bespoke SVG) */}
              <div className="flex items-center gap-1" aria-label="5 star testimonial rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-thrive-gold-500 text-thrive-gold-500"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-thrive-ink-800 leading-relaxed italic font-normal flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author & Avatar */}
              <div className="flex items-center gap-3 pt-3 border-t border-thrive-border">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-thrive-purple-100 bg-thrive-cream">
                  <Image
                    src={item.avatar.src}
                    alt={item.avatar.alt}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-thrive-purple-900 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-thrive-ink-600 mt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
