"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site.config";
import { IconCheck } from "@/components/shared/Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError("Unable to subscribe right now");
      }
    } catch {
      setError("Network error. Please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-[#2E1650] text-white pt-20 pb-12 border-t border-[#381A5F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Brand and Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block bg-white p-2.5 rounded-2xl">
              <Image
                src="/logo/thrive-logo-clean.png"
                alt="THRIVE Initiative"
                width={140}
                height={34}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              THRIVE Initiative is a registered Nigerian non-profit organization dedicated to sustainable community progress in Lagos, Nigeria.
            </p>
            <div className="text-xs text-white/70 space-y-1">
              <p>{siteConfig.contact.address}</p>
              <p>{siteConfig.contact.phone}</p>
              <p>{siteConfig.contact.email}</p>
            </div>

            {/* Official White Social Marks */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about/story" className="hover:text-white transition-colors">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="hover:text-white transition-colors">
                  About the Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  From the Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Programs
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/programs/women-empowerment" className="hover:text-white transition-colors">
                  Women Empowerment & Gender
                </Link>
              </li>
              <li>
                <Link href="/programs/child-education" className="hover:text-white transition-colors">
                  Child Education & Youth
                </Link>
              </li>
              <li>
                <Link href="/programs/skills-acquisition" className="hover:text-white transition-colors">
                  Skills Acquisition
                </Link>
              </li>
              <li>
                <Link href="/programs/advocacy-inclusion" className="hover:text-white transition-colors">
                  Advocacy & Social Inclusion
                </Link>
              </li>
              <li>
                <Link href="/programs/community-development" className="hover:text-white transition-colors">
                  Community Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Subscribe to receive project milestone dispatches and field updates directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded-2xl flex items-center gap-2 text-xs text-[#D4A017]">
                <IconCheck className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4A017]"
                />
                {error && <p className="text-[11px] text-red-300">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-xs font-medium rounded-full transition-colors disabled:opacity-50"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* UN SDGs Plain Text Line */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/60">
            Supporting United Nations Sustainable Development Goals 3, 4, 5, 10, 11, and 17.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 THRIVE Initiative Africa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
