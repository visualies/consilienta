"use client"

import { useGlobals } from '@/hooks/useGlobals'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { data: globalsData, isLoading, error } = useGlobals()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (error || !globalsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Failed to load site data</div>
      </div>
    )
  }

  return (
    <>
      <Header data={globalsData.header} />
      <main>{children}</main>
      <Footer data={globalsData.footer} />
    </>
  )
}