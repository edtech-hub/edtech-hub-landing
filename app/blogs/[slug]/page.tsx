import { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/posts"
import BlogPostClient from "./BlogPostClient"

// ─── Pre-render all blog slugs at build time ────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// ─── SEO metadata per blog post ─────────────────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "Post Not Found" }

  const url = `https://edastra.in/blogs/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt.substring(0, 160),
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt.substring(0, 160),
      url,
      siteName: "Ed-Astra",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt.substring(0, 160),
      images: [post.image],
    },
    alternates: { canonical: url },
  }
}

// ─── JSON-LD structured data ────────────────────────────────────────────────
function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: "https://edastra.in" },
    publisher: {
      "@type": "Organization",
      name: "Ed-Astra",
      url: "https://edastra.in",
      logo: { "@type": "ImageObject", url: "https://edastra.in/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://edastra.in/blogs/${post.slug}` },
    keywords: post.tags.join(", "),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
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

  const allPosts = getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)

  return (
    <>
      <ArticleJsonLd post={post} />
      <BlogPostClient post={post} relatedPosts={related} />
    </>
  )
}
