"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight, Calendar, FileText, Users, Clock } from "lucide-react"

const admissionSteps = [
  { icon: FileText, title: "Apply Online", description: "Fill out the application form" },
  { icon: Calendar, title: "Schedule Visit", description: "Tour our campus" },
  { icon: Users, title: "Interview", description: "Meet with our admissions team" },
  { icon: Clock, title: "Enrollment", description: "Complete the enrollment process" },
]

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="admissions" ref={sectionRef} className="py-24 lg:py-32 wp-section wp-bg-paper wp-divider-soft">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2000&auto=format&fit=crop"
              alt="Campus view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[var(--navy)]/95 to-[var(--navy)]/80" />
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[100px]"
              />
              <motion.div
                animate={{ 
                  x: [0, -100, 0],
                  y: [0, 50, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--gold)]/5 rounded-full blur-[80px]"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 md:py-28 px-8 md:px-16 lg:px-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--gold)] text-sm font-semibold tracking-wide border border-white/10">
                    <Calendar className="w-4 h-4" />
                    Admissions Open 2025-26
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight heading-display leading-[1.1]"
                >
                  Secure Your{" "}
                  <span className="text-gradient-gold">Future.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl body-elegant"
                >
                  Applications for the 2025-2026 academic session are now open. 
                  Join a distinguished community that values curiosity, integrity, 
                  and the pursuit of excellence in every endeavor.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 flex flex-col sm:flex-row gap-4"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-bold px-8 py-6 text-base rounded-xl transition-all duration-300 shadow-xl shadow-[var(--gold)]/30 hover:shadow-2xl hover:shadow-[var(--gold)]/40 group w-full sm:w-auto"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-6 text-base rounded-xl transition-all duration-300 backdrop-blur-sm font-semibold w-full sm:w-auto"
                    >
                      <Download className="mr-2 w-5 h-5" />
                      Download Prospectus
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Content - Steps */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden lg:block"
              >
                <div className="glass-dark rounded-3xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-8">Admission Process</h3>
                  <div className="space-y-6">
                    {admissionSteps.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors duration-300">
                            <step.icon className="w-6 h-6 text-[var(--gold)]" />
                          </div>
                          {index < admissionSteps.length - 1 && (
                            <div className="absolute top-12 left-1/2 w-px h-6 bg-white/10" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[var(--gold)]">Step {index + 1}</span>
                          </div>
                          <h4 className="text-white font-semibold mt-1">{step.title}</h4>
                          <p className="text-white/60 text-sm">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "March 31", label: "Application Deadline" },
            { value: "Limited", label: "Seats Available" },
            { value: "100%", label: "Scholarship Options" },
            { value: "24/7", label: "Admission Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              className="text-center p-6 rounded-2xl bg-[var(--navy)]/5 border border-[var(--navy)]/10 hover:border-[var(--gold)]/30 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-[var(--navy)]">{stat.value}</div>
              <div className="text-sm text-[var(--navy)]/60 font-medium mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
