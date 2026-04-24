"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import { useConsultation } from "@/components/ui/ConsultationProvider"

const TESTIMONIALS = [
  {
    id: "01",
    quote:
      "I needed a website that would match the premium quality of my photography work, and what was delivered completely blew me away. The landing page for WeddingClickz is sleek, cinematic, and instantly gives potential clients in India and Dubai the confidence that they're dealing with a high-end studio. Since launching, my inquiry rate has gone up significantly and couples regularly tell me the website was what convinced them to reach out. It's not just a website — it's my best salesperson.",
    name: "Karthik",
    role: "Founder",
    company: "WeddingClickz",
    cardImage: "/assets/weddingclickzproject.png",
    cardTitle: "WeddingClickz — Premium Studio Website",
    cardTagline: "Every frame tells a story. Every click, a memory.",
    cardType: "WEB DESIGN",
    stat: "↑ Inquiry Rate",
    statLabel: "SINCE LAUNCH",
  },
  {
    id: "02",
    quote:
      "We were launching a new hydration brand in India and needed an e-commerce site that looked clean, premium, and converted visitors into buyers. The final product was exactly that — a sharp, modern storefront with seamless product pages, a smooth checkout flow, and a design that makes our brand look like it belongs next to the biggest names in the wellness space. From the ingredient breakdowns to the shop experience, every detail was thought through. Couldn't have asked for a better launch partner.",
    name: "Aditya",
    role: "Founder",
    company: "Flow Hydration",
    cardImage: "/assets/flowproject.jpg",
    cardTitle: "Flow Hydration — Website",
    cardTagline: "One site. Every sip. Zero compromise.",
    cardType: "E-COMMERCE",
    stat: "Premium",
    statLabel: "BRAND LAUNCH",
  },
  {
    id: "03",
    quote:
      "Building a ticketing platform from scratch is no joke — there are a hundred moving parts. But the team took my vision for Ticgetz and turned it into a fully functional event booking platform that is intuitive for both event organizers and attendees. The UI is clean, the booking flow is frictionless, and it just works. We went from an idea to a live product faster than I ever expected, and the feedback from our early users has been overwhelmingly positive.",
    name: "Trishar",
    role: "Founder",
    company: "Ticgetz",
    cardImage: "/assets/ticgetz_project.jpg",
    cardTitle: "Ticgetz — Event Booking Platform",
    cardTagline: "Browse, book, and go — it's all here.",
    cardType: "WEB PLATFORM",
    stat: "Idea → Live",
    statLabel: "FASTER THAN EXPECTED",
  },
  {
    id: "04",
    quote:
      "The quotation tool has been a total game-changer for our wedding photography business. Couples can now select their events, pick their services, and get a professional quote emailed to them instantly — no back-and-forth, no manual calculations. We have generated over 400 quotes through this tool already, and it has dramatically reduced the time I spend on inquiries while actually increasing our conversion rate. It's the single most impactful tool we've added to our business.",
    name: "Yashas",
    role: "Co-Founder",
    company: "WeddingClickz",
    cardImage: "/assets/weddingclickztestimonials.jpg",
    cardTitle: "WeddingClickz — Quotation Tool",
    cardTagline: "From inquiry to quote — painlessly simple.",
    cardType: "SAAS TOOL",
    stat: "400+",
    statLabel: "QUOTES GENERATED",
  },
  {
    id: "05",
    quote:
      "Reno Research needed a platform that could intelligently match homeowners in Singapore with the right interior designers — not just a random directory, but something algorithm-driven and genuinely useful. What was delivered is a comprehensive platform with hundreds of verified vendors, project showcases, and a smart quote-request system that connects the right designers to the right customers. The site has become a trusted name in Singapore's renovation space, and the tech behind it is rock-solid.",
    name: "Zeon",
    role: "Founder",
    company: "Reno Research",
    cardImage: "/assets/renoproject.png",
    cardTitle: "Reno Research — Website",
    cardTagline: "Less stress, better spaces — renovation done right in Singapore.",
    cardType: "MARKETPLACE",
    stat: "100s",
    statLabel: "VERIFIED VENDORS",
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
    <div style={{ padding: "0", userSelect: "none" }}>
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
  const { openModal } = useConsultation()
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
        height: "clamp(600px, 85vh, 900px)",
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
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "0.2em", fontWeight: 600 }}>
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
              <div style={{ position: "relative", height: "clamp(220px,30vh,360px)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0f18" }}>
                <ImageWithFallback
                  src={t.cardImage}
                  alt={t.cardTitle}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
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
                  <p style={{ fontSize: "clamp(20px,2vw,28px)", color: "#fff", fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
                    {t.cardTitle}
                  </p>
                  <p style={{ fontSize: "clamp(14px,1.3vw,18px)", color: "rgba(255,255,255,0.7)", fontWeight: 400, margin: "8px 0 0", lineHeight: 1.4 }}>
                    {t.cardTagline}
                  </p>
                </div>
              </div>

              <div style={{ padding: "16px 20px 20px" }}>
                <motion.button
                  onClick={openModal}
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
                style={{ margin: 0, fontSize: "clamp(12px,1.1vw,15px)", color: "rgba(255,255,255,0.76)", lineHeight: 1.82 }}
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
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${EMERALD}, ${TEAL})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0
                }}>
                  {t.name[0]}
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
                <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(44px,7vw,100px)", color: EMERALD, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", opacity: 0.85 }}>
                  {t.stat}
                </div>
                <div style={{ fontSize: "clamp(10px,0.9vw,12px)", color: "rgba(16,185,129,0.6)", letterSpacing: "0.26em", marginTop: 3 }}>
                  {t.statLabel}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tick bar */}
        <div style={{ paddingTop: "clamp(12px,1.5vh,20px)", paddingBottom: "clamp(8px,1.2vh,14px)" }}>
          <TickBar progress={progress} onSelect={handleSelect} />
        </div>
      </div>
    </section>
  )
}
