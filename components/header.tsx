"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { 
    name: "About", 
    href: "#about",
    submenu: [
      { name: "Our Story", href: "#about" },
      { name: "Vision & Mission", href: "#about" },
      { name: "Leadership", href: "#about" },
    ]
  },
  { 
    name: "Academics", 
    href: "#academics",
    submenu: [
      { name: "Primary School", href: "#academics" },
      { name: "Secondary School", href: "#academics" },
      { name: "Higher Secondary", href: "#academics" },
    ]
  },
  { name: "Facilities", href: "#facilities" },
  { name: "Admissions", href: "#admissions" },
  { name: "Gallery", href: "#gallery" },
  { name: "News", href: "#news" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-[var(--navy)] text-white">
        <div className="max-w-7xl mx-auto px-8 py-2.5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white/80 hover:text-[var(--gold)] transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:admissions@chhetrapalschool.edu.in" className="flex items-center gap-2 text-white/80 hover:text-[var(--gold)] transition-colors">
                <Mail className="w-4 h-4" />
                <span>admissions@chhetrapalschool.edu.in</span>
              </a>
            </div>
            <div className="text-white/60">
              Chhetrapal Valley, Himachal Pradesh
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white shadow-md py-3"
            : "bg-white/0 py-4"
        )}
      >
        {/* Background overlay for non-scrolled state */}
        {!isScrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        )}
        
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={cn(
                "w-11 h-11 rounded-lg flex items-center justify-center transition-colors",
                isScrolled ? "bg-[var(--navy)]" : "bg-white"
              )}>
                <span className={cn(
                  "font-bold text-xl",
                  isScrolled ? "text-[var(--gold)]" : "text-[var(--navy)]"
                )}>C</span>
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-bold text-lg tracking-tight transition-colors",
                  isScrolled ? "text-[var(--navy)]" : "text-white"
                )}>
                  Chhetrapal School
                </span>
                <span className={cn(
                  "text-[10px] tracking-widest uppercase transition-colors",
                  isScrolled ? "text-[var(--navy)]/60" : "text-white/70"
                )}>
                  Est. 1924
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1",
                      isScrolled 
                        ? "text-[var(--navy)] hover:bg-[var(--navy)]/5" 
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    {link.name}
                    {link.submenu && (
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        activeDropdown === link.name && "rotate-180"
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.submenu && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-[var(--navy)]/80 hover:text-[var(--navy)] hover:bg-gray-50 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className={cn(
                  "text-sm font-medium",
                  isScrolled 
                    ? "text-[var(--navy)] hover:bg-[var(--navy)]/5" 
                    : "text-white hover:bg-white/10"
                )}
              >
                Parent Portal
              </Button>
              <Button
                className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-semibold px-5"
              >
                Apply Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg",
                isScrolled ? "text-[var(--navy)]" : "text-white"
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-4 text-[var(--navy)] font-medium hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <Button variant="outline" className="w-full">
                  Parent Portal
                </Button>
                <Button className="w-full bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)]">
                  Apply Now
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
