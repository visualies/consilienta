"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

interface CTABlockProps {
  data: {
    variant: 'standard' | 'split' | 'full-width'
    title: string
    description?: string
    background: {
      type: 'solid' | 'gradient' | 'image'
      color?: string
      image?: {
        url: string
        alt: string
      }
    }
    buttons: Array<{
      text: string
      variant: 'primary' | 'secondary' | 'cta'
      link?: string
      action: 'link' | 'modal' | 'scroll'
    }>
  }
}

export function CTABlock({ data }: CTABlockProps) {
  const { scrollYProgress } = useScroll()
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

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
      case 'standard':
        return 'px-6 pt-48 pb-32'
      case 'split':
        return 'px-6 py-32'
      case 'full-width':
        return 'px-6 py-32'
      default:
        return 'px-6 pt-48 pb-32'
    }
  }

  const getBackgroundStyle = () => {
    if (data.background.type === 'image' && data.background.image) {
      return {
        backgroundImage: `url(${data.background.image.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    if (data.background.type === 'solid' && data.background.color) {
      return {
        backgroundColor: data.background.color,
      }
    }
    return {}
  }

  const renderContent = () => {
    if (data.variant === 'split') {
      return (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.h2
              className="text-4xl lg:text-5xl font-serif font-medium text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              {data.title}
            </motion.h2>
            {data.description && (
              <motion.p
                className="text-xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {data.description}
              </motion.p>
            )}
          </div>
          <div className="space-y-6">
            {data.buttons && data.buttons.length > 0 && (
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
          </div>
        </div>
      )
    }

    return (
      <div className="text-center space-y-8">
        <motion.h2
          className="text-4xl lg:text-5xl font-serif font-medium text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {data.title}
        </motion.h2>
        {data.description && (
          <motion.p
            className="text-xl text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.description}
          </motion.p>
        )}
        {data.buttons && data.buttons.length > 0 && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
      </div>
    )
  }

  return (
    <motion.section
      ref={ctaRef}
      className={getVariantClasses()}
      style={{
        y: useTransform(scrollYProgress, [0.6, 1], ['0%', '-5%']),
        paddingBottom: data.variant === 'full-width' ? '8rem' : '10rem',
        marginBottom: data.variant === 'full-width' ? '0' : '-3rem',
        ...getBackgroundStyle(),
      }}
    >
      <div className={`max-w-4xl mx-auto ${data.variant === 'full-width' ? 'max-w-none' : ''}`}>
        {renderContent()}
      </div>
    </motion.section>
  )
}
