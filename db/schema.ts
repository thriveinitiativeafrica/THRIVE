import { pgTable, text, timestamp, varchar, serial } from "drizzle-orm/pg-core";

export interface CoverImageItem {
  url: string;
  alt?: string;
}

export const posts = pgTable("posts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  coverImageUrl: text("cover_image_url"),
  coverImageAlt: text("cover_image_alt"),
  coverImages: text("cover_images"), // JSON string of CoverImageItem[]
  author: varchar("author", { length: 128 }).notNull(),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  cover_image_alt?: string | null;
  cover_images?: CoverImageItem[];
  author: string;
  status: "draft" | "published";
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  seo_title?: string | null;
  seo_description?: string | null;
}
