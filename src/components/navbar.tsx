"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";

// Simple inline SVG social icons (lucide-react doesn't include brand icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our History", href: "/about#history" },
      { label: "Vision & Mission", href: "/about#mission" },
      { label: "Principal's Message", href: "/about#principal" },
      { label: "Management Team", href: "/about#management" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Primary Level", href: "/academics#primary" },
      { label: "Lower Secondary", href: "/academics#lower-secondary" },
      { label: "Secondary Level", href: "/academics#secondary" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* ── Top Utility Bar ── */}
      <div className="bg-[#1a3a6b] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> +977-10-XX-XXXXXX
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> info@chhetrapalschool.edu.np
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-orange-300 transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-orange-300 transition-colors">
              <YoutubeIcon />
            </a>
            <a href="#" aria-label="Twitter / X" className="hover:text-orange-300 transition-colors">
              <TwitterIcon />
            </a>
            <span className="pl-2 border-l border-white/30">
              <Link href="/admissions" className="hover:text-orange-300 font-medium">Online Admission</Link>
            </span>
          </div>
        </div>
      </div>

      {/* ── Branded Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative h-14 w-14 md:h-16 md:w-16 bg-white border border-gray-200 rounded-md overflow-hidden shadow flex-shrink-0">
              <Image
                src="/school-logo.jpeg"
                alt="Chhetrapal Secondary School logo"
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
            <div>
              <div className="text-[#1a3a6b] font-extrabold text-lg md:text-2xl leading-tight tracking-tight">
                Chhetrapal Secondary School
              </div>
              <div className="text-gray-500 text-xs md:text-sm font-medium tracking-wide">
                छेत्रपाल माध्यमिक विद्यालय
              </div>
              <div className="text-gray-400 text-xs hidden md:block tracking-widest uppercase mt-0.5">
                Nuwakot, Bagmati Province, Nepal
              </div>
            </div>
          </Link>

          {/* Gov. affiliation badges */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase tracking-widest">Affiliated To</div>
              <div className="text-sm font-bold text-[#1a3a6b]">CDC / NEB Nepal</div>
              <div className="text-xs text-gray-500">Reg. No: XXXXXXX</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Primary Navigation Bar ── */}
      <nav className="bg-[#1a3a6b] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-3.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-[#e8841a] transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3 opacity-70" />}
                </Link>
                {link.children && (
                  <ul className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-b-md min-w-[200px] z-50">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1a3a6b] hover:text-white transition-colors border-b border-gray-50 last:border-0"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {/* Admission button */}
            <li className="ml-auto">
              <Link
                href="/admissions"
                className="flex items-center px-5 py-3.5 text-sm font-bold bg-[#e8841a] text-white hover:bg-orange-600 transition-colors"
              >
                Admission Open ›
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Mobile Nav Toggle ── */}
      <div className="md:hidden bg-[#1a3a6b] flex items-center justify-between px-4 py-3">
        <span className="text-white text-sm font-semibold">Navigation</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <nav className="flex flex-col divide-y divide-gray-100">
            {navLinks.map((link) => (
              <div key={link.label}>
                <button
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[#1a3a6b] hover:bg-blue-50"
                  onClick={() =>
                    setOpenDropdown(openDropdown === link.label ? null : link.label)
                  }
                >
                  <Link href={link.href}>{link.label}</Link>
                  {link.children && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {link.children && openDropdown === link.label && (
                  <div className="bg-blue-50/50 pl-6 flex flex-col divide-y divide-blue-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="py-2.5 px-4 text-sm text-gray-600 hover:text-[#1a3a6b]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* ── Marquee Notice Strip ── */}
      <div className="bg-amber-50 border-b border-amber-200 overflow-hidden flex items-center">
        <div className="bg-[#e8841a] text-white text-xs font-bold uppercase px-4 py-2 whitespace-nowrap flex-shrink-0 tracking-wider">
          NOTICE:
        </div>
        <div className="overflow-hidden flex-1 relative py-2">
          <div className="marquee-track text-sm text-[#1a3a6b] font-medium">
            ✹ Admissions Open for Class 1 to 12 — AY 2026/2027 &nbsp;&nbsp;&nbsp;
            ✹ SEE Exam Routine Published — Check Notice Board &nbsp;&nbsp;&nbsp;
            ✹ Annual Prize Distribution Ceremony on Baisakh 22, 2083 &nbsp;&nbsp;&nbsp;
            ✹ Parent-Teacher Meeting: Chaitra 5, 2083 &nbsp;&nbsp;&nbsp;
            ✹ Government Secondary School Under Nuwakot District Education Office &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </header>
  );
}
