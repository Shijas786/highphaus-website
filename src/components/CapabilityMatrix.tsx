'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Shield, BarChart3, Globe2, Layers } from 'lucide-react'
import Magnetic from './Magnetic'

const STRATEGIES = [
  { id: 'Phase // 01', title: "Market Growth", icon: BarChart3, desc: "Data-driven scale tactics for multi-node operations.", outcome: "300% Scaling" },
  { id: 'Phase // 02', title: "Core Systems", icon: Shield, desc: "Building secure, legacy-free systems for global deployment.", outcome: "99.9% Integrity" },
  { id: 'Phase // 03', title: "UX Design", icon: Layers, desc: "Standardized digital experiences for multi-channel orbits.", outcome: "Award-Level" },
  { id: 'Phase // 04', title: "Creative Ops", icon: Globe2, desc: "Performance-first engineering for total market reach.", outcome: "Total Scale" }
]

const TiltCard = ({ s, i }: { s: typeof STRATEGIES[0], i: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 })
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    
    x.set(clientX / width - 0.5)
    y.set(clientY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
      className="p-8 lg:p-12 hover:bg-hp-white hover:text-hp-black transition-all duration-700 group md:h-[550px] flex flex-col justify-between relative border border-hp-maroon/20 hover:border-hp-white rounded-[2rem] lg:rounded-[3rem] bg-hp-black/40 backdrop-blur-md cursor-none"
    >
       <div style={{ transform: "translateZ(50px)" }} className="relative z-10 transition-all duration-500">
          <span className="text-[10px] font-black tracking-[0.4em] text-hp-beige/40 group-hover:text-hp-black/40 mb-10 block uppercase font-mono">{s.id}</span>
          <h3 className="text-fluid-md font-black tracking-tighter mb-8 uppercase leading-[0.9]">
            {s.title}
          </h3>
          <p className="text-hp-beige/60 group-hover:text-hp-black/60 text-sm font-medium tracking-[0.1em] leading-relaxed uppercase max-w-[200px] font-mono">
            {s.desc}
          </p>
       </div>
       <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <Magnetic>
            <div className="w-16 h-16 bg-hp-white/5 group-hover:bg-hp-black/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-hp-black transition-all duration-500">
              <s.icon className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:text-hp-white" />
            </div>
          </Magnetic>
          <div className="flex flex-col gap-2 font-mono">
             <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-20 group-hover:opacity-40">Outcome //</span>
             <span className="text-2xl font-black tracking-tight text-hp-maroon shadow-[0_0_10px_rgba(74,15,28,0.2)]">{s.outcome}</span>
          </div>
       </div>
       
       {/* Card Glow Layer */}
       <div className="absolute inset-0 bg-hp-white/0 group-hover:bg-hp-white/5 transition-colors duration-700 pointer-events-none rounded-[3rem]" />
    </motion.div>
  )
}

export default function CapabilityMatrix() {
  return (
    <section id="services" className="section bg-hp-black border-y border-hp-maroon/20 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12 text-hp-white">
          <div className="space-y-6">
            <h2 className="display-2 font-black tracking-tight uppercase leading-none cursor-pointer">
              STRATEGIC<br />EXCELLENCE.
            </h2>
            <div className="h-[2px] w-48 bg-hp-maroon shadow-[0_0_15px_rgba(74,15,28,0.5)]" />
          </div>
          <p className="max-w-[320px] text-[10px] font-black tracking-[0.4em] uppercase opacity-40 leading-loose md:text-right font-mono text-hp-beige">
            ESTABLISHING HIGH-PERFORMANCE DIGITAL ARCHITECTURE FOR MULTI-NATIONAL OPERATIONS // PERFORMANCE-FIRST DNA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STRATEGIES.map((s, i) => (
            <TiltCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
