"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Reno Research",
    category: "Web Platform",
    stack: ["Next.js", "Node.js", "MongoDB"],
    problem: "Researchers needed a centralized platform to manage and share renovation data insights.",
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
    color: "emerald",
    logo: "RR",
    image: "/projects/RenoResearch.png",
  },
  {
    title: "Reno Research Interiors",
    category: "Marketplace",
    stack: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
    problem: "Interior designers lacked a dedicated space to showcase portfolios and connect with clients.",
    results: ["200+ designers onboarded", "3D portfolio visualization", "In-app project management"],
    color: "cyan",
    logo: "RI",
    image: "/projects/renoproject2.png",
  },
  {
    title: "Wedding Cliqz",
    category: "Mobile App",
    stack: ["Flutter", "Firebase", "Node.js"],
    problem: "Couples and vendors struggled to coordinate bookings, timelines and communication.",
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
    color: "teal",
    logo: "WC",
    image: "/projects/weddingclickzproject.png",
  },
  {
    title: "Event Ticketing",
    category: "Web",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    problem: "Complex event coordination and ticket sales with no automation.",
    results: ["10K+ tickets sold", "QR code check-in system", "Real-time analytics dashboard"],
    color: "emerald",
    logo: "ET",
    image: "/projects/ticgetz_project.jpg",
  },
  {
    title: "Enterprise ERP System",
    category: "Enterprise",
    stack: ["Flutter", "Node.js", "MongoDB"],
    problem: "Manual inventory and billing management causing delays and errors across branches.",
    results: ["60% reduction in manual work", "Automated reports & invoicing", "Scalable multi-branch backend"],
    color: "cyan",
    logo: "ERP",
    image: "/projects/renoproject.png",
  },
  {
    title: "Add Flow",
    category: "SaaS",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    problem: "Marketing teams had no unified way to manage ad campaigns across multiple channels.",
    results: ["Unified campaign dashboard", "Automated budget allocation", "Cross-channel performance analytics"],
    color: "teal",
    logo: "AF",
    image: "/projects/flowproject.jpg",
  },
]

// Pair into slides of 2
const slides: (typeof projects)[] = []
for (let i = 0; i < projects.length; i += 2) slides.push(projects.slice(i, i + 2))

// Clone first and last for seamless loop: [last, ...slides, first]
const loopSlides = [slides[slides.length - 1], ...slides, slides[0]]
const REAL_COUNT = slides.length

const colorTag: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  teal: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
}
const colorGlow: Record<string, string> = {
  emerald: "rgba(16,185,129,0.12)",
  teal: "rgba(20,184,166,0.12)",
  cyan: "rgba(6,182,212,0.12)",
}
const colorAccent: Record<string, string> = {
  emerald: "text-emerald-400",
  teal: "text-teal-400",
  cyan: "text-cyan-400",
}
const colorLogoBg: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  teal: "bg-teal-500/15 text-teal-400 border border-teal-500/30",
  cyan: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
}
const colorImageBg: Record<string, string> = {
  emerald: "from-emerald-900/40 to-gray-900/80",
  teal: "from-teal-900/40 to-gray-900/80",
  cyan: "from-cyan-900/40 to-gray-900/80",
}

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const [trackIdx, setTrackIdx] = useState(1)
  const [transitioning, setTransitioning] = useState(true)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Real slide for dots: 0-based
  const realIdx = ((trackIdx - 1) % REAL_COUNT + REAL_COUNT) % REAL_COUNT

  const stepForward = useCallback(() => {
    setTransitioning(true)
    setTrackIdx(t => t + 1)
  }, [])

  const stepBack = useCallback(() => {
    setTransitioning(true)
    setTrackIdx(t => t - 1)
  }, [])

  // After slide completes, silently jump for seamless loop
  const onTransitionEnd = () => {
    setTrackIdx(t => {
      if (t >= loopSlides.length - 1) {
        // at cloned first → jump to real first
        setTransitioning(false)
        return 1
      }
      if (t <= 0) {
        // at cloned last → jump to real last
        setTransitioning(false)
        return REAL_COUNT
      }
      return t
    })
  }

  // Re-enable transition after silent jump
  useEffect(() => {
    if (!transitioning) {
      const id = setTimeout(() => setTransitioning(true), 30)
      return () => clearTimeout(id)
    }
  }, [transitioning])

  // Auto-play every 3.5s
  useEffect(() => {
    autoRef.current = setInterval(stepForward, 3500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [stepForward])


  const handleArrow = (dir: 1 | -1) => {
    if (dir === 1) stepForward(); else stepBack()
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = setInterval(stepForward, 3500) }
  }

  return (
    <section className="py-24 bg-[#070b12] overflow-hidden">
      <div className="w-full" style={{ padding: "0 clamp(24px,5vw,72px)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-400 tracking-tight">Our Work</span>
          <p className="mt-5 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Real products, real outcomes. Every project is built to solve a problem and scale a business.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative px-14">
          {/* Left */}
          <button
            onClick={() => handleArrow(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gray-900 border border-gray-700/80 text-gray-400 hover:text-white hover:border-emerald-500/60 hover:bg-gray-800 flex items-center justify-center transition-all duration-200 z-10 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right */}
          <button
            onClick={() => handleArrow(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gray-900 border border-gray-700/80 text-gray-400 hover:text-white hover:border-emerald-500/60 hover:bg-gray-800 flex items-center justify-center transition-all duration-200 z-10 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Track */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={trackRef}
              className="flex"
              style={{
                transform: `translateX(${-trackIdx * 100}%)`,
                transition: transitioning ? "transform 0.65s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {loopSlides.map((pair, slideIdx) => (
                <div key={slideIdx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pair.map((project) => (
                    <div
                      key={project.title + slideIdx}
                      className="group relative rounded-2xl bg-gray-900/80 border border-gray-800/60 overflow-hidden transition-colors duration-300 hover:border-gray-700"
                    >
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 60px ${colorGlow[project.color]}` }}
                      />

                      {/* Image area */}
                      <div className={`relative bg-gradient-to-br ${colorImageBg[project.color]} overflow-hidden`} style={{ height: "28rem" }}>
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                            <div className="relative h-full flex flex-col items-center justify-center gap-3 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                              <div className={`w-16 h-16 rounded-2xl ${colorLogoBg[project.color]} flex items-center justify-center text-xl font-bold`}>
                                {project.logo}
                              </div>
                            </div>
                          </>
                        )}
                        {/* Details overlay — slides up on title click */}
                        <div
                          className="absolute inset-0 flex flex-col justify-end transition-all duration-400"
                          style={{
                            background: expanded === project.title ? "rgba(7,11,18,0.93)" : "rgba(7,11,18,0)",
                            opacity: expanded === project.title ? 1 : 0,
                            pointerEvents: expanded === project.title ? "auto" : "none",
                            backdropFilter: expanded === project.title ? "blur(4px)" : "none",
                            transition: "opacity 0.3s ease, background 0.3s ease",
                          }}
                        >
                          <div className="p-6">
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.problem}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.stack.map((tech) => (
                                <span key={tech} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${colorTag[project.color]}`}>{tech}</span>
                              ))}
                            </div>
                            <div className="space-y-1.5">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Outcomes</p>
                              {project.results.map((r) => (
                                <div key={r} className="flex items-start gap-2 text-sm text-gray-300">
                                  <span className={`${colorAccent[project.color]} flex-shrink-0 font-bold`}>✓</span>
                                  {r}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Badges */}
                        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide ${colorLogoBg[project.color]} backdrop-blur-sm`}>
                          {project.logo}
                        </div>
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-semibold ${colorTag[project.color]} backdrop-blur-sm`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative p-8">
                        <button
                          onClick={() => setExpanded(expanded === project.title ? null : project.title)}
                          className="text-left w-full group/title"
                        >
                          <h3 className={`text-lg font-bold mb-1 transition-colors duration-200 ${expanded === project.title ? "text-emerald-400" : "text-white group-hover/title:text-emerald-300"}`}>
                            {project.title}
                            <span className="ml-2 text-xs font-normal text-gray-500 group-hover/title:text-emerald-500 transition-colors">
                              {expanded === project.title ? "▲ hide" : "▼ details"}
                            </span>
                          </h3>
                        </button>
                        <p className="text-gray-500 text-xs">{project.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setTransitioning(true); setTrackIdx(idx + 1); if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = setInterval(stepForward, 3500) } }}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === realIdx ? "w-8 bg-emerald-400" : "w-2.5 bg-gray-700 hover:bg-gray-500"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
