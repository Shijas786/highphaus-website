'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import Magnetic from './Magnetic'
import DecodedText from './DecodedText'
import Starfield from './Starfield'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 40, stiffness: 300, restDelta: 0.001 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const facadeClip = useMotionTemplate`inset(0 ${useTransform(springX, (x) => `calc(100% - ${x}px)`)} 0 0)`
  const blueprintClip = useMotionTemplate`inset(0 0 0 ${useTransform(springX, (x) => `${x}px`)})`

  useEffect(() => {
    // Set initial position to center
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2)
    }

    const handleInput = (clientX: number) => {
      if (!ref.current) return
      const { left } = ref.current.getBoundingClientRect()
      mouseX.set(clientX - left)
    }

    const onMouseMove = (e: MouseEvent) => {
      // Desktop-only mouse follow (automatic)
      if (window.matchMedia('(min-width: 1024px)').matches) {
        handleInput(e.clientX)
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      // Mobile-friendly touch drag (anywhere in hero)
      if (e.touches[0]) {
        handleInput(e.touches[0].clientX)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [mouseX])

  const HeroContent = ({ variant }: { variant: 'solid' | 'outline' }) => (
    <div className="container relative z-10 text-center flex flex-col items-center pointer-events-none">
      {/* TOP LINE & EYEBROW (STUDIO PRECISION) */}
      <div className="flex flex-col items-center mb-16 lg:mb-20">
        <div className={`h-[2px] w-16 lg:w-24 mb-10 lg:mb-12 ${variant === 'solid' ? 'bg-hp-white shadow-[0_0_20px_#FFFFFF]' : 'bg-hp-maroon shadow-[0_0_20px_#4A0F1C]'}`} />

        <p className={`uppercase text-[10px] lg:text-[12px] tracking-[0.6em] lg:tracking-[0.8em] mb-6 ${variant === 'solid' ? 'text-hp-white font-medium' : 'text-hp-maroon'}`}>
          <DecodedText text="FOR FOUNDERS. BUILDERS. BRANDS." delay={0.6} variant="white" />
        </p>
      </div>

      {/* HEADLINE (GOLDEN RATIO CALIBRATION) */}
      <h1
        className={`uppercase mb-16 lg:mb-24 leading-[1.15] lg:leading-[1.15] tracking-[-0.02em] ${variant === 'solid' ? 'text-hp-white' : 'text-transparent'}`}
        style={variant === 'outline'
          ? { WebkitTextStroke: '1.2px rgba(255,255,255,0.5)' }
          : {}
        }
      >
        

        <span 
          className={`block text-[clamp(2rem,10vw,6.5rem)] font-black ${
            variant === 'solid' 
              ? 'text-hp-maroon [text-shadow:0_0_15px_rgba(74,15,28,0.3)]' 
              : 'text-transparent'
          }`}
          style={variant === 'outline' ? { WebkitTextStroke: '1.2px rgba(255,255,255,0.5)' } : {}}
        >
          WE BUILD GROWTH SYSTEMS
        </span>
      </h1>

      {/* DESCRIPTION (EXPANSIVE CINEMATIC WRAP) */}
      <p className={`max-w-2xl lg:max-w-3xl mx-auto mb-20 lg:mb-32 text-base lg:text-2xl leading-relaxed font-light tracking-wide ${variant === 'solid' ? 'text-hp-white/80' : 'text-white/40'}`}>
        Content. Ads. Strategy. Built to scale your business.
      </p>

      {/* BUTTONS (WORLD-CLASS FOOTPRINT) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16 pointer-events-auto">
        <Magnetic>
          <a 
            href="#portfolio"
            className={`${variant === 'solid' 
              ? 'btn-primary' 
              : 'btn-outline !border-hp-maroon !text-hp-maroon hover:!bg-hp-white hover:!text-hp-black'
            } !text-[11px] lg:!text-sm !px-10 !py-4 !tracking-[0.15em] !font-bold transition-all duration-300 uppercase w-full sm:w-auto`}
          >
            OUR PORTFOLIO →
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="#contact"
            className={`${variant === 'solid'
              ? 'btn-outline !border-hp-white !text-hp-white hover:!bg-hp-white hover:!text-hp-black'
              : 'btn-outline !border-hp-maroon/60 !text-hp-maroon/80 hover:!bg-hp-white hover:!text-hp-black'
            } !text-[11px] lg:!text-sm !px-10 !py-4 !tracking-[0.15em] !font-bold transition-all duration-300 uppercase w-full sm:w-auto`}
          >
            GET A FREE STRATEGY CALL →
          </a>
        </Magnetic>
      </div>
      
      <p className={`mt-16 text-[11px] lg:text-[13px] tracking-wide font-light ${variant === 'solid' ? 'text-hp-white/40' : 'text-white/20'}`}>
        Built for brands that want to scale, not just post.
      </p>
    </div>
  )

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent touch-pan-y">

      <motion.div
        style={{ y, scale: heroScale, clipPath: blueprintClip }}
        className="absolute inset-0 flex items-center justify-center bg-hp-black overflow-hidden will-change-[clip-path]"
      >
        {/* Architectural Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} 
        />
        
        {/* Cinematic HUD Elements - Monochromatic Only */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-hp-black/40 via-transparent to-hp-black" />
        <HeroContent variant="outline" />
      </motion.div>

      {/* FACADE SIDE */}
      <motion.div
        style={{ y, scale: heroScale, clipPath: facadeClip }}
        className="absolute inset-0 flex items-center justify-center bg-hp-black will-change-[clip-path]"
      >
        <div 
          className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center transition-all duration-700 opacity-60 lg:opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hp-black/60 to-hp-black" />
        <HeroContent variant="solid" />
      </motion.div>

      {/* CENTER DIVIDER */}
      <motion.div
        style={{ x: springX }}
        className="absolute top-0 bottom-0 w-32 -ml-16 flex items-center justify-center z-50 pointer-events-none group"
      >
        <div className="w-[1.5px] h-full bg-hp-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-hp-white/60 transition-colors" />
        
        {/* Tactile Drag Handle */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-hp-white/20 bg-hp-black/90 backdrop-blur-xl flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shadow-2xl"
        >
           <span className="text-hp-white text-xs select-none">↔</span>
        </motion.div>
      </motion.div>

    </section>
  )
}