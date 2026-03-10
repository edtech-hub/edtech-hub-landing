"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Startup MVP",
    price: "$5k – $15k",
    description: "Perfect for early-stage startups validating their idea.",
    features: [
      "Up to 5 core features",
      "Web or mobile app",
      "Basic backend API",
      "Cloud deployment",
      "1 month post-launch support",
      "Source code handoff",
    ],
    cta: "Get Started",
    href: "/contact",
    popular: false,
    color: "blue",
  },
  {
    name: "Growth",
    price: "$15k – $30k",
    description: "For businesses ready to scale with a full product suite.",
    features: [
      "Up to 15 features",
      "Web + mobile app",
      "Full backend + admin panel",
      "Cloud deployment + CI/CD",
      "3 months support",
      "Performance optimization",
      "SEO & analytics setup",
    ],
    cta: "Book Consultation",
    href: "/contact",
    popular: true,
    color: "purple",
  },
  {
    name: "Enterprise",
    price: "$30k+",
    description: "Custom solutions for complex, large-scale requirements.",
    features: [
      "Unlimited features",
      "Custom architecture",
      "AI/ML integration",
      "Dedicated development team",
      "Ongoing support & maintenance",
      "SLA & priority support",
      "White-label options",
    ],
    cta: "Contact Us",
    href: "/contact",
    popular: false,
    color: "cyan",
  },
]

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm sm:text-base text-emerald-400 font-medium uppercase tracking-widest">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Transparent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Pricing
            </span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            No hidden fees. Choose the plan that fits your project scope and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-7 rounded-2xl flex flex-col ${
                plan.popular
                  ? "bg-gradient-to-b from-emerald-900/30 to-gray-900/60 border-2 border-emerald-500/50 shadow-xl shadow-emerald-500/10"
                  : "bg-gray-900/60 border border-gray-800/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-7">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-3">
                  {plan.price}
                </div>
                <p className="text-base text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-3.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-base text-gray-300">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/20"
                    : "border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-base text-gray-400 mt-10"
        >
          Not sure which plan fits?{" "}
          <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">
            Book a free consultation
          </Link>{" "}
          and we&apos;ll guide you.
        </motion.p>
      </div>
    </section>
  )
}
