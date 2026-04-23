'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = ['Portfolio', 'Services', 'About', 'Contact']
const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/highphaus-undefined-4b85bb3b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', primary: true },
  { name: 'Instagram', href: 'https://www.instagram.com/highphaus?igsh=ZDdoZmdxNnkzczA3', primary: false },
  { name: 'Twitter / X', href: 'https://x.com/highphaus', primary: false },
  { name: 'WhatsApp', href: 'https://wa.me/917034206108', primary: false }
]

export default function Footer({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const year = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  const isLight = theme === 'light'

  return (
    <footer ref={ref} className={`border-t relative overflow-hidden transition-colors duration-700 ${
      isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'border-hp-maroon/20 bg-hp-black text-hp-white'
    }`}>
      {/* Top */}
      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-16">

          {/* Brand */}
          <div className="space-y-6">
            <h2 className={`display-3 uppercase tracking-tighter ${isLight ? 'text-zinc-900' : 'text-hp-white'}`}>HIGHPHAUS</h2>
            <p className={`body-sm max-w-xs ${isLight ? 'text-zinc-600' : 'text-hp-beige/80'}`}>
              A digital agency building brands that scale.
              Strategy-led. Design-obsessed. Results-driven.
            </p>
            <p className="eyebrow text-hp-maroon font-black">KALLARA</p>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <p className={`eyebrow mb-6 text-opacity-40 ${isLight ? 'text-zinc-400' : 'text-hp-white'}`}>Navigation</p>
            {LINKS.map(link => (
              <div key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`eyebrow transition-all duration-300 link-hover ${isLight ? 'text-zinc-600 hover:text-zinc-900 after:bg-zinc-900 after:shadow-none' : 'text-hp-beige hover:text-hp-white'}`}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className={`eyebrow mb-6 text-opacity-40 ${isLight ? 'text-zinc-400' : 'text-hp-white'}`}>Connect</p>
            {SOCIALS.map(s => (
              <div key={s.name}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`eyebrow transition-all duration-300 link-hover ${
                    isLight 
                      ? s.primary ? 'text-zinc-900 font-black after:bg-zinc-900 after:shadow-none' : 'text-zinc-600 after:bg-zinc-600 after:shadow-none' 
                      : s.primary ? 'text-hp-white font-black' : 'text-hp-beige'
                  }`}
                >
                  {s.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider bg-hp-maroon/20" />

      {/* Bottom bar */}
      <div className={`container py-8 pb-40 flex flex-col sm:flex-row justify-between items-center gap-8 border-t ${isLight ? 'border-zinc-100' : 'border-hp-white/10'}`}>
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <p className={`eyebrow ${isLight ? 'text-zinc-400' : 'text-hp-beige/60'}`}>© {year} Highphaus. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className={`eyebrow transition-colors duration-300 ${isLight ? 'text-zinc-400 hover:text-zinc-900' : 'text-hp-beige hover:text-hp-white'}`}>Privacy</a>
          <a href="#" className={`eyebrow transition-colors duration-300 ${isLight ? 'text-zinc-400 hover:text-zinc-900' : 'text-hp-beige hover:text-hp-white'}`}>Terms</a>
        </div>
      </div>
    </footer>
  )
}
