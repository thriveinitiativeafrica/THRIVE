import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/db";
import { siteConfig } from "@/content/site.config";
import { SectionBackground } from "@/components/shared/SectionBackground";
import {
  IconCalendar,
  IconClock,
  IconCopy,
  IconCheck,
} from "@/components/shared/Icons";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts({ status: "published" });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Story Not Found",
    };
  }

  const title = post.seoTitle || `${post.title} | THRIVE Initiative`;
  const description = post.seoDescription || post.excerpt;
  const url = `${siteConfig.url}/stories/${post.slug}`;
  const ogImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteConfig.url}${post.coverImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.createdAt,
      authors: [post.author?.name || "THRIVE Initiative"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || (post.status !== "published" && process.env.NODE_ENV === "production")) {
    notFound();
  }

  // Related posts
  const allPosts = await getAllPosts({ status: "published", limit: 6 });
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteConfig.url}${post.coverImage}`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "THRIVE Field Team",
      jobTitle: post.author?.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo/thrive-emblem.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/stories/${post.slug}`,
    },
  };

  // Breadcrumbs JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stories",
        item: `${siteConfig.url}/stories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/stories/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="pt-28 pb-24 bg-white min-h-screen">
        {/* Header Breadcrumb & Category */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-thrive-ink-600 font-medium">
            <Link href="/" className="editorial-link hover:text-thrive-purple-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/stories" className="editorial-link hover:text-thrive-purple-900">
              Stories
            </Link>
            <span>/</span>
            <span className="text-thrive-purple-900 font-semibold truncate max-w-xs">
              {post.category}
            </span>
          </nav>

          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-thrive-purple-100 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider">
              {post.category} &bull; {post.type === "update" ? "Field Update" : "Field Story"}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-thrive-purple-900 leading-[1.15]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-thrive-ink-600 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author bar */}
            <div className="pt-4 border-y border-thrive-border py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-thrive-purple-100 bg-thrive-cream shrink-0">
                  <Image
                    src={post.author?.avatar || "/images/avatar-amina.webp"}
                    alt={post.author?.name || "Author"}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-serif text-sm font-bold text-thrive-purple-900 leading-tight">
                    {post.author?.name}
                  </div>
                  <div className="text-[11px] text-thrive-ink-600">
                    {post.author?.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-thrive-ink-600">
                <span className="flex items-center gap-1.5">
                  <IconCalendar size={14} className="text-thrive-gold-600" />
                  <span>{post.publishDate}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <IconClock size={14} className="text-thrive-gold-600" />
                  <span>{post.readTime}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="relative aspect-[16/10] sm:aspect-[21/10] rounded-3xl overflow-hidden border border-thrive-border shadow-md bg-thrive-cream">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
              priority
            />
          </div>
          {post.coverImageAlt && (
            <p className="text-xs text-thrive-ink-600 text-center mt-2.5 italic">
              {post.coverImageAlt}
            </p>
          )}
        </div>

        {/* Main Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="prose prose-purple max-w-none text-thrive-ink-800 leading-relaxed font-normal space-y-6 text-sm sm:text-base">
            {post.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h2
                    key={idx}
                    className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900 mt-8 mb-4 tracking-tight"
                  >
                    {trimmed.replace(/^### /, "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-serif text-xl sm:text-2xl font-bold text-thrive-purple-900 mt-6 mb-3 tracking-tight"
                  >
                    {trimmed.replace(/^#### /, "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={idx}
                    className="p-6 my-6 border-l-4 border-thrive-gold-600 bg-thrive-cream rounded-r-2xl italic text-thrive-ink-900 font-serif text-base sm:text-lg leading-relaxed shadow-xs"
                  >
                    {trimmed.replace(/^> /, "").split("\n").map((line, lidx) => (
                      <p key={lidx} className="my-1">
                        {line.replace(/^>\s*/, "")}
                      </p>
                    ))}
                  </blockquote>
                );
              }
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").map((l) => l.replace(/^[-*]\s*/, ""));
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 my-4 text-thrive-ink-800">
                    {items.map((it, itemIdx) => (
                      <li key={itemIdx} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                );
              }
              if (trimmed.startsWith("1. ")) {
                const items = trimmed.split("\n").map((l) => l.replace(/^\d+\.\s*/, ""));
                return (
                  <ol key={idx} className="space-y-2 list-decimal pl-5 my-4 text-thrive-ink-800">
                    {items.map((it, itemIdx) => (
                      <li key={itemIdx} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ol>
                );
              }
              // Inline image check: ![alt](url "caption")
              const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/);
              if (imgMatch) {
                const [, alt, url, caption] = imgMatch;
                return (
                  <figure key={idx} className="my-8 space-y-2">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-thrive-border bg-thrive-cream shadow-sm">
                      <Image
                        src={url}
                        alt={alt || "Field photo"}
                        fill
                        sizes="(max-width: 800px) 100vw, 750px"
                        className="object-cover"
                      />
                    </div>
                    {caption && (
                      <figcaption className="text-xs text-center text-thrive-ink-600 italic">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return (
                <p
                  key={idx}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                  }}
                />
              );
            })}
          </div>

          {/* Inline Images Gallery from model if specified */}
          {post.inlineImages && post.inlineImages.length > 0 && (
            <div className="pt-8 border-t border-thrive-border space-y-6">
              <h3 className="font-serif text-lg font-bold text-thrive-purple-900">
                Field Photo Documentation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {post.inlineImages.map((img, i) => (
                  <figure key={i} className="space-y-2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-thrive-border bg-thrive-cream shadow-sm">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        sizes="400px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-xs text-thrive-ink-600 italic">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Plain Text Share Links (Strictly NO arrows!) */}
          <div className="pt-8 mt-12 border-t border-thrive-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-thrive-purple-900 uppercase tracking-wider">
                Tags:
              </span>
              {post.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-thrive-cream text-thrive-purple-900 border border-thrive-border font-semibold text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-thrive-ink-600 font-semibold">
              <span>Share Story:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/stories/${post.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="editorial-link hover:text-thrive-purple-900"
              >
                X (Twitter)
              </a>
              <span>&bull;</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/stories/${post.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="editorial-link hover:text-thrive-purple-900"
              >
                LinkedIn
              </a>
              <span>&bull;</span>
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteConfig.url}/stories/${post.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="editorial-link hover:text-thrive-purple-900"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <aside className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 mt-16 border-t border-thrive-border space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-thrive-gold-600">
                Continue Reading
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-thrive-purple-900">
                Related Field Stories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="bg-white rounded-3xl border border-thrive-border overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <Link href={`/stories/${item.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-thrive-cream">
                      <Image
                        src={item.coverImage}
                        alt={item.coverImageAlt || item.title}
                        fill
                        sizes="350px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <div className="p-5 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-thrive-teal-700 tracking-wider">
                        {item.category}
                      </div>
                      <h3 className="font-serif text-base font-bold text-thrive-purple-900 group-hover:text-thrive-purple-700 leading-snug">
                        <Link href={`/stories/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-thrive-ink-600 line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1">
                    <Link
                      href={`/stories/${item.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-thrive-purple-900 editorial-link hover:text-thrive-gold-600"
                    >
                      Read Story
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        )}
      </article>
    </>
  );
}
