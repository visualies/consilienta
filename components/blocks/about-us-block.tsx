"use client"

import { AboutSection } from "@/components/about-section"

interface AboutUsBlockProps {
  data: {
    title: string
    subtitle?: string
    layout?: 'default' | 'cards'
    sections: Array<{
      sectionTitle: string
      employees: Array<{
        name: string
        position: string
        bio: string
        photo?: {
          url: string
          alt?: string
        }
        email?: string
        phone?: string
        socialLinks?: Array<{
          platform: 'linkedin' | 'twitter' | 'email' | 'website'
          url: string
        }>
      }>
    }>
  }
}

export function AboutUsBlock({ data }: AboutUsBlockProps) {
  return <AboutSection data={data} />
}