import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import { useHUD } from '@/context/HUDContext'

const NAV_LINKS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { hudActive, toggleHUD } = useHUD()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
          scrolled ? 'bg-hp-black/90 backdrop-blur-md border-b border-hp-maroon' : ''
        }`}
      >
        <div className="container flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Magnetic>
            <a href="#" className="eyebrow text-hp-white tracking-[0.25em] lg:tracking-[0.3em] hover:text-hp-maroon transition-colors duration-300 p-2 text-[10px] lg:text-[11px]">
              HIGHPHAUS
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  className="eyebrow text-hp-white transition-opacity duration-300 p-4 block"
                >
                  <span className="link-hover">
                    {link.label}
                  </span>
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* CTA + HUD Toggle + Hamburger */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={toggleHUD}
              className={`hidden xl:block font-mono text-[9px] tracking-widest px-3 py-1.5 border transition-all duration-500 ${
                hudActive ? 'bg-hp-maroon text-hp-white border-hp-maroon shadow-[0_0_15px_#4A0F1C]' : 'text-hp-white border-hp-white hover:border-hp-maroon hover:text-hp-maroon'
              }`}
            >
              STRUCTURAL [{hudActive ? 'ON' : 'OFF'}]
            </button>

            <Magnetic>
              <a href="#contact" className="hidden sm:block btn-primary text-[10px] lg:text-xs py-2.5 px-4 lg:py-3 lg:px-6">
                Start a Project →
              </a>
            </Magnetic>
            
            <button
              onClick={() => setMenuOpen(true)}
              className="xl:hidden flex flex-col gap-[6px] p-2"
              aria-label="Open menu"
            >
              <span className="block w-6 h-[1.5px] bg-hp-white" />
              <span className="block w-4 h-[1.5px] bg-hp-white self-end" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[2000] bg-hp-black flex flex-col"
          >
            <div className="container flex items-center justify-between py-6">
              <span className="eyebrow text-hp-white tracking-[0.3em] font-bold">HIGHPHAUS</span>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="eyebrow text-hp-maroon font-black px-4 py-2 border border-hp-maroon"
              >
                CLOSE
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center container">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-hp-maroon/20 py-5"
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="display-3 text-hp-white hover:text-hp-maroon transition-colors duration-300 block uppercase"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="container py-8 flex flex-col gap-6 bg-hp-maroon/5 backdrop-blur-xl">
               <div className="flex flex-col gap-4">
                  <p className="eyebrow text-maroon text-[9px] opacity-40">System Access</p>
                  <button 
                    onClick={toggleHUD}
                    className={`w-full font-mono text-[10px] tracking-widest py-4 border transition-all duration-500 ${
                      hudActive ? 'bg-hp-maroon text-hp-white border-hp-maroon shadow-[0_0_15px_#4A0F1C]' : 'text-hp-white border-hp-white'
                    }`}
                  >
                    STRUCTURAL HUD [{hudActive ? 'ON' : 'OFF'}]
                  </button>
               </div>
              <div className="space-y-2">
                <p className="eyebrow text-hp-white text-[10px] uppercase font-bold">Kallara</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
