'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const WORKS = [
  {
    num: '01',
    title: 'NutriBrunch',
    category: 'Growth Systems + Strategy',
    year: '2025',
    result: 'High-Performance System',
    image: '/images/Nutribrunch.jpeg',
  },
  {
    num: '02',
    title: 'Parinaya',
    category: 'Growth Systems + Strategy',
    year: '2026',
    result: 'Market Architecture',
    image: '/images/Parinaya.jpeg',
  },

]

export default function Work() {
  const targetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollWidth, setScrollWidth] = useState(0)

  useEffect(() => {
    const calcWidth = () => {
      if (contentRef.current) {
        const width = contentRef.current.scrollWidth
        const viewport = window.innerWidth
        setScrollWidth(-(width - viewport))
      }
    }
    calcWidth()
    window.addEventListener('resize', calcWidth)
    return () => window.removeEventListener('resize', calcWidth)
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Smooth out the transform
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, scrollWidth])
  const x = useSpring(xTransform, { damping: 20, stiffness: 100 })

  return (
    <section 
      ref={targetRef} 
      className="relative bg-hp-white"
      id="portfolio"
    >
      {/* SECTION HEADER - NOW IN FLOW SO IT DOESN'T HIDE SCROLLING IMAGES */}
      <div className="container pt-28 lg:pt-40 pb-12 lg:pb-20 overflow-hidden">
        <div className="max-w-xl">
          <p className="eyebrow text-hp-maroon mb-2 lg:mb-4 uppercase opacity-60">Selected Projects</p>
          <h2 className="display-2 text-hp-black uppercase leading-none mb-6">Portfolio</h2>
          <p className="body-md text-hp-maroon font-bold leading-relaxed">
            We focus on results, not just visuals. Here’s how we’ve helped brands grow through content, ads, and strategy.
          </p>
        </div>
      </div>

      <div className="relative h-[300vh] lg:h-[500vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div 
            ref={contentRef}
            style={{ x }} 
            className="flex gap-8 lg:gap-12 pl-[clamp(1.5rem,5vw,6rem)] pr-24"
          >
            {WORKS.map((w, i) => (
              <div 
                key={w.num} 
                className="group relative flex-shrink-0 w-[85vw] lg:w-[45vw] h-[55vh] lg:h-[65vh] bg-hp-white border border-hp-maroon/10 shadow-2xl shadow-hp-maroon/5 overflow-hidden"
              >
                <div 
                   className="absolute inset-0 transition-all duration-700 opacity-90 lg:group-hover:opacity-100 scale-110 lg:group-hover:scale-100 bg-cover bg-center"
                   style={{ backgroundImage: `url(${w.image})` }}
                />

                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-10 z-10 bg-gradient-to-t from-hp-black/60 via-transparent to-transparent">
                  <div className="flex justify-between items-start">
                    <span className="eyebrow text-hp-black bg-hp-white/90 px-2 py-1 backdrop-blur-sm border border-hp-maroon/10 text-[9px] lg:text-[10px]">{w.num} // {w.year}</span>
                    <div className="bg-hp-maroon text-hp-white eyebrow text-[9px] lg:text-[10px] px-3 py-1 shadow-lg shadow-hp-maroon/20">{w.result}</div>
                  </div>

                  <div className="space-y-3 lg:space-y-4">
                    <p className="eyebrow text-hp-white font-bold opacity-80 text-[10px] lg:text-[11px]">{w.category}</p>
                    <h3 className="display-3 text-hp-white uppercase leading-none lg:group-hover:translate-x-4 transition-transform duration-500 [text-shadow:0_2px_15px_rgba(0,0,0,0.5)]">
                      {w.title}
                    </h3>
                  </div>
                </div>
                
                <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-10 text-hp-white opacity-0 lg:group-hover:opacity-100 translate-x-4 lg:group-hover:translate-x-0 transition-all duration-500">
                  <span className="text-3xl lg:text-4xl">→</span>
                </div>
              </div>
            ))}

            {/* END OF STORY CARD (FUTURE CLIENTS) */}
            <div className="flex-shrink-0 w-[85vw] lg:w-[35vw] h-[55vh] lg:h-[65vh] flex flex-col justify-center items-center text-hp-black bg-hp-white border border-hp-maroon/20 group cursor-pointer lg:hover:bg-hp-maroon transition-all duration-700 overflow-hidden relative p-8">
               <div className="absolute inset-0 bg-hp-maroon opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />
               <div className="relative z-10 flex flex-col items-center">
                 <p className="eyebrow text-hp-maroon lg:group-hover:text-hp-white mb-4 transition-colors">You / Your Brand</p>
                 <h4 className="display-3 uppercase mb-6 lg:mb-8 lg:group-hover:text-hp-white transition-colors text-center leading-none">Future<br/>Clients</h4>
                 <a href="#contact" className="btn-primary !bg-hp-black !text-hp-white lg:group-hover:!bg-hp-white lg:group-hover:!text-hp-black shadow-none border border-hp-maroon/20 !px-8">Scale Your Brand →</a>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND DECOR (GHOST TEXT) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] lg:opacity-[0.05] select-none text-hp-maroon font-black text-[40vw] lg:text-[35vw] flex items-center justify-center -z-10 overflow-hidden leading-none uppercase">
        Projects
      </div>
    </section>
  )
}
