"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    title: "Web Development",
    description: "Responsive, scalable web applications built with modern frameworks. From landing pages to complex SaaS dashboards — pixel-perfect and performant.",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
    gradient: "from-cyan-500/20 via-emerald-500/10 to-transparent",
    glow: "rgba(6,182,212,0.15)",
    border: "hover:border-cyan-500/50",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    featured: true,
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect x="4" y="4" width="112" height="72" rx="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
        <rect x="4" y="4" width="112" height="16" rx="8" fill="currentColor" fillOpacity="0.08"/>
        <circle cx="18" cy="12" r="3" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="28" cy="12" r="3" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="38" cy="12" r="3" fill="currentColor" fillOpacity="0.5"/>
        <rect x="14" y="30" width="40" height="4" rx="2" fill="currentColor" fillOpacity="0.4"/>
        <rect x="14" y="40" width="28" height="3" rx="1.5" fill="currentColor" fillOpacity="0.25"/>
        <rect x="14" y="48" width="34" height="3" rx="1.5" fill="currentColor" fillOpacity="0.25"/>
        <rect x="14" y="56" width="22" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2"/>
        <rect x="68" y="28" width="40" height="44" rx="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
        <rect x="74" y="34" width="28" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
        <rect x="74" y="41" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3"/>
        <rect x="74" y="48" width="24" height="3" rx="1.5" fill="currentColor" fillOpacity="0.25"/>
        <rect x="74" y="58" width="28" height="8" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform iOS & Android applications that users love.",
    tags: ["Flutter", "React Native", "iOS", "Android"],
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    glow: "rgba(20,184,166,0.15)",
    border: "hover:border-teal-500/50",
    tagColor: "bg-teal-500/10 text-teal-400",
    featured: false,
    svg: (
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <rect x="22" y="4" width="36" height="72" rx="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
        <rect x="22" y="4" width="36" height="72" rx="8" fill="currentColor" fillOpacity="0.04"/>
        <rect x="27" y="14" width="26" height="44" rx="3" fill="currentColor" fillOpacity="0.07"/>
        <circle cx="40" cy="68" r="3.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2"/>
        <rect x="34" y="7" width="12" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3"/>
        <rect x="30" y="20" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
        <rect x="30" y="27" width="14" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.25"/>
        <rect x="30" y="34" width="16" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.25"/>
        <rect x="30" y="44" width="20" height="8" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    title: "Product Engineering",
    description: "End-to-end product development engineered around your exact business challenges — from architecture to deployment.",
    tags: ["API", "Microservices", "Automation", "SaaS"],
    gradient: "from-cyan-500/20 via-emerald-500/10 to-transparent",
    glow: "rgba(6,182,212,0.15)",
    border: "hover:border-cyan-500/50",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    featured: true,
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect x="4" y="10" width="30" height="22" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="45" y="10" width="30" height="22" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="86" y="10" width="30" height="22" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="30" y="48" width="60" height="22" rx="4" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <line x1="19" y1="32" x2="19" y2="48" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="60" y1="32" x2="60" y2="48" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="101" y1="32" x2="101" y2="48" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="19" y1="48" x2="101" y2="48" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1"/>
        <rect x="10" y="16" width="18" height="3" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
        <rect x="51" y="16" width="18" height="3" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
        <rect x="92" y="16" width="18" height="3" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
        <rect x="38" y="55" width="44" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
        <rect x="44" y="62" width="32" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.25"/>
      </svg>
    ),
  },
  {
    title: "API Development",
    description: "Robust RESTful APIs and microservices built for reliability and speed.",
    tags: ["REST", "GraphQL", "WebSockets", "gRPC"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glow: "rgba(16,185,129,0.15)",
    border: "hover:border-emerald-500/50",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    featured: false,
    svg: (
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <rect x="4" y="30" width="22" height="16" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="54" y="12" width="22" height="13" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="54" y="32" width="22" height="13" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="54" y="52" width="22" height="13" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2"/>
        <line x1="26" y1="38" x2="54" y2="18" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="26" y1="38" x2="54" y2="38" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="26" y1="38" x2="54" y2="58" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 2"/>
        <rect x="8" y="34" width="14" height="3" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
        <rect x="8" y="39" width="10" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.3"/>
        <rect x="58" y="16" width="14" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.4"/>
        <rect x="58" y="36" width="14" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.4"/>
        <rect x="58" y="56" width="14" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.4"/>
      </svg>
    ),
  },
]


export default function Services() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="w-full" style={{ padding: "0 clamp(24px,5vw,72px)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs sm:text-sm text-emerald-400 font-medium uppercase tracking-widest">What We Build</span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Services That Drive{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Results
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From concept to deployment — we build production-ready software that scales with your business.
          </p>
        </motion.div>

        {/* Asymmetric 2-row grid: [large | small] then [small | large] */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Row 1: Web Dev (large, col-span-2) + Mobile (col-span-1) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`lg:col-span-2 relative overflow-hidden rounded-2xl bg-gray-900/60 border border-gray-800/60 ${services[0].border} hover:shadow-2xl transition-all duration-300 group`}
          >
            <motion.div className={`absolute inset-0 bg-gradient-to-br ${services[0].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 60px ${services[0].glow}` }} />
            <div className="relative flex flex-col sm:flex-row gap-0">
              {/* SVG side */}
              <div className="relative sm:w-80 h-72 sm:h-auto sm:min-h-[320px] flex-shrink-0 flex items-center justify-center overflow-hidden border-b sm:border-b-0 sm:border-r border-gray-800/40">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="w-64 h-44 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  {services[0].svg}
                </motion.div>
              </div>
              {/* Text side */}
              <div className="relative p-8 flex flex-col justify-center items-center text-center min-h-[280px]">
                <h3 className="text-xl font-bold text-white mb-3">{services[0].title}</h3>
                <p className="text-gray-400 leading-relaxed mb-5">{services[0].description}</p>
                <div className="flex flex-wrap gap-2">
                  {services[0].tags.map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-md text-xs font-medium ${services[0].tagColor}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.13, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`lg:col-span-1 relative overflow-hidden rounded-2xl bg-gray-900/60 border border-gray-800/60 ${services[1].border} hover:shadow-2xl transition-all duration-300 group`}
          >
            <motion.div className={`absolute inset-0 bg-gradient-to-br ${services[1].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 40px ${services[1].glow}` }} />
            <div className="relative h-52 flex items-center justify-center overflow-hidden border-b border-gray-800/40">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="w-28 h-28 text-teal-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {services[1].svg}
              </motion.div>
            </div>
            <div className="relative p-7">
              <h3 className="text-lg font-bold text-white mb-2">{services[1].title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{services[1].description}</p>
              <div className="flex flex-wrap gap-2">
                {services[1].tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1 rounded-md text-xs font-medium ${services[1].tagColor}`}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Row 2: API (col-span-1) + Custom Software (large, col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`lg:col-span-1 relative overflow-hidden rounded-2xl bg-gray-900/60 border border-gray-800/60 ${services[3].border} hover:shadow-2xl transition-all duration-300 group`}
          >
            <motion.div className={`absolute inset-0 bg-gradient-to-br ${services[3].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 40px ${services[3].glow}` }} />
            <div className="relative h-52 flex items-center justify-center overflow-hidden border-b border-gray-800/40">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="w-28 h-28 text-emerald-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {services[3].svg}
              </motion.div>
            </div>
            <div className="relative p-7">
              <h3 className="text-lg font-bold text-white mb-2">{services[3].title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{services[3].description}</p>
              <div className="flex flex-wrap gap-2">
                {services[3].tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1 rounded-md text-xs font-medium ${services[3].tagColor}`}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.39, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`lg:col-span-2 relative overflow-hidden rounded-2xl bg-gray-900/60 border border-gray-800/60 ${services[2].border} hover:shadow-2xl transition-all duration-300 group`}
          >
            <motion.div className={`absolute inset-0 bg-gradient-to-br ${services[2].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 60px ${services[2].glow}` }} />
            <div className="relative flex flex-col sm:flex-row gap-0">
              <div className="relative sm:w-80 h-72 sm:h-auto sm:min-h-[320px] flex-shrink-0 flex items-center justify-center overflow-hidden border-b sm:border-b-0 sm:border-r border-gray-800/40">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }} className="w-64 h-44 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  {services[2].svg}
                </motion.div>
              </div>
              <div className="relative p-8 flex flex-col justify-center items-center text-center min-h-[280px]">
                <h3 className="text-xl font-bold text-white mb-3">{services[2].title}</h3>
                <p className="text-gray-400 leading-relaxed mb-5">{services[2].description}</p>
                <div className="flex flex-wrap gap-2">
                  {services[2].tags.map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-md text-xs font-medium ${services[2].tagColor}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-white transition-all duration-200"
          >
            Explore All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
