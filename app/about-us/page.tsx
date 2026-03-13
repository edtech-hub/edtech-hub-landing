import type { Metadata } from "next"
import AboutUs from "@/components/sections/AboutUs"

export const metadata: Metadata = {
  title: "About Us | Ed-Astra",
  description: "Learn about Ed-Astra — a two-founder AI-powered software development agency born in 2023.",
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen pt-20 relative">
      <AboutUs />
    </div>
  )
}
