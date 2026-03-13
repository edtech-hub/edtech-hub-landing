"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const JOURNEY = [
  { date: "Dec 2023", title: "Ed-Astra founded to redefine web development." },
  { date: "Sept 2024", title: "Second major project launched in the Indian market." },
  { date: "Nov 2024", title: "International expansion to Dubai & Singapore." },
  { date: "Nov 2024", title: "Team doubled to take on bigger client projects." },
  { date: "2026", title: "Going from one country to many — scaling your journey." },
]

const STATS = [
  {
    value: "2",
    label: "Years of Experience",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop",
  },
  {
    value: "3+",
    label: "Apps & Websites",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&fit=crop",
  },
  {
    value: "3+",
    label: "Countries",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80&fit=crop",
  },
  {
    value: "15+",
    label: "Happy Clients",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80&fit=crop",
  },
]

const EMERALD = "#10b981"
const EMERALD_DIM = "rgba(16,185,129,"

function Orb({ style, delay = 0 }: { style: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${EMERALD_DIM}0.18) 0%, transparent 70%)`,
        filter: "blur(80px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  )
}

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }
}

function slideLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -48 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }
}

function slideRight(delay = 0) {
  return {
    initial: { opacity: 0, x: 48 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }
}

function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.85 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  }
}

const TEAL = "#14b8a6"

// ─── The wavy zigzag timeline ────────────────────────────────────────────────────────
function JourneyTimeline() {
  const W = 1000
  const H = 340
  // Alternating up/down positions: top (y=80), bottom (y=220)
  const nodes = [
    { x: 100, y: 80, size: 56 },   // Dec 2023 — top
    { x: 300, y: 220, size: 48 },  // Sept 2024 — bottom
    { x: 500, y: 80, size: 56 },   // Nov 2024 — top
    { x: 700, y: 220, size: 48 },  // Nov 2025 — bottom
    { x: 900, y: 80, size: 56 },   // 2026 — top
  ]

  // Smooth wave path through the nodes
  const pathD = `
    M 0 80
    C 50 80, 50 80, 100 80
    C 150 80, 200 220, 300 220
    C 400 220, 400 80, 500 80
    C 600 80, 600 220, 700 220
    C 800 220, 800 80, 900 80
    C 950 80, 1000 80, 1000 80
  `

  const dates = ["Dec 2023", "Sept 2024", "Nov 2024", "Nov 2025", "2026"]
  // Labels above nodes (for top nodes, text goes above; for bottom nodes, text also above)
  const labelsAbove = [
    "Ed-Astra founded by two\npassionate developers with a vision",
    "",
    "Secured first enterprise\nclient in the logistics sector",
    "",
    "Scaling team and capabilities to\nserve more clients globally",
  ]
  // Labels below nodes (for bottom nodes)
  const labelsBelow = [
    "",
    "Launch of 1st product – a\nmulti tenant SaaS platform",
    "",
    "Went full-time, expanded service\nofferings with AI integration",
    "",
  ]

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none", padding: "40px 0" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", overflow: "visible" }}
      >
        {/* Animated dashed wave path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`${EMERALD_DIM}0.35)`}
          strokeWidth="2"
          strokeDasharray="8 7"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />

        {/* Animated glowing path overlay */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={EMERALD}
          strokeWidth="2"
          strokeDasharray="8 7"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          style={{ filter: "blur(4px)" }}
        />

        {nodes.map((n, i) => {
          const r = n.size / 2
          const aboveLines = labelsAbove[i] ? labelsAbove[i].split("\n") : []
          const belowLines = labelsBelow[i] ? labelsBelow[i].split("\n") : []
          const isTop = n.y < 150 // top nodes
          const nodeDelay = 0.8 + i * 0.6

          return (
            <g key={i}>
              {/* Animated dashed ring around node */}
              <motion.circle
                cx={n.x} cy={n.y} r={r + 18}
                fill="none"
                stroke={`${EMERALD_DIM}0.22)`}
                strokeWidth="1.5"
                strokeDasharray="6 5"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: nodeDelay, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />

              {/* Pulsing glow effect */}
              <motion.circle
                cx={n.x} cy={n.y} r={r + 8}
                fill="none"
                stroke={EMERALD}
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: nodeDelay + 0.4 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px`, filter: "blur(8px)" }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
              />

              {/* Filled circle with scale animation */}
              <motion.circle
                cx={n.x} cy={n.y} r={r}
                fill={`url(#grad${i})`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: nodeDelay, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              <defs>
                <radialGradient id={`grad${i}`} cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor={TEAL} />
                  <stop offset="100%" stopColor={EMERALD} />
                </radialGradient>
              </defs>

              {/* Star icon with rotation animation */}
              <motion.foreignObject
                x={n.x - 11}
                y={n.y - 11}
                width={22}
                height={22}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: nodeDelay + 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </motion.foreignObject>

              {/* Date with fade animation */}
              <motion.text
                x={n.x}
                y={isTop ? n.y + r + 38 : n.y - r - 28}
                textAnchor="middle"
                fill={EMERALD}
                fontSize="14"
                fontWeight="700"
                letterSpacing="0.5"
                initial={{ opacity: 0, y: isTop ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: nodeDelay + 0.5 }}
              >
                {dates[i]}
              </motion.text>

              {/* Labels above for top nodes with staggered animation */}
              {isTop && aboveLines.map((line, li) => (
                <motion.text
                  key={`a${li}`}
                  x={n.x}
                  y={n.y - r - 38 - (aboveLines.length - 1 - li) * 18}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="12"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: nodeDelay + 0.6 + li * 0.2 }}
                >
                  {line}
                </motion.text>
              ))}

              {/* Labels below for bottom nodes with staggered animation */}
              {!isTop && belowLines.map((line, li) => (
                <motion.text
                  key={`b${li}`}
                  x={n.x}
                  y={n.y + r + 55 + li * 18}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="12"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: nodeDelay + 0.6 + li * 0.2 }}
                >
                  {line}
                </motion.text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: "#070b12",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div style={{ y: orbY, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Orb style={{ width: 700, height: 700, top: "0%", left: "-15%" }} delay={0} />
        <Orb style={{ width: 550, height: 550, top: "30%", right: "-10%" }} delay={1.5} />
        <Orb style={{ width: 450, height: 450, top: "65%", left: "5%" }} delay={3} />
        <Orb style={{ width: 400, height: 400, top: "85%", right: "5%" }} delay={2} />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          SLIDE 1 — Hero + Mission  (~100vh)
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(56px,7vh,90px) clamp(32px,6vw,96px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: "clamp(900px, 78vw, 1200px)", margin: "0 auto", width: "100%" }}>

          {/* Eyebrow + Giant heading */}
          <motion.div {...slideLeft(0)} style={{ marginBottom: "clamp(28px,4vh,48px)" }}>
            <motion.p
              {...fade(0.1)}
              style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.28em", color: EMERALD, marginBottom: 24, textTransform: "uppercase" }}
            >
              About Us
            </motion.p>
            <h1
              style={{
                fontSize: "clamp(46px,6.5vw,90px)",
                fontWeight: 900,
                lineHeight: 1.03,
                margin: "0 0 20px",
                background: `linear-gradient(135deg, #fff 40%, ${EMERALD})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                maxWidth: "75%",
              }}
            >
              We Build<br />Products That<br />Actually Ship.
            </h1>
            <p style={{ fontSize: "clamp(17px,1.5vw,22px)", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, maxWidth: 740 }}>
              A two-founder agency combining expert engineering with AI acceleration — production-ready products built smarter, shipped faster, and crafted for real results.
            </p>
          </motion.div>

          {/* Mission block */}
          <motion.div
            {...slideRight(0.18)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 0,
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div style={{ padding: "clamp(36px,4.5vw,64px)", background: "rgba(15,20,30,0.92)" }}>
              <p style={{ fontSize: "clamp(17px,1.4vw,22px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, margin: 0 }}>
                We don&apos;t choose between human judgment and mechanical speed. We harness both — cutting out the bloat — producing work that sets a new standard for what your clients can expect from a development partner.
              </p>
            </div>
            <motion.div
              whileHover={{ background: `${EMERALD_DIM}0.08)` }}
              transition={{ duration: 0.3 }}
              style={{
                width: "clamp(180px,20vw,260px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.04)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                padding: "36px 32px",
                gap: 14,
              }}
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 56, height: 56, borderRadius: "50%", background: `${EMERALD_DIM}0.15)`, border: `1px solid ${EMERALD_DIM}0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <span style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2 }}>
                Our Mission
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Journey ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(48px,5vh,72px) clamp(32px,6vw,96px)",
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "clamp(900px, 78vw, 1200px)", margin: "0 auto", width: "100%" }}>
          <motion.div {...fade(0)}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.28em", color: EMERALD, marginBottom: 12, textTransform: "uppercase" }}>
              Timeline
            </p>
            <h2 style={{ fontSize: "clamp(34px,4.5vw,68px)", fontWeight: 800, color: "#fff", marginBottom: "clamp(36px,5vh,60px)", lineHeight: 1.08 }}>
              Our Journey
            </h2>
          </motion.div>
          <JourneyTimeline />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SLIDE 3 — Stats + CTA  (~100vh)
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(48px,5vh,72px) clamp(32px,6vw,96px)",
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "clamp(900px, 78vw, 1200px)", margin: "0 auto", width: "100%" }}>

          <motion.div {...fade(0)}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.28em", color: EMERALD, marginBottom: 12, textTransform: "uppercase" }}>
              By the numbers
            </p>
            <h2 style={{ fontSize: "clamp(34px,4.5vw,68px)", fontWeight: 800, color: "#fff", marginBottom: "clamp(28px,4vh,48px)", lineHeight: 1.08 }}>
              Ed-Astra In{" "}
              <span style={{ background: `linear-gradient(135deg, ${EMERALD}, #14b8a6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Numbers
              </span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: "clamp(32px,4vh,52px)" }}>
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                {...scaleIn(0.1 + i * 0.1)}
                whileHover={{ y: -8, border: `1px solid ${EMERALD_DIM}0.35)` }}
                transition={{ duration: 0.3 }}
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(15,20,30,0.85)",
                  minHeight: 220,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px 28px",
                  cursor: "default",
                }}
              >
                <img
                  src={s.image}
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 15%, rgba(7,11,18,0.92) 100%)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ fontSize: "clamp(42px,4.5vw,66px)", fontWeight: 900, color: "#fff", margin: "0 0 8px", lineHeight: 1 }}
                  >
                    {s.value}
                  </motion.p>
                  <p style={{ fontSize: "clamp(13px,1.1vw,16px)", color: "rgba(255,255,255,0.6)", margin: 0, letterSpacing: "0.04em", fontWeight: 500 }}>
                    {s.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div {...fade(0.2)} style={{ textAlign: "center" }}>
            <p style={{ fontSize: "clamp(22px,2.6vw,38px)", fontWeight: 700, color: "rgba(255,255,255,0.88)", marginBottom: 20, lineHeight: 1.3 }}>
              Let&apos;s give meaning to your ideas
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, boxShadow: `0 0 56px ${EMERALD_DIM}0.4)` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "20px 52px",
                borderRadius: 100,
                border: `1px solid ${EMERALD_DIM}0.4)`,
                background: `${EMERALD_DIM}0.1)`,
                color: EMERALD,
                fontSize: "clamp(14px,1.1vw,17px)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              Become a Client
              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.a>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
