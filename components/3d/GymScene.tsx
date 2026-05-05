'use client'

import { useRef, useState, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Config — positions are px within the 800×700 scene wrapper in Hero.tsx
// Mat (600px wide) is centered at approx x:100–700, y-center ~280px
// ---------------------------------------------------------------------------

interface EquipmentConfig {
  id: string
  src: string
  label: string
  glowColor: string
  left: number
  top: number
  width: number
  depth: number      // 0 = back (least parallax), 1 = front (most)
  floatDuration: number
  floatPhase: number
  floatAmp: number
  rotate: number
  zIndex: number
}

const EQUIPMENT: EquipmentConfig[] = [
  {
    id: 'squat-rack',
    src: '/equipment/squat-rack.png',
    label: 'Powerlifting',
    glowColor: '#8a9a7b',
    left: 465, top: 160, width: 200,
    depth: 0.1, floatDuration: 3.8, floatPhase: 2.4, floatAmp: 4,
    rotate: 1, zIndex: 1,
  },
  {
    id: 'boxing-gloves',
    src: '/equipment/boxing-gloves.png',
    label: 'Boxing — Daily 7AM',
    glowColor: '#8B2A1F',
    left: 625, top: 230, width: 145,
    depth: 0.25, floatDuration: 3.5, floatPhase: 3.6, floatAmp: 9,
    rotate: 12, zIndex: 2,
  },
  {
    id: 'dumbbell',
    src: '/equipment/dumbbell.png',
    label: 'Strength Training',
    glowColor: '#c2563a',
    left: 325, top: 250, width: 155,
    depth: 0.35, floatDuration: 3.4, floatPhase: 0, floatAmp: 10,
    rotate: -10, zIndex: 3,
  },
  {
    id: 'water-bottle',
    src: '/equipment/water-bottle.png',
    label: 'Stay Hydrated',
    glowColor: '#a8c5da',
    left: 725, top: 320, width: 75,
    depth: 0.45, floatDuration: 2.9, floatPhase: 2.0, floatAmp: 12,
    rotate: -5, zIndex: 4,
  },
  {
    id: 'yoga-mat',
    src: '/equipment/yoga-mat.png',
    label: 'Yoga & Pilates',
    glowColor: '#8a9a7b',
    left: 615, top: 370, width: 175,
    depth: 0.55, floatDuration: 4.1, floatPhase: 4.8, floatAmp: 7,
    rotate: -3, zIndex: 5,
  },
  {
    id: 'kettlebell',
    src: '/equipment/kettlebell.png',
    label: 'HIIT Classes',
    glowColor: '#f0d97f',
    left: 335, top: 390, width: 130,
    depth: 0.6, floatDuration: 3.3, floatPhase: 1.2, floatAmp: 9,
    rotate: 3, zIndex: 5,
  },
  {
    id: 'medicine-ball',
    src: '/equipment/medicine-ball.png',
    label: 'Functional Training',
    glowColor: '#f0d97f',
    left: 485, top: 340, width: 120,
    depth: 0.65, floatDuration: 3.6, floatPhase: 1.8, floatAmp: 10,
    rotate: 0, zIndex: 6,
  },
  {
    id: 'resistance-band',
    src: '/equipment/resistance-band.png',
    label: 'Mobility',
    glowColor: '#d4a5a5',
    left: 475, top: 430, width: 115,
    depth: 0.75, floatDuration: 3.1, floatPhase: 0.6, floatAmp: 12,
    rotate: 15, zIndex: 7,
  },
]

// ---------------------------------------------------------------------------
// Single equipment item
// ---------------------------------------------------------------------------

function EquipmentItem({
  item,
  springX,
  springY,
  hoveredId,
  setHoveredId,
}: {
  item: EquipmentConfig
  springX: MotionValue<number>
  springY: MotionValue<number>
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
}) {
  const px = useTransform(springX, (v) => v * item.depth * 36)
  const py = useTransform(springY, (v) => v * item.depth * 22)

  const isHovered = hoveredId === item.id
  const isDimmed = hoveredId !== null && !isHovered

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: item.left,
        top: item.top,
        zIndex: item.zIndex,
        x: px,
        y: py,
      }}
    >
      {/* Float */}
      <motion.div
        animate={{ y: [0, -item.floatAmp, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: item.floatDuration,
          ease: 'easeInOut',
          delay: item.floatPhase * 0.18,
        }}
        style={{ rotate: item.rotate }}
      >
        {/* Hover + glow */}
        <motion.div
          onHoverStart={() => setHoveredId(item.id)}
          onHoverEnd={() => setHoveredId(null)}
          animate={{
            scale: isHovered ? 1.15 : isDimmed ? 0.94 : 1,
            opacity: isDimmed ? 0.48 : 1,
            filter: `drop-shadow(0 0 ${isHovered ? 35 : 0}px ${item.glowColor})`,
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <Image
            src={item.src}
            alt={item.label}
            width={item.width}
            height={item.width}
            style={{ width: item.width, height: 'auto', display: 'block' }}
            priority
          />

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              style={{
                position: 'absolute',
                bottom: '115%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(26,26,26,0.92)',
                color: '#f5ede0',
                padding: '5px 14px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(245,237,224,0.18)',
                pointerEvents: 'none',
                textTransform: 'uppercase',
              }}
            >
              {item.label}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Scene — fills whatever container Hero.tsx gives it
// ---------------------------------------------------------------------------

export default function GymScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      rawX.set((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2))
      rawY.set((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2))
    },
    [rawX, rawY],
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    setHoveredId(null)
  }, [rawX, rawY])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}
    >
      {EQUIPMENT.map((item) => (
        <EquipmentItem
          key={item.id}
          item={item}
          springX={springX}
          springY={springY}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      ))}
    </div>
  )
}
