import { NextResponse } from "next/server";
import { getAllPosts } from "@/db";
import { siteConfig } from "@/content/site.config";

export const revalidate = 60;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const posts = await getAllPosts({ status: "published" });

  const rssItems = posts
    .map((post) => {
      const postUrl = `${baseUrl}/stories/${post.slug}`;
      const pubDate = new Date(post.createdAt).toUTCString();
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <description><![CDATA[${post.excerpt}]]></description>
          <pubDate>${pubDate}</pubDate>
          <category>${post.category}</category>
          <author>${siteConfig.contact.email} (${post.author?.name || "THRIVE Initiative"})</author>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title><![CDATA[${siteConfig.name} — Field Dispatches]]></title>
        <link>${baseUrl}</link>
        <description><![CDATA[${siteConfig.description}]]></description>
        <language>en-NG</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
        ${rssItems}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
