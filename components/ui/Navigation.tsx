'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const LINKS = ['Classes', 'Trainers', 'Pricing', 'Gallery', 'Contact']

function NavLink({ label }: { label: string }) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      data-hover="Open"
      className="group relative overflow-hidden inline-flex h-[1.15em] text-sm font-body tracking-wide cursor-pointer select-none"
    >
      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
        <span className="leading-[1.15em] text-white/65">{label}</span>
        <span className="leading-[1.15em] text-white">{label}</span>
      </span>
    </a>
  )
}

function SoundWaveBars() {
  return (
    <span className="flex items-end gap-[2px] h-[14px] ml-1.5">
      {[0.5, 1, 0.7, 0.9, 0.4].map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-current animate-pulse"
          style={{
            height: `${h * 14}px`,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${0.55 + i * 0.1}s`,
          }}
        />
      ))}
    </span>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const oscsRef = useRef<OscillatorNode[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const startAudio = () => {
    const ctx = new AudioContext()
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1)
    gain.connect(ctx.destination)
    audioCtxRef.current = ctx
    gainRef.current = gain

    // Three sine oscillators for a soft ambient drone
    const freqs = [55, 82.5, 110]
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      osc.start()
      oscsRef.current.push(osc)
    })
  }

  const stopAudio = () => {
    if (!gainRef.current || !audioCtxRef.current) return
    const ctx = audioCtxRef.current
    const gain = gainRef.current
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
    setTimeout(() => {
      oscsRef.current.forEach((osc) => { try { osc.stop() } catch {} })
      oscsRef.current = []
      ctx.close()
      audioCtxRef.current = null
      gainRef.current = null
    }, 600)
  }

  const toggleSound = () => {
    if (soundOn) {
      stopAudio()
      setSoundOn(false)
    } else {
      startAudio()
      setSoundOn(true)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl bg-cream/80 border-b border-sage/20' : ''
        }`}
      />

      {/* Main content — mix-blend-mode: difference */}
      <div
        className="relative flex items-center justify-between px-8 xl:px-14 py-5"
        style={{ mixBlendMode: 'difference' }}
      >
        <a
          href="/"
          data-hover="Home"
          className="font-accent text-white text-[1.05rem] tracking-[0.28em] uppercase select-none"
        >
          Iron House
        </a>

        <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((link) => (
            <NavLink key={link} label={link} />
          ))}
        </nav>

        <button
          onClick={toggleSound}
          data-hover="Sound"
          aria-label={soundOn ? 'Mute ambient sound' : 'Play ambient sound'}
          className="text-white/70 hover:text-white transition-colors duration-200 ml-auto flex items-center"
        >
          {soundOn ? (
            <span className="flex items-center">
              <Volume2 size={18} strokeWidth={1.5} />
              <SoundWaveBars />
            </span>
          ) : (
            <VolumeX size={18} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Free Trial CTA — outside blend-mode container */}
      <a
        href="#trial"
        data-hover="Click"
        className="absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 z-10 bg-terracotta text-cream text-xs font-body font-semibold tracking-wide px-5 py-2 rounded-full hover:bg-terracotta/88 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] whitespace-nowrap"
      >
        Free Trial
      </a>
    </header>
  )
}
