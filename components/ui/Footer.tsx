'use client'

import { useState } from 'react'
import { Camera, PlayCircle } from 'lucide-react'

const QUICK_LINKS = ['Classes', 'Trainers', 'Pricing', 'Gallery']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3500)
  }

  return (
    <footer className="bg-forest text-cream">

      {/* Top section — 4 columns */}
      <div className="max-w-7xl mx-auto px-8 xl:px-14 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <a href="/" className="font-accent text-cream text-[1.1rem] tracking-[0.28em] uppercase">
              Iron House
            </a>
            <p className="font-body text-cream/50 text-sm leading-relaxed max-w-[220px]">
              Mumbai&apos;s playground for serious training.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com/ironhouse.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Camera"
                className="text-cream/40 hover:text-cream transition-colors duration-200"
              >
                <Camera size={17} strokeWidth={1.5} />
              </a>
              <a
                href="https://youtube.com/@ironhousemumbai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-cream/40 hover:text-cream transition-colors duration-200"
              >
                <PlayCircle size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[0.62rem] text-cream/35 tracking-[0.22em] uppercase">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-sm text-cream/55 hover:text-cream transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a href="#trial" className="font-body text-sm text-terracotta hover:text-cream transition-colors duration-200">
                  Free Trial
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[0.62rem] text-cream/35 tracking-[0.22em] uppercase">
              Contact
            </h4>
            <address className="not-italic flex flex-col gap-2.5">
              <p className="font-body text-sm text-cream/55 leading-relaxed">
                Plot 14, Waterfield Road<br />
                Bandra West, Mumbai 400050
              </p>
              <a href="tel:+912266775544" className="font-body text-sm text-cream/55 hover:text-cream transition-colors duration-200">
                +91 22 6677 5544
              </a>
              <a href="mailto:hello@ironhouse.in" className="font-body text-sm text-cream/55 hover:text-cream transition-colors duration-200">
                hello@ironhouse.in
              </a>
              <p className="font-mono text-[0.6rem] text-cream/30 tracking-wide mt-1">
                Mon – Sun · 5 AM – 11 PM
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[0.62rem] text-cream/35 tracking-[0.22em] uppercase">
              Newsletter
            </h4>
            <p className="font-body text-sm text-cream/50 leading-relaxed">
              Monthly notes from the floor. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-1">
              <div className="flex items-center border border-cream/15 rounded-full overflow-hidden focus-within:border-cream/35 transition-colors duration-200">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent px-4 py-2 text-sm font-body text-cream/80 placeholder:text-cream/25 outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-body font-medium text-cream/50 hover:text-cream transition-colors duration-200 shrink-0"
                >
                  {subscribed ? '✓' : '→'}
                </button>
              </div>
              {subscribed && (
                <p className="font-mono text-[0.58rem] text-sage tracking-wider">
                  You&apos;re in. See you next month.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-cream/8" />

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto px-8 xl:px-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[0.6rem] text-cream/28 tracking-wide">
          © 2026 Iron House. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="font-mono text-[0.6rem] text-cream/28 tracking-wide hover:text-cream/50 transition-colors duration-200">
            Privacy
          </a>
          <a href="/terms" className="font-mono text-[0.6rem] text-cream/28 tracking-wide hover:text-cream/50 transition-colors duration-200">
            Terms
          </a>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/ironhouse.in" target="_blank" rel="noopener noreferrer" aria-label="Camera" className="text-cream/28 hover:text-cream/60 transition-colors duration-200">
              <Camera size={13} strokeWidth={1.5} />
            </a>
            <a href="https://youtube.com/@ironhousemumbai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-cream/28 hover:text-cream/60 transition-colors duration-200">
              <PlayCircle size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

    </footer>
  )
}
