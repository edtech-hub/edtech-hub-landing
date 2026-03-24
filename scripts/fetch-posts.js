#!/usr/bin/env node
/**
 * Pre-build script: fetches published blog posts from the backend API
 * and writes them to data/db-posts.json so Next.js can use them at build time.
 *
 * Usage: node scripts/fetch-posts.js
 * Runs automatically before `npm run build` via the prebuild script.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
const fs = require("fs")
const path = require("path")

async function main() {
  const outPath = path.join(__dirname, "..", "data", "db-posts.json")

  try {
    console.log(`[fetch-posts] Fetching from ${API_URL}/api/blog?limit=100 ...`)
    const res = await fetch(`${API_URL}/api/blog?limit=100`)
    if (!res.ok) throw new Error(`API returned ${res.status}`)
    const json = await res.json()

    if (json.success && json.data?.length > 0) {
      const posts = json.data.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || "",
        content: p.content || "",
        date: p.createdAt || "",
        readTime: p.readTime ? `${p.readTime} min read` : "5 min read",
        author: p.author || "Ed-Astra Team",
        tags: p.tags || [],
        image: p.coverImage || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80&fit=crop",
        category: p.category || "Technology",
        featured: false,
      }))

      fs.writeFileSync(outPath, JSON.stringify(posts, null, 2))
      console.log(`[fetch-posts] Wrote ${posts.length} posts to data/db-posts.json`)
    } else {
      console.log("[fetch-posts] No published posts found in API")
      fs.writeFileSync(outPath, "[]")
    }
  } catch (err) {
    console.warn(`[fetch-posts] API unavailable (${err.message}), using seed data only`)
    fs.writeFileSync(outPath, "[]")
  }
}

main()
