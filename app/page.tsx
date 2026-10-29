import React from "react";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/content/programs";
import { getAllPosts } from "@/db";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeDonateBand } from "@/components/home/HomeDonateBand";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const publishedPosts = await getAllPosts({ status: "published", limit: 3 });
  const featuredPrograms = programsData.slice(0, 3);
  const additionalPrograms = programsData.slice(2, 5);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section (PureFlow Screenshot 3) */}
      <HomeHero />

      {/* 2. About Section (PureFlow Screenshot 3) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                About Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#2E1650] leading-[1.12]">
              Grassroots community development across Africa.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-7">
            <p className="text-xl sm:text-2xl text-[#2E1650] leading-[1.45] font-normal tracking-tight">
              Together, we empower women, children, and youth across underserved African communities. Headquartered in Abuja, Nigeria and expanding outward across the continent, we combine quality education, vocational skills, health outreach, and advocacy to help families build lasting self-reliance and dignity.
            </p>
            <div>
              <Link
                href="/about/story"
                className="inline-block px-7 py-3 border border-[#2E1650]/30 text-[#2E1650] hover:bg-[#2E1650] hover:text-white rounded-full text-xs sm:text-sm font-medium transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Large Rounded Feature Image Banner (PureFlow Screenshot 3) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[340px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-gray-200">
          <Image
            src="/images/who-we-are.webp"
            alt="Community members and volunteers gathered at a THRIVE outreach initiative"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </section>

      {/* 4. Featured Programs — Full-Bleed Portrait Overlay Cards (PureFlow Screenshot 2) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Featured
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#2E1650] leading-[1.1]">
              Featured Programs
            </h2>
            <Link
              href="/programs"
              className="text-xs sm:text-sm font-medium text-[#2E1650] hover:text-[#D4A017] transition-colors"
            >
              View All Programs →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrograms.map((prog) => (
            <div
              key={prog.slug}
              className="relative h-[430px] sm:h-[460px] rounded-2xl overflow-hidden flex flex-col justify-end p-6 sm:p-7 bg-[#2E1650]"
            >
              <Image
                src={prog.heroImage}
                alt={prog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Bottom contrast scrim */}
              <div className="absolute inset-0 bg-[#2E1650]/45" />
              <div className="relative z-10 bg-[#2E1650]/85 backdrop-blur-sm border border-white/15 rounded-2xl p-5 space-y-3 text-white">
                <h3 className="text-xl font-medium tracking-tight text-white leading-snug">
                  {prog.shortTitle}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                  {prog.subtitle}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="inline-block px-5 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-[#2E1650] text-white text-xs font-medium transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Gold Brand Highlight Section (PureFlow Screenshot 2 Yellow Band) */}
      <section className="bg-[#E5B83B] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E1650]" />
                <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                  Our Impact Pillars
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#2E1650] leading-[1.08]">
                Make a Meaningful Difference Today
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#2E1650]/85 leading-relaxed">
                Every program we run across African communities is designed with local leaders to ensure resources reach the women, children, and youth who need them most.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalPrograms.map((prog) => (
              <div
                key={prog.slug}
                className="bg-[#ECC754] border border-[#2E1650]/15 rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[250px] space-y-6"
              >
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#2E1650]">
                    {prog.shortTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2E1650]/80 leading-relaxed">
                    {prog.subtitle}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="inline-block px-5 py-2.5 rounded-full border border-[#2E1650]/40 hover:bg-[#2E1650] hover:text-white text-[#2E1650] text-xs font-semibold transition-colors"
                  >
                    Explore Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Split Image + Text Section (PureFlow Screenshot 1 & 2 "Building Systems That Last") */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src="/images/gallery-2.webp"
                alt="THRIVE Initiative field coordinators working with community members"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Our Approach
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#2E1650] leading-[1.12]">
              Building African Community Systems That Last for Generations.
            </h2>
            <p className="text-sm sm:text-base text-[#2E1650]/75 leading-relaxed">
              We do more than provide temporary relief. Headquartered in Abuja, THRIVE Initiative equips women with business skills, keeps children in school with mentorship and learning supplies, and advocates for inclusive community policies across Africa.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about/team"
                className="inline-block px-6 py-3 rounded-full border border-[#2E1650]/30 text-[#2E1650] hover:bg-[#2E1650] hover:text-white text-xs sm:text-sm font-medium transition-colors"
              >
                Meet Our Team
              </Link>
              <Link
                href="/programs"
                className="inline-block px-6 py-3 rounded-full bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-xs sm:text-sm font-semibold transition-colors"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Blog Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Updates & Dispatches
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#2E1650]">
              From the Blog
            </h2>
          </div>
          {publishedPosts.length > 0 && (
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-full border border-[#2E1650]/25 text-xs font-medium text-[#2E1650] hover:bg-[#2E1650] hover:text-white transition-colors"
            >
              View All Posts
            </Link>
          )}
        </div>

        {publishedPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#2E1650]/10 p-12 text-center">
            <p className="text-sm text-[#2E1650]/70">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {publishedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#2E1650]/10 flex flex-col justify-between"
              >
                <div>
                  {post.cover_image_url && (
                    <div className="relative w-full h-52 bg-gray-100">
                      <Image
                        src={post.cover_image_url}
                        alt={post.cover_image_alt || post.title}
                        fill
                        unoptimized={post.cover_image_url.startsWith("data:")}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-2.5">
                    <span className="text-[11px] font-medium text-[#2E1650]/60 block">
                      {new Date(post.created_at).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <h3 className="text-lg font-medium text-[#2E1650] leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#2E1650]/75 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block px-5 py-2 rounded-full border border-[#2E1650]/25 text-xs font-medium text-[#2E1650] hover:bg-[#2E1650] hover:text-white transition-colors"
                  >
                    Read Story
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 8. FAQ Section (PureFlow Screenshot 1) */}
      <HomeFaq />

      {/* 9. Donate Band (PureFlow Screenshot 1) */}
      <HomeDonateBand />
    </div>
  );
}
