"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "Ed-Astra built our ERP platform in record time. The quality exceeded our expectations and the team was incredibly professional throughout.",
    name: "Rajesh Kumar",
    role: "CEO",
    company: "Logistics Company",
    rating: 5,
  },
  {
    quote: "Their AI-powered development approach saved us months of development time and significant costs. The final product was exactly what we envisioned.",
    name: "Priya Sharma",
    role: "CTO",
    company: "Tech Startup",
    rating: 5,
  },
  {
    quote: "Professional team, transparent communication, and delivered exactly what we needed on time and within budget. Highly recommend.",
    name: "Arun Patel",
    role: "Founder",
    company: "E-commerce Platform",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm sm:text-base text-teal-400 font-medium uppercase tracking-widest">Client Stories</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Clients Say
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: i === 0 ? -40 : i === 2 ? 40 : 0, y: i === 1 ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.15, ease: "easeOut" }}
              className="p-7 rounded-2xl bg-gray-900/60 border border-gray-800/60 hover:border-emerald-500/30 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <motion.div
                className="flex gap-1 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.span
                    key={j}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.15 + j * 0.07, type: "spring" }}
                    className="text-yellow-400 text-lg"
                  >
                    ★
                  </motion.span>
                ))}
              </motion.div>
              <p className="text-gray-300 text-base leading-relaxed flex-1 mb-6">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-4 pt-5 border-t border-gray-800/60">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-16 grid grid-cols-3 gap-6 p-8 rounded-2xl bg-gray-900/40 border border-gray-800/50"
        >
          {[
            { value: "3+", label: "Projects Delivered" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "2 yrs", label: "Experience" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
