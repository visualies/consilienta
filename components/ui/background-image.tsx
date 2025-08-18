"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface BackgroundImageProps {
  backgroundImage?: {
    enabled: boolean
    image?: {
      url: string
      alt?: string
    }
    size?: number
    positionX?: number
    positionY?: number
    color?: string
    opacity?: number
    zIndex?: number
  }
}

export function BackgroundImage({ backgroundImage }: BackgroundImageProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!backgroundImage?.enabled || !backgroundImage.image) {
    return null
  }

  // Apply minor parallax effect
  const parallaxOffset = scrollY * 0.05

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        width: `${backgroundImage.size || 20}%`,
        height: `${backgroundImage.size || 20}%`,
        left: `${backgroundImage.positionX || 50}%`,
        top: `${backgroundImage.positionY || 50}%`,
        transform: `translate(-50%, -50%) translateY(${parallaxOffset}px)`,
        opacity: backgroundImage.opacity || 0.8,
        zIndex: backgroundImage.zIndex || 1
      }}
    >
      <Image
        src={backgroundImage.image.url}
        alt={backgroundImage.image.alt || 'Background decoration'}
        fill
        className="object-contain"
        style={{
          filter: backgroundImage.color ? 
            `sepia(1) saturate(5) hue-rotate(180deg)` : undefined
        }}
      />
    </div>
  )
}