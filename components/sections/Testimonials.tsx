import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonialsList = [
    {
      quote:
        "The food distribution program came at the right time. My family can now eat nutritious meals every day, and my children are growing strong.",
      name: "Samuel Ndlovu",
      location: "Community Beneficiary",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote:
        "Thanks to the clean water project, our village no longer suffers from waterborne illnesses. My children are healthier, happier, and attending school regularly.",
      name: "Amina Okoro",
      location: "Lagos, Nigeria",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote:
        "With the vocational skills sponsorship, I started my tailoring and fashion enterprise. I can now support my siblings through school.",
      name: "Grace Mwangi",
      location: "Youth Academy Graduate",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-thrive-cream border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
            Real <span className="italic font-normal font-serif">Stories, Real Impact</span>
          </h2>
        </div>

        {/* 3 Testimonial Cards with Card Lift Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {testimonialsList.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-thrive-purple-900 group"
            >
              {/* 5 Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-thrive-gold-600 text-thrive-gold-600 transition-transform duration-300 group-hover:scale-110"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-thrive-ink-800 leading-relaxed italic font-normal flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author & Avatar */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-thrive-purple-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-thrive-ink-600">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <span className="w-2 h-2 rounded-full bg-thrive-purple-900" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  );
}
