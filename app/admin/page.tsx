"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconCheck, IconClose, IconPlus, IconUpload } from "@/components/shared/Icons";
import { sanitizeHtml } from "@/lib/sanitize";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  cover_image_alt?: string | null;
  author: string;
  status: "draft" | "published";
  created_at: string;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activePost, setActivePost] = useState<Partial<PostItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Inline image insertion state
  const [showInlineModal, setShowInlineModal] = useState(false);
  const [inlineUrl, setInlineUrl] = useState("");
  const [inlineAlt, setInlineAlt] = useState("");
  const [inlineCaption, setInlineCaption] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadPosts();
      }
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Login failed");
      } else {
        setIsAuthenticated(true);
        loadPosts();
      }
    } catch {
      setLoginError("Network error during login");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/check", { method: "POST" });
    setIsAuthenticated(false);
  }

  async function loadPosts() {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/posts?status=all");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  }

  function startNewPost() {
    setActivePost({
      title: "",
      slug: "",
      excerpt: "",
      body: "",
      author: "THRIVE Initiative",
      status: "draft",
      cover_image_url: "",
      cover_image_alt: "",
      seo_title: "",
      seo_description: "",
    });
    setSaveMessage("");
  }

  function editPost(p: PostItem) {
    setActivePost({ ...p });
    setSaveMessage("");
  }

  async function deletePostItem(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
      setPosts(posts.filter((p) => p.id !== id));
      if (activePost?.id === id) {
        setActivePost(null);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", activePost?.cover_image_alt || file.name);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setActivePost((prev) => ({
          ...prev,
          cover_image_url: data.url,
          cover_image_alt: prev?.cover_image_alt || data.alt,
        }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading cover image");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleInlineUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInline(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", inlineAlt || file.name);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setInlineUrl(data.url);
        if (!inlineAlt) setInlineAlt(data.alt);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploadingInline(false);
    }
  }

  function insertInlineImage() {
    if (!inlineUrl) return;
    const figureHtml = `\n<figure class="my-8">\n  <img src="${inlineUrl}" alt="${inlineAlt.replace(/"/g, "&quot;")}" class="rounded-2xl w-full object-cover" />\n  ${inlineCaption ? `<figcaption class="text-xs text-gray-500 mt-2 text-center">${inlineCaption}</figcaption>` : ""}\n</figure>\n`;
    setActivePost((prev) => ({
      ...prev,
      body: (prev?.body || "") + figureHtml,
    }));
    setShowInlineModal(false);
    setInlineUrl("");
    setInlineAlt("");
    setInlineCaption("");
  }

  function appendFormatting(tagStart: string, tagEnd: string = "") {
    if (!tagEnd) {
      setActivePost((prev) => ({
        ...prev,
        body: (prev?.body || "") + tagStart,
      }));
      return;
    }
    setActivePost((prev) => ({
      ...prev,
      body: (prev?.body || "") + `${tagStart}Text${tagEnd}`,
    }));
  }

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    if (!activePost?.title || !activePost?.excerpt || !activePost?.body) {
      alert("Title, excerpt, and article body are required.");
      return;
    }
    if (activePost.cover_image_url && !activePost.cover_image_alt) {
      alert("Alt text is required for the cover image.");
      return;
    }

    setSaving(true);
    setSaveMessage("");

    const cleanBody = sanitizeHtml(activePost.body);
    const postPayload = {
      ...activePost,
      body: cleanBody,
      slug:
        activePost.slug ||
        activePost.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveMessage("Post saved successfully.");
        loadPosts();
        setActivePost(data.post);
      } else {
        alert(data.error || "Failed to save post");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving post");
    } finally {
      setSaving(false);
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FAF6EC] flex items-center justify-center p-4">
        <p className="text-sm text-gray-500">Checking authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF6EC] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                Admin Workstation
              </span>
            </div>
            <h1 className="text-2xl font-medium text-[#2E1650]">THRIVE Editorial Portal</h1>
            <p className="text-xs text-gray-500 mt-1">
              Enter password to manage dispatches, articles, and field reports.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#2E1650]"
                placeholder="Enter admin password"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm transition-colors disabled:opacity-50"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Admin"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EC] text-[#2E1650] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                THRIVE Content Management
              </span>
            </div>
            <h1 className="text-3xl font-medium">Stories & Blog Administration</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={startNewPost}
              className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-sm font-medium rounded-full flex items-center gap-1.5 transition-colors"
            >
              <IconPlus className="w-4 h-4" />
              <span>Create New Story</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-gray-300 hover:border-[#2E1650] text-xs font-medium rounded-full transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Editor or List View */}
        {activePost ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-medium text-[#2E1650]">
                {activePost.id ? "Edit Story" : "New Story"}
              </h2>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            {saveMessage && (
              <div className="p-3 rounded-2xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-green-700" />
                <span>{saveMessage}</span>
              </div>
            )}

            <form onSubmit={handleSavePost} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={activePost.title || ""}
                    onChange={(e) => {
                      const t = e.target.value;
                      setActivePost((prev) => ({
                        ...prev,
                        title: t,
                        slug:
                          prev?.slug ||
                          t
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)+/g, ""),
                      }));
                    }}
                    placeholder="e.g. Clean Water Restores Classroom Attendance in Olomowewe"
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={activePost.slug || ""}
                    onChange={(e) => setActivePost({ ...activePost, slug: e.target.value })}
                    placeholder="e.g. clean-water-restores-classroom-attendance"
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-mono text-xs focus:outline-none focus:border-[#2E1650]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Summary Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={activePost.excerpt || ""}
                  onChange={(e) => setActivePost({ ...activePost, excerpt: e.target.value })}
                  placeholder="One or two sentences summarizing the field dispatch or turnaround."
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                />
              </div>

              {/* Cover Image */}
              <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-gray-200 space-y-3">
                <label className="block text-xs font-semibold">Cover Image (Cloudinary or Upload)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <input
                    type="text"
                    value={activePost.cover_image_url || ""}
                    onChange={(e) => setActivePost({ ...activePost, cover_image_url: e.target.value })}
                    placeholder="Image URL or upload file"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                  />
                  <label className="px-4 py-2 bg-white border border-gray-300 hover:border-[#2E1650] rounded-full text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                    <IconUpload className="w-3.5 h-3.5" />
                    <span>{uploadingCover ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Cover Image Alt Text (Required) *</label>
                  <input
                    type="text"
                    value={activePost.cover_image_alt || ""}
                    onChange={(e) => setActivePost({ ...activePost, cover_image_alt: e.target.value })}
                    placeholder="Descriptive alt text for accessibility"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                  />
                </div>

                {activePost.cover_image_url && (
                  <div className="mt-2 relative w-32 h-20 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={activePost.cover_image_url}
                      alt={activePost.cover_image_alt || "Cover preview"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Rich Body Toolbar and Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold">Article Content (HTML/Markdown) *</label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => appendFormatting("<h2>", "</h2>")}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => appendFormatting("<h3>", "</h3>")}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => appendFormatting("<strong>", "</strong>")}
                      className="px-2.5 py-1 text-xs font-bold border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => appendFormatting("<em>", "</em>")}
                      className="px-2.5 py-1 text-xs italic border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => appendFormatting('<blockquote class="border-l-2 border-[#2E1650] pl-4 italic my-4">\n  ', "\n</blockquote>")}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => appendFormatting("<p>", "</p>")}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      Paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInlineModal(true)}
                      className="px-3 py-1 text-xs bg-[#2E1650] text-white rounded-lg hover:bg-[#381A5F] flex items-center gap-1"
                    >
                      <IconPlus className="w-3 h-3" />
                      <span>Add Inline Image</span>
                    </button>
                  </div>
                </div>

                <textarea
                  required
                  rows={12}
                  value={activePost.body || ""}
                  onChange={(e) => setActivePost({ ...activePost, body: e.target.value })}
                  placeholder="<p>Write your article text here. You can use standard HTML formatting or the buttons above.</p>"
                  className="w-full p-4 rounded-2xl border border-gray-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-[#2E1650]"
                />
              </div>

              {/* Status & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold mb-1">Author</label>
                  <input
                    type="text"
                    value={activePost.author || ""}
                    onChange={(e) => setActivePost({ ...activePost, author: e.target.value })}
                    placeholder="THRIVE Initiative"
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Publication Status</label>
                  <select
                    value={activePost.status || "draft"}
                    onChange={(e) =>
                      setActivePost({
                        ...activePost,
                        status: e.target.value as "draft" | "published",
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm bg-white"
                  >
                    <option value="draft">Draft (Private, not on public blog)</option>
                    <option value="published">Published (Visible on live blog)</option>
                  </select>
                </div>
              </div>

              {/* SEO Overrides */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Search Engine Optimization (Optional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={activePost.seo_title || ""}
                    onChange={(e) => setActivePost({ ...activePost, seo_title: e.target.value })}
                    placeholder="Custom SEO Title"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={activePost.seo_description || ""}
                    onChange={(e) => setActivePost({ ...activePost, seo_description: e.target.value })}
                    placeholder="Custom SEO Meta Description"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-full text-xs font-medium hover:border-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving Post..." : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Post Table */
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">All Dispatches & Articles</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing {posts.length} {posts.length === 1 ? "story" : "stories"} in the repository.
                </p>
              </div>
            </div>

            {loadingPosts ? (
              <div className="p-12 text-center text-sm text-gray-500">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <p className="text-sm text-gray-500">No posts in the repository yet.</p>
                <button
                  onClick={startNewPost}
                  className="px-4 py-2 bg-[#D4A017] text-[#2E1650] text-xs font-medium rounded-full"
                >
                  Write Your First Story
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            p.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {p.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(p.created_at).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="font-medium text-base text-[#2E1650]">{p.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{p.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => editPost(p)}
                        className="px-3.5 py-1.5 border border-gray-300 hover:border-[#2E1650] text-xs rounded-full transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePostItem(p.id)}
                        className="px-3.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs rounded-full transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inline Image Modal */}
        {showInlineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-medium text-lg">Insert Inline Image</h3>
                <button
                  onClick={() => setShowInlineModal(false)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <IconClose className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Image File Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInlineUpload}
                  disabled={uploadingInline}
                  className="text-xs"
                />
                {uploadingInline && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={inlineUrl}
                  onChange={(e) => setInlineUrl(e.target.value)}
                  placeholder="https://... or upload above"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Alt Text (Required) *</label>
                <input
                  type="text"
                  value={inlineAlt}
                  onChange={(e) => setInlineAlt(e.target.value)}
                  placeholder="Description of the image for accessibility"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Caption (Optional)</label>
                <input
                  type="text"
                  value={inlineCaption}
                  onChange={(e) => setInlineCaption(e.target.value)}
                  placeholder="e.g. Community members at the newly installed borehole in Ikorodu"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInlineModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertInlineImage}
                  disabled={!inlineUrl}
                  className="px-4 py-2 bg-[#D4A017] text-[#2E1650] text-xs font-medium rounded-full disabled:opacity-50"
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
