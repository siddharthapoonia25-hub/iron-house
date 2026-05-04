'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ---------------------------------------------------------------------------
// Data — explicit grid positions for 4-col desktop bento
// ---------------------------------------------------------------------------

const GALLERY = [
  { id: '1517836357463-d25dfeac3438', caption: 'Strength floor',       col: '1/3', row: '1/3' },
  { id: '1581009146145-b5ef050c2e1e', caption: 'Class in session',     col: '3/4', row: '1/3' },
  { id: '1540497077202-7c8a3999166f', caption: 'The morning crew',     col: '4/5', row: '1/2' },
  { id: '1574680096145-d05b474e2155', caption: 'Find your form',       col: '4/5', row: '2/3' },
  { id: '1527526078610-cc9b8f1dd0d1', caption: 'Forged here',          col: '1/3', row: '3/4' },
  { id: '1558618666-fcd25c85cd64',   caption: 'Iron discipline',       col: '3/4', row: '3/4' },
  { id: '1571019613454-1cb2f99b2d8b', caption: 'Early risers',         col: '4/5', row: '3/5' },
  { id: '1541534741688-7fd4d7bfe2f4', caption: 'The Bandra community', col: '1/2', row: '4/5' },
  { id: '1567013127542-ce4ae85cec97', caption: 'Raw and real',         col: '2/4', row: '4/5' },
  { id: '1517838277536-f5f99be501cd', caption: 'Ground zero',          col: '1/2', row: '5/6' },
  { id: '1485727069639-0b7b90b7e5b0', caption: 'Move daily',           col: '2/4', row: '5/6' },
  { id: '1526506118085-60122a0045a5', caption: 'No excuses',           col: '4/5', row: '5/6' },
]

function GalleryItem({ item, index }: { item: typeof GALLERY[0]; index: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-sage/10"
      style={{ gridColumn: item.col, gridRow: item.row }}
    >
      <Image
        src={`https://images.unsplash.com/photo-${item.id}?w=900&q=75`}
        alt={item.caption}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        loading={index < 4 ? 'eager' : 'lazy'}
      />
      {/* Caption overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-3 md:p-4">
        <span className="text-cream text-[11px] font-body font-medium tracking-wide">
          {item.caption}
        </span>
      </div>
    </div>
  )
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="gallery" className="bg-offwhite py-24 border-t border-sage/20">
      <div className="max-w-7xl mx-auto px-8 xl:px-14">

        {/* Heading */}
        <div ref={ref} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[0.65rem] text-sage/60 tracking-[0.22em] uppercase mb-3"
          >
            Gallery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-display font-light text-forest leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Inside Iron House.
          </motion.h2>
        </div>

        {/* Mobile: uniform 2-col grid */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {GALLERY.map((item) => (
            <div key={item.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-sage/10">
              <Image
                src={`https://images.unsplash.com/photo-${item.id}?w=600&q=70`}
                alt={item.caption}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                <span className="text-cream text-[10px] font-body font-medium">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: asymmetric bento */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(5, 200px)',
          }}
        >
          {GALLERY.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
