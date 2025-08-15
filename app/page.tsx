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

  // Track scroll for 3D movement
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
      
      // 3D scroll-based movement with floating animation
      const scrollOffset = scrollY * 0.008 // Adjust multiplier to control movement speed
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2 - scrollOffset
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
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
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
    <div className="min-h-screen brand-gradient-no-black">
      {/* Header */}
      <header className={`sticky top-0 z-50 px-6 py-4 frosted-glass-navbar ${isOverWhite ? 'navbar-over-white' : ''}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {isOverWhite ? (
              <div 
                className="logo-over-white w-[200px] h-10 transition-all duration-300"
                aria-label="Consilienta Logo"
              />
            ) : (
              <Image src="/logo-with-claim.svg" alt="Consilienta Logo" width={200} height={40} className="h-10 w-auto transition-all duration-300 drop-shadow-sm" />
            )}
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>Home</a>
              <a href="#how-we-help" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>How We Help</a>
              <a href="#about" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>About Us</a>
              <a href="#insights" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>Insights</a>
              <a href="#careers" className={`nav-text text-white hover:text-white/80 transition-colors font-medium ${!isOverWhite ? 'drop-shadow-sm' : ''}`}>Careers</a>
            </div>
            
            <Button variant="primary">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 -mt-14 pt-32 overflow-hidden min-h-[60vh]">
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

        <motion.div 
          className="max-w-7xl mx-auto relative z-10"
          style={{ y: heroY }}
        >
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
              <Button size="lg" variant="cta">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
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
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut" 
                }}
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

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="px-6 pt-32 py-20"
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
            <Button size="lg" variant="cta">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
            >
              Download Brochure
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer 
        className="px-6 py-16 text-white relative z-10">
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <div className="absolute inset-0 frosted-glass" style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Company Info */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center">
                <Image src="/logo-with-claim.svg" alt="Consilienta Logo" width={200} height={40} className="h-10 w-auto" />
              </div>
              <p className="text-white/90 max-w-md leading-relaxed">
                Expert pharmaceutical consulting guiding your product from concept to approval. 
                Comprehensive solutions for complex development challenges.
              </p>
              <div className="flex space-x-4">
                <Button variant="secondary" size="sm">
                  LinkedIn
                </Button>
                <Button variant="secondary" size="sm">
                  Email
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium">Services</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Regulatory Strategy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clinical Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Access</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quality Assurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium">Company</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#insights" className="hover:text-white transition-colors">Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © 2024 Consilienta. All rights reserved. Pharmaceutical consulting excellence.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
