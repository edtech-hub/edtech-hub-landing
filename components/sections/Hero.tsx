"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useConsultation } from "@/components/ui/ConsultationProvider"

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const PARTICLE_COLOR = "16, 185, 129"
    const LINE_COLOR = "20, 184, 166"
    const MOUSE_REPEL_RADIUS = 120
    const CONNECTION_DISTANCE = 150

    interface Particle {
      x: number; y: number
      vx: number; vy: number
      r: number; opacity: number
      pulse: number; pulseSpeed: number
    }

    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      const count = Math.floor((canvas.width * canvas.height) / 12000)
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          x, y,
          vx: (Math.random() - 0.5) * 0.07,
          vy: (Math.random() - 0.5) * 0.07,
          r: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.45 + 0.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.006 + 0.002,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      // Mouse glow aura
      if (mouse.x > 0 && mouse.y > 0) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        aura.addColorStop(0, `rgba(${PARTICLE_COLOR}, 0.18)`)
        aura.addColorStop(0.4, `rgba(${PARTICLE_COLOR}, 0.07)`)
        aura.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()

        const dot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 6)
        dot.addColorStop(0, `rgba(${PARTICLE_COLOR}, 0.9)`)
        dot.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = dot
        ctx.fill()
      }

      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_REPEL_RADIUS && mdist > 0) {
          const force = (MOUSE_REPEL_RADIUS - mdist) / MOUSE_REPEL_RADIUS
          p.vx += (mdx / mdist) * force * 0.48
          p.vy += (mdy / mdist) * force * 0.48
        }

        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Tiny organic nudge
        p.vx += (Math.random() - 0.5) * 0.001
        p.vy += (Math.random() - 0.5) * 0.001

        // Cap speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.12) { p.vx = (p.vx / speed) * 0.12; p.vy = (p.vy / speed) * 0.12 }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const op = p.opacity + Math.sin(p.pulse) * 0.1

        // Glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
        grd.addColorStop(0, `rgba(${PARTICLE_COLOR}, ${op * 0.6})`)
        grd.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${op + 0.25})`
        ctx.fill()
      }

      // Connections between particles + to mouse
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.22
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Lines to mouse
        const mDx = particles[i].x - mouse.x
        const mDy = particles[i].y - mouse.y
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy)
        if (mDist < MOUSE_REPEL_RADIUS * 1.2) {
          const alpha = (1 - mDist / (MOUSE_REPEL_RADIUS * 1.2)) * 0.35
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove)
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove)
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function Hero() {
  const { openModal } = useConsultation()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Canvas animation */}
      <HeroCanvas />

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-8 tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Development Agency
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[70px] font-extrabold text-white leading-[1.08] tracking-tight mb-7"
          >
            Transform Ideas Into{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300">
                Real Products
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-emerald-400/0" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 mb-10 leading-relaxed"
          >
            We combine deep technical expertise with AI-accelerated workflows to ship production-ready mobile apps, web applications and scalable software —{" "}
            <span className="text-emerald-400 font-medium">in weeks, not months.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 text-sm rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5"
            >
              Book Free Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <Link
              href="/our-work"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 text-sm rounded-xl border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500/5"
            >
              View Our Work
            </Link>
          </motion.div>


        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-6 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}
