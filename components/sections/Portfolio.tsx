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
    image: "/projects/renoproject.png",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
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
                      className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                      style={{ height: "28rem" }}
                    >
                      {/* Full bleed image */}
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${colorImageBg[project.color]}`}>
                          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                          <div className="h-full flex items-center justify-center">
                            <div className={`w-20 h-20 rounded-2xl ${colorLogoBg[project.color]} flex items-center justify-center text-2xl font-bold`}>
                              {project.logo}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom bar with black transparent background */}
                      <div className="absolute inset-x-0 bottom-0 z-10">
                        {/* Gradient fade from image to black bar */}
                        <div className="h-16 bg-gradient-to-t from-black/90 to-transparent" />
                        {/* Solid black transparent bar for text */}
                        <div className="bg-black/85 backdrop-blur-sm px-6 py-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl md:text-2xl font-semibold text-white truncate">
                                {project.title} <span className="text-gray-400 font-normal">- {project.category}</span>
                              </h3>
                              <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                                {project.problem}
                              </p>
                            </div>
                            {/* Arrow button - expands details inside the grid */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                if (expanded === project.title) {
                                  setExpanded(null)
                                  if (autoRef.current) clearInterval(autoRef.current)
                                  autoRef.current = setInterval(stepForward, 3500)
                                } else {
                                  setExpanded(project.title)
                                  if (autoRef.current) clearInterval(autoRef.current)
                                }
                              }}
                              className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200"
                            >
                              <svg className={`w-5 h-5 transition-transform duration-300 ${expanded === project.title ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded details overlay */}
                      <div
                        className="absolute inset-0 flex flex-col justify-end transition-all duration-300 rounded-3xl z-20"
                        style={{
                          background: expanded === project.title ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
                          opacity: expanded === project.title ? 1 : 0,
                          pointerEvents: expanded === project.title ? "auto" : "none",
                          backdropFilter: expanded === project.title ? "blur(8px)" : "none",
                        }}
                      >
                        <div className="p-6 flex flex-col h-full justify-end">
                          {/* Title */}
                          <h3 className="text-2xl font-semibold text-white mb-2">
                            {project.title} <span className="text-gray-400 font-normal">- {project.category}</span>
                          </h3>

                          {/* Description in its own black bar */}
                          <div className="bg-white/5 rounded-xl px-4 py-3 mb-4 border border-white/10">
                            <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
                          </div>

                          {/* Tech stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.stack.map((tech) => (
                              <span key={tech} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${colorTag[project.color]}`}>{tech}</span>
                            ))}
                          </div>

                          {/* Outcomes in its own black bar */}
                          <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Outcomes</p>
                            <div className="space-y-1.5">
                              {project.results.map((r) => (
                                <div key={r} className="flex items-start gap-2 text-sm text-gray-300">
                                  <span className={`${colorAccent[project.color]} flex-shrink-0 font-bold`}>&#10003;</span>
                                  {r}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Close button */}
                          <button
                            onClick={() => {
                              setExpanded(null)
                              if (autoRef.current) clearInterval(autoRef.current)
                              autoRef.current = setInterval(stepForward, 3500)
                            }}
                            className="mt-4 self-start text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close
                          </button>
                        </div>
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
