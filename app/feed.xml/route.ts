import { getAllPosts } from "@/lib/posts"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function GET() {
  const posts = getAllPosts()
  const baseUrl = "https://edastra.in"

  const items = posts
    .map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${baseUrl}/blogs/${p.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${p.slug}</guid>
      <description>${esc(p.excerpt)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("\n      ")}
      <author>shreya.anand@edastra.in (${esc(p.author)})</author>
    </item>`)
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ed-Astra Blog</title>
    <link>${baseUrl}/blogs</link>
    <description>Engineering insights, technical deep-dives, and case studies from the Ed-Astra team.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  })
}
