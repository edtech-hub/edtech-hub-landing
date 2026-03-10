import type { Metadata } from "next"
import Contact from "@/components/sections/Contact"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ed-Astra. Book a free consultation or describe your project.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <Contact />
    </div>
  )
}
