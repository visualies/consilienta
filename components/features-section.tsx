"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, Globe, Zap, Award } from "lucide-react"
import { FadeUpAnimation, StaggeredFadeUp, CardAnimation } from "@/components/ui/motion-wrappers"

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Users':
      return <Users className="h-6 w-6" />
    case 'Globe':
      return <Globe className="h-6 w-6" />
    case 'Target':
      return <Target className="h-6 w-6" />
    case 'Award':
      return <Award className="h-6 w-6" />
    case 'Zap':
      return <Zap className="h-6 w-6" />
    case 'Lightbulb':
      return <Lightbulb className="h-6 w-6" />
    default:
      return <Users className="h-6 w-6" />
  }
}

interface FeaturesSectionProps {
  data?: {
    title: string
    subtitle: string
    featuresList: Array<{
      icon: string
      title: string
      description: string
    }>
  }
}

const defaultData = {
  title: "Why Choose Consilienta",
  subtitle: "Comprehensive pharmaceutical consulting services",
  featuresList: [
    {
      icon: "Users",
      title: "Expert Team",
      description: "World-class pharmaceutical experts"
    },
    {
      icon: "Globe",
      title: "Global Reach",
      description: "International regulatory knowledge"
    },
    {
      icon: "Target",
      title: "Proven Results",
      description: "Successful product approvals"
    }
  ]
}

export function FeaturesSection({ data = defaultData }: FeaturesSectionProps) {
  return (
    <section 
      className="px-6 py-20 relative z-10"
      style={{
        paddingBottom: '8rem',
        marginBottom: '-3rem'
      }}
    >
      <div className="absolute inset-0 frosted-overlay"></div>
      <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUpAnimation className="text-center space-y-4 mb-16">
          <FadeUpAnimation delay={0.2}>
            <h2 className="text-4xl font-serif font-normal text-white">
              {data.title}
            </h2>
          </FadeUpAnimation>
          <FadeUpAnimation delay={0.4}>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          </FadeUpAnimation>
        </FadeUpAnimation>

        <StaggeredFadeUp className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {data.featuresList.map((feature, index) => (
            <CardAnimation
              key={index}
              delay={0.6 + (index * 0.1)}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out h-full border-0 outline outline-2 outline-white/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-brand">
                    {getIconComponent(feature.icon)}
                  </div>
                  <h3 className="text-xl font-serif font-normal text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </CardAnimation>
          ))}
        </StaggeredFadeUp>
      </div>
    </section>
  )
}