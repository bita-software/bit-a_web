'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';
import CTAButton from './CTAButton';
import Link from 'next/link';

const CaseStudiesSection = forwardRef<HTMLElement>((props, ref) => {
  const t = useTranslations('CaseStudies');
  
  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        <AnimatedTitle
          as="h2"
          className="fade-in text-3xl sm:text-5xl font-bold text-white mb-20 text-center"
        >
          <span className="text-gradient">{t('title')}</span>
        </AnimatedTitle>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Case 1 */}
          <Link href="#schedule">

          <div className="fade-in">
            <h3 className="text-2xl font-bold text-white mb-6">{t('cases.stocklink.title')}</h3>
            <div className="pearl-border p-6 mb-6 flex flex-col gap-6 rounded-2xl">
              <div>
                <h4 className="text-lg font-semibold pearl-text mb-3">{t('cases.stocklink.challenge')}</h4>
                <p className="text-white/70 mb-4">
                  {t('cases.stocklink.challengeDescription')}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold pearl-text mb-3">{t('cases.stocklink.impact')}</h4>
                <p className="text-white/70 whitespace-pre-line">
                  {t('cases.stocklink.impactDescription')}
                </p>
              </div>
              <CTAButton 
              variant="primary" 
              size="medium"
            >
              {t('cta')}
            </CTAButton>
            </div>
           
          </div>
          </Link>


          {/* Case 2 */}
          <Link href="#schedule">

          <div className="fade-in">
            <h3 className="text-2xl font-bold text-white mb-6">{t('cases.herreria.title')}</h3>
            <div className="pearl-border p-6 mb-6 flex flex-col gap-6 rounded-2xl">
              <div>

              <h4 className="text-lg font-semibold pearl-text mb-3">{t('cases.herreria.challenge')}</h4>
              <p className="text-white/70 mb-4">
                {t('cases.herreria.challengeDescription')}
              </p>
              </div>
              <div>

              <h4 className="text-lg font-semibold pearl-text mb-3">{t('cases.herreria.impact')}</h4>
              <p className="text-white/70 whitespace-pre-line">
                {t('cases.herreria.impactDescription')}
              </p>
              </div>
              <CTAButton 
              variant="primary" 
              size="medium"
            >
              {t('cta')}
            </CTAButton>
            </div>
           
          </div>
          </Link>

        </div>
      </div>
    </section>
  );
});

CaseStudiesSection.displayName = 'CaseStudiesSection';

export default CaseStudiesSection; 