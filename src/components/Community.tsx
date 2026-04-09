'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Community() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <section 
      ref={ref}
      id="community"
      className="section bg-hp-black relative overflow-hidden border-t border-hp-maroon/10"
    >
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="eyebrow !text-hp-maroon mb-4 tracking-[0.4em]">Community Angle</p>
              <h2 className="display-2 text-hp-white uppercase leading-[0.92]">
                More than<br/>an agency
              </h2>
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="divider-accent bg-hp-maroon" 
            />

            <div className="space-y-6">
              <p className="body-lg !text-hp-beige/90 font-medium leading-[1.8] max-w-prose">
                Highphaus is a community of builders, freelancers, and founders. We don’t work like a corporate. We collaborate, build, and grow together.
              </p>
              <p className="body-lg !text-hp-beige/60 font-medium leading-[1.8] max-w-prose">
                Our ecosystem thrives on shared expertise and relentless execution. When you work with us, you are not just hiring a service . You are joining a collective geared for exponential scale.
              </p>
            </div>
          </motion.div>

          {/* VISUAL SIDE (Brand Signature) */}
          <div className="relative h-[25rem] lg:h-[35rem] rounded-[2.5rem] overflow-hidden bg-hp-white p-12 lg:p-20 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-[url('/images/highplogo-black.png')] bg-contain bg-center bg-no-repeat transition-all duration-1000" 
            />
            {/* Subtle Inner Shadow for Depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.05)]" />
          </div>

        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-hp-maroon/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    </section>
  )
}
