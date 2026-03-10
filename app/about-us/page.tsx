import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Ed-Astra — a two-founder AI-powered software development agency born in 2023.",
}

const milestones = [
  { date: "Dec 2023", event: "Ed-Astra founded by two passionate developers with a vision." },
  { date: "Sep 2024", event: "Launched first product — a multi-tenant SaaS platform." },
  { date: "Nov 2024", event: "Secured first enterprise client in the logistics sector." },
  { date: "Nov 2025", event: "Went full-time, expanded service offerings with AI integration." },
  { date: "2026", event: "Scaling team and capabilities to serve more clients globally." },
]

const values = [
  { icon: "⚡", title: "Speed", desc: "AI-accelerated workflows deliver 3x faster than traditional agencies." },
  { icon: "🎯", title: "Precision", desc: "Every line of code serves a purpose. No bloat, no guesswork." },
  { icon: "🔍", title: "Transparency", desc: "Weekly updates, open roadmaps, and honest communication always." },
  { icon: "🏗️", title: "Quality", desc: "Production-grade code with automated testing and CI/CD pipelines." },
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      {/* Hero */}
      <section className="py-20 text-center px-4">
        <span className="text-sm text-emerald-400 font-medium uppercase tracking-widest">Our Story</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
          We Are{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">Ed-Astra</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
          A two-founder software agency using AI to build production-ready products faster, smarter, and more affordably.
        </p>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-[#070b12]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Traditional development agencies take months and cost a fortune because of manual workflows, large teams, and inefficient processes. Ed-Astra exists to change that — by combining expert engineering with AI automation, we build faster while maintaining production-grade quality.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/60 text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 bg-[#070b12]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:to-teal-500">
            {milestones.map((m) => (
              <div key={m.date} className="flex gap-6 items-start pl-14 relative">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  ★
                </div>
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">{m.date}</span>
                  <p className="text-gray-300 mt-1">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "3+", label: "Projects Delivered" },
            { value: "2", label: "Years in Business" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "2", label: "Founders" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/50">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-4 bg-[#070b12]">
        <h2 className="text-2xl font-bold text-white mb-4">Work with us</h2>
        <p className="text-gray-400 mb-6">Let&apos;s build your next product together.</p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
