import { useRef, useState, useTransition } from 'react'
import { motion, useInView } from 'framer-motion'
import Magnetic from './Magnetic'
import { sendEmail } from '@/app/actions/sendEmail'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [isPending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [resultMessage, setResultMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', project: '', budget: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await sendEmail(formData)
      if (result.success) {
        setSent(true)
        setResultMessage(result.message || null)
      } else {
        setError(result.error || 'Failed to send message')
      }
    })
  }

  const fieldClass = `
    w-full bg-hp-white/[0.03] border border-hp-maroon/20 px-6 py-5 text-hp-white 
    placeholder:text-hp-beige/30 focus:outline-none focus:border-hp-maroon/40 
    transition-all duration-300 body-lg
  `

  return (
    <section id="contact" ref={ref} className="section border-t border-hp-maroon/20 bg-hp-black">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-32">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="space-y-10"
          >
            <div>
              <p className="eyebrow mb-6 text-hp-beige font-bold tracking-[0.4em]">Get In Touch</p>
              <h2 className="display-2 text-hp-white uppercase leading-[0.92] mb-12">
                Let’s build<br/>something<br/>that scales.
              </h2>
            </div>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="divider-accent bg-hp-maroon mb-12" 
            />

            <p className="body-lg max-w-sm text-hp-beige font-medium mb-12 leading-relaxed">
              We work with ambitious brands and founders. Tell us about your vision — we will craft a strategy to match it.
            </p>

            <div className="space-y-6 pt-4">
              <div>
                <p className="eyebrow text-hp-beige/40 mb-2 font-mono">Email</p>
                <a href="mailto:highphaus@gmail.com" className="body-lg link-hover text-hp-beige hover:text-hp-white transition-colors">
                  highphaus@gmail.com
                </a>
              </div>
              <div>
                <p className="eyebrow text-hp-beige/40 mb-2 font-mono">WhatsApp</p>
                <a href="https://wa.me/917034206108" className="body-lg link-hover text-hp-beige hover:text-hp-white transition-colors">
                  +91 7034206108
                </a>
              </div>
              <div>
                <p className="eyebrow text-hp-beige/40 mb-2 font-mono">Offices</p>
                <p className="body-sm text-hp-beige/60">Kallara</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 border border-hp-maroon/20 p-16"
              >
                <span className="text-4xl text-hp-maroon">✓</span>
                <h3 className="heading-1 text-hp-white">Message Received</h3>
                <p className="body-lg text-hp-beige font-medium">We will be in touch within 24 hours.</p>
                {resultMessage && (
                  <div className="mt-8 p-4 bg-hp-white/5 border border-hp-maroon/20 rounded-lg">
                    <p className="text-[10px] font-mono text-hp-maroon uppercase tracking-widest leading-relaxed">
                      {resultMessage}
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-12 md:gap-y-16">
                <div className="flex flex-col">
                  <label className="eyebrow text-hp-beige/40 mb-6 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                
                <div className="flex flex-col pt-4">
                  <label className="eyebrow text-hp-beige/40 mb-6 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label className="eyebrow text-hp-beige/40 mb-6 block">Tell Us About Your Project</label>
                  <textarea
                    rows={3}
                    name="project"
                    required
                    placeholder="We need a complete brand refresh and performance campaigns..."
                    value={form.project}
                    onChange={e => setForm({ ...form, project: e.target.value })}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label className="eyebrow text-hp-beige/40 mb-6 block">Budget Range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    className={`${fieldClass} cursor-none bg-hp-black`}
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="10-25k">$10k – $25k</option>
                    <option value="25-50k">$25k – $50k</option>
                    <option value="50-100k">$50k – $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>

                {error && (
                  <p className="text-hp-maroon font-mono text-[10px] tracking-widest bg-hp-maroon/10 p-4 border border-hp-maroon/20">
                    ERROR: {error}
                  </p>
                )}

                <div className="pt-10">
                  <Magnetic>
                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="btn-primary w-full justify-center py-6 text-sm tracking-[0.3em] font-black disabled:opacity-50 disabled:cursor-wait"
                    >
                      {isPending ? 'SENDING...' : 'SEND MESSAGE →'}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
