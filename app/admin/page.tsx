"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconCheck, IconClose, IconPlus, IconUpload } from "@/components/shared/Icons";
import { sanitizeHtml } from "@/lib/sanitize";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export interface CoverImageItem {
  url: string;
  alt?: string;
}

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  cover_image_alt?: string | null;
  cover_images?: CoverImageItem[];
  author: string;
  status: "draft" | "published";
  created_at: string;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

interface ContactMessageItem {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active top-level tab: "blog" | "contacts"
  const [currentTab, setCurrentTab] = useState<"blog" | "contacts">("blog");

  // Blog State
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activePost, setActivePost] = useState<Partial<PostItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [manualCoverUrl, setManualCoverUrl] = useState("");

  // Contacts State
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactSearch, setContactSearch] = useState("");

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
        loadContactMessages();
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
        loadContactMessages();
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

  async function loadContactMessages() {
    setLoadingContacts(true);
    try {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      setContactMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to load contact messages:", err);
    } finally {
      setLoadingContacts(false);
    }
  }

  async function deleteContactItem(id: number) {
    if (!confirm("Are you sure you want to delete this contact inquiry?")) return;
    try {
      await fetch(`/api/admin/contact?id=${id}`, { method: "DELETE" });
      setContactMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting contact inquiry:", err);
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
      cover_images: [],
      seo_title: "",
      seo_description: "",
    });
    setManualCoverUrl("");
    setSaveMessage("");
  }

  function editPost(p: PostItem) {
    const existingCovers: CoverImageItem[] =
      p.cover_images && p.cover_images.length > 0
        ? p.cover_images
        : p.cover_image_url
          ? [{ url: p.cover_image_url, alt: p.cover_image_alt || p.title }]
          : [];

    setActivePost({
      ...p,
      cover_images: existingCovers,
      cover_image_url: existingCovers[0]?.url || p.cover_image_url || "",
      cover_image_alt: existingCovers[0]?.alt || p.cover_image_alt || "",
    });
    setManualCoverUrl("");
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

  function updateCoverImagesList(nextList: CoverImageItem[]) {
    setActivePost((prev) => ({
      ...prev,
      cover_images: nextList,
      cover_image_url: nextList[0]?.url || "",
      cover_image_alt: nextList[0]?.alt || prev?.cover_image_alt || prev?.title || "",
    }));
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingCover(true);

    const uploadedItems: CoverImageItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append("file", file);
        fd.append(
          "alt",
          activePost?.cover_image_alt ||
            activePost?.title ||
            file.name.replace(/\.[^.]+$/, "")
        );

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          uploadedItems.push({
            url: data.url,
            alt:
              activePost?.cover_image_alt ||
              activePost?.title ||
              data.alt ||
              file.name.replace(/\.[^.]+$/, ""),
          });
        } else {
          alert(data.error || `Failed to upload ${file.name}`);
        }
      }

      if (uploadedItems.length > 0) {
        const currentList = activePost?.cover_images || [];
        updateCoverImagesList([...currentList, ...uploadedItems]);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading cover image(s)");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  }

  function handleAddManualCoverUrl() {
    const trimmed = manualCoverUrl.trim();
    if (!trimmed) return;
    const currentList = activePost?.cover_images || [];
    updateCoverImagesList([
      ...currentList,
      { url: trimmed, alt: activePost?.cover_image_alt || activePost?.title || "" },
    ]);
    setManualCoverUrl("");
  }

  function makePrimaryCover(idx: number) {
    const currentList = [...(activePost?.cover_images || [])];
    if (idx <= 0 || idx >= currentList.length) return;
    const [selected] = currentList.splice(idx, 1);
    currentList.unshift(selected);
    updateCoverImagesList(currentList);
  }

  function removeCoverAt(idx: number) {
    const currentList = [...(activePost?.cover_images || [])];
    currentList.splice(idx, 1);
    updateCoverImagesList(currentList);
  }

  function updateCoverAlt(idx: number, newAlt: string) {
    const currentList = [...(activePost?.cover_images || [])];
    if (!currentList[idx]) return;
    currentList[idx] = { ...currentList[idx], alt: newAlt };
    updateCoverImagesList(currentList);
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
    const figureHtml = `<figure><img src="${inlineUrl}" alt="${(inlineAlt || activePost?.title || "Article image").replace(/"/g, "&quot;")}" />${inlineCaption ? `<figcaption>${inlineCaption}</figcaption>` : ""}</figure><p></p>`;
    setActivePost((prev) => ({
      ...prev,
      body: (prev?.body || "") + figureHtml,
    }));
    setShowInlineModal(false);
    setInlineUrl("");
    setInlineAlt("");
    setInlineCaption("");
  }

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    const plainTextBody = (activePost?.body || "").replace(/<[^>]*>/g, "").trim();
    if (!activePost?.title || !activePost?.excerpt || !plainTextBody) {
      alert("Title, summary excerpt, and article content are required.");
      return;
    }

    const coverList = activePost.cover_images || [];
    const primaryUrl = coverList[0]?.url || activePost.cover_image_url || "";
    const primaryAlt =
      coverList[0]?.alt || activePost.cover_image_alt || activePost.title || "";

    setSaving(true);
    setSaveMessage("");

    const cleanBody = sanitizeHtml(activePost.body || "");
    const postPayload = {
      ...activePost,
      body: cleanBody,
      cover_image_url: primaryUrl || null,
      cover_image_alt: primaryAlt || null,
      cover_images: coverList.map((item) => ({
        url: item.url,
        alt: item.alt || primaryAlt || activePost.title || "",
      })),
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
        setSaveMessage("Post saved and published successfully!");
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
              Enter password to manage dispatches, articles, and contact inquiries.
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

  const coverImagesList = activePost?.cover_images || [];

  const filteredContacts = contactMessages.filter((m) => {
    if (!contactSearch) return true;
    const q = contactSearch.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF6EC] text-[#2E1650] pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1650]">
                THRIVE Content &amp; Operations
              </span>
            </div>
            <h1 className="text-3xl font-medium">Administration Workstation</h1>
          </div>
          <div className="flex items-center gap-3">
            {currentTab === "blog" && (
              <button
                onClick={startNewPost}
                className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-sm font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IconPlus className="w-4 h-4" />
                <span>Create New Story</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-gray-300 hover:border-[#2E1650] text-xs font-medium rounded-full transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          <button
            type="button"
            onClick={() => {
              setCurrentTab("blog");
              setActivePost(null);
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              currentTab === "blog"
                ? "bg-[#2E1650] text-white"
                : "bg-white text-[#2E1650] border border-gray-200 hover:bg-[#FAF6EC]"
            }`}
          >
            <span>Stories &amp; Blog</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentTab === "blog" ? "bg-[#D4A017] text-[#2E1650]" : "bg-gray-100 text-gray-700"
              }`}
            >
              {posts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentTab("contacts");
              setActivePost(null);
              loadContactMessages();
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              currentTab === "contacts"
                ? "bg-[#2E1650] text-white"
                : "bg-white text-[#2E1650] border border-gray-200 hover:bg-[#FAF6EC]"
            }`}
          >
            <span>Contact Requests</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentTab === "contacts" ? "bg-[#D4A017] text-[#2E1650]" : "bg-gray-100 text-gray-700"
              }`}
            >
              {contactMessages.length}
            </span>
          </button>
        </div>

        {/* TAB 1: BLOG STORIES */}
        {currentTab === "blog" && (
          <>
            {activePost ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-medium text-[#2E1650]">
                      {activePost.id ? "Edit Story" : "New Story"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Write directly or copy-paste from Google Docs. Upload one or multiple cover images for a carousel.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePost(null)}
                    className="p-2 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
                  >
                    <IconClose className="w-5 h-5" />
                  </button>
                </div>

                {saveMessage && (
                  <div className="p-3.5 rounded-2xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
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
                              prev?.id
                                ? prev.slug
                                : t
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)+/g, ""),
                          }));
                        }}
                        placeholder="e.g. Breast Cancer Awareness & Early Screening Drive"
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
                        placeholder="e.g. breast-cancer-awareness-early-detection"
                        className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 font-mono text-xs focus:outline-none focus:border-[#2E1650]"
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
                      placeholder="One or two sentences summarizing the story (shown on the blog cards)."
                      className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E1650]"
                    />
                  </div>

                  {/* Multi-Cover Image Gallery & Carousel Manager */}
                  <div className="p-5 rounded-2xl bg-[#FAF6EC] border border-gray-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#2E1650]">
                          Cover Images (Single Display + Article Carousel)
                        </label>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          Upload one or multiple images. The <strong>first image</strong> is displayed on the Blog card, and all images become an interactive carousel inside the article.
                        </p>
                      </div>

                      <label className="px-4 py-2.5 bg-[#2E1650] hover:bg-[#381A5F] text-white rounded-full text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                        <IconUpload className="w-3.5 h-3.5" />
                        <span>
                          {uploadingCover ? "Uploading..." : "+ Upload Cover Image(s)"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleCoverUpload}
                          disabled={uploadingCover}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Optional paste image URL */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={manualCoverUrl}
                        onChange={(e) => setManualCoverUrl(e.target.value)}
                        placeholder="Or paste an image URL here and click Add URL..."
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#2E1650]"
                      />
                      <button
                        type="button"
                        onClick={handleAddManualCoverUrl}
                        disabled={!manualCoverUrl.trim()}
                        className="px-4 py-2 bg-white border border-gray-300 hover:border-[#2E1650] rounded-xl text-xs font-medium disabled:opacity-40 cursor-pointer"
                      >
                        + Add URL
                      </button>
                    </div>

                    {/* Default Alt Text / Caption */}
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Cover Image Description / Alt Text
                      </label>
                      <input
                        type="text"
                        value={activePost.cover_image_alt || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setActivePost((prev) => {
                            const updatedList = [...(prev?.cover_images || [])];
                            if (updatedList[0]) {
                              updatedList[0] = { ...updatedList[0], alt: val };
                            }
                            return {
                              ...prev,
                              cover_image_alt: val,
                              cover_images: updatedList,
                            };
                          });
                        }}
                        placeholder="e.g. Breast Cancer Awareness Outreach Flyer"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#2E1650]"
                      />
                    </div>

                    {/* Uploaded Cover Images Grid */}
                    {coverImagesList.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                        {coverImagesList.map((img, idx) => (
                          <div
                            key={`${img.url}-${idx}`}
                            className={`bg-white rounded-2xl border p-2.5 space-y-2 relative ${
                              idx === 0
                                ? "border-[#D4A017] ring-2 ring-[#D4A017]/30"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="relative w-full h-28 rounded-xl overflow-hidden bg-gray-100">
                              <Image
                                src={img.url}
                                alt={img.alt || `Slide ${idx + 1}`}
                                fill
                                unoptimized={img.url.startsWith("data:")}
                                className="object-cover"
                                sizes="200px"
                              />
                              <span
                                className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  idx === 0
                                    ? "bg-[#D4A017] text-[#2E1650]"
                                    : "bg-[#2E1650]/85 text-white"
                                }`}
                              >
                                {idx === 0 ? "Primary Cover" : `Slide #${idx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeCoverAt(idx)}
                                title="Remove this image"
                                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center text-xs cursor-pointer"
                              >
                                ×
                              </button>
                            </div>

                            <input
                              type="text"
                              value={img.alt || ""}
                              onChange={(e) => updateCoverAlt(idx, e.target.value)}
                              placeholder={`Caption for slide #${idx + 1}`}
                              className="w-full px-2.5 py-1 rounded-lg border border-gray-200 text-[11px]"
                            />

                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => makePrimaryCover(idx)}
                                className="w-full py-1 rounded-lg bg-[#FAF6EC] hover:bg-[#D4A017]/25 text-[11px] font-medium text-[#2E1650] transition-colors cursor-pointer"
                              >
                                Set as Primary Cover
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Visual Rich Text Editor */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold">
                      Article Content *{" "}
                      <span className="font-normal text-gray-500">
                        (Write naturally or copy &amp; paste directly from Google Docs)
                      </span>
                    </label>
                    <RichTextEditor
                      value={activePost.body || ""}
                      onChange={(html) => setActivePost((prev) => ({ ...prev, body: html }))}
                      onRequestInlineImage={() => setShowInlineModal(true)}
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
                      className="px-5 py-2.5 border border-gray-300 rounded-full text-xs font-medium hover:border-gray-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-7 py-2.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-semibold rounded-full text-sm transition-colors disabled:opacity-50 cursor-pointer"
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
                    <h2 className="text-xl font-medium">All Dispatches &amp; Articles</h2>
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
                      className="px-4 py-2 bg-[#D4A017] text-[#2E1650] text-xs font-medium rounded-full cursor-pointer"
                    >
                      Write Your First Story
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {posts.map((p) => {
                      const slideCount = p.cover_images?.length || (p.cover_image_url ? 1 : 0);
                      return (
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
                              {slideCount > 1 && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF6EC] border border-[#D4A017]/40 text-[#2E1650]">
                                  {slideCount} cover slides
                                </span>
                              )}
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
                              className="px-3.5 py-1.5 border border-gray-300 hover:border-[#2E1650] text-xs rounded-full transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePostItem(p.id)}
                              className="px-3.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs rounded-full transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TAB 2: CONTACT REQUESTS & INQUIRIES */}
        {currentTab === "contacts" && (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm space-y-6">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-medium">Contact Requests &amp; Inquiries</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing {contactMessages.length} {contactMessages.length === 1 ? "inquiry" : "inquiries"} submitted through the contact form.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search sender, email, message..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-xs bg-gray-50 focus:outline-none focus:border-[#2E1650] w-full sm:w-64"
                />
                <button
                  type="button"
                  onClick={loadContactMessages}
                  disabled={loadingContacts}
                  className="px-4 py-2 border border-gray-300 hover:border-[#2E1650] text-xs rounded-full transition-colors cursor-pointer shrink-0"
                >
                  {loadingContacts ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>

            {loadingContacts ? (
              <div className="p-12 text-center text-sm text-gray-500">Loading inquiries...</div>
            ) : filteredContacts.length === 0 ? (
              <div className="p-16 text-center space-y-2">
                <p className="text-base font-medium text-[#2E1650]">No inquiries found.</p>
                <p className="text-xs text-gray-500">
                  {contactSearch
                    ? "No contact requests match your search filter."
                    : "When people submit messages via the contact form, they will appear right here."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 px-6 pb-6">
                {filteredContacts.map((msg) => (
                  <div key={msg.id} className="py-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-base text-[#2E1650]">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}?subject=${encodeURIComponent(msg.subject ? `Re: ${msg.subject}` : "THRIVE Initiative Response")}`}
                          className="px-3 py-1 rounded-full bg-[#FAF6EC] border border-[#D4A017]/40 text-xs font-medium text-[#2E1650] hover:bg-[#D4A017] transition-colors"
                          title="Click to reply via email"
                        >
                          ✉️ {msg.email}
                        </a>
                        {msg.subject && (
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[11px] font-medium text-gray-700">
                            Subject: {msg.subject}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="text-xs text-gray-400">
                          {new Date(msg.created_at).toLocaleString("en-NG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteContactItem(msg.id)}
                          className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 border border-red-200 rounded-full transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-[#2E1650] whitespace-pre-wrap leading-relaxed">
                      {msg.message}
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
                <h3 className="font-medium text-lg">Insert Image into Article</h3>
                <button
                  onClick={() => setShowInlineModal(false)}
                  className="text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <IconClose className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Upload Image File</label>
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
                <label className="block text-xs font-semibold mb-1">Alt Text / Description</label>
                <input
                  type="text"
                  value={inlineAlt}
                  onChange={(e) => setInlineAlt(e.target.value)}
                  placeholder="Description of the image"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Caption (Optional)</label>
                <input
                  type="text"
                  value={inlineCaption}
                  onChange={(e) => setInlineCaption(e.target.value)}
                  placeholder="e.g. Community members at our outreach event"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInlineModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertInlineImage}
                  disabled={!inlineUrl}
                  className="px-4 py-2 bg-[#D4A017] text-[#2E1650] text-xs font-semibold rounded-full disabled:opacity-50 cursor-pointer"
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
