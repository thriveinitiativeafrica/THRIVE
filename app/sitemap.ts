import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";
import { programsData } from "@/content/programs";
import { getAllPosts } from "@/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about/story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programsData.map((prog) => ({
    url: `${baseUrl}/programs/${prog.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const published = await getAllPosts({ status: "published" });
    postRoutes = published.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "monthly",
      priority: 0.75,
    }));
  } catch {
    // If DB is unavailable during build
  }

  return [...staticRoutes, ...programRoutes, ...postRoutes];
}
