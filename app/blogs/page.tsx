import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on web development, mobile apps, AI, and cloud engineering from the Ed-Astra team.",
}

const posts = [
  { slug: "building-scalable-apis-nodejs", title: "Building Scalable APIs with Node.js & Express", excerpt: "A deep dive into designing production-ready REST APIs with authentication, rate limiting, and automated testing.", date: "Jan 2025", tags: ["Backend", "Node.js"], featured: true },
  { slug: "flutter-vs-react-native-2025", title: "Flutter vs React Native in 2025", excerpt: "Which cross-platform framework should you choose? We compare performance, DX, and ecosystem maturity.", date: "Dec 2024", tags: ["Mobile"], featured: false },
  { slug: "ai-transforming-software-dev", title: "How AI is Transforming Software Development", excerpt: "From code generation to automated testing — how AI tools are reshaping the way we build software.", date: "Nov 2024", tags: ["AI", "Dev Tools"], featured: false },
  { slug: "aws-deployment-best-practices", title: "AWS Deployment Best Practices for Startups", excerpt: "A practical guide to deploying Node.js and Next.js apps on AWS EC2 with S3, CloudFront, and CI/CD.", date: "Oct 2024", tags: ["Cloud", "AWS"], featured: false },
  { slug: "nextjs-app-router-guide", title: "Next.js App Router: Complete Guide", excerpt: "Everything you need to know about the App Router — layouts, loading states, server components, and more.", date: "Sep 2024", tags: ["Frontend", "Next.js"], featured: false },
  { slug: "mongodb-schema-design", title: "MongoDB Schema Design for High-Traffic Apps", excerpt: "Practical patterns for schema design, indexing strategies, and query optimization in MongoDB.", date: "Aug 2024", tags: ["Database", "MongoDB"], featured: false },
]

const allTags = ["All", "Backend", "Frontend", "Mobile", "AI", "Cloud", "Database"]

export default function BlogsPage() {
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <section className="py-20 text-center px-4">
        <span className="text-sm text-blue-400 font-medium uppercase tracking-widest">Insights</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
          The Ed-Astra{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Blog</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Engineering insights, tutorials, and case studies from our team.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button key={tag} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${tag === "All" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
              {tag}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <div className="mb-10 p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex flex-wrap gap-2 mb-4">
              {featured.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs">{t}</span>
              ))}
              <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-xs">Featured</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{featured.title}</h2>
            <p className="text-gray-400 mb-4">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{featured.date}</span>
              <Link href={`/blogs/${featured.slug}`} className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                Read More →
              </Link>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <div key={post.slug} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/60 hover:border-gray-700 transition-all flex flex-col">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">{t}</span>
                ))}
              </div>
              <h3 className="text-base font-semibold text-white mb-2 flex-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <span className="text-xs text-gray-600">{post.date}</span>
                <Link href={`/blogs/${post.slug}`} className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-6">Get the latest engineering insights delivered to your inbox.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500" />
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
