#!/usr/bin/env node
/**
 * Pre-build script: fetches published blog posts from the admin API
 * and writes them to data/db-posts.json so Next.js can use them at build time.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://adminapi.edastra.in"
const fs = require("fs")
const path = require("path")

function toSlug(title, id) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return base ? `${base}-${id.slice(-6)}` : id
}

async function main() {
  const outPath = path.join(__dirname, "..", "data", "db-posts.json")

  try {
    console.log(`[fetch-posts] Fetching from ${API_URL}/api/blogs?isVisible=true&limit=100 ...`)
    const res = await fetch(`${API_URL}/api/blogs?isVisible=true&limit=100`)
    if (!res.ok) throw new Error(`API returned ${res.status}`)
    const json = await res.json()

    if (json.success && json.data?.length > 0) {
      const posts = json.data.map((p) => ({
        slug: toSlug(p.title, p._id),
        title: p.title,
        excerpt: p.description || "",
        content: "",
        date: p.createdAt || "",
        readTime: p.readingTime
          ? (p.readingTime.includes("min") ? p.readingTime : `${p.readingTime} min read`)
          : "5 min read",
        author: p.authorName || "Ed-Astra Team",
        tags: (p.additionalTags || []).filter((t) => t.isVisible).map((t) => t.name),
        image: p.image || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80&fit=crop",
        category: p.mainTag || "Technology",
        featured: false,
        _apiId: p._id,
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
