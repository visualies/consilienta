"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

interface CTASectionProps {
  data?: {
    title: string
    description: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton: {
      text: string
      link: string
    }
  }
}

const defaultData = {
  title: "Ready to Get Started?",
  description: "Contact us today to discuss your pharmaceutical consulting needs.",
  primaryButton: {
    text: "Start Your Journey",
    link: "#contact"
  },
  secondaryButton: {
    text: "Learn More",
    link: "#about"
  }
}

export function CTASection({ data = defaultData }: CTASectionProps) {
  const { scrollYProgress } = useScroll()
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ctaRef}
      className="px-6 pt-48 pb-32"
      style={{
        y: useTransform(scrollYProgress, [0.6, 1], ['0%', '-5%']),
        paddingBottom: '10rem',
        marginBottom: '-3rem'
      }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.h2
          className="text-4xl lg:text-5xl font-serif font-medium text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {data.title}
        </motion.h2>
        <motion.p
          className="text-xl text-white/90 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.description}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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
      </div>
    </motion.section>
  )
}