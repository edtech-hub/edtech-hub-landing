"use client"

import { motion } from "framer-motion"

const categories = [
  {
    label: "Frontend",
    color: "blue",
    techs: ["React", "Next.js", "Flutter", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    color: "purple",
    techs: ["Node.js", "Express", "Python", "FastAPI", "REST APIs"],
  },
  {
    label: "Database",
    color: "cyan",
    techs: ["MongoDB", "PostgreSQL", "Redis", "Mongoose"],
  },
  {
    label: "Cloud",
    color: "green",
    techs: ["AWS EC2", "AWS S3", "CloudFront", "Docker", "GitHub Actions"],
  },
  {
    label: "Mobile",
    color: "orange",
    techs: ["Flutter", "React Native", "iOS", "Android"],
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  purple: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/30" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  orange: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
}


export default function TechStack() {
  return (
    <section className="py-24 bg-[#070b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm sm:text-base text-emerald-400 font-medium uppercase tracking-widest">Technology</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Technology{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Expertise
            </span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We use best-in-class tools and frameworks to build software that lasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const c = colorMap[cat.color]
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className={`p-7 rounded-2xl border ${c.border} bg-gray-900/40`}
              >
                <h3 className={`text-base font-bold uppercase tracking-widest ${c.text} mb-5`}>
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cat.techs.map((tech, j) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.12 + j * 0.06, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                      className={`px-4 py-2 rounded-lg text-base font-medium ${c.bg} ${c.text} border ${c.border} cursor-default`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
