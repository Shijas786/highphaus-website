'use client'

import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Cpu, Globe2, Layers, BarChart3 } from 'lucide-react'
import Image from 'next/image'
import Magnetic from './Magnetic'

const PROJECTS = [
  { 
    id: '01', 
    name: "NutriBrunch", 
    category: "Wellness & Nutrition", 
    metric: "Growth Engine", 
    tag: "WELLNESS", 
    size: "large", 
    img: "/images/nutribrunch.png", 
    tech: "STRATEGY // BRANDING // ADS",
    link: "https://www.instagram.com/nutribrunch.in?igsh=MTBnd2F5dW9qNnloOQ=="
  },
  { 
    id: '02', 
    name: "Parinaya Boutique", 
    category: "Luxury Fashion", 
    metric: "Brand Authority", 
    tag: "FASHION", 
    size: "small", 
    img: "/images/parinaya.png", 
    tech: "UI/UX // CATALOG // SOCIAL",
    link: "https://www.instagram.com/parinayaboutique?igsh=MTRzY2xua3poNmg1"
  },
  { id: '03', name: "Nebula Systems", category: "Core Strategy", metric: "5M+ Users", tag: "SAAS", size: "small", img: "/images/project-3.png", tech: "GO // RUST // CLOUD" },
  { id: '04', name: "Prism Alpha", category: "Service Exp", metric: "Global Depth", tag: "INFRA", size: "large", img: "/images/project-4.png", tech: "UI/UX // CD // OPS" }
]

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse Follow Refinement
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1 }}
      className={`group relative flex flex-col overflow-hidden bg-hp-black rounded-[2rem] lg:rounded-[3rem] mb-6 lg:mb-12 border border-hp-maroon/10 tech-grid cursor-pointer will-change-transform ${
        project.size === 'large' 
          ? 'h-[450px] md:h-[800px] lg:col-span-2' 
          : 'h-[400px] md:h-[600px] lg:col-span-1'
      }`}
      onClick={() => {
        if ('link' in project && (project as any).link) {
          window.open((project as any).link, '_blank')
        } else {
          window.location.href = '#contact'
        }
      }}
    >
      {/* Image Reveal */}
      <motion.div 
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
        className="absolute inset-0 w-full h-full will-change-[clip-path]"
      >
        <Image 
          src={project.img} 
          alt={`Project showcase: ${project.name} - ${project.category} result`}
          fill
          priority={index < 2}
          className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] contrast-125"
        />
      </motion.div>
      
      {/* Technical Spec Mouse Follower */}
      {isHovered && (
        <motion.div
           style={{ left: mouseXSpring, top: mouseYSpring, x: "-50%", y: "-50%" }}
           className="absolute z-50 pointer-events-none hidden md:block"
        >
           <div className="bg-hp-black/90 backdrop-blur-3xl border border-hp-maroon p-6 rounded-2xl min-w-[200px] shadow-[0_0_20px_rgba(74, 15, 28, 0.3)] transition-all duration-300">
              <div className="flex gap-4 items-center mb-4">
                 <Cpu className="w-5 h-5 text-hp-maroon" />
                 <span className="text-[10px] font-black tracking-[0.4em] text-hp-white uppercase font-mono">SPEC // DETAILED</span>
              </div>
              <div className="h-[1px] w-full bg-hp-maroon/10 mb-4" />
              <p className="text-[10px] font-black text-hp-maroon uppercase tracking-widest font-mono">
                {project.tech}
              </p>
           </div>
        </motion.div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-hp-maroon/20 via-hp-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-hp-black/20 via-hp-black/10 to-transparent" />

      {/* Metadata */}
      <div className="absolute top-6 left-6 right-6 lg:top-10 lg:left-10 lg:right-10 flex justify-between items-start z-10 font-mono text-hp-white">
         <div className="px-3 py-1.5 lg:px-4 lg:py-2 border border-hp-maroon/20 rounded-full bg-hp-black/40 backdrop-blur-md">
            <span className="text-[9px] lg:text-[10px] font-black tracking-widest uppercase group-hover:text-hp-maroon transition-colors">
              {project.tag} // {project.id}
            </span>
         </div>
         <Magnetic>
            <div className="w-12 h-12 lg:w-14 lg:h-14 border border-hp-maroon/20 rounded-full flex items-center justify-center bg-hp-black/10 backdrop-blur-md group-hover:bg-hp-maroon group-hover:text-hp-white group-hover:border-hp-maroon transition-all duration-700 shadow-[0_0_15px_rgba(74, 15, 28, 0.2)]">
               <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-45 transition-transform" />
            </div>
         </Magnetic>
      </div>

      {/* Content */}
      <div className="absolute bottom-8 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 z-10">
         <div className="flex items-center gap-4 mb-3 lg:mb-4">
            <div className="h-[2px] w-6 bg-hp-maroon group-hover:w-16 transition-all duration-700" />
            <p className="text-[9px] lg:text-[10px] font-black tracking-[0.5em] text-hp-beige group-hover:text-hp-white uppercase font-mono transition-colors">{project.category}</p>
         </div>
         <Magnetic>
            <h3 className="text-fluid-md lg:text-5xl font-black tracking-tighter text-hp-white leading-none uppercase mb-4 lg:mb-6 drop-shadow-2xl transition-all duration-700">
               {project.name}
            </h3>
         </Magnetic>
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 lg:w-12 bg-hp-maroon" />
            <p className="text-lg lg:text-xl font-bold tracking-tight text-hp-white font-mono">{project.metric}</p>
         </div>
      </div>
    </motion.div>
  )
}

export default function WorkGrid() {
  return (
    <section id="work" className="section bg-hp-black relative border-y border-hp-maroon">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-32 gap-8 lg:gap-12 text-hp-white">
          <div className="space-y-6">
            <h2 className="display-2 font-black tracking-tight uppercase leading-none cursor-pointer">
              SELECTED<br />ORBIT.
            </h2>
            <div className="h-[2px] w-32 lg:w-48 bg-hp-maroon shadow-[0_0_15px_rgba(74, 15, 28, 0.5)]" />
          </div>
          <p className="max-w-[280px] text-[10px] font-black tracking-[0.4em] uppercase leading-loose text-hp-beige/60 md:text-right font-mono">
            ESTABLISHING HIGH-PERFORMANCE DIGITAL ARCHITECTURE FOR ESTABLISHED MULTI-NATIONAL OPERATIONS // ESTD. 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
