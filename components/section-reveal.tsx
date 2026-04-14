"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type SectionRevealProps = {
  children: ReactNode
  delay?: number
}

export function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
