"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteImages } from "@/content/images.config";
import { IconUsers, IconHeart, IconCheck, IconClose } from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function CampaignsGrid() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const campaignItems = [
    {
      title: "Clean Water Borehole Commissioning",
      dateLocation: "Ogun Rural Hubs • Nov 2026",
      desc: "Support our engineering volunteers as we commission a new solar-powered aquifer borehole serving over 2,500 rural residents.",
      image: siteImages.impact.water,
      tag1: "800+ Families Benefited",
      tag2: "20 Volunteers Needed",
    },
    {
      title: "Community Nutrition & Food Distribution",
      dateLocation: "Makoko Waterfront, Lagos • Dec 2026",
      desc: "Join our weekend packing and distribution team assembling nutritious staple food hampers for low-income households.",
      image: siteImages.impact.food,
      tag1: "1,200+ Meals Goal",
      tag2: "15 Volunteers Needed",
    },
    {
      title: "Back-to-School Scholastic Kit Drive",
      dateLocation: "Ajegunle Partner Schools • Jan 2027",
      desc: "Deliver backpacks, textbooks, uniforms, and stationery kits to out-of-school children returning to primary classrooms.",
      image: siteImages.impact.education,
      tag1: "800+ Children Enrolled",
      tag2: "25 Volunteers Needed",
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-thrive-border relative overflow-hidden">
      {/* ProofDeck-style Background Atmosphere */}
      <SectionBackground variant="white" pattern="concentric-arcs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center relative z-10">
        {/* Section Heading */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-thrive-gold-600">
            Upcoming Field Mobilization
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
            <span className="italic font-normal font-serif text-thrive-gold-600">Join Us</span> on the Ground
          </h2>
          <p className="text-sm sm:text-base text-thrive-ink-600 leading-relaxed font-normal">
            Take part in hands-on outreach projects across Lagos and southwestern communities.
          </p>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {campaignItems.map((item) => (
            <div
              key={item.title}
              className="bg-white text-thrive-purple-900 rounded-3xl p-5 sm:p-6 border border-thrive-border flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                {/* Photo with Date/Location Badge */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-thrive-cream border border-thrive-border">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-thrive-purple-900/90 text-white px-3 py-1.5 rounded-xl text-[10px] font-semibold tracking-wide backdrop-blur-xs">
                    {item.dateLocation}
                  </div>
                </div>

                {/* Content */}
                <div className="px-1 space-y-2">
                  <h3 className="font-serif text-lg font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Meta Chips */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-thrive-border text-[10px] font-bold text-thrive-ink-800">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-thrive-cream/60 border border-thrive-border">
                  <IconUsers className="w-3.5 h-3.5 text-thrive-purple-900 shrink-0" size={14} />
                  <span className="line-clamp-1">{item.tag1}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-thrive-cream/60 border border-thrive-border">
                  <IconHeart className="w-3.5 h-3.5 text-thrive-gold-600 shrink-0" size={14} />
                  <span className="line-clamp-1">{item.tag2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Register Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              setSelectedTitle("Upcoming Field Campaigns");
              setRegisterOpen(true);
              setRegistered(false);
            }}
            className="px-9 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Register for Upcoming Campaign
          </button>
        </div>

        {/* Registration Modal */}
        {registerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-2xl text-left text-thrive-purple-900">
              <button
                onClick={() => setRegisterOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-thrive-ink-600 hover:bg-thrive-cream transition-colors"
                aria-label="Close modal"
              >
                <IconClose size={18} />
              </button>

              {registered ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                    <IconCheck size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold">You&apos;re Registered!</h3>
                  <p className="text-xs text-thrive-ink-600 leading-relaxed">
                    Thank you, <strong>{name}</strong>. Our field coordinator will send full briefing documents to <strong>{email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-thrive-gold-600">
                      Community Volunteer Registration
                    </span>
                    <h3 className="font-serif text-xl font-bold">{selectedTitle}</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Alabi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="babatunde@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Confirm Field Registration
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
