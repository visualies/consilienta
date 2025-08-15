"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HelixCanvas } from "../landing/interactive-helix"

interface HeroBlockProps {
  data: {
    variant: 'high-impact' | 'medium-impact' | 'low-impact' | 'post'
    badge?: string
    headline: string
    description?: string
    background: {
      type: 'none' | 'image' | 'video' | '3d-model'
      media?: {
        url: string
        alt: string
      }
      overlay: boolean
    }
    buttons: Array<{
      text: string
      variant: 'primary' | 'secondary' | 'cta'
      link?: string
      action: 'link' | 'modal' | 'scroll'
    }>
  }
}

export function HeroBlock({ data }: HeroBlockProps) {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  const renderBackground = () => {
    if (data.background.type === '3d-model') {
      return <HelixCanvas config={{
        enabled: true,
        rotationSpeed: 0.2,
        scale: 7,
        hoverScale: 7.7,
        position: { x: 7, y: 0, z: 0 },
        rotation: { x: 90, y: -24, z: 0 }
      }} />
    }
    
    if (data.background.type === 'image' && data.background.media) {
      return (
        <div className="absolute inset-0">
          <img
            src={data.background.media.url}
            alt={data.background.media.alt}
            className="w-full h-full object-cover"
          />
          {data.background.overlay && (
            <div className="absolute inset-0 bg-black/40" />
          )}
        </div>
      )
    }
    
    return null
  }

  const handleButtonClick = (button: any) => {
    switch (button.action) {
      case 'scroll':
        if (button.link) {
          const element = document.querySelector(button.link)
          element?.scrollIntoView({ behavior: 'smooth' })
        }
        break
      case 'modal':
        // Handle modal opening
        console.log('Open modal for:', button.text)
        break
      case 'link':
      default:
        if (button.link) {
          window.location.href = button.link
        }
        break
    }
  }

  const getVariantClasses = () => {
    switch (data.variant) {
      case 'high-impact':
        return 'px-6 py-20 -mt-14 pt-32 min-h-[80vh]'
      case 'medium-impact':
        return 'px-6 py-16 -mt-14 pt-24 min-h-[60vh]'
      case 'low-impact':
        return 'px-6 py-12 -mt-14 pt-20 min-h-[40vh]'
      case 'post':
        return 'px-6 py-8 -mt-14 pt-16 min-h-[30vh]'
      default:
        return 'px-6 py-20 -mt-14 pt-32 min-h-[60vh]'
    }
  }

  return (
    <section className={`relative ${getVariantClasses()} overflow-hidden`}>
      {renderBackground()}

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
          {data.badge && (
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
            </motion.div>
          )}
          
          <motion.h1 
            className="text-5xl lg:text-6xl font-serif font-medium leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.headline}
          </motion.h1>

          {data.description && (
            <motion.p 
              className="text-lg text-white/80 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {data.description}
            </motion.p>
          )}
          
          {data.buttons && data.buttons.length > 0 && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {data.buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={button.variant}
                  onClick={() => handleButtonClick(button)}
                >
                  {button.text}
                  {button.variant === 'cta' && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
