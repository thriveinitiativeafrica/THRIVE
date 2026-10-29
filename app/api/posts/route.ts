import { NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost } from "@/db";
import type { PostType, PostStatus } from "@/db/schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const type = (searchParams.get("type") as PostType) || undefined;
    const status = (searchParams.get("status") as PostStatus | "all") || "published";

    const posts = await getAllPosts({
      type,
      status,
      limit,
    });

    return NextResponse.json({ success: true, count: posts.length, data: posts });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to retrieve posts";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      slug,
      italicTitle,
      excerpt,
      content,
      type,
      category,
      tags,
      author,
      publishDate,
      coverImage,
      coverImageAlt,
      inlineImages,
      status,
      readTime,
      seoTitle,
      seoDescription,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = await savePost({
      id,
      title,
      slug,
      italicTitle,
      excerpt,
      content,
      type: type || "blog",
      category: category || "Field Story",
      tags: tags || ["Community Outreach"],
      author: author || {
        name: "THRIVE Field Team",
        role: "Grassroots Project Lead",
        avatar: "/images/avatar-amina.webp",
      },
      publishDate,
      coverImage: coverImage || "/images/story-water.webp",
      coverImageAlt: coverImageAlt || title,
      inlineImages: inlineImages || [],
      status: status || "published",
      readTime: readTime || "4 min read",
      seoTitle,
      seoDescription,
    });

    return NextResponse.json({ success: true, data: post });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to save post";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Post ID is required for deletion" },
        { status: 400 }
      );
    }

    const deleted = await deletePost(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete post";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
