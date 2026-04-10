'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Magnetic from '@/components/Magnetic'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hp-black flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Architectural Grid (Consistency) */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <span className="eyebrow text-hp-beige tracking-[0.5em] mb-4 block opacity-40">
          SYSTEM_ERROR // 404
        </span>
        
        <h1 className="display-1 font-black text-hp-white tracking-tighter uppercase mb-8">
          Selected Orbit<br />Not Found.
        </h1>
        
        <div className="h-[2px] w-32 bg-hp-maroon mx-auto mb-12 shadow-[0_0_15px_rgba(74, 15, 28, 0.5)]" />
        
        <p className="max-w-md mx-auto text-[10px] font-mono tracking-[0.3em] uppercase leading-loose text-hp-beige/60 mb-16">
          The requested coordinate does not exist in our digital architecture. Redirecting to core systems suggested.
        </p>

        <div className="flex justify-center">
            <Magnetic>
              <Link 
                href="/" 
                className="btn-primary text-[10px] py-4 px-10 tracking-[0.3em] font-black uppercase"
              >
                Go Home // Start Over
              </Link>
            </Magnetic>
        </div>
      </motion.div>

      {/* Decorative HUD Elements */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-2 pointer-events-none opacity-20">
        <div className="w-12 h-[1px] bg-hp-maroon" />
        <div className="w-8 h-[1px] bg-hp-maroon" />
      </div>
      
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-20 transform -rotate-90 origin-bottom-right">
        <span className="eyebrow text-[8px] text-hp-beige tracking-widest uppercase">HIGHPHAUS_ARCHIVE_RECOVERY_PROTOCOL</span>
      </div>
    </div>
  )
}
