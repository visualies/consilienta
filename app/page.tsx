"use client"

import { useState, useEffect } from "react"
import { Header, HeroSection, FeaturesSection, CTASection, Footer } from "@/components/landing"


export default function ConsilientsLanding() {
  const [isOverWhite, setIsOverWhite] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.55 // More precise threshold
      setIsOverWhite(scrollY > heroHeight)
    }

    // Add throttling to prevent excessive updates
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  return (
    <div className="min-h-screen brand-gradient-no-black">
      <Header isOverWhite={isOverWhite} />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  )
}
