"use client"

import { useLandingPage } from '@/hooks/useLandingPage'
import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export default function ClientDynamicLanding() {
  const { data, isLoading, error } = useLandingPage()

  if (isLoading) {
    return (
      <div className="min-h-screen brand-gradient-no-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    console.warn('Failed to load dynamic content, using defaults:', error)
  }

  return (
    <div className="min-h-screen brand-gradient-no-black">
      <Header 
        isOverWhite={false}
        data={data?.header}
      />
      <HeroSection 
        data={data?.hero}
        helixConfig={data?.helix}
      />
      <FeaturesSection data={data?.features} />
      <CTASection data={data?.cta} />
      <Footer data={data?.footer} />
    </div>
  )
}