"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Projects data for the bento grid
const projects = [
  {
    id: 1,
    title: "Reno Research",
    category: "Website",
    description: "Less stress, better spaces — renovation done right in Singapore.",
    fullDescription: "A comprehensive renovation platform connecting homeowners with trusted contractors across Singapore. The platform features advanced project management tools, real-time progress tracking, and a curated marketplace for interior design inspiration that helps users visualize their dream spaces before construction begins.\n\nWe built an intuitive dashboard that allows homeowners to compare quotes, track milestones, and communicate directly with contractors. The integrated review system and verified contractor badges ensure transparency and trust throughout the renovation journey.",
    image: "/assets/RenoResearch.png",
    stack: ["Next.js", "Node.js", "MongoDB"],
    results: ["Centralized data management", "Real-time collaboration tools", "Custom reporting dashboards"],
    client: "Reno Research Pte Ltd",
    purpose: "Streamline the renovation journey for homeowners in Singapore",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "WeddingClickz",
    category: "Website",
    description: "Every client has a story. Ours is telling yours to life.",
    fullDescription: "A portfolio-driven website that transforms how wedding photographers showcase their artistry. The platform features stunning full-screen galleries with lazy loading, heartfelt client testimonials with video integration, and seamless booking capabilities that make it easy for couples to secure their special day.\n\nEvery design element was crafted to evoke emotion and tell a story. From the elegant typography to the smooth transitions between galleries, the website reflects the studio's commitment to capturing love stories and creates an immersive experience that converts visitors into clients.",
    image: "/assets/weddingclickzproject.png",
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
    client: "WeddingClickz Studio",
    purpose: "Showcase wedding photography portfolio and drive bookings",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Book Your Perfect Wedding Coverage",
    category: "Quotation Generator",
    description: "From inquiry to quote — painlessly simple.",
    fullDescription: "An intelligent quotation system designed specifically for wedding photographers and videographers. The platform automatically generates professional, branded quotes based on package selections, venue details, event duration, and special requirements—eliminating hours of manual work.\n\nClients receive beautifully formatted proposals via email with clear pricing breakdowns, package comparisons, and one-click booking confirmation. The system also tracks follow-ups and sends automated reminders to maximize conversion rates.",
    image: "/assets/weddingclickztestimonials.jpg",
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Streamlined vendor booking", "Live event timeline", "In-app messaging & payments"],
    client: "WeddingClickz Studio",
    purpose: "Automate quotation and booking for wedding photography",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "FLOW",
    category: "Website",
    description: "Website crafted for the dynamic concept that they are.",
    fullDescription: "A visually stunning website for a creative fitness studio that seamlessly blends yoga, dance, and holistic wellness programs. The design captures their dynamic philosophy through fluid animations, immersive imagery, and an intuitive class booking system that makes scheduling effortless.\n\nThe platform includes membership management, instructor profiles, virtual class streaming integration, and a community forum where members can connect. Every element was crafted to reflect the studio's commitment to movement and mindfulness.",
    image: "/assets/flowproject.jpg",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    results: ["Unified campaign dashboard", "Automated budget allocation", "Cross-channel performance analytics"],
    client: "FLOW Studio",
    purpose: "Create an immersive digital presence for wellness brand",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Reno Research",
    category: "Mobile App",
    description: "One stop solution for your renovation needs at your fingertips.",
    fullDescription: "A mobile-first solution empowering users to browse designer portfolios, get instant quotes, and manage renovation projects entirely from their smartphones. The app features cutting-edge AR room visualization that lets homeowners see how different designs would look in their actual space.\n\nWith in-app communication tools, push notifications for project updates, and secure payment integration, users can manage every aspect of their renovation without ever needing to switch platforms or make phone calls.",
    image: "/assets/renoproject2.png",
    stack: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
    results: ["200+ designers onboarded", "3D portfolio visualization", "In-app project management"],
    client: "Reno Research Pte Ltd",
    purpose: "Mobile companion app for renovation management",
    liveUrl: "#",
  },
  {
    id: 6,
    title: "Ticgetz",
    category: "Website",
    description: "Browse, book, and go — it's all here.",
    fullDescription: "A modern event ticketing platform that revolutionizes how people discover and attend events. From concerts and festivals to workshops and conferences, users can seamlessly browse, purchase, and manage their tickets with integrated QR code verification for hassle-free entry.\n\nThe platform features smart recommendations based on user preferences, social sharing capabilities, and a robust backend for event organizers to manage sales, track attendance, and analyze audience demographics in real-time.",
    image: "/assets/ticgetz_project.jpg",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    results: ["10K+ tickets sold", "QR code check-in system", "Real-time analytics dashboard"],
    client: "Ticgetz Entertainment",
    purpose: "Create a seamless event discovery and ticketing experience",
    liveUrl: "#",
  },
  {
    id: 7,
    title: "WeddingClickz",
    category: "Portfolio",
    description: "Capturing moments that last forever.",
    fullDescription: "A comprehensive gallery and portfolio system for WeddingClickz to showcase their finest work. The platform features stunning full-screen galleries with lazy loading and heartfelt client testimonials.",
    image: "/assets/weddingclickzproject.png",
    stack: ["Flutter", "Firebase", "Node.js"],
    results: ["Beautiful gallery system", "Client testimonials", "Easy booking flow"],
    client: "WeddingClickz Studio",
    purpose: "Showcase wedding photography in stunning detail",
    liveUrl: "#",
  },
]

export default function OurWorkPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      {/* Header Section */}
      <section className="max-w-[1400px] mx-auto px-6 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl text-emerald-400 font-playfair italic"
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

      {/* Bento Grid Layout */}
      <section className="max-w-[1400px] mx-auto px-6 mb-16">
        <div className="flex flex-col gap-5">

          {/* Row 1: 2 Horizontal + 1 Vertical */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Reno Research - with full background image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[0])}
              className="lg:col-span-4 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/RenoResearch.png"
                alt="Reno Research"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-bold">R</span>
                  </div>
                  <span className="text-white text-sm font-medium">Reno Research</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-lg">Reno Research</p>
                    <p className="text-gray-400 text-sm">Less stress, better spaces — renovation done right.</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WeddingClickz - Horizontal card with full background image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[1])}
              className="lg:col-span-5 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/weddingclickzproject.png"
                alt="WeddingClickz"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col">
                {/* Header with logo */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-serif">W</span>
                  </div>
                  <span className="text-white text-sm font-medium">WeddingClickz</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-lg">WeddingClickz</p>
                    <p className="text-gray-400 text-sm">Every client has a story. Ours is telling yours to life.</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reno Research Mobile - Vertical tall card with full background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[4])}
              className="lg:col-span-3 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/renoproject2.png"
                alt="Reno Research Mobile"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-4 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-xs">R</span>
                  </div>
                  <span className="text-white text-sm">Reno Research</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Reno Research</p>
                    <p className="text-gray-400 text-xs">Mobile App</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: 1 Horizontal + 1 Vertical + 1 Horizontal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Book Your Perfect Wedding Coverage - with full background image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[2])}
              className="lg:col-span-4 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src="/assets/weddingclickztestimonials.jpg"
                alt="Wedding Coverage"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <span>WeddingClickz</span>
                  <span className="ml-auto text-xs">CONTACT</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-lg">WeddingClickz</p>
                    <p className="text-gray-400 text-sm">Book Your Perfect Wedding Coverage</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ticgetz - with full background image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[5])}
              className="lg:col-span-3 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/ticgetz_project.jpg"
                alt="Ticgetz"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-4 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span>TICGETZ</span>
                  <span className="ml-auto">TICKETING</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Ticgetz</p>
                    <p className="text-gray-400 text-xs">Browse, book, and go — it&apos;s all here.</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLOW Card - Horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[3])}
              className="lg:col-span-5 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/flowproject.jpg"
                alt="FLOW"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                    <span className="text-white text-xs">◆</span>
                  </div>
                  <span className="text-white/70 text-xs">FLOW</span>
                </div>

                {/* Main content */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white text-5xl font-light">Find</h3>
                    <h3 className="text-white text-5xl font-light">Your</h3>
                    <h3 className="text-amber-400 text-5xl font-playfair italic">Flow</h3>
                  </div>

                  {/* Phone mockup */}
                  <div className="ml-6 hidden lg:block">
                    <div className="w-[70px] h-[140px] bg-black rounded-xl border-2 border-gray-700 p-0.5 shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-b from-purple-900 to-purple-950 rounded-lg overflow-hidden relative">
                        <Image
                          src="/assets/flowproject.jpg"
                          alt="FLOW mobile"
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">FLOW</p>
                    <p className="text-gray-400 text-xs">Website curated for the dynamic concept that they are!</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 3: 3 cards with full background images */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Reno Research Website - with full background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[0])}
              className="lg:col-span-3 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/renoproject.png"
                alt="Reno Research Website"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-4 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-xs">R</span>
                  </div>
                  <span className="text-white text-sm">Reno Research</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Reno Research</p>
                    <p className="text-gray-400 text-xs">Website</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reno Research Dashboard - with full background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[0])}
              className="lg:col-span-5 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/renoproject2.png"
                alt="Reno Research Dashboard"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-xs">R</span>
                  </div>
                  <span className="text-white text-sm">Reno Research</span>
                  <span className="ml-auto text-gray-400 text-xs">Dashboard</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Reno Research</p>
                    <p className="text-gray-400 text-xs">Centralized management dashboard</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WeddingClickz Portfolio - with full background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(projects[6])}
              className="lg:col-span-4 h-[480px] relative rounded-2xl overflow-hidden group cursor-pointer bg-[#1a1a1a]"
            >
              <Image
                src="/assets/weddingclickzproject.png"
                alt="WeddingClickz Portfolio"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-4 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-serif text-sm">W</span>
                  </div>
                  <span className="text-white text-sm">WeddingClickz</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom label */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">WeddingClickz</p>
                    <p className="text-gray-400 text-xs">Portfolio & Gallery</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Let's Connect Button */}
      <section className="max-w-[1400px] mx-auto px-6 flex justify-center">
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
