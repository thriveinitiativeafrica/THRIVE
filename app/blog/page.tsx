import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/posts";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Stories, Updates & Field Dispatches | THRIVE Initiative",
  description:
    "Read inspiring turnaround stories, field project chronicles, and community impact updates directly from THRIVE Initiative in Nigeria.",
};

export default function BlogListPage() {
  return (
    <div className="space-y-0">
      {/* Unified Hero Banner */}
      <section className="bg-thrive-purple-900 text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-thrive-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Voices of Hope, <br />
            <span className="italic font-normal font-serif text-thrive-gold-400">
              Chronicles of Change
            </span>
          </h1>
          <p className="text-base sm:text-lg text-thrive-purple-100/80 leading-relaxed font-normal">
            Direct dispatches from the frontlines of our community programs across Nigeria, celebrating human resilience and systemic transformation.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-thrive-purple-900"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-thrive-cream border-b border-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-thrive-ink-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author Footer */}
                <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-thrive-purple-900">{post.author.name}</div>
                      <div className="text-[10px] text-gray-500">{post.author.role}</div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-thrive-purple-900 transition-all group-hover:bg-thrive-purple-900 group-hover:text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
