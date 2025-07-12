'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ModularGridProps {
  children: React.ReactNode;
  className?: string;
  showGrid?: boolean;
  columns?: number;
  variant?: 'default' | 'dense' | 'sparse' | 'asymmetric';
}

export default function ModularGrid({ 
  children, 
  className = '',
  showGrid = true,
  columns = 12,
  variant = 'default'
}: ModularGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada de la grilla
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (gridRef.current && showGrid) {
        gsap.from(gridRef.current.querySelectorAll('.grid-line'), {
          scaleY: 0,
          opacity: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.3,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [showGrid]);

  const getGridColumns = () => {
    switch (variant) {
      case 'dense':
        return 16;
      case 'sparse':
        return 8;
      case 'asymmetric':
        return 14;
      default:
        return columns;
    }
  };



  const renderGridLines = () => {
    if (!showGrid || !isVisible) return null;

    const totalColumns = getGridColumns();
    const lines = [];

    for (let i = 0; i <= totalColumns; i++) {
      const isMainLine = i % 4 === 0;
      const isSubLine = i % 2 === 0;
      
      lines.push(
        <div
          key={`vertical-${i}`}
          className={`grid-line absolute top-0 h-full w-px transition-opacity duration-300 ${
            isMainLine 
              ? 'bg-gradient-to-b from-transparent via-blue-500/30 to-transparent opacity-40' 
              : isSubLine 
              ? 'bg-gradient-to-b from-transparent via-white/15 to-transparent opacity-25'
              : 'bg-gradient-to-b from-transparent via-white/8 to-transparent opacity-20'
          }`}
          style={{
            left: `${(i / totalColumns) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        />
      );
    }

    // Líneas horizontales (menos densas)
    for (let i = 0; i < 8; i++) {
      const isMainLine = i % 3 === 0;
      lines.push(
        <div
          key={`horizontal-${i}`}
          className={`grid-line absolute left-0 w-full h-px transition-opacity duration-300 ${
            isMainLine 
              ? 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-30' 
              : 'bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-15'
          }`}
          style={{
            top: `${(i / 7) * 100}%`,
          }}
        />
      );
    }

    return lines;
  };

  return (
    <div 
      ref={gridRef}
      className={`relative w-full grid-variant-${variant} ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
        gap: '0',
      }}
    >
      {/* Líneas de la grilla */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {renderGridLines()}
      </div>
      
      {/* Contenido */}
      <div className="relative z-20 col-span-full">
        {children}
      </div>
    </div>
  );
}

// Componente helper para elementos que se alinean a la grilla
export function GridItem({ 
  children, 
  span = 1, 
  start, 
  end,
  className = '',
  offset = 0,
  alignToGrid = true,
  ...props
}: {
  children: React.ReactNode;
  span?: number;
  start?: number;
  end?: number;
  className?: string;
  offset?: number;
  alignToGrid?: boolean;
} & React.ComponentPropsWithoutRef<'div'>) {
  const gridColumnStyle = () => {
    if (start && end) {
      return `${start} / ${end}`;
    }
    if (start) {
      return `${start} / span ${span}`;
    }
    if (offset > 0) {
      return `${offset + 1} / span ${span}`;
    }
    return `span ${span}`;
  };

  return (
    <div
      {...props}
      className={`${alignToGrid ? 'grid-item' : ''} ${className}`}
      style={{
        gridColumn: alignToGrid ? gridColumnStyle() : undefined,
        display: alignToGrid ? 'block' : undefined,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}

// Componente para contenedores que respetan la grilla
export function GridContainer({ 
  children, 
  className = '',
  variant = 'default',
  maxWidth = '1400px',
  padding = 'px-4 md:px-8 lg:px-12',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dense' | 'sparse' | 'asymmetric';
  maxWidth?: string;
  padding?: string;
}) {
  return (
    <div 
      className={`mx-auto ${padding} ${className}`}
      style={{ maxWidth }}
    >
      <ModularGrid variant={variant}>
        {children}
      </ModularGrid>
    </div>
  );
} 