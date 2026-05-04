'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Plan {
  name: string
  price: string
  period: string
  tag: string
  highlighted: boolean
  cta: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    name: 'Drop-in',
    price: '₹500',
    period: '/ class',
    tag: 'Pay as you go',
    highlighted: false,
    cta: 'Book a class',
    features: [
      'Single class access',
      'All gym equipment',
      'Towel service included',
      'Locker for the day',
      'Guest WiFi',
    ],
  },
  {
    name: 'Studio',
    price: '₹3,499',
    period: '/ month',
    tag: 'Most popular',
    highlighted: true,
    cta: 'Join Studio',
    features: [
      'Unlimited classes',
      'All gym equipment',
      'Dedicated locker',
      'Priority class booking',
      'Access 5 AM – 11 PM',
      '1 guest pass / month',
      'Community events',
    ],
  },
  {
    name: 'Iron House Plus',
    price: '₹6,999',
    period: '/ month',
    tag: 'The full experience',
    highlighted: false,
    cta: 'Apply Now',
    features: [
      'Everything in Studio',
      '4 PT sessions / month',
      'Nutrition consultation',
      'Recovery room access',
      'Unlimited guest passes',
      'Monthly body composition',
      'Exclusive member events',
      'Early bird class booking',
      'Premium locker room',
      "Founder's card",
    ],
  },
]

// ---------------------------------------------------------------------------
// Plan Card
// ---------------------------------------------------------------------------

function PlanCard({ plan, index, inView }: { plan: Plan; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -8 }}
      className={`relative flex flex-col rounded-2xl border p-8 transition-shadow duration-300 hover:shadow-xl ${
        plan.highlighted
          ? 'border-terracotta bg-offwhite shadow-lg shadow-terracotta/10 md:scale-[1.03] lg:scale-[1.05]'
          : 'border-sage/30 bg-offwhite hover:shadow-charcoal/8'
      }`}
    >
      {/* Highlighted badge */}
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-terracotta text-cream text-[10px] font-mono font-semibold tracking-[0.18em] uppercase px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Tag */}
      <p className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-5 ${
        plan.highlighted ? 'text-terracotta' : 'text-sage/70'
      }`}>
        {plan.tag}
      </p>

      {/* Plan name */}
      <h3 className="font-display text-forest text-xl font-semibold mb-1">{plan.name}</h3>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-8">
        <span
          className="font-display font-light text-forest"
          style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)' }}
        >
          {plan.price}
        </span>
        <span className="font-mono text-xs text-charcoal/40">{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-10 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              size={13}
              strokeWidth={2.5}
              className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-terracotta' : 'text-sage'}`}
            />
            <span className="font-body text-sm text-charcoal/70 leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#trial"
        data-hover="Click"
        className={`block text-center py-3.5 rounded-full text-sm font-body font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
          plan.highlighted
            ? 'bg-terracotta text-cream hover:bg-terracotta/88 shadow-sm'
            : 'border border-forest/25 text-forest hover:border-forest hover:bg-forest/5'
        }`}
      >
        {plan.cta} →
      </a>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="pricing-plans" className="bg-cream py-24 border-t border-sage/20">
      <div className="max-w-5xl mx-auto px-8 xl:px-14">

        {/* Heading */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-3"
          >
            Membership
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-display font-light text-forest leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Simple. Honest. No commitments.
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-xs font-body text-charcoal/35 mt-10"
        >
          All memberships include access to the community. Cancel anytime.
        </motion.p>

      </div>
    </section>
  )
}
