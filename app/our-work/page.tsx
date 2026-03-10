import type { Metadata } from "next"
import Portfolio from "@/components/sections/Portfolio"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore Ed-Astra's portfolio of web and mobile applications built for real businesses.",
}

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <Portfolio />

      <section className="py-20 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Have a project in mind?</h2>
        <p className="text-gray-400 mb-6">Let&apos;s build something great together.</p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20">
          Start Your Project
        </Link>
      </section>
    </div>
  )
}
