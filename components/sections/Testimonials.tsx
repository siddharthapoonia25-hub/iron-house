'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Ananya Singh',
    duration: 'Member for 2 years',
    quote: 'I came for the design, stayed for the trainers. Aman changed how I think about strength.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    name: 'Vikram Mehta',
    duration: 'Member for 3 years',
    quote: "Best decision I made post-COVID. The community here is unreal.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    name: 'Fatima Khan',
    duration: 'Member for 1 year',
    quote: "Pre-natal yoga with Sanya saved my back. Coming back for postnatal next month.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
  },
]

// ---------------------------------------------------------------------------
// Testimonial Card
// ---------------------------------------------------------------------------

function TestimonialCard({ t, index, inView }: { t: typeof TESTIMONIALS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="flex flex-col gap-7 bg-cream/6 border border-cream/10 rounded-2xl p-8"
    >
      {/* Opening mark */}
      <span className="font-display text-5xl text-cream/20 leading-none select-none">&ldquo;</span>

      {/* Quote */}
      <p
        className="font-display italic text-cream/90 leading-snug flex-1"
        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)' }}
      >
        {t.quote}
      </p>

      {/* Member */}
      <div className="flex items-center gap-3 pt-4 border-t border-cream/10">
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-cream/20">
          <Image
            src={t.image}
            alt={t.name}
            fill
            sizes="44px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-body font-semibold text-cream text-sm leading-tight">{t.name}</p>
          <p className="font-mono text-[0.6rem] text-cream/40 tracking-wider uppercase mt-0.5">
            {t.duration}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Section — forest green background for contrast
// ---------------------------------------------------------------------------

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section className="bg-forest py-24">
      <div className="max-w-6xl mx-auto px-8 xl:px-14">

        {/* Heading */}
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[0.65rem] text-cream/35 tracking-[0.22em] uppercase mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-display font-light text-cream leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            What members say.
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
