'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from 'framer-motion'
import { useHUD } from '@/context/HUDContext'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const { hudActive } = useHUD()
  
  const [cursorType, setCursorType] = useState('default')
  const [bgContext, setBgContext] = useState('black')
  
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
      
      // Determine background context from closest section
      const section = target.closest('section')
      if (section) {
        if (section.classList.contains('bg-hp-white')) {
          setBgContext('white')
        } else if (section.classList.contains('bg-hp-maroon')) {
          setBgContext('maroon')
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
  }, [mouseX, mouseY, roundedX, roundedY])

  if (!mounted) return null

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  // Adaptive Color Mappings for high contrast
  const cursorColor = bgContext === 'white' ? '#4A0F1C' : '#FFFFFF' // Maroon or White
  const ringColor = bgContext === 'white' ? 'rgba(74, 15, 28, 0.3)' : 'rgba(255, 255, 255, 0.3)'

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
        className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-500"
      />

      {/* INTELLIGENT RING */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY, 
          borderColor: ringColor 
        }}
        animate={{
          width: cursorType === 'work' ? 120 : cursorType === 'pointer' ? 60 : 40,
          height: cursorType === 'work' ? 120 : cursorType === 'pointer' ? 60 : 40,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className="absolute border rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-500"
      >
        <AnimatePresence>
          {cursorType === 'work' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="eyebrow text-[10px]"
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
