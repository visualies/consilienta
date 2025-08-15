"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface MediaBlockProps {
  data: {
    media: {
      url: string
      alt: string
      filename: string
    }
    caption?: string
    alignment: 'left' | 'center' | 'right' | 'full'
    size: 'small' | 'medium' | 'large'
  }
}

export function MediaBlock({ data }: MediaBlockProps) {
  const mediaRef = useRef(null)
  const mediaInView = useInView(mediaRef, { once: true, margin: "-100px" })

  const getAlignmentClasses = () => {
    switch (data.alignment) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'center':
        return 'text-center'
      case 'full':
        return 'w-full'
      default:
        return 'text-center'
    }
  }

  const getSizeClasses = () => {
    switch (data.size) {
      case 'small':
        return 'max-w-md'
      case 'large':
        return 'max-w-4xl'
      case 'medium':
      default:
        return 'max-w-2xl'
    }
  }

  const isVideo = data.media.filename.match(/\.(mp4|webm|ogg|mov)$/i)
  const isImage = data.media.filename.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)

  const renderMedia = () => {
    if (isVideo) {
      return (
        <video
          src={data.media.url}
          controls
          className="w-full h-auto rounded-lg shadow-lg"
        >
          <source src={data.media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }

    if (isImage) {
      return (
        <img
          src={data.media.url}
          alt={data.media.alt}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      )
    }

    // Fallback for other file types
    return (
      <div className="w-full p-8 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Media file: {data.media.filename}</p>
        <a 
          href={data.media.url} 
          className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download File
        </a>
      </div>
    )
  }

  return (
    <motion.section
      ref={mediaRef}
      className="px-6 py-16"
    >
      <div className={`mx-auto ${getAlignmentClasses()}`}>
        <motion.div
          className={`${getSizeClasses()} ${data.alignment === 'full' ? 'w-full' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={mediaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {renderMedia()}
          
          {data.caption && (
            <motion.p
              className="mt-4 text-sm text-gray-600 italic"
              initial={{ opacity: 0, y: 20 }}
              animate={mediaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {data.caption}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
