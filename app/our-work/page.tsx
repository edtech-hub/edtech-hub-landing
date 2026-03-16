"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const filterTags = [
  "ALL",
  "NEW PROJECTS",
  "CREATIVE",
  "ONLINE STORE",
  "WEB SOLUTION",
  "LANDING PAGE",
  "INTERIOR DESIGN / ARCHITECTURE",
  "ENTERTAINMENT / LEISURE",
]

const projects = [
  {
    id: 1,
    title: "Reno Research",
    category: "Website",
    description: "Less stress, better spaces — renovation done right in Singapore.",
    image: "/projects/renoproject.png",
    tags: ["ALL", "WEB SOLUTION", "INTERIOR DESIGN / ARCHITECTURE"],
    size: "large" as const,
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
  },
  {
    id: 2,
    title: "Ticgetz",
    category: "Website",
    description: "Browse, book, and go — it's all here. Everything You Need in One Place.",
    image: "/projects/ticgetz_project.jpg",
    tags: ["ALL", "WEB SOLUTION", "ENTERTAINMENT / LEISURE"],
    size: "large" as const,
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    results: ["10K+ tickets sold", "QR code check-in system", "Real-time analytics dashboard"],
  },
  {
    id: 3,
    title: "Reno Research",
    category: "Mobile App",
    description: "One stop solution for your renovation needs at your fingertips.",
    image: "/projects/renoproject2.png",
    tags: ["ALL", "NEW PROJECTS", "INTERIOR DESIGN / ARCHITECTURE"],
    size: "small" as const,
    stack: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
    results: ["200+ designers onboarded", "3D portfolio visualization", "In-app project management"],
  },
  {
    id: 4,
    title: "WeddingClickz",
    category: "Quotation Generator",
    description: "From inquiry to quote — painlessly simple.",
    image: "/projects/weddingclickzproject.png",
    tags: ["ALL", "CREATIVE", "WEB SOLUTION"],
    size: "medium" as const,
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
  },
  {
    id: 5,
    title: "Reno Research",
    category: "Designer App",
    description: "Accessing made easy for how designers can update their information at fingertips.",
    image: "/projects/RenoResearch.png",
    tags: ["ALL", "NEW PROJECTS", "INTERIOR DESIGN / ARCHITECTURE"],
    size: "small" as const,
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
  },
  {
    id: 6,
    title: "FLOW",
    category: "Website",
    description: "Website crafted for the dynamic concept that they are.",
    image: "/projects/flowproject.jpg",
    tags: ["ALL", "CREATIVE", "LANDING PAGE"],
    size: "medium" as const,
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    results: ["Unified campaign dashboard", "Automated budget allocation", "Cross-channel performance analytics"],
  },
  {
    id: 7,
    title: "Reno Research",
    category: "Mobile App",
    description: "One stop solution for your renovation needs at your fingertips specialized for Singapore.",
    image: "/projects/renoproject2.png",
    tags: ["ALL", "INTERIOR DESIGN / ARCHITECTURE"],
    size: "small" as const,
    stack: ["Flutter", "Node.js", "MongoDB"],
    results: ["60% reduction in manual work", "Automated reports & invoicing", "Scalable multi-branch backend"],
  },
  {
    id: 8,
    title: "Reno Research",
    category: "Website",
    description: "Less stress, better spaces — renovation done right in Singapore.",
    image: "/projects/renoproject.png",
    tags: ["ALL", "WEB SOLUTION", "INTERIOR DESIGN / ARCHITECTURE"],
    size: "medium" as const,
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
  },
  {
    id: 9,
    title: "WeddingClickz",
    category: "Website",
    description: "Every client has a story. Ours is telling yours to life.",
    image: "/projects/weddingclickzproject.png",
    tags: ["ALL", "CREATIVE", "WEB SOLUTION"],
    size: "large" as const,
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
  },
]

export default function OurWorkPage() {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [expanded, setExpanded] = useState<number | null>(null)

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter))

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald-400"
          >
            Our Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-base lg:text-lg max-w-md lg:text-right"
          >
            From sleek web experiences to full-scale applications, here&apos;s what
            we&apos;ve brought to life for clients who needed more than just a pretty
            interface.
          </motion.p>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === tag
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/30 hover:border-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isExpanded={expanded === project.id}
                onToggle={() => setExpanded(expanded === project.id ? null : project.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Let's Connect Button */}
      <section className="max-w-7xl mx-auto px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/30 text-white font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Let&apos;s Connect
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: (typeof projects)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const heightClass =
    project.size === "large"
      ? "h-[580px]"
      : project.size === "medium"
      ? "h-[480px]"
      : "h-[420px]"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className={`relative ${heightClass} rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid`}
    >
      {/* Background Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500" />

      {/* Shine sweep on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: "opacity 0.7s, transform 0.9s ease-out" }} />

      {/* Default bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-black/85 backdrop-blur-sm px-5 py-4">
          <div className="flex items-end justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-lg mb-1 transition-transform duration-500 group-hover:translate-x-1">
                {project.title}{" "}
                <span className="text-gray-400 font-normal">- {project.category}</span>
              </h3>
              <p className="text-gray-400 text-sm line-clamp-1 transition-all duration-500 group-hover:text-gray-300">
                {project.description}
              </p>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 hover:bg-white hover:text-black transition-all duration-300 text-white"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expanded details overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col justify-end rounded-2xl"
            style={{
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="p-5 flex flex-col h-full justify-end">
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold text-white mb-2"
              >
                {project.title}{" "}
                <span className="text-gray-400 font-normal">- {project.category}</span>
              </motion.h3>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white/5 rounded-xl px-4 py-3 mb-4 border border-white/10"
              >
                <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
              </motion.div>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white/5 rounded-xl px-4 py-3 border border-white/10"
              >
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Outcomes</p>
                <div className="space-y-1.5">
                  {project.results.map((r) => (
                    <div key={r} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-emerald-400 flex-shrink-0 font-bold">&#10003;</span>
                      {r}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
                className="mt-4 self-start text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}
