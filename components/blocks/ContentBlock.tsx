"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ContentBlockProps {
  data: {
    content: any // Rich text content from Payload
    width: 'full' | 'container' | 'narrow'
    background: {
      type: 'none' | 'solid' | 'image'
      color?: string
      image?: {
        url: string
        alt: string
      }
    }
  }
}

export function ContentBlock({ data }: ContentBlockProps) {
  const contentRef = useRef(null)
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })

  const getWidthClasses = () => {
    switch (data.width) {
      case 'full':
        return 'w-full'
      case 'narrow':
        return 'max-w-2xl mx-auto'
      case 'container':
      default:
        return 'max-w-4xl mx-auto'
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

  return (
    <motion.section
      ref={contentRef}
      className="px-6 py-16 relative"
      style={getBackgroundStyle()}
    >
      {data.background.type === 'image' && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      
      <div className={`relative z-10 ${getWidthClasses()}`}>
        <motion.div
          className="prose prose-lg prose-white max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Note: In a real implementation, you'd use a rich text renderer here */}
          {/* For now, we'll just render the content as a string */}
          <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
        </motion.div>
      </div>
    </motion.section>
  )
}
