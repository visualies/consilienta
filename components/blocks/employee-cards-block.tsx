"use client"

import { useState, useEffect } from 'react'
import { EmployeeCard } from '@/components/ui/employee-card'
import { FadeUpAnimation, StaggeredFadeUp } from "@/components/ui/motion-wrappers"

interface Employee {
  name: string
  position: string
  bio: string
  photo?: {
    url: string
    alt?: string
  }
  email?: string
  phone?: string
  socialLinks?: Array<{
    platform: 'linkedin' | 'twitter' | 'email' | 'website'
    url: string
  }>
}

interface EmployeeCardsBlockProps {
  data: {
    layout?: 'default' | 'cards'
    sections: Array<{
      sectionTitle: string
      employees: Employee[]
    }>
  }
}

export function EmployeeCardsBlock({ data }: EmployeeCardsBlockProps) {
  const [layoutType, setLayoutType] = useState<'big' | 'medium' | 'small'>('big')
  const [switchToMediumWidth, setSwitchToMediumWidth] = useState<number | null>(null)
  const [lastNonSmallLayout, setLastNonSmallLayout] = useState<'big' | 'medium'>('medium')

  // Flatten employees from all sections
  const allEmployees = data.sections.flatMap(section => section.employees)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let measurementTimeoutId: NodeJS.Timeout
    let isChecking = false

    const checkLayout = () => {
      // Clear any pending checks
      clearTimeout(timeoutId)
      clearTimeout(measurementTimeoutId)
      
      // Reset checking flag when new resize starts
      isChecking = false
      
      timeoutId = setTimeout(() => {
        // Prevent multiple simultaneous checks
        if (isChecking) return
        isChecking = true
        const windowWidth = window.innerWidth
        
        // Check for small layout first (mobile)
        if (windowWidth < 640) { // sm breakpoint
          setLayoutType(prev => {
            // Remember the last non-small layout before switching to small
            if (prev !== 'small') {
              setLastNonSmallLayout(prev)
            }
            return 'small'
          })
          isChecking = false
          return
        }

        // When leaving small layout, start with the remembered layout to avoid flicker
        setLayoutType(prev => {
          if (prev === 'small') {
            return lastNonSmallLayout
          }
          return prev
        })

        // Find the first card to test overflow for big vs medium
        const firstCard = document.querySelector('[data-employee-card]') as HTMLElement
        if (!firstCard) {
          setLayoutType('medium')
          isChecking = false
          return
        }

        const bigLayoutContainer = firstCard.querySelector('[data-layout="big"]') as HTMLElement
        const bioRef = firstCard.querySelector('[data-bio-ref]') as HTMLElement
        
        if (!bigLayoutContainer || !bioRef) {
          setLayoutType('medium')
          isChecking = false
          return
        }

        // Back to the working approach with adaptive hysteresis
        setLayoutType(prev => {
          let newLayout = prev
          
          // If currently showing big layout, measure overflow directly
          if (prev === 'big' && !bigLayoutContainer.classList.contains('hidden')) {
            const bioContainer = bigLayoutContainer.querySelector('[data-bio-container="true"]') as HTMLElement
            if (bioContainer && bioRef) {
              const lineHeight = parseInt(getComputedStyle(bioRef).lineHeight) || 24
              const buffer = lineHeight
              const isOverflowing = bioRef.scrollHeight > (bioContainer.clientHeight - buffer)
              if (isOverflowing) {
                setSwitchToMediumWidth(windowWidth)
                newLayout = 'medium'
              } else {
                newLayout = 'big'
              }
            }
          }
          
          // If currently medium, use remembered width + small buffer to go back to big
          if (prev === 'medium') {
            const threshold = switchToMediumWidth ? switchToMediumWidth + 50 : 1200
            newLayout = windowWidth > threshold ? 'big' : 'medium'
          }
          
          // Update the remembered non-small layout
          if (newLayout !== 'small') {
            setLastNonSmallLayout(newLayout)
          }
          
          return newLayout
        })
        
        // Reset checking flag
        isChecking = false
      }, 150)
    }

    checkLayout()
    window.addEventListener('resize', checkLayout)

    return () => {
      window.removeEventListener('resize', checkLayout)
      clearTimeout(timeoutId)
      clearTimeout(measurementTimeoutId)
    }
  }, [allEmployees])

  return (
    <section 
      className="px-6 pt-6 pb-20 relative z-10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {data.layout === 'cards' ? (
          <StaggeredFadeUp 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            style={{ gridAutoRows: '1fr' }}
            staggerDelay={0.1}
          >
            {allEmployees.map((employee, employeeIndex) => (
              <FadeUpAnimation
                key={employeeIndex}
                delay={0.6 + (employeeIndex * 0.1)}
              >
                <EmployeeCard
                  name={employee.name}
                  position={employee.position}
                  bio={employee.bio}
                  photo={employee.photo}
                  email={employee.email}
                  phone={employee.phone}
                  socialLinks={employee.socialLinks}
                  layoutType="medium"
                  cardStyle="vertical"
                />
              </FadeUpAnimation>
            ))}
          </StaggeredFadeUp>
        ) : (
          <StaggeredFadeUp 
            className="grid grid-cols-1 gap-8"
            staggerDelay={0.1}
          >
            {allEmployees.map((employee, employeeIndex) => (
              <FadeUpAnimation
                key={employeeIndex}
                delay={0.6 + (employeeIndex * 0.1)}
              >
                <EmployeeCard
                  name={employee.name}
                  position={employee.position}
                  bio={employee.bio}
                  photo={employee.photo}
                  email={employee.email}
                  phone={employee.phone}
                  socialLinks={employee.socialLinks}
                  layoutType={layoutType}
                />
              </FadeUpAnimation>
            ))}
          </StaggeredFadeUp>
        )}
      </div>
    </section>
  )
}