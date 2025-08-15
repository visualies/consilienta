"use client"

import { FeaturesSection } from "@/components/landing/features-section"

interface FeaturesBlockProps {
  title: string
  subtitle: string
  featuresList: Array<{
    icon: string
    title: string
    description: string
  }>
}

export function FeaturesBlock(props: FeaturesBlockProps) {
  return (
    <FeaturesSection data={props} />
  )
}