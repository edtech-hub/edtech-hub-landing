import type { Metadata } from "next"
import Services from "@/components/sections/Services"
import ProcessSection from "@/components/sections/ProcessSection"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, mobile apps, custom software, cloud & DevOps — Ed-Astra builds it all.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <Services />

      <ProcessSection />

      <section className="py-20 text-center px-4 bg-[#070b12]">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to start your project?</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20">
          Get a Free Quote
        </Link>
      </section>
    </div>
  )
}
