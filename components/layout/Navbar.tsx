"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const aboutCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAbout = () => {
    if (aboutCloseTimer.current) clearTimeout(aboutCloseTimer.current);
    setProgramsDropdownOpen(false);
    setAboutDropdownOpen(true);
  };

  const closeAboutDelayed = () => {
    if (aboutCloseTimer.current) clearTimeout(aboutCloseTimer.current);
    aboutCloseTimer.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 180);
  };

  const openPrograms = () => {
    if (programsCloseTimer.current) clearTimeout(programsCloseTimer.current);
    setAboutDropdownOpen(false);
    setProgramsDropdownOpen(true);
  };

  const closeProgramsDelayed = () => {
    if (programsCloseTimer.current) clearTimeout(programsCloseTimer.current);
    programsCloseTimer.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 180);
  };

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

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setProgramsDropdownOpen(false);
  }, [pathname]);

  const volunteerFormUrl = process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL;
  const getInvolvedHref = volunteerFormUrl || "/contact";
  const getInvolvedExternal = Boolean(volunteerFormUrl);

  return (
    <header className="sticky top-4 z-50 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md border border-[#2E1650]/10 rounded-full px-5 sm:px-7 py-3 flex items-center justify-between shadow-sm">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/thrive-logo-clean.png"
            alt="THRIVE Initiative"
            width={136}
            height={34}
            className="h-8 sm:h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2E1650]">
          <Link
            href="/"
            className={`transition-colors hover:text-[#D4A017] py-1.5 ${
              pathname === "/" ? "font-semibold text-[#D4A017]" : ""
            }`}
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={openAbout}
            onMouseLeave={closeAboutDelayed}
          >
            <button
              type="button"
              aria-expanded={aboutDropdownOpen}
              onClick={() => setAboutDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 transition-colors hover:text-[#D4A017] py-1.5 ${
                pathname.startsWith("/about") ? "font-semibold text-[#D4A017]" : ""
              }`}
            >
              <span>About Us</span>
              <IconChevronDown
                className={`w-3.5 h-3.5 text-[#2E1650]/60 transition-transform duration-150 ${
                  aboutDropdownOpen ? "rotate-180 text-[#D4A017]" : ""
                }`}
              />
            </button>

            {aboutDropdownOpen && (
              <div
                className="absolute top-full left-0 pt-2.5 w-56 z-50"
                onMouseEnter={openAbout}
                onMouseLeave={closeAboutDelayed}
              >
                <div className="bg-white border border-[#2E1650]/10 rounded-2xl p-2 shadow-lg">
                  <Link
                    href="/about/story"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] hover:text-[#2E1650] transition-colors"
                  >
                    Our Story & Values
                  </Link>
                  <Link
                    href="/about/team"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] hover:text-[#2E1650] transition-colors"
                  >
                    About the Team
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Programs Dropdown */}
          <div
            ref={programsRef}
            className="relative"
            onMouseEnter={openPrograms}
            onMouseLeave={closeProgramsDelayed}
          >
            <button
              type="button"
              aria-expanded={programsDropdownOpen}
              onClick={() => setProgramsDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 transition-colors hover:text-[#D4A017] py-1.5 ${
                pathname.startsWith("/programs") ? "font-semibold text-[#D4A017]" : ""
              }`}
            >
              <span>Programs</span>
              <IconChevronDown
                className={`w-3.5 h-3.5 text-[#2E1650]/60 transition-transform duration-150 ${
                  programsDropdownOpen ? "rotate-180 text-[#D4A017]" : ""
                }`}
              />
            </button>

            {programsDropdownOpen && (
              <div
                className="absolute top-full left-0 pt-2.5 w-72 z-50"
                onMouseEnter={openPrograms}
                onMouseLeave={closeProgramsDelayed}
              >
                <div className="bg-white border border-[#2E1650]/10 rounded-2xl p-2 shadow-lg">
                  <Link
                    href="/programs"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#2E1650] hover:bg-[#FAF6EC] border-b border-gray-100 mb-1 transition-colors"
                  >
                    All Programs
                  </Link>
                  <Link
                    href="/programs/women-empowerment"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                  >
                    Women Empowerment & Gender
                  </Link>
                  <Link
                    href="/programs/child-education"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                  >
                    Child Education & Youth
                  </Link>
                  <Link
                    href="/programs/skills-acquisition"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                  >
                    Skills Acquisition
                  </Link>
                  <Link
                    href="/programs/advocacy-inclusion"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                  >
                    Advocacy & Social Inclusion
                  </Link>
                  <Link
                    href="/programs/community-development"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FAF6EC] text-[#2E1650] transition-colors"
                  >
                    Community Development
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Get Involved */}
          {getInvolvedExternal ? (
            <a
              href={getInvolvedHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D4A017] py-1.5"
            >
              Get Involved
            </a>
          ) : (
            <Link href="/contact" className="transition-colors hover:text-[#D4A017] py-1.5">
              Get Involved
            </Link>
          )}

          {/* Blog */}
          <Link
            href="/blog"
            className={`transition-colors hover:text-[#D4A017] py-1.5 ${
              pathname.startsWith("/blog") ? "font-semibold text-[#D4A017]" : ""
            }`}
          >
            Blog
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`transition-colors hover:text-[#D4A017] py-1.5 ${
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
            className="px-6 py-2.5 rounded-full bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Donate Now
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
          <nav className="flex flex-col space-y-1.5 text-sm text-[#2E1650]">
            <Link
              href="/"
              className="py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
            >
              Home
            </Link>

            {/* Mobile About Us */}
            <div>
              <button
                type="button"
                onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
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
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
                  >
                    Our Story & Values
                  </Link>
                  <Link
                    href="/about/team"
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
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
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
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
                    className="block py-2 text-sm font-semibold text-[#2E1650]"
                  >
                    All Programs
                  </Link>
                  <Link
                    href="/programs/women-empowerment"
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
                  >
                    Women Empowerment & Gender
                  </Link>
                  <Link
                    href="/programs/child-education"
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
                  >
                    Child Education & Youth
                  </Link>
                  <Link
                    href="/programs/skills-acquisition"
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
                  >
                    Skills Acquisition
                  </Link>
                  <Link
                    href="/programs/advocacy-inclusion"
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
                  >
                    Advocacy & Social Inclusion
                  </Link>
                  <Link
                    href="/programs/community-development"
                    className="block py-2 text-sm text-gray-700 hover:text-[#D4A017]"
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
                className="py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
              >
                Get Involved
              </a>
            ) : (
              <Link
                href="/contact"
                className="py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
              >
                Get Involved
              </Link>
            )}

            <Link
              href="/blog"
              className="py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="py-2.5 px-3 rounded-xl hover:bg-[#FAF6EC] font-medium"
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
              className="w-full py-3 bg-[#D4A017] hover:bg-[#B88912] text-[#2E1650] font-semibold rounded-full text-center text-sm transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
