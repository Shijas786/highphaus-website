'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { useHUD } from '@/context/HUDContext'

const ZONES = [
  { id: 'hero', label: 'INITIALIZATION' },
  { id: 'work', label: 'PORTFOLIO_INDEX' },
  { id: 'services', label: 'STRUCTURAL_SYSTEMS' },
  { id: 'about', label: 'IDENTITY_PROTOCOL' },
  { id: 'contact', label: 'UPLINK_TERMINAL' },
]

export default function TelemetryHUD() {
  const [mounted, setMounted] = useState(false)
  const { hudActive } = useHUD()
  const [activeZone, setActiveZone] = useState('INITIALIZATION')
  const [studioTime, setStudioTime] = useState('')
  const [displayProgress, setDisplayProgress] = useState(0)
  const { scrollYProgress } = useScroll()

  // Smooth progress for the bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Safe subscription to progress for text rendering
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setDisplayProgress(Math.floor(latest * 100))
  })

  useEffect(() => {
    // 1. Studio Time (Kallara / IST)
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setStudioTime(time)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    setMounted(true)

    // 2. Active Zone Detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const zone = ZONES.find((z) => z.id === entry.target.id)
            if (zone) setActiveZone(zone.label)
          }
        })
      },
      { threshold: 0.5 }
    )

    ZONES.forEach((zone) => {
      const el = document.getElementById(zone.id)
      if (el) observer.observe(el)
    })

    return () => {
      clearInterval(timer)
      observer.disconnect()
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9000] pointer-events-none">
      {/* Telemetry Bar Base */}
      <div className="h-10 bg-hp-black border-t border-hp-white flex items-center px-6 overflow-hidden">
        
        {/* Progress Fill (Subtle Background) */}
        <motion.div 
          className="absolute inset-0 bg-hp-white origin-left opacity-10"
          style={{ scaleX }}
        />

        <div className="container relative flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-hp-white uppercase">
          
          {/* Left Column: Progress & Zone */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-hp-beige">PROGRESS</span>
              <motion.span className="text-hp-white min-w-[3ch]">
                {displayProgress}%
              </motion.span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-hp-beige">ZONE</span>
              <span className="text-hp-white">{activeZone}</span>
            </div>
          </div>

          {/* Center: System Status */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${hudActive ? 'bg-hp-maroon animate-pulse shadow-[0_0_10px_#4A0F1C]' : 'bg-hp-maroon'}`} />
              <span>STRUCTURAL: {hudActive ? 'ACTIVE' : 'STANDBY'}</span>
            </div>
            {hudActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 border-l border-hp-white pl-6"
              >
                <span className="text-hp-beige">RES: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '0x0'}</span>
                <span className="animate-pulse text-hp-maroon">CORE_STABLE</span>
              </motion.div>
            )}
          </div>

          {/* Right Column: Studio Telemetry */}
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-hp-beige">STUDIO</span>
              <span className="text-hp-white">TRV_HUB</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-hp-beige">TIME_IST</span>
              <span className="text-hp-white">{studioTime}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Extreme Bottom Accent Line */}
      <motion.div 
        className="h-[2px] bg-hp-maroon shadow-[0_0_10px_#4A0F1C] origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}
