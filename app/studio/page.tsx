"use client";

import React, { useState, useEffect } from "react";
import { DbPost, DbVolunteerSignup, DbContactMessage } from "@/db/schema";
import { PlusCircle, Users, Mail, BookOpen, Check, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "new-post" | "volunteers" | "messages">("posts");
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [volunteers, setVolunteers] = useState<DbVolunteerSignup[]>([]);
  const [messages, setMessages] = useState<DbContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // New post state
  const [postForm, setPostForm] = useState({
    title: "",
    slug: "",
    category: "Community Outreach",
    excerpt: "",
    content: "",
    coverImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1000&q=80",
  });
  const [postCreated, setPostCreated] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchVolunteers();
    fetchMessages();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?limit=50");
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
    setPostForm({ ...postForm, title, slug });
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postForm),
      });
      const data = await res.json();
      if (data.success) {
        setPostCreated(true);
        fetchPosts();
        setPostForm({
          title: "",
          slug: "",
          category: "Community Outreach",
          excerpt: "",
          content: "",
          coverImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1000&q=80",
        });
        setTimeout(() => setPostCreated(false), 3000);
      }
    } catch {}
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-thrive-purple-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            THRIVE Content & Data Studio
          </h1>
          <p className="text-xs sm:text-sm text-thrive-purple-100/80">
            Publish stories, review volunteer submissions, and monitor incoming community correspondence.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-xs">
          <ShieldCheck className="w-4 h-4 text-thrive-teal-400" />
          <span>Executive Portal Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-thrive-border pb-4">
        <button
          onClick={() => setActiveTab("posts")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
            activeTab === "posts"
              ? "bg-thrive-purple-900 text-white shadow-md"
              : "bg-white text-thrive-ink-600 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>Published Stories ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("new-post")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
            activeTab === "new-post"
              ? "bg-thrive-gold-600 text-thrive-purple-900 shadow-md"
              : "bg-white text-thrive-ink-600 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New Story</span>
        </button>

        <button
          onClick={() => setActiveTab("volunteers")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
            activeTab === "volunteers"
              ? "bg-thrive-purple-900 text-white shadow-md"
              : "bg-white text-thrive-ink-600 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <Users className="w-4 h-4" />
          <span>Volunteer Applications ({volunteers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={cn(
            "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
            activeTab === "messages"
              ? "bg-thrive-purple-900 text-white shadow-md"
              : "bg-white text-thrive-ink-600 border border-thrive-border hover:bg-thrive-cream"
          )}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Messages ({messages.length})</span>
        </button>
      </div>

      {/* Tab: Published Stories */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl p-6 border border-thrive-border shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-thrive-teal-700">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-thrive-purple-900 mt-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-thrive-ink-600 line-clamp-3 mt-2">{post.excerpt}</p>
                </div>
                <div className="pt-3 border-t border-thrive-border flex items-center justify-between text-xs text-thrive-ink-600">
                  <span className="text-[11px] font-mono">/blog/{post.slug}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Published
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Create New Story Form */}
      {activeTab === "new-post" && (
        <div className="max-w-3xl bg-white rounded-3xl p-8 sm:p-10 border border-thrive-border shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-thrive-purple-900">
              Publish a Field Story
            </h2>
            <p className="text-xs text-thrive-ink-600">
              Your article will appear instantly on the live /blog list and detail pages.
            </p>
          </div>

          {postCreated && (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Article published successfully and indexed to sitemap!</span>
            </div>
          )}

          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                Story Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Solar Water Brings Hope to Olomowewe Village"
                value={postForm.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-sm focus:ring-2 focus:ring-thrive-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                  URL Slug (Auto-generated) *
                </label>
                <input
                  type="text"
                  required
                  value={postForm.slug}
                  onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-sm font-mono focus:ring-2 focus:ring-thrive-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                  Category
                </label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-sm focus:ring-2 focus:ring-thrive-purple-500"
                >
                  <option value="Women Empowerment">Women Empowerment</option>
                  <option value="Child Education">Child Education & Youth</option>
                  <option value="Skills Acquisition">Skills Acquisition</option>
                  <option value="Community Outreach">Community Outreach & Relief</option>
                  <option value="Clean Water & Health">Clean Water & Health</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                Cover Image URL (Unsplash or Cloudinary)
              </label>
              <input
                type="url"
                value={postForm.coverImageUrl}
                onChange={(e) => setPostForm({ ...postForm, coverImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-sm focus:ring-2 focus:ring-thrive-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                Short Excerpt / Hook *
              </label>
              <textarea
                required
                rows={2}
                placeholder="A compelling 1-2 sentence preview for cards and search engine snippets..."
                value={postForm.excerpt}
                onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-sm focus:ring-2 focus:ring-thrive-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-thrive-purple-900 mb-1">
                Full Article Content (Markdown format supported) *
              </label>
              <textarea
                required
                rows={8}
                placeholder="Write your story using markdown headers (###), paragraphs, and quotes (>)..."
                value={postForm.content}
                onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-thrive-border text-sm font-sans focus:ring-2 focus:ring-thrive-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-sm uppercase tracking-wider shadow-lg"
            >
              {loading ? "Publishing..." : "Publish Story to Live Site"}
            </button>
          </form>
        </div>
      )}

      {/* Tab: Volunteer Applications */}
      {activeTab === "volunteers" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-thrive-purple-900">
            Registered Volunteer Applications ({volunteers.length})
          </h2>

          {volunteers.length === 0 ? (
            <p className="text-xs text-thrive-ink-600 py-6 text-center">
              No volunteer signups yet. Fill out the volunteer form on the homepage to see submissions here!
            </p>
          ) : (
            <div className="divide-y divide-thrive-border overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-thrive-purple-900 font-bold border-b border-thrive-border">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Interest</th>
                    <th className="pb-3">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-thrive-border/50">
                  {volunteers.map((v) => (
                    <tr key={v.id} className="py-2.5">
                      <td className="py-2.5 font-bold text-thrive-purple-900">{v.name}</td>
                      <td className="py-2.5 text-thrive-ink-600">{v.email}</td>
                      <td className="py-2.5 text-thrive-ink-600">{v.location || "N/A"}</td>
                      <td className="py-2.5 font-semibold text-thrive-teal-700">{v.areaOfInterest}</td>
                      <td className="py-2.5 text-thrive-ink-600">{v.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab: Contact Messages */}
      {activeTab === "messages" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thrive-border shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-thrive-purple-900">
            Incoming Messages & Inquiries ({messages.length})
          </h2>

          {messages.length === 0 ? (
            <p className="text-xs text-thrive-ink-600 py-6 text-center">
              No contact inquiries yet. Test the contact form on /contact to see messages populate here!
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-thrive-cream border border-thrive-gold-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-thrive-purple-900">
                    <span>{m.name} ({m.email})</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-thrive-purple-100 text-thrive-purple-900">
                      {m.category || "General"}
                    </span>
                  </div>
                  <div className="font-semibold text-thrive-gold-600">{m.subject}</div>
                  <p className="text-thrive-ink-800 leading-relaxed">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
