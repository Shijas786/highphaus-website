'use client'

import { motion } from 'framer-motion'

const STATS = [
  { label: 'Conversion Lift', value: '+340%', subLabel: 'E-Commerce average' },
  { label: 'Project ROAS', value: '8.4x', subLabel: 'High-performance scaling' },
  { label: 'Brand Recognition', value: '5M+', subLabel: 'Monthly impressions' },
  { label: 'Technical Uptime', value: '100%', subLabel: 'Architectural stability' },
]

export default function Highlights() {
  return (
    <section className="section bg-hp-maroon relative overflow-hidden" id="proof">
      <div className="container">
        
        {/* NEW HEADING & DESCRIPTION */}
        <div className="max-w-4xl mb-24 lg:mb-32">
          <p className="eyebrow !text-hp-white/60 mb-4 tracking-[0.4em]">The Results</p>
          <h2 className="display-2 text-hp-white uppercase font-black leading-tight mb-8">
            Proof over promises
          </h2>
          <p className="body-lg max-w-2xl !text-hp-white/80 font-medium">
             We focus on results that matter — reach, leads, and growth.
          </p>
        </div>

        {/* STATISTICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 lg:gap-32 pb-24 lg:pb-32">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              className="group"
            >
              <motion.div 
                variants={{
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 }
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="divider-accent bg-hp-white/30 mb-4 lg:mb-12" 
              />
              <p className="text-[8px] md:text-[10px] uppercase font-mono text-hp-white mb-2 lg:mb-6 font-bold tracking-[0.2em]">{s.label}</p>
              <p className="text-[clamp(1.5rem,5vw,5rem)] lg:text-7xl text-hp-white mb-1 lg:mb-4 group-hover:text-hp-beige transition-colors duration-500 font-black leading-none uppercase tracking-tighter">
                {s.value}
              </p>
              <p className="text-[7px] md:text-[9px] font-medium text-hp-white/40 leading-tight uppercase tracking-wider">{s.subLabel}</p>
            </motion.div>
          ))}
        </div>

        {/* FUTURE VISUAL PROOF PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="border border-hp-white/10 bg-hp-black/20 rounded-[2rem] p-12 lg:p-24 flex flex-col items-center text-center space-y-8"
        >
          <div className="w-16 h-16 rounded-full border border-hp-white/20 flex items-center justify-center">
            <span className="text-hp-white/40 text-2xl font-light">+</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-hp-white uppercase font-bold tracking-widest text-sm">Visual Evidence Case Studies</h3>
            <p className="text-hp-white/40 text-[10px] font-mono uppercase tracking-[0.2em]">Screenshots // Client Results // Growth Deep Dives</p>
          </div>
        </motion.div>

      </div>

      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-0 right-0 w-[40%] h-[100%] pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
    </section>
  )
}
