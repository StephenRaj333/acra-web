"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon?: React.ReactNode
    size?: "small" | "large"
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6",
        className
      )}
    >
      {items.map((item, idx) => {
        const isLarge = item.size === "large"
        return (
          <div
            key={idx}
            className={cn(
              "relative group block h-full",
              isLarge ? "md:col-span-2" : ""
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated background - always rendered, opacity changes */}
            <motion.span
              className="absolute inset-0 h-full w-full bg-primary/10 dark:bg-primary/20 block rounded-3xl pointer-events-none"
              initial={false}
              animate={{
                opacity: hoveredIndex === idx ? 1 : 0,
                scale: hoveredIndex === idx ? 1 : 0.95,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            />
            <Card isLarge={isLarge} isHovered={hoveredIndex === idx}>
              <div className={cn(
                isLarge ? "flex flex-col md:flex-row md:items-center gap-6" : ""
              )}>
                {item.icon && (
                  <div className={cn(isLarge ? "md:w-1/3 flex justify-center" : "")}>
                    <CardIcon isLarge={isLarge}>{item.icon}</CardIcon>
                  </div>
                )}
                <div className={cn(isLarge ? "md:w-2/3" : item.icon ? "mt-6" : "")}>
                  <CardTitle isLarge={isLarge}>{item.title}</CardTitle>
                  <CardDescription isLarge={isLarge}>{item.description}</CardDescription>
                  <CardCTA />
                </div>
              </div>
              {isLarge && <CardPattern idx={idx} />}
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export const Card = ({
  className,
  children,
  isLarge,
  isHovered,
}: {
  className?: string
  children: React.ReactNode
  isLarge?: boolean
  isHovered?: boolean
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-card border relative z-20",
        isLarge ? "min-h-[280px]" : "min-h-[260px]",
        className
      )}
      initial={false}
      animate={{
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))",
        boxShadow: isHovered 
          ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
          : "0 0 0 0 rgb(0 0 0 / 0)",
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <div className="relative z-50 h-full">
        <div className={cn("p-8 h-full")}>{children}</div>
      </div>
    </motion.div>
  )
}

export const CardIcon = ({
  children,
  isLarge,
}: {
  children: React.ReactNode
  isLarge?: boolean
}) => {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary",
        isLarge ? "w-24 h-24" : "w-14 h-14"
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export const CardTitle = ({
  className,
  children,
  isLarge,
}: {
  className?: string
  children: React.ReactNode
  isLarge?: boolean
}) => {
  return (
    <h4
      className={cn(
        "font-bold text-foreground tracking-tight",
        isLarge ? "text-2xl md:text-3xl" : "text-xl",
        className
      )}
    >
      {children}
    </h4>
  )
}

export const CardDescription = ({
  className,
  children,
  isLarge,
}: {
  className?: string
  children: React.ReactNode
  isLarge?: boolean
}) => {
  return (
    <p
      className={cn(
        "mt-3 text-muted-foreground leading-relaxed",
        isLarge ? "text-lg" : "",
        className
      )}
    >
      {children}
    </p>
  )
}

export const CardCTA = () => {
  return (
    <motion.div
      className="mt-5 inline-flex items-center text-primary font-medium cursor-pointer"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="text-sm">Explore service</span>
      <svg
        className="ml-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </motion.div>
  )
}

export const CardPattern = ({ idx }: { idx: number }) => {
  return (
    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
        <defs>
          <pattern
            id={`grid-${idx}`}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${idx})`} />
      </svg>
    </div>
  )
}
