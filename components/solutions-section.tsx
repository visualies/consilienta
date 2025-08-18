"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FadeUpAnimation, StaggeredFadeUp, CardAnimation } from "@/components/ui/motion-wrappers"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface SolutionItem {
  headline: string
  logo?: {
    url: string
    alt?: string
  }
  color?: string
  bodyText: string
  popupText?: string
}

interface SolutionsSectionProps {
  data?: {
    title: string
    subtitle: string
    solutionsList: Array<SolutionItem>
  }
}

const defaultData = {
  title: "How We Help",
  subtitle: "We are providing services in the area of regulatory affairs and strategic product development for diverse innovative therapies.",
  solutionsList: [
    {
      headline: "Regulatory Strategy",
      bodyText: "Strategy and Planning, Orphan and Pediatric, Due Diligence, Training and Coaching, Embedded Regulatory Function.",
      color: "#3B82F6",
    },
    {
      headline: "Agency Interactions", 
      bodyText: "Scientific and Regulatory Support, Scientific Advice, Dossier Preparation, EU Regulatory Agent Services.",
      color: "#10B981",
    },
    {
      headline: "Classification and Designation",
      bodyText: "Product Classification, Expedited Development Programs, New Active Substance Assessment.",
      color: "#F59E0B",
    },
    {
      headline: "Drug Development",
      bodyText: "Advice on Manufacturing, Nonclinical and Clinical Development Plans, Translational Liaison Service.",
      color: "#EF4444",
    },
    {
      headline: "Safety",
      bodyText: "Microbial and Viral Safety, Material of Animal and Human Origin, GMO and Risk Assessments.",
      color: "#8B5CF6",
    },
    {
      headline: "Innovative Medicines",
      bodyText: "ATMPs, Biologics/Synthetics, Innovative Small Molecules, Combination Products, Individualized Therapies.",
      color: "#06B6D4",
    },
  ]
}

export function SolutionsSection({ data = defaultData }: SolutionsSectionProps) {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null)

  return (
    <>
      <section 
        className="px-6 py-20 relative z-10"
        style={{
          paddingBottom: '8rem',
          marginBottom: '-3rem'
        }}
      >
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
            {data.solutionsList.map((solution, index) => (
              <CardAnimation
                key={index}
                delay={0.6 + (index * 0.1)}
              >
                <Card 
                  className="frosted-glass-navbar hover:shadow-xl transition-all duration-200 ease-out h-full border-0 cursor-pointer"
                  onClick={() => solution.popupText && setSelectedSolution(solution)}
                >
                  <CardContent className="p-8 space-y-4 relative">
                    <div className="flex items-start justify-between">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: solution.color || '#3B82F6' }}
                      >
                        {solution.logo ? (
                          <div className="w-8 h-8 relative">
                            <Image
                              src={solution.logo.url}
                              alt={solution.logo.alt || solution.headline}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-white rounded-sm"></div>
                        )}
                      </div>
                      {solution.popupText && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-1 h-auto text-white/70 hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-normal text-white">{solution.headline}</h3>
                    <p className="text-white/90 leading-relaxed">{solution.bodyText}</p>
                    {solution.popupText && (
                      <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30">
                        Click for details
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </CardAnimation>
            ))}
          </StaggeredFadeUp>
        </div>
      </section>

      <Dialog open={!!selectedSolution} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <div className="flex items-center gap-4">
              {selectedSolution?.logo && (
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={selectedSolution.logo.url}
                    alt={selectedSolution.logo.alt || selectedSolution.headline}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <DialogTitle className="text-2xl font-serif">
                {selectedSolution?.headline}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="prose prose-lg max-w-none">
            {selectedSolution?.popupText && (
              <div dangerouslySetInnerHTML={{ __html: selectedSolution.popupText }} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}