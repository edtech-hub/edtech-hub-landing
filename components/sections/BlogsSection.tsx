"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const blogs = [
    {
        id: 1,
        category: "FRONTEND",
        title: "Next.js 14 Server Components: The Ultimate Performance Guide",
        description: "Learn how React Server Components can reduce your JavaScript bundle by 70% and improve Core Web Vitals significantly.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80&fit=crop",
        slug: "/blogs/nextjs-14-server-components-performance-optimization",
        readTime: "12 min",
    },
    {
        id: 2,
        category: "AI & ML",
        title: "Building AI-Powered SaaS Applications in 2026",
        description: "From GPT-4 integration to custom ML pipelines — how to architect scalable AI-first products.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fit=crop",
        slug: "/blogs/building-ai-powered-saas-applications-2026",
        readTime: "18 min",
    },
    {
        id: 3,
        category: "MOBILE",
        title: "Flutter vs React Native: Which to Choose in 2026?",
        description: "An in-depth comparison of performance, DX, and ecosystem maturity for cross-platform development.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&fit=crop",
        slug: "/blogs/flutter-vs-react-native-cross-platform-development-2026",
        readTime: "15 min",
    },
    {
        id: 4,
        category: "CLOUD",
        title: "AWS Serverless: How We Cut Cloud Costs by 60%",
        description: "A case study on migrating to serverless with Lambda, API Gateway, and DynamoDB.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&fit=crop",
        slug: "/blogs/aws-serverless-architecture-cost-optimization",
        readTime: "14 min",
    },
    {
        id: 5,
        category: "DESIGN",
        title: "UX Principles That Increased Conversions by 340%",
        description: "A breakdown of the UX redesign process that transformed an e-commerce platform's performance.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fit=crop",
        slug: "/blogs/ux-design-principles-conversion-optimization",
        readTime: "13 min",
    },
    {
        id: 6,
        category: "DEVOPS",
        title: "Microservices on Kubernetes: Production Guide",
        description: "Everything about deploying microservices with Istio, Prometheus, and zero-downtime strategies.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&fit=crop",
        slug: "/blogs/microservices-kubernetes-deployment-guide",
        readTime: "22 min",
    },
]

export function BlogsSection() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }, [])

    useEffect(() => {
        checkScroll()
        const el = scrollRef.current
        if (el) {
            el.addEventListener("scroll", checkScroll)
            return () => el.removeEventListener("scroll", checkScroll)
        }
    }, [checkScroll])

    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current
        if (!el) return
        const cardWidth = 560
        el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
    }

    return (
        <section className="py-24 bg-[#070b12] overflow-hidden">
            <div className="w-full" style={{ padding: "0 clamp(24px,5vw,72px)" }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-14"
                >
                    <span className="text-sm text-emerald-400 font-semibold uppercase tracking-[0.2em] mb-4 block">
                        Know More
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-6">
                        Blogs
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        From our desk to yours — real talk on design, development, and everything in between.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gray-900/90 border border-gray-700/80 flex items-center justify-center transition-all duration-200 ${canScrollLeft
                            ? "text-gray-300 hover:text-white hover:border-emerald-500/60 hover:bg-gray-800"
                            : "text-gray-600 cursor-not-allowed opacity-50"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gray-900/90 border border-gray-700/80 flex items-center justify-center transition-all duration-200 ${canScrollRight
                            ? "text-gray-300 hover:text-white hover:border-emerald-500/60 hover:bg-gray-800"
                            : "text-gray-600 cursor-not-allowed opacity-50"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Cards Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide px-14 pb-4"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[520px] group"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <Link href={blog.slug}>
                                    <div className="relative h-[420px] rounded-2xl overflow-hidden border border-gray-800/60 bg-gray-900/40 transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-emerald-500/5">
                                        {/* Image */}
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                                        {/* Category Badge & Read Time */}
                                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                                            <span className="px-4 py-2 rounded-full text-xs font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                                                {blog.category}
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/40 text-gray-300 backdrop-blur-sm flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {blog.readTime}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-end justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                                        {blog.description}
                                                    </p>
                                                </div>
                                                {/* Arrow Button */}
                                                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* View All Blogs Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-base rounded-xl border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-white transition-all duration-200"
                    >
                        View All Blogs
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
