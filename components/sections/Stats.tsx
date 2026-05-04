'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Counter hook — eases out from 0 to target over `duration` seconds
// ---------------------------------------------------------------------------

function useCountUp(target: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>(0)
  const startTs = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return

    startTs.current = null

    const tick = (ts: number) => {
      if (!startTs.current) startTs.current = ts
      const elapsed = (ts - startTs.current) / 1000
      const t = Math.min(elapsed / duration, 1)
      // ease-out quart
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(eased * target))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, target, duration])

  return value
}

// ---------------------------------------------------------------------------
// Individual stat card
// ---------------------------------------------------------------------------

const STAGGER = 0.12

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * STAGGER, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface StatProps {
  value: number
  suffix: string
  label: string
  index: number
  inView: boolean
}

function StatCard({ value, suffix, label, index, inView }: StatProps) {
  const count = useCountUp(value, 2.4, inView)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex flex-col gap-3 text-center md:text-left"
    >
      <div
        className="font-display font-light text-forest leading-none tabular-nums"
        style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-mono text-[0.68rem] text-sage tracking-[0.18em] uppercase">
        {label}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Stats section
// ---------------------------------------------------------------------------

const STATS = [
  { value: 2400, suffix: '+', label: 'Active Members' },
  { value: 35,   suffix: '',  label: 'Classes Per Week' },
  { value: 18,   suffix: '',  label: 'Expert Trainers' },
  { value: 5,    suffix: '',  label: 'Years Strong' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8%' })

  return (
    <section ref={sectionRef} className="bg-cream py-24 lg:py-32 border-t border-sage/20">
      <div className="max-w-6xl mx-auto px-8 xl:px-14">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-14"
        >
          Iron House by the numbers
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
