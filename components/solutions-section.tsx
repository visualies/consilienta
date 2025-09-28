"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FadeUpAnimation, StaggeredFadeUp, CardAnimation } from "@/components/ui/motion-wrappers"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import RichText from "@/components/ui/rich-text"
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface SolutionItem {
  headline: string
  logo?: {
    url: string
    alt?: string
  }
  color?: string
  bodyText: string
  popupText?: DefaultTypedEditorState
}

interface SolutionsSectionProps {
  data?: {
    solutionsList: Array<SolutionItem>
  }
}

const defaultData = {
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
        <div className="absolute inset-0 frosted-overlay"></div>
        <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <StaggeredFadeUp className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {data.solutionsList.map((solution, index) => (
              <CardAnimation
                key={index}
                delay={0.6 + (index * 0.1)}
              >
                <Card
                  className="bg-white shadow-lg h-full border-0 outline outline-2 outline-white/20 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer"
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
                          className="p-1 h-auto text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-normal text-gray-800">{solution.headline}</h3>
                    <p className="text-gray-600 leading-relaxed">{solution.bodyText}</p>
                    {solution.popupText && (
                      <Badge variant="secondary" className="mt-2 bg-gray-100 text-gray-700 border-gray-200">
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
        <DialogContent className="!max-w-[90vw] w-[90vw] max-h-[80vh] overflow-y-auto sm:!max-w-[90vw] bg-white [&_button]:text-gray-600 [&_button]:hover:text-gray-900">
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
              <DialogTitle className="text-2xl font-serif text-gray-900">
                {selectedSolution?.headline}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="prose prose-lg max-w-none
            [&_h1]:text-4xl [&_h1]:font-serif [&_h1]:font-normal [&_h1]:mb-6 [&_h1]:text-gray-900
            [&_h2]:text-3xl [&_h2]:font-serif [&_h2]:font-normal [&_h2]:mb-4 [&_h2]:text-gray-900
            [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-normal [&_h3]:mb-2 [&_h3]:text-gray-900
            [&_h4]:text-lg [&_h4]:font-serif [&_h4]:font-normal [&_h4]:mb-2 [&_h4]:text-gray-900
            [&_h5]:text-base [&_h5]:font-serif [&_h5]:font-normal [&_h5]:mb-2 [&_h5]:text-gray-900
            [&_h6]:text-sm [&_h6]:font-serif [&_h6]:font-normal [&_h6]:mb-2 [&_h6]:text-gray-900
            [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-700
            [&_strong]:font-semibold [&_strong]:text-gray-900
            [&_em]:italic [&_em]:text-gray-700
            [&_u]:underline [&_u]:text-gray-700
            [&_s]:line-through [&_s]:text-gray-600
            [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-gray-800
            [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-mono
            [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:mb-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
            [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_ol]:space-y-1
            [&_li]:text-gray-700
            [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:text-blue-600 [&_a]:hover:text-blue-800
            [&_hr]:border-0 [&_hr]:h-px [&_hr]:my-8 [&_hr]:bg-gray-300
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-4
            [&_figure]:my-6 [&_figure]:text-center
            [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-2 [&_figcaption]:italic
          ">
            {selectedSolution?.popupText && (
              <RichText data={selectedSolution.popupText} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}