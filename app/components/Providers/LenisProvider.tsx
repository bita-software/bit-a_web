"use client"

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Inicializar Lenis para scroll suave
        const lenis = new Lenis({
            duration: 1.5, // Más rápido que el original 4.0 para mejor respuesta
            wheelMultiplier: 0.8,
            touchMultiplier: 0.8,
            easing: (t: number) => Math.min(1, 1.00001 - Math.pow(2, -20 * t)),
            smoothWheel: true
        });
  
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
  
        requestAnimationFrame(raf);

        // Interceptar clics en enlaces con hash para usar Lenis.scrollTo
        const handleAnchorClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || !href.includes('#')) return;

            try {
                // Si el href es solo un hash (#algo) o tiene un path que coincide con el actual
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                if (url.pathname === currentUrl.pathname && url.hash) {
                    const targetId = url.hash.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        lenis.scrollTo(targetElement, {
                            offset: -100, // Espacio para el navbar
                            duration: 1.5,
                        });
                        window.history.pushState(null, '', url.hash);
                    }
                }
            } catch (err) {
                // Ignorar URLs inválidas
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };

    }, []);	
    
    return <>{children}</>;
}