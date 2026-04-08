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
  const [step, setStep] = useState<1 | 2>(1)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [dialCode, setDialCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [search, setSearch] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [confirmData, setConfirmData] = useState<{ date: string; time: string } | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const timeSlots = ["9:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]
  const formatTime = (t: string) => {
    const [h] = t.split(":").map(Number)
    return h >= 12 ? `${h === 12 ? 12 : h - 12}:00 PM` : `${h}:00 AM`
  }

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

  // Step 1: Save user details
  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const apiUrl = "https://apiweb.edastra.in"
      const res = await fetch(`${apiUrl}/api/book-consultation/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: `${dialCode} ${phone}`, email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setBookingId(data.data.bookingId)
        setStep(2)
        setStatus("idle")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  // Step 2: Confirm with date & time
  const handleStep2 = async () => {
    if (!selectedDate || !selectedTime || !bookingId) return
    setStatus("loading")
    try {
      const apiUrl = "https://apiweb.edastra.in"
      const res = await fetch(`${apiUrl}/api/book-consultation/${bookingId}/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          timezone: "Asia/Kolkata",
          duration: 30,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setConfirmData({ date: selectedDate, time: selectedTime })
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const handleClose = () => {
    setStatus("idle")
    setStep(1)
    setBookingId(null)
    setName("")
    setPhone("")
    setEmail("")
    setSelectedDate("")
    setSelectedTime("")
    setConfirmData(null)
    setDropdownOpen(false)
    setSearch("")
    onClose()
  }

  // Generate next 30 days for date picker
  const getAvailableDates = () => {
    const dates: { value: string; label: string }[] = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      if (d.getDay() === 0) continue // skip Sundays
      dates.push({
        value: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
      })
    }
    return dates
  }

  const inputClass =
    "w-full px-5 py-4 rounded-xl bg-gray-800/80 border border-gray-700/60 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"

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
              className="relative w-full max-w-xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl shadow-black/50"
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-gray-800/60 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Book a Free Consultation</h2>
                  <p className="text-base text-gray-400 mt-2">We&apos;ll reach out within 24 hours</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-colors ml-4 flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-8 py-8">
                {status === "success" && confirmData ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-14 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                      <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Consultation Booked!</h3>
                    <p className="text-lg text-gray-400 mb-2">
                      {new Date(confirmData.date).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })} at {formatTime(confirmData.time)}
                    </p>
                    <p className="text-base text-gray-500 mb-8">Check your email for the calendar invite.</p>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-base"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <form onSubmit={handleStep1} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-base text-gray-400 mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-base text-gray-400 mb-2">Mobile Number *</label>
                      <div className="flex gap-3">
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => { setDropdownOpen(!dropdownOpen); setSearch("") }}
                            className="h-full px-4 py-4 rounded-xl bg-gray-800/80 border border-gray-700/60 text-white text-base flex items-center gap-2 hover:border-emerald-500/40 transition-all whitespace-nowrap focus:outline-none focus:border-emerald-500/60"
                          >
                            <span className="font-medium text-base">{dialCode}</span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                className="absolute top-full left-0 mt-1 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-[80] overflow-hidden"
                              >
                                <div className="p-3 border-b border-gray-800">
                                  <input
                                    autoFocus
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search country..."
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-base placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                                  />
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                  {filtered.length === 0 ? (
                                    <div className="px-4 py-3 text-base text-gray-500">No results</div>
                                  ) : (
                                    filtered.map((c) => (
                                      <button
                                        key={`${c.country}-${c.code}`}
                                        type="button"
                                        onClick={() => { setDialCode(c.code); setDropdownOpen(false); setSearch("") }}
                                        className={`w-full text-left px-4 py-3 flex items-center justify-between text-base hover:bg-gray-800 transition-colors ${dialCode === c.code && c.name === countryCodes.find(x => x.code === dialCode)?.name ? "text-emerald-400" : "text-gray-300"}`}
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

                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="XXXXX XXXXX"
                          className="flex-1 px-5 py-4 rounded-xl bg-gray-800/80 border border-gray-700/60 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-base text-gray-400 mb-2">Email Address *</label>
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
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-base">
                        Something went wrong. Email us at contact@edastra.in
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 mt-3"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Saving...
                        </span>
                      ) : "Next — Pick a Time"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-base text-gray-400 mb-2">Select a Date *</label>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                        {getAvailableDates().map((d) => (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => setSelectedDate(d.value)}
                            className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${selectedDate === d.value
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/25"
                              : "border-gray-700/60 text-gray-400 hover:border-emerald-500/50 hover:text-white bg-gray-800/50"
                              }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedDate && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-base text-gray-400 mb-2">Select a Time *</label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTime(t)}
                              className={`py-3 rounded-xl text-sm font-medium border transition-all ${selectedTime === t
                                ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/25"
                                : "border-gray-700/60 text-gray-400 hover:border-emerald-500/50 hover:text-white bg-gray-800/50"
                                }`}
                            >
                              {formatTime(t)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-base">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <div className="flex gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => { setStep(1); setStatus("idle") }}
                        className="px-6 py-4 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleStep2}
                        disabled={!selectedDate || !selectedTime || status === "loading"}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
                      >
                        {status === "loading" ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Booking...
                          </span>
                        ) : "Confirm Booking"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
