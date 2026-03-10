import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Ed-Astra terms of service — the agreement governing use of our services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Home</Link>
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: January 2025</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">
          {[
            {
              title: "1. Agreement to Terms",
              content: "By accessing or using Ed-Astra's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
            },
            {
              title: "2. Services",
              content: "Ed-Astra provides software development services including web development, mobile app development, custom software solutions, and cloud infrastructure. The scope, timeline, and deliverables of each engagement are defined in individual project agreements or statements of work.",
            },
            {
              title: "3. Payment Terms",
              content: "Payment terms are agreed upon in the project contract. Typically, projects require an upfront deposit (30–50%) before work begins, with remaining payments tied to project milestones. Late payments may result in work being paused until payment is received.",
            },
            {
              title: "4. Intellectual Property",
              content: "Upon full payment, the client receives full ownership of the custom code developed for their project. Ed-Astra retains the right to use open-source components, third-party libraries, and internal tools/frameworks that may be incorporated into deliverables.",
            },
            {
              title: "5. Confidentiality",
              content: "Ed-Astra agrees to keep all client project details, business information, and proprietary data confidential. Clients agree not to share Ed-Astra's internal processes, pricing structures, or proprietary methodologies.",
            },
            {
              title: "6. Limitation of Liability",
              content: "Ed-Astra's liability is limited to the total amount paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.",
            },
            {
              title: "7. Termination",
              content: "Either party may terminate an engagement with 14 days written notice. Upon termination, the client pays for all work completed to date. Ed-Astra will deliver all completed work and relevant assets.",
            },
            {
              title: "8. Governing Law",
              content: "These terms are governed by the laws of India. Any disputes shall be resolved through arbitration in accordance with Indian law.",
            },
            {
              title: "9. Contact",
              content: "For questions about these Terms, contact us at: contact@edastra.in",
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
