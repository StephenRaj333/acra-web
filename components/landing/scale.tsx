"use client"

import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Globe, Briefcase, CheckCircle2, TrendingUp } from "lucide-react"

function useWindowWidth() {
  const [width, setWidth] = useState(1280)
  useEffect(() => {
    setWidth(window.innerWidth)
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return width
}

const stats = [
  {
    icon: Globe,
    value: "20+",
    label: "Years of\nConsulting Excellence",
    angle: 150,
    accentColor: "#818cf8",
    glow: "rgba(129,140,248,0.45)",
    delay: 0.1,
  },
  {
    icon: Briefcase,
    value: "75+",
    label: "Enterprise\nClients Served",
    angle: 120,
    accentColor: "#38bdf8",
    glow: "rgba(56,189,248,0.45)",
    delay: 0.2, 
  },
  {
    icon: CheckCircle2,
    value: "500+",
    label: "Engagements\nDelivered",
    angle: 60,
    accentColor: "#34d399",
    glow: "rgba(52,211,153,0.45)",
    delay: 0.3,
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Client\nSatisfaction Rate",
    angle: 30,
    accentColor: "#fbbf24",
    glow: "rgba(251,191,36,0.45)",
    delay: 0.4,
  },
]

function RippleRing({
  delay,
  size,
  isInView,
}: {
  delay: number
  size: number
  isInView: boolean
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        bottom: 0,
        left: "50%",
        x: "-50%",
        y: "50%",
        border: "1.5px solid transparent",
        background: "rgba(87, 138, 255, 0.1)",
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
      transition={{
        delay,
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  )
}

function StatPill({
  stat,
  motionX,
  motionOpacity,
  motionFilter,
  arcRadius,
}: {
  stat: (typeof stats)[0]
  motionX: MotionValue<number>
  motionOpacity: MotionValue<number>
  motionFilter: MotionValue<string>
  arcRadius: number
}) {
  const r = arcRadius
  const rad = (stat.angle * Math.PI) / 180
  const x = Math.cos(rad) * r
  const y = Math.sin(rad) * r

  return (
    // Outer div: places pill's center on the arc point
    // Ring center is at container bottom-center, so bottom=y, left=50%+x
    // translate(-50%, 50%) centers the pill element on that coordinate
    <div
      className="absolute"
      style={{
        bottom: y,
        left: `calc(50% + ${x}px)`,
        transform: "translate(-50%, 50%)",
      }}
    >
      <motion.div
        className="flex items-center gap-3 px-5 py-3.5 rounded-[20px] backdrop-blur-md w-52"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, .2))",
          border: "1px solid rgba(255,255,255,0.18)",
          x: motionX,
          opacity: motionOpacity,
          filter: motionFilter,
        }}
        whileHover={{
          scale: 1.06,
          boxShadow: `0 0 32px ${stat.glow}, 0 0 0 1px rgba(255,255,255,0.25)`,
        }}
      >
        {/* Icon circle — frosted glass with accent color */}
        <div
          className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full"
          style={{
            background: `${stat.accentColor}18`,
            border: `1px solid ${stat.accentColor}50`,
            boxShadow: `0 0 14px ${stat.accentColor}30`,
          }}
        >
          <stat.icon className="w-5 h-5" style={{ color: stat.accentColor }} />
        </div>

        {/* Value + label */}
        <div>
          <p className="text-white font-black text-2xl leading-none tracking-tight">
            {stat.value}
          </p>
          <p className="text-slate-400 text-xs leading-snug mt-0.5 whitespace-pre-line">
            {stat.label}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function Scale() {
  const ref = useRef<HTMLDivElement>(null)  
  const bloomRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-120px" })
  const bloomInView = useInView(ref, { once: true, amount: 0.5 })
  const windowWidth = useWindowWidth()

  // Rings scale continuously with viewport: 320px screen→ smallest, 1440px → full size
  // Clamp between min and max for each ring
  const ring1 = Math.round(Math.max(160, Math.min(420, windowWidth * 0.30)))
  const ring2 = Math.round(Math.max(240, Math.min(600, windowWidth * 0.43)))
  const ring3 = Math.round(Math.max(320, Math.min(800, windowWidth * 0.57)))

  // Arc radius scales with viewport: pills stay just outside the outer ring
  // outerRingRadius = ring3 / 2, pills sit ~15% further out
  const arcRadius = Math.round(Math.max(180, Math.min(460, (ring3 / 2) * 1.15)))

  // 991px custom breakpoint: arc pills on desktop, 2-col grid below
  const isDesktop = windowWidth >= 991

  // Composition height: enough to show the top of the outermost ring + padding
  const compositionHeight = isDesktop ? 560 : Math.max(180, Math.round(ring3 / 2) + 50)

  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start start", "end end"],
  })

  // Scroll progress tracking section entry — used for pill fly-in (desktop only)
  const { scrollYProgress: entryProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })
  const leftX  = useTransform(entryProgress, [0.05, 0.85], [-700, 0])
  const rightX = useTransform(entryProgress, [0.05, 0.85], [ 700, 0])
  const pillOpacity = useTransform(entryProgress, [0.05, 0.65], [0, 1])
  const pillBlur = useTransform(entryProgress, [0.05, 0.75], ["blur(18px)", "blur(0px)"])
 
  const centralScale = useTransform(scrollYProgress, [0.1, 0.4], [0.85, 1])
 
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24 lg:py-36 lg:pb-0" 
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0d1529 50%, #0a0f1e 100%)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial bloom — anchored to bottom-center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(56,78,255,0.22) 0%, rgba(56,78,255,0.08) 45%, transparent 70%)",
          }}
        />
        {/* Corner glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 lg:mb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-8 h-px bg-indigo-400" />
            Our Track Record
            <span className="w-8 h-px bg-indigo-400" />
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto">
            Decades of expertise delivering measurable results across finance, government, and enterprise sectors.
          </p>
        </motion.div>

        {/* Central composition — rings + phone */}
        <div
          className="relative flex items-end justify-center max-[991px]:hidden"
          style={{ minHeight: compositionHeight }}
        >
          {/* Three bloom circles anchored to bottom-center, behind phone */}
          <RippleRing delay={0.7} size={ring1} isInView={bloomInView} />
          <RippleRing delay={1.0} size={ring2} isInView={bloomInView} />
          <RippleRing delay={1.3} size={ring3} isInView={bloomInView} /> 

          {/* Central phone — bottom-center, sized responsively */}
          <motion.div
            className="relative z-20 flex-shrink-0"
            style={{ scale: centralScale }}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 110 }}
          >
            {/* Bloom glow under phone */}
            <motion.div
              className="absolute -inset-8 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" }}
              animate={isInView ? { opacity: [0, 0.8, 0.5], scale: [0.8, 1.1, 1] } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Phone shell */}
            <div    
              className="relative bottom-[-60px] sm:bottom-[-100px] w-[120px] h-[210px] sm:w-[160px] sm:h-[280px] md:w-[180px] md:h-[320px] rounded-[28px] sm:rounded-[32px] overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Screen */}
              <div className="absolute inset-[6px] rounded-[27px] bg-slate-900 overflow-hidden flex flex-col gap-2 p-3">
                {/* Header bar */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-1.5 bg-indigo-400/60 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                </div>

                {/* KPI row */}
                <div className="flex gap-1.5">
                  {[
                    { color: "#818cf8", val: "98%" },
                    { color: "#34d399", val: "75+" },
                  ].map((k) => (
                    <div key={k.val} className="flex-1 rounded-lg p-1.5" style={{ background: `${k.color}15`, border: `1px solid ${k.color}30` }}>
                      <p className="text-[7px] font-bold" style={{ color: k.color }}>{k.val}</p>
                      <div className="w-full h-0.5 rounded-full mt-1" style={{ background: k.color }} />
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-1 h-12 px-1">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{ background: i === 5 ? "#818cf8" : "rgba(129,140,248,0.3)" }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                      custom={h}
                    >
                      <div style={{ height: `${h}%` }} />
                    </motion.div>
                  ))}
                </div>

                {/* Trend line area */}
                <div className="rounded-lg p-1.5" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                  <div className="flex justify-between items-center">
                    <p className="text-[6px] text-slate-400">Client Growth</p>
                    <p className="text-[7px] font-bold text-emerald-400">+24%</p>
                  </div>
                  <div className="flex items-end gap-0.5 h-4 mt-1">
                    {[30, 45, 38, 60, 52, 75, 68, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-emerald-400/40" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                {/* Pulsing dot indicator */}
                <div className="flex items-center gap-1.5 mt-auto">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="h-1 flex-1 rounded-full bg-slate-700">
                    <motion.div
                      className="h-full rounded-full bg-indigo-400"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "78%" } : {}}
                      transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat pills — arc-positioned, desktop (≥991px) only */}
          {/* Pills on left (angle > 90°) fly from left; pills on right fly from right */}
          {isDesktop && stats.map((stat) => {
            const isLeft = Math.cos((stat.angle * Math.PI) / 180) < 0
            return (
              <StatPill
                key={stat.value}
                stat={stat}
                motionX={isLeft ? leftX : rightX}
                motionOpacity={pillOpacity}
                motionFilter={pillBlur}
                arcRadius={arcRadius}
              />
            )
          })}
        </div>

        {/* Below 991px: 2-column stat grid, sits below the circles */}
        {!isDesktop && (
          <div className="grid grid-cols-2 gap-3 mt-8 max-[991px]:gap-6 max-[540px]:grid-cols-1">   
          {stats.map((stat) => (
            <motion.div
              key={stat.value}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md"
              style={{
                background: "linear-gradient(90deg, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, .2))",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: stat.delay + 0.5, duration: 0.5 }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: `${stat.accentColor}18`,
                  border: `1px solid ${stat.accentColor}50`,
                  boxShadow: `0 0 12px ${stat.accentColor}30`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.accentColor }} />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">{stat.value}</p>
                <p className="text-slate-400 text-[10px] leading-tight mt-0.5 whitespace-pre-line">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>

      {/* Sentinel — bloom triggers when this reaches the viewport (bottom of section) */}
      <div ref={bloomRef} className="absolute bottom-0 left-0 w-px h-px pointer-events-none" />
    </section>
  )
}
