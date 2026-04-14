"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    quote: "The personal attention my son receives at Chhetrapal School is unparalleled. He hasn't just grown academically; he has discovered a voice and a confidence I never knew he had.",
    author: "Priya Sharma",
    role: "Parent, Class 10 Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    quote: "Chhetrapal shaped me into who I am today. The teachers here don't just teach subjects; they mentor for life. My foundation here led me to Cambridge.",
    author: "Arjun Mehta",
    role: "Alumni, Class of 2020",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    quote: "The holistic approach to education here is remarkable. My daughter excels in academics while also pursuing her passion for classical dance and robotics.",
    author: "Dr. Rajesh Kumar",
    role: "Parent, Class 8 Student",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote: "Being part of the Chhetrapal community has been transformative. The supportive environment and world-class facilities have helped me achieve my dreams.",
    author: "Ananya Verma",
    role: "Current Student, Class 12",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 wp-section wp-bg-cream">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-28" />
      
      {/* Decorative Quote Marks */}
      <div className="absolute top-20 left-10 text-[var(--gold)]/10 pointer-events-none">
        <Quote className="w-40 h-40 transform -rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 text-[var(--gold)]/10 pointer-events-none">
        <Quote className="w-40 h-40 transform rotate-180" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gold)]/10 text-[var(--gold-dark)] text-sm font-semibold tracking-wide border border-[var(--gold)]/20">
              <Star className="w-4 h-4" />
              Testimonials
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl font-extrabold text-[var(--navy)] tracking-tight heading-display"
          >
            Voices of{" "}
            <span className="text-gradient-gold">Excellence</span>
          </motion.h2>
        </div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-depth-lg relative overflow-hidden">
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--gold)]/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-[var(--gold)]" />
                </div>
              </div>

              {/* Testimonial Content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-center"
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-[var(--navy)] leading-relaxed max-w-3xl mx-auto">
                    {`"${currentTestimonial.quote}"`}
                  </blockquote>

                  {/* Author */}
                  <div className="mt-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[var(--gold)]/20 shadow-lg mb-4">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <cite className="not-italic">
                      <span className="block text-lg font-bold text-[var(--navy)]">{currentTestimonial.author}</span>
                      <span className="text-[var(--navy)]/60">{currentTestimonial.role}</span>
                    </cite>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border-2 border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1)
                        setCurrentIndex(idx)
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-[var(--gold)]" : "bg-[var(--navy)]/20 hover:bg-[var(--navy)]/40"
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border-2 border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--navy)]/50 text-sm font-medium mb-6">Trusted by leading families across India</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["5000+ Alumni", "100+ Years", "50+ Awards", "25+ Countries"].map((badge) => (
              <span key={badge} className="text-[var(--navy)] font-bold text-lg">{badge}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
