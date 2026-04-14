import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { HighlightsSection } from "@/components/sections/highlights"
import { AboutSection } from "@/components/sections/about"
import { CurriculumSection } from "@/components/sections/curriculum"
import { FacilitiesSection } from "@/components/sections/facilities"
import { CTASection } from "@/components/sections/cta"
import { NewsSection } from "@/components/sections/news"
import { GallerySection } from "@/components/sections/gallery"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { Footer } from "@/components/footer"
import { SectionReveal } from "@/components/section-reveal"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[34rem] w-full bg-gradient-to-b from-[var(--navy)]/10 to-transparent" />
        <div className="absolute right-[-10rem] top-[30rem] h-[30rem] w-[30rem] rounded-full bg-[var(--gold)]/10 blur-[110px]" />
      </div>

      <Header />
      <HeroSection />
      <HighlightsSection />

      <SectionReveal>
        <AboutSection />
      </SectionReveal>

      <SectionReveal>
        <CurriculumSection />
      </SectionReveal>

      <SectionReveal>
        <FacilitiesSection />
      </SectionReveal>

      <SectionReveal>
        <CTASection />
      </SectionReveal>

      <SectionReveal>
        <NewsSection />
      </SectionReveal>

      <SectionReveal>
        <GallerySection />
      </SectionReveal>

      <SectionReveal>
        <TestimonialsSection />
      </SectionReveal>

      <Footer />
    </main>
  )
}
