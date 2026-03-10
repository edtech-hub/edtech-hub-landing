import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Ed-Astra privacy policy — how we collect, use, and protect your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Home</Link>
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: January 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-400 leading-relaxed">
          {[
            {
              title: "1. Introduction",
              content: "Ed-Astra ('we', 'our', or 'us') is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.",
            },
            {
              title: "2. Information We Collect",
              content: "We may collect personal information you provide directly: name, email address, phone number, company name, and project details submitted via our contact form. We also collect usage data such as IP addresses, browser type, pages visited, and time spent on pages through standard analytics tools.",
            },
            {
              title: "3. How We Use Your Information",
              content: "We use the information we collect to: respond to your inquiries and project requests, send project updates and communication related to services you've engaged, improve our website and services, send marketing communications (with your consent), and comply with legal obligations.",
            },
            {
              title: "4. Third-Party Services",
              content: "We may use third-party services including Google Analytics for website analytics, AWS for infrastructure, and email service providers for communication. These services have their own privacy policies governing the use of your information.",
            },
            {
              title: "5. Data Security",
              content: "We implement industry-standard security measures to protect your personal information including SSL encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.",
            },
            {
              title: "6. Data Retention",
              content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Contact form data is retained for up to 2 years.",
            },
            {
              title: "7. Your Rights",
              content: "You have the right to access, correct, or delete your personal data. You may opt-out of marketing communications at any time. To exercise your rights, contact us at contact@edastra.in.",
            },
            {
              title: "8. Contact Us",
              content: "If you have questions about this Privacy Policy, please contact us at: contact@edastra.in",
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
