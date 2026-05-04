'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = 'IRON HOUSE'.split('')

export default function PageLoader() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[9990] bg-[#f5ede0] flex items-center justify-center"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 }}
        >
          <div className="flex items-center">
            {LETTERS.map((char, i) =>
              char === ' ' ? (
                <span key={i} style={{ width: '0.45em' }} />
              ) : (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="font-accent text-[#2d3a2e] tracking-[0.28em] uppercase"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
                >
                  {char}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
