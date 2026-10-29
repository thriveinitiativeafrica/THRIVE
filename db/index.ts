import fs from "fs";
import path from "path";
import type {
  DbPost,
  DbVolunteerSignup,
  DbContactMessage,
  DbNewsletterSubscriber,
  PostType,
  PostStatus,
} from "./schema";

const STORE_PATH = path.join(process.cwd(), "content", "posts-store.json");

// In-memory cache
let postsCache: DbPost[] | null = null;
const inMemoryVolunteers: DbVolunteerSignup[] = [];
const inMemoryContacts: DbContactMessage[] = [];
const inMemoryNewsletters: DbNewsletterSubscriber[] = [];

function loadPostsFromDisk(): DbPost[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading posts from disk:", err);
  }
  return [];
}

function persistPostsToDisk(posts: DbPost[]) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write posts to disk (read-only filesystem):", err);
  }
}

export function getPostsStore(): DbPost[] {
  if (!postsCache) {
    postsCache = loadPostsFromDisk();
  }
  return postsCache;
}

export async function getAllPosts(options?: {
  type?: PostType;
  status?: PostStatus | "all";
  limit?: number;
}): Promise<DbPost[]> {
  const all = getPostsStore();
  let filtered = [...all];

  if (options?.type) {
    filtered = filtered.filter((p) => p.type === options.type);
  }

  if (options?.status && options.status !== "all") {
    filtered = filtered.filter((p) => p.status === options.status);
  } else if (!options?.status) {
    // Default to published only for public queries
    filtered = filtered.filter((p) => p.status === "published");
  }

  // Sort by publishDate / createdAt desc
  filtered.sort((a, b) => new Date(b.publishDate || b.createdAt).getTime() - new Date(a.publishDate || a.createdAt).getTime());

  if (options?.limit && options.limit > 0) {
    return filtered.slice(0, options.limit);
  }

  return filtered;
}

export async function getLatestPosts(limit = 6): Promise<DbPost[]> {
  return getAllPosts({ status: "published", limit });
}

export async function getPostBySlug(slug: string): Promise<DbPost | null> {
  const all = getPostsStore();
  const found = all.find((p) => p.slug === slug);
  return found || null;
}

export async function savePost(
  data: Partial<DbPost> & { title: string; content: string }
): Promise<DbPost> {
  const store = getPostsStore();
  const now = new Date().toISOString();

  // Slug generation if missing
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const existingIndex = data.id ? store.findIndex((p) => p.id === data.id) : -1;

  if (existingIndex >= 0) {
    // Update
    const updated: DbPost = {
      ...store[existingIndex],
      ...data,
      slug,
      updatedAt: now,
    };
    store[existingIndex] = updated;
    persistPostsToDisk(store);
    return updated;
  }

  // Create
  const newPost: DbPost = {
    id: `post-${Date.now()}`,
    slug,
    title: data.title,
    italicTitle: data.italicTitle,
    excerpt: data.excerpt || data.content.slice(0, 160).trim() + "...",
    content: data.content,
    type: data.type || "blog",
    category: data.category || "Field Story",
    tags: data.tags || ["Community Outreach"],
    author: data.author || {
      name: "THRIVE Field Team",
      role: "Grassroots Project Lead",
      avatar: "/images/avatar-amina.webp",
    },
    publishDate: data.publishDate || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    coverImage: data.coverImage || "/images/story-water.webp",
    coverImageAlt: data.coverImageAlt || data.title,
    inlineImages: data.inlineImages || [],
    status: data.status || "published",
    readTime: data.readTime || "4 min read",
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    createdAt: now,
    updatedAt: now,
  };

  store.unshift(newPost);
  persistPostsToDisk(store);
  return newPost;
}

export async function createPost(
  data: Partial<DbPost> & { title: string; content: string }
): Promise<DbPost> {
  return savePost(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const store = getPostsStore();
  const index = store.findIndex((p) => p.id === id);
  if (index >= 0) {
    store.splice(index, 1);
    persistPostsToDisk(store);
    return true;
  }
  return false;
}

export async function saveVolunteerSignup(
  data: Omit<DbVolunteerSignup, "id" | "createdAt">
): Promise<DbVolunteerSignup> {
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

export async function saveContactMessage(
  data: Omit<DbContactMessage, "id" | "createdAt">
): Promise<DbContactMessage> {
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

export async function saveNewsletterSubscriber(
  email: string
): Promise<DbNewsletterSubscriber> {
  const existing = inMemoryNewsletters.find(
    (n) => n.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) return existing;

  const sub: DbNewsletterSubscriber = {
    id: inMemoryNewsletters.length + 1,
    email,
    createdAt: new Date().toISOString(),
  };
  inMemoryNewsletters.unshift(sub);
  return sub;
}
