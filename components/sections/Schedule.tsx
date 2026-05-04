'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

interface ClassItem {
  time: string
  name: string
  trainer: string
  type: string
  spots: number
}

interface DayRow {
  day: string
  fullDay: string
  classes: ClassItem[]
}

const TIME_SLOTS = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '5 PM', '6 PM', '7 PM', '8 PM']

const SCHEDULE: DayRow[] = [
  { day: 'Mon', fullDay: 'Monday', classes: [
    { time: '6 AM',  name: 'Yoga Flow',    trainer: 'Priya Nair',    type: 'yoga',     spots: 8  },
    { time: '7 AM',  name: 'Boxing',        trainer: 'Aman Kapoor',   type: 'boxing',   spots: 5  },
    { time: '5 PM',  name: 'Strength 101',  trainer: 'Rohit Sharma',  type: 'strength', spots: 10 },
    { time: '6 PM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 6  },
    { time: '7 PM',  name: 'Pilates',       trainer: 'Sanya Kapoor',  type: 'yoga',     spots: 12 },
    { time: '8 PM',  name: 'Zumba',         trainer: "Maria D'Souza", type: 'zumba',    spots: 15 },
  ]},
  { day: 'Tue', fullDay: 'Tuesday', classes: [
    { time: '7 AM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 10 },
    { time: '8 AM',  name: 'Strength 101',  trainer: 'Rohit Sharma',  type: 'strength', spots: 8  },
    { time: '6 PM',  name: 'Boxing',        trainer: 'Aman Kapoor',   type: 'boxing',   spots: 4  },
    { time: '7 PM',  name: 'Yoga Flow',     trainer: 'Priya Nair',    type: 'yoga',     spots: 14 },
    { time: '8 PM',  name: 'Zumba',         trainer: "Maria D'Souza", type: 'zumba',    spots: 12 },
  ]},
  { day: 'Wed', fullDay: 'Wednesday', classes: [
    { time: '6 AM',  name: 'Pilates',       trainer: 'Sanya Kapoor',  type: 'yoga',     spots: 10 },
    { time: '7 AM',  name: 'Strength 101',  trainer: 'Rohit Sharma',  type: 'strength', spots: 6  },
    { time: '5 PM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 8  },
    { time: '6 PM',  name: 'Boxing',        trainer: "Maria D'Souza", type: 'boxing',   spots: 7  },
    { time: '7 PM',  name: 'Yoga Flow',     trainer: 'Priya Nair',    type: 'yoga',     spots: 16 },
  ]},
  { day: 'Thu', fullDay: 'Thursday', classes: [
    { time: '7 AM',  name: 'Boxing',        trainer: 'Aman Kapoor',   type: 'boxing',   spots: 5  },
    { time: '8 AM',  name: 'Yoga Flow',     trainer: 'Priya Nair',    type: 'yoga',     spots: 12 },
    { time: '5 PM',  name: 'Strength 101',  trainer: 'Rohit Sharma',  type: 'strength', spots: 4  },
    { time: '6 PM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 9  },
    { time: '7 PM',  name: 'Pilates',       trainer: 'Sanya Kapoor',  type: 'yoga',     spots: 11 },
    { time: '8 PM',  name: 'Zumba',         trainer: "Maria D'Souza", type: 'zumba',    spots: 14 },
  ]},
  { day: 'Fri', fullDay: 'Friday', classes: [
    { time: '6 AM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 7  },
    { time: '7 AM',  name: 'Strength 101',  trainer: 'Aman Kapoor',   type: 'strength', spots: 9  },
    { time: '5 PM',  name: 'Boxing',        trainer: 'Aman Kapoor',   type: 'boxing',   spots: 3  },
    { time: '6 PM',  name: 'Yoga Flow',     trainer: 'Priya Nair',    type: 'yoga',     spots: 10 },
    { time: '7 PM',  name: 'Zumba',         trainer: "Maria D'Souza", type: 'zumba',    spots: 18 },
  ]},
  { day: 'Sat', fullDay: 'Saturday', classes: [
    { time: '7 AM',  name: 'Strength 101',  trainer: 'Rohit Sharma',  type: 'strength', spots: 12 },
    { time: '8 AM',  name: 'Boxing',        trainer: 'Aman Kapoor',   type: 'boxing',   spots: 8  },
    { time: '9 AM',  name: 'Yoga Flow',     trainer: 'Priya Nair',    type: 'yoga',     spots: 15 },
    { time: '10 AM', name: 'Pilates',       trainer: 'Sanya Kapoor',  type: 'yoga',     spots: 12 },
    { time: '5 PM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 6  },
    { time: '6 PM',  name: 'Zumba',         trainer: "Maria D'Souza", type: 'zumba',    spots: 20 },
  ]},
  { day: 'Sun', fullDay: 'Sunday', classes: [
    { time: '8 AM',  name: 'Yoga Flow',     trainer: 'Priya Nair',    type: 'yoga',     spots: 20 },
    { time: '9 AM',  name: 'Pilates',       trainer: 'Sanya Kapoor',  type: 'yoga',     spots: 16 },
    { time: '10 AM', name: 'Boxing',        trainer: 'Aman Kapoor',   type: 'boxing',   spots: 10 },
    { time: '6 PM',  name: 'HIIT Burn',     trainer: 'Neha Patel',    type: 'hiit',     spots: 8  },
    { time: '7 PM',  name: 'Strength 101',  trainer: 'Rohit Sharma',  type: 'strength', spots: 7  },
  ]},
]

// ---------------------------------------------------------------------------
// Type appearance map
// ---------------------------------------------------------------------------

const TYPE_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  strength: { bg: 'bg-terracotta/10',  border: 'border-terracotta/20', text: 'text-terracotta'  },
  boxing:   { bg: 'bg-red-900/8',      border: 'border-red-800/20',    text: 'text-red-800'     },
  yoga:     { bg: 'bg-sage/12',        border: 'border-sage/25',       text: 'text-forest'      },
  hiit:     { bg: 'bg-butter/20',      border: 'border-butter/30',     text: 'text-charcoal'    },
  zumba:    { bg: 'bg-pink-50',        border: 'border-pink-200',      text: 'text-pink-700'    },
}

const FILTERS = ['All', 'Strength', 'Boxing', 'Yoga & Pilates', 'HIIT', 'Zumba']
const FILTER_MAP: Record<string, string> = {
  Strength: 'strength', Boxing: 'boxing', 'Yoga & Pilates': 'yoga', HIIT: 'hiit', Zumba: 'zumba',
}

// ---------------------------------------------------------------------------
// Reservation Modal
// ---------------------------------------------------------------------------

interface ModalClass extends ClassItem { day: string; fullDay: string }

function ModalInput({
  label, type = 'text', value, onChange, as,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  as?: 'textarea'
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] font-mono text-sage tracking-wider uppercase mb-1.5">{label}</label>
      {as === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="w-full bg-transparent border-b border-sage/40 focus:border-terracotta outline-none text-sm font-body text-charcoal resize-none transition-colors duration-200 pb-1"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b border-sage/40 focus:border-terracotta outline-none text-sm font-body text-charcoal transition-colors duration-200 pb-1"
        />
      )}
    </div>
  )
}

function ReservationModal({ cls, onClose }: { cls: ModalClass; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', notes: '' })
  const [booked, setBooked] = useState(false)
  const s = TYPE_STYLES[cls.type] ?? TYPE_STYLES.strength

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBooked(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-charcoal/55 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-10 bg-cream rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className={`px-7 pt-7 pb-6 ${s.bg}`}>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 text-charcoal/35 hover:text-charcoal transition-colors rounded-full hover:bg-charcoal/8"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {/* Trainer photo placeholder */}
          <div className={`w-11 h-11 rounded-full border ${s.border} flex items-center justify-center mb-5`}>
            <span className={`text-sm font-body font-bold ${s.text}`}>
              {cls.trainer.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>

          <div className={`text-[10px] font-mono tracking-[0.18em] uppercase mb-1.5 ${s.text}`}>
            {cls.type}
          </div>
          <h3 className="font-display text-[1.6rem] text-forest font-light leading-tight">{cls.name}</h3>
          <p className="text-charcoal/55 text-sm font-body mt-1.5">
            {cls.fullDay} · {cls.time} · with {cls.trainer}
          </p>
          <p className={`text-xs font-mono mt-2.5 ${cls.spots <= 5 ? 'text-terracotta font-semibold' : 'text-charcoal/40'}`}>
            {cls.spots} {cls.spots === 1 ? 'spot' : 'spots'} remaining
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          <AnimatePresence mode="wait">
            {booked ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="text-3xl mb-3">✓</div>
                <p className="font-display text-forest text-xl font-light">Spot Reserved!</p>
                <p className="text-charcoal/50 text-sm mt-1.5 font-body">
                  We&apos;ll confirm your booking via WhatsApp.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <ModalInput label="Your Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
                <ModalInput label="Phone" type="tel" value={form.phone} onChange={(v) => setForm((p) => ({ ...p, phone: v }))} />
                <ModalInput label="Notes (optional)" value={form.notes} onChange={(v) => setForm((p) => ({ ...p, notes: v }))} as="textarea" />
                <button
                  type="submit"
                  className="w-full bg-terracotta text-cream py-3.5 rounded-full text-sm font-body font-semibold hover:bg-terracotta/88 transition-colors mt-2"
                >
                  Reserve My Spot
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Class Cell
// ---------------------------------------------------------------------------

function ClassCell({
  cls, dim, onSelect,
}: {
  cls: ClassItem
  day: string
  fullDay: string
  dim: boolean
  onSelect: () => void
}) {
  const s = TYPE_STYLES[cls.type] ?? TYPE_STYLES.strength

  return (
    <motion.button
      onClick={onSelect}
      data-hover="Reserve"
      whileHover={{ y: -3, boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`h-full min-h-[76px] w-full rounded-lg border p-2.5 text-left transition-opacity duration-300 ${s.bg} ${s.border} ${dim ? 'opacity-20 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
    >
      <div className={`text-[9px] font-mono tracking-wider uppercase ${s.text} opacity-70`}>{cls.time}</div>
      <div className={`text-[11px] font-body font-semibold leading-tight mt-0.5 ${s.text}`}>{cls.name}</div>
      <div className="text-[9px] text-charcoal/40 mt-1 truncate font-body">{cls.trainer}</div>
      {cls.spots <= 5 && (
        <div className="text-[8px] font-mono text-terracotta mt-0.5">{cls.spots} left</div>
      )}
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// Schedule Section
// ---------------------------------------------------------------------------

export default function Schedule() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedClass, setSelectedClass] = useState<ModalClass | null>(null)

  const activeType = FILTER_MAP[activeFilter] ?? null

  return (
    <section id="classes" className="bg-cream py-24 border-t border-sage/20">
      <div className="max-w-7xl mx-auto px-8 xl:px-14">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-10">
          <div>
            <p className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-3">
              Weekly Schedule
            </p>
            <h2
              className="font-display font-light text-forest leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              What&apos;s on this week.
            </h2>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wide border transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-transparent text-charcoal/55 border-sage/30 hover:border-forest/50 hover:text-forest'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid — horizontally scrollable */}
        <div className="overflow-x-auto -mx-8 xl:-mx-14 px-8 xl:px-14">
          <div style={{ minWidth: '860px' }}>

            {/* Time slot header */}
            <div
              className="grid mb-2"
              style={{ gridTemplateColumns: `72px repeat(${TIME_SLOTS.length}, 1fr)`, gap: '4px' }}
            >
              <div />
              {TIME_SLOTS.map((slot) => (
                <div key={slot} className="text-center text-[10px] font-mono text-sage/50 tracking-wider py-1">
                  {slot}
                </div>
              ))}
            </div>

            {/* Day rows */}
            {SCHEDULE.map(({ day, fullDay, classes }) => (
              <div
                key={day}
                className="grid mb-1.5"
                style={{ gridTemplateColumns: `72px repeat(${TIME_SLOTS.length}, 1fr)`, gap: '4px' }}
              >
                {/* Day label */}
                <div className="flex items-center justify-end pr-3">
                  <span className="text-xs font-mono text-charcoal/40 tracking-widest uppercase">{day}</span>
                </div>

                {/* Cells */}
                {TIME_SLOTS.map((slot) => {
                  const cls = classes.find((c) => c.time === slot)
                  if (!cls) return <div key={slot} className="min-h-[76px] rounded-lg bg-sage/4 border border-sage/10" />
                  const dim = activeType !== null && cls.type !== activeType
                  return (
                    <ClassCell
                      key={slot}
                      cls={cls}
                      day={day}
                      fullDay={fullDay}
                      dim={dim}
                      onSelect={() => setSelectedClass({ ...cls, day, fullDay })}
                    />
                  )
                })}
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {selectedClass && (
          <ReservationModal
            key="modal"
            cls={selectedClass}
            onClose={() => setSelectedClass(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
