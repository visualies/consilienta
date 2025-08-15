"use client"

import { useState, useEffect } from 'react'

interface LandingPageData {
  header?: any
  hero?: any
  features?: any
  cta?: any
  footer?: any
  helix?: any
}

interface UseLandingPageReturn {
  data: LandingPageData | null
  isLoading: boolean
  error: string | null
}

export function useLandingPage(): UseLandingPageReturn {
  const [data, setData] = useState<LandingPageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const response = await fetch('/api/landing-page')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch landing page data: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch landing page data')
        // Set default data structure
        setData({
          header: null,
          hero: null,
          features: null,
          cta: null,
          footer: null,
          helix: null
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLandingPageData()
  }, [])

  return { data, isLoading, error }
}