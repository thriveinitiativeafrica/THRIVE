import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/db";
import { siteConfig } from "@/content/site.config";
import { sanitizeHtml } from "@/lib/sanitize";
import { CoverImageCarousel } from "@/components/blog/CoverImageCarousel";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const ogImageUrl =
    post.cover_image_url && !post.cover_image_url.startsWith("data:")
      ? post.cover_image_url
      : `${baseUrl}/og-default.png`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          alt: post.cover_image_alt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts({ status: "published", limit: 3 });
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // Compute reading time estimate (approx 200 words per minute)
  const wordCount = post.body.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const cleanBodyHtml = sanitizeHtml(post.body);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const slides =
    post.cover_images && post.cover_images.length > 0
      ? post.cover_images
      : post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.cover_image_alt || post.title }]
        : [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image:
      post.cover_image_url && !post.cover_image_url.startsWith("data:")
        ? post.cover_image_url
        : `${baseUrl}/og-default.png`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo/thrive-logo-clean.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <article className="space-y-12 sm:space-y-16 pt-8 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="text-xs text-gray-500 hover:text-[#2E1650] transition-colors"
          >
            Blog
          </Link>
          <span className="text-xs text-gray-300">/</span>
          <span className="text-xs text-gray-500">{post.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2E1650] leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-gray-500 pb-2 border-b border-gray-200">
          <span>
            {new Date(post.created_at).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{readTimeMinutes} min read</span>
          <span>•</span>
          <span>By {post.author}</span>
        </div>
      </header>

      {/* Cover Image or Multi-Image Carousel */}
      {slides.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoverImageCarousel slides={slides} fallbackTitle={post.title} />
        </section>
      )}

      {/* Body Content with Rich Editorial Styling */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-none text-[#2E1650] text-base sm:text-lg leading-relaxed font-normal space-y-4
            [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:leading-tight
            [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:leading-snug
            [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:mt-7 [&_h3]:mb-2.5
            [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2
            [&_p]:mb-5 [&_p]:leading-[1.75]
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2
            [&_li]:leading-relaxed
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#D4A017] [&_blockquote]:bg-white [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-[#2E1650]/90
            [&_a]:text-[#B88912] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#2E1650]
            [&_hr]:border-gray-200 [&_hr]:my-8
            [&_figure]:my-8
            [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:h-auto [&_img]:my-6"
          dangerouslySetInnerHTML={{ __html: cleanBodyHtml }}
        />

        {/* Share Links */}
        <div className="pt-12 mt-12 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <span className="font-semibold text-[#2E1650] uppercase tracking-wider">
            Share this article:
          </span>
          <div className="flex items-center gap-6 text-gray-600">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2E1650] hover:underline underline-offset-4"
            >
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2E1650] hover:underline underline-offset-4"
            >
              Share on LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2E1650] hover:underline underline-offset-4"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-gray-200 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-[#2E1650]">More from the blog</h2>
            <Link
              href="/blog"
              className="text-xs sm:text-sm font-medium text-[#2E1650] hover:underline underline-offset-4"
            >
              View all posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherPosts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 flex flex-col hover:border-gray-400 transition-colors"
              >
                {p.cover_image_url && (
                  <div className="relative w-full h-52 bg-gray-100">
                    <Image
                      src={p.cover_image_url}
                      alt={p.cover_image_alt || p.title}
                      fill
                      unoptimized={p.cover_image_url.startsWith("data:")}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <span className="text-[11px] text-gray-500">
                    {new Date(p.created_at).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h3 className="text-lg font-medium text-[#2E1650]">{p.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{p.excerpt}</p>
                  <div>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-xs font-medium text-[#2E1650] hover:underline underline-offset-4"
                    >
                      Read story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
