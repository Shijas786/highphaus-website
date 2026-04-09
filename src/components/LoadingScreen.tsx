'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 1200) // Ensure the zoom transition completes before unloading
    }, 2200) 
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ 
             scale: 12, 
             opacity: 0,
             filter: "blur(20px)",
             transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
           }}
           className="fixed inset-0 z-[9999] bg-hp-black flex items-center justify-center overflow-hidden"
        >
          <div className="reveal-clip mb-8">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 1.4, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
              className="display-1 text-hp-white uppercase tracking-tighter"
            >
              HIGHPHAUS
            </motion.h1>
          </div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-48 h-[1px] bg-hp-maroon shadow-[0_0_15px_rgba(74,15,28,0.5)] origin-left"
          />
          
          {/* OPTIONAL: Subtle bottom cue */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-12 eyebrow text-hp-white/20 tracking-[0.5em]"
          >
            Digital Architecture
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
