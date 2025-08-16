"use client"

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { Suspense, useRef, useState, useMemo, useEffect, useCallback } from "react"
import * as THREE from "three"
import React from "react"

interface HelixConfig {
  enabled: boolean
  model?: {
    url: string
    filename: string
  }
  rotationSpeed: number
  scale: number
  hoverScale: number
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
}

interface InteractiveHelixProps {
  config: HelixConfig
}

export function InteractiveHelix({ config }: InteractiveHelixProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(config?.rotationSpeed ?? 0.2)
  const [scrollY, setScrollY] = useState(0)
  const [contextLost, setContextLost] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const { gl } = useThree()

  // WebGL context loss handling
  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault()
    setContextLost(true)
    console.warn('WebGL context lost. Attempting to restore...')
  }, [])

  const handleContextRestored = useCallback(() => {
    setContextLost(false)
    console.log('WebGL context restored.')
  }, [])

  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl, handleContextLost, handleContextRestored])

  // Load the helix model from config or fallback to default
  const modelUrl = config?.model?.url || '/helix.obj'
  const obj = useLoader(OBJLoader, modelUrl)


  // Track scroll for 3D movement
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Clone and prepare the DNA model with memory optimization
  const dnaModel = useMemo(() => {
    if (obj && !contextLost) {
      const clonedObj = obj.clone()
      
      // Apply material to all meshes in the model
      clonedObj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Dispose of existing material to prevent memory leaks
          if (child.material && 'dispose' in child.material) {
            child.material.dispose()
          }
          
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#ffffff"),
            emissive: new THREE.Color("#ffffff"),
            emissiveIntensity: 0.2,
            metalness: 0.1,
            roughness: 0.3
          })
        }
      })
      
      return clonedObj
    }
    return null
  }, [obj, contextLost])

  // Cleanup effect to dispose of resources
  useEffect(() => {
    return () => {
      if (dnaModel) {
        dnaModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose()
            if (child.material && 'dispose' in child.material) {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [dnaModel])

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

  if (contextLost) {
    return (
      <mesh position={[7, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#666666" />
      </mesh>
    )
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

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ThreeJSErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="mb-2">WebGL Error</div>
            <div className="text-sm opacity-75">3D visualization unavailable</div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function HelixCanvas() {
  return (
    <div className="absolute inset-0 opacity-100">
      <ThreeJSErrorBoundary>
        <Canvas
          camera={{
            position: [0, 0, 10],
            fov: 75,
          }}
          onCreated={({ gl }) => {
            // Configure WebGL for better stability
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -5]} intensity={0.3} />
            <InteractiveHelix />
          </Suspense>
        </Canvas>
      </ThreeJSErrorBoundary>
    </div>
  )
}