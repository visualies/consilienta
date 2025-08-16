"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HelixCanvas } from "./interactive-helix"

interface HeroSectionProps {
  data?: {
    badge: string
    headline: string
    description: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton: {
      text: string
      link: string
    }
    showHelix: boolean
  }
  helixConfig?: {
    enabled: boolean
    model?: {
      url: string
      filename: string
    }
    rotationSpeed: number
    scale: number
    hoverScale: number
    position: {
      x: number
      y: number
      z: number
    }
    rotation: {
      x: number
      y: number
      z: number
    }
  }
}

const defaultData = {
  badge: "Industry Leading",
  headline: "Pharmaceutical Consulting Excellence",
  description: "Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.",
  primaryButton: {
    text: "Get Started",
    link: "#contact"
  },
  secondaryButton: {
    text: "Learn More",
    link: "#about"
  },
  showHelix: true
}

const defaultHelixConfig = {
  enabled: true,
  rotationSpeed: 0.5,
  scale: 1,
  hoverScale: 1.1,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
}

export function HeroSection({ data = defaultData, helixConfig = defaultHelixConfig }: HeroSectionProps) {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  return (
    <section className="relative px-6 py-20 -mt-14 pt-32 overflow-hidden min-h-[60vh]">
      {helixConfig.enabled && <HelixCanvas config={helixConfig} />}

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ y: heroY }}
      >
        <motion.div 
          className="space-y-8 max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Badge className="frosted-glass text-white border-0">{data.badge}</Badge>
            </motion.div>
            <motion.h1 
              className="text-5xl lg:text-6xl font-serif font-medium leading-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {data.headline}
            </motion.h1>

            <motion.div 
              className="text-lg text-white/80 leading-relaxed max-w-lg whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {data.description}
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button size="lg" variant="cta">
              {data.primaryButton.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
            >
              {data.secondaryButton.text}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}