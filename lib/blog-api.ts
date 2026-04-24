import type { BlogPost } from "./posts"

const API_BASE = "https://adminapi.edastra.in/api"

interface APIBlog {
  _id: string
  title: string
  subtitle?: string
  description: string
  image: string
  readingTime: string
  mainTag: string
  additionalTags: { name: string; isVisible: boolean }[]
  isVisible: boolean
  createdAt: string
  updatedAt: string
}

function toSlug(title: string, id: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return base ? `${base}-${id.slice(-6)}` : id
}

function mapToBlogPost(blog: APIBlog): BlogPost {
  return {
    slug: toSlug(blog.title, blog._id),
    title: blog.title,
    subtitle: blog.subtitle,
    excerpt: blog.description,
    date: blog.createdAt,
    readTime: blog.readingTime.includes("min") ? blog.readingTime : `${blog.readingTime} min read`,
    author: "Ed-Astra Team",
    tags: blog.additionalTags
      .filter((t) => t.isVisible)
      .map((t) => t.name),
    image: blog.image,
    category: blog.mainTag,
    featured: false,
    _apiId: blog._id,
  }
}

export async function fetchVisibleBlogs(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/blogs?isVisible=true&limit=100`)
  if (!res.ok) throw new Error(`API returned ${res.status}`)
  const json = await res.json()
  if (!json.success || !Array.isArray(json.data)) return []
  return json.data.map(mapToBlogPost)
}

export async function fetchBlogById(id: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/blogs/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  if (!json.success || !json.data) return null
  return mapToBlogPost(json.data)
}
