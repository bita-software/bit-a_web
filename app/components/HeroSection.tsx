'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';
import CTAButton from './CTAButton';
import Link from 'next/link';

const HeroSection = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'section'>>((props, ref) => {
  const t = useTranslations('Hero');
  
  return (
    <section ref={ref} {...props} className={`min-h-[85svh]  flex items-center justify-center relative px-4 sm:px-6 lg:px-8 xl:px-12 z-20 py-16 sm:py-20 ${props.className || ''}`}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center px-2 sm:px-0">
          {/* Título principal */}
          <AnimatedTitle
            as="h1"
            className="hero-title text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight sm:leading-tight lg:leading-tight select-none"
            useScrollTrigger={false}
            delay={0.2}
            stagger={0.2}
            duration={1.5}
            blurAmount={10}
          >
            <span className="block mb-2 sm:mb-0 break-words">{t('title.line1')}</span>
            <span className="block text-gradient mb-3 sm:mb-0 break-words">{t('title.line2')}</span>
          </AnimatedTitle>
          
          {/* Subtítulo */}
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
            {t('subtitle')}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link href="/#schedule">
          <CTAButton 
              variant="primary" 
              size="medium"
              className="hero-cta"
            >
              {t('cta.schedule')}
            </CTAButton>
          </Link>
          <Link href="/#casos-de-estudio">
          <CTAButton 
              variant="outline" 
              size="medium"
              className="hero-cta"
            >
              {t('cta.portfolio')}
            </CTAButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white/60 text-xs sm:text-sm font-light tracking-wider">
          {t('scrollIndicator')}
        </span>
        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/40 rounded-full flex items-center justify-center animate-bounce">
          <svg 
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection; 