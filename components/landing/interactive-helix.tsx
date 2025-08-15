"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { Suspense, useRef, useState, useMemo, useEffect } from "react"
import * as THREE from "three"

export function InteractiveHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0.2)
  const [scrollY, setScrollY] = useState(0)
  const dragStartRef = useRef({ x: 0, y: 0 })

  // Load the helix.obj model
  const obj = useLoader(OBJLoader, '/helix.obj')


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
  }, [obj])

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

export function HelixCanvas() {
  return (
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
  )
}