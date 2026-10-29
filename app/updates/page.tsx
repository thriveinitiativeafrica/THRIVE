import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/db";
import { siteConfig } from "@/content/site.config";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { IconCalendar, IconClock } from "@/components/shared/Icons";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Field Updates & Live Dispatches",
  description:
    "Real-time operational dispatches, emergency relief deliveries, and outreach milestones from our teams in Lagos and Ogun.",
  openGraph: {
    title: "Field Updates & Live Dispatches | THRIVE Initiative",
    description:
      "Real-time operational dispatches, emergency relief deliveries, and outreach milestones from our teams in Lagos and Ogun.",
    url: `${siteConfig.url}/updates`,
  },
};

export default async function UpdatesFeedPage() {
  const updates = await getAllPosts({ type: "update", status: "published" });

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      {/* ProofDeck-style Header */}
      <section className="bg-thrive-purple-900 text-white py-16 sm:py-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="dual-corners" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-thrive-gold-400 animate-pulse" />
            <span>Field Dispatches Feed</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Live Field <span className="italic font-normal font-serif text-thrive-gold-400">Updates</span>
          </h1>

          <p className="text-sm sm:text-base text-thrive-purple-100/85 max-w-2xl leading-relaxed">
            Short-format, image-forward bulletins reporting on relief mobilizations, borehole completions, and community progress across Nigeria.
          </p>
        </div>
      </section>

      {/* Main Feed */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {updates.length === 0 ? (
          <div className="text-center py-16 bg-thrive-cream rounded-3xl border border-thrive-border p-8 space-y-3">
            <h2 className="font-serif text-xl font-bold text-thrive-purple-900">
              No Field Updates Recorded Yet
            </h2>
            <p className="text-xs text-thrive-ink-600">
              Operational dispatches will appear here immediately upon submission from the field team.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {updates.map((item) => (
              <article
                key={item.slug}
                className="bg-white rounded-3xl border border-thrive-border p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 space-y-6"
              >
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-thrive-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-thrive-purple-100 text-thrive-purple-900 font-bold uppercase tracking-wider text-[10px]">
                      {item.category}
                    </span>
                    <span className="text-thrive-ink-600">&bull;</span>
                    <span className="font-semibold text-thrive-ink-800">
                      Dispatched by {item.author?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-thrive-ink-600 text-[11px]">
                    <span className="flex items-center gap-1">
                      <IconCalendar size={13} className="text-thrive-gold-600" />
                      <span>{item.publishDate}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <IconClock size={13} className="text-thrive-gold-600" />
                      <span>{item.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900 leading-snug">
                    <Link href={`/stories/${item.slug}`} className="hover:text-thrive-purple-700 transition-colors">
                      {item.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-thrive-ink-800 leading-relaxed font-normal">
                    {item.excerpt}
                  </p>
                </div>

                {/* Image-forward Showcase */}
                {item.coverImage && (
                  <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-thrive-border bg-thrive-cream shadow-sm">
                    <Image
                      src={item.coverImage}
                      alt={item.coverImageAlt || item.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 850px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content preview & action */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    href={`/stories/${item.slug}`}
                    className="font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                  >
                    Read Full Field Dispatch
                  </Link>

                  <div className="flex items-center gap-2">
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-thrive-cream text-thrive-purple-900 font-semibold border border-thrive-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
