"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

// Basic motion components
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH2 = motion.h2
export const MotionH3 = motion.h3
export const MotionP = motion.p

// Reusable animation wrappers
interface FadeUpAnimationProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeUpAnimation({ children, delay = 0, className }: FadeUpAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredFadeUpProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggeredFadeUp({ children, className, staggerDelay = 0.1 }: StaggeredFadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

interface CardAnimationProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function CardAnimation({ children, delay = 0, className }: CardAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.025, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}