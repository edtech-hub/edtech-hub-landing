"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

const TECH_CATEGORIES = [
  {
    label: "FRONTEND",
    items: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    label: "BACKEND",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "REST APIs", icon: null },
    ],
  },
  {
    label: "DATABASE",
    items: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" },
    ],
  },
  {
    label: "UI/UX",
    items: [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Miro", icon: null },
      { name: "Adobe Creative", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
      { name: "Framer", icon: null },
    ],
  },
  {
    label: "CLOUD & DEVOPS",
    items: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "GitHub CI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
    ],
  },
  {
    label: "TESTING",
    items: [
      { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
      { name: "Cypress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg" },
      { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Vitest", icon: null },
    ],
  },
]

function TechPill({ name, icon }: { name: string; icon: string | null }) {
  const [errored, setErrored] = useState(false)
  return (
    <div
      className="flex items-center gap-3 px-6 py-4 rounded-xl w-fit transition-all duration-150 cursor-default group"
      style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = "rgba(16,185,129,0.15)"
        el.style.borderColor = "rgba(16,185,129,0.35)"
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = "rgba(16,185,129,0.08)"
        el.style.borderColor = "rgba(16,185,129,0.18)"
      }}
    >
      {icon && !errored ? (
        <img
          src={icon}
          alt={name}
          className="w-7 h-7 flex-shrink-0 object-contain"
          onError={() => setErrored(true)}
          style={{
            filter:
              name === "Express" || name === "Next.js" || name === "GitHub CI" || name === "Vercel"
                ? "invert(1)"
                : "none",
          }}
        />
      ) : (
        <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </span>
      )}
      <span className="text-base font-semibold text-emerald-100 group-hover:text-white transition-colors">
        {name}
      </span>
    </div>
  )
}

function TechCard({ cat }: { cat: typeof TECH_CATEGORIES[0] }) {
  return (
    <div
      className="rounded-2xl p-12 flex flex-col gap-6 h-full min-h-[580px]"
      style={{ background: "rgba(15,20,30,0.92)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <p className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase mb-3">{cat.label}</p>
      {cat.items.map((item) => (
        <TechPill key={item.name} name={item.name} icon={item.icon} />
      ))}
    </div>
  )
}

const totalPages = 2
const PAGE_SLICES = [
  TECH_CATEGORIES.slice(0, 3), // Frontend, Backend, Database
  TECH_CATEGORIES.slice(3, 6), // UI/UX, Cloud & DevOps, Testing
]

export default function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const pageRef = useRef(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((p: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" })
    setPage(p)
    pageRef.current = p
  }, [])

  const stepForward = useCallback(() => {
    goTo((pageRef.current + 1) % totalPages)
  }, [goTo])

  // Auto-play
  useEffect(() => {
    autoRef.current = setInterval(stepForward, 4000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [stepForward])

  // Sync dot on manual scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const p = Math.round(el.scrollLeft / el.clientWidth)
      setPage(p)
      pageRef.current = p
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  const handleArrow = (dir: 1 | -1) => {
    const next = (pageRef.current + dir + totalPages) % totalPages
    goTo(next)
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = setInterval(stepForward, 4000) }
  }

  return (
    <section className="pt-8 pb-24 bg-[#070b12]" id="technology">
      <div className="w-full max-w-[88rem] mx-auto" style={{ padding: "0 clamp(24px,4vw,64px)" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.2em] text-emerald-500 uppercase mb-3">Technology</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Our Technology{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-base">The tools we trust to bring your vision to life</p>
        </motion.div>

        {/* Scroll container */}
        <div className="relative px-12">

          {/* Left arrow */}
          <button
            onClick={() => handleArrow(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors shadow-xl"
            style={{ background: "rgba(15,20,30,0.95)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => handleArrow(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors shadow-xl"
            style={{ background: "rgba(15,20,30,0.95)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal scroll track */}
          <div
            ref={scrollRef}
            className="overflow-x-hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div className="flex" style={{ width: `${totalPages * 100}%` }}>
              {PAGE_SLICES.map((group, slideIdx) => (
                <div
                  key={slideIdx}
                  className="grid gap-5"
                  style={{
                    width: `${100 / totalPages}%`,
                    gridTemplateColumns: "repeat(3, 1fr)",
                    scrollSnapAlign: "start",
                    flexShrink: 0,
                  }}
                >
                  {group.map((cat, i) => (
                    <motion.div
                      key={cat.label}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <TechCard cat={cat} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i)
                if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = setInterval(stepForward, 4000) }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-emerald-400" : "w-1.5 bg-gray-600 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
