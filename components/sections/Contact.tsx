"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// ─── Calendar ────────────────────────────────────────────────────────────────
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
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
  while (cells.length % 7 !== 0) cells.push(null)

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const isPast = (d: number) => new Date(year, month, d) <= new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const isSunday = (d: number) => new Date(year, month, d).getDay() === 0
  const isDisabled = (d: number) => isPast(d) || isSunday(d)
  const key = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-bold text-white tracking-wide">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-500 tracking-widest py-1">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="h-8" />
          const k = key(d)
          const past = isDisabled(d)
          const isSelected = selected === k
          return (
            <button
              key={k}
              disabled={past}
              onClick={() => onSelect(k)}
              className={`
                h-8 w-full flex items-center justify-center rounded-lg text-xs font-semibold transition-all duration-150
                ${past ? "text-gray-700 cursor-not-allowed" : "cursor-pointer"}
                ${isSelected ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/40" : ""}
                ${!isSelected && !past ? "text-gray-300 hover:bg-white/10 hover:text-white" : ""}
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
  email: string
  phone: string
  lookingFor: string
  message: string
}

export default function Contact() {
  // Form state
  const [form, setForm] = useState<FormData>({ fullName: "", email: "", phone: "", lookingFor: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)

  // Calendar state
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Booking state
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "booked" | "error">("idle")
  const [meetLink, setMeetLink] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Step 1: Submit quote form → initiate lets-talk + save contact
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(false)
    setBookingStatus("loading")
    try {
      const apiUrl = "https://apiweb.edastra.in"

      // Initiate lets-talk booking with form data
      const res = await fetch(`${apiUrl}/api/lets-talk/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          projectType: form.lookingFor,
          message: form.message,
        }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setBookingId(data.data.bookingId)
        setFormSubmitted(true)
        setBookingStatus("idle")

        // Also save as contact (non-blocking)
        fetch(`${apiUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            phone: form.phone,
            projectType: form.lookingFor,
            message: form.message,
            source: "lets-talk",
          }),
        }).catch(() => { })
      } else {
        setFormError(true)
        setBookingStatus("idle")
      }
    } catch {
      setFormError(true)
      setBookingStatus("idle")
    }
  }

  // Step 2: Confirm booking with selected date + time
  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !bookingId) return
    setBookingStatus("loading")
    try {
      const apiUrl = "https://apiweb.edastra.in"
      const timeMap: Record<string, string> = {
        "9:00 AM": "09:00", "10:00 AM": "10:00", "11:00 AM": "11:00", "12:00 PM": "12:00",
        "2:00 PM": "14:00", "3:00 PM": "15:00", "4:00 PM": "16:00", "5:00 PM": "17:00",
      }
      const res = await fetch(`${apiUrl}/api/lets-talk/${bookingId}/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredDate: selectedDate,
          preferredTime: timeMap[selectedTime] || selectedTime,
          timezone: "Asia/Kolkata",
          duration: 30,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setMeetLink(data.data.meetLink || null)
        setBookingStatus("booked")
      } else {
        setBookingStatus("error")
      }
    } catch {
      setBookingStatus("error")
    }
  }

  const handleReset = () => {
    setForm({ fullName: "", email: "", phone: "", lookingFor: "", message: "" })
    setFormSubmitted(false)
    setFormError(false)
    setSelectedDate(null)
    setSelectedTime(null)
    setBookingId(null)
    setBookingStatus("idle")
    setMeetLink(null)
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg bg-[#1a1f2e] border border-gray-700/80 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 transition-all"
  const panelStyle = { background: "linear-gradient(135deg, #1c2028 0%, #252b35 60%, #2e3545 100%)", border: "1px solid rgba(255,255,255,0.12)" }

  return (
    <section className="py-20 bg-[#070b12]" id="contact">
      <div className="w-full max-w-[76rem] mx-auto" style={{ padding: "0 clamp(24px,4vw,56px)" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Let&apos;s Talk About Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Next Big Move.
            </span>
          </h2>
        </motion.div>

        {/* Success state — full width */}
        {bookingStatus === "booked" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-lg mx-auto rounded-2xl p-10"
            style={panelStyle}
          >
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-white font-semibold text-lg">Meeting Scheduled!</p>
              <p className="text-gray-400 text-sm text-center">
                {selectedDate} at {selectedTime}<br />
                Check your email for the calendar invite.
              </p>
              {meetLink && (
                <a href={meetLink} target="_blank" rel="noopener noreferrer" className="mt-2 px-5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/25 transition-colors">
                  Join Google Meet
                </a>
              )}
              <button onClick={handleReset} className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
                Book another call
              </button>
            </div>
          </motion.div>
        ) : (
          /* Two-column panels */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left — Request A Quote */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="rounded-2xl p-10"
              style={panelStyle}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-base font-bold text-white">Request A Quote</h3>
                {formSubmitted && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    DONE
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-5">
                {formSubmitted
                  ? "Details saved! Now pick a date and time on the right."
                  : "Tell us about your project, then schedule your discovery call."
                }
              </p>

              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                <input
                  required
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  disabled={formSubmitted}
                  className={`${inputClass} ${formSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  disabled={formSubmitted}
                  className={`${inputClass} ${formSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  disabled={formSubmitted}
                  className={`${inputClass} ${formSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                />
                <select
                  name="lookingFor"
                  value={form.lookingFor}
                  onChange={handleChange}
                  disabled={formSubmitted}
                  className={`${inputClass} ${formSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <option value="">I&apos;m Looking For...</option>
                  {lookingFor.map(o => <option key={o}>{o}</option>)}
                </select>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  disabled={formSubmitted}
                  className={`${inputClass} ${formSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                />

                {formError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs">
                    Something went wrong. Email us at contact@edastra.in
                  </div>
                )}

                {!formSubmitted && (
                  <button
                    type="submit"
                    disabled={bookingStatus === "loading"}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-emerald-500/20"
                  >
                    {bookingStatus === "loading" ? "Saving..." : "Next — Pick a Time"}
                  </button>
                )}

                <p className="text-center text-[10px] text-gray-600">Secured by Ed-Astra</p>
              </form>
            </motion.div>

            {/* Right — Schedule Your Discovery Call (calendar always visible) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="rounded-2xl p-10"
              style={panelStyle}
            >
              <h3 className="text-base font-bold text-white mb-0.5">Schedule Your Discovery Call</h3>
              <p className="text-xs text-gray-400 mb-5">Pick a day and time that works for you and we&apos;ll connect.</p>

              {/* Calendar */}
              <div className="mb-5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Select a Day</p>
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Select a Time</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 rounded-lg text-[11px] font-semibold border transition-all duration-150
                          ${selectedTime === t
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/25"
                            : "border-gray-700/70 text-gray-400 hover:border-emerald-500/50 hover:text-white bg-[#1a1f2e]"
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {bookingStatus === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs mb-4">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Confirm button — only enabled after form is submitted + date/time picked */}
              <button
                onClick={handleBook}
                disabled={!formSubmitted || !selectedDate || !selectedTime || bookingStatus === "loading"}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                {bookingStatus === "loading"
                  ? "Booking..."
                  : !formSubmitted
                    ? "Fill in your details first"
                    : selectedDate && selectedTime
                      ? `Confirm — ${selectedDate} at ${selectedTime}`
                      : "Select a date & time"
                }
              </button>

              {!formSubmitted && (
                <p className="text-center text-[10px] text-gray-500 mt-3">
                  Complete the form on the left to enable booking.
                </p>
              )}
            </motion.div>

          </div>
        )}
      </div>
    </section>
  )
}
