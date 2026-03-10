import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ConsultationProvider from "@/components/ui/ConsultationProvider"
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider"
import BackgroundAnimation from "@/components/ui/BackgroundAnimation"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    default: "Ed-Astra | AI-Powered Web & Mobile App Development",
    template: "%s | Ed-Astra",
  },
  description:
    "Ed-Astra builds production-ready web and mobile applications using AI-accelerated development. Next.js, Flutter, Node.js, AWS — faster delivery, lower cost.",
  keywords: [
    "web development",
    "mobile app development",
    "Node.js",
    "Flutter",
    "Next.js",
    "AWS",
    "software agency India",
    "React development",
    "custom software",
  ],
  authors: [{ name: "Ed-Astra" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edastra.in",
    siteName: "Ed-Astra",
    title: "Ed-Astra | AI-Powered Web & Mobile App Development",
    description:
      "Build scalable web and mobile apps faster with Ed-Astra's AI-powered development process.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ed-Astra | AI-Powered Web & Mobile App Development",
    description: "Build scalable web and mobile apps faster with Ed-Astra.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} antialiased bg-gray-950 text-gray-100`}>
        <SmoothScrollProvider>
          <BackgroundAnimation />
          <ConsultationProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ConsultationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
