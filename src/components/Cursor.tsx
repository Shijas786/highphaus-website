'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from 'framer-motion'
import { useHUD } from '@/context/HUDContext'
import { usePathname } from 'next/navigation'

export default function Cursor() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { hudActive } = useHUD()
  
  const [cursorType, setCursorType] = useState('default')
  const [bgContext, setBgContext] = useState<'black' | 'white' | 'maroon'>('black')
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Sub-pixel accuracy for HUD telemetry
  const roundedX = useTransform(mouseX, (x) => Math.round(x))
  const roundedY = useTransform(mouseY, (y) => Math.round(y))

  // Precision Refs for 0-latency HUD text updates
  const xRef = useRef<HTMLSpanElement>(null)
  const yRef = useRef<HTMLSpanElement>(null)

  // Physics for 'Elite' feel
  const springX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 })

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const target = e.target as HTMLElement
      
      // HYPER-ROBUST THEME DETECTION
      // 1. Check for specific dark/themed containers first (High Priority Overrides)
      const themeContainer = target.closest('nav, button, a, .bg-hp-black, .bg-hp-maroon')
      
      if (themeContainer && (themeContainer.classList.contains('bg-hp-black') || themeContainer.tagName === 'NAV')) {
        setBgContext('black')
      } else if (themeContainer && themeContainer.classList.contains('bg-hp-maroon')) {
        setBgContext('maroon')
      } else if (pathname?.startsWith('/blog') || target.closest('.ms-blog-theme') || target.closest('.bg-white')) {
        // 2. Force white theme on blog pages or white containers (Default for Blog)
        setBgContext('white')
      } else {
        // 3. Fallback for other pages
        const fallbackContainer = target.closest('section, main')
        if (fallbackContainer && (fallbackContainer.classList.contains('bg-hp-white') || fallbackContainer.classList.contains('bg-white'))) {
          setBgContext('white')
        } else {
          setBgContext('black')
        }
      }

      // Determine cursor type for scaling and icon
      const closestCursor = target.closest('[data-cursor]') as HTMLElement
      if (closestCursor) {
        setCursorType(closestCursor.getAttribute('data-cursor') || 'default')
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorType('pointer')
      } else {
        setCursorType('default')
      }
    }

    // Subscribe to MotionValues for 0-latency HUD text updates (bypasses React render)
    const unsubscribeX = roundedX.on("change", (latest) => {
      if (xRef.current) xRef.current.textContent = `X: ${latest}`
    })
    const unsubscribeY = roundedY.on("change", (latest) => {
      if (yRef.current) yRef.current.textContent = `Y: ${latest}`
    })

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, roundedX, roundedY, pathname])

  // Reset context on route change
  useEffect(() => {
    if (pathname?.startsWith('/blog')) {
      setBgContext('white')
    } else {
      setBgContext('black')
    }
  }, [pathname])

  if (!mounted) return null

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  const isBlogPage = pathname?.startsWith('/blog')
  
  // REFINED COLOR MAPPING (Synchronized with HighPhaus Visual Identity)
  // Black on White background, White on Dark backgrounds
  const cursorColor = (bgContext === 'white' || isBlogPage) ? '#000000' : '#FFFFFF' 
  const ringColor = (bgContext === 'white' || isBlogPage) ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* HUD COORDINATES TELEMETRY */}
      <AnimatePresence>
        {hudActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ x: mouseX, y: mouseY }}
            className="absolute ml-4 mt-4 font-mono text-[8px] flex flex-col gap-0.5"
            transition={{ duration: 0.2 }}
          >
            <span ref={xRef} style={{ color: cursorColor, opacity: 0.6 }}>X: 0</span>
            <span ref={yRef} style={{ color: cursorColor, opacity: 0.6 }}>Y: 0</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIMARY DOT */}
      <motion.div
        style={{ 
          x: mouseX, 
          y: mouseY, 
          backgroundColor: cursorColor 
        }}
        className={`absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${
          (bgContext === 'white' || isBlogPage) ? 'shadow-none' : 'shadow-[0_0_10px_rgba(255,255,255,0.1)]'
        }`}
      />

      {/* INTELLIGENT RING */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY, 
          borderColor: ringColor 
        }}
        animate={{
          width: cursorType === 'work' ? 120 : cursorType === 'pointer' ? 64 : 42,
          height: cursorType === 'work' ? 120 : cursorType === 'pointer' ? 64 : 42,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="absolute border-[1px] rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-500"
      >
        <AnimatePresence>
          {cursorType === 'work' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="eyebrow text-[10px] font-black"
              style={{ color: cursorColor }}
            >
              DRAG
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
