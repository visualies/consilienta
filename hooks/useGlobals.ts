"use client"

import { useEffect, useState } from 'react'

interface HeaderData {
  logo: {
    url: string
    alt: string
  }
  logoWhite: {
    url: string
    alt: string
  }
  navigation: Array<{
    label: string
    link: string
  }>
  contactButton: {
    text: string
    link: string
  }
}

interface FooterData {
  logo: {
    url: string
    alt: string
  }
  description: string
  socialLinks: Array<{
    platform: string
    url: string
  }>
  services: Array<{
    name: string
    link: string
  }>
  companyLinks: Array<{
    name: string
    link: string
  }>
  copyright: string
  legalLinks: Array<{
    name: string
    link: string
  }>
}

interface GlobalsData {
  header: HeaderData
  footer: FooterData
}

export function useGlobals() {
  const [data, setData] = useState<GlobalsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGlobals = async () => {
      try {
        const response = await fetch('/api/globals/globals')
        if (!response.ok) {
          throw new Error('Failed to fetch globals')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGlobals()
  }, [])

  return { data, isLoading, error }
}