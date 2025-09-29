"use client"

import { useState, useEffect } from "react"

export function useScrollHeader(enableColorChange: boolean = true, threshold?: number) {
  const [isOverWhite, setIsOverWhite] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!enableColorChange) {
        setIsOverWhite(false)
        return
      }
      
      const scrollY = window.scrollY
      const heroHeight = threshold ? (window.innerHeight * (threshold / 100)) : (window.innerHeight * 0.55)
      setIsOverWhite(scrollY > heroHeight)
    }

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

  return { isOverWhite }
}