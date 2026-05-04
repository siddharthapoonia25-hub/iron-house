'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Trainer {
  name: string
  specialty: string
  quote: string
  years: number
  image: string
}

const TRAINERS: Trainer[] = [
  {
    name: 'Aman Kapoor',
    specialty: 'Strength Coach',
    quote: 'Form first. Always.',
    years: 8,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
  },
  {
    name: 'Priya Nair',
    specialty: 'Yoga & Mobility',
    quote: 'Strength is also softness.',
    years: 12,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
  {
    name: 'Rohit Sharma',
    specialty: 'Powerlifting',
    quote: "Numbers don't lie.",
    years: 10,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
  },
  {
    name: 'Neha Patel',
    specialty: 'HIIT & Conditioning',
    quote: 'Discomfort is the point.',
    years: 6,
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
  },
  {
    name: 'Sanya Kapoor',
    specialty: 'Pilates & Pre-natal',
    quote: 'Move with intention.',
    years: 9,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
  },
  {
    name: "Maria D'Souza",
    specialty: 'Boxing & Zumba',
    quote: 'Have fun. Sweat hard.',
    years: 7,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80',
  },
]

// ---------------------------------------------------------------------------
// Trainer Card
// ---------------------------------------------------------------------------

function TrainerCard({ trainer, index }: { trainer: Trainer; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      data-hover="Book"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % 3) * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="group flex flex-col"
    >
      {/* Square photo */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-sage/10 mb-5">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 px-1">
        {/* Name */}
        <h3 className="font-display text-[1.35rem] font-semibold text-forest leading-tight">
          {trainer.name}
        </h3>

        {/* Specialty */}
        <p className="font-display italic text-sage text-sm">
          {trainer.specialty}
        </p>

        {/* Quote */}
        <p className="font-display italic text-charcoal/50 text-sm mt-1 leading-snug">
          &ldquo;{trainer.quote}&rdquo;
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-sage/20">
          <span className="font-mono text-[0.6rem] text-charcoal/35 tracking-wider uppercase">
            {trainer.years} yrs experience
          </span>
          <a
            href="#trial"
            className="font-body text-xs font-semibold text-terracotta hover:text-forest transition-colors duration-200 flex items-center gap-0.5 group/link"
          >
            Book Session
            <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function Trainers() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <section id="trainers" className="bg-offwhite py-24 border-t border-sage/20">
      <div className="max-w-6xl mx-auto px-8 xl:px-14">

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-3"
          >
            Our Trainers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-display font-light text-forest leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            The people who make it work.
          </motion.h2>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {TRAINERS.map((trainer, i) => (
            <TrainerCard key={trainer.name} trainer={trainer} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
