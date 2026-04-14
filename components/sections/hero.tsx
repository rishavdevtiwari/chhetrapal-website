"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Play } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-[90svh] flex items-center wp-section wp-bg-hero">
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2832&auto=format&fit=crop"
          alt="Chhetrapal School Campus"
          className="w-full h-full object-cover"
          initial={prefersReducedMotion ? false : { scale: 1.06 }}
          animate={prefersReducedMotion ? {} : { scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/93 via-[var(--navy)]/76 to-[var(--navy)]/62" />
      </div>

      <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-3 text-xs text-white/90 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="tracking-wide">Notice: Entrance interaction and scholarship assessment starts from Baisakh 25.</p>
          <a href="#news" className="font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
            View latest notices
          </a>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-32 lg:py-36 w-full">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_340px]">
          <div className="max-w-3xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            Admissions Open for 2083 B.S.
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5 heading-display"
          >
            Simple Schooling.
            <br />
            <span className="text-gradient-gold">Strong Futures.</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl body-elegant"
          >
            Inspired by traditional school websites that parents trust, this homepage focuses on
            clarity, discipline, and outcomes from Montessori to Grade XII.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-semibold px-8 py-6 text-base rounded-xl group shadow-[0_12px_28px_rgba(201,162,39,0.28)]"
            >
              Explore Programs
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-lg group bg-white/5"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Prospectus
            </Button>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="flex flex-wrap gap-8 mt-12 pt-7 border-t border-white/20"
          >
            {[
              { value: "100", suffix: "+", label: "Years of Trust" },
              { value: "3,500", suffix: "+", label: "Students & Alumni" },
              { value: "15", suffix: ":1", label: "Teacher Ratio" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}<span className="text-[var(--gold)]">{stat.suffix}</span>
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          </div>

          <motion.aside
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="hidden lg:block glass-card rounded-3xl p-6 border border-white/40"
          >
            <div className="mb-4 overflow-hidden rounded-2xl h-40">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
                alt="Students in collaborative classroom"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--navy)]/55">Quick Actions</p>
            <h3 className="mt-2 text-3xl leading-none text-[var(--navy)] heading-display">Admissions Desk</h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--navy)]/75">
              <li className="flex items-center justify-between border-b border-[var(--navy)]/10 pb-2"><span>Application Form</span><ArrowRight className="w-4 h-4" /></li>
              <li className="flex items-center justify-between border-b border-[var(--navy)]/10 pb-2"><span>Fee Structure</span><ArrowRight className="w-4 h-4" /></li>
              <li className="flex items-center justify-between"><span>Book a Campus Visit</span><ArrowRight className="w-4 h-4" /></li>
            </ul>
            <Button className="mt-5 w-full bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
              <Play className="w-4 h-4 mr-2" />
              Watch School Tour
            </Button>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
