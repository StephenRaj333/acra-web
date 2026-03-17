"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Lightbulb,
  MessageSquare,
  Palette,
  Share2,
  Layout,
  Bot,
} from "lucide-react"
import { MagicBento } from "@/components/ui/magic-bento"

const services = [
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "Brand & Strategy",
    description:
      "We craft compelling brand identities and strategic roadmaps that position your business for long-term success.",
    label: "Featured",
    colSpan: 2,
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Marketing & Communications",
    description:
      "Powerful messaging that resonates with your audience and drives meaningful engagement across all channels.",
    label: "Marketing",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Experience Design",
    description:
      "Creating memorable experiences that delight users and build lasting connections with your brand.",
    label: "Design",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Social Media",
    description:
      "Strategic social presence that amplifies your voice and builds authentic community engagement.",
    label: "Social",
  },
  {
    icon: <Layout className="h-8 w-8" />,
    title: "UI & UX Design",
    description:
      "Intuitive interfaces and seamless user experiences that turn visitors into loyal customers.",
    label: "Product",
  },
  {
    icon: <Bot className="h-10 w-10" />,
    title: "Data, AI & Automation",
    description:
      "Leveraging cutting-edge AI and data solutions to automate processes and unlock new possibilities.",
    label: "Technology",
    colSpan: 2,
  },
]

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Services That Drive Growth
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We combine IT consulting, Design & Communications, and Business
            Consulting to help clients thrive in todays digital world.
          </p>
        </motion.div>

        {/* Magic Bento Grid */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MagicBento
            cards={services}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            clickEffect={true}
            enableMagnetism={true}
            particleCount={8}
            spotlightRadius={350}
            glowColor="229, 9, 20"
          />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            Not sure which service you need?
          </p>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Let&apos;s Talk Strategy
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
