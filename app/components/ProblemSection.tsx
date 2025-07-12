'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';
import CTAButton from './CTAButton';
import Link from 'next/link';

const ProblemSection = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'section'>>((props, ref) => {
  const t = useTranslations('Problem');
  
  return (
    <section ref={ref} {...props} className={`py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-20 ${props.className || ''}`}>
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedTitle
          as="h2"
          className="fade-in text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
        >
          <span className="block">{t('title')}</span>
          <span className="block pearl-text">{t('subtitle')}</span>
        </AnimatedTitle>
        <p className="fade-in text-xl sm:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
          {t('description')}
        </p>
        <Link href="/#schedule">
        <CTAButton 
          variant="primary" 
          size="large"
          className="fade-in"
        >
          {t('cta')}
        </CTAButton>
        </Link>
      </div>
    </section>
  );
});

ProblemSection.displayName = 'ProblemSection';

export default ProblemSection; 