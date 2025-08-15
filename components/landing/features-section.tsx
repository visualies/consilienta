"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, Globe, Zap, Award } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Team",
    description: "Blend of ex-regulatory, industry, consulting and academic experience",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Broad Experience",
    description: "From small biotech startups to large pharmaceutical corporations",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Tailored Support",
    description: "Agile, attentive and personalized service with true partnership",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Comprehensive Coverage",
    description: "Broad coverage of product class & disease types",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Emerging Technologies",
    description: "Ample experience with a range of emerging technologies and medicines",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Novel Approaches",
    description: "Out-of-the-box solutions for complex challenges",
  },
]

export function FeaturesSection() {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })

  return (
    <motion.section 
      ref={featuresRef}
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
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-serif font-normal text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Why Choose <span style={{ color: 'var(--brand-purple)' }}>Consilienta</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our comprehensive approach combines deep expertise with innovative solutions to accelerate your
            pharmaceutical development journey.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={featuresInView ? { 
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
                delay: featuresInView ? 0.6 + (index * 0.1) : 0,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.025, 
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out h-full border-0 outline outline-2 outline-white/20">
                <CardContent className="p-8 space-y-4">
                  <motion.div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--brand-purple)' }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-serif font-normal text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}