"use client"

import * as motion from "framer-motion/client"
import { type CSSProperties, type ReactNode } from "react"

type WrapperProps = {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

type StaggeredFadeUpProps = WrapperProps & {
  staggerDelay?: number
}

type ParallaxAnimationProps = WrapperProps & {
  offset?: [number, number]
}

export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH2 = motion.h2
export const MotionH3 = motion.h3
export const MotionP = motion.p

export function FadeUpAnimation({ children, delay = 0, className, style }: WrapperProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredFadeUp({ children, className, staggerDelay = 0.1, style }: StaggeredFadeUpProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function CardAnimation({ children, delay = 0, className, style }: WrapperProps) {
  return (
    <motion.div
      className={className}
      style={{ ...style, willChange: 'transform' }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxAnimation({ children, className, style }: ParallaxAnimationProps) {
  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  )
}

export function HeroAnimation({ children, delay = 0, className, style }: WrapperProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleAnimation({ children, delay = 0, className, style }: WrapperProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
