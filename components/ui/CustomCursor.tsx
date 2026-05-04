'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 22 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const hover = el?.closest('[data-hover]') as HTMLElement | null
      setLabel(hover?.dataset.hover ?? null)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY])

  const size = label ? 64 : 40

  return (
    <div className="hidden md:block" aria-hidden>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#c2563a]"
        style={{
          left: mouseX,
          top: mouseY,
          marginLeft: -4,
          marginTop: -4,
          mixBlendMode: 'difference',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{ left: ringX, top: ringY, mixBlendMode: 'difference' }}
      >
        <motion.div
          className="rounded-full border border-[#c2563a] flex items-center justify-center overflow-hidden"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
          transition={{
            width: { duration: 0.2, ease: 'easeOut' },
            height: { duration: 0.2, ease: 'easeOut' },
            opacity: { duration: 0.15 },
          }}
        >
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="font-display italic text-[9px] text-white leading-none text-center px-1 select-none whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
