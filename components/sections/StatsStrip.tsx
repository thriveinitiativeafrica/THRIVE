import React from "react";
import { HandHeart, Utensils, GraduationCap } from "lucide-react";

export function StatsStrip() {
  const stats = [
    {
      value: "2,500+",
      label: "Families Helped",
      icon: <HandHeart className="w-5 h-5 text-thrive-gold-400 butterfly-hover" />,
    },
    {
      value: "10,000+",
      label: "Meals Served",
      icon: <Utensils className="w-5 h-5 text-thrive-gold-400 butterfly-hover" />,
    },
    {
      value: "800+",
      label: "Children Educated",
      icon: <GraduationCap className="w-5 h-5 text-thrive-gold-400 butterfly-hover" />,
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-thrive-cream border border-gray-200 rounded-2xl py-4 px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group flex items-center gap-3.5 cursor-default transition-all ${idx > 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}
            >
              <div className="w-10 h-10 rounded-xl bg-thrive-purple-900 flex items-center justify-center shrink-0 border border-thrive-purple-800 transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-thrive-purple-900 block leading-tight transition-colors group-hover:text-thrive-purple-700">
                  {stat.value} {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
