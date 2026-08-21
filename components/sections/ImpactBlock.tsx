import React from "react";
import Image from "next/image";
import Link from "next/link";

export function ImpactBlock() {
  const highlights = [
    {
      title: "Clean Water Projects",
      desc: "Installed 120+ water wells in rural areas.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
      href: "/programs/community-development",
    },
    {
      title: "Food Security Programs",
      desc: "Served over 10,000 nutritious meals in 2024.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      href: "/programs/community-development",
    },
    {
      title: "Education for All",
      desc: "Provided free learning materials to 800+ children.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      href: "/programs/child-education",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-thrive-purple-900 text-white relative overflow-hidden border-y border-thrive-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-gold-400 leading-[1.15]">
            Our <span className="italic font-normal font-serif">Impact</span> So Far
          </h2>
        </div>

        {/* 3 Flat White Cards Grid with Smooth Card Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white text-thrive-purple-900 rounded-2xl p-4 sm:p-5 border border-gray-200 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-thrive-purple-900"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-thrive-cream border border-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="px-1 pb-1">
                  <h3 className="font-serif text-lg font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-thrive-ink-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
