"use client"

import Link from "next/link"
import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { fetchVisibleBlogs, fetchBlogById } from "@/lib/blog-api"
import type { BlogPost } from "@/lib/posts"
import BlogPostClient from "./[slug]/BlogPostClient"

const SEED_POSTS: BlogPost[] = [
  {
    slug: "nextjs-14-server-components-performance-optimization",
    title: "Next.js 14 Server Components: The Ultimate Guide to Performance Optimization",
    excerpt: "Learn how React Server Components in Next.js 14 can reduce your JavaScript bundle by up to 70%, improve Core Web Vitals, and deliver lightning-fast user experiences. We cover streaming, suspense boundaries, and real-world implementation patterns.",
    date: "2026-03-15",
    readTime: "12 min read",
    author: "Ed-Astra Team",
    tags: ["Next.js", "React", "Performance"],
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80&fit=crop",
    featured: true,
    category: "FRONTEND",
  },
  {
    slug: "building-ai-powered-saas-applications-2026",
    title: "Building AI-Powered SaaS Applications: A Complete Technical Guide for 2026",
    excerpt: "From integrating OpenAI GPT-4 and Claude APIs to building custom ML pipelines, discover how to architect scalable AI-first SaaS products. Includes cost optimization strategies, prompt engineering best practices, and production deployment patterns.",
    date: "2026-03-10",
    readTime: "18 min read",
    author: "Ed-Astra Team",
    tags: ["AI", "SaaS", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fit=crop",
    featured: false,
    category: "AI & ML",
  },
  {
    slug: "flutter-vs-react-native-cross-platform-development-2026",
    title: "Flutter vs React Native in 2026: Which Cross-Platform Framework Should You Choose?",
    excerpt: "An in-depth comparison of Flutter 4.0 and React Native's New Architecture. We analyze performance benchmarks, developer experience, ecosystem maturity, and help you make the right choice for your mobile app project.",
    date: "2026-02-20",
    readTime: "15 min read",
    author: "Ed-Astra Team",
    tags: ["Flutter", "React Native", "Mobile Development"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&fit=crop",
    featured: false,
    category: "MOBILE",
  },
  {
    slug: "aws-serverless-architecture-cost-optimization",
    title: "AWS Serverless Architecture: How We Reduced Cloud Costs by 60% for Our Clients",
    excerpt: "A detailed case study on migrating from traditional EC2 infrastructure to a serverless architecture using AWS Lambda, API Gateway, DynamoDB, and EventBridge. Learn our cost optimization strategies and performance tuning techniques.",
    date: "2026-02-10",
    readTime: "14 min read",
    author: "Ed-Astra Team",
    tags: ["AWS", "Serverless", "Cloud Architecture"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&fit=crop",
    featured: false,
    category: "CLOUD",
  },
  {
    slug: "typescript-design-patterns-enterprise-applications",
    title: "TypeScript Design Patterns for Enterprise Applications: A Practical Guide",
    excerpt: "Master advanced TypeScript patterns including dependency injection, repository pattern, CQRS, and event sourcing. Real code examples from production applications serving millions of users with clean, maintainable architecture.",
    date: "2026-01-25",
    readTime: "20 min read",
    author: "Ed-Astra Team",
    tags: ["TypeScript", "Design Patterns", "Architecture"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&fit=crop",
    featured: false,
    category: "BACKEND",
  },
  {
    slug: "postgresql-performance-tuning-high-traffic-applications",
    title: "PostgreSQL Performance Tuning: Handling 100K+ Queries Per Second",
    excerpt: "Deep dive into PostgreSQL optimization including query planning, index strategies, connection pooling with PgBouncer, read replicas, and partitioning. Based on our experience scaling databases for high-traffic fintech applications.",
    date: "2026-01-15",
    readTime: "16 min read",
    author: "Ed-Astra Team",
    tags: ["PostgreSQL", "Database", "Performance"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&fit=crop",
    featured: false,
    category: "DATABASE",
  },
  {
    slug: "ux-design-principles-conversion-optimization",
    title: "UX Design Principles That Increased Our Client's Conversion Rate by 340%",
    excerpt: "A comprehensive breakdown of the UX redesign process that transformed an e-commerce platform. Learn about user research methodologies, A/B testing frameworks, micro-interactions, and the psychology behind high-converting interfaces.",
    date: "2025-12-20",
    readTime: "13 min read",
    author: "Ed-Astra Team",
    tags: ["UX Design", "Conversion", "Case Study"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fit=crop",
    featured: false,
    category: "DESIGN",
  },
  {
    slug: "microservices-kubernetes-deployment-guide",
    title: "Microservices on Kubernetes: A Production-Ready Deployment Guide",
    excerpt: "Everything you need to know about deploying microservices to Kubernetes including service mesh with Istio, observability with Prometheus and Grafana, CI/CD pipelines with ArgoCD, and zero-downtime deployment strategies.",
    date: "2025-12-10",
    readTime: "22 min read",
    author: "Ed-Astra Team",
    tags: ["Kubernetes", "Microservices", "DevOps"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&fit=crop",
    featured: false,
    category: "DEVOPS",
  },
  {
    slug: "startup-mvp-development-lean-methodology",
    title: "From Idea to MVP in 6 Weeks: Our Lean Development Methodology for Startups",
    excerpt: "Discover the exact process we use to help startups validate their ideas and launch MVPs quickly. Includes our tech stack recommendations, sprint planning templates, user feedback loops, and post-launch iteration strategies.",
    date: "2025-11-25",
    readTime: "11 min read",
    author: "Ed-Astra Team",
    tags: ["Startup", "MVP", "Agile"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop",
    featured: false,
    category: "BUSINESS",
  },
]

const allTags = ["All", "Frontend", "Backend", "Mobile", "AI & ML", "Cloud", "DevOps", "Design", "Database", "Business"]

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "long" })
  } catch {
    return dateStr
  }
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070b12] pt-24 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /></div>}>
      <BlogsPageInner />
    </Suspense>
  )
}

function BlogsPageInner() {
  const searchParams = useSearchParams()
  const viewId = searchParams.get("id")

  const [activeTag, setActiveTag] = useState("All")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [singlePost, setSinglePost] = useState<BlogPost | null>(null)
  const [singleLoading, setSingleLoading] = useState(false)

  const loadBlogs = useCallback(async () => {
    try {
      const apiBlogs = await fetchVisibleBlogs()
      if (apiBlogs.length > 0) {
        const apiSlugs = new Set(apiBlogs.map((b) => b.slug))
        const merged = [...apiBlogs, ...SEED_POSTS.filter((s) => !apiSlugs.has(s.slug))]
        if (merged.length > 0 && !merged.some((p) => p.featured)) {
          merged[0] = { ...merged[0], featured: true }
        }
        setPosts(merged)
      } else {
        // Only use SEED_POSTS if API returns nothing
        let seedData = SEED_POSTS
        if (seedData.length > 0 && !seedData.some((p) => p.featured)) {
          seedData = [...seedData]
          seedData[0] = { ...seedData[0], featured: true }
        }
        setPosts(seedData)
      }
    } catch {
      // Only use seed posts on error
      let seedData = SEED_POSTS
      if (seedData.length > 0 && !seedData.some((p) => p.featured)) {
        seedData = [...seedData]
        seedData[0] = { ...seedData[0], featured: true }
      }
      setPosts(seedData)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBlogs()
  }, [loadBlogs])

  useEffect(() => {
    if (!viewId) {
      setSinglePost(null)
      return
    }
    setSingleLoading(true)
    fetchBlogById(viewId)
      .then((post) => setSinglePost(post))
      .catch(() => setSinglePost(null))
      .finally(() => setSingleLoading(false))
  }, [viewId])

  if (viewId) {
    if (singleLoading) {
      return (
        <div className="min-h-screen bg-[#070b12] pt-24 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )
    }
    if (singlePost) {
      const related = posts.filter((p) => p.slug !== singlePost.slug && p.tags.some((t) => singlePost.tags.includes(t))).slice(0, 3)
      return <BlogPostClient post={singlePost} relatedPosts={related} />
    }
    return (
      <div className="min-h-screen bg-[#070b12] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blogs" className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const featured = posts.find((p) => p.featured)
  const filteredPosts = activeTag === "All"
    ? posts.filter((p) => !p.featured)
    : posts.filter((p) => !p.featured && (p.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase())) || p.category.toLowerCase().includes(activeTag.toLowerCase())))

  function getBlogHref(post: BlogPost) {
    if (post._apiId) return `/blogs?id=${post._apiId}`
    return `/blogs/${post.slug}`
  }

  return (
    <div className="min-h-screen bg-[#070b12] pt-24">
      {/* Hero Section */}
      <section className="py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-semibold uppercase tracking-[0.2em] mb-6">
            Insights & Resources
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            The Ed-Astra{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Engineering insights, technical deep-dives, and case studies from our team.
            Learn how we build scalable software for startups and enterprises.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Tag Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-14 justify-center"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${tag === activeTag
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60 border border-gray-700/50"
                }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && activeTag === "All" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <Link href={getBlogHref(featured)}>
                  <div className="group relative rounded-3xl overflow-hidden border border-gray-800/60 hover:border-emerald-500/40 transition-all duration-500">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-[300px] lg:h-[480px] overflow-hidden">
                        <img
                          src={featured.image}
                          alt={featured.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070b12] hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent lg:hidden" />
                      </div>

                      <div className="relative p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-900/80 to-gray-900/40">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold tracking-wider border border-emerald-500/30">
                            {featured.category}
                          </span>
                          <span className="px-3 py-1.5 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold tracking-wider border border-yellow-500/30">
                            ✦ FEATURED
                          </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors duration-300">
                          {featured.title}
                        </h2>
                        <div
                          className="blog-content text-gray-400 text-lg mb-6 leading-relaxed line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: featured.excerpt }}
                        />
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(featured.date)}
                          </span>
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {featured.readTime}
                          </span>
                        </div>

                        <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._apiId || post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 8) }}
                >
                  <Link href={getBlogHref(post)}>
                    <div className="group h-full rounded-2xl overflow-hidden border border-gray-800/60 bg-gray-900/30 hover:border-gray-700 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-gray-800/80 text-gray-400 text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2 flex-shrink-0">
                          {post.title}
                        </h3>
                        <div
                          className="blog-content text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />

                        <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
          <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-900/70 border border-emerald-500/20 backdrop-blur-sm">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold tracking-wider mb-6">
                NEWSLETTER
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Stay Ahead of the Curve
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Get weekly insights on software development, AI trends, and engineering best practices delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                No spam, unsubscribe anytime. Join 2,500+ developers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
