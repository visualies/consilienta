"use client"

import { SolutionsSection } from "@/components/landing/solutions-section"

interface SolutionItem {
  headline: string
  logo?: {
    url: string
    alt?: string
  }
  color?: string
  bodyText: string
  popupText?: string
}

interface SolutionsBlockProps {
  title: string
  subtitle: string
  solutionsList: Array<SolutionItem>
  [key: string]: any
}

export function SolutionsBlock({ title, subtitle, solutionsList, ...rest }: SolutionsBlockProps) {
  const data = {
    title,
    subtitle,
    solutionsList
  }
  return <SolutionsSection data={data} />
}