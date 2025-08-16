"use client"

import { EmployeeCard } from '@/components/ui/employee-card'
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Target, Lightbulb } from "lucide-react"

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
  const aboutRef = useRef(null)
  const storyRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)
  
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })

  const companyValues = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in pharmaceutical consulting, ensuring every client receives world-class expertise and attention to detail."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Partnership",
      description: "We believe in true collaboration, working as an extension of your team to achieve shared goals and breakthrough innovations."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Results",
      description: "Our success is measured by your success. We're committed to delivering tangible outcomes that advance your product development journey."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We embrace cutting-edge approaches and emerging technologies to solve complex pharmaceutical development challenges."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        ref={aboutRef}
        className="px-6 py-20 relative z-10"
        style={{
          paddingBottom: '8rem',
          marginBottom: '-3rem'
        }}
      >
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={aboutInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="frosted-glass text-white border-0 mb-4">Our Story</Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-serif font-normal text-white max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Pioneering pharmaceutical excellence through expert guidance
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              From groundbreaking research to regulatory approval, we navigate the complexities of pharmaceutical development with unparalleled expertise and unwavering commitment to your success.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        ref={storyRef}
        className="px-6 py-20 bg-white relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <Badge className="mb-4" style={{ backgroundColor: 'var(--brand-purple)', color: 'white' }}>
                  Founded on Excellence
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-serif font-normal text-gray-900 mb-6">
                  Born from a vision to transform pharmaceutical development
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Consilienta was founded by industry veterans who recognized the need for specialized, high-quality consulting in the rapidly evolving pharmaceutical landscape. Our founders brought together decades of experience from regulatory agencies, leading pharmaceutical companies, and cutting-edge research institutions.
                </p>
                <p>
                  What started as a small team of passionate experts has grown into a trusted partner for pharmaceutical companies worldwide, from innovative biotech startups to established industry leaders. Our approach combines deep regulatory knowledge with practical industry experience, ensuring our clients navigate complex development pathways with confidence.
                </p>
                <p>
                  Today, we continue to evolve alongside the industry, embracing new technologies and methodologies while maintaining our core commitment to excellence, integrity, and client success.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-purple-100 to-blue-50 rounded-2xl p-8 h-96">
                <div className="absolute inset-0 brand-gradient opacity-10 rounded-2xl"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-serif text-gray-800">2010</div>
                    <div className="text-lg text-gray-600">Founded with a mission to excellence</div>
                    <div className="flex items-center justify-center space-x-8 mt-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--brand-purple)' }}>500+</div>
                        <div className="text-sm text-gray-600">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--brand-purple)' }}>50+</div>
                        <div className="text-sm text-gray-600">Satisfied Clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        ref={valuesRef}
        className="px-6 py-20 relative"
        style={{ backgroundColor: '#f8fafc' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4" style={{ backgroundColor: 'var(--brand-purple)', color: 'white' }}>
              Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-normal text-gray-900 mb-6">
              Principles that drive our success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values shape every interaction, decision, and outcome we deliver for our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={valuesInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 50, 
                  scale: 0.9 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: valuesInView ? 0.2 + (index * 0.1) : 0,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto"
                      style={{ backgroundColor: 'var(--brand-purple)' }}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-serif font-normal text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        ref={teamRef}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4" style={{ backgroundColor: 'var(--brand-purple)', color: 'white' }}>
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-normal text-gray-900 mb-6">
              Meet the experts behind your success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines regulatory expertise, industry experience, and innovative thinking to deliver exceptional results.
            </p>
          </motion.div>
          
          {data.sections.map((section, sectionIndex) => (
            <motion.div 
              key={sectionIndex} 
              className="mb-16 last:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + (sectionIndex * 0.1) }}
            >
              {section.sectionTitle && (
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.4 + (sectionIndex * 0.1) }}
                >
                  <h3 className="text-2xl font-serif font-normal text-gray-800">
                    {section.sectionTitle}
                  </h3>
                </motion.div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.employees.map((employee, employeeIndex) => (
                  <motion.div
                    key={employeeIndex}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={teamInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 50, 
                      scale: 0.9 
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: teamInView ? 0.6 + (sectionIndex * 0.1) + (employeeIndex * 0.1) : 0,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <EmployeeCard
                      name={employee.name}
                      position={employee.position}
                      bio={employee.bio}
                      photo={employee.photo}
                      email={employee.email}
                      phone={employee.phone}
                      socialLinks={employee.socialLinks}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  )
}