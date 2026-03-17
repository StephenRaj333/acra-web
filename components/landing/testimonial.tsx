"use client"

import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Rocket, Target, TrendingUp, Zap, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"

export function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Simplified parallax transforms for better performance
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50], { clamp: false })
  const y2 = useTransform(scrollYProgress, [0, 1], [-25, 25], { clamp: false })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  // Mouse tracking for interactive gradient (simplified)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)

  const words = [
    { text: "We", highlight: false }, 
    { text: "build", highlight: true },
    { text: "solutions", highlight: false },
    { text: "that", highlight: false },
    { text: "transform", highlight: true }, 
    { text: "your", highlight: false },
    { text: "vision", highlight: true },
    { text: "into", highlight: false },
    { text: "reality", highlight: true },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const pillars = [
    { icon: Rocket, label: "Launch Fast", desc: "Go live in record time", color: "from-primary to-primary/70", gradient: "linear-gradient(150deg, #FF0505 16.04%, #339404 85.56%)" },
    { icon: Target, label: "Stay Focused", desc: "Clear goals, clear results", color: "from-secondary to-secondary/70", gradient: "linear-gradient(140deg, #0035E3 20.33%, #B78600 87.13%)" },
    { icon: TrendingUp, label: "Scale Smart", desc: "Grow without limits", color: "from-primary/80 to-secondary/80", gradient: "linear-gradient(140deg, #9B00E3 20.33%, #B7A800 87.13%)" },
    { icon: Zap, label: "Move Bold", desc: "Stand out from the crowd", color: "from-secondary/80 to-primary/80", gradient: "linear-gradient(140deg, #00B768 20.33%, #0017E3 87.13%)" },
  ]

  return (
    <section 
      ref={ref}
      className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-muted via-background to-muted"
    >
      {/* Interactive gradient background that follows mouse - optimized */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${smoothMouseX.get() * 100}% ${smoothMouseY.get() * 100}%, hsl(var(--primary) / 0.06) 0%, transparent 50%)`,
          willChange: "background"
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large parallax orbs */}
        <motion.div 
          style={{ y: y1, willChange: "transform" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-3xl"
        />
        <motion.div 
          style={{ y: y2, willChange: "transform" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/10 to-primary/5 blur-3xl"
        />
        
        {/* Floating shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 right-20 w-24 h-24 border-2 border-primary/20 rounded-2xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/4 left-20 w-20 h-20 border-2 border-secondary/20 rounded-full"
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="0%" y1="30%" x2="100%" y2="70%"
            stroke="hsl(var(--primary) / 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="100%" y1="20%" x2="0%" y2="80%"
            stroke="hsl(var(--secondary) / 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <motion.div 
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{ scale, opacity, willChange: "transform, opacity" }} 
      >
        {/* Section Label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.span 
            className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Our Promise
          </motion.span>
          <motion.div 
            className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        {/* Main Quote */}
        <div className="text-center mb-20" ref={textRef}>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-relaxed tracking-tight">
            {words.map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block mr-2 sm:mr-3 ${
                  word.highlight 
                    ? "bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient" 
                    : "text-foreground"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={word.highlight ? { scale: 1.05 } : {}}
              >
                {word.text}
              </motion.span>
            ))}
          </blockquote>
        </div>

{/* Interactive Pillar Cards - Grid Design */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
          // initial={{ opacity: 0, y: 40 }}
          // animate={isInView ? { opacity: 1, y: 0 } : {}}
          // transition={{ duration: 0.8, delay: 1.5 }}
        >
          {pillars?.map((pillar, index) => ( 
            <motion.div 
              key={pillar.label}
              className="group relative cursor-pointer"
              onHoverStart={() => setHoveredPillar(index)}
              onHoverEnd={() => setHoveredPillar(null)}
              whileTap={{ scale: 0.98 }}
            > 
              <motion.div 
                className="relative h-full p-6 rounded-2xl overflow-hidden flex flex-col items-start bg-white dark:bg-slate-900"
                animate={{
                  borderColor: hoveredPillar === index ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  border: '2px solid transparent',
                  backgroundImage: `linear-gradient(${isDark ? 'black' : 'white'}, ${isDark ? 'black' : 'white'}), ${pillar.gradient}`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }} 
              >

                {/* Icon - Top */}
                <motion.div 
                  className="relative flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-white font-bold text-xl"
                  style={{
                    background: pillar.gradient,
                  }}
                  animate={{
                    scale: hoveredPillar === index ? 1.1 : 1,
                    rotate: hoveredPillar === index ? [0, -5, 5, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <pillar.icon className="w-6 h-6" />
                </motion.div>
                
                {/* Number Badge */}
                <motion.span 
                  className="text-xs font-bold uppercase tracking-wider mb-2 px-2 py-1 rounded"
                  style={{
                    background: pillar.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{ opacity: hoveredPillar === index ? 1 : 0.7 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                {/* Title */}
                <motion.h3 
                  className="font-bold text-lg mb-2 leading-tight"
                  style={{color: `${isDark ? 'white': 'black'}`}}
                  animate={{ x: hoveredPillar === index ? 2 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {pillar.label}
                </motion.h3>
                
                {/* Description */}
                <motion.p
                  className="text-sm flex-1 mb-4"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: hoveredPillar === index ? 1 : 0.7 }}
                  style={{color: `${isDark ? 'white': 'black'}`}}
                >
                  {pillar.desc}
                </motion.p>

                {/* Arrow - Bottom */}
                <motion.div
                  className="text-gray-400 dark:text-white/70 mt-auto"
                  animate={{ 
                    x: hoveredPillar === index ? 3 : 0,
                    opacity: hoveredPillar === index ? 1 : 0.7
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <motion.div
            className="w-fit rounded-full p-[1px]"
            style={{
              background: "linear-gradient(275deg, #90F939 0%, #32D5EA 11.31%, #0137CA 20.35%, #01B46A 30.26%, #AF7545 39.7%, #9A01E2 50.07%, #A07C1D 57.79%, #0F3CD0 67.25%, #922888 75.71%, #E29E01 83.53%, #FF0404 91.57%, #00B703 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }} 
          >
            {/* Button Content */}
            <button
              className={`px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-900'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Start Your Journey 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </button>
          </motion.div>
        </motion.div> 
      </motion.div>
    </section>
  )
}
