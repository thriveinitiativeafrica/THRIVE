import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/db";
import { SectionBackground } from "@/components/shared/SectionBackground";
import { IconCalendar, IconClock } from "@/components/shared/Icons";

export async function BlogTeaser() {
  const blogPosts = await getAllPosts({ type: "blog", status: "published", limit: 3 });
  const recentUpdates = await getAllPosts({ type: "update", status: "published", limit: 2 });

  const featured = blogPosts[0];
  const secondary = blogPosts.slice(1, 3);

  return (
    <section className="py-20 lg:py-28 bg-thrive-cream border-t border-thrive-border relative overflow-hidden">
      {/* ProofDeck-style Background Atmosphere */}
      <SectionBackground variant="cream" pattern="floating-elements" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-thrive-purple-700">
              Field Dispatches &amp; Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
              <span className="italic font-normal font-serif text-thrive-gold-600">Stories</span> and updates <br />
              from our <span className="italic font-normal font-serif text-thrive-gold-600">mission.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/stories"
              className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
            >
              Browse All Stories ({blogPosts.length})
            </Link>
            <span className="text-thrive-ink-400">&bull;</span>
            <Link
              href="/updates"
              className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
            >
              Live Field Dispatches ({recentUpdates.length})
            </Link>
          </div>
        </div>

        {/* Empty state check */}
        {!featured ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-thrive-border space-y-3">
            <h3 className="font-serif text-xl font-bold text-thrive-purple-900">
              No Field Stories Published Yet
            </h3>
            <p className="text-xs text-thrive-ink-600">
              New field stories and project chronicles will appear here once published from the Executive Studio.
            </p>
          </div>
        ) : (
          /* Editorial Asymmetric Layout (No templated 3 cards in a row) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Primary Featured Story: 7 cols */}
            <article className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-md flex flex-col justify-between group">
              <div className="space-y-5">
                <Link
                  href={`/stories/${featured.slug}`}
                  className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-thrive-cream border border-thrive-border"
                >
                  <Image
                    src={featured.coverImage}
                    alt={featured.coverImageAlt || featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-thrive-purple-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                    Featured Story &bull; {featured.category}
                  </div>
                </Link>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-thrive-ink-600">
                    <span className="flex items-center gap-1.5">
                      <IconCalendar size={13} className="text-thrive-gold-600" />
                      <span>{featured.publishDate}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <IconClock size={13} className="text-thrive-gold-600" />
                      <span>{featured.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                    <Link href={`/stories/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-thrive-ink-600 leading-relaxed font-normal">
                    {featured.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-thrive-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-thrive-border bg-thrive-cream">
                    <Image
                      src={featured.author?.avatar || "/images/avatar-amina.webp"}
                      alt={featured.author?.name || "Author"}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-thrive-purple-900">
                      {featured.author?.name}
                    </div>
                    <div className="text-[10px] text-thrive-ink-600">
                      {featured.author?.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/stories/${featured.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                >
                  Read Full Story
                </Link>
              </div>
            </article>

            {/* Secondary Editorial Stories + Live Update Dispatch: 5 cols */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {secondary.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-thrive-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between group flex-1"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <Link
                      href={`/stories/${post.slug}`}
                      className="relative w-full sm:w-36 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-thrive-cream border border-thrive-border block"
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        fill
                        sizes="150px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between text-[10px] text-thrive-ink-600">
                        <span className="font-bold text-thrive-teal-700 uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span>{post.publishDate}</span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                        <Link href={`/stories/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-thrive-ink-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-thrive-border flex items-center justify-between">
                    <span className="text-[11px] text-thrive-ink-600">{post.readTime}</span>
                    <Link
                      href={`/stories/${post.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                    >
                      Read Story
                    </Link>
                  </div>
                </article>
              ))}

              {/* Live Field Dispatch Highlight */}
              {recentUpdates.length > 0 && (
                <div className="bg-thrive-purple-900 text-white rounded-3xl p-5 border border-thrive-purple-800 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-thrive-gold-400 text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-thrive-gold-400 animate-pulse" />
                      <span>Live Field Dispatch</span>
                    </span>
                    <span className="text-[10px] text-thrive-purple-100/60 font-medium">
                      {recentUpdates[0].publishDate}
                    </span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-white line-clamp-1">
                    <Link href={`/stories/${recentUpdates[0].slug}`} className="hover:text-thrive-gold-400 transition-colors">
                      {recentUpdates[0].title}
                    </Link>
                  </h4>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[11px] text-thrive-purple-100/70">
                      Dispatched from Makoko Waterfront
                    </span>
                    <Link
                      href="/updates"
                      className="text-[11px] font-bold text-thrive-gold-400 editorial-link hover:text-thrive-gold-300 uppercase tracking-wider"
                    >
                      View All Updates
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
