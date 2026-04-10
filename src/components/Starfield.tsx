'use client'

import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  twinkle: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  width: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []
    const starCount = 450 // Richer density

    const initStars = () => {
      stars = []
      const { width, height } = canvas
      for (let i = 0; i < starCount; i++) {
        const isCyan = Math.random() > 0.95
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.5,
          speed: Math.random() * 0.12 + 0.04,
          opacity: Math.random() * 0.6 + 0.2,
          twinkle: Math.random() * 0.04,
          color: isCyan ? 'rgba(0, 255, 255, ' : 'rgba(255, 255, 255, '
        })
      }
    }

    const createShootingStar = () => {
      const { width, height } = canvas
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height / 2,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 12 + 10,
        opacity: 1,
        width: Math.random() * 1.5 + 0.5
      })
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Local Parallax Offset
      const offX = mousePos.current.x * 30
      const offY = mousePos.current.y * 30

      stars.forEach(star => {
        // Move stars with parallax
        star.y -= star.speed
        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        // Twinkle
        star.opacity += (Math.random() - 0.5) * star.twinkle
        star.opacity = Math.max(0.1, Math.min(0.8, star.opacity))

        ctx.fillStyle = star.color + `${star.opacity})`
        ctx.fillRect(star.x + offX, star.y + offY, star.size, star.size)
      })

      // Shooting Stars Animation
      shootingStars.forEach((s, i) => {
        ctx.beginPath()
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y + s.length)
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.strokeStyle = grad
        ctx.lineWidth = s.width
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.length, s.y + s.length)
        ctx.stroke()

        s.x += s.speed
        s.y -= s.speed
        s.opacity -= 0.02

        if (s.opacity <= 0) {
          shootingStars.splice(i, 1)
        }
      })

      if (Math.random() > 0.992) createShootingStar()

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60 lg:opacity-80"
    />
  )
}
