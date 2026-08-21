"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site.config";
import { ChevronDown, Menu, X } from "lucide-react";
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
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-200",
          isLightNav
            ? "bg-white text-thrive-purple-900 border-b border-gray-200 py-3.5"
            : "bg-transparent text-white py-5 border-b border-white/10"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={cn(
                "font-serif text-2xl sm:text-3xl font-bold tracking-tight transition-colors",
                isLightNav ? "text-thrive-purple-900" : "text-white"
              )}
            >
              THRIVE
            </span>
            <span
              className={cn(
                "text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full transition-colors",
                isLightNav
                  ? "bg-gray-100 text-thrive-purple-900 border border-gray-200"
                  : "bg-white/20 text-white"
              )}
            >
              Initiative
            </span>
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
                        "flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors",
                        isLightNav
                          ? isActive
                            ? "text-thrive-purple-900 font-semibold bg-gray-100"
                            : "text-gray-700 hover:text-thrive-purple-900 hover:bg-gray-50"
                          : isActive
                          ? "text-white font-semibold bg-white/20"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 mt-2 w-72 bg-white text-thrive-purple-900 border border-gray-200 rounded-2xl p-2 z-50 shadow-xs"
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
                                ? "bg-gray-100 text-thrive-purple-900 font-bold"
                                : "text-gray-700 hover:bg-gray-50 hover:text-thrive-purple-900"
                            )}
                          >
                            <div className="text-sm font-semibold">{sub.label}</div>
                            {sub.description && (
                              <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
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
                    "px-3.5 py-2 rounded-full text-sm font-medium transition-colors",
                    isLightNav
                      ? isActive
                        ? "text-thrive-purple-900 font-semibold bg-gray-100"
                        : "text-gray-700 hover:text-thrive-purple-900 hover:bg-gray-50"
                      : isActive
                      ? "text-white font-semibold bg-white/20"
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
              className="px-6 py-2.5 rounded-full bg-thrive-gold-600 hover:bg-thrive-gold-500 text-thrive-purple-900 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Donate
            </button>

            <Link
              href="/get-involved/volunteer"
              className={cn(
                "px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider transition-all border",
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
              className="px-3.5 py-1.5 rounded-full bg-thrive-gold-600 text-thrive-purple-900 font-bold text-xs"
            >
              Donate
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl border transition-colors",
                isLightNav
                  ? "border-gray-200 text-thrive-purple-900 bg-white"
                  : "border-white/20 text-white bg-white/10"
              )}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white text-thrive-purple-900 border-t border-gray-200 px-5 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col space-y-1">
              {siteConfig.nav.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <div key={item.label} className="border-b border-gray-100 pb-2">
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
                                "block px-3 py-2 rounded-xl text-sm font-medium",
                                pathname === sub.href
                                  ? "bg-gray-100 text-thrive-purple-900 font-bold"
                                  : "text-gray-700 hover:bg-gray-50"
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
                          "block px-3 py-2.5 rounded-xl text-sm font-medium",
                          pathname === item.href
                            ? "bg-gray-100 text-thrive-purple-900 font-bold"
                            : "text-gray-700 hover:bg-gray-50"
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
                className="w-full py-3 rounded-full bg-thrive-gold-600 text-thrive-purple-900 font-bold text-center text-sm"
              >
                Donate
              </button>
              <Link
                href="/get-involved/volunteer"
                className="w-full py-3 rounded-full bg-white border border-thrive-purple-900 text-thrive-purple-900 font-semibold text-center text-sm"
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
