import React from "react";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/content/programs";
import { getAllPosts } from "@/db";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeDonateBand } from "@/components/home/HomeDonateBand";

export default async function HomePage() {
  const publishedPosts = await getAllPosts({ status: "published", limit: 3 });

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            About us
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2E1650] leading-tight">
              Grassroots community development rooted in Lagos.
            </h2>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              THRIVE Initiative is a registered Nigerian non-governmental organization dedicated to sustainable community progress. We partner with local leaders, families, and volunteers to deliver vital programs in clean water, child education, women empowerment, and vocational skills.
            </p>
            <div>
              <Link
                href="/about/story"
                className="inline-block px-6 py-3 border border-[#2E1650] text-[#2E1650] hover:bg-[#2E1650] hover:text-white rounded-full text-sm font-medium transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. One Large Rounded Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[340px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden bg-gray-200">
          <Image
            src="/images/who-we-are.webp"
            alt="Community members and volunteers gathered at a THRIVE outreach center in Lagos"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </section>

      {/* 4. Programs Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
              Programs
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#2E1650]">
            Our core intervention areas
          </h2>
        </div>

        {/* PureFlow Featured Style Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programsData.map((prog) => (
            <div
              key={prog.slug}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 flex flex-col hover:border-gray-400 transition-colors"
            >
              <div className="relative w-full h-56 bg-gray-100">
                <Image
                  src={prog.heroImage}
                  alt={prog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-[#2E1650]">{prog.shortTitle}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {prog.subtitle}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="text-xs sm:text-sm font-medium text-[#2E1650] hover:underline underline-offset-4"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Blog Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Blog
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-[#2E1650]">From the blog</h2>
          </div>
          {publishedPosts.length > 0 && (
            <Link
              href="/blog"
              className="text-xs sm:text-sm font-medium text-[#2E1650] hover:underline underline-offset-4"
            >
              View all posts
            </Link>
          )}
        </div>

        {publishedPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
            <p className="text-sm text-gray-600">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {publishedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 flex flex-col"
              >
                {post.cover_image_url && (
                  <div className="relative w-full h-48 bg-gray-100">
                    <Image
                      src={post.cover_image_url}
                      alt={post.cover_image_alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-gray-500 block">
                      {new Date(post.created_at).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <h3 className="text-lg font-medium text-[#2E1650] leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-medium text-[#2E1650] hover:underline underline-offset-4"
                    >
                      Read story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. FAQ Section */}
      <HomeFaq />

      {/* 7. Donate Band */}
      <HomeDonateBand />
    </div>
  );
}
