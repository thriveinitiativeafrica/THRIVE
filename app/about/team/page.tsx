import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "About the Team",
  description:
    "Meet the leadership, field coordinators, and dedicated team members driving THRIVE Initiative initiatives across Lagos State, Nigeria.",
};

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
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

export default function TeamPage() {
  const team = getTeamMembers();

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 pb-24">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            Our Team
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          The people behind THRIVE Initiative
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          Our field teams, program directors, and grassroots volunteers work directly with local communities to design and implement sustainable interventions.
        </p>
      </section>

      {/* Team Grid or Empty State */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {team.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 sm:p-16 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF6EC] border border-gray-200 flex items-center justify-center mx-auto text-[#2E1650] font-medium">
              TI
            </div>
            <h2 className="text-xl font-medium text-[#2E1650]">Team profiles are coming soon.</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              We are currently updating our leadership and field team biographies. Please check back shortly or get in touch through our contact page to connect with our coordinators.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-6 py-2.5 border border-[#2E1650] text-[#2E1650] hover:bg-[#2E1650] hover:text-white rounded-full text-xs font-medium transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col"
              >
                {member.photo && (
                  <div className="relative w-full h-64 bg-gray-100">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-medium text-[#2E1650]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-xs text-gray-600 leading-relaxed pt-1">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
