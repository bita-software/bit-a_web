'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface ThreeDImageCardProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export default function ThreeDImageCard({ src, alt, priority = false, className = '' }: ThreeDImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate rotation (max 10 degrees)
    const rotateY = ((x - centerX) / centerX) * 8
    const rotateX = ((centerY - y) / centerY) * 8

    setRotation({ x: rotateX, y: rotateY })
    
    // Calculate glare position (follows mouse but inverted slightly for depth)
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
    // Reset glare to center or off-screen
    setGlarePosition({ x: 50, y: 50 })
  }

  return (
    <div 
      className={`perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full transition-all duration-200 ease-out transform-style-3d overflow-hidden rounded-2xl shadow-xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0,0,0,0.3)' 
            : '0 10px 20px rgba(0,0,0,0.1)',
        }}
      >
        {/* Grain Overlay for Texture (Boutique Feel) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-overlay grain"></div>

        {/* Glare Effect */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%, 
              rgba(255, 255, 255, 0.4) 0%, 
              rgba(255, 255, 255, 0.1) 20%, 
              transparent 60%
            )`,
            opacity: isHovered ? 1 : 0,
            mixBlendMode: 'overlay', // Adds a nice light interaction
          }}
        />
        
        {/* Additional "Premium" Sheen */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
             background: 'linear-gradient(125deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)',
             opacity: isHovered ? 0.5 : 0,
             transition: 'opacity 0.5s ease',
          }}
        />

        {/* Image */}
        <div className="relative w-full h-full">
            <Image 
                src={src} 
                alt={alt}
                fill
                className="object-cover"
                priority={priority}
            />
        </div>
      </div>
    </div>
  )
}
