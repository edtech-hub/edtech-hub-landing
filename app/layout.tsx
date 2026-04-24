import type { Metadata } from "next"
import localFont from "next/font/local"
import { Playfair_Display } from "next/font/google"
import Script from "next/script"
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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://edastra.in"),
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ed-Astra — AI-Powered Web & Mobile App Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ed-Astra | AI-Powered Web & Mobile App Development",
    description: "Build scalable web and mobile apps faster with Ed-Astra.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "b6uPOYbZRZwEMz_ag1IIsnIXCMaSLdVUdF13kA7AJ2s",
  },
  alternates: {
    canonical: "https://edastra.in",
    types: { "application/rss+xml": "https://edastra.in/feed.xml" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SMR2DZ8VNR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SMR2DZ8VNR');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1617285263029768');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${playfairDisplay.variable} antialiased bg-gray-950 text-gray-100`}>
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1617285263029768&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
