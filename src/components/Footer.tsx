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

export default function Footer() {
  const year = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <footer ref={ref} className="border-t border-hp-maroon/20 bg-hp-black relative overflow-hidden">
      {/* Top */}
      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-16">

          {/* Brand */}
          <div className="space-y-6">
            <h2 className="display-3 text-hp-white uppercase tracking-tighter">HIGHPHAUS</h2>
            <p className="body-sm max-w-xs text-hp-beige/80">
              A digital agency building brands that scale.
              Strategy-led. Design-obsessed. Results-driven.
            </p>
            <p className="eyebrow text-hp-maroon font-black">KALLARA</p>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <p className="eyebrow text-hp-white mb-6 text-opacity-40">Navigation</p>
            {LINKS.map(link => (
              <div key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="eyebrow text-hp-beige hover:text-hp-white transition-all duration-300 link-hover"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className="eyebrow text-hp-white mb-6 text-opacity-40">Connect</p>
            {SOCIALS.map(s => (
              <div key={s.name}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`eyebrow transition-all duration-300 link-hover ${s.primary ? 'text-hp-white font-black' : 'text-hp-beige'}`}
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
      <div className="container py-8 pb-40 flex flex-col sm:flex-row justify-between items-center gap-8 border-t border-hp-white/10">
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <p className="eyebrow text-hp-beige/60">© {year} Highphaus. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="eyebrow text-hp-beige hover:text-hp-white transition-colors duration-300">Privacy</a>
          <a href="#" className="eyebrow text-hp-beige hover:text-hp-white transition-colors duration-300">Terms</a>
        </div>
      </div>
    </footer>
  )
}
