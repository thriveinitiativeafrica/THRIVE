import React from "react";
import Image from "next/image";
import { ShieldCheck, Users, HeartHandshake } from "lucide-react";

export function WhoWeAre() {
  const trustPoints = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-thrive-purple-900 butterfly-hover" />,
      title: "Transparent and Accountable",
    },
    {
      icon: <Users className="w-5 h-5 text-thrive-purple-900 butterfly-hover" />,
      title: "Community-driven Projects",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-thrive-purple-900 butterfly-hover" />,
      title: "100% Donation Goes to the Cause",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Arch Photo (5 cols) with 100% Black African Child from Pexels */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm aspect-[4/5] isolate group">
              {/* Flat Split Arch Background Geometry */}
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gray-100 border-l border-t border-b border-gray-200 rounded-tl-full rounded-bl-full -z-10 transition-transform duration-500 group-hover:-translate-x-1" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-thrive-purple-100 border-r border-t border-b border-thrive-purple-200 rounded-tr-full rounded-br-full -z-10 transition-transform duration-500 group-hover:translate-x-1" />

              {/* Central Arch Frame with Black child portrait from Pexels */}
              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden border-2 border-white bg-thrive-cream">
                <Image
                  src="https://images.pexels.com/photos/19800837/pexels-photo-19800837.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Smiling young African children representing hope and transformation"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Trust Points (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
              Who We Are
            </h2>

            <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal">
              Founded in 2024, THRIVE Initiative is a Nigerian nonprofit organization dedicated to providing clean water, nutritious food, skills acquisition, and quality education to underserved communities. We believe in the power of unity, kindness, and action.
            </p>

            {/* 3 Trust Points with unique butterfly wing icon hover */}
            <div className="space-y-4 pt-2">
              {trustPoints.map((point) => (
                <div key={point.title} className="group flex items-center gap-3.5 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-thrive-purple-100 border border-thrive-purple-200 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {point.icon}
                  </div>
                  <span className="font-serif text-base font-bold text-thrive-purple-900 transition-colors group-hover:text-thrive-purple-700">
                    {point.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
