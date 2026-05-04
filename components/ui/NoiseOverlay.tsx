export default function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9000] pointer-events-none select-none"
      style={{ mixBlendMode: 'overlay', opacity: 0.06 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  )
}
