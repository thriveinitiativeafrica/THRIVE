import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost } from "@/db";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "published" | "draft" | "all" | null;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;

  const postsList = await getAllPosts({
    status: status || "published",
    limit,
  });

  return NextResponse.json({ posts: postsList });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.excerpt || !body.body) {
      return NextResponse.json(
        { error: "Title, excerpt, and body are required fields." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const post = await savePost({
      id: body.id,
      title: body.title,
      slug,
      excerpt: body.excerpt,
      body: body.body,
      cover_image_url: body.cover_image_url,
      cover_image_alt: body.cover_image_alt,
      author: body.author || "THRIVE Initiative",
      status: body.status || "draft",
      published_at: body.published_at,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
    });

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/");
    } catch {
      // Revalidation in non-cached contexts
    }

    return NextResponse.json({ success: true, post });
  } catch (err: unknown) {
    console.error("Save post error:", err);
    return NextResponse.json({ error: "Failed to save post." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 });
    }

    await deletePost(id);

    try {
      revalidatePath("/blog");
      revalidatePath("/");
    } catch {
      // Revalidation in non-cached contexts
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Delete post error:", err);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
