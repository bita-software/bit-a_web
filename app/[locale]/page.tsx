'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic';

// Importar componentes de forma dinámica para evitar SSR issues
const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false });

// Importar grilla modular
import ModularGrid, { GridItem } from '../components/ModularGrid';

// Importar componentes de secciones
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import LeadMagnetSection from '../components/LeadMagnetSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const casesRef = useRef<HTMLElement>(null);
  const leadMagnetRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Estado para controlar la grilla modular

  useEffect(() => {

    // Animaciones GSAP para el Hero (sin ScrollTrigger)
    const tl = gsap.timeline({ delay: 0.2 });

    // Hero animations - elementos que NO son títulos animados
    const heroSubtitle = heroRef.current?.querySelector('.hero-subtitle');
    const heroCtas = heroRef.current?.querySelectorAll('.hero-cta');
    
    // Animar subtítulo
    if (heroSubtitle) {
      gsap.set(heroSubtitle, { opacity: 0, y: 40, scale: 0.95 });
      tl.to(heroSubtitle, {
        duration: 1,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        delay: 1.2, // Esperar a que termine la animación del título
      });
    }
    
    // Animar botones CTA
    if (heroCtas && heroCtas.length > 0) {
      gsap.set(heroCtas, { opacity: 0, y: 25, scale: 0.9 });
      tl.to(heroCtas, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.6');
    }

    // ScrollTrigger animations para otras secciones (excluyendo títulos animados)
    const sections = [problemRef, servicesRef, aboutRef, casesRef, leadMagnetRef, ctaRef];
    
    sections.forEach((section) => {
      if (section.current) {
        // Solo animar elementos que NO son títulos animados
        const regularElements = section.current.querySelectorAll('.fade-in:not(.title-reveal)');
        const buttons = section.current.querySelectorAll('button');
        
        // Establecer estado inicial para elementos regulares
        if (regularElements.length > 0) {
          gsap.set(regularElements, { opacity: 0, y: 60, rotationX: 15 });
          
          // Animar elementos regulares
          gsap.to(regularElements, {
            duration: 1.2,
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.current,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play none none none',
            },
          });
        }
        
        // Animar botones por separado para mejor control
        if (buttons.length > 0) {
          gsap.set(buttons, { opacity: 0, y: 30, scale: 0.95 });
          
          gsap.to(buttons, {
            duration: 0.8,
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none none',
            },
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen bg-[#000000] overflow-x-hidden`}>
      {/* Cursor personalizado */}
      <CustomCursor />
      
  
      
      {/* Grilla modular como estructura base */}
      <ModularGrid variant="default" className="min-h-screen" showGrid={true}>
        
        {/* Hero Section - Ocupa toda la grilla */}
        <GridItem span={12} className="relative">
          <HeroSection ref={heroRef} id="inicio" />
        </GridItem>

        {/* Problem Section - Variación rítmica: 8 columnas centradas */}
        <GridItem start={3} end={11} className="relative">
          <ProblemSection ref={problemRef} id="problema" />
        </GridItem>

        {/* Services Section - Grilla densa para mostrar servicios */}
        <GridItem span={12} className="relative" id="servicios">
          <ModularGrid variant="dense" className="py-20" showGrid={true}>
            <ServicesSection ref={servicesRef} />
          </ModularGrid>
        </GridItem>

        {/* About Section - Asimétrica: 9 columnas */}
        <GridItem start={1} end={10} className="relative">
          <AboutSection ref={aboutRef} id="nosotros" />
        </GridItem>

        {/* Case Studies Section - Grilla dispersa para casos de estudio */}
        <GridItem span={12} className="relative" id="casos-de-estudio">
          <ModularGrid variant="sparse" className="py-20" showGrid={true}>
            <CaseStudiesSection ref={casesRef} />
          </ModularGrid>
        </GridItem>

        {/* Lead Magnet Section - Centrado, 10 columnas */}
        <GridItem start={2} end={12} className="relative">
          <LeadMagnetSection ref={leadMagnetRef} id="recursos" />
        </GridItem>

        {/* Final CTA Section - Grilla asimétrica */}
        <GridItem span={12} className="relative" id="cta">
          <ModularGrid variant="asymmetric" className="py-20" showGrid={true}>
            <FinalCTASection ref={ctaRef} />
          </ModularGrid>
        </GridItem>

        {/* Footer - Toda la grilla */}
        <GridItem span={12} className="relative">
          <Footer id="contacto" />
        </GridItem>
        
      </ModularGrid>
    </div>
  );
} 