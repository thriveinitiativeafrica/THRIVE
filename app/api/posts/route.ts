import { NextResponse } from "next/server";
import { getLatestPosts, createPost } from "@/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const posts = await getLatestPosts(limit);
    return NextResponse.json({ success: true, count: posts.length, data: posts });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to retrieve posts";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, italicTitle, excerpt, content, coverImageUrl, category, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const post = await createPost({
      title,
      slug,
      italicTitle,
      excerpt,
      content,
      coverImageUrl: coverImageUrl || "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1000&q=80",
      category: category || "General Story",
      published: published !== undefined ? published : true,
      readTime: "5 min read",
    });

    return NextResponse.json({ success: true, data: post });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to create post";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
