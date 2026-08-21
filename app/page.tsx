import React from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { ProblemBlock } from "@/components/sections/ProblemBlock";
import { ImpactBlock } from "@/components/sections/ImpactBlock";
import { DonateBlock } from "@/components/sections/DonateBlock";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { CampaignsGrid } from "@/components/sections/CampaignsGrid";
import { BlogTeaser } from "@/components/sections/BlogTeaser";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section (Purple 900) */}
      <Hero />

      {/* 2. Stats Strip Overlapping Hero (Cream) */}
      <StatsStrip />

      {/* 3. Who We Are (White) */}
      <WhoWeAre />

      {/* 4. The Problem We Can't Ignore (Cream) */}
      <ProblemBlock />

      {/* 5. Our Impact So Far (Purple 900) */}
      <ImpactBlock />

      {/* 6. Make a Difference / Donate (White) */}
      <DonateBlock />

      {/* 7. Be Part of the Change / Volunteer CTA (Purple 900 Split) */}
      <VolunteerCTA />

      {/* 8. Real Stories, Real Impact / Testimonials (Cream) */}
      <Testimonials />

      {/* 9. Join Us / Upcoming Campaigns (White) */}
      <CampaignsGrid />

      {/* 10. Stories and Updates / Latest Blog Posts (Purple 900) */}
      <BlogTeaser />
    </>
  );
}
