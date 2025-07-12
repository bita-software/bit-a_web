'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';

const AboutSection = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'section'>>((props, ref) => {
  const t = useTranslations('About');
  
  return (
    <section ref={ref} {...props} className={`py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f8fafc]/5 via-transparent to-[#f8fafc]/3 relative z-20 ${props.className || ''}`}>
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedTitle
          as="h2"
          className="fade-in text-3xl sm:text-5xl font-bold text-white mb-12"
        >
          <span className="text-gradient">{t('title')}</span>
        </AnimatedTitle>
        <p className="fade-in text-xl sm:text-2xl text-white/80 leading-relaxed">
          {t('description')}
        </p>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection; 