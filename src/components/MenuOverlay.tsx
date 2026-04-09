'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import Magnetic from './Magnetic'

const MENU_LINKS = [
  { n: "01", t: "SERVICES", l: "#services" },
  { n: "02", t: "STRATEGY", l: "#services" },
  { n: "03", t: "PORTFOLIO", l: "#portfolio" },
  { n: "04", t: "CLIENTS", l: "#testimonials" },
  { n: "05", t: "CONNECT", l: "#connect" }
]

export default function MenuOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
          exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as any }}
          className="fixed inset-0 z-[2000] bg-hp-black text-hp-white flex flex-col justify-center section relative"
        >
          {/* Close Trigger // Magnetic Maroon */}
          <div className="absolute top-10 right-10 md:top-24 md:right-24">
            <Magnetic>
              <button 
                onClick={onClose}
                className="w-20 h-20 rounded-full border border-hp-maroon/20 flex items-center justify-center hover:bg-hp-maroon hover:border-hp-maroon transition-all duration-500 group"
              >
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </Magnetic>
          </div>

          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
               <nav className="space-y-4">
                  {MENU_LINKS.map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" as any }}
                      className="group overflow-hidden"
                    >
                      <a 
                        href={link.l}
                        onClick={onClose}
                        className="flex items-end gap-10 py-4 group-hover:pl-4 transition-all duration-700"
                      >
                         <span className="text-[12px] font-black tracking-[0.5em] text-hp-maroon opacity-0 group-hover:opacity-100 transition-all font-mono">{link.n} //</span>
                         <h2 className="text-fluid-lg font-black tracking-tighter uppercase leading-none group-hover:text-hp-maroon transition-all duration-700">
                           {link.t}
                         </h2>
                         <ArrowUpRight className="w-12 h-12 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 text-hp-maroon transition-all duration-700" />
                      </a>
                    </motion.div>
                  ))}
               </nav>

               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.0 }}
                 className="space-y-8 pb-8 text-right hidden md:block"
               >
                  <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 leading-loose max-w-[280px] ml-auto font-mono text-hp-beige">
                     ESTABLISHING HIGH-PERFORMANCE DIGITAL ARCHITECTURE // SECURE ENGAGEMENT.
                  </p>
                  <div className="h-[2px] w-24 bg-hp-maroon ml-auto" />
                  <div className="flex justify-end gap-8 text-[12px] font-black tracking-[0.5em] uppercase opacity-20 hover:opacity-100 transition-opacity">
                      <span>KALLARA.</span>
                  </div>
               </motion.div>
            </div>
          </div>

          {/* Bottom Branding Tag */}
          <div className="absolute bottom-16 left-24 opacity-10 text-[10px] font-black tracking-[0.8em] uppercase font-mono">
             HIGHPHAUS // ESTD. 2025
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
