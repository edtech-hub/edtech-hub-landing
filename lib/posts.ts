// ─── Blog post type ─────────────────────────────────────────────────────────
export interface BlogPost {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content?: string
  date: string
  readTime: string
  author: string
  tags: string[]
  image: string
  category: string
  featured: boolean
  _apiId?: string
}

// ─── Seed posts (always available — no API needed) ──────────────────────────
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

// ─── Try to load DB posts from pre-fetched JSON (generated by build script) ─
let dbPosts: BlogPost[] = []
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fetched = require("../data/db-posts.json") as BlogPost[]
  if (Array.isArray(fetched) && fetched.length > 0) {
    dbPosts = fetched
  }
} catch {
  // No db-posts.json yet — that's fine, seed data will be used
}

// ─── Merge: DB posts override seed posts with same slug, then remaining seed ─
const slugSet = new Set(dbPosts.map((p) => p.slug))
const merged = [...dbPosts, ...SEED_POSTS.filter((p) => !slugSet.has(p.slug))]

// ─── Public API ─────────────────────────────────────────────────────────────
export function getAllPosts(): BlogPost[] {
  return merged
}

export function getPostBySlug(slug: string): BlogPost | null {
  return merged.find((p) => p.slug === slug) || null
}

export function getAllSlugs(): string[] {
  return merged.map((p) => p.slug)
}
