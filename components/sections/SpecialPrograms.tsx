'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Program {
  title: string
  duration: string
  price: string
  description: string
  trainer: string
  tag: string
}

const PROGRAMS: Program[] = [
  {
    title: '12-Week Powerlifting',
    duration: '12 weeks',
    price: '₹18,000',
    description:
      'A structured block for intermediate to advanced lifters. Covers squat, bench, and deadlift progressions with weekly check-ins, form reviews, and 1-on-1 coaching.',
    trainer: 'Rohit Sharma',
    tag: 'Strength',
  },
  {
    title: 'Boxing Bootcamp',
    duration: '4 weeks',
    price: '₹8,000',
    description:
      'Intensive four-week boxing fundamentals: footwork, combination drills, conditioning rounds, and light controlled sparring. All fitness levels welcome.',
    trainer: 'Aman Kapoor',
    tag: 'Boxing',
  },
  {
    title: 'Marathon Prep',
    duration: '8 months',
    price: '₹15,000',
    description:
      'End-to-end race preparation combining structured running, strength-for-runners, and mobility. Covers 10K through full marathon distances.',
    trainer: 'Multiple Trainers',
    tag: 'Conditioning',
  },
  {
    title: 'Pre / Post Natal Yoga',
    duration: 'Ongoing',
    price: '₹4,000 / mo',
    description:
      'Safe, supportive yoga tailored across all trimesters and postpartum recovery. Small batches, expert guidance, and a strong community.',
    trainer: 'Sanya Kapoor',
    tag: 'Yoga',
  },
]

// ---------------------------------------------------------------------------
// Program Card
// ---------------------------------------------------------------------------

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % 2) * 0.12,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-offwhite border border-sage/30 rounded-xl p-8 flex flex-col gap-5 cursor-default transition-[border-color] duration-300 hover:border-terracotta/50 hover:shadow-[0_8px_32px_rgba(194,86,58,0.08)]"
    >
      {/* Tag + Duration row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.62rem] text-sage tracking-[0.2em] uppercase">
          {program.tag}
        </span>
        <span className="font-mono text-[0.62rem] text-charcoal/35 tracking-wider">
          {program.duration}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display italic font-light text-forest leading-[1.05]"
        style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}
      >
        {program.title}
      </h3>

      {/* Description */}
      <p className="font-body text-charcoal/55 text-sm leading-relaxed flex-1">
        {program.description}
      </p>

      {/* Trainer */}
      <p className="font-mono text-[0.62rem] text-charcoal/35 tracking-wide">
        with {program.trainer}
      </p>

      {/* Footer: price + CTA */}
      <div className="flex items-end justify-between pt-3 border-t border-sage/20 group-hover:border-terracotta/15 transition-colors duration-300">
        <span
          className="font-display font-light text-forest"
          style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}
        >
          {program.price}
        </span>
        <a
          href="#trial"
          className="font-body text-xs font-semibold text-terracotta hover:text-forest transition-colors duration-200 tracking-wide flex items-center gap-1 group/link"
        >
          Reserve Spot
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function SpecialPrograms() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <section id="pricing" className="bg-cream py-24 border-t border-sage/20">
      <div className="max-w-6xl mx-auto px-8 xl:px-14">

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-3"
          >
            Special Programs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-display font-light text-forest leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Beyond the regular schedule.
          </motion.h2>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.title} program={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
