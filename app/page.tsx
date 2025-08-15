"use client"

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Lightbulb, Globe, Zap, Award } from "lucide-react"
import Image from "next/image"
import { Suspense, useRef, useState, useMemo, useEffect } from "react"
import * as THREE from "three"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

function InteractiveHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0.2)
  const [scrollY, setScrollY] = useState(0)
  const dragStartRef = useRef({ x: 0, y: 0 })

  // Load the helix.obj model
  const obj = useLoader(OBJLoader, '/helix.obj')

  // Create white texture for the DNA model
  const whiteTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext("2d")!
    
    // Create solid white texture
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 256, 256)
    
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Clone and prepare the DNA model
  const dnaModel = useMemo(() => {
    if (obj) {
      const clonedObj = obj.clone()
      
      // Apply material to all meshes in the model
      clonedObj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({
            color: new THREE.Color("#ffffff"),
            emissive: new THREE.Color("#ffffff"),
            emissiveIntensity: 0.2
          })
        }
      })
      
      return clonedObj
    }
    return null
  }, [obj, whiteTexture])

  useFrame((state) => {
    if (groupRef.current && dnaModel) {
      // Continuous rotation with variable speed around Z-axis
      groupRef.current.rotation.z += rotationSpeed * 0.016
      
      // Simple scale on hover
      const targetScale = isHovered ? 7.7 : 7 // Scale from 7x to 7.7x on hover
      groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.1
      groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.1
      groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.1
      
      // Parallax effect - move very slowly with scroll
      const parallaxOffset = scrollY * 0.1 // Move 10% of scroll speed
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2 - parallaxOffset * 0.01
    }
  })

  const handlePointerDown = (event: THREE.Event) => {
    event.stopPropagation()
    setIsDragging(true)
    dragStartRef.current = {
      x: 'clientX' in event ? event.clientX : event.pageX,
      y: 'clientY' in event ? event.clientY : event.pageY
    }
  }

  const handlePointerMove = (event: THREE.Event) => {
    if (isDragging) {
      const currentX = 'clientX' in event ? event.clientX : event.pageX
      const deltaX = currentX - dragStartRef.current.x
      const newSpeed = Math.max(-2, Math.min(2, rotationSpeed + deltaX * 0.005))
      setRotationSpeed(newSpeed)
      dragStartRef.current.x = currentX
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  if (!dnaModel) {
    return null // Loading fallback
  }

  return (
    <group
      ref={groupRef}
      position={[7, 0, 0]}
      scale={[7, 7, 7]} // Scale to 7x for clipping effect
      rotation={[Math.PI / 2, -24 * Math.PI / 180, 0]} // Stand upright + tilt 24 degrees opposite direction on Y-axis
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <primitive object={dnaModel} />
    </group>
  )
}

export default function ConsilientsLanding() {
  const [isOverWhite, setIsOverWhite] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`sticky top-0 z-50 px-6 py-4 frosted-glass-navbar ${isOverWhite ? 'navbar-over-white' : ''}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo-with-claim.svg" alt="Consilienta Logo" width={200} height={40} className="h-10 w-auto" />
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="nav-text text-white hover:text-white/80 transition-colors font-medium drop-shadow-sm">Home</a>
              <a href="#how-we-help" className="nav-text text-white hover:text-white/80 transition-colors font-medium drop-shadow-sm">How We Help</a>
              <a href="#about" className="nav-text text-white hover:text-white/80 transition-colors font-medium drop-shadow-sm">About Us</a>
              <a href="#insights" className="nav-text text-white hover:text-white/80 transition-colors font-medium drop-shadow-sm">Insights</a>
              <a href="#careers" className="nav-text text-white hover:text-white/80 transition-colors font-medium drop-shadow-sm">Careers</a>
            </div>
            
            <Button className="brand-gradient-light text-white border-0 outline outline-2 outline-white/30 hover:opacity-90 transition-opacity">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="relative px-6 py-20 -mt-14 pt-32 overflow-hidden brand-gradient-no-black min-h-[60vh]"
        style={{ y: heroY }}
      >
        <div className="absolute inset-0 opacity-100">
          <Canvas
            camera={{
              position: [0, 0, 10],
              fov: 75,
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={0.5} />
              <InteractiveHelix />
              <Environment preset="studio" intensity={0.2} />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="space-y-8 max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Badge className="frosted-glass text-white border-0">Pharmaceutical Consulting Excellence</Badge>
              </motion.div>
              <motion.h1 
                className="text-5xl lg:text-6xl font-serif font-medium leading-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Guiding your product from concept to approval
              </motion.h1>

              <motion.p 
                className="text-lg text-white/80 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                No matter how complex or innovative your development journey may be.
                We will help you navigate each step of product development with clarity and confidence.
              </motion.p>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 transition-colors border-0">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="frosted-glass border-0 text-white hover:bg-white/20 transition-all"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="px-6 py-20 bg-gray-200 relative z-10"
        style={{ 
          y: useTransform(scrollYProgress, [0.3, 0.7], ['0%', '-5%']),
          backgroundColor: '#e5e7eb',
          paddingBottom: '8rem',
          marginBottom: '-3rem'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-serif font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Why Choose <span className="brand-gradient-light-text">Consilienta</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="frosted-glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 space-y-4">
                    <motion.div 
                      className="w-12 h-12 brand-gradient-light rounded-lg flex items-center justify-center text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-serif font-medium">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="px-6 py-20 brand-gradient-no-black"
        style={{ 
          y: useTransform(scrollYProgress, [0.6, 1], ['0%', '-5%']),
          paddingBottom: '8rem',
          marginBottom: '-3rem'
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2 
            className="text-4xl lg:text-5xl font-serif font-medium text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Development Process?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Partner with Consilienta and experience the difference that expert guidance, innovative solutions, and
            personalized service can make for your pharmaceutical development journey.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 transition-colors border-0">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="frosted-glass border-0 text-white hover:bg-white/20 transition-all"
              >
                Download Brochure
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer 
        className="px-6 py-12 bg-gray-900 text-white relative z-10"
        style={{ backgroundColor: '#111827' }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center">
            <Image src="/logo-with-claim.svg" alt="Consilienta Logo" width={160} height={32} className="h-8 w-auto" />
          </div>
          <p className="text-gray-400">
            © 2024 Consilienta. All rights reserved. Pharmaceutical consulting excellence.
          </p>
        </div>
      </footer>
    </div>
  )
}
