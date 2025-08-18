"use client"

import { BackgroundImage } from "@/components/ui/background-image"

interface BackgroundImageBlockProps {
  data?: {
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
}

export function BackgroundImageBlock({ data }: BackgroundImageBlockProps) {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <BackgroundImage backgroundImage={data?.backgroundImage} />
    </div>
  )
}