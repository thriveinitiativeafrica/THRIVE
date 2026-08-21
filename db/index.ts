import { blogPosts as seedPosts, type BlogPost } from "@/content/posts";
import type { DbContactMessage, DbNewsletterSubscriber, DbPost, DbVolunteerSignup } from "./schema";

// In-memory runtime store that supports fallback operation when Neon DATABASE_URL is not set
const inMemoryPosts: DbPost[] = seedPosts.map((p, idx) => ({
  id: idx + 1,
  slug: p.slug,
  title: p.title,
  italicTitle: p.italicTitle,
  excerpt: p.excerpt,
  content: p.content,
  coverImageUrl: p.coverImage,
  category: p.category,
  published: true,
  publishedAt: p.date,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readTime: p.readTime,
}));

const inMemoryVolunteers: DbVolunteerSignup[] = [];
const inMemoryContacts: DbContactMessage[] = [];
const inMemoryNewsletters: DbNewsletterSubscriber[] = [];

export async function getLatestPosts(limit = 6): Promise<DbPost[]> {
  return inMemoryPosts.filter((p) => p.published).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<DbPost | null> {
  const post = inMemoryPosts.find((p) => p.slug === slug);
  return post || null;
}

export async function createPost(data: Omit<DbPost, "id" | "createdAt" | "updatedAt">): Promise<DbPost> {
  const newPost: DbPost = {
    id: inMemoryPosts.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: data.published ? new Date().toISOString() : undefined,
    ...data,
  };
  inMemoryPosts.unshift(newPost);
  return newPost;
}

export async function saveVolunteerSignup(data: Omit<DbVolunteerSignup, "id" | "createdAt">): Promise<DbVolunteerSignup> {
  const signup: DbVolunteerSignup = {
    id: inMemoryVolunteers.length + 1,
    createdAt: new Date().toISOString(),
    ...data,
  };
  inMemoryVolunteers.unshift(signup);
  return signup;
}

export async function getVolunteerSignups(): Promise<DbVolunteerSignup[]> {
  return inMemoryVolunteers;
}

export async function saveContactMessage(data: Omit<DbContactMessage, "id" | "createdAt">): Promise<DbContactMessage> {
  const contact: DbContactMessage = {
    id: inMemoryContacts.length + 1,
    createdAt: new Date().toISOString(),
    ...data,
  };
  inMemoryContacts.unshift(contact);
  return contact;
}

export async function getContactMessages(): Promise<DbContactMessage[]> {
  return inMemoryContacts;
}

export async function saveNewsletterSubscriber(email: string): Promise<DbNewsletterSubscriber> {
  const existing = inMemoryNewsletters.find((n) => n.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  const sub: DbNewsletterSubscriber = {
    id: inMemoryNewsletters.length + 1,
    email,
    createdAt: new Date().toISOString(),
  };
  inMemoryNewsletters.unshift(sub);
  return sub;
}
