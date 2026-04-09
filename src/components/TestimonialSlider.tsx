'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
  { n: "Sarah Chen", r: "Global CD // Flux Media", q: "The level of technical precision Highphaus brought to our multi-national scaling was unprecedented. They don't just build websites; they architect global systems.", outcome: "+300% Scaling" },
  { n: "Marcus Thorne", r: "Founder // Vanguard", q: "Awwwards-level design combined with enterprise-grade stability. The Crimson Masterpiece redesign moved our brand into a different league entirely.", outcome: "Awwwards-Tier" },
  { n: "Elena Rossi", r: "Ops Director // Aether", q: "Performance marketing that actually performs. Their performance-first engineering DNA delivered a 2.5x increase in our global operation throughput.", outcome: "2.5x ROI" },
  { n: "Julian Vane", r: "Head of Digital // Nebula", q: "Clean, sophisticated, and incredibly interactive. Highphaus understands the 'Wonder' factor required to dominate established markets in 2026.", outcome: "Global Depth" }
]

export default function TestimonialSlider() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
    
    const handleResize = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="section bg-hp-white border-b border-hp-black/5 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12 text-hp-black">
          <div className="space-y-6">
            <h2 className="display-2 font-black tracking-tight uppercase leading-none">
              GLOBAL<br />FEEDBACK.
            </h2>
            <div className="h-[2px] w-48 bg-hp-maroon shadow-[0_0_15px_rgba(74,15,28,0.5)]" />
          </div>
          <p className="max-w-[280px] text-[10px] font-black tracking-[0.4em] uppercase opacity-40 leading-loose md:text-right font-mono text-hp-black">
            ESTABLISHED CORPORATE PARTNERSHIPS // MEASURABLE SUCCESS METRICS FROM THE GLOBAL ORBIT.
          </p>
        </div>

        <motion.div 
          ref={carousel}
          drag="x"
          dragConstraints={{ left: -width, right: 0 }}
          className="flex gap-6 lg:gap-12 cursor-grab active:cursor-grabbing pb-12"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
              className="min-w-[85vw] md:min-w-[600px] p-8 lg:p-12 bg-hp-white rounded-[2rem] lg:rounded-[3rem] border border-hp-maroon/10 relative overflow-hidden group hover:border-hp-maroon transition-all duration-700 shadow-2xl shadow-hp-maroon/5 mt-8 lg:mt-12"
            >
               <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-10 text-hp-maroon">
                       {[...Array(5)].map((_, j) => (
                         <div key={j} className="w-2 h-2 rounded-full bg-hp-maroon" />
                       ))}
                    </div>
                    <p className="text-xl md:text-3xl font-medium tracking-tight text-hp-black mb-8 lg:mb-12 uppercase leading-snug">
                       "{t.q}"
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10 border-t border-hp-black/5">
                     <div className="space-y-2">
                        <span className="text-fluid-md font-black block text-hp-maroon">{t.outcome}</span>
                        <div className="h-[1px] w-12 bg-hp-maroon/20" />
                     </div>
                     <div className="text-right">
                        <span className="text-lg font-black text-hp-black block uppercase tracking-tighter">{t.n}</span>
                        <span className="text-[10px] font-black uppercase text-hp-black/40 tracking-[0.4em] font-mono">{t.r}</span>
                     </div>
                  </div>
               </div>
               {/* Detail Grid Overlay */}
               <div className="absolute top-0 right-0 p-12 opacity-5 font-mono text-[80px] font-black select-none pointer-events-none group-hover:opacity-10 transition-opacity text-hp-black">
                 {i+1}
               </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Interaction Prompt */}
        <div className="mt-12 flex justify-center items-center gap-6 text-[10px] font-black tracking-[0.5em] uppercase opacity-20 font-mono text-hp-black">
           <div className="h-[1px] w-12 bg-hp-black" />
           <span>DRAG TO EXPLORE ORBIT</span>
           <div className="h-[1px] w-12 bg-hp-black" />
        </div>
      </div>
    </section>
  )
}
