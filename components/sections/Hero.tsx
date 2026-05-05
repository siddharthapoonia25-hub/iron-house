'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Image from 'next/image'

const GymScene = dynamic(() => import('@/components/3d/GymScene'), { ssr: false })

const HEADLINE = "This isn't a gym. It's where you become someone."
const WORDS = HEADLINE.split(' ')

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.45 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 28, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

function HeadlineReveal() {
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-display font-light text-forest leading-[0.95] tracking-tight"
      style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5rem)' }}
    >
      {WORDS.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={`inline-block ${word === 'become' ? 'italic text-terracotta' : ''}`}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: '#f5ede0' }}>

      {/*
        Scene wrapper — right side, vertically centered.
        Width: 800px, Height: 700px — tall enough for mat + all equipment.
      */}
      <div
        style={{
          position: 'absolute',
          right: '-60px',
          top: '45%',
          transform: 'translateY(-50%)',
          width: 1050,
          height: 700,
          zIndex: 2,
        }}
      >
        {/* Gym mat — centered horizontally, vertically centered in wrapper */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(calc(-50% + 30px), -40%)',
            width: 950,
            zIndex: 1,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.18))',
          }}
        >
          <Image
            src="/equipment/gym-floor.png"
            alt="gym mat"
            width={950}
            height={475}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>

        {/* Equipment — fills full wrapper */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <GymScene />
        </div>
      </div>

      {/* Text — left side, vertically centered */}
      <div
        style={{
          position: 'absolute',
          left: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: 500,
          zIndex: 10,
        }}
      >
        <div className="flex flex-col gap-6">

          <motion.p
            className="font-accent text-sage text-sm tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            Mumbai&apos;s Boutique Gym
          </motion.p>

          <HeadlineReveal />

          <motion.p
            className="font-display italic text-charcoal/55 text-xl leading-relaxed max-w-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.7, ease: 'easeOut' }}
          >
            Iron House — Bandra West. Built for serious training,
            designed for serious living.
          </motion.p>

          <motion.div
            className="flex items-center gap-8 mt-1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.7, ease: 'easeOut' }}
          >
            <button
              data-hover="Click"
              className="bg-terracotta text-cream px-8 py-3.5 rounded-full text-sm font-body font-semibold hover:bg-terracotta/88 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-sm"
            >
              Book Free Trial
            </button>
            <a
              href="#classes"
              data-hover="Open"
              className="text-charcoal font-body text-sm font-medium hover:text-terracotta transition-colors duration-200 flex items-center gap-1 group"
            >
              Explore Classes
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          <motion.p
            className="text-charcoal/30 text-xs font-body tracking-widest mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1.2 }}
          >
            Hover over the equipment ↗
          </motion.p>

        </div>
      </div>

    </section>
  )
}
