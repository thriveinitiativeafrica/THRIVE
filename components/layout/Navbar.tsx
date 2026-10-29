"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site.config";
import { siteImages } from "@/content/images.config";
import { IconChevronDown, IconMenu, IconClose } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";
import { DonateModal } from "../shared/DonateModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isLightNav = isScrolled || !isHome;

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isLightNav
            ? "bg-white/95 backdrop-blur-md text-thrive-purple-900 border-b border-thrive-border shadow-xs py-3"
            : "bg-transparent text-white py-4 sm:py-5 border-b border-white/10"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with New Official Asset */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]",
              !isLightNav && "bg-white/95 px-3 py-1.5 rounded-2xl shadow-sm border border-white/20"
            )}
            aria-label="THRIVE Initiative Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <Image
                src={siteImages.logo.emblem}
                alt="THRIVE Emblem"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-thrive-purple-900 leading-none">
                THRIVE
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-thrive-gold-600 leading-tight">
                Initiative
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {siteConfig.nav.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                pathname === item.href ||
                (hasChildren && item.children?.some((c) => pathname === c.href));
              const isOpen = openDropdown === item.label;

              if (hasChildren) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={cn(
                        "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors",
                        isLightNav
                          ? isActive
                            ? "text-thrive-purple-900 bg-thrive-purple-100"
                            : "text-thrive-ink-800 hover:text-thrive-purple-900 hover:bg-thrive-cream"
                          : isActive
                          ? "text-white bg-white/20"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{item.label}</span>
                      <IconChevronDown
                        className={cn("w-3.5 h-3.5", isOpen && "rotate-180")}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 mt-2 w-72 bg-white text-thrive-purple-900 border border-thrive-border rounded-2xl p-2.5 z-50 shadow-xl"
                      >
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              "block p-2.5 rounded-xl transition-colors text-left",
                              pathname === sub.href
                                ? "bg-thrive-purple-50 text-thrive-purple-900 font-bold"
                                : "text-thrive-ink-800 hover:bg-thrive-cream hover:text-thrive-purple-900"
                            )}
                          >
                            <div className="text-xs font-bold uppercase tracking-wider">
                              {sub.label}
                            </div>
                            {sub.description && (
                              <div className="text-[11px] text-thrive-ink-600 line-clamp-1 mt-0.5">
                                {sub.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors",
                    isLightNav
                      ? isActive
                        ? "text-thrive-purple-900 bg-thrive-purple-100"
                        : "text-thrive-ink-800 hover:text-thrive-purple-900 hover:bg-thrive-cream"
                      : isActive
                      ? "text-white bg-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDonateModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              Donate
            </button>

            <Link
              href="/get-involved/volunteer"
              className={cn(
                "px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all border",
                isLightNav
                  ? "border-thrive-purple-900 text-thrive-purple-900 hover:bg-thrive-purple-900 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-thrive-purple-900"
              )}
            >
              Volunteer
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setDonateModalOpen(true)}
              className="px-4 py-1.5 rounded-full bg-thrive-gold-600 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Donate
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl border transition-colors",
                isLightNav
                  ? "border-thrive-border text-thrive-purple-900 bg-white"
                  : "border-white/20 text-white bg-white/10"
              )}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white text-thrive-purple-900 border-t border-thrive-border px-5 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <nav className="flex flex-col space-y-1">
              {siteConfig.nav.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <div key={item.label} className="border-b border-thrive-border-light pb-2">
                    {hasChildren ? (
                      <div>
                        <div className="px-3 py-2 text-xs uppercase font-bold tracking-wider text-thrive-purple-900">
                          {item.label}
                        </div>
                        <div className="pl-3 space-y-1">
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={cn(
                                "block px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider",
                                pathname === sub.href
                                  ? "bg-thrive-purple-50 text-thrive-purple-900"
                                  : "text-thrive-ink-800 hover:bg-thrive-cream"
                              )}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider",
                          pathname === item.href
                            ? "bg-thrive-purple-50 text-thrive-purple-900"
                            : "text-thrive-ink-800 hover:bg-thrive-cream"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDonateModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-thrive-gold-600 text-thrive-purple-900 font-bold text-center text-xs uppercase tracking-wider shadow-sm"
              >
                Donate
              </button>
              <Link
                href="/get-involved/volunteer"
                className="w-full py-3 rounded-full bg-white border-2 border-thrive-purple-900 text-thrive-purple-900 font-bold text-center text-xs uppercase tracking-wider"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Donation Modal */}
      <DonateModal isOpen={donateModalOpen} onClose={() => setDonateModalOpen(false)} />
    </>
  );
}
