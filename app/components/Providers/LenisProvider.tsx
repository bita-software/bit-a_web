"use client"

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    
    useEffect(() => {
        if (typeof window === 'undefined') return;
    // Inicializar Lenis para scroll suave
    const lenis = new Lenis({
        // Mayor duración para que el desplazamiento sea más pausado y suave
        duration: 4.0,
        // Reducir la sensibilidad de la rueda y del touch para que el scroll sea más "pesado"
        wheelMultiplier: 0.6,
        touchMultiplier: 0.8,
        easing: (t: number) => Math.min(1, 1.00001 - Math.pow(2, -20 * t)),
        smoothWheel: true
      });
  
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };

    }, []);	
    return <>{children}</>;

}