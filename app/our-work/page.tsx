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

// Projects organized for the grid layout
// Each row: 2 horizontal cards on left + 1 vertical card on right
const projects = [
  // Row 1 - Left horizontal 1
  {
    id: 1,
    title: "Reno Research",
    category: "Website",
    description: "Less stress, better spaces — renovation done right in Singapore.",
    fullDescription: "A comprehensive renovation platform connecting homeowners with trusted contractors across Singapore. The platform features advanced project management tools, real-time progress tracking, and a curated marketplace for interior design inspiration that helps users visualize their dream spaces before construction begins.\n\nWe built an intuitive dashboard that allows homeowners to compare quotes, track milestones, and communicate directly with contractors. The integrated review system and verified contractor badges ensure transparency and trust throughout the renovation journey.",
    image: "/projects/renoproject.png",
    tags: ["ALL", "WEB SOLUTION", "INTERIOR DESIGN / ARCHITECTURE"],
    layout: "horizontal" as const,
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
    client: "Reno Research Pte Ltd",
    purpose: "Streamline the renovation journey for homeowners in Singapore",
    liveUrl: "#",
  },
  // Row 1 - Left horizontal 2
  {
    id: 2,
    title: "Ticgetz",
    category: "Website",
    description: "Browse, book, and go — it's all here. Everything You Need in One Place.",
    fullDescription: "A modern event ticketing platform that revolutionizes how people discover and attend events. From concerts and festivals to workshops and conferences, users can seamlessly browse, purchase, and manage their tickets with integrated QR code verification for hassle-free entry.\n\nThe platform features smart recommendations based on user preferences, social sharing capabilities, and a robust backend for event organizers to manage sales, track attendance, and analyze audience demographics in real-time.",
    image: "/projects/ticgetz_project.jpg",
    tags: ["ALL", "WEB SOLUTION", "ENTERTAINMENT / LEISURE"],
    layout: "horizontal" as const,
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    results: ["10K+ tickets sold", "QR code check-in system", "Real-time analytics dashboard"],
    client: "Ticgetz Entertainment",
    purpose: "Create a seamless event discovery and ticketing experience",
    liveUrl: "#",
  },
  // Row 1 - Right vertical
  {
    id: 3,
    title: "Reno Research",
    category: "Mobile App",
    description: "One stop solution for your renovation needs at your fingertips.",
    fullDescription: "A mobile-first solution empowering users to browse designer portfolios, get instant quotes, and manage renovation projects entirely from their smartphones. The app features cutting-edge AR room visualization that lets homeowners see how different designs would look in their actual space.\n\nWith in-app communication tools, push notifications for project updates, and secure payment integration, users can manage every aspect of their renovation without ever needing to switch platforms or make phone calls.",
    image: "/projects/renoproject2.png",
    tags: ["ALL", "NEW PROJECTS", "INTERIOR DESIGN / ARCHITECTURE"],
    layout: "vertical" as const,
    stack: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
    results: ["200+ designers onboarded", "3D portfolio visualization", "In-app project management"],
    client: "Reno Research Pte Ltd",
    purpose: "Mobile companion app for renovation management",
    liveUrl: "#",
  },
  // Row 2 - Left horizontal 1
  {
    id: 4,
    title: "WeddingClickz",
    category: "Quotation Generator",
    description: "From inquiry to quote — painlessly simple.",
    fullDescription: "An intelligent quotation system designed specifically for wedding photographers and videographers. The platform automatically generates professional, branded quotes based on package selections, venue details, event duration, and special requirements—eliminating hours of manual work.\n\nClients receive beautifully formatted proposals via email with clear pricing breakdowns, package comparisons, and one-click booking confirmation. The system also tracks follow-ups and sends automated reminders to maximize conversion rates.",
    image: "/projects/weddingclickzproject.png",
    tags: ["ALL", "CREATIVE", "WEB SOLUTION"],
    layout: "horizontal" as const,
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
    client: "WeddingClickz Studio",
    purpose: "Automate quotation and booking for wedding photography",
    liveUrl: "#",
  },
  // Row 2 - Left horizontal 2
  {
    id: 5,
    title: "Reno Research",
    category: "Designer App",
    description: "Accessing made easy for how designers can update their information at fingertips.",
    fullDescription: "A dedicated portal built for interior designers to professionally showcase their work, manage incoming client inquiries, and maintain up-to-date profiles. The platform includes comprehensive portfolio management with drag-and-drop organization and automatic image optimization.\n\nDesigners benefit from lead tracking dashboards, analytics on profile views and engagement, and tools to quickly respond to client requests. The app also features a scheduling system for consultations and automatic invoice generation.",
    image: "/projects/RenoResearch.png",
    tags: ["ALL", "NEW PROJECTS", "INTERIOR DESIGN / ARCHITECTURE"],
    layout: "horizontal" as const,
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
    client: "Reno Research Pte Ltd",
    purpose: "Empower designers with professional portfolio management",
    liveUrl: "#",
  },
  // Row 2 - Right vertical
  {
    id: 6,
    title: "FLOW",
    category: "Website",
    description: "Website crafted for the dynamic concept that they are.",
    fullDescription: "A visually stunning website for a creative fitness studio that seamlessly blends yoga, dance, and holistic wellness programs. The design captures their dynamic philosophy through fluid animations, immersive imagery, and an intuitive class booking system that makes scheduling effortless.\n\nThe platform includes membership management, instructor profiles, virtual class streaming integration, and a community forum where members can connect. Every element was crafted to reflect the studio's commitment to movement and mindfulness.",
    image: "/projects/flowproject.jpg",
    tags: ["ALL", "CREATIVE", "LANDING PAGE"],
    layout: "vertical" as const,
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    results: ["Unified campaign dashboard", "Automated budget allocation", "Cross-channel performance analytics"],
    client: "FLOW Studio",
    purpose: "Create an immersive digital presence for wellness brand",
    liveUrl: "#",
  },
  // Row 3 - Left horizontal 1
  {
    id: 7,
    title: "Reno Research",
    category: "Mobile App",
    description: "One stop solution for your renovation needs at your fingertips specialized for Singapore.",
    fullDescription: "A localized version of the renovation app tailored specifically for the Singapore market, addressing unique requirements like HDB renovation guidelines and BCA compliance. The app connects homeowners with a vetted network of local contractors who understand Singapore's building regulations.\n\nFeatures include permit application tracking, neighborhood noise restriction reminders, and integration with local suppliers for materials pricing. The app has become an essential tool for Singapore homeowners embarking on their renovation journey.",
    image: "/projects/renoproject2.png",
    tags: ["ALL", "INTERIOR DESIGN / ARCHITECTURE"],
    layout: "horizontal" as const,
    stack: ["Flutter", "Node.js", "MongoDB"],
    results: ["60% reduction in manual work", "Automated reports & invoicing", "Scalable multi-branch backend"],
    client: "Reno Research Pte Ltd",
    purpose: "Singapore-focused renovation management solution",
    liveUrl: "#",
  },
  // Row 3 - Left horizontal 2
  {
    id: 8,
    title: "Reno Research",
    category: "Website",
    description: "Less stress, better spaces — renovation done right in Singapore.",
    fullDescription: "The flagship website for Reno Research featuring comprehensive service listings, stunning project showcases, and an intuitive inquiry system designed to convert visitors into clients. Built with performance in mind and fully optimized for local SEO to capture Singapore's renovation market.\n\nThe site includes interactive before/after galleries, detailed case studies, cost calculators, and a blog section with renovation tips. Integration with the mobile app ensures a seamless experience across all touchpoints.",
    image: "/projects/renoproject.png",
    tags: ["ALL", "WEB SOLUTION", "INTERIOR DESIGN / ARCHITECTURE"],
    layout: "horizontal" as const,
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
    client: "Reno Research Pte Ltd",
    purpose: "Establish strong digital presence for renovation services",
    liveUrl: "#",
  },
  // Row 3 - Right vertical
  {
    id: 9,
    title: "WeddingClickz",
    category: "Website",
    description: "Every client has a story. Ours is telling yours to life.",
    fullDescription: "A portfolio-driven website that transforms how wedding photographers showcase their artistry. The platform features stunning full-screen galleries with lazy loading, heartfelt client testimonials with video integration, and seamless booking capabilities that make it easy for couples to secure their special day.\n\nEvery design element was crafted to evoke emotion and tell a story. From the elegant typography to the smooth transitions between galleries, the website reflects the studio's commitment to capturing love stories and creates an immersive experience that converts visitors into clients.",
    image: "/projects/weddingclickzproject.png",
    tags: ["ALL", "CREATIVE", "WEB SOLUTION"],
    layout: "vertical" as const,
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
    client: "WeddingClickz Studio",
    purpose: "Showcase wedding photography portfolio and drive bookings",
    liveUrl: "#",
  },
]

// Group projects into rows of 3 (2 horizontal + 1 vertical)
function groupProjectsIntoRows(projectList: typeof projects) {
  const rows: (typeof projects)[] = []
  for (let i = 0; i < projectList.length; i += 3) {
    rows.push(projectList.slice(i, i + 3))
  }
  return rows
}

export default function OurWorkPage() {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter))

  const rows = groupProjectsIntoRows(filteredProjects)

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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === tag
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/30 hover:border-white/60"
                }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Grid Layout - 2 horizontal stacked on left + 1 vertical right per row */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4"
              >
                {/* Left side - 2 horizontal cards stacked */}
                <div className="flex flex-col gap-4">
                  {row[0] && (
                    <ProjectCard
                      key={row[0].id}
                      project={row[0]}
                      index={rowIndex * 3}
                      onClick={() => setSelectedProject(row[0])}
                      variant="horizontal"
                    />
                  )}
                  {row[1] && (
                    <ProjectCard
                      key={row[1].id}
                      project={row[1]}
                      index={rowIndex * 3 + 1}
                      onClick={() => setSelectedProject(row[1])}
                      variant="horizontal"
                    />
                  )}
                </div>
                {/* Right side - 1 tall vertical card */}
                {row[2] && (
                  <ProjectCard
                    key={row[2].id}
                    project={row[2]}
                    index={rowIndex * 3 + 2}
                    onClick={() => setSelectedProject(row[2])}
                    variant="vertical"
                  />
                )}
              </div>
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
  variant,
}: {
  project: (typeof projects)[0]
  index: number
  onClick: () => void
  variant: "horizontal" | "vertical"
}) {
  // Horizontal cards have fixed height, vertical card spans full height
  const heightClass = variant === "vertical"
    ? "h-[300px] lg:h-full" // On mobile fixed, on desktop fills container
    : "h-[240px]" // Horizontal cards are shorter

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`relative ${heightClass} w-full rounded-2xl overflow-hidden group cursor-pointer`}
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
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 hover:bg-white hover:text-black transition-all duration-300 text-white"
            >
              <svg
                className="w-4 h-4"
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0]
  onClose: () => void
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed inset-4 md:inset-6 lg:inset-10 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden w-full max-w-5xl max-h-[95vh] overflow-y-auto pointer-events-auto shadow-2xl border border-white/10">
          {/* Header with title and close button */}
          <div className="relative px-8 pt-8 pb-5 border-b border-white/10">
            <div className="pr-12">
              <h2 className="text-3xl font-bold text-white">
                {project.title} <span className="text-gray-400 font-normal">- {project.category}</span>
              </h2>
              <p className="text-gray-400 text-base mt-2">{project.description}</p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Image with Preview button */}
              <div className="relative rounded-xl overflow-hidden bg-gray-900 group" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Preview overlay button */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={project.liveUrl || "#"}
                    target="_blank"
                    className="flex items-center gap-2 bg-white/90 text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </Link>
                </div>
              </div>

              {/* Right - Details */}
              <div className="flex flex-col gap-5">
                {/* Client & Purpose */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Client</p>
                    <p className="text-white font-medium text-lg">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Purpose</p>
                    <p className="text-gray-300">{project.purpose}</p>
                  </div>
                </div>

                {/* Full Description - Two paragraphs */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">About the Project</p>
                  <div className="space-y-4">
                    {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-300 text-sm leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Key Outcomes</p>
                  <div className="space-y-2">
                    {project.results.map((result) => (
                      <div key={result} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="text-emerald-400 flex-shrink-0 mt-0.5 text-lg">✓</span>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white font-medium text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Connect with us to start your Journey
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
