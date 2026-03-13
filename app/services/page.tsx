import type { Metadata } from "next"
import ServicesPageContent from "@/components/sections/ServicesPageContent"

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, mobile apps, custom software, cloud & DevOps — Ed-Astra builds it all.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesPageContent />
    </div>
  )
}
