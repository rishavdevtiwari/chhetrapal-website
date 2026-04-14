import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { CurriculumSection } from "@/components/sections/curriculum"
import { FacilitiesSection } from "@/components/sections/facilities"
import { CTASection } from "@/components/sections/cta"
import { NewsSection } from "@/components/sections/news"
import { GallerySection } from "@/components/sections/gallery"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <CurriculumSection />
      <FacilitiesSection />
      <CTASection />
      <NewsSection />
      <GallerySection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
