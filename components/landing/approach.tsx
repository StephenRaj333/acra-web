"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import { Database, PaintBucket, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"

const practiceAreas = [
  {
    id: 0,
    icon: Database,
    title: "Data, AI & Automation",
    description:
      "Harness the power of artificial intelligence and automation to streamline operations, gain actionable insights, and stay ahead of the competition. We build intelligent systems that learn and adapt to your business needs.",
    color: "from-secondary to-secondary/70",
    bgGradient: "hsl(var(--secondary)), hsl(var(--secondary) / 0.7)",
    image: "/images/data-ai.jpg",
  },
  {
    id: 1,
    icon: PaintBucket,
    title: "Branding & Design",
    description:
      "Create a lasting impression with cohesive brand identities and stunning visual designs. From logos to complete design systems, we craft visuals that communicate your brand essence and resonate with your audience.",
    color: "from-primary to-primary/70",
    bgGradient: "hsl(var(--primary)), hsl(var(--primary) / 0.7)",
    image: "/images/branding-design.jpg",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Business Consulting",
    description:
      "Strategic guidance to navigate complex business challenges. We analyze your operations, identify opportunities, and implement solutions that drive sustainable growth and competitive advantage.",
    color: "from-primary to-secondary",
    bgGradient: "hsl(var(--primary)), hsl(var(--secondary))",
    image: "/images/business-consulting.jpg",
  },
]

export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * practiceAreas.length),
      practiceAreas.length - 1
    )
    if (newIndex !== activeIndex && newIndex >= 0) {
      setActiveIndex(newIndex)
    }
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="approach">
      {/* Sticky scroll container */}
      <div ref={containerRef} className="relative h-[300vh]">
        {/* Sticky content - fits exactly in viewport */}
        <div className="sticky top-0 h-screen overflow-hidden bg-background">
          {/* Background gradient */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: `linear-gradient(135deg, ${practiceAreas[activeIndex].bgGradient})`,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Main content container with proper padding */}
          <div className="h-full flex items-center px-4 sm:px-6 lg:px-8 py-16">
            <div className="mx-auto max-w-7xl w-full">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center h-full max-h-[calc(100vh-8rem)]">
                {/* Left Column - Accordion */}
                <div className="flex flex-col h-full max-h-full overflow-hidden">
                  <div className="flex-shrink-0 mb-4">
                    <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                      Practice Areas
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                      Comprehensive Solutions
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Scroll to explore our expertise areas.
                    </p>
                  </div>

                  {/* Accordion */}
                  <div className="flex-1 space-y-2 overflow-hidden">
                    {practiceAreas.map((item, index) => {
                      const isActive = activeIndex === index
                      const Icon = item.icon

                      return (
                        <motion.div
                          key={item.id}
                          className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                            isActive
                              ? "border-primary bg-card shadow-lg flex-1"
                              : "border-border bg-card/50"
                          }`}
                          layout
                        >
                          {/* Active gradient */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0`}
                            animate={{ opacity: isActive ? 0.05 : 0 }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Header */}
                          <div className="relative p-3 lg:p-4 flex items-center gap-3">
                            <motion.div
                              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              animate={{
                                scale: isActive ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Icon className="h-4 w-4" />
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-semibold text-sm lg:text-base transition-colors truncate ${
                                  isActive ? "text-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {item.title}
                              </h3>
                              {/* Progress dots */}
                              <div className="flex gap-1 mt-1">
                                {practiceAreas.map((_, dotIndex) => (
                                  <motion.div
                                    key={dotIndex}
                                    className={`h-1 rounded-full ${
                                      dotIndex <= activeIndex
                                        ? "bg-primary"
                                        : "bg-muted-foreground/30"
                                    }`}
                                    animate={{
                                      width: dotIndex === activeIndex ? 20 : 6,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Active pulse */}
                            <motion.div
                              className="w-2 h-2 rounded-full bg-primary"
                              animate={{
                                scale: isActive ? [1, 1.5, 1] : 0,
                                opacity: isActive ? 1 : 0,
                              }}
                              transition={{
                                scale: { duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 1 },
                              }}
                            />
                          </div>

                          {/* Content */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{
                              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.3 },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 lg:px-4 pb-3 lg:pb-4 pl-14 lg:pl-16">
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                              <motion.button
                                className="mt-3 text-sm font-medium text-primary flex items-center gap-2 group"
                                whileHover={{ x: 5 }}
                              >
                                Learn more
                                <span className="group-hover:translate-x-1 transition-transform">
                                  →
                                </span>
                              </motion.button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>

                </div>

                {/* Right Column - Image */}
                <div className="relative hidden lg:block h-full max-h-[calc(100vh-12rem)]">
                  {/* Large Typography */}
                  <div className="absolute -top-2 left-0 z-10 pointer-events-none">
                    <h3 className="text-4xl xl:text-5xl font-bold text-foreground/5 leading-none">
                      OUR
                    </h3>
                    <h3 className="text-4xl xl:text-5xl font-bold text-primary/10 leading-none">
                      APPROACH
                    </h3>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                    {practiceAreas.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: activeIndex === index ? 1 : 0,
                          scale: activeIndex === index ? 1 : 1.1,
                        }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-20 mix-blend-overlay`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      </motion.div>
                    ))}

                    {/* Content Overlay Card */}
                    {/* <motion.div
                      className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl"
                      layout
                    >
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-3 mb-2"
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${practiceAreas[activeIndex].color}`}>
                          {(() => {
                            const Icon = practiceAreas[activeIndex].icon
                            return <Icon className="h-4 w-4 text-primary-foreground" />
                          })()}
                        </div>
                        <span className="font-semibold text-sm text-foreground">
                          {practiceAreas[activeIndex].title}
                        </span>
                      </motion.div>

                      <motion.p
                        key={`desc-${activeIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-xs text-muted-foreground leading-relaxed line-clamp-2"
                      >
                        {practiceAreas[activeIndex].description}
                      </motion.p>

                      <motion.button
                        className="mt-3 inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-xs overflow-hidden group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative flex items-center gap-2">
                          <Sparkles className="h-3 w-3" />
                          Explore More
                        </span>
                      </motion.button>
                    </motion.div> */}

                    {/* Decorative */}
                    <motion.div
                      className="absolute top-4 right-4 w-12 h-12 border-2 border-primary-foreground/20 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
