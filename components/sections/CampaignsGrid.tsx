"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, HandHeart, Check } from "lucide-react";

export function CampaignsGrid() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const campaignItems = [
    {
      title: "Clean Water Well Installation",
      dateLocation: "Lagos & Ogun Rural Hubs",
      desc: "Help us drill and install new solar-powered water boreholes to provide clean drinking water for over 2,500 people in rural communities.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
      tag1: "800+ Families Benefited",
      tag2: "20 Volunteers Needed",
    },
    {
      title: "Hunger Relief & Food Distribution",
      dateLocation: "Urban Slum Settlements, Lagos",
      desc: "Join us in packaging and distributing nutritious staple food parcels for vulnerable families and nursing mothers.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      tag1: "1,200+ Meals Goal",
      tag2: "15 Volunteers Needed",
    },
    {
      title: "Back-to-School Scholastic Kit Drive",
      dateLocation: "Public Primary Schools, Oyo & Osun",
      desc: "Support our mission to provide backpacks, notebooks, uniform vouchers, and learning materials to 800+ out-of-school children.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      tag1: "800+ Children Benefited",
      tag2: "25 Volunteers Needed",
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        {/* Section Heading */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
            <span className="italic font-normal font-serif">Join us</span> in feeding hope <br />
            and transforming lives.
          </h2>
        </div>

        {/* 3 Flat Clean Cards with Smooth Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {campaignItems.map((item) => (
            <div
              key={item.title}
              className="group bg-white text-thrive-purple-900 rounded-2xl p-5 border border-gray-200 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-thrive-purple-900"
            >
              <div className="space-y-4">
                {/* Photo with Location Overlay */}
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-thrive-cream border border-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 px-2.5 py-1 rounded text-[10px] text-white font-medium">
                    {item.dateLocation}
                  </div>
                </div>

                {/* Content */}
                <div className="px-1 space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-thrive-ink-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Meta Chips with subtle icon float */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-[10px] font-semibold text-thrive-ink-800">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 border border-gray-200 transition-colors group-hover:border-gray-300">
                  <Users className="w-3.5 h-3.5 text-thrive-purple-900 shrink-0 butterfly-hover" />
                  <span className="line-clamp-1">{item.tag1}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 border border-gray-200 transition-colors group-hover:border-gray-300">
                  <HandHeart className="w-3.5 h-3.5 text-thrive-purple-900 shrink-0 butterfly-hover" />
                  <span className="line-clamp-1">{item.tag2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Register Now Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              setSelectedTitle("Upcoming Field Campaigns");
              setRegisterOpen(true);
              setRegistered(false);
            }}
            className="px-8 py-3 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Register Now
          </button>
        </div>

        {/* Registration Modal */}
        {registerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 text-left text-thrive-purple-900">
              <button
                onClick={() => setRegisterOpen(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 text-sm font-bold"
              >
                ✕
              </button>

              {registered ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-thrive-purple-900 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">You&apos;re Registered!</h3>
                  <p className="text-xs text-gray-600">
                    Thank you, <strong>{name}</strong>. We have saved your registration for the upcoming campaign.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1">
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
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-thrive-purple-900"
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
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-thrive-purple-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Confirm Registration
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
