import type { Metadata } from "next"
import Pricing from "@/components/sections/Pricing"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for web and mobile app development — from Startup MVP to Enterprise.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <section className="py-20 text-center px-4">
        <span className="text-sm text-pink-400 font-medium uppercase tracking-widest">Pricing</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
          Simple,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">Transparent</span>{" "}
          Pricing
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          No hidden fees, no surprises. Choose the plan that fits your scope.
        </p>
      </section>
      <Pricing />
    </div>
  )
}
