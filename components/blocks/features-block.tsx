"use client"

import { FeaturesSection } from "@/components/landing/features-section"

interface FeaturesBlockProps {
  data: {
    title: string
    subtitle: string
    featuresList: Array<{
      icon: string
      title: string
      description: string
    }>
  }
}

export function FeaturesBlock({ data }: FeaturesBlockProps) {
  return <FeaturesSection data={data} />
}