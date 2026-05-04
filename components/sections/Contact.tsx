'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Camera } from 'lucide-react'

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function InfoRow({
  icon: Icon,
  children,
  index,
  inView,
}: {
  icon: React.ElementType
  children: React.ReactNode
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex items-start gap-3.5"
    >
      <Icon size={15} strokeWidth={1.5} className="text-sage mt-0.5 shrink-0" />
      <div className="text-sm font-body text-charcoal/65 leading-relaxed">{children}</div>
    </motion.div>
  )
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="contact" className="bg-offwhite py-24 border-t border-sage/20">
      <div className="max-w-6xl mx-auto px-8 xl:px-14">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-14"
        >
          Find Us
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            <motion.h2
              custom={0}
              variants={FADE_UP}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-display font-light text-forest leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              Come visit us.
            </motion.h2>

            <div className="flex flex-col gap-5">
              <InfoRow icon={MapPin} index={1} inView={inView}>
                Plot 14, Waterfield Road<br />
                Bandra West, Mumbai 400050
              </InfoRow>

              <InfoRow icon={Phone} index={2} inView={inView}>
                <a
                  href="tel:+912266775544"
                  className="hover:text-terracotta transition-colors duration-200"
                >
                  +91 22 6677 5544
                </a>
              </InfoRow>

              <InfoRow icon={Mail} index={3} inView={inView}>
                <a
                  href="mailto:hello@ironhouse.in"
                  className="hover:text-terracotta transition-colors duration-200"
                >
                  hello@ironhouse.in
                </a>
              </InfoRow>

              <InfoRow icon={Clock} index={4} inView={inView}>
                Mon – Sun &nbsp;·&nbsp; 5 AM – 11 PM
              </InfoRow>
            </div>

            {/* Action buttons */}
            <motion.div
              custom={5}
              variants={FADE_UP}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-3 mt-2"
            >
              <a
                href="https://wa.me/912266775544"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-body font-semibold px-5 py-2.5 rounded-full hover:bg-[#20be5c] transition-colors duration-200"
              >
                <MessageCircle size={15} strokeWidth={2} />
                WhatsApp Us
              </a>

              <a
                href="https://instagram.com/ironhouse.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-sage/40 text-charcoal/70 text-sm font-body font-medium px-5 py-2.5 rounded-full hover:border-forest hover:text-forest transition-colors duration-200"
              >
                <Camera size={15} strokeWidth={1.5} />
                @ironhouse.in
              </a>
            </motion.div>
          </div>

          {/* Right — Google Maps */}
          <motion.div
            custom={1}
            variants={FADE_UP}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative h-[380px] lg:h-full min-h-[340px] rounded-2xl overflow-hidden border border-sage/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7543.04!2d72.8281!3d19.0607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9302db32c53%3A0xd4e0286f31b2b4f!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra%20400050!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'sepia(0.22) saturate(0.88) contrast(0.92)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Iron House — Bandra West, Mumbai"
            />
            {/* Subtle cream tint overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-sage/20" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
