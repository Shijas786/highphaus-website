'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import DecodedText from './DecodedText'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const steps = [
    {
      step: '01',
      title: 'Position',
      desc: 'We define your brand positioning, messaging, and content direction for market dominance.'
    },
    {
      step: '02',
      title: 'Build',
      desc: 'We create high-performing content and marketing systems tailored for high-fidelity conversion.'
    },
    {
      step: '03',
      title: 'Scale',
      desc: 'We run paid ads and SEO services to generate consistent leads and predictable revenue.'
    }
  ]

  return (
    <section id="about" ref={ref} className="section bg-hp-white border-t border-hp-maroon/10">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 lg:gap-20 lg:items-center">
          
          {/* IMAGE SIDE (SMALLER CARD) */}
          <div className="relative h-[24rem] sm:h-[30rem] lg:h-[38rem] overflow-hidden rounded-[2rem] lg:rounded-[3rem] border border-hp-maroon/20 bg-hp-black shadow-[0_40px_120px_rgba(74,15,28,0.12)]">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-[-10%] bg-gradient-to-br from-hp-maroon/25 via-hp-black to-hp-black"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_52%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/highplogo-Beige.png" 
                alt="Highphaus Logo" 
                className="w-64 sm:w-80 lg:w-[28rem] opacity-90 select-none pointer-events-none transition-all duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="rounded-[1.5rem] border border-hp-maroon/15 bg-hp-black/55 p-5 backdrop-blur-md sm:p-6">
                <p className="eyebrow text-hp-white mb-2">Established 2025</p>
                <p className="body-sm text-hp-white/80">Kallara, Trivandrum</p>
              </div>
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="space-y-10 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="eyebrow mb-4 font-bold">
                <DecodedText text="The Process" delay={0.2} variant="maroon" />
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="divider-accent bg-hp-maroon"
              />
            </motion.div>

            <div className="space-y-8 lg:space-y-10">
              <div className="space-y-4">
                <h2 className="display-3 text-hp-black font-black uppercase tracking-tighter leading-none">
                  How we scale brands
                </h2>
                <p className="text-xl lg:text-2xl font-black uppercase tracking-tight text-hp-maroon">
                  3 Steps:
                </p>
              </div>

              <div className="space-y-10 pt-8 border-t border-hp-maroon/10">
                {steps.map((s, i) => (
                  <motion.div 
                    key={s.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + (i * 0.2), duration: 0.8 }}
                    className="group"
                  >
                    <div className="flex gap-6 items-start">
                      <span className="text-3xl lg:text-4xl font-black text-hp-maroon/20 group-hover:text-hp-maroon transition-colors duration-500 font-mono">
                        {s.step}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-hp-black">
                          {s.title}
                        </h3>
                        <p className="body-md text-hp-black font-medium leading-relaxed max-w-xl">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-4 lg:pt-6"
            >
              <a
                href="#contact"
                className="btn-primary !bg-hp-maroon !text-hp-white hover:!bg-hp-black hover:!text-hp-white transition-all duration-300 inline-flex w-fit items-center gap-2"
              >
                Work With Us →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
