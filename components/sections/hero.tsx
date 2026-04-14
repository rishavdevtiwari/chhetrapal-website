"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2832&auto=format&fit=crop"
          alt="Chhetrapal School Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/90 via-[var(--navy)]/70 to-[var(--navy)]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            Excellence in Education Since 1924
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Architects of{" "}
            <span className="text-gradient-gold">
              {"Tomorrow's Legacy."}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
            Where tradition meets innovation. A century-old institution nurturing 
            visionary leaders who shape the future with knowledge, integrity, and purpose.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-semibold px-8 py-6 text-base rounded-lg group"
            >
              Explore Our Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-lg group bg-white/5"
            >
              <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Play className="w-4 h-4 ml-0.5" />
              </span>
              Watch Our Story
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/20">
            {[
              { value: "100", suffix: "+", label: "Years Legacy" },
              { value: "5000", suffix: "+", label: "Alumni Network" },
              { value: "15", suffix: ":1", label: "Student-Teacher Ratio" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}<span className="text-[var(--gold)]">{stat.suffix}</span>
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1.5 h-2.5 rounded-full bg-current animate-bounce" />
        </div>
      </button>
    </section>
  )
}
