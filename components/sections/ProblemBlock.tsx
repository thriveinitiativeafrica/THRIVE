import React from "react";
import Image from "next/image";
import { Droplet, BookOpen, Users } from "lucide-react";

export function ProblemBlock() {
  const issues = [
    {
      icon: <Droplet className="w-5 h-5 text-thrive-purple-900 butterfly-hover" />,
      title: "Lack of clean drinking water",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-thrive-purple-900 butterfly-hover" />,
      title: "Poor access to basic education",
    },
    {
      icon: <Users className="w-5 h-5 text-thrive-purple-900 butterfly-hover" />,
      title: "Communities affected by disasters",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-thrive-cream border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & 3 Bullet Issues (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
              The Problem <br />
              <span className="italic font-normal font-serif text-thrive-purple-900">
                We Can&apos;t Ignore
              </span>
            </h2>

            <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal max-w-xl">
              Across vulnerable settlements, countless families struggle daily without access to clean drinking water, healthy food, or quality schooling for their children. We bridge this gap through sustainable grassroots programs that create lasting change.
            </p>

            {/* 3 Issues List with Butterfly wing animation */}
            <div className="space-y-4 pt-2">
              {issues.map((issue) => (
                <div key={issue.title} className="group flex items-center gap-3.5 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {issue.icon}
                  </div>
                  <span className="font-serif text-base font-bold text-thrive-purple-900 transition-colors group-hover:text-thrive-purple-700">
                    {issue.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photo Frame with Flat Geometric Sector (5 cols, Neutral borders) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] isolate group">
              {/* Neutral Backdrop (No yellow outline) */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gray-200 border border-gray-300 rounded-tr-full rounded-tl-3xl rounded-br-3xl -z-10 transition-transform duration-500 group-hover:scale-102" />

              {/* Photo with Black African Community Children */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white bg-thrive-cream">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
                  alt="African children standing together in community setting"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
