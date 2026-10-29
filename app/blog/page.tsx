import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/db";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest field dispatches, community reports, and project turnaround updates from THRIVE Initiative in Lagos, Nigeria.",
};

export const revalidate = 60; // ISR revalidation

export default async function BlogIndexPage() {
  const publishedPosts = await getAllPosts({ status: "published" });

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 pb-24">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
            From the Blog
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2E1650] max-w-3xl leading-[1.1]">
          Field dispatches and community updates
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          Stories and verified milestones from our clean water, child literacy, and women empowerment initiatives in Nigeria.
        </p>
      </section>

      {/* Posts Grid or Empty State */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {publishedPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 sm:p-16 text-center space-y-3 max-w-xl mx-auto shadow-sm">
            <h2 className="text-xl font-medium text-[#2E1650]">No posts yet. Check back soon.</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Our communications team is preparing new field reports. Check back shortly for updates on our ongoing community programs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 flex flex-col hover:border-gray-400 transition-colors"
              >
                {post.cover_image_url && (
                  <div className="relative w-full h-56 bg-gray-100">
                    <Image
                      src={post.cover_image_url}
                      alt={post.cover_image_alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-xl font-medium text-[#2E1650] leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs sm:text-sm font-medium text-[#2E1650] hover:underline underline-offset-4"
                    >
                      Read full story
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
