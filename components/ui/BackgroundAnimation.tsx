"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

const PARTICLE_COUNT = 90
const CONNECTION_DISTANCE = 160
const MOUSE_REPEL_RADIUS = 130
const MOUSE_REPEL_FORCE = 0.06
const PARTICLE_COLOR = "16, 185, 129"   // emerald-500
const LINE_COLOR = "20, 184, 166"       // teal-500
const MOUSE_GLOW_COLOR = "16, 185, 129"

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.07,  // very slow free drift
        vy: (Math.random() - 0.5) * 0.07,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.006 + 0.002,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Draw mouse glow aura
      if (mouse.x > 0 && mouse.y > 0) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        aura.addColorStop(0, `rgba(${MOUSE_GLOW_COLOR}, 0.18)`)
        aura.addColorStop(0.4, `rgba(${MOUSE_GLOW_COLOR}, 0.07)`)
        aura.addColorStop(1, `rgba(${MOUSE_GLOW_COLOR}, 0)`)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()

        const dot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 6)
        dot.addColorStop(0, `rgba(${MOUSE_GLOW_COLOR}, 0.9)`)
        dot.addColorStop(1, `rgba(${MOUSE_GLOW_COLOR}, 0)`)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = dot
        ctx.fill()
      }

      // Update & draw particles
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (mdist < MOUSE_REPEL_RADIUS && mdist > 0) {
          const force = (MOUSE_REPEL_RADIUS - mdist) / MOUSE_REPEL_RADIUS
          p.vx += (mdx / mdist) * force * MOUSE_REPEL_FORCE * 8
          p.vy += (mdy / mdist) * force * MOUSE_REPEL_FORCE * 8
        }

        // Free movement — tiny random nudge to keep it organic
        p.vx += (Math.random() - 0.5) * 0.001
        p.vy += (Math.random() - 0.5) * 0.001

        // Cap speed so they stay slow
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.12) {
          p.vx = (p.vx / speed) * 0.12
          p.vy = (p.vy / speed) * 0.12
        }

        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const pulsed = p.opacity + Math.sin(p.pulse) * 0.08

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        grd.addColorStop(0, `rgba(${PARTICLE_COLOR}, ${pulsed})`)
        grd.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${pulsed + 0.2})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18
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

      animationRef.current = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const handleResize = () => {
      resize()
      initParticles()
    }

    resize()
    initParticles()
    draw()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}
