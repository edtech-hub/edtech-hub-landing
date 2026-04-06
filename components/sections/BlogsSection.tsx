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
        description: "A case study on migrating to serverless with Lambda, API Gateway, and DynamoDB for massive savings.",
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

// Group blogs into pages of 3
const totalPages = Math.ceil(blogs.length / 3)
const PAGE_SLICES = Array.from({ length: totalPages }, (_, i) => blogs.slice(i * 3, i * 3 + 3))

export function BlogsSection() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState(0)
    const pageRef = useRef(0)
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goTo = useCallback((p: number) => {
        const el = scrollRef.current
        if (!el) return
        el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" })
        setPage(p)
        pageRef.current = p
    }, [])

    const stepForward = useCallback(() => {
        goTo((pageRef.current + 1) % totalPages)
    }, [goTo])

    // Auto-play
    useEffect(() => {
        autoRef.current = setInterval(stepForward, 5000)
        return () => { if (autoRef.current) clearInterval(autoRef.current) }
    }, [stepForward])

    // Sync page on manual scroll
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const onScroll = () => {
            const p = Math.round(el.scrollLeft / el.clientWidth)
            setPage(p)
            pageRef.current = p
        }
        el.addEventListener("scroll", onScroll, { passive: true })
        return () => el.removeEventListener("scroll", onScroll)
    }, [])

    const handleArrow = (dir: 1 | -1) => {
        const next = (pageRef.current + dir + totalPages) % totalPages
        goTo(next)
        if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = setInterval(stepForward, 5000) }
    }

    return (
        <section className="py-24 bg-[#070b12]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-sm text-emerald-400 font-semibold uppercase tracking-[0.2em] mb-4 block">
                        Latest Insights
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        From Our{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                            Blog
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Insights on design, development, and building products that matter.
                    </p>
                </motion.div>

                {/* Page-based Scroll Container */}
                <div className="relative px-12">
                    {/* Left Arrow */}
                    <button
                        onClick={() => handleArrow(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors bg-gray-900/80 border border-gray-700/80 hover:border-emerald-500/60"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => handleArrow(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors bg-gray-900/80 border border-gray-700/80 hover:border-emerald-500/60"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scrollable Pages - 3 cards per page */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto pb-4"
                        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "thin", scrollbarColor: "#10b981 #1f2937" }}
                    >
                        {PAGE_SLICES.map((pageBlogs, pageIndex) => (
                            <div
                                key={pageIndex}
                                className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                {pageBlogs.map((blog, index) => (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={blog.slug}>
                                            <article className="group h-full rounded-2xl overflow-hidden bg-gray-900/40 border border-gray-800/60 hover:border-emerald-500/30 transition-all duration-300 flex flex-col">
                                                {/* Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                                                    {/* Category & Read Time */}
                                                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                                                            {blog.category}
                                                        </span>
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 text-gray-300 backdrop-blur-sm flex items-center gap-1.5">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {blog.readTime}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 flex flex-col flex-1">
                                                    <h3 className="text-base font-semibold text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                                                        {blog.description}
                                                    </p>

                                                    {/* Arrow button */}
                                                    <div className="mt-4 flex items-center justify-end">
                                                        <div className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Page Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {PAGE_SLICES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { goTo(i); if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = setInterval(stepForward, 5000) } }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${page === i ? "bg-emerald-400 w-6" : "bg-gray-600 hover:bg-gray-500"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gray-700 text-white font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                        View All Articles
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
