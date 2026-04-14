"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Bell, CalendarDays, Newspaper } from "lucide-react"

const notices = [
  { date: "17 Ashad", title: "Class XI admission entrance result published" },
  { date: "19 Ashad", title: "Book list for Grades I to X released" },
  { date: "21 Ashad", title: "Scholarship interview schedule notice" },
  { date: "24 Ashad", title: "Orientation program details for new students" },
]

const updates = [
  {
    title: "SEE students secure excellent results",
    excerpt: "Our students achieved outstanding distinction rates in the recent SEE examination.",
    date: "June 2026",
  },
  {
    title: "Inter-school science exhibition hosted on campus",
    excerpt: "Students from across the valley participated in practical innovation showcases.",
    date: "May 2026",
  },
  {
    title: "Parents interaction session completed successfully",
    excerpt: "A meaningful discussion on curriculum priorities and student wellbeing was held this month.",
    date: "May 2026",
  },
]

export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="news" ref={sectionRef} className="py-20 lg:py-24 wp-section wp-bg-cream wp-divider-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--navy)]/8 text-[var(--navy)] text-sm font-semibold">
            <Newspaper className="w-4 h-4" />
            Notice Board and Updates
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[var(--navy)] heading-display">
            Stay Informed
          </h2>
          <p className="mt-4 text-[var(--navy)]/70 body-elegant">
            A simple and reliable feed for notices, school updates, and important academic announcements.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-[var(--navy)]/12 bg-white p-6 shadow-depth"
          >
            <div className="flex items-center gap-2 text-[var(--navy)] font-semibold">
              <Bell className="w-4 h-4 text-[var(--gold-dark)]" />
              Latest Notices
            </div>
            <ul className="mt-4 divide-y divide-[var(--navy)]/10">
              {notices.map((notice) => (
                <li key={notice.title} className="py-3 flex items-start gap-3">
                  <span className="inline-flex shrink-0 rounded-md bg-[var(--gold)]/18 px-2 py-1 text-xs font-semibold text-[var(--gold-dark)]">
                    {notice.date}
                  </span>
                  <p className="text-[var(--navy)]/80 leading-relaxed">{notice.title}</p>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--gold-dark)] transition-colors">
              View all notices
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-[var(--navy)]/12 bg-white p-6 shadow-depth"
          >
            <div className="flex items-center gap-2 text-[var(--navy)] font-semibold">
              <CalendarDays className="w-4 h-4 text-[var(--gold-dark)]" />
              Recent Updates
            </div>
            <div className="mt-4 space-y-4">
              {updates.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[var(--navy)]/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--navy)]/50">{item.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--navy)]/70">{item.excerpt}</p>
                </article>
              ))}
            </div>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--gold-dark)] transition-colors">
              View all news
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
