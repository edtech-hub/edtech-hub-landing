"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"

const TESTIMONIALS = [
  {
    id: "01",
    quote:
      "After the website launch, client engagement surged. Visitors spent significantly more time exploring the platform, and demo requests doubled within the first month. Ed-Astra delivered on time, within budget, and with a level of craft that elevated our entire brand.",
    name: "Daria Naumova",
    role: "Product Manager",
    company: "ValidSoft",
    image: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200&h=200&fit=crop&crop=face",
    cardImage: "https://images.unsplash.com/photo-1702479744062-1880502275b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBVSSUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzczMTI4MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    cardTitle: "ValidSoft — Analytics Dashboard",
    cardType: "WEB PLATFORM",
    stat: "400+",
    statLabel: "SATISFIED CLIENTS",
  },
  {
    id: "02",
    quote:
      "The team's ability to translate complex ideas into elegant digital solutions was remarkable. The interactive animations and attention to micro-detail made our product feel alive. Working with Ed-Astra was a transformative experience for our entire team.",
    name: "Marcus Elliot",
    role: "CTO",
    company: "Nexus Labs",
    image: "https://images.unsplash.com/photo-1769636929261-e913ed023c83?w=200&h=200&fit=crop&crop=face",
    cardImage: "https://images.unsplash.com/photo-1642132652806-8aa09801c2ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWFTJTIwcHJvZHVjdCUyMGxhbmRpbmclMjBwYWdlJTIwd2Vic2l0ZSUyMG1vY2t1cHxlbnwxfHx8fDE3NzMxMjgyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    cardTitle: "Nexus Labs — SaaS Platform",
    cardType: "SAAS PRODUCT",
    stat: "98%",
    statLabel: "ON-TIME DELIVERY",
  },
  {
    id: "03",
    quote:
      "From concept to launch, the collaboration felt seamless. Ed-Astra brought not just technical excellence, but genuine creative vision. Our bounce rate dropped by 40% and conversions climbed. The results speak for themselves.",
    name: "Sophia Reyes",
    role: "Head of Design",
    company: "Orbis Studio",
    image: "https://images.unsplash.com/photo-1770364022652-f3af53a889d0?w=200&h=200&fit=crop&crop=face",
    cardImage: "https://images.unsplash.com/photo-1764406562219-105937cc3f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBVSSUyMGRlc2lnbiUyMHNjcmVlbiUyMHByZXZpZXd8ZW58MXx8fHwxNzczMTI4MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    cardTitle: "Orbis Studio — Mobile App",
    cardType: "MOBILE APP",
    stat: "4.9★",
    statLabel: "AVERAGE RATING",
  },
  {
    id: "04",
    quote:
      "We approached Ed-Astra with a rough idea and left with a polished, world-class platform. Their process is thorough, their communication excellent, and their output extraordinary. They've become our go-to partner for all things digital.",
    name: "James Okafor",
    role: "Founder",
    company: "Pulsar Ventures",
    image: "https://images.unsplash.com/photo-1769636929261-e913ed023c83?w=200&h=200&fit=crop&crop=face",
    cardImage: "https://images.unsplash.com/photo-1579642984094-5be053d579b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwcHJvZHVjdCUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMxMjgyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    cardTitle: "Pulsar Ventures — E-Commerce",
    cardType: "E-COMMERCE",
    stat: "150+",
    statLabel: "GLOBAL PROJECTS",
  },
]

// App theme colors
const EMERALD = "#10b981"
const TEAL = "#14b8a6"
const EMERALD_DIM = "rgba(16,185,129,"
const N = TESTIMONIALS.length
const DURATION = 6000

function TickBar({ progress, onSelect }: { progress: number; onSelect: (i: number) => void }) {
  const active = Math.min(N - 1, Math.floor(progress * N))
  const TICKS = N * 28

  return (
    <div style={{ padding: "8px 0 0", userSelect: "none" }}>
      <div style={{ position: "relative", height: 36, display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          style={{
            position: "absolute", bottom: 0, left: 0, height: 1.5,
            background: `linear-gradient(90deg,${EMERALD},${TEAL})`,
            originX: 0, borderRadius: 2,
          }}
          animate={{ width: `${Math.min(progress * 100, 99.5)}%` }}
          transition={{ duration: 0.06, ease: "linear" }}
        />
        {Array.from({ length: TICKS }).map((_, i) => {
          const posInSeg = i % 28
          const segIdx = Math.floor(i / 28)
          const isMajor = posInSeg === 0
          const isMid = posInSeg === 14
          const h = isMajor ? 30 : isMid ? 18 : posInSeg % 4 === 0 ? 11 : 5
          const frac = i / TICKS
          const lit = frac <= progress
          return (
            <div
              key={i}
              style={{
                flex: 1, height: h, alignSelf: "flex-end", borderRadius: 1,
                background: lit
                  ? isMajor ? EMERALD : `${EMERALD_DIM}0.45)`
                  : isMajor ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                transition: "background 0.12s",
                cursor: isMajor ? "pointer" : "default",
              }}
              onClick={isMajor ? () => onSelect(segIdx) : undefined}
            />
          )
        })}
      </div>
      <div style={{ display: "flex", marginTop: 8 }}>
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => onSelect(i)}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              fontSize: 12, fontWeight: i === active ? 700 : 400,
              color: i === active ? EMERALD : "rgba(255,255,255,0.25)",
              letterSpacing: "0.08em", transition: "color 0.3s", textAlign: "left",
            }}
          >
            {t.id}
          </button>
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const activeRef = useRef(0)
  const startRef = useRef(Date.now())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const e = Date.now() - startRef.current
      if (e >= DURATION) {
        const next = (activeRef.current + 1) % N
        activeRef.current = next
        startRef.current = Date.now()
        setActive(next)
        setElapsed(0)
      } else {
        setElapsed(e)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const handleSelect = useCallback((i: number) => {
    activeRef.current = i
    startRef.current = Date.now()
    setActive(i)
    setElapsed(0)
  }, [])

  const progress = (active + Math.min(elapsed / DURATION, 0.9999)) / N
  const t = TESTIMONIALS[active]

  return (
    <section
      style={{
        height: "100vh",
        background: "#070b12",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top separator glow */}
      <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: 1, background: `linear-gradient(90deg,transparent,${EMERALD_DIM}0.22),transparent)` }} />

      {/* Ambient orb */}
      <div style={{ position: "absolute", top: "10%", left: "30%", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle,${EMERALD_DIM}0.05) 0%,transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />

      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: "clamp(28px,4vh,52px) clamp(24px,5vw,72px) 0",
          position: "relative", zIndex: 2, minHeight: 0,
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(14px,2vh,24px)" }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: EMERALD, boxShadow: `0 0 10px ${EMERALD}` }} />
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", letterSpacing: "0.2em", fontWeight: 600 }}>
            CLIENT TESTIMONIALS
          </span>
          <span style={{ fontSize: 14, color: `${EMERALD_DIM}0.7)`, letterSpacing: "0.1em", marginLeft: "auto" }}>
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px,4vw,64px)",
            alignItems: "start",
            flex: 1, minHeight: 0,
          }}
        >
          {/* Left: project card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id + "-card"}
              initial={{ opacity: 0, x: -24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 18, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(9,16,26,0.9)",
                boxShadow: "0 0 60px rgba(0,0,0,0.55)",
              }}
            >
              <div style={{ position: "relative", height: "clamp(220px,30vh,360px)", overflow: "hidden" }}>
                <ImageWithFallback
                  src={t.cardImage}
                  alt={t.cardTitle}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,16,26,0) 40%,rgba(9,16,26,0.94) 100%)" }} />
                <div style={{ position: "absolute", top: 14, left: 14 }}>
                  <span style={{
                    fontSize: 9, color: EMERALD, letterSpacing: "0.16em",
                    background: `${EMERALD_DIM}0.08)`,
                    border: `1px solid ${EMERALD_DIM}0.22)`,
                    padding: "4px 10px", borderRadius: 100,
                  }}>
                    {t.cardType}
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
                  <p style={{ fontSize: "clamp(14px,1.6vw,19px)", color: "#fff", fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
                    {t.cardTitle}
                  </p>
                </div>
              </div>

              <div style={{ padding: "16px 20px 20px" }}>
                <motion.button
                  whileHover={{ background: `${EMERALD_DIM}0.1)`, borderColor: `${EMERALD_DIM}0.65)`, boxShadow: `0 0 22px ${EMERALD_DIM}0.13)` }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "100%", padding: "12px 0", borderRadius: 100,
                    border: `1px solid ${EMERALD_DIM}0.28)`,
                    background: "transparent", color: EMERALD,
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.09em", cursor: "pointer",
                  }}
                >
                  BECOME A CLIENT →
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: quote */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.8vh,20px)", justifyContent: "center" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(52px,7vw,88px)", color: EMERALD, lineHeight: 0.7, userSelect: "none" }}>&quot;</div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.id + "-q"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ margin: 0, fontSize: "clamp(13px,1.2vw,16px)", color: "rgba(255,255,255,0.76)", lineHeight: 1.82 }}
              >
                {t.quote}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id + "-person"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", border: `2px solid ${EMERALD_DIM}0.32)`, flexShrink: 0 }}>
                  <ImageWithFallback src={t.image} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", margin: "2px 0 0", letterSpacing: "0.04em" }}>{t.role}, {t.company}</p>
                </div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)", marginLeft: 8 }} />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id + "-stat"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(52px,8vw,118px)", color: "rgba(255,255,255,0.08)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  {t.stat}
                </div>
                <div style={{ fontSize: "clamp(10px,0.9vw,12px)", color: "rgba(255,255,255,0.28)", letterSpacing: "0.26em", marginTop: 3 }}>
                  {t.statLabel}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tick bar */}
        <div style={{ paddingTop: 4, paddingBottom: "clamp(8px,1.2vh,14px)" }}>
          <TickBar progress={progress} onSelect={handleSelect} />
        </div>
      </div>
    </section>
  )
}
