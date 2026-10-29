import fs from "fs";
import path from "path";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, desc } from "drizzle-orm";
import {
  posts,
  contactMessages,
  newsletterSubscribers,
  type PostRecord,
  type CoverImageItem,
  type ContactMessage,
} from "./schema";

const STORE_PATH = path.join(process.cwd(), "content", "posts-store.json");
const CONTACTS_STORE_PATH = path.join(process.cwd(), "content", "contacts-store.json");

let postsCache: PostRecord[] | null = null;

function parseCoverImages(
  rawJson: string | null | undefined,
  fallbackUrl?: string | null,
  fallbackAlt?: string | null
): CoverImageItem[] {
  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((item) => item && typeof item.url === "string" && item.url.trim() !== "");
      }
    } catch {
      // ignore invalid JSON
    }
  }
  if (fallbackUrl) {
    return [{ url: fallbackUrl, alt: fallbackAlt || "" }];
  }
  return [];
}

function getLocalStore(): PostRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, "utf-8");
      const list: PostRecord[] = JSON.parse(data);
      return list.map((p) => ({
        ...p,
        cover_images:
          p.cover_images && p.cover_images.length > 0
            ? p.cover_images
            : p.cover_image_url
              ? [{ url: p.cover_image_url, alt: p.cover_image_alt || "" }]
              : [],
      }));
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

export interface ContactRecord {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at: string;
}

function getLocalContacts(): ContactRecord[] {
  try {
    if (fs.existsSync(CONTACTS_STORE_PATH)) {
      const data = fs.readFileSync(CONTACTS_STORE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return [];
}

function persistLocalContacts(data: ContactRecord[]) {
  try {
    const dir = path.dirname(CONTACTS_STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CONTACTS_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write contacts to local store:", err);
  }
}

type Db = ReturnType<typeof drizzle>;
const globalForDb = globalThis as unknown as {
  thriveDb?: Db;
  thriveSql?: ReturnType<typeof postgres>;
  thriveSchemaReady?: boolean;
};

function getDb(): Db | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  if (globalForDb.thriveDb) return globalForDb.thriveDb;
  try {
    const client = postgres(dbUrl, { prepare: false, max: 3, ssl: "require" });
    globalForDb.thriveSql = client;
    globalForDb.thriveDb = drizzle(client, { schema: { posts, contactMessages, newsletterSubscribers } });
    return globalForDb.thriveDb;
  } catch (err) {
    console.warn("Could not connect to Postgres, falling back to local store:", err);
    return null;
  }
}

async function ensureTables(): Promise<void> {
  if (globalForDb.thriveSchemaReady || !globalForDb.thriveSql) return;
  try {
    const sql = globalForDb.thriveSql;
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        body TEXT NOT NULL,
        cover_image_url TEXT,
        cover_image_alt TEXT,
        cover_images TEXT,
        author TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft',
        published_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        seo_title TEXT,
        seo_description TEXT
      );
    `;
    await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cover_images TEXT;`;
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    await sql`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS subject TEXT;`;
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    globalForDb.thriveSchemaReady = true;
  } catch (err) {
    console.warn("Auto-table initialization skipped:", err);
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
      await ensureTables();
      const query = db.select().from(posts);
      const results = await query.orderBy(desc(posts.createdAt));
      let filtered = results.map((r) => {
        const imgs = parseCoverImages(r.coverImages, r.coverImageUrl, r.coverImageAlt);
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          excerpt: r.excerpt,
          body: r.body,
          cover_image_url: imgs[0]?.url || r.coverImageUrl || null,
          cover_image_alt: imgs[0]?.alt || r.coverImageAlt || null,
          cover_images: imgs,
          author: r.author,
          status: (r.status === "published" ? "published" : "draft") as "published" | "draft",
          published_at: r.publishedAt ? r.publishedAt.toISOString() : null,
          created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
          updated_at: r.updatedAt ? r.updatedAt.toISOString() : new Date().toISOString(),
          seo_title: r.seoTitle,
          seo_description: r.seoDescription,
        };
      });

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
      await ensureTables();
      const results = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
      if (results.length > 0) {
        const r = results[0];
        const imgs = parseCoverImages(r.coverImages, r.coverImageUrl, r.coverImageAlt);
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          excerpt: r.excerpt,
          body: r.body,
          cover_image_url: imgs[0]?.url || r.coverImageUrl || null,
          cover_image_alt: imgs[0]?.alt || r.coverImageAlt || null,
          cover_images: imgs,
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

export async function savePost(
  data: Partial<PostRecord> & { title: string; slug: string; excerpt: string; body: string; author: string }
): Promise<PostRecord> {
  const now = new Date().toISOString();
  const id = data.id || `post-${Date.now()}`;
  const status = data.status || "draft";
  const publishedAt = status === "published" ? (data.published_at || now) : null;

  let coverImages: CoverImageItem[] = Array.isArray(data.cover_images)
    ? data.cover_images.filter((item) => item && typeof item.url === "string" && item.url.trim() !== "")
    : [];

  if (coverImages.length === 0 && data.cover_image_url) {
    coverImages = [{ url: data.cover_image_url, alt: data.cover_image_alt || data.title }];
  }

  const primaryUrl = coverImages[0]?.url || data.cover_image_url || null;
  const primaryAlt = coverImages[0]?.alt || data.cover_image_alt || null;
  const coverImagesJson = coverImages.length > 0 ? JSON.stringify(coverImages) : null;

  const postRecord: PostRecord = {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    body: data.body,
    cover_image_url: primaryUrl,
    cover_image_alt: primaryAlt,
    cover_images: coverImages,
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
      await ensureTables();
      const existing = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
      if (existing.length > 0) {
        await db
          .update(posts)
          .set({
            title: postRecord.title,
            slug: postRecord.slug,
            excerpt: postRecord.excerpt,
            body: postRecord.body,
            coverImageUrl: postRecord.cover_image_url,
            coverImageAlt: postRecord.cover_image_alt,
            coverImages: coverImagesJson,
            author: postRecord.author,
            status: postRecord.status,
            publishedAt: publishedAt ? new Date(publishedAt) : null,
            updatedAt: new Date(),
            seoTitle: postRecord.seo_title,
            seoDescription: postRecord.seo_description,
          })
          .where(eq(posts.id, id));
      } else {
        await db.insert(posts).values({
          id: postRecord.id,
          title: postRecord.title,
          slug: postRecord.slug,
          excerpt: postRecord.excerpt,
          body: postRecord.body,
          coverImageUrl: postRecord.cover_image_url,
          coverImageAlt: postRecord.cover_image_alt,
          coverImages: coverImagesJson,
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
      await ensureTables();
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

export async function saveContactMessage(
  name: string,
  email: string,
  message: string,
  subject?: string | null
): Promise<ContactRecord> {
  const now = new Date().toISOString();
  let insertedId = Date.now();

  const db = getDb();
  if (db) {
    try {
      await ensureTables();
      const res = await db
        .insert(contactMessages)
        .values({ name, email, message, subject: subject || null })
        .returning({ id: contactMessages.id });
      if (res && res[0]?.id) insertedId = res[0].id;
    } catch (err) {
      console.warn("Could not save contact message to Postgres, saving to local store:", err);
    }
  }

  const record: ContactRecord = {
    id: insertedId,
    name,
    email,
    subject: subject || null,
    message,
    created_at: now,
  };

  const localList = getLocalContacts();
  localList.unshift(record);
  persistLocalContacts(localList);
  return record;
}

export async function getAllContactMessages(): Promise<ContactRecord[]> {
  const db = getDb();
  if (db) {
    try {
      await ensureTables();
      const res = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      return res.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        subject: r.subject || null,
        message: r.message,
        created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      }));
    } catch (err) {
      console.warn("Error querying contact messages from Postgres, using local store:", err);
    }
  }
  return getLocalContacts();
}

export async function deleteContactMessage(id: number): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await ensureTables();
      await db.delete(contactMessages).where(eq(contactMessages.id, id));
    } catch (err) {
      console.warn("Could not delete contact message from Postgres:", err);
    }
  }
  const localList = getLocalContacts().filter((m) => m.id !== id);
  persistLocalContacts(localList);
  return true;
}

export async function saveNewsletterSubscriber(email: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await ensureTables();
      await db.insert(newsletterSubscribers).values({ email });
      return;
    } catch (err) {
      console.warn("Could not save subscriber to Postgres:", err);
    }
  }
}
