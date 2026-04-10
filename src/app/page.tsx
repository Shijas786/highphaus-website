'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

import LoadingScreen from '@/components/LoadingScreen'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Work from '@/components/Work'
import About from '@/components/About'
import Community from '@/components/Community'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Magnetic from '@/components/Magnetic'

function Vision() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })
  const words = ['Ready', 'to', 'scale', 'your', 'brand']

  return (
    <section ref={ref} id="vision-monolith" className="h-screen flex flex-col justify-center items-center border-t border-hp-white/10 bg-hp-maroon relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[30vw] font-black text-hp-white/[0.03] uppercase tracking-tighter leading-none">SCALE</span>
      </div>
      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1 }} className="flex flex-col items-center mb-24 lg:mb-32">
          <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="divider-accent bg-hp-white/30 mb-10" />
          <p className="eyebrow text-hp-white font-bold tracking-[0.4em] uppercase">Next Step</p>
        </motion.div>
        <motion.h2 className="display-1 text-hp-white uppercase mb-32 lg:mb-48 leading-[1.1] tracking-tight flex flex-wrap justify-center gap-x-4 lg:gap-x-6 gap-y-4">
          {words.map((word, i) => (
            <span key={i} className="reveal-clip inline-block">
              <motion.span className="block" initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}>{word}</motion.span>
            </span>
          ))}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7, duration: 0.8 }} className="body-lg lg:whitespace-nowrap text-hp-beige font-medium leading-[1.8] text-center mb-24 lg:mb-32">
          We build structured growth systems that consistently attract, convert, and scale.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9, duration: 0.8 }} className="flex flex-col sm:flex-row gap-8 lg:gap-12 justify-center items-center">
          <Magnetic>
            <a href="#contact" className="btn-primary text-sm px-12 py-5 hover:!bg-hp-black hover:!text-hp-white transition-all duration-300 shadow-2xl shadow-hp-black/20">GET A FREE STRATEGY CALL →</a>
          </Magnetic>
          <Magnetic>
            <a href="https://wa.me/917034206108" className="btn-outline text-sm px-12 py-5 !bg-hp-black !text-hp-white border-hp-white/10 hover:!bg-hp-white hover:!text-hp-black transition-all duration-300 shadow-2xl shadow-hp-black/20">CHAT ON WHATSAPP →</a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}

// REFRESH_HASH: 1775642401
export default function Home() {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <main className="bg-transparent min-h-screen">
      {loaded && <Cursor />}

      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />

          <div id="hero">
            <Hero />
          </div>

          <Intro />
          <About />
          <Services />
          <Work />
          <Community />
          <Vision />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  )
}
