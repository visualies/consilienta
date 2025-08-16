"use client"

import { ProfessionalEmployeeCard } from '@/components/ui/professional-employee-card'
import { FadeUpAnimation, StaggeredFadeUp, CardAnimation } from "@/components/ui/motion-wrappers"

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

interface EmployeeSection {
  sectionTitle: string
  employees: Employee[]
}

interface AboutSectionProps {
  data: {
    title: string
    subtitle?: string
    sections: EmployeeSection[]
  }
}

export function AboutSection({ data }: AboutSectionProps) {
  // Flatten all employees from all sections into one array
  const allEmployees = data.sections.flatMap(section => 
    section.employees.map(employee => ({
      ...employee,
      sectionTitle: section.sectionTitle
    }))
  )

  return (
    <>
      {/* Header Section with gradient background */}
      <section className="relative px-6 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUpAnimation className="text-center space-y-4">
            <FadeUpAnimation delay={0.2}>
              <h1 className="text-3xl lg:text-4xl font-serif font-normal text-white">
                {data.title}
              </h1>
            </FadeUpAnimation>
            {data.subtitle && (
              <FadeUpAnimation delay={0.4}>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  {data.subtitle}
                </p>
              </FadeUpAnimation>
            )}
          </FadeUpAnimation>
        </div>
      </section>

      {/* Cards Section with frosted glass background */}
      <section 
        className="px-6 py-20 relative z-10"
        style={{
          paddingBottom: '6rem'
        }}
      >
        <div className="absolute inset-0 bg-white opacity-30"></div>
        <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <StaggeredFadeUp 
            className="grid grid-cols-1 gap-8"
            staggerDelay={0.1}
          >
            {allEmployees.map((employee, employeeIndex) => (
              <FadeUpAnimation
                key={employeeIndex}
                delay={0.6 + (employeeIndex * 0.1)}
              >
                <ProfessionalEmployeeCard
                  name={employee.name}
                  position={employee.position}
                  bio={employee.bio}
                  photo={employee.photo}
                  email={employee.email}
                  phone={employee.phone}
                  socialLinks={employee.socialLinks}
                />
              </FadeUpAnimation>
            ))}
          </StaggeredFadeUp>
        </div>
      </section>
    </>
  )
}