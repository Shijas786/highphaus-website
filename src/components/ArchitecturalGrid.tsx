'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useHUD } from '@/context/HUDContext'
import { useEffect, useState } from 'react'

export default function ArchitecturalGrid() {
  const [mounted, setMounted] = useState(false)
  const { hudActive } = useHUD()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])
  const springGridY = useSpring(gridY, { stiffness: 100, damping: 30 })

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!mounted) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-hp-black">
      {/* KINETIC BASE GRID */}
      <motion.div 
        style={{ 
          y: springGridY,
          x: mousePos.x * 20,
          rotateX: mousePos.y * 2,
          rotateY: -mousePos.x * 2,
        }}
        className={`absolute inset-[-15%] transition-opacity duration-1000 ${
          hudActive ? 'opacity-[0.35]' : 'opacity-[0.15]'
        }`}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(74, 15, 28, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(74, 15, 28, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: 'clamp(3rem, 6vw, 6rem) clamp(3rem, 6vw, 6rem)'
          }}
        />
      </motion.div>

      {/* STRUCTURAL SCANLINE (Monochromatic / Maroon) */}
      <motion.div
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute left-0 right-0 h-[1px] bg-hp-maroon/20 shadow-[0_0_15px_rgba(74,15,28,0.2)] z-20 transition-opacity duration-700 ${hudActive ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* VIGNETTE FOR DEPTH */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />
    </div>
  )
}
