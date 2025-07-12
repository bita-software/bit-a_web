'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';
import CTAButton from './CTAButton';

const ServicesSection = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'section'>>((props, ref) => {
  const t = useTranslations('Services');
  
  return (
    <section ref={ref} {...props} className={`py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-20 ${props.className || ''}`}>
      <div className="max-w-7xl mx-auto">
        <AnimatedTitle
          as="h2"
          className="fade-in text-3xl sm:text-5xl font-bold text-white mb-20 text-center"
        >
          <span className="text-gradient">{t('title')}</span>
        </AnimatedTitle>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div id="servicio-express" className="fade-in pearl-border p-8 hover:bg-white/5 transition-all duration-500 hover:scale-105 group rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">{t('items.express.title')}</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('items.express.description')}
            </p>
            <CTAButton 
              variant="primary" 
              size="medium"
            >
              {t('items.express.cta')}
            </CTAButton>
          </div>

          {/* Service 2 */}
          <div id="servicio-ecommerce" className="fade-in pearl-border p-8 hover:bg-white/5 transition-all duration-500 hover:scale-105 group rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">{t('items.ecommerce.title')}</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('items.ecommerce.description')}
            </p>
            <CTAButton 
              variant="primary" 
              size="medium"
            >
              {t('items.ecommerce.cta')}
            </CTAButton>
          </div>

          {/* Service 3 */}
          <div id="servicio-automation" className="fade-in pearl-border p-8 hover:bg-white/5 transition-all duration-500 hover:scale-105 group rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">{t('items.automation.title')}</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('items.automation.description')}
            </p>
            <CTAButton 
              variant="primary" 
              size="medium"
            >
              {t('items.automation.cta')}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection; 