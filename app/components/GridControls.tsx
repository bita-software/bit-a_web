'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Button from './Button';

interface GridControlsProps {
  onToggleGrid?: (visible: boolean) => void;
  onVariantChange?: (variant: 'default' | 'dense' | 'sparse' | 'asymmetric') => void;
  onDebugMode?: (enabled: boolean) => void;
}

export default function GridControls({ 
  onToggleGrid, 
  onVariantChange, 
  onDebugMode 
}: GridControlsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentVariant, setCurrentVariant] = useState<'default' | 'dense' | 'sparse' | 'asymmetric'>('default');
  const [debugMode, setDebugMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Animación de entrada del panel de control
    if (isOpen) {
      gsap.from('.grid-controls-panel', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isOpen]);

  const handleToggleGrid = () => {
    setIsVisible(!isVisible);
    onToggleGrid?.(!isVisible);
  };

  const handleVariantChange = (variant: 'default' | 'dense' | 'sparse' | 'asymmetric') => {
    setCurrentVariant(variant);
    onVariantChange?.(variant);
  };

  const handleDebugMode = () => {
    setDebugMode(!debugMode);
    onDebugMode?.(!debugMode);
  };

  const variants = [
    { key: 'default', label: 'Estándar', description: '12 columnas uniformes' },
    { key: 'dense', label: 'Denso', description: '16 columnas para contenido detallado' },
    { key: 'sparse', label: 'Disperso', description: '8 columnas para contenido abierto' },
    { key: 'asymmetric', label: 'Asimétrico', description: '14 columnas con variaciones' }
  ] as const;

  return (
    <div className="fixed top-4 right-4 z-[100]">
      {/* Botón de toggle */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="primary"
        size="sm"
        className="p-3 rounded-full shadow-lg"
        title="Controles de Grilla"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      </Button>

      {/* Panel de control */}
      {isOpen && (
        <div className="grid-controls-panel absolute top-16 right-0 w-80 bg-[#080808]/95 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-xl">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
            Controles de Grilla
          </h3>
          
          {/* Toggle de visibilidad */}
          <div className="mb-6">
            <label className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Mostrar Grilla</span>
              <Button
                onClick={handleToggleGrid}
                variant="ghost"
                size="sm"
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isVisible ? 'bg-blue-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                    isVisible ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </Button>
            </label>
            <p className="text-white/60 text-xs">
              {isVisible ? 'Líneas de grilla visibles' : 'Líneas de grilla ocultas'}
            </p>
          </div>

          {/* Selector de variantes */}
          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-3">
              Variante de Grilla
            </label>
            <div className="space-y-2">
              {variants.map((variant) => (
                <Button
                  key={variant.key}
                  onClick={() => handleVariantChange(variant.key)}
                  variant="ghost"
                  size="sm"
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentVariant === variant.key
                      ? 'bg-blue-500/20 border border-blue-500/40'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {variant.label}
                    </span>
                    <span className="text-white/60 text-xs">
                      {variant.description}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Modo debug */}
          <div className="mb-4">
            <label className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Modo Debug</span>
              <Button
                onClick={handleDebugMode}
                variant="ghost"
                size="sm"
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  debugMode ? 'bg-red-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                    debugMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </Button>
            </label>
            <p className="text-white/60 text-xs">
              {debugMode ? 'Mostrar bordes de elementos' : 'Ocultar bordes debug'}
            </p>
          </div>

          {/* Información adicional */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-white/50 text-xs">
              Esta grilla modular estructura visualmente todo el contenido de la página, 
              creando un sistema de organización coherente y rítmico.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 