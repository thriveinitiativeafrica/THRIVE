"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site.config";
import { openDonateModal } from "@/components/shared/DonateModal";
import { IconChevronDown, IconMenu, IconClose } from "@/components/shared/Icons";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileProgramsExpanded, setMobileProgramsExpanded] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (programsRef.current && !programsRef.current.contains(event.target as Node)) {
        setProgramsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const volunteerFormUrl = process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL;
  const getInvolvedHref = volunteerFormUrl || "/contact";
  const getInvolvedExternal = Boolean(volunteerFormUrl);

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200/90 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/thrive-logo-clean.png"
            alt="THRIVE Initiative"
            width={130}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#2E1650]">
          <Link
            href="/"
            className={`transition-colors hover:text-[#D4A017] ${
              pathname === "/" ? "font-semibold text-[#D4A017]" : ""
            }`}
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-[#D4A017] py-1"
            >
              <span>About Us</span>
              <IconChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl py-2 shadow-sm z-50">
                <Link
                  href="/about/story"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  Our Story & Values
                </Link>
                <Link
                  href="/about/team"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  About the Team
                </Link>
              </div>
            )}
          </div>

          {/* Programs Dropdown */}
          <div
            ref={programsRef}
            className="relative"
            onMouseEnter={() => setProgramsDropdownOpen(true)}
            onMouseLeave={() => setProgramsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-[#D4A017] py-1"
            >
              <span>Programs</span>
              <IconChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {programsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl py-2 shadow-sm z-50">
                <Link
                  href="/programs"
                  className="block px-4 py-2 text-xs font-semibold text-[#2E1650] hover:bg-[#FAF6EC] border-b border-gray-100 transition-colors"
                >
                  All Programs
                </Link>
                <Link
                  href="/programs/women-empowerment"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  Women Empowerment & Gender
                </Link>
                <Link
                  href="/programs/child-education"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  Child Education & Youth
                </Link>
                <Link
                  href="/programs/skills-acquisition"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  Skills Acquisition
                </Link>
                <Link
                  href="/programs/advocacy-inclusion"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  Advocacy & Social Inclusion
                </Link>
                <Link
                  href="/programs/community-development"
                  className="block px-4 py-2 text-xs hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                >
                  Community Development
                </Link>
              </div>
            )}
          </div>

          {/* Get Involved */}
          {getInvolvedExternal ? (
            <a
              href={getInvolvedHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D4A017]"
            >
              Get Involved
            </a>
          ) : (
            <Link href="/contact" className="transition-colors hover:text-[#D4A017]">
              Get Involved
            </Link>
          )}

          {/* Blog */}
          <Link
            href="/blog"
            className={`transition-colors hover:text-[#D4A017] ${
              pathname.startsWith("/blog") ? "font-semibold text-[#D4A017]" : ""
            }`}
          >
            Blog
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`transition-colors hover:text-[#D4A017] ${
              pathname === "/contact" ? "font-semibold text-[#D4A017]" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Donate Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openDonateModal()}
            className="px-5 py-2 rounded-full bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-xs sm:text-sm font-medium transition-colors"
          >
            Donate
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2E1650] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl p-5 shadow-lg space-y-4">
          <nav className="flex flex-col space-y-2 text-sm text-[#2E1650]">
            <Link
              href="/"
              className="py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
            >
              Home
            </Link>

            {/* Mobile About Us */}
            <div>
              <button
                type="button"
                onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
              >
                <span>About Us</span>
                <IconChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAboutExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAboutExpanded && (
                <div className="pl-6 space-y-1 py-1">
                  <Link
                    href="/about/story"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    Our Story & Values
                  </Link>
                  <Link
                    href="/about/team"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    About the Team
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Programs */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProgramsExpanded(!mobileProgramsExpanded)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
              >
                <span>Programs</span>
                <IconChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileProgramsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileProgramsExpanded && (
                <div className="pl-6 space-y-1 py-1">
                  <Link
                    href="/programs"
                    className="block py-1.5 text-xs font-semibold text-[#2E1650]"
                  >
                    All Programs
                  </Link>
                  <Link
                    href="/programs/women-empowerment"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    Women Empowerment & Gender
                  </Link>
                  <Link
                    href="/programs/child-education"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    Child Education & Youth
                  </Link>
                  <Link
                    href="/programs/skills-acquisition"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    Skills Acquisition
                  </Link>
                  <Link
                    href="/programs/advocacy-inclusion"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    Advocacy & Social Inclusion
                  </Link>
                  <Link
                    href="/programs/community-development"
                    className="block py-1.5 text-xs text-gray-700 hover:text-[#D4A017]"
                  >
                    Community Development
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Get Involved */}
            {getInvolvedExternal ? (
              <a
                href={getInvolvedHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
              >
                Get Involved
              </a>
            ) : (
              <Link
                href="/contact"
                className="py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
              >
                Get Involved
              </Link>
            )}

            <Link
              href="/blog"
              className="py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="py-2 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openDonateModal();
              }}
              className="w-full py-3 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-medium rounded-full text-center text-sm transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
