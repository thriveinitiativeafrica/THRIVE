import React from "react";

export function StatsStrip() {
  const stats = [
    {
      value: "2,500+",
      label: "Families Helped",
      detail: "Clean water & relief outreach",
      dotColor: "bg-thrive-gold-600",
    },
    {
      value: "10,000+",
      label: "Meals Served",
      detail: "Community nutrition parcels",
      dotColor: "bg-thrive-purple-500",
    },
    {
      value: "800+",
      label: "Children Educated",
      detail: "Tuition & scholastic kit sponsorships",
      dotColor: "bg-thrive-teal-600",
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-thrive-cream border border-thrive-border rounded-2xl py-6 px-6 sm:px-10 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-thrive-border">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-center text-center md:text-left ${
                idx > 0 ? "pt-5 md:pt-0 md:pl-8" : ""
              }`}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${stat.dotColor}`} aria-hidden="true" />
                <span className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900 tracking-tight">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-thrive-ink-800">
                {stat.label}
              </span>
              <span className="text-[11px] text-thrive-ink-600 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
