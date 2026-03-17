"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface LightRaysProps {
  raysOrigin?: "top-center" | "top-left" | "top-right" | "center" | "bottom-center"
  raysSpeed?: number
  rayCount?: number
  followMouse?: boolean
  mouseInfluence?: number
  className?: string
}

export function LightRays({
  raysOrigin = "top-center",
  raysSpeed = 0.5,
  rayCount = 6,
  followMouse = true,
  mouseInfluence = 0.1,
  className = "",
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const isDark = resolvedTheme === 'dark'
    
    // Light theme: Natural sunlight colors (silver, gold, warm white)
    // Dark theme: Brand colors (red, blue)
    const lightThemeColors = [
      { r: 255, g: 250, b: 240 },  // Warm white
      { r: 255, g: 245, b: 220 },  // Soft gold
      { r: 248, g: 248, b: 255 },  // Silver white
      { r: 255, g: 253, b: 245 },  // Cream
      { r: 255, g: 248, b: 230 },  // Light gold
      { r: 245, g: 245, b: 250 },  // Cool silver
    ]
    
    const darkThemeColors = [
      { r: 255, g: 80, b: 100 },   // Bright red
      { r: 80, g: 130, b: 255 },   // Bright blue
      { r: 255, g: 100, b: 120 },  // Light red
      { r: 100, g: 150, b: 255 },  // Light blue
      { r: 255, g: 60, b: 80 },    // Deep red
      { r: 60, g: 110, b: 255 },   // Deep blue
    ]

    const baseAlpha = isDark ? 0.3 : 0.35

    function resize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.offsetWidth
      height = parent.offsetHeight
      canvas.width = width
      canvas.height = height
    }

    function getOrigin(): [number, number] {
      switch (raysOrigin) {
        case "top-center": return [width / 2, -20]
        case "top-left": return [0, -20]
        case "top-right": return [width, -20]
        case "center": return [width / 2, height / 2]
        case "bottom-center": return [width / 2, height + 20]
        default: return [width / 2, -20]
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (!followMouse || !canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    let time = 0
    const rays: Array<{
      angle: number
      width: number
      length: number
      useSecondary: boolean
      phase: number
      swayAmount: number
    }> = []

    // Initialize rays spread evenly
    const colors = isDark ? darkThemeColors : lightThemeColors
    for (let i = 0; i < rayCount; i++) {
      rays.push({
        angle: (i / rayCount) * Math.PI + Math.PI * 0.15,
        width: 60 + Math.random() * 80,
        length: 0.7 + Math.random() * 0.3,
        colorIndex: i % colors.length,
        phase: Math.random() * Math.PI * 2,
        swayAmount: 0.05 + Math.random() * 0.1
      })
    }

    function draw() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, width, height)
      
      const [originX, originY] = getOrigin()
      
      // Fixed at origin (no mouse follow)
      const adjustedOriginX = originX
      
      time += raysSpeed * 0.016

      for (const ray of rays) {
        // Subtle swaying motion
        const swayOffset = Math.sin(time * 0.5 + ray.phase) * ray.swayAmount
        const currentAngle = ray.angle + swayOffset
        
        // Gentle pulsing
        const pulseAlpha = baseAlpha * (0.7 + 0.3 * Math.sin(time * 0.3 + ray.phase))
        
        const color = colors[ray.colorIndex]
        const maxLength = Math.max(width, height) * 1.5 * ray.length
        
        // Calculate end point
        const endX = adjustedOriginX + Math.cos(currentAngle) * maxLength
        const endY = originY + Math.sin(currentAngle) * maxLength
        
        // Create gradient for the ray
        const gradient = ctx.createLinearGradient(adjustedOriginX, originY, endX, endY)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulseAlpha * 1.2})`)
        gradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulseAlpha * 0.6})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        
        // Draw ray as a simple triangle/cone
        ctx.beginPath()
        ctx.moveTo(adjustedOriginX, originY)
        
        const perpAngle = currentAngle + Math.PI / 2
        const halfWidth = ray.width / 2
        
        // Cone edges
        ctx.lineTo(
          endX + Math.cos(perpAngle) * halfWidth,
          endY + Math.sin(perpAngle) * halfWidth
        )
        ctx.lineTo(
          endX - Math.cos(perpAngle) * halfWidth,
          endY - Math.sin(perpAngle) * halfWidth
        )
        
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
      }
      
      // Add soft glow at origin
      const glowSize = 80 + Math.sin(time * 0.5) * 20
      const glowGradient = ctx.createRadialGradient(
        adjustedOriginX, originY, 0,
        adjustedOriginX, originY, glowSize
      )
      
      if (isDark) {
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)')
        glowGradient.addColorStop(0.3, 'rgba(255, 100, 120, 0.3)')
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      } else {
        // Warm sunlight glow for light theme
        glowGradient.addColorStop(0, 'rgba(255, 255, 250, 0.9)')
        glowGradient.addColorStop(0.3, 'rgba(255, 250, 230, 0.5)')
        glowGradient.addColorStop(0.6, 'rgba(255, 248, 220, 0.2)')
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      }
      
      ctx.beginPath()
      ctx.arc(adjustedOriginX, originY, glowSize, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()
      
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [raysOrigin, raysSpeed, rayCount, followMouse, mouseInfluence, resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      suppressHydrationWarning
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}

export default LightRays
