'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ---------------------------------------------------------------------------
// Floating input (text / email)
// ---------------------------------------------------------------------------

interface FloatingInputProps {
  label: string
  type?: 'text' | 'email'
  name: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}

function FloatingInput({ label, type = 'text', name, value, onChange, required }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const floating = focused || value.length > 0

  return (
    <div className="relative">
      <label
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          floating
            ? 'top-0 text-[10px] tracking-wider text-sage'
            : 'top-[1.15rem] text-sm text-charcoal/45'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        autoComplete={type === 'email' ? 'email' : 'off'}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pt-5 pb-1.5 bg-transparent border-b text-sm font-body text-charcoal outline-none transition-colors duration-200 ${
          focused ? 'border-terracotta' : 'border-sage/50'
        }`}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Phone input — always-floated label, +91 prefix
// ---------------------------------------------------------------------------

interface PhoneInputProps {
  value: string
  onChange: (v: string) => void
}

function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
      <label className="absolute left-0 top-0 text-[10px] tracking-wider text-sage pointer-events-none">
        Phone
      </label>
      <div
        className={`flex items-end pt-5 pb-1.5 gap-1.5 border-b transition-colors duration-200 ${
          focused ? 'border-terracotta' : 'border-sage/50'
        }`}
      >
        <span className="text-sm text-charcoal/45 shrink-0 leading-none pb-0.5">+91</span>
        <input
          type="tel"
          name="phone"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="—"
          className="flex-1 bg-transparent outline-none text-sm font-body text-charcoal placeholder:text-charcoal/20"
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Floating select
// ---------------------------------------------------------------------------

interface SelectOption { value: string; label: string }

interface FloatingSelectProps {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  options: SelectOption[]
  required?: boolean
}

function FloatingSelect({ label, name, value, onChange, options, required }: FloatingSelectProps) {
  const [focused, setFocused] = useState(false)
  const floating = focused || value !== ''

  return (
    <div className="relative">
      <label
        className={`absolute left-0 z-10 pointer-events-none transition-all duration-200 ${
          floating
            ? 'top-0 text-[10px] tracking-wider text-sage'
            : 'top-[1.15rem] text-sm text-charcoal/45'
        }`}
      >
        {label}
      </label>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pt-5 pb-1.5 pr-6 bg-transparent border-b text-sm font-body text-charcoal outline-none appearance-none cursor-pointer transition-colors duration-200 ${
          focused ? 'border-terracotta' : 'border-sage/50'
        }`}
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        strokeWidth={1.5}
        className="absolute right-0 bottom-2 text-charcoal/35 pointer-events-none"
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Form data & options
// ---------------------------------------------------------------------------

const CLASS_OPTIONS: SelectOption[] = [
  { value: 'strength', label: 'Strength Training' },
  { value: 'boxing',   label: 'Boxing' },
  { value: 'yoga',     label: 'Yoga & Pilates' },
  { value: 'hiit',     label: 'HIIT' },
  { value: 'mixed',    label: 'Mixed / Not Sure' },
]

const TIME_OPTIONS: SelectOption[] = [
  { value: 'morning', label: 'Morning — 6 to 9 AM' },
  { value: 'evening', label: 'Evening — 5 to 8 PM' },
  { value: 'weekend', label: 'Weekend' },
]

const EMPTY_FORM = { name: '', phone: '', email: '', classType: '', time: '' }

// ---------------------------------------------------------------------------
// Trial Form section
// ---------------------------------------------------------------------------

export default function TrialForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  const set = (field: keyof typeof EMPTY_FORM) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitted')
    setTimeout(() => {
      setStatus('idle')
      setForm(EMPTY_FORM)
    }, 4000)
  }

  return (
    <section id="trial" className="bg-offwhite py-24 lg:py-32 border-t border-sage/20">
      <div className="max-w-2xl mx-auto px-8 xl:px-0">

        {/* Heading */}
        <div className="mb-14">
          <p className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-5">
            Free Trial
          </p>
          <h2
            className="font-display font-light text-forest leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Walk in. Try us.<br />No commitment.
          </h2>
          <p className="font-display italic text-charcoal/45 text-xl mt-4">
            One free trial class. On us.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">

            <FloatingInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={set('name')}
              required
            />

            <PhoneInput
              value={form.phone}
              onChange={set('phone')}
            />

            <FloatingInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={set('email')}
              required
            />

            <FloatingSelect
              label="Preferred Class"
              name="classType"
              value={form.classType}
              onChange={set('classType')}
              options={CLASS_OPTIONS}
              required
            />

            <div className="sm:col-span-2">
              <FloatingSelect
                label="Best Time"
                name="time"
                value={form.time}
                onChange={set('time')}
                options={TIME_OPTIONS}
                required
              />
            </div>

          </div>

          {/* Submit */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <motion.button
              layout
              type="submit"
              disabled={status === 'submitted'}
              className={`w-full sm:w-auto sm:min-w-[260px] px-10 py-4 rounded-full text-cream text-sm font-body font-semibold tracking-wide transition-colors duration-300 ${
                status === 'submitted' ? 'bg-forest' : 'bg-terracotta hover:bg-terracotta/88'
              }`}
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {status === 'submitted' ? '✓  Trial Booked' : 'Claim My Free Trial →'}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {status === 'submitted' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-forest/70 text-sm font-body text-center"
                >
                  We&apos;ll WhatsApp you within 1 hour.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>

      </div>
    </section>
  )
}
