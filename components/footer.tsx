"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, ArrowRight, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Our Vision", href: "#about" },
  { name: "Leadership Team", href: "#about" },
  { name: "Achievements", href: "#news" },
  { name: "Alumni Network", href: "#" },
  { name: "Careers", href: "#" },
]

const academicLinks = [
  { name: "Primary School", href: "#academics" },
  { name: "Secondary School", href: "#academics" },
  { name: "Higher Secondary", href: "#academics" },
  { name: "Curriculum Overview", href: "#academics" },
  { name: "Faculty Directory", href: "#" },
  { name: "Academic Calendar", href: "#" },
]

const resourceLinks = [
  { name: "Parent Portal", href: "#" },
  { name: "Student Login", href: "#" },
  { name: "Library Access", href: "#" },
  { name: "Download Forms", href: "#" },
  { name: "Fee Structure", href: "#" },
  { name: "Virtual Tour", href: "#facilities" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  return (
    <footer ref={footerRef} className="bg-[var(--navy)] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--gold)]/3 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_40px)]" />
        </div>
      </div>

      {/* Top CTA Bar */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-bold">Ready to Begin Your Journey?</h3>
              <p className="text-white/60 mt-1">Take the first step towards excellence today.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-bold px-6 py-5 rounded-xl">
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-5 rounded-xl">
                  Schedule a Visit
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-4 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-[var(--navy)] font-bold text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white">Chhetrapal</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">School of Excellence</span>
              </div>
            </Link>
            
            <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
              Setting the gold standard for education with an unwavering focus on excellence, 
              innovation, and character development since 1924.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a href="#" className="flex items-start gap-3 text-white/70 hover:text-[var(--gold)] transition-colors duration-300 group">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[var(--gold)]" />
                <span>Chhetrapal Valley, Shimla District,<br />Himachal Pradesh - 171001</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-white/70 hover:text-[var(--gold)] transition-colors duration-300">
                <Phone className="w-5 h-5 shrink-0 text-[var(--gold)]" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@chhetrapalschool.edu" className="flex items-center gap-3 text-white/70 hover:text-[var(--gold)] transition-colors duration-300">
                <Mail className="w-5 h-5 shrink-0 text-[var(--gold)]" />
                <span>info@chhetrapalschool.edu</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <Clock className="w-5 h-5 shrink-0 text-[var(--gold)]" />
                <span>Mon - Sat: 8:00 AM - 4:00 PM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[var(--gold)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--gold)]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[var(--gold)] hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Academics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--gold)]" />
              Academics
            </h3>
            <ul className="space-y-3">
              {academicLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[var(--gold)] hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--gold)]" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[var(--gold)] hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--gold)]" />
              Newsletter
            </h3>
            <p className="text-white/60 mb-4 text-sm">
              Subscribe for the latest news, events, and updates from Chhetrapal School.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] focus:bg-white/15 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-xl bg-[var(--gold)] text-[var(--navy)] font-bold hover:bg-[var(--gold-light)] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © 2024 Chhetrapal School. All rights reserved. Crafted with excellence.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-white/40 text-sm hover:text-[var(--gold)] transition-colors duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
