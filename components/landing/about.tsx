"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Target, Zap, Shield, Heart, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LampContainer } from "@/components/ui/lamp"
import { useTheme } from "next-themes"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every detail matters in delivering excellence.",
    color: "from-secondary to-secondary/70",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge solutions.",
    color: "from-primary to-primary/70",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparent partnerships built on trust.",
    color: "from-secondary/80 to-primary/80",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Dedicated to your success, always.",
    color: "from-primary/80 to-secondary/80",
  },
]

export function About() {
  const ref = useRef(null)
  const lampRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const lampInView = useInView(lampRef, { once: true, margin: "0px" })
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  // Gradient colors for Lamp container - same for both themes
  const lampGradient = {
    from: "#FF0505",
    to: "#FF6B35",
  }
  
  return (
    <section id="about" className="relative overflow-hidden bg-background py-16 lg:py-24" ref={ref}>
      {/* Lamp Container with theme-adaptable colors */}
      <motion.div 
        className="absolute inset-0 z-0" 
        ref={lampRef}
        initial={{ opacity: 0 }}  
        animate={lampInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <LampContainer 
          className="min-h-[300px] -mt-16"
          gradientFromColor={lampGradient.from}
          gradientToColor={lampGradient.to}
        >
          <div />
        </LampContainer>
      </motion.div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            <span className="w-8 h-px bg-primary" />
            Our Philosophy
            <span className="w-8 h-px bg-primary" />
          </motion.span>
          
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Never Give Up<br />
            <span className="text-primary">Until It&apos;s Right</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Background Decorations */}
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl" />
            
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src="/images/philosophy.jpg"
                alt="Team reaching new heights together"
                width={600}
                height={500}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Play Button Overlay */}
              <motion.button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
              </motion.button>
              
              {/* Bottom Content Card */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 lg:p-8"
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-5 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-foreground">12+</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Years of Excellence</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Delivering transformative digital solutions worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -right-4 top-8 bg-card border border-border rounded-2xl p-4 shadow-xl hidden lg:block"
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Client Satisfaction</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty mb-6">
              It&apos;s the bedrock of our work ethic and a direct reflection of our
              unwavering commitment to client success. This motto defines our
              approach because it embodies the persistence, precision, and
              dedication necessary to deliver true value.
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty mb-8">
              At AKRA, we don&apos;t just deliver IT consulting and design services - we
              unlock new possibilities for your business. With deep technical
              expertise and a bold creative vision, we transform complex challenges
              into simple, effective solutions.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  <motion.div
                    className="p-4 bg-card border border-border rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer"
                    whileHover={{ y: -4 }}
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 rounded-2xl`}
                      animate={{ opacity: hoveredValue === index ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-3`}>
                        <value.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{value.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground rounded-xl px-8 h-12 font-semibold shadow-lg shadow-primary/25 group"
              >
                <span className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
