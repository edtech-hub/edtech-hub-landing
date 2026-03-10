"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const process = [
  {
    step: "01",
    title: "Discovery & Research",
    desc: "Stakeholder interviews, competitor analysis, and technical blueprinting to define exactly what we're building.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Planning & Architecture",
    desc: "Roadmaps, technical diagrams, database design, and API contracts — the blueprint for a scalable product.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "UI/UX Design",
    desc: "Wireframes, prototypes, and responsive designs crafted for both beauty and conversion.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Development & Testing",
    desc: "Clean, maintainable code with continuous integration and automated testing at every layer.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Launch & Support",
    desc: "Production deployment, team training, monitoring setup, and ongoing post-launch maintenance.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-28 px-4 bg-gray-950" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-emerald-400 font-medium uppercase tracking-widest">How We Work</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Design Process
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto text-lg">
            A clear, structured approach from idea to launch — no surprises.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gray-800 hidden sm:block" />
          <motion.div
            className="absolute left-[27px] top-0 w-px bg-gradient-to-b from-emerald-500 to-teal-500 hidden sm:block"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />

          <div className="space-y-0">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative flex gap-8 group"
              >
                {/* Step indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
                  className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 flex items-center justify-center transition-all duration-300 text-gray-500 group-hover:text-emerald-400"
                >
                  {p.icon}
                </motion.div>

                {/* Content */}
                <div className={`pb-14 flex-1 ${i === process.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest">{p.step}</span>
                  </div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.15 }}
                    className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300"
                  >
                    {p.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                    className="text-gray-400 leading-relaxed max-w-lg"
                  >
                    {p.desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
