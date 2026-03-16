"use client"

import { motion } from "framer-motion"

const items = [
    "Strategy",
    "Design",
    "UI UX Design",
    "User Understanding",
    "Coding",
    "Front-end Development",
    "Back-end Development",
    "Integration",
    "App Development",
    "Website Development",
]

export function MarqueeSection() {
    return (
        <section
            className="relative w-full overflow-hidden py-8"
            style={{
                background: "#060606",
                borderTop: "1px solid rgba(255,255,255,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
        >
            {/* Left fade */}
            <div
                className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                style={{
                    width: 120,
                    background: "linear-gradient(to right, #060606, transparent)",
                }}
            />
            {/* Right fade */}
            <div
                className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
                style={{
                    width: 120,
                    background: "linear-gradient(to left, #060606, transparent)",
                }}
            />

            {/* Ticker row 1 */}
            <div className="flex overflow-hidden mb-3">
                <motion.div
                    className="flex shrink-0 gap-8 pr-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ willChange: "transform" }}
                >
                    {[...items, ...items].map((item, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-8 shrink-0"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
                                fontWeight: 600,
                                color:
                                    i % 2 === 0
                                        ? "rgba(255,255,255,0.55)"
                                        : "rgba(16,185,129,0.8)",
                                letterSpacing: "-0.01em",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item}
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    background: "#10b981",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    opacity: 0.5,
                                }}
                            />
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Ticker row 2 – reverse */}
            <div className="flex overflow-hidden">
                <motion.div
                    className="flex shrink-0 gap-8 pr-8"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ willChange: "transform" }}
                >
                    {[...items.slice(4), ...items, ...items.slice(0, 4)].map((item, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-8 shrink-0"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.25)",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item}
                            <span
                                style={{
                                    width: 4,
                                    height: 4,
                                    background: "rgba(255,255,255,0.2)",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                }}
                            />
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
