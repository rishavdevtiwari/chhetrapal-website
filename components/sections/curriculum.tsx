"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Microscope, BookOpen, CheckCircle, ArrowUpRight, Lightbulb, Globe, Palette } from "lucide-react"

const curricula = [
  {
    icon: BookOpen,
    accent: Lightbulb,
    title: "Primary Wings",
    grades: "Grades I - V",
    description: "Foundation years focused on nurturing curiosity, creativity, and core academic skills through experiential learning.",
    features: [
      "Montessori-Inspired Learning",
      "Bilingual Immersion Program",
      "Activity-Based Curriculum",
      "Creative Arts Integration",
    ],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
    color: "from-emerald-500/20 to-teal-500/20",
    accentColor: "text-emerald-600",
    borderColor: "border-emerald-200 hover:border-emerald-300",
  },
  {
    icon: Microscope,
    accent: Globe,
    title: "Secondary School",
    grades: "Grades VI - X",
    description: "Specialized academic tracks balancing STEM excellence with liberal arts designed for future innovators.",
    features: [
      "STEM Pathways & Robotics",
      "Advanced Lab Research",
      "Language & Humanities",
      "Critical Thinking Focus",
    ],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    color: "from-blue-500/20 to-indigo-500/20",
    accentColor: "text-blue-600",
    borderColor: "border-blue-200 hover:border-blue-300",
  },
  {
    icon: GraduationCap,
    accent: Palette,
    title: "Higher Secondary",
    grades: "Grades XI - XII",
    description: "University-prep intensive with IB-style curricula, career counseling, and global examination preparation.",
    features: [
      "IB & AP Style Courses",
      "SAT/ACT Coaching",
      "Career Mentorship",
      "Research Projects",
    ],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    color: "from-amber-500/20 to-orange-500/20",
    accentColor: "text-amber-600",
    borderColor: "border-amber-200 hover:border-amber-300",
  },
]

export function CurriculumSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="academics" ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--cream)] to-transparent" />
      
      {/* Decorative Circles */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[var(--gold)]/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[var(--navy)]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--navy)]/5 text-[var(--navy)] text-sm font-semibold tracking-wide border border-[var(--navy)]/10">
              <BookOpen className="w-4 h-4" />
              Academic Excellence
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--navy)] tracking-tight heading-display"
          >
            World-Class{" "}
            <span className="text-gradient-gold">Curricula</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-[var(--navy)]/70 leading-relaxed body-elegant"
          >
            A multi-tiered approach to education designed to spark curiosity, 
            foster critical thinking, and prepare students for global leadership at every stage.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {curricula.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <motion.div 
                whileHover={{ y: -8 }}
                className={`group bg-white rounded-3xl overflow-hidden shadow-depth border-2 ${item.borderColor} transition-all duration-500 h-full flex flex-col`}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  
                  {/* Grade Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-[var(--navy)] shadow-lg">
                    {item.grades}
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-depth flex items-center justify-center group-hover:shadow-depth-lg transition-all duration-300">
                      <item.icon className={`w-8 h-8 ${item.accentColor}`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pt-12 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[var(--navy)]">{item.title}</h3>
                    <motion.span 
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="w-10 h-10 rounded-full bg-[var(--navy)]/5 flex items-center justify-center cursor-pointer group-hover:bg-[var(--gold)] transition-colors duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5 text-[var(--navy)]/60 group-hover:text-white transition-colors duration-300" />
                    </motion.span>
                  </div>
                  
                  <p className="text-[var(--navy)]/60 leading-relaxed mb-6 body-elegant">
                    {item.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mt-auto">
                    {item.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 group/item">
                        <span className="w-5 h-5 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover/item:bg-[var(--gold)] transition-colors duration-300">
                          <CheckCircle className="w-3 h-3 text-[var(--gold)] group-hover/item:text-white transition-colors duration-300" />
                        </span>
                        <span className="text-sm text-[var(--navy)]/70 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--navy)]/60 mb-6">
            Ready to explore our comprehensive academic programs?
          </p>
          <motion.a
            href="#admissions"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--navy)] text-white font-bold shadow-depth hover:shadow-depth-lg transition-all duration-300"
          >
            Download Curriculum Guide
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
