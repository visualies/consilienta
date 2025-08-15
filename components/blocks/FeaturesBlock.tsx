"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, Globe, Zap, Award } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface FeaturesBlockProps {
  data: {
    title?: string
    subtitle?: string
    layout: 'grid-2x3' | 'grid-3x2' | 'list' | 'carousel'
    features: Array<{
      icon: 'Users' | 'Target' | 'Lightbulb' | 'Globe' | 'Zap' | 'Award' | 'custom'
      customIcon?: {
        url: string
        alt: string
      }
      title: string
      description?: string
      link?: string
    }>
  }
}

const getIconComponent = (iconName: string, customIcon?: any) => {
  if (iconName === 'custom' && customIcon) {
    return <img src={customIcon.url} alt={customIcon.alt} className="h-6 w-6" />
  }
  
  switch (iconName) {
    case 'Users':
      return <Users className="h-6 w-6" />
    case 'Globe':
      return <Globe className="h-6 w-6" />
    case 'Target':
      return <Target className="h-6 w-6" />
    case 'Award':
      return <Award className="h-6 w-6" />
    case 'Zap':
      return <Zap className="h-6 w-6" />
    case 'Lightbulb':
      return <Lightbulb className="h-6 w-6" />
    default:
      return <Users className="h-6 w-6" />
  }
}

const getLayoutClasses = (layout: string) => {
  switch (layout) {
    case 'grid-2x3':
      return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
    case 'grid-3x2':
      return 'grid md:grid-cols-3 gap-8'
    case 'list':
      return 'space-y-6'
    case 'carousel':
      return 'flex overflow-x-auto gap-6 pb-4'
    default:
      return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
  }
}

export function FeaturesBlock({ data }: FeaturesBlockProps) {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })

  const renderFeature = (feature: any, index: number) => {
    const featureContent = (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={featuresInView ? { 
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
          delay: featuresInView ? 0.6 + (index * 0.1) : 0,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.025, 
          y: -2,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.98 }}
        className={data.layout === 'carousel' ? 'flex-shrink-0 w-80' : ''}
      >
        <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out h-full border-0 outline outline-2 outline-white/20">
          <CardContent className="p-8 space-y-4">
            <motion.div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: 'var(--brand-purple)' }}
            >
              {getIconComponent(feature.icon, feature.customIcon)}
            </motion.div>
            <h3 className="text-xl font-serif font-normal text-gray-800">{feature.title}</h3>
            {feature.description && (
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )

    if (feature.link) {
      return (
        <a key={index} href={feature.link} className="block hover:no-underline">
          {featureContent}
        </a>
      )
    }

    return featureContent
  }

  return (
    <motion.section 
      ref={featuresRef}
      className="px-6 py-20 relative z-10"
      style={{
        paddingBottom: '8rem',
        marginBottom: '-3rem'
      }}
    >
      <div className="absolute inset-0 bg-white opacity-40"></div>
      <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {(data.title || data.subtitle) && (
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            {data.title && (
              <motion.h2 
                className="text-4xl font-serif font-normal text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {data.title}
              </motion.h2>
            )}
            {data.subtitle && (
              <motion.p 
                className="text-xl text-white/90 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {data.subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        <div className={getLayoutClasses(data.layout)}>
          {data.features.map((feature, index) => renderFeature(feature, index))}
        </div>
      </div>
    </motion.section>
  )
}
