'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export default function DecodedText({
  text,
  className = "",
  delay = 0,
  variant = 'white'
}: {
  text: string,
  className?: string,
  delay?: number,
  variant?: 'white' | 'maroon'
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isCompleted, setIsCompleted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const scrubText = useCallback(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text.split('').map((char, index) => {
          if (index < iteration) return text[index]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsCompleted(true)
      }
      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(scrubText, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, scrubText, delay])

  const variantClasses = {
    white: 'text-hp-white',
    maroon: 'text-hp-maroon',
  }

  return (
    <span ref={ref} className={`${variantClasses[variant as keyof typeof variantClasses]} ${className}`.trim()}>
      {displayText}
    </span>
  )
}
