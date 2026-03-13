"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useConsultation } from "@/components/ui/ConsultationProvider"

const EMERALD = "#10b981"

// Services data
const servicesData = [
    {
        id: "web",
        title: "Website Development",
        description: "We bring together a team of highly talented web application developers, business analysts, Scrum masters, and consultants to help you achieve your ideas.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop",
    },
    {
        id: "app",
        title: "App Development",
        description: "Native and cross-platform mobile applications built with Flutter and React Native for iOS and Android platforms.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&fit=crop",
    },
    {
        id: "uiux",
        title: "UI UX Design",
        description: "User-centered design that combines aesthetics with functionality to create intuitive and engaging digital experiences.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop",
    },
    {
        id: "marketing",
        title: "Social Media Marketing",
        description: "Strategic digital marketing solutions to grow your brand presence and reach your target audience effectively.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80&fit=crop",
    },
]

// Approach/Process data
const approachData = [
    {
        title: "Insights",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        items: ["Briefing", "Analytics", "Goals", "Specification", "Approval"],
    },
    {
        title: "Design",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        items: ["Research", "Idea Preparation", "Wireframes", "UI Concept", "Responsiveness"],
    },
    {
        title: "Development",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        items: ["Architecture", "Front-end", "Back-end", "Integrations", "Testing"],
    },
    {
        title: "Execution",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        items: ["Monitoring", "Optimization", "Releases", "Social Media", "Support"],
    },
]

// FAQ data
const faqData = [
    {
        question: "What technologies do you use for web and app development?",
        answer: "We use modern technologies including Next.js, React, Node.js, Flutter, and React Native for cross-platform development. Our tech stack is always chosen based on the specific needs of your project.",
    },
    {
        question: "How long does it typically take to build a website or app?",
        answer: "The timeline for website development is based on the complexity and size of the project. A basic informational site might take 4-5 weeks from conception to launch, while a complex e-commerce solution could take 12 weeks or more. We prioritize regular communication, ensuring you're kept in the loop throughout the design and development process.",
    },
    {
        question: "Do you offer post-launch support and maintenance?",
        answer: "Yes, we provide comprehensive post-launch support including bug fixes, updates, performance monitoring, and ongoing maintenance packages tailored to your needs.",
    },
    {
        question: "How do you approach SEO and site optimization?",
        answer: "We build SEO best practices into every project from the start, including semantic HTML, optimized images, fast loading times, and proper meta tags. We also offer dedicated SEO services.",
    },
    {
        question: "Do you redesign an existing application?",
        answer: "Absolutely! We specialize in modernizing legacy applications, improving UX/UI, and migrating to newer technologies while preserving your existing data and functionality.",
    },
    {
        question: "Can I approach you for party service?",
        answer: "Yes, we offer flexible engagement models including dedicated teams, project-based work, and consulting services based on your requirements.",
    },
]

export default function ServicesPageContent() {
    const [activeService, setActiveService] = useState(0)
    const [openFaq, setOpenFaq] = useState<number | null>(1)
    const { openModal } = useConsultation()

    return (
        <div className="bg-[#070b12]">
            {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: Our Services
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                            style={{ color: EMERALD }}
                        >
                            Our Services
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-400 max-w-md text-base lg:text-right"
                        >
                            We listen carefully, move swiftly, and deliver work that reflects exactly what you came here to build.
                        </motion.p>
                    </div>

                    {/* Services Tabs/Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="rounded-2xl border border-gray-800/60 overflow-hidden bg-gray-900/40"
                    >
                        {/* Tab Headers */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-800/60">
                            {servicesData.map((service, i) => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveService(i)}
                                    className={`relative px-4 py-4 text-sm font-medium transition-all duration-300 border-r border-gray-800/60 last:border-r-0 ${activeService === i
                                            ? "text-white bg-gray-800/50"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {service.title}
                                        {activeService === i ? (
                                            <span className="text-emerald-400">—</span>
                                        ) : (
                                            <span className="text-gray-600">+</span>
                                        )}
                                    </span>
                                    {activeService === i && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Images */}
                            <div className="relative h-64 lg:h-80 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeService}
                                        src={servicesData[activeService].image}
                                        alt={servicesData[activeService].title}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#070b12]/80" />
                            </div>

                            {/* Description */}
                            <div className="p-8 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeService}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <p className="text-gray-300 leading-relaxed mb-6">
                                            {servicesData[activeService].description}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            A fully customized design process encompassing all aspects of your product, ensuring everything is tailored and matched.
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: Collaborative Image with Keywords
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        {/* Keywords around image */}
                        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm tracking-wider mb-8">
                            <span>Understanding</span>
                            <span className="text-emerald-500">.</span>
                            <span>Coding</span>
                            <span className="text-emerald-500">.</span>
                            <span className="text-gray-600">...</span>
                            <span className="text-emerald-500">.</span>
                            <span>Development</span>
                            <span className="text-emerald-500">.</span>
                            <span>Integration</span>
                        </div>

                        {/* Image */}
                        <div className="relative rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop"
                                alt="Team collaboration"
                                className="w-full h-64 sm:h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent opacity-60" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: Our Approach
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: EMERALD }}
                        >
                            Our Approach
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-400 max-w-sm text-base lg:text-right"
                        >
                            Fast enough to keep up. Consistent enough to get it right. Always built around you.
                        </motion.p>
                    </div>

                    {/* Curved connection line + Icons */}
                    <div className="relative mb-8">
                        {/* SVG Curved Line */}
                        <svg
                            className="absolute top-10 left-0 w-full h-20 hidden lg:block"
                            viewBox="0 0 1000 80"
                            preserveAspectRatio="none"
                            fill="none"
                        >
                            <motion.path
                                d="M 60 40 Q 200 0, 310 40 Q 420 80, 530 40 Q 640 0, 750 40 Q 860 80, 940 40"
                                stroke="rgba(16, 185, 129, 0.3)"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Icons Row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {approachData.map((phase, i) => (
                                <motion.div
                                    key={phase.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }}
                                        className="w-16 h-16 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-emerald-400 mb-4 transition-all duration-300"
                                    >
                                        {phase.icon}
                                    </motion.div>
                                    <span className="text-white font-semibold text-sm">{phase.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {approachData.map((phase, phaseIndex) => (
                            <motion.div
                                key={phase.title + "-items"}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + phaseIndex * 0.1 }}
                                className="space-y-2"
                            >
                                {phase.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.4 + phaseIndex * 0.1 + itemIndex * 0.05 }}
                                        whileHover={{ x: 5, backgroundColor: "rgba(16, 185, 129, 0.08)" }}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-800/60 transition-all duration-200"
                                    >
                                        <span className="text-xs font-bold text-emerald-500/70 min-w-[24px]">
                                            {String(itemIndex + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-sm text-gray-300">{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: FAQ's
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-bold mb-12"
                        style={{ color: EMERALD }}
                    >
                        FAQ&apos;s
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Image + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop"
                                    alt="Contact us"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/50 to-transparent" />

                                {/* Floating elements */}
                                <div className="absolute top-8 left-8">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-12 h-12 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30"
                                    />
                                </div>
                                <div className="absolute top-20 right-12">
                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                        className="w-8 h-8 rounded-full bg-teal-500/20 backdrop-blur-sm border border-teal-500/30"
                                    />
                                </div>

                                {/* Book Call Button */}
                                <div className="absolute bottom-8 left-8">
                                    <motion.button
                                        onClick={openModal}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-white font-medium text-sm hover:border-emerald-500/50 transition-all"
                                    >
                                        Book your Call
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: FAQ Accordion */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-3"
                        >
                            {faqData.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="border border-gray-800/60 rounded-xl overflow-hidden bg-gray-900/30"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-800/30 transition-colors"
                                    >
                                        <span className="text-sm text-gray-300 pr-4">{faq.question}</span>
                                        <motion.svg
                                            animate={{ rotate: openFaq === i ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-5 h-5 text-gray-500 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed border-t border-gray-800/40 pt-3">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
