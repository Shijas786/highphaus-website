'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Intro() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0])

  return (
    <section
      ref={targetRef}
      className="section bg-hp-maroon relative z-10"
      id="philosophy"
    >
      <div className="container">
        <motion.div
          style={{ opacity, y }}
          className="max-w-screen-lg mx-auto"
        >
          <p className="eyebrow text-hp-white mb-10 block font-bold">Our Philosophy</p>

          <h2 className="display-2 text-hp-beige uppercase mb-16 leading-none">
            We don’t just post. We build systems that grow your business.
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="divider bg-hp-white/20 mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <p className="body-lg !text-hp-beige/90 font-medium leading-[1.8] max-w-prose">
                Most brands struggle because they focus on random content.
              </p>
              <p className="body-lg !text-hp-beige/90 font-medium leading-[1.8] max-w-prose">
                We build structured growth systems combining content, paid ads, and strategy to consistently attract, convert, and scale.
              </p>
            </div>
            <div className="space-y-8">
              <p className="body-lg !text-hp-beige/70 font-medium leading-[1.8] max-w-prose">
                No guesswork. No random posting.<br />
                Only systems that work.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.05] select-none text-hp-white font-black text-[30vw] pointer-events-none -z-10 leading-none">
        START
      </div>
    </section>
  )
}
