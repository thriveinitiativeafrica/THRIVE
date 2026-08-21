import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/posts";
import { ArrowUpRight } from "lucide-react";

export function BlogTeaser() {
  return (
    <section className="py-20 lg:py-28 bg-thrive-cream border-t border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        {/* Section Heading */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
            <span className="italic font-normal font-serif text-thrive-gold-600">Stories</span> and updates <br />
            from our <span className="italic font-normal font-serif text-thrive-gold-600">mission.</span>
          </h2>
        </div>

        {/* 3 Story Cards with 100% Black African Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white text-thrive-purple-900 rounded-2xl p-5 border border-gray-200 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-thrive-purple-900"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                  <span className="text-thrive-purple-900 uppercase font-bold tracking-wider">{post.category}</span>
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Cover Image with 100% Black African Subjects */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-thrive-cream border border-gray-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Read More Footer */}
              <div className="pt-3 flex items-center justify-between text-xs font-semibold text-thrive-purple-900 border-t border-gray-100 mt-4">
                <span>Read Full Story</span>
                <div className="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:bg-thrive-purple-900 group-hover:text-white group-hover:border-thrive-purple-900">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
