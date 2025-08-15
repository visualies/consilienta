"use client"

import { CTASection } from "@/components/landing/cta-section"

interface CTABlockProps {
  title: string
  description: string
  primaryButton: {
    text: string
    link: string
  }
  secondaryButton: {
    text: string
    link: string
  }
}

export function CTABlock(props: CTABlockProps) {
  return (
    <CTASection data={props} />
  )
}