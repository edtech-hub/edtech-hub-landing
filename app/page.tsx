import Hero from "@/components/sections/Hero"
import Services from "@/components/sections/Services"
import Portfolio from "@/components/sections/Portfolio"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import TechStack from "@/components/sections/TechStack"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <TestimonialsSection />
      <TechStack />
      <Contact />
    </>
  )
}
