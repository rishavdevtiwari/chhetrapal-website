"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Academics", href: "#academics" },
  { name: "Facilities", href: "#facilities" },
  { name: "Admissions", href: "#admissions" },
  { name: "Gallery", href: "#gallery" },
  { name: "News", href: "#news" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="bg-[var(--navy)] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="tel:+977-01-4100000" className="flex items-center gap-2 text-white/80 hover:text-[var(--gold)] transition-colors">
                <Phone className="w-4 h-4" />
                <span>+977-01-4100000</span>
              </a>
              <a href="mailto:info@chhetrapalschool.edu.np" className="flex items-center gap-2 text-white/80 hover:text-[var(--gold)] transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@chhetrapalschool.edu.np</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_22px_rgba(15,41,66,0.12)] border-[var(--navy)]/10"
            : "bg-white/80 backdrop-blur-md border-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--navy)]">
                <span className="font-bold text-xl text-[var(--gold)]">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight heading-display text-[var(--navy)]">
                  Chhetrapal School
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[var(--navy)]/60">
                  Est. 1924
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold tracking-wide text-[var(--navy)] hover:bg-[var(--navy)]/8 rounded-xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" className="text-sm font-semibold text-[var(--navy)] hover:bg-[var(--navy)]/6">
                Parent Portal
              </Button>
              <Button
                className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-semibold px-5 rounded-xl shadow-[0_10px_24px_rgba(201,162,39,0.3)]"
              >
                Apply Now
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--navy)]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-depth-lg border border-[var(--navy)]/10 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-4 text-[var(--navy)] font-semibold hover:bg-[var(--navy)]/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-[var(--navy)]/10 space-y-2">
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
