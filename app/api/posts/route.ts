import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost } from "@/db";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/sanitize";

function isAdmin(req: NextRequest) {
  const token = req.cookies.get("thrive_admin_session")?.value;
  const secret = process.env.SESSION_SECRET || "thrive_secure_session_secret_2026";
  return Boolean(token && verifyToken(token, secret));
}

function revalidateBlog(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
  } catch {
    // revalidation is best effort
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requested = searchParams.get("status") as "published" | "draft" | "all" | null;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;

  // Drafts are only visible to a signed-in admin.
  const status = requested && requested !== "published" && isAdmin(req) ? requested : "published";
  const postsList = await getAllPosts({ status, limit });
  return NextResponse.json({ posts: postsList });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.excerpt || !body.body) {
      return NextResponse.json({ error: "Title, excerpt and body are required." }, { status: 400 });
    }
    if (body.cover_image_url && !body.cover_image_alt) {
      return NextResponse.json({ error: "Cover image alt text is required." }, { status: 400 });
    }

    const slug =
      body.slug ||
      String(body.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const post = await savePost({
      id: body.id,
      title: body.title,
      slug,
      excerpt: body.excerpt,
      body: sanitizeHtml(body.body),
      cover_image_url: body.cover_image_url,
      cover_image_alt: body.cover_image_alt,
      author: body.author || "THRIVE Initiative",
      status: body.status === "published" ? "published" : "draft",
      published_at: body.published_at,
      created_at: body.created_at,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
    });

    revalidateBlog(slug);
    return NextResponse.json({ success: true, post });
  } catch (err: unknown) {
    console.error("Save post error:", err);
    return NextResponse.json({ error: "Failed to save post." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 });
    }
    await deletePost(id);
    revalidateBlog();
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Delete post error:", err);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
