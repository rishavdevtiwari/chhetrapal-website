"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Clock, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const newsItems = [
  {
    id: 1,
    title: "Class of 2024 Achieves Record University Placements",
    category: "Achievements",
    date: "March 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    excerpt: "Over 98% of our graduates have secured admission to the world's top 100 universities, including IITs, IIMs, Oxford, Cambridge, and MIT.",
    featured: true,
  },
  {
    id: 2,
    title: "Annual Theater Fest: A Night of Masterpieces",
    category: "Events",
    date: "March 10, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    excerpt: "The Conservatory presented award-winning performances that captivated audiences and earned regional recognition.",
    featured: false,
  },
  {
    id: 3,
    title: "Sustainability Initiative Launches on Campus",
    category: "Campus",
    date: "March 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop",
    excerpt: "Students lead groundbreaking 'Go Green' initiative, transforming our campus into a model of environmental responsibility.",
    featured: false,
  },
  {
    id: 4,
    title: "National Science Olympiad Winners Announced",
    category: "Achievements",
    date: "March 1, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    excerpt: "Three students from Chhetrapal School secure top positions in the National Science Olympiad.",
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  Achievements: "bg-emerald-500",
  Events: "bg-blue-500",
  Campus: "bg-amber-500",
}

export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const featuredNews = newsItems.find(item => item.featured)
  const regularNews = newsItems.filter(item => !item.featured)

  return (
    <section id="news" ref={sectionRef} className="py-24 lg:py-32 bg-[var(--cream)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[var(--gold)]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--navy)]/5 text-[var(--navy)] text-sm font-semibold tracking-wide border border-[var(--navy)]/10">
                <Tag className="w-4 h-4" />
                Latest Updates
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--navy)] tracking-tight heading-display"
            >
              Campus{" "}
              <span className="text-gradient-gold">Chronicles</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white rounded-xl font-semibold px-6 py-5 transition-all duration-300 group"
            >
              View All News
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {featuredNews && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:row-span-2"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-depth border border-[var(--navy)]/5 h-full flex flex-col hover:shadow-depth-lg transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1.5 rounded-full ${categoryColors[featuredNews.category]} text-white text-xs font-bold`}>
                      {featuredNews.category}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[var(--navy)] text-xs font-bold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-[var(--navy)]/50 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredNews.date}
                    </span>
                    <span>{featuredNews.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--navy)] leading-tight group-hover:text-[var(--gold)] transition-colors duration-300 mb-4">
                    {featuredNews.title}
                  </h3>
                  <p className="text-[var(--navy)]/60 leading-relaxed mb-6 flex-1">
                    {featuredNews.excerpt}
                  </p>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-[var(--navy)] font-bold hover:text-[var(--gold)] transition-colors duration-300"
                  >
                    Read Full Story
                    <ChevronRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.article>
          )}

          {/* Regular Articles */}
          <div className="space-y-6">
            {regularNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-depth border border-[var(--navy)]/5 hover:shadow-depth-lg transition-all duration-500"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--navy)]/10 sm:bg-gradient-to-t" />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-1 rounded-full ${categoryColors[item.category]} text-white text-xs font-bold`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-[var(--navy)]/50">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--navy)] leading-snug group-hover:text-[var(--gold)] transition-colors duration-300 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--navy)]/60 leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[var(--navy)] to-[var(--navy-light)] relative overflow-hidden"
        >
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Stay Connected</h3>
              <p className="text-white/70 mt-2">Subscribe to our newsletter for the latest updates and news.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] focus:bg-white/15 transition-all duration-300"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-bold px-6 py-3 rounded-xl h-auto">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
