import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "About the Team",
  description:
    "Meet the leadership, program directors, and dedicated executives driving THRIVE Initiative across Abuja, Nigeria.",
};

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  flyer?: string;
  bio?: string;
}

function getTeamMembers(): TeamMember[] {
  try {
    const filePath = path.join(process.cwd(), "content", "team.json");
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading team.json:", err);
  }
  return [];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TeamPage() {
  const team = getTeamMembers();

  return (
    <div className="space-y-16 sm:space-y-24 pt-10 pb-24">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Our Executive Team
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-[#2E1650] leading-[1.08]">
              Meet the Leaders Behind THRIVE Initiative.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-[#2E1650]/75 font-normal leading-relaxed">
              Based in Abuja, Nigeria, our founders and directors work directly with local communities to advance women empowerment, child education, skills acquisition, and social inclusion.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Team Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl border border-[#2E1650]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#D4A017]/60 transition-colors"
            >
              <div>
                {member.photo ? (
                  <div className="relative w-full h-80 bg-[#5C165E] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3.5 py-1 rounded-full bg-[#2E1650]/85 backdrop-blur-sm text-[#D4A017] text-[11px] font-semibold uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-80 bg-[#2E1650] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-[#D4A017]/15 border-2 border-[#D4A017] flex items-center justify-center text-3xl font-semibold text-[#D4A017] tracking-tight">
                      {getInitials(member.name)}
                    </div>
                    <span className="mt-4 inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#D4A017] text-[11px] font-semibold uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 space-y-3">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-[#2E1650]">
                      {member.name}
                    </h2>
                    <p className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                  </div>

                  {member.bio && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-[#2E1650]/50 mb-1">
                        Why THRIVE?
                      </p>
                      <p className="text-sm text-[#2E1650]/80 leading-relaxed font-normal">
                        &ldquo;{member.bio}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA Band */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E1650] rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-white">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D4A017]">
                Join the Movement
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
              Want to volunteer or partner with our team in Abuja?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We collaborate with community leaders, educators, health workers, and passionate volunteers across Nigeria.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-sm font-semibold transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
