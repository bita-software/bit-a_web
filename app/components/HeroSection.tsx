'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';
import CTAButton from './CTAButton';
import Link from 'next/link';

const HeroSection = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'section'>>((props, ref) => {
  const t = useTranslations('Hero');

  return (
    <section ref={ref} {...props} className={`min-h-screen flex flex-col relative px-4 sm:px-6 lg:px-8 xl:px-12 z-20 py-8 sm:py-12 lg:py-16 grain subtle-glow ${props.className || ''}`}>
      {/* Elementos decorativos sutiles - reposicionados para evitar overlaps */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <div className="absolute top-1/3 left-1/6 w-px h-40 bg-gradient-to-b from-transparent via-white/8 to-transparent"></div>
        <div className="absolute top-1/4 right-1/6 w-px h-32 bg-gradient-to-b from-transparent via-white/6 to-transparent"></div>
        <div className="absolute bottom-1/3 left-2/3 w-px h-24 bg-gradient-to-b from-transparent via-white/4 to-transparent"></div>
      </div>

      {/* Contenedor principal con layout flexible seguro */}
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto w-full relative z-10 min-h-0 h-full">
        <div className="text-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 lg:space-y-12 w-full max-w-6xl">
          {/* Título principal con efectos premium */}
          <div className="space-y-6 sm:space-y-8">
            <AnimatedTitle
              as="h1"
              className="hero-title text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-light text-white leading-snug tracking-tight select-none"
              useScrollTrigger={false}
              delay={0.2}
              stagger={0.15}
              duration={2}
              blurAmount={8}
            >
              <span className="block mb-4 sm:mb-2 font-extralight leading-snug overflow-wrap-anywhere">{t('title.line1')}</span>
              <span className="block text-gradient mb-6 sm:mb-4 font-light italic tracking-wide leading-snug overflow-wrap-anywhere" style={{ fontStyle: 'italic', fontOpticalSizing: 'auto', textRendering: 'optimizeLegibility' }}>{t('title.line2')}</span></AnimatedTitle>

            {/* Línea decorativa sutil */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
          </div>

          {/* Subtítulo refinado */}
          <div className="max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            <p className="hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/70 leading-relaxed font-light tracking-wide">
              {t('subtitle')}
            </p>
          </div>

          {/* CTAs con diseño premium */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center pt-6 sm:pt-8 lg:pt-10 w-full max-w-lg sm:max-w-none">
            <Link href="/#schedule" className="group w-full sm:w-auto">
              <CTAButton
                variant="primary"
                size="medium"
                className="hero-cta pearl-button px-8 sm:px-10 lg:px-12 py-4 sm:py-5 text-base sm:text-lg font-medium tracking-wide w-full sm:min-w-[200px] group-hover:scale-105 transition-all duration-500"
              >
                {t('cta.schedule')}
              </CTAButton>
            </Link>
            <Link href="/#casos-de-estudio" className="group w-full sm:w-auto">
              <CTAButton
                variant="outline"
                size="medium"
                className="hero-cta pearl-border px-8 sm:px-10 lg:px-12 py-4 sm:py-5 text-base sm:text-lg font-medium tracking-wide w-full sm:min-w-[200px] group-hover:scale-105 transition-all duration-500"
              >
                {t('cta.portfolio')}
              </CTAButton>
            </Link>
          </div>
        </div>

      </div>

      {/* Scroll Indicator refinado - reposicionado para evitar overlaps */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 opacity-70 hover:opacity-100 transition-all duration-500 group z-30">
        <span className="text-white/50 text-xs sm:text-sm font-light tracking-[0.2em] uppercase">
          {t('scrollIndicator')}
        </span>
        <div className="relative">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-white/50 group-hover:text-white/70 transition-all duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          {/* Anillo decorativo sutil */}
          <div className="absolute inset-0 border border-white/10 rounded-full scale-150 opacity-30 group-hover:opacity-50 group-hover:scale-175 transition-all duration-700"></div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection; 