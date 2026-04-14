"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, BookOpen, FlaskRound, Dumbbell, Music, ChevronLeft, ChevronRight, Play, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

const facilities = [
  {
    id: 1,
    title: "Horizon Library",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    description: "A state-of-the-art library housing over 50,000 volumes, digital resources, and quiet study sanctuaries designed to inspire deep learning and research.",
    features: ["50,000+ Books", "Digital Archives", "Study Pods", "Research Center"],
    stats: { visitors: "500+", value: "Daily Visitors" },
  },
  {
    id: 2,
    title: "Innovation Labs",
    icon: FlaskRound,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    description: "Cutting-edge science and technology laboratories equipped with the latest instruments for hands-on experiments, robotics, and AI-driven projects.",
    features: ["Robotics Lab", "AI & ML Center", "3D Printing", "Physics Lab"],
    stats: { visitors: "12", value: "Specialized Labs" },
  },
  {
    id: 3,
    title: "Athletic Center",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    description: "Olympic-standard sports facilities including an indoor swimming pool, gymnasium, basketball courts, and a cricket ground spread across 5 acres.",
    features: ["Swimming Pool", "Indoor Courts", "Fitness Center", "Cricket Ground"],
    stats: { visitors: "5", value: "Acres of Sports" },
  },
  {
    id: 4,
    title: "Arts Conservatory",
    icon: Music,
    image: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=1200&auto=format&fit=crop",
    description: "A creative hub for music, visual arts, dance, and performing arts education with professional studios, galleries, and a 500-seat auditorium.",
    features: ["Music Studios", "Art Gallery", "Dance Hall", "Auditorium"],
    stats: { visitors: "500", value: "Seat Auditorium" },
  },
]

export function FacilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % facilities.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + facilities.length) % facilities.length)
  }

  const activeFacility = facilities[activeIndex]

  return (
    <section id="facilities" ref={sectionRef} className="py-24 lg:py-32 bg-[var(--cream)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[var(--gold)]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gold)]/10 text-[var(--gold-dark)] text-sm font-semibold tracking-wide border border-[var(--gold)]/20">
                <Camera className="w-4 h-4" />
                Campus Life
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 heading-display"
            >
              <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--navy)] leading-[1.1]">
                Designed for
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                <span className="text-gradient-gold">Discovery.</span>
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-[var(--navy)]/70 leading-relaxed body-elegant"
            >
              Every corner of our 50-acre campus is thoughtfully designed to inspire exploration, 
              creativity, and excellence in every endeavor.
            </motion.p>
          </div>
          
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {facilities.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1)
                    setActiveIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-8 bg-[var(--gold)]" : "bg-[var(--navy)]/20 hover:bg-[var(--navy)]/40"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Main Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            {/* Large Image */}
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-depth-lg group h-[500px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={activeFacility.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  src={activeFacility.image}
                  alt={activeFacility.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[var(--navy)]/20 to-transparent" />
              
              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.button>
              
              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFacility.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-10 h-10 rounded-xl bg-[var(--gold)] flex items-center justify-center">
                        <activeFacility.icon className="w-5 h-5 text-[var(--navy)]" />
                      </span>
                      <h3 className="text-2xl font-bold text-white">{activeFacility.title}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed max-w-lg">
                      {activeFacility.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Side Content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Stats Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl p-8 flex-1"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFacility.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    <div className="text-6xl font-bold text-[var(--navy)] mb-2">
                      {activeFacility.stats.visitors}
                    </div>
                    <div className="text-[var(--navy)]/60 font-medium mb-8">
                      {activeFacility.stats.value}
                    </div>
                    
                    <div className="space-y-4 mt-auto">
                      <h4 className="text-sm font-semibold text-[var(--navy)]/80 uppercase tracking-wider">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {activeFacility.features.map((feature) => (
                          <div 
                            key={feature} 
                            className="px-4 py-3 rounded-xl bg-[var(--navy)]/5 text-sm font-medium text-[var(--navy)]/80 text-center hover:bg-[var(--gold)]/10 hover:text-[var(--gold-dark)] transition-colors duration-300"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[var(--navy)] rounded-3xl p-8 text-white relative overflow-hidden"
              >
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />
                </div>
                
                <div className="relative">
                  <h4 className="text-lg font-bold mb-2">Take a Virtual Tour</h4>
                  <p className="text-white/70 text-sm mb-6">
                    Explore our campus from anywhere in the world
                  </p>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--gold)] text-[var(--navy)] font-bold text-sm hover:bg-[var(--gold-light)] transition-colors duration-300"
                  >
                    Start Tour
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Facility Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {facilities.map((facility, idx) => (
            <motion.button
              key={facility.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1)
                setActiveIndex(idx)
              }}
              className={`relative rounded-2xl overflow-hidden h-24 group ${
                idx === activeIndex ? "ring-2 ring-[var(--gold)] ring-offset-2" : ""
              }`}
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-[var(--navy)]/40 flex items-center justify-center transition-opacity duration-300 ${
                idx === activeIndex ? "opacity-0" : "group-hover:opacity-60"
              }`}>
                <span className="text-white font-semibold text-sm">{facility.title}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
