'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CoreProps {
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mat(
  color: string,
  glowColor: string,
  isHovered: boolean,
  isDimmed: boolean,
) {
  return {
    color,
    roughness: 0.88,
    metalness: 0.05,
    emissive: glowColor,
    emissiveIntensity: isHovered ? 0.5 : 0,
    transparent: true,
    opacity: isDimmed ? 0.32 : 1,
  }
}

// Shared animation hook — handles bob, slow spin, scale lerp
function useEquipmentAnim(phase: number, isHovered: boolean) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const g = groupRef.current
    if (!g) return
    const t = clock.getElapsedTime()
    g.position.y = Math.sin(t * 1.1 + phase) * 0.06
    g.rotation.y += 0.003

    const target = isHovered ? 1.2 : 1.0
    const s = g.scale
    s.x = THREE.MathUtils.lerp(s.x, target, 0.1)
    s.y = THREE.MathUtils.lerp(s.y, target, 0.1)
    s.z = THREE.MathUtils.lerp(s.z, target, 0.1)
  })

  return groupRef
}

function Tooltip({ label, tipY = 0.85 }: { label: string; tipY?: number }) {
  return (
    <Html position={[0, tipY, 0]} center style={{ pointerEvents: 'none' }}>
      <div
        style={{
          background: 'rgba(26,26,26,0.92)',
          color: '#f5ede0',
          padding: '5px 14px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(245,237,224,0.18)',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </Html>
  )
}

// ---------------------------------------------------------------------------
// Equipment Components
// ---------------------------------------------------------------------------

function Dumbbell({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'dumbbell'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(0, isHovered)
  const m = (c: string) => mat(c, '#c2563a', isHovered, isDimmed)

  return (
    <group position={[-1.8, -0.3, 0.8]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        {/* Left weight */}
        <mesh position={[-0.5, 0, 0]}>
          <sphereGeometry args={[0.3, 20, 16]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        {/* Right weight */}
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[0.3, 20, 16]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        {/* Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial {...m('#1a1a1a')} />
        </mesh>
        {isHovered && <Tooltip label="Strength Training" />}
      </group>
    </group>
  )
}

function Kettlebell({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'kettlebell'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(1.2, isHovered)
  const m = (c: string) => mat(c, '#f0d97f', isHovered, isDimmed)

  return (
    <group position={[0, -0.2, 0.8]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        {/* Body */}
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.4, 24, 20]} />
          <meshStandardMaterial {...m('#1a1a1a')} />
        </mesh>
        {/* Handle torus */}
        <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 12, 32]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        {isHovered && <Tooltip label="HIIT Classes" tipY={1.0} />}
      </group>
    </group>
  )
}

function SquatRack({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'squatrack'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(2.4, isHovered)
  const m = (c: string) => mat(c, '#8a9a7b', isHovered, isDimmed)

  const posts: [number, number][] = [
    [-0.52, 0.34], [0.52, 0.34],
    [-0.52, -0.34], [0.52, -0.34],
  ]

  return (
    <group position={[0, 0.5, -1.8]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        {/* Vertical posts */}
        {posts.map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[0.07, 2.2, 0.07]} />
            <meshStandardMaterial {...m('#2d3a2e')} />
          </mesh>
        ))}
        {/* Barbell */}
        <mesh position={[0, 0.9, 0.34]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 1.44, 12]} />
          <meshStandardMaterial {...m('#8a9a7b')} />
        </mesh>
        {/* Horizontal cross braces */}
        <mesh position={[0, -0.6, 0.34]}>
          <boxGeometry args={[1.12, 0.06, 0.06]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        <mesh position={[0, -0.6, -0.34]}>
          <boxGeometry args={[1.12, 0.06, 0.06]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        {isHovered && <Tooltip label="Powerlifting" tipY={1.5} />}
      </group>
    </group>
  )
}

function BoxingGloves({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'boxinggloves'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(3.6, isHovered)
  const m = (c: string) => mat(c, '#8B2A1F', isHovered, isDimmed)

  return (
    <group position={[2.0, -0.2, 0.6]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        {/* Left glove */}
        <mesh position={[-0.28, 0, 0]} rotation={[0.1, -0.3, 0.18]}>
          <boxGeometry args={[0.4, 0.5, 0.3]} />
          <meshStandardMaterial {...m('#8B2A1F')} />
        </mesh>
        {/* Right glove */}
        <mesh position={[0.28, 0.06, 0]} rotation={[-0.1, 0.3, -0.18]}>
          <boxGeometry args={[0.4, 0.5, 0.3]} />
          <meshStandardMaterial {...m('#8B2A1F')} />
        </mesh>
        {isHovered && <Tooltip label="Boxing — Daily 7AM" tipY={0.7} />}
      </group>
    </group>
  )
}

function YogaMat({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'yogamat'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(4.8, isHovered)
  const m = (c: string) => mat(c, '#8a9a7b', isHovered, isDimmed)

  return (
    <group position={[2.3, -0.8, -0.2]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        {/* Rolled mat cylinder */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 1.5, 24]} />
          <meshStandardMaterial {...m('#8a9a7b')} />
        </mesh>
        {/* End caps detail */}
        <mesh position={[-0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
          <meshStandardMaterial {...m('#6b7a5e')} />
        </mesh>
        <mesh position={[0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
          <meshStandardMaterial {...m('#6b7a5e')} />
        </mesh>
        {isHovered && <Tooltip label="Yoga & Pilates" tipY={0.5} />}
      </group>
    </group>
  )
}

function ResistanceBand({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'resistanceband'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(0.6, isHovered)
  const m = (c: string) => mat(c, '#d4a5a5', isHovered, isDimmed)

  return (
    <group position={[-2.1, -0.72, -0.3]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        <mesh>
          <torusGeometry args={[0.3, 0.05, 16, 48]} />
          <meshStandardMaterial {...m('#c4a0a0')} />
        </mesh>
        {isHovered && <Tooltip label="Mobility" tipY={0.6} />}
      </group>
    </group>
  )
}

function MedicineBall({ hoveredId, setHoveredId }: CoreProps) {
  const id = 'medicineball'
  const isHovered = hoveredId === id
  const isDimmed = hoveredId !== null && !isHovered
  const groupRef = useEquipmentAnim(1.8, isHovered)
  const m = (c: string) => mat(c, '#f0d97f', isHovered, isDimmed)

  return (
    <group position={[1.5, -0.6, -1.1]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id) }}
        onPointerOut={() => setHoveredId(null)}
      >
        {/* Main sphere */}
        <mesh>
          <sphereGeometry args={[0.35, 28, 24]} />
          <meshStandardMaterial {...m('#1a1a1a')} />
        </mesh>
        {/* Stitching seams */}
        <mesh>
          <torusGeometry args={[0.352, 0.009, 8, 40]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.352, 0.009, 8, 40]} />
          <meshStandardMaterial {...m('#2d3a2e')} />
        </mesh>
        {isHovered && <Tooltip label="Functional Training" />}
      </group>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Mouse Parallax Wrapper
// ---------------------------------------------------------------------------

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!)
  const { pointer } = useThree()
  const rot = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!groupRef.current) return
    const targetX = -pointer.y * (5 * Math.PI / 180)
    const targetY = pointer.x * (5 * Math.PI / 180)
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, targetX, 0.05)
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, targetY, 0.05)
    groupRef.current.rotation.x = rot.current.x
    groupRef.current.rotation.y = rot.current.y
  })

  return <group ref={groupRef}>{children}</group>
}

// ---------------------------------------------------------------------------
// Scene Assembly
// ---------------------------------------------------------------------------

function SceneContent() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <>
      {/* Warm key light from top-right */}
      <directionalLight position={[3, 4, 2]} intensity={1.8} color="#fff8f0" castShadow />
      {/* Sage ambient fill */}
      <ambientLight color="#8a9a7b" intensity={0.55} />
      {/* Butter rim from back */}
      <pointLight position={[-1, 2, -4]} intensity={1.4} color="#f0d97f" />
      {/* Soft front fill */}
      <pointLight position={[0, 0, 4]} intensity={0.3} color="#f5ede0" />

      {/* Cream floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#f5ede0" roughness={0.95} metalness={0} />
      </mesh>

      <ContactShadows
        position={[0, -0.99, 0]}
        opacity={0.4}
        scale={14}
        blur={2.5}
        far={5}
        color="#2d3a2e"
      />

      <ParallaxGroup>
        <Dumbbell hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <Kettlebell hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <SquatRack hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <BoxingGloves hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <YogaMat hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <ResistanceBand hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <MedicineBall hoveredId={hoveredId} setHoveredId={setHoveredId} />
      </ParallaxGroup>
    </>
  )
}

export default function GymScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 50 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  )
}
