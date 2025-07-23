'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { env } from '@/lib/env';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const frameRef = useRef<number>(0);
  const positionRef = useRef({ x: 0, y: 0 });

  // Throttle para optimizar rendimiento
  const throttle = (func: (x: number, y: number) => void, delay: number) => {
    let inThrottle = false;
    return function (x: number, y: number) {
      if (!inThrottle) {
        func(x, y);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, delay);
      }
    };
  };

  // Detectar si es mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768 
        || ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (!env.useCursor) return;
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Función optimizada para actualizar posición
    const updateCursorPosition = (x: number, y: number) => {
      positionRef.current = { x, y };
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      frameRef.current = requestAnimationFrame(() => {
        if (isMobile) {
          // En mobile usar CSS transforms nativos para mejor rendimiento
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        } else {
          // En desktop usar GSAP para suavizado
          gsap.to(cursor, {
            x: x,
            y: y,
            duration: 0.1,
            ease: 'power2.out',
          });
          
          gsap.to(follower, {
            x: x,
            y: y,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    };

    // Versión throttled para mobile
    const throttledUpdatePosition = throttle(updateCursorPosition, isMobile ? 8 : 16);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (isMobile) {
        throttledUpdatePosition(clientX, clientY);
      } else {
        updateCursorPosition(clientX, clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateCursorPosition(touch.clientX, touch.clientY);
        
        // Mostrar cursor de forma optimizada
        if (isMobile) {
          cursor.style.opacity = '1';
          cursor.style.transform = `translate3d(${touch.clientX}px, ${touch.clientY}px, 0) scale(1)`;
          follower.style.opacity = '1';
          follower.style.transform = `translate3d(${touch.clientX}px, ${touch.clientY}px, 0) scale(1)`;
        } else {
          gsap.to([cursor, follower], {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          });
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        throttledUpdatePosition(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => {
      // Ocultar cursor de forma optimizada
      if (isMobile) {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
      } else {
        gsap.to([cursor, follower], {
          scale: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    const onMouseEnter = () => {
      if (!isMobile) {
        gsap.to([cursor, follower], {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const onMouseLeave = () => {
      if (!isMobile) {
        gsap.to([cursor, follower], {
          scale: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    const handleHoverElements = () => {
      const hoverElements = document.querySelectorAll('button, a, [data-hover]');
      
      hoverElements.forEach(element => {
        // Eventos de mouse (solo en desktop)
        if (!isMobile) {
          element.addEventListener('mouseenter', () => {
            setIsHovering(true);
            gsap.to(cursor, {
              scale: 0.8,
              duration: 0.2,
            });
            gsap.to(follower, {
              scale: 2.5,
              duration: 0.2,
            });
          });
          
          element.addEventListener('mouseleave', () => {
            setIsHovering(false);
            gsap.to(cursor, {
              scale: 1,
              duration: 0.2,
            });
            gsap.to(follower, {
              scale: 1,
              duration: 0.2,
            });
          });
        }

        // Eventos táctiles optimizados para mobile
        element.addEventListener('touchstart', () => {
          setIsHovering(true);
          if (isMobile) {
            cursor.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scale(0.3)`;
            follower.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scale(2.5)`;
          } else {
            gsap.to(cursor, {
              scale: 0.3,
              duration: 0.2,
            });
            gsap.to(follower, {
              scale: 2.5,
              duration: 0.2,
            });
          }
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
          setIsHovering(false);
          if (isMobile) {
            cursor.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scale(1)`;
            follower.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scale(1)`;
          } else {
            gsap.to(cursor, {
              scale: 1,
              duration: 0.2,
            });
            gsap.to(follower, {
              scale: 1,
              duration: 0.2,
            });
          }
        }, { passive: true });
      });
    };

    // Event listeners para mouse (solo en desktop)
    if (!isMobile) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
    }
    
    // Event listeners para eventos táctiles
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    
    // Inicializar elementos hover
    handleHoverElements();
    
    // Observar cambios en el DOM para elementos dinámicos
    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (!isMobile) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
      }
      
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <>
      {/* Cursor principal - punto perlado */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 rounded-full pointer-events-none z-50"
        style={{
          left: '15px',
          top: '0px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(248,250,252,0.9) 0%, rgba(248,250,252,0.6) 70%, transparent 100%)',
          boxShadow: '0 0 15px rgba(248,250,252,0.4), 0 0 30px rgba(248,250,252,0.2)',
          willChange: 'transform, opacity',
          transition: isMobile ? 'opacity 0.3s ease' : 'none',
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Follower - anillo perlado */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          left: '15px',
          top: '-16px',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(248,250,252,0.4)',
          background: isHovering 
            ? 'radial-gradient(circle, rgba(248,250,252,0.1) 0%, rgba(248,250,252,0.05) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(248,250,252,0.03) 0%, transparent 70%)',
          boxShadow: isHovering 
            ? '0 0 20px rgba(248,250,252,0.3), inset 0 0 20px rgba(248,250,252,0.1)'
            : '0 0 10px rgba(248,250,252,0.2)',
          willChange: 'transform, opacity',
          transition: 'opacity 0.5s ease',
        }}
      />
    </>
  );
} 
