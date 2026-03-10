"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const countryCodes = [
  { code: "+1", country: "US", name: "United States" },
  { code: "+1", country: "CA", name: "Canada" },
  { code: "+7", country: "RU", name: "Russia" },
  { code: "+20", country: "EG", name: "Egypt" },
  { code: "+27", country: "ZA", name: "South Africa" },
  { code: "+30", country: "GR", name: "Greece" },
  { code: "+31", country: "NL", name: "Netherlands" },
  { code: "+32", country: "BE", name: "Belgium" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+34", country: "ES", name: "Spain" },
  { code: "+36", country: "HU", name: "Hungary" },
  { code: "+39", country: "IT", name: "Italy" },
  { code: "+40", country: "RO", name: "Romania" },
  { code: "+41", country: "CH", name: "Switzerland" },
  { code: "+43", country: "AT", name: "Austria" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+45", country: "DK", name: "Denmark" },
  { code: "+46", country: "SE", name: "Sweden" },
  { code: "+47", country: "NO", name: "Norway" },
  { code: "+48", country: "PL", name: "Poland" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+51", country: "PE", name: "Peru" },
  { code: "+52", country: "MX", name: "Mexico" },
  { code: "+54", country: "AR", name: "Argentina" },
  { code: "+55", country: "BR", name: "Brazil" },
  { code: "+56", country: "CL", name: "Chile" },
  { code: "+57", country: "CO", name: "Colombia" },
  { code: "+58", country: "VE", name: "Venezuela" },
  { code: "+60", country: "MY", name: "Malaysia" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+62", country: "ID", name: "Indonesia" },
  { code: "+63", country: "PH", name: "Philippines" },
  { code: "+64", country: "NZ", name: "New Zealand" },
  { code: "+65", country: "SG", name: "Singapore" },
  { code: "+66", country: "TH", name: "Thailand" },
  { code: "+81", country: "JP", name: "Japan" },
  { code: "+82", country: "KR", name: "South Korea" },
  { code: "+84", country: "VN", name: "Vietnam" },
  { code: "+86", country: "CN", name: "China" },
  { code: "+90", country: "TR", name: "Turkey" },
  { code: "+91", country: "IN", name: "India" },
  { code: "+92", country: "PK", name: "Pakistan" },
  { code: "+93", country: "AF", name: "Afghanistan" },
  { code: "+94", country: "LK", name: "Sri Lanka" },
  { code: "+95", country: "MM", name: "Myanmar" },
  { code: "+98", country: "IR", name: "Iran" },
  { code: "+212", country: "MA", name: "Morocco" },
  { code: "+213", country: "DZ", name: "Algeria" },
  { code: "+216", country: "TN", name: "Tunisia" },
  { code: "+218", country: "LY", name: "Libya" },
  { code: "+220", country: "GM", name: "Gambia" },
  { code: "+221", country: "SN", name: "Senegal" },
  { code: "+234", country: "NG", name: "Nigeria" },
  { code: "+254", country: "KE", name: "Kenya" },
  { code: "+255", country: "TZ", name: "Tanzania" },
  { code: "+256", country: "UG", name: "Uganda" },
  { code: "+260", country: "ZM", name: "Zambia" },
  { code: "+263", country: "ZW", name: "Zimbabwe" },
  { code: "+351", country: "PT", name: "Portugal" },
  { code: "+352", country: "LU", name: "Luxembourg" },
  { code: "+353", country: "IE", name: "Ireland" },
  { code: "+354", country: "IS", name: "Iceland" },
  { code: "+355", country: "AL", name: "Albania" },
  { code: "+356", country: "MT", name: "Malta" },
  { code: "+358", country: "FI", name: "Finland" },
  { code: "+380", country: "UA", name: "Ukraine" },
  { code: "+381", country: "RS", name: "Serbia" },
  { code: "+385", country: "HR", name: "Croatia" },
  { code: "+386", country: "SI", name: "Slovenia" },
  { code: "+420", country: "CZ", name: "Czech Republic" },
  { code: "+421", country: "SK", name: "Slovakia" },
  { code: "+502", country: "GT", name: "Guatemala" },
  { code: "+503", country: "SV", name: "El Salvador" },
  { code: "+504", country: "HN", name: "Honduras" },
  { code: "+505", country: "NI", name: "Nicaragua" },
  { code: "+506", country: "CR", name: "Costa Rica" },
  { code: "+507", country: "PA", name: "Panama" },
  { code: "+593", country: "EC", name: "Ecuador" },
  { code: "+595", country: "PY", name: "Paraguay" },
  { code: "+598", country: "UY", name: "Uruguay" },
  { code: "+880", country: "BD", name: "Bangladesh" },
  { code: "+961", country: "LB", name: "Lebanon" },
  { code: "+962", country: "JO", name: "Jordan" },
  { code: "+963", country: "SY", name: "Syria" },
  { code: "+964", country: "IQ", name: "Iraq" },
  { code: "+966", country: "SA", name: "Saudi Arabia" },
  { code: "+971", country: "AE", name: "UAE" },
  { code: "+972", country: "IL", name: "Israel" },
  { code: "+973", country: "BH", name: "Bahrain" },
  { code: "+974", country: "QA", name: "Qatar" },
  { code: "+975", country: "BT", name: "Bhutan" },
  { code: "+976", country: "MN", name: "Mongolia" },
  { code: "+977", country: "NP", name: "Nepal" },
  { code: "+992", country: "TJ", name: "Tajikistan" },
  { code: "+993", country: "TM", name: "Turkmenistan" },
  { code: "+994", country: "AZ", name: "Azerbaijan" },
  { code: "+995", country: "GE", name: "Georgia" },
  { code: "+996", country: "KG", name: "Kyrgyzstan" },
  { code: "+998", country: "UZ", name: "Uzbekistan" },
]

export default function BookConsultationModal({ isOpen, onClose }: Props) {
  const [dialCode, setDialCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [search, setSearch] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filtered = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { if (dropdownOpen) setDropdownOpen(false); else onClose() } }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, dropdownOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `${dialCode} ${phone}`, email }),
      })
      if (res.ok) {
        setStatus("success")
        setPhone("")
        setEmail("")
        setSearch("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const handleClose = () => {
    setStatus("idle")
    setDropdownOpen(false)
    setSearch("")
    onClose()
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-gray-800/80 border border-gray-700/60 text-white text-base placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-gray-800/60 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Book a Free Consultation</h2>
                  <p className="text-sm text-gray-400 mt-1">We&apos;ll reach out within 24 hours</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-colors ml-4 flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Got it!</h3>
                    <p className="text-gray-400 mb-6">We&apos;ll get back to you within 24 hours.</p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Mobile Number *</label>
                      <div className="flex gap-2">
                        {/* Country code dropdown */}
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => { setDropdownOpen(!dropdownOpen); setSearch("") }}
                            className="h-full px-3 py-3.5 rounded-xl bg-gray-800/80 border border-gray-700/60 text-white text-sm flex items-center gap-1.5 hover:border-emerald-500/40 transition-all whitespace-nowrap focus:outline-none focus:border-emerald-500/60"
                          >
                            <span className="font-medium">{dialCode}</span>
                            <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 mt-1 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-[80] overflow-hidden"
                              >
                                {/* Search */}
                                <div className="p-2 border-b border-gray-800">
                                  <input
                                    autoFocus
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search country..."
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                                  />
                                </div>
                                {/* List */}
                                <div className="max-h-52 overflow-y-auto">
                                  {filtered.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-gray-500">No results</div>
                                  ) : (
                                    filtered.map((c) => (
                                      <button
                                        key={`${c.country}-${c.code}`}
                                        type="button"
                                        onClick={() => { setDialCode(c.code); setDropdownOpen(false); setSearch("") }}
                                        className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-sm hover:bg-gray-800 transition-colors ${dialCode === c.code && c.name === countryCodes.find(x => x.code === dialCode)?.name ? "text-emerald-400" : "text-gray-300"}`}
                                      >
                                        <span>{c.name}</span>
                                        <span className="text-gray-500 ml-2 font-mono">{c.code}</span>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Phone input */}
                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="XXXXX XXXXX"
                          className="flex-1 px-4 py-3.5 rounded-xl bg-gray-800/80 border border-gray-700/60 text-white text-base placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        Something went wrong. Email us at contact@edastra.in
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-base font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 mt-2"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </span>
                      ) : "Book Consultation"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
