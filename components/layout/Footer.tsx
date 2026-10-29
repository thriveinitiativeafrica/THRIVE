"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site.config";
import { siteImages } from "@/content/images.config";
import { sdgList } from "@/content/sdgs";
import { SdgIcon } from "@/components/shared/SdgIcon";
import {
  IconMapPin,
  IconMail,
  IconPhone,
  IconCheckCircle,
} from "@/components/shared/Icons";
import { SectionBackground } from "@/components/shared/SectionBackground";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-thrive-purple-900 text-white border-t border-thrive-purple-800 pt-16 pb-10 relative overflow-hidden">
      {/* ProofDeck-style Background Atmosphere */}
      <SectionBackground variant="purple" pattern="concentric-arcs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block" aria-label="THRIVE Initiative Home">
              <div className="bg-white px-4 py-2.5 rounded-2xl inline-flex items-center gap-3 shadow-md border border-white/20 transition-transform duration-200 hover:scale-[1.02]">
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src={siteImages.logo.emblem}
                    alt="THRIVE Emblem"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-lg font-bold tracking-tight text-thrive-purple-900 leading-none">
                    THRIVE
                  </span>
                  <span className="text-[9px] tracking-widest uppercase font-semibold text-thrive-gold-600 leading-tight">
                    Initiative
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs text-thrive-gold-200 font-medium tracking-wide">
              {siteConfig.acronymName}
            </p>

            <p className="text-sm text-thrive-purple-100/80 leading-relaxed">
              Empowering people, uplifting communities, and building a better future through targeted programs in women empowerment, child education, skills development, and grassroots advocacy in Nigeria.
            </p>

            {/* Official Social Brand SVGs */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-thrive-gold-600 hover:text-thrive-purple-900 flex items-center justify-center text-white/90 transition-colors"
                aria-label="THRIVE Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-thrive-gold-600 hover:text-thrive-purple-900 flex items-center justify-center text-white/90 transition-colors"
                aria-label="THRIVE Twitter / X Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-thrive-gold-600 hover:text-thrive-purple-900 flex items-center justify-center text-white/90 transition-colors"
                aria-label="THRIVE Instagram Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-thrive-gold-600 hover:text-thrive-purple-900 flex items-center justify-center text-white/90 transition-colors"
                aria-label="THRIVE LinkedIn Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-thrive-gold-600 hover:text-thrive-purple-900 flex items-center justify-center text-white/90 transition-colors"
                aria-label="THRIVE YouTube Channel"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-thrive-purple-100/80">
              <li>
                <Link href="/stories" className="editorial-link hover:text-thrive-gold-400">
                  Stories &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/updates" className="editorial-link hover:text-thrive-gold-400">
                  Field Updates
                </Link>
              </li>
              <li>
                <Link href="/impact" className="editorial-link hover:text-thrive-gold-400">
                  Impact Reports
                </Link>
              </li>
              <li>
                <Link href="/get-involved/volunteer" className="editorial-link hover:text-thrive-gold-400">
                  Volunteer Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="editorial-link hover:text-thrive-gold-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-thrive-purple-100/80">
              <li>
                <Link href="/programs/women-empowerment" className="editorial-link hover:text-thrive-gold-400">
                  Women Empowerment
                </Link>
              </li>
              <li>
                <Link href="/programs/child-education" className="editorial-link hover:text-thrive-gold-400">
                  Child Education
                </Link>
              </li>
              <li>
                <Link href="/programs/skills-acquisition" className="editorial-link hover:text-thrive-gold-400">
                  Skills Acquisition
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-thrive-gold-400 font-semibold editorial-link hover:text-thrive-gold-300">
                  Donate in Naira
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Lagos Liaison Office
            </h4>

            <div className="space-y-2 text-xs sm:text-sm text-thrive-purple-100/80">
              <div className="flex items-start gap-2.5">
                <IconMapPin className="text-thrive-gold-400 shrink-0 mt-0.5" size={16} />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconMail className="text-thrive-gold-400 shrink-0" size={16} />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <IconPhone className="text-thrive-gold-400 shrink-0" size={16} />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            {/* Newsletter Subscription with Clean Form */}
            <div className="pt-2">
              <p className="text-xs text-thrive-purple-100/90 font-medium mb-2">
                Receive monthly grassroots updates:
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-thrive-purple-800 rounded-xl border border-thrive-purple-700 text-xs text-white">
                  <IconCheckCircle className="text-emerald-400 shrink-0" size={16} />
                  <span>Thank you for subscribing to THRIVE community dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-thrive-purple-800/80 border border-thrive-purple-600 px-3.5 py-2 rounded-full text-xs text-white placeholder-thrive-purple-100/40 focus:outline-none focus:border-thrive-gold-400"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shrink-0 shadow-sm"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* SDG Official Badges Strip */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-thrive-purple-100/70 font-medium">
            Committed to the United Nations Sustainable Development Goals (SDGs):
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sdgList.map((sdg) => (
              <span
                key={sdg.number}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold text-white shadow-xs"
                style={{ backgroundColor: sdg.color }}
                title={`SDG ${sdg.number}: ${sdg.title}`}
              >
                <SdgIcon number={sdg.number} className="w-3.5 h-3.5 text-white" size={14} />
                <span>SDG {sdg.number} • {sdg.shortTitle}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright, Verification Notice & Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-thrive-purple-100/60">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Registered Nigerian Non-Profit Organization.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/studio" className="hover:text-thrive-gold-400 font-semibold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
