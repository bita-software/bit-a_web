'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface AnimatedTitleProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  triggerStart?: string;
  triggerEnd?: string;
  useScrollTrigger?: boolean;
  blurAmount?: number;
}

const AnimatedTitle = forwardRef<HTMLHeadingElement, AnimatedTitleProps>(({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.1,
  duration = 1.4,
  triggerStart = 'top 80%',
  triggerEnd = 'bottom 20%',
  useScrollTrigger = true,
  blurAmount = 8,
}, ref) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const titleElement = titleRef.current;
    if (!titleElement) return;

    // Buscar spans dentro del título
    const spans = titleElement.querySelectorAll('span');
    
    if (spans.length === 0) return;

    // Configurar estado inicial
    gsap.set(spans, { 
      opacity: 0, 
      y: 80, 
      filter: `blur(${blurAmount}px)`,
      clipPath: 'inset(100% 0 0 0)'
    });

    // Configurar animación
    const animationConfig = {
      duration,
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      clipPath: 'inset(0% 0 0 0)',
      stagger,
      ease: 'power3.out',
      delay,
    };

    if (useScrollTrigger) {
      // Usar ScrollTrigger para animaciones en scroll
      gsap.to(spans, {
        ...animationConfig,
        scrollTrigger: {
          trigger: titleElement,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: 'play none none none',
        },
      });
    } else {
      // Animación inmediata (para hero)
      gsap.to(spans, animationConfig);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === titleElement) {
          trigger.kill();
        }
      });
    };
  }, [delay, stagger, duration, triggerStart, triggerEnd, useScrollTrigger, blurAmount]);

  return (
    <Component
      ref={ref || titleRef}
      className={`title-reveal ${className}`}
    >
      {children}
    </Component>
  );
});

AnimatedTitle.displayName = 'AnimatedTitle';

export default AnimatedTitle; 