import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/db";
import { siteConfig } from "@/content/site.config";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { IconClock, IconCalendar } from "@/components/shared/Icons";

export const revalidate = 60; // ISR 60s

export const metadata: Metadata = {
  title: "Field Stories & Dispatches",
  description:
    "First-hand accounts, project milestones, and impact dispatches from our community initiatives across Lagos and rural Nigerian communities.",
  openGraph: {
    title: "Field Stories & Dispatches | THRIVE Initiative",
    description:
      "First-hand accounts, project milestones, and impact dispatches from our community initiatives across Lagos and rural Nigerian communities.",
    url: `${siteConfig.url}/stories`,
  },
};

export default async function StoriesIndexPage() {
  const allPosts = await getAllPosts({ status: "published" });

  const blogStories = allPosts.filter((p) => p.type === "blog");
  const fieldUpdates = allPosts.filter((p) => p.type === "update");

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen relative overflow-hidden">
      {/* ProofDeck-style Header Background */}
      <section className="bg-thrive-purple-900 text-white py-16 sm:py-20 relative overflow-hidden border-b border-thrive-purple-800">
        <SectionBackground variant="purple" pattern="concentric-arcs" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-thrive-gold-200 font-semibold tracking-wide">
            <span>Direct Dispatches from the Field</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Stories &amp; <span className="italic font-normal font-serif text-thrive-gold-400">Updates</span>
          </h1>

          <p className="text-sm sm:text-base text-thrive-purple-100/85 max-w-2xl leading-relaxed">
            Read verified accounts of clean water installations, school sponsorships, women&apos;s vocational cooperatives, and emergency relief distribution in Nigerian settlements.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="#field-stories"
              className="px-5 py-2 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
            >
              In-Depth Stories ({blogStories.length})
            </Link>
            <Link
              href="/updates"
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Field Dispatches Feed ({fieldUpdates.length})
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Section 1: In-depth Field Stories */}
        <section id="field-stories" className="space-y-8">
          <div className="flex items-center justify-between border-b border-thrive-border pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-thrive-gold-600">
                In-Depth Narratives
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900">
                Community Field Stories
              </h2>
            </div>
            <span className="text-xs text-thrive-ink-600 font-medium">
              Showing {blogStories.length} published stories
            </span>
          </div>

          {blogStories.length === 0 ? (
            <div className="text-center py-16 bg-thrive-cream rounded-3xl border border-thrive-border p-8 space-y-3">
              <h3 className="font-serif text-lg font-bold text-thrive-purple-900">
                No Stories Published Yet
              </h3>
              <p className="text-xs text-thrive-ink-600">
                Field stories will appear here as soon as our editorial team publishes them from the Studio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogStories.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl border border-thrive-border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Cover image */}
                    <Link href={`/stories/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-thrive-cream">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-thrive-purple-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                        {post.category}
                      </div>
                    </Link>

                    {/* Metadata */}
                    <div className="px-6 pt-1 space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-thrive-ink-600">
                        <span className="flex items-center gap-1">
                          <IconCalendar size={13} className="text-thrive-gold-600" />
                          <span>{post.publishDate}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <IconClock size={13} className="text-thrive-gold-600" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                        <Link href={`/stories/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-thrive-ink-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 mt-6 border-t border-thrive-border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-thrive-border bg-thrive-cream">
                        <Image
                          src={post.author?.avatar || "/images/avatar-amina.webp"}
                          alt={post.author?.name || "Author"}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-thrive-purple-900">
                        {post.author?.name}
                      </span>
                    </div>

                    <Link
                      href={`/stories/${post.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                    >
                      Read Story
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Field Updates Feed Preview */}
        <section className="bg-thrive-cream rounded-3xl p-8 sm:p-12 border border-thrive-border space-y-8 relative overflow-hidden">
          <SectionBackground variant="cream" pattern="floating-elements" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-thrive-border pb-4 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-thrive-purple-700">
                Short-Format Dispatches
              </span>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900">
                Recent Field Updates
              </h2>
            </div>
            <Link
              href="/updates"
              className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
            >
              View Dedicated Updates Feed ({fieldUpdates.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {fieldUpdates.slice(0, 2).map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-2xl p-5 border border-thrive-border flex flex-col sm:flex-row gap-4 items-start shadow-xs hover:shadow-md transition-all group"
              >
                <div className="relative w-full sm:w-36 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-thrive-cream border border-thrive-border">
                  <Image
                    src={item.coverImage}
                    alt={item.coverImageAlt || item.title}
                    fill
                    sizes="140px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between text-[10px] text-thrive-ink-600">
                    <span className="font-bold text-thrive-teal-700 uppercase">{item.category}</span>
                    <span>{item.publishDate}</span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 leading-snug">
                    <Link href={`/stories/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-thrive-ink-600 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/stories/${item.slug}`}
                      className="text-[11px] font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                    >
                      Read Dispatch
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
