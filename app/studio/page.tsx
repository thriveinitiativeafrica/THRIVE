"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { DbPost, DbVolunteerSignup, DbContactMessage, PostType, PostStatus, PostInlineImage } from "@/db/schema";
import {
  IconCheck,
  IconClose,
  IconPlus,
  IconUpload,
  IconShieldCheck,
  IconBook,
  IconUsers,
  IconMail,
  IconCopy,
} from "@/components/shared/Icons";
import { cn } from "@/lib/utils";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "editor" | "volunteers" | "messages">("posts");
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [volunteers, setVolunteers] = useState<DbVolunteerSignup[]>([]);
  const [messages, setMessages] = useState<DbContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Post form state
  const initialForm = {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    type: "blog" as PostType,
    category: "Community Outreach",
    status: "published" as PostStatus,
    coverImage: "/images/story-water.webp",
    coverImageAlt: "",
    inlineImages: [] as PostInlineImage[],
    authorName: "Chukwudi Eze",
    authorRole: "Director of Community Development",
    authorAvatar: "/images/avatar-babatunde.webp",
    seoTitle: "",
    seoDescription: "",
  };

  const [form, setForm] = useState(initialForm);

  // New inline image draft state
  const [inlineDraft, setInlineDraft] = useState({
    url: "",
    caption: "",
    alt: "",
  });

  useEffect(() => {
    fetchPosts();
    fetchVolunteers();
    fetchMessages();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?status=all&limit=100");
      const data = await res.json();
      if (data.data) setPosts(data.data);
    } catch {}
  };

  const fetchVolunteers = async () => {
    try {
      const res = await fetch("/api/volunteer");
      const data = await res.json();
      if (data.data) setVolunteers(data.data);
    } catch {}
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.data) setMessages(data.data);
    } catch {}
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setForm({ ...form, title, slug: form.id ? form.slug : slug });
  };

  const handleEditPost = (post: DbPost) => {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      type: post.type,
      category: post.category,
      status: post.status,
      coverImage: post.coverImage,
      coverImageAlt: post.coverImageAlt || post.title,
      inlineImages: post.inlineImages || [],
      authorName: post.author?.name || "THRIVE Field Team",
      authorRole: post.author?.role || "Grassroots Project Lead",
      authorAvatar: post.author?.avatar || "/images/avatar-amina.webp",
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
    });
    setActiveTab("editor");
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/posts?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg("Post deleted successfully.");
        fetchPosts();
        setTimeout(() => setFeedbackMsg(null), 3500);
      }
    } catch {}
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setForm((prev) => ({ ...prev, coverImage: data.url }));
        setFeedbackMsg("Cover image uploaded successfully.");
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    } catch {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleUploadInline = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingInline(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setInlineDraft((prev) => ({ ...prev, url: data.url }));
        setFeedbackMsg("Inline image uploaded. Add caption and click 'Insert Image'.");
        setTimeout(() => setFeedbackMsg(null), 3500);
      }
    } catch {
      alert("Failed to upload image.");
    } finally {
      setUploadingInline(false);
    }
  };

  const addInlineImage = () => {
    if (!inlineDraft.url) return;
    const newImg: PostInlineImage = {
      url: inlineDraft.url,
      caption: inlineDraft.caption || "Field documentation",
      alt: inlineDraft.alt || "THRIVE field activity photo",
    };

    setForm((prev) => ({
      ...prev,
      inlineImages: [...prev.inlineImages, newImg],
      content:
        prev.content +
        `\n\n![${newImg.alt}](${newImg.url} "${newImg.caption}")\n*${newImg.caption}*\n\n`,
    }));

    setInlineDraft({ url: "", caption: "", alt: "" });
    setFeedbackMsg("Image and caption inserted into article body!");
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: form.id || undefined,
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        type: form.type,
        category: form.category,
        status: form.status,
        coverImage: form.coverImage,
        coverImageAlt: form.coverImageAlt || form.title,
        inlineImages: form.inlineImages,
        author: {
          name: form.authorName,
          role: form.authorRole,
          avatar: form.authorAvatar,
        },
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(
          form.id
            ? "Story updated successfully!"
            : "New story created successfully!"
        );
        fetchPosts();
        setForm(initialForm);
        setTimeout(() => {
          setFeedbackMsg(null);
          setActiveTab("posts");
        }, 1200);
      }
    } catch {
      alert("Error saving story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="bg-thrive-purple-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-thrive-purple-800">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-thrive-gold-400">
            THRIVE Content &amp; Field Operations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Executive Studio
          </h1>
          <p className="text-xs sm:text-sm text-thrive-purple-100/80 max-w-2xl">
            Publish field stories, post live dispatches, upload high-resolution images, and review registered volunteer submissions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-xs shrink-0">
          <IconShieldCheck className="text-thrive-gold-400" size={18} />
          <span className="font-semibold">Executive Portal Active</span>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm">
          <IconCheck className="text-emerald-700" size={18} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-thrive-border pb-4">
        <button
          onClick={() => setActiveTab("posts")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs",
            activeTab === "posts"
              ? "bg-thrive-purple-900 text-white shadow-md"
              : "bg-white text-thrive-ink-800 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <IconBook size={16} />
          <span>All Dispatches ({posts.length})</span>
        </button>

        <button
          onClick={() => {
            setForm(initialForm);
            setActiveTab("editor");
          }}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs",
            activeTab === "editor"
              ? "bg-thrive-gold-600 text-thrive-purple-900 shadow-md font-extrabold"
              : "bg-white text-thrive-ink-800 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <IconPlus size={16} />
          <span>{form.id ? "Edit Post" : "+ Create Story / Update"}</span>
        </button>

        <button
          onClick={() => setActiveTab("volunteers")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs",
            activeTab === "volunteers"
              ? "bg-thrive-purple-900 text-white shadow-md"
              : "bg-white text-thrive-ink-800 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <IconUsers size={16} />
          <span>Volunteers ({volunteers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs",
            activeTab === "messages"
              ? "bg-thrive-purple-900 text-white shadow-md"
              : "bg-white text-thrive-ink-800 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <IconMail size={16} />
          <span>Inquiries ({messages.length})</span>
        </button>
      </div>

      {/* TAB 1: ALL CONTENT TABLE */}
      {activeTab === "posts" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-thrive-border overflow-hidden shadow-sm">
            <div className="p-6 border-b border-thrive-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-thrive-purple-900">
                  Published Stories &amp; Field Updates
                </h2>
                <p className="text-xs text-thrive-ink-600">
                  Manage active stories appearing across /stories, /updates, and the homepage.
                </p>
              </div>

              <button
                onClick={() => {
                  setForm(initialForm);
                  setActiveTab("editor");
                }}
                className="px-5 py-2 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shrink-0"
              >
                + New Post
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-thrive-cream text-thrive-purple-900 font-bold border-b border-thrive-border">
                    <th className="py-3 px-6">Post Title</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Published Date</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-thrive-border">
                  {posts.map((p) => (
                    <tr key={p.id} className="hover:bg-thrive-cream/40 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-thrive-purple-900 max-w-xs truncate">
                        <div className="font-bold">{p.title}</div>
                        <div className="text-[10px] text-thrive-ink-600 font-mono">
                          /stories/{p.slug}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                            p.type === "update"
                              ? "bg-thrive-gold-100 text-thrive-purple-900 border border-thrive-gold-200"
                              : "bg-thrive-purple-100 text-thrive-purple-900 border border-thrive-purple-200"
                          )}
                        >
                          {p.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-thrive-ink-600 font-medium">
                        {p.category}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                            p.status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-thrive-ink-600">
                        {p.publishDate}
                      </td>
                      <td className="py-3.5 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleEditPost(p)}
                          className="px-3 py-1 rounded-lg bg-thrive-cream text-thrive-purple-900 hover:bg-thrive-purple-100 font-bold text-[11px] border border-thrive-border"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(p.id)}
                          className="px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[11px] border border-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RICH POST EDITOR WITH IMAGE UPLOAD */}
      {activeTab === "editor" && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-thrive-border shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-thrive-border pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-thrive-gold-600">
                {form.id ? "Editing Existing Record" : "New Field Article"}
              </span>
              <h2 className="font-serif text-2xl font-bold text-thrive-purple-900">
                {form.id ? `Edit: ${form.title}` : "Author & Publish Field Content"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-thrive-ink-600">Publish Status:</span>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as PostStatus })}
                className="px-3 py-1.5 rounded-xl border border-thrive-border text-xs font-bold text-thrive-purple-900 focus:outline-none focus:ring-2 focus:ring-thrive-purple-500"
              >
                <option value="published">Live (Published)</option>
                <option value="draft">Draft (Private)</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSavePost} className="space-y-6">
            {/* Title & Type */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1.5">
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Water Borehole Commissioned in Olomowewe"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-thrive-border text-sm focus:ring-2 focus:ring-thrive-purple-500"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1.5">
                  Post Type *
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as PostType })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs font-semibold focus:ring-2 focus:ring-thrive-purple-500"
                >
                  <option value="blog">In-Depth Story (Blog)</option>
                  <option value="update">Field Update (Short Dispatch)</option>
                </select>
              </div>
            </div>

            {/* URL Slug & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs font-mono focus:ring-2 focus:ring-thrive-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs font-semibold focus:ring-2 focus:ring-thrive-purple-500"
                >
                  <option value="Health & Water">Health &amp; Clean Water</option>
                  <option value="Child Education">Child Education &amp; Youth</option>
                  <option value="Food Security">Food Security &amp; Relief</option>
                  <option value="Skills Acquisition">Skills Acquisition &amp; Crafts</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Women Empowerment">Women Empowerment</option>
                </select>
              </div>
            </div>

            {/* Cover Image Upload Area */}
            <div className="p-5 rounded-2xl bg-thrive-cream border border-thrive-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-thrive-purple-900">
                    Cover Image
                  </h3>
                  <p className="text-xs text-thrive-ink-600">
                    Upload a high-resolution Nigerian field photo or provide a local image path.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCover}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover}
                    className="px-4 py-2 rounded-xl bg-thrive-purple-900 hover:bg-thrive-purple-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                  >
                    <IconUpload size={14} />
                    <span>{uploadingCover ? "Uploading..." : "Upload Cover Image"}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="/images/story-water.webp or uploaded URL"
                    className="w-full px-3.5 py-2 rounded-xl border border-thrive-border text-xs font-mono bg-white"
                  />
                  <input
                    type="text"
                    value={form.coverImageAlt}
                    onChange={(e) => setForm({ ...form, coverImageAlt: e.target.value })}
                    placeholder="Descriptive Alt Text for Screen Readers *"
                    className="w-full px-3.5 py-2 rounded-xl border border-thrive-border text-xs mt-2 bg-white"
                  />
                </div>

                {form.coverImage && (
                  <div className="sm:col-span-4 relative aspect-[16/10] rounded-xl overflow-hidden border border-thrive-border bg-white shadow-xs">
                    <Image
                      src={form.coverImage}
                      alt={form.coverImageAlt || "Cover preview"}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1.5">
                Story Excerpt / Summary *
              </label>
              <textarea
                required
                rows={2}
                placeholder="A compelling 1-2 sentence hook for cards, RSS feed, and search snippets..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-xs focus:ring-2 focus:ring-thrive-purple-500"
              />
            </div>

            {/* Inline Image Inserter Tool */}
            <div className="p-4 rounded-2xl bg-thrive-purple-50 border border-thrive-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold text-thrive-purple-900">
                  Insert Inline Article Image with Caption
                </h4>
                <input
                  ref={inlineInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadInline}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => inlineInputRef.current?.click()}
                  disabled={uploadingInline}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-thrive-purple-300 text-thrive-purple-900 font-bold text-xs flex items-center gap-1.5 hover:bg-thrive-purple-100"
                >
                  <IconUpload size={14} />
                  <span>{uploadingInline ? "Uploading..." : "Upload Inline Photo"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Image URL (auto-filled on upload)"
                  value={inlineDraft.url}
                  onChange={(e) => setInlineDraft({ ...inlineDraft, url: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border border-thrive-border text-xs bg-white font-mono"
                />
                <input
                  type="text"
                  placeholder="Caption (e.g. Community members at pump)"
                  value={inlineDraft.caption}
                  onChange={(e) => setInlineDraft({ ...inlineDraft, caption: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border border-thrive-border text-xs bg-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Alt text"
                    value={inlineDraft.alt}
                    onChange={(e) => setInlineDraft({ ...inlineDraft, alt: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-thrive-border text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={addInlineImage}
                    disabled={!inlineDraft.url}
                    className="px-4 py-1.5 rounded-lg bg-thrive-purple-900 text-white font-bold text-xs uppercase disabled:opacity-40 shrink-0"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>

            {/* Markdown Body Content */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-thrive-purple-900 mb-1.5">
                Full Article Body (Markdown format supported) *
              </label>
              <textarea
                required
                rows={12}
                placeholder="Write your article using markdown: ### Subheadings, - Bullet lists, > Blockquotes, and inline images..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-thrive-border text-xs font-mono leading-relaxed focus:ring-2 focus:ring-thrive-purple-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-thrive-border">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                {loading ? "Saving Story..." : form.id ? "Update Story" : "Publish Story to Live Site"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setActiveTab("posts");
                }}
                className="px-6 py-3 rounded-full bg-white border border-thrive-border text-thrive-ink-800 font-bold text-xs uppercase tracking-wider hover:bg-thrive-cream"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: VOLUNTEERS */}
      {activeTab === "volunteers" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-thrive-purple-900">
              Registered Volunteers ({volunteers.length})
            </h2>
            <button
              onClick={fetchVolunteers}
              className="text-xs text-thrive-gold-600 font-bold hover:underline"
            >
              Refresh Data
            </button>
          </div>

          {volunteers.length === 0 ? (
            <p className="text-xs text-thrive-ink-600 py-8 text-center">
              No volunteer applications registered yet.
            </p>
          ) : (
            <div className="divide-y divide-thrive-border overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-thrive-purple-900 font-bold border-b border-thrive-border">
                    <th className="pb-3 px-3">Name</th>
                    <th className="pb-3 px-3">Email</th>
                    <th className="pb-3 px-3">Skills</th>
                    <th className="pb-3 px-3">Availability</th>
                    <th className="pb-3 px-3">Applied</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-thrive-border/50">
                  {volunteers.map((v) => (
                    <tr key={v.id} className="py-2.5">
                      <td className="py-3 px-3 font-bold text-thrive-purple-900">{v.name}</td>
                      <td className="py-3 px-3 text-thrive-ink-600">{v.email}</td>
                      <td className="py-3 px-3 font-semibold text-thrive-teal-700">{v.skills || "General"}</td>
                      <td className="py-3 px-3 text-thrive-ink-600">{v.availability || "Flexible"}</td>
                      <td className="py-3 px-3 text-thrive-ink-600 font-mono text-[10px]">
                        {new Date(v.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CONTACT MESSAGES */}
      {activeTab === "messages" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-thrive-purple-900">
              Community Correspondence ({messages.length})
            </h2>
            <button
              onClick={fetchMessages}
              className="text-xs text-thrive-gold-600 font-bold hover:underline"
            >
              Refresh
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="text-xs text-thrive-ink-600 py-8 text-center">
              No contact inquiries submitted yet.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-thrive-cream border border-thrive-border space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-thrive-purple-900">
                    <span>
                      {m.name} &bull; <a href={`mailto:${m.email}`} className="text-thrive-gold-600 hover:underline">{m.email}</a>
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-thrive-purple-100 text-thrive-purple-900 font-bold">
                      {m.category || "General"}
                    </span>
                  </div>
                  <div className="font-semibold text-thrive-purple-900 text-sm">
                    {m.subject || "No Subject"}
                  </div>
                  <p className="text-thrive-ink-800 leading-relaxed bg-white p-3.5 rounded-xl border border-thrive-border">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
