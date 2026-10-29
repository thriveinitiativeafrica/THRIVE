import fs from "fs";
import path from "path";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, desc } from "drizzle-orm";
import { posts, contactMessages, newsletterSubscribers, type PostRecord } from "./schema";

const STORE_PATH = path.join(process.cwd(), "content", "posts-store.json");

let postsCache: PostRecord[] | null = null;
const inMemoryContacts: { id: number; name: string; email: string; message: string; created_at: string }[] = [];
const inMemoryNewsletters: { id: number; email: string; created_at: string }[] = [];

function getLocalStore(): PostRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local posts store:", err);
  }
  return [];
}

function persistLocalStore(data: PostRecord[]) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    postsCache = data;
  } catch (err) {
    console.warn("Could not write posts to local store:", err);
  }
}

// Works with any standard Postgres URL: Supabase, Neon, Railway, Render, Aiven, etc.
// prepare:false keeps it compatible with Supabase's transaction pooler (port 6543).
type Db = ReturnType<typeof drizzle>;
const globalForDb = globalThis as unknown as { thriveDb?: Db };

function getDb(): Db | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  if (globalForDb.thriveDb) return globalForDb.thriveDb;
  try {
    const client = postgres(dbUrl, { prepare: false, max: 3, ssl: "require" });
    globalForDb.thriveDb = drizzle(client, { schema: { posts, contactMessages, newsletterSubscribers } });
    return globalForDb.thriveDb;
  } catch (err) {
    console.warn("Could not connect to Postgres, falling back to local store:", err);
    return null;
  }
}

export async function getAllPosts(options?: {
  status?: "published" | "draft" | "all";
  limit?: number;
}): Promise<PostRecord[]> {
  const statusFilter = options?.status ?? "published";
  const limit = options?.limit;
  const db = getDb();

  if (db) {
    try {
      let query = db.select().from(posts);
      const results = await query.orderBy(desc(posts.createdAt));
      let filtered = results.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        excerpt: r.excerpt,
        body: r.body,
        cover_image_url: r.coverImageUrl,
        cover_image_alt: r.coverImageAlt,
        author: r.author,
        status: (r.status === "published" ? "published" : "draft") as "published" | "draft",
        published_at: r.publishedAt ? r.publishedAt.toISOString() : null,
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
        updated_at: r.updatedAt ? r.updatedAt.toISOString() : new Date().toISOString(),
        seo_title: r.seoTitle,
        seo_description: r.seoDescription,
      }));

      if (statusFilter !== "all") {
        filtered = filtered.filter((p) => p.status === statusFilter);
      }
      if (limit) {
        filtered = filtered.slice(0, limit);
      }
      return filtered;
    } catch (err) {
      console.warn("Error querying posts from Postgres, using local store:", err);
    }
  }

  // Fallback to local store
  if (!postsCache) {
    postsCache = getLocalStore();
  }
  let filtered = [...postsCache];
  if (statusFilter !== "all") {
    filtered = filtered.filter((p) => p.status === statusFilter);
  }
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  if (limit) {
    filtered = filtered.slice(0, limit);
  }
  return filtered;
}

export async function getPostBySlug(slug: string): Promise<PostRecord | null> {
  const db = getDb();
  if (db) {
    try {
      const results = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
      if (results.length > 0) {
        const r = results[0];
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          excerpt: r.excerpt,
          body: r.body,
          cover_image_url: r.coverImageUrl,
          cover_image_alt: r.coverImageAlt,
          author: r.author,
          status: (r.status === "published" ? "published" : "draft") as "published" | "draft",
          published_at: r.publishedAt ? r.publishedAt.toISOString() : null,
          created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
          updated_at: r.updatedAt ? r.updatedAt.toISOString() : new Date().toISOString(),
          seo_title: r.seoTitle,
          seo_description: r.seoDescription,
        };
      }
    } catch (err) {
      console.warn("Error querying post from Postgres, using local store:", err);
    }
  }

  const all = getLocalStore();
  return all.find((p) => p.slug === slug) || null;
}

export async function savePost(data: Partial<PostRecord> & { title: string; slug: string; excerpt: string; body: string; author: string }): Promise<PostRecord> {
  const now = new Date().toISOString();
  const id = data.id || `post-${Date.now()}`;
  const status = data.status || "draft";
  const publishedAt = status === "published" ? (data.published_at || now) : null;

  const postRecord: PostRecord = {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    body: data.body,
    cover_image_url: data.cover_image_url || null,
    cover_image_alt: data.cover_image_alt || null,
    author: data.author,
    status,
    published_at: publishedAt,
    created_at: data.created_at || now,
    updated_at: now,
    seo_title: data.seo_title || null,
    seo_description: data.seo_description || null,
  };

  const db = getDb();
  if (db) {
    try {
      const existing = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
      if (existing.length > 0) {
        await db.update(posts).set({
          title: postRecord.title,
          slug: postRecord.slug,
          excerpt: postRecord.excerpt,
          body: postRecord.body,
          coverImageUrl: postRecord.cover_image_url,
          coverImageAlt: postRecord.cover_image_alt,
          author: postRecord.author,
          status: postRecord.status,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          updatedAt: new Date(),
          seoTitle: postRecord.seo_title,
          seoDescription: postRecord.seo_description,
        }).where(eq(posts.id, id));
      } else {
        await db.insert(posts).values({
          id: postRecord.id,
          title: postRecord.title,
          slug: postRecord.slug,
          excerpt: postRecord.excerpt,
          body: postRecord.body,
          coverImageUrl: postRecord.cover_image_url,
          coverImageAlt: postRecord.cover_image_alt,
          author: postRecord.author,
          status: postRecord.status,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          createdAt: new Date(),
          updatedAt: new Date(),
          seoTitle: postRecord.seo_title,
          seoDescription: postRecord.seo_description,
        });
      }
    } catch (err) {
      console.warn("Could not save post to Postgres, saving to local store:", err);
    }
  }

  // Also persist to local store
  const current = getLocalStore();
  const idx = current.findIndex((p) => p.id === id);
  if (idx >= 0) {
    current[idx] = postRecord;
  } else {
    current.unshift(postRecord);
  }
  persistLocalStore(current);

  return postRecord;
}

export async function deletePost(id: string): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db.delete(posts).where(eq(posts.id, id));
    } catch (err) {
      console.warn("Could not delete post from Postgres:", err);
    }
  }

  const current = getLocalStore();
  const filtered = current.filter((p) => p.id !== id);
  persistLocalStore(filtered);
  return true;
}

export async function saveContactMessage(name: string, email: string, message: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await db.insert(contactMessages).values({ name, email, message });
      return;
    } catch (err) {
      console.warn("Could not save contact message to Postgres, saving to memory:", err);
    }
  }
  inMemoryContacts.push({
    id: inMemoryContacts.length + 1,
    name,
    email,
    message,
    created_at: new Date().toISOString(),
  });
}

export async function saveNewsletterSubscriber(email: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await db.insert(newsletterSubscribers).values({ email });
      return;
    } catch (err) {
      console.warn("Could not save subscriber to Postgres, saving to memory:", err);
    }
  }
  if (!inMemoryNewsletters.some((n) => n.email.toLowerCase() === email.toLowerCase())) {
    inMemoryNewsletters.push({
      id: inMemoryNewsletters.length + 1,
      email,
      created_at: new Date().toISOString(),
    });
  }
}
