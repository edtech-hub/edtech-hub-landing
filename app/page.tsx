import Hero from "@/components/sections/Hero"
import { MarqueeSection } from "@/components/sections/MarqueeSection"
import Services from "@/components/sections/Services"
import Portfolio from "@/components/sections/Portfolio"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import TechStack from "@/components/sections/TechStack"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <Services />
      <Portfolio />
      <TechStack />
      <TestimonialsSection />
      <Contact />
    </>
  )
}
