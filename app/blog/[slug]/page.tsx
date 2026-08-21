import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/posts";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | THRIVE Stories`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-28 pb-20 space-y-12">
      {/* Header Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-thrive-purple-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Stories</span>
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.2]">
          {post.title}
        </h1>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-thrive-purple-900">{post.author.name}</div>
              <div className="text-[11px]">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-thrive-gold-600" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-thrive-gold-600" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-gray-200 bg-thrive-cream">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-purple prose-lg max-w-none text-thrive-ink-900 leading-relaxed font-normal">
          <p className="text-lg sm:text-xl font-serif italic text-thrive-purple-900 leading-relaxed border-l-4 border-thrive-purple-900 pl-4 py-1 mb-8">
            {post.excerpt}
          </p>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-thrive-ink-800">
            {post.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={idx} className="font-serif text-2xl font-bold text-thrive-purple-900 pt-4">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("#### ")) {
                return (
                  <h4 key={idx} className="font-serif text-xl font-bold text-thrive-purple-900 pt-2">
                    {paragraph.replace("#### ", "")}
                  </h4>
                );
              }
              if (paragraph.startsWith("> ")) {
                return (
                  <blockquote key={idx} className="bg-thrive-cream p-4 rounded-xl border-l-4 border-thrive-purple-900 italic text-thrive-ink-900 my-4">
                    {paragraph.replace("> ", "")}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-8 mt-8 border-t border-gray-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-thrive-purple-900 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-gray-100 text-thrive-purple-900 text-xs font-semibold border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-gray-200">
        <h3 className="font-serif text-2xl font-bold text-thrive-purple-900 mb-6">
          More Stories from THRIVE
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((rel) => (
            <Link
              key={rel.slug}
              href={`/blog/${rel.slug}`}
              className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center gap-4 hover:border-thrive-purple-900 transition-colors group"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-thrive-cream border border-gray-200">
                <Image
                  src={rel.coverImage}
                  alt={rel.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-500">
                  {rel.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <div className="text-[11px] text-gray-500">{rel.readTime}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
