"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowRight, Check } from "lucide-react"

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const startTime = performance.now()
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeProgress * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const features = [
  "Montessori & IB Curriculum Integration",
  "State-of-the-Art STEM Laboratories", 
  "Holistic Character Development",
  "Global Exchange Programs",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] text-sm font-medium mb-6">
              About Our Legacy
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--navy)] leading-tight mb-6">
              Nurturing Excellence{" "}
              <span className="text-gradient-gold">Since 1924.</span>
            </h2>

            <div className="space-y-4 text-[var(--navy)]/70 leading-relaxed mb-8">
              <p>
                Chhetrapal School stands as a beacon of academic prestige nestled in the 
                serene valleys of Himachal Pradesh. For a century, we have cultivated 
                young minds with a philosophy that every child possesses untapped 
                potential waiting to be discovered.
              </p>
              <p>
                Our approach combines rigorous scientific inquiry with deep appreciation 
                for arts and humanities, creating well-rounded individuals prepared for 
                the challenges of tomorrow.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[var(--gold)]" />
                  </span>
                  <span className="text-[var(--navy)]/80">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="#academics"
              className="inline-flex items-center gap-2 text-[var(--navy)] font-semibold hover:text-[var(--gold)] transition-colors group"
            >
              Discover Our Philosophy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Image */}
              <div className="col-span-8 row-span-2">
                <div className="rounded-2xl overflow-hidden shadow-lg h-[380px]">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
                    alt="Students celebrating graduation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Side Images */}
              <div className="col-span-4">
                <div className="rounded-xl overflow-hidden shadow-md h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop"
                    alt="Students in classroom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="col-span-4">
                <div className="rounded-xl overflow-hidden shadow-md h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
                    alt="School campus"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-[var(--gold)]">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-sm text-[var(--navy)]/60 mt-1">University Placement</p>
            </div>

            <div className="absolute -top-4 right-8 bg-white rounded-xl p-5 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-[var(--navy)]">15:1</div>
              <p className="text-sm text-[var(--navy)]/60 mt-1">Student-Teacher Ratio</p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { value: 100, suffix: "%", label: "University Placement" },
            { value: 15, suffix: ":1", label: "Student-Teacher Ratio" },
            { value: 50, suffix: "+", label: "Extracurricular Activities" },
            { value: 25, suffix: "+", label: "International Partnerships" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--navy)]">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--navy)]/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
