"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { BlogPost } from "@/lib/posts"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })
}

export default function BlogPostClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const hasContent = post.content && post.content.length > 0

  return (
    <div className="min-h-screen bg-[#070b12] pt-24">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold tracking-wider border border-emerald-500/30">{post.category}</span>
                <span className="text-gray-400 text-sm">{formatDate(post.date)}</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">{post.title}</h1>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold text-sm">EA</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{post.author}</p>
                  <p className="text-gray-500 text-xs">Ed-Astra Engineering</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-lg bg-gray-800/80 text-gray-400 text-xs font-medium border border-gray-700/50">{tag}</span>
            ))}
          </div>

          {hasContent ? (
            <div
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-emerald-400 prose-strong:text-white prose-code:text-emerald-400 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-blockquote:border-emerald-500 prose-blockquote:text-gray-400 prose-li:text-gray-300 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content! }}
            />
          ) : (
            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">{post.excerpt}</p>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-emerald-500/20">
                <p className="text-gray-400 text-center mb-4">Full article coming soon. Interested in this topic?</p>
                <div className="flex justify-center">
                  <Link href="/contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                    Let&apos;s Talk
                  </Link>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-gray-800/60">
          <Link href="/blogs" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to All Posts
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} href={`/blogs/${rp.slug}`}>
                <div className="group rounded-2xl overflow-hidden border border-gray-800/60 bg-gray-900/30 hover:border-gray-700 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={rp.image} alt={rp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">{rp.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">{rp.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{rp.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
