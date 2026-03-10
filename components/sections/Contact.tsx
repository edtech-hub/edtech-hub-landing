"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// ─── Calendar ────────────────────────────────────────────────────────────────
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun…6=Sat → convert to Mon-based (0=Mon…6=Sun)
  const d = new Date(year, month, 1).getDay()
  return (d + 6) % 7
}

function MiniCalendar({ selected, onSelect }: { selected: string | null; onSelect: (d: string) => void }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  // pad to full rows
  while (cells.length % 7 !== 0) cells.push(null)

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  const isPast = (d: number) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const key = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <span className="text-sm font-semibold text-white tracking-wide">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-500 tracking-wider py-1">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />
          const k = key(d)
          const past = isPast(d)
          const isSelected = selected === k
          const isTod = isToday(d)
          return (
            <button
              key={k}
              disabled={past}
              onClick={() => onSelect(k)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-150
                ${past ? "text-gray-700 cursor-not-allowed" : "cursor-pointer"}
                ${isSelected ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : ""}
                ${isTod && !isSelected ? "text-emerald-400 border border-emerald-500/40" : ""}
                ${!isSelected && !past ? "text-gray-300 hover:bg-white/8 hover:text-white" : ""}
              `}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Time slots ───────────────────────────────────────────────────────────────
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

// ─── Form ─────────────────────────────────────────────────────────────────────
const lookingFor = ["Web Application", "Mobile App", "Custom Software", "Product Engineering", "API / Backend", "Other"]

interface FormData {
  fullName: string
  company: string
  email: string
  phone: string
  lookingFor: string
  message: string
}

export default function Contact() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "booked">("idle")

  const [form, setForm] = useState<FormData>({ fullName: "", company: "", email: "", phone: "", lookingFor: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBook = () => {
    if (selectedDate && selectedTime) setBookingStatus("booked")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus("success"); setForm({ fullName: "", company: "", email: "", phone: "", lookingFor: "", message: "" }) }
      else setStatus("error")
    } catch { setStatus("error") }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"

  return (
    <section className="py-24 bg-[#070b12]" id="contact">
      <div className="w-full" style={{ padding: "0 clamp(24px,5vw,72px)" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Let&apos;s Talk About Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Next Big Move.
            </span>
          </h2>
        </motion.div>

        {/* Two-column panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Schedule a Call */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="rounded-2xl bg-gray-900/60 border border-gray-800/60 p-8"
          >
            <h3 className="text-xl font-bold text-white mb-1">Schedule Your Discovery Call</h3>
            <p className="text-sm text-gray-400 mb-7">Pick a day and time that works for you and we&apos;ll connect.</p>

            {bookingStatus === "booked" ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <p className="text-white font-semibold text-lg">Call Scheduled!</p>
                <p className="text-gray-400 text-sm text-center">{selectedDate} at {selectedTime}<br />We&apos;ll send a confirmation to your email.</p>
                <button onClick={() => { setBookingStatus("idle"); setSelectedDate(null); setSelectedTime(null) }} className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
                  Choose a different time
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Select a Day</p>
                  <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />
                </div>

                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Select a Time</p>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 rounded-lg text-xs font-medium border transition-all duration-150
                            ${selectedTime === t
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                              : "border-gray-700/60 text-gray-400 hover:border-emerald-500/40 hover:text-white bg-gray-800/40"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={handleBook}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
                >
                  {selectedDate && selectedTime ? `Book — ${selectedDate} at ${selectedTime}` : "Confirm Booking"}
                </button>
              </>
            )}
          </motion.div>

          {/* Right — Request A Quote */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="rounded-2xl bg-gray-900/60 border border-gray-800/60 p-8"
          >
            <h3 className="text-xl font-bold text-white mb-1">Request A Quote</h3>
            <p className="text-sm text-gray-400 mb-7">Tell us about your project and we&apos;ll get back within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} />
              <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className={inputClass} />
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className={inputClass} />
              <select name="lookingFor" value={form.lookingFor} onChange={handleChange} className={inputClass}>
                <option value="">I&apos;m Looking For...</option>
                {lookingFor.map(o => <option key={o}>{o}</option>)}
              </select>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className={inputClass}
              />

              {status === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm">
                  ✓ Quote request sent! We&apos;ll respond within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                  Something went wrong. Email us at contact@edastra.in
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>

              <p className="text-center text-xs text-gray-600 mt-1">Secured by Ed-Astra</p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
