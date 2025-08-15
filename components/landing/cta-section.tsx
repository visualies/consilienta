"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

export function CTASection() {
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
          Ready to Transform Your Development Process?
        </motion.h2>
        <motion.p
          className="text-xl text-white/90 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Partner with Consilienta and experience the difference that expert guidance, innovative solutions, and
          personalized service can make for your pharmaceutical development journey.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" variant="cta">
            Schedule Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
          >
            Download Brochure
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}