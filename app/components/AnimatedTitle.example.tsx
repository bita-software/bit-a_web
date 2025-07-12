/**
 * EJEMPLOS DE USO DEL COMPONENTE AnimatedTitle
 * 
 * Este archivo muestra diferentes formas de usar el componente AnimatedTitle
 * para crear animaciones sofisticadas de títulos con reveal y blur.
 */

import AnimatedTitle from './AnimatedTitle';

// EJEMPLO 1: Título de Hero (sin ScrollTrigger)
export function HeroExample() {
  return (
    <AnimatedTitle
      as="h1"
      className="text-6xl font-bold text-white"
      useScrollTrigger={false}  // Para animación inmediata
      delay={0.2}
      stagger={0.2}
      duration={1.5}
      blurAmount={10}           // Blur más intenso para efecto dramático
    >
      <span className="block">Título Principal</span>
      <span className="block text-gradient">Con Gradiente</span>
      <span className="block">Tercera Línea</span>
    </AnimatedTitle>
  );
}

// EJEMPLO 2: Título de Sección (con ScrollTrigger)
export function SectionExample() {
  return (
    <AnimatedTitle
      as="h2"
      className="text-4xl font-bold text-white mb-8"
      // useScrollTrigger={true} es el default
      triggerStart="top 80%"
      triggerEnd="bottom 20%"
      stagger={0.1}
      duration={1.4}
      blurAmount={8}
    >
      <span className="text-gradient">Título de Sección</span>
    </AnimatedTitle>
  );
}

// EJEMPLO 3: Título con múltiples líneas
export function MultiLineExample() {
  return (
    <AnimatedTitle
      as="h2"
      className="text-5xl font-bold text-white"
      stagger={0.15}
      duration={1.3}
    >
      <span className="block">Primera línea del título</span>
      <span className="block pearl-text">Segunda línea con estilo</span>
      <span className="block">Tercera línea normal</span>
    </AnimatedTitle>
  );
}

// EJEMPLO 4: Título con configuración personalizada
export function CustomExample() {
  return (
    <AnimatedTitle
      as="h3"
      className="text-3xl font-semibold text-white/90"
      delay={0.5}               // Delay personalizado
      stagger={0.08}            // Stagger más rápido
      duration={1.0}            // Duración más corta
      triggerStart="top 90%"    // Trigger más tardío
      triggerEnd="bottom 10%"   // Trigger más temprano
      blurAmount={6}            // Blur más suave
    >
      <span className="text-gradient">Título Personalizado</span>
    </AnimatedTitle>
  );
}

// EJEMPLO 5: Título simple (una sola línea)
export function SimpleExample() {
  return (
    <AnimatedTitle
      as="h4"
      className="text-2xl font-bold text-white"
    >
      <span>Título Simple</span>
    </AnimatedTitle>
  );
}

/**
 * PARÁMETROS DISPONIBLES:
 * 
 * as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
 *     - Tipo de elemento HTML a renderizar
 *     - Default: 'h2'
 * 
 * className: string
 *     - Clases CSS adicionales
 *     - Default: ''
 * 
 * useScrollTrigger: boolean
 *     - Si debe usar ScrollTrigger o animarse inmediatamente
 *     - Default: true
 * 
 * delay: number
 *     - Retraso antes de iniciar la animación (en segundos)
 *     - Default: 0
 * 
 * stagger: number
 *     - Tiempo entre animaciones de spans consecutivos
 *     - Default: 0.1
 * 
 * duration: number
 *     - Duración de la animación de cada span
 *     - Default: 1.4
 * 
 * triggerStart: string
 *     - Punto de inicio del ScrollTrigger
 *     - Default: 'top 80%'
 * 
 * triggerEnd: string
 *     - Punto de fin del ScrollTrigger
 *     - Default: 'bottom 20%'
 * 
 * blurAmount: number
 *     - Intensidad del blur inicial (en px)
 *     - Default: 8
 * 
 * ESTRUCTURA REQUERIDA:
 * 
 * - El contenido debe estar envuelto en elementos <span>
 * - Cada <span> representa una línea o parte del título
 * - Usa className="block" para líneas separadas
 * - Aplica estilos como text-gradient, pearl-text, etc. a los spans
 * 
 * EJEMPLO DE ESTRUCTURA:
 * 
 * <AnimatedTitle>
 *   <span className="block">Primera línea</span>
 *   <span className="block text-gradient">Segunda línea</span>
 *   <span className="block pearl-text">Tercera línea</span>
 * </AnimatedTitle>
 */ 