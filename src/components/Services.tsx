'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import Image from 'next/image'

const SERVICES = [
  {
    id: '01',
    title: 'Growth Systems',
    description: 'End-to-end marketing system designed to attract, convert, and scale.',
    result: 'Revenue Infrastructure',
    image: '/images/services/growth-systems.png'
  },
  {
    id: '02',
    title: 'Content Marketing',
    description: 'Strategic content creation focused on engagement and brand growth.',
    result: 'Attention Architecture',
    image: '/images/services/content-marketing.png'
  },
  {
    id: '03',
    title: 'Paid Advertising',
    description: 'Meta and Google ads optimized for leads and conversions.',
    result: 'Growth Precision',
    image: '/images/services/paid-advertising.png'
  },
  {
    id: '04',
    title: 'Brand Strategy',
    description: 'Positioning, messaging, and identity to differentiate your brand.',
    result: 'Identity Core',
    image: '/images/services/brand-strategy.png'
  }
]

export default function Services() {
  const [expandedDesktop, setExpandedDesktop] = useState(0)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0)

  return (
    <section className="section !py-32 lg:!py-64 bg-hp-black relative overflow-hidden" id="services">
      <div className="container lg:mb-80" style={{ marginBottom: '128px' }}>
        <div className="max-w-4xl">
          <p className="eyebrow !text-hp-beige/40 mb-4 tracking-[0.4em]">Our Expertise</p>
          <h2 className="display-2 text-hp-white uppercase font-bold leading-none mb-8">Our Services</h2>
          <p className="body-lg max-w-xl !text-hp-beige/60 font-medium">
            Strategic growth solutions engineered for scale. We build systems that drive consistent results and long-term brand authority.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 items-center lg:mb-96"
              style={{ 
                gap: '16px',
                marginBottom: index === SERVICES.length - 1 ? '0' : '160px'
              }}
            >
              {/* IMAGE SIDE */}
              <div className={`relative h-[24rem] md:h-[30rem] lg:h-[38rem] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-hp-maroon/20 group order-1 ${
                 index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 transition-opacity duration-1000 opacity-60 group-hover:opacity-100"
                >
                  <Image 
                    src={service.image}
                    alt={`${service.title} service visualization`}
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-hp-black via-transparent to-transparent opacity-60" />
                
                {/* ID DECOR */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8">
                   <span className="eyebrow text-hp-beige/20 text-[8px] md:text-[10px] font-mono">{service.id} // SYNC</span>
                </div>
              </div>

              {/* TEXT SIDE */}
              <div className={`space-y-6 md:space-y-8 lg:max-w-xl order-2 ${
                 index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <div className="space-y-4 md:space-y-6">
                  <span className="inline-flex text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-hp-beige/40">
                    // {service.result}
                  </span>
                  <h3 className="text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[3.5rem] text-hp-white uppercase font-black leading-[1.1]">
                    {service.title}
                  </h3>
                </div>

                <p className="body-lg !text-hp-beige/80 font-medium leading-[1.6] text-[1rem] md:text-[clamp(1rem,1.15vw,1.15rem)] max-w-prose">
                  {service.description}
                </p>

                <div className="pt-4 md:pt-6">
                  <Magnetic>
                    <a href="#contact" className="btn-primary py-4 px-10 text-[11px] !bg-hp-white !text-hp-black hover:!bg-hp-maroon hover:!text-hp-white transition-all duration-500 shadow-2xl shadow-hp-black/20">
                      Explore →
                    </a>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BACKGROUND ACCENTS */}
      <div className="absolute left-0 bottom-0 w-full h-[50%] pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(74,15,28,0.08),transparent_70%)]" />
    </section>
  )
}
