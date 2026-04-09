'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useHUD } from '@/context/HUDContext'
import { useEffect, useState } from 'react'

export default function HUD() {
  const [mounted, setMounted] = useState(false)
  const { hudActive } = useHUD()
  const [metrics, setMetrics] = useState({ w: 0, h: 0 })

  useEffect(() => {
    setMounted(true)
    const updateMetrics = () =>
      setMetrics({ w: window.innerWidth, h: window.innerHeight })

    updateMetrics()
    window.addEventListener('resize', updateMetrics)
    return () => window.removeEventListener('resize', updateMetrics)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {hudActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[8888] pointer-events-none"
        >
          {/* ARCHITECTURAL GRID */}
          <div className="container h-full relative">
            <div className="grid grid-cols-4 md:grid-cols-12 h-full gap-6 lg:gap-12 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="h-full border-x border-hp-maroon/40 bg-hp-maroon/10"
                />
              ))}
            </div>
          </div>

          {/* TELEMETRY / GRID LABELS */}
          <div className="absolute top-10 left-10 font-mono text-[10px] text-white/50 tracking-[0.3em] leading-relaxed">
            <p className="opacity-40">VIEWPORT</p>
            <p className="text-white/70 mb-3 font-medium tracking-[0.1em]">
              {metrics.w}px × {metrics.h}px
            </p>

            <p className="opacity-40">GRID SYSTEM</p>
            <p className="text-white/70 mb-3 font-medium tracking-[0.1em]">12 COLUMN / 60px GUTTER</p>

            <p className="opacity-40">ENGINE</p>
            <p className="text-white/70 mb-3 font-medium tracking-[0.1em]">NEXT.JS / TURBOPACK</p>

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/80 mt-4 font-bold tracking-[0.2em]"
            >
              SYSTEM_STABLE //
            </motion.p>
          </div>

          {/* CORNER ANCHORS */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-hp-maroon" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-hp-maroon" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-hp-maroon" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-hp-maroon" />

          {/* SCAN LINE */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-hp-maroon shadow-[0_0_15px_#4A0F1C]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}