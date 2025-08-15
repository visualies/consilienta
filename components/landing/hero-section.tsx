"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HelixCanvas } from "./interactive-helix"

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  return (
    <section className="relative px-6 py-20 -mt-14 pt-32 overflow-hidden min-h-[60vh]">
      <HelixCanvas />

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
              <Badge className="frosted-glass text-white border-0">Pharmaceutical Consulting Excellence</Badge>
            </motion.div>
            <motion.h1 
              className="text-5xl lg:text-6xl font-serif font-medium leading-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Guiding your product from concept to approval
            </motion.h1>

            <motion.p 
              className="text-lg text-white/80 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              No matter how complex or innovative your development journey may be.
              We will help you navigate each step of product development with clarity and confidence.
            </motion.p>
          </motion.div>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button size="lg" variant="cta">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}