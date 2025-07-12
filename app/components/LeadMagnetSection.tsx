'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedTitle from './AnimatedTitle';
import CTAButton from './CTAButton';
import Input from './Input';
import { Mail } from 'lucide-react';

const LeadMagnetSection = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'section'>>((props, ref) => {
  const t = useTranslations('LeadMagnet');
 


  return (
    <section ref={ref} {...props} className={`py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f8fafc]/3 via-transparent to-[#f8fafc]/5 relative z-20 ${props.className || ''}`}>
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedTitle
          as="h2"
          className="fade-in text-3xl sm:text-5xl font-bold text-white mb-8 max-w-2xl mx-auto"
        >
          <span className="block">{t('title')}</span>
          <span className="block text-gradient">{t('subtitle')}</span>
        </AnimatedTitle>
        <p className="fade-in text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
        <div className="fade-in flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input
            type="email"
            size="lg"
            leftIcon={<Mail className="w-5 h-5" />}
            placeholder={t('placeholder')} 
            className='min-w-2xs'
          />
          <CTAButton 
            variant="primary" 
            size="medium"
            className='min-w-xs'
          >
            {t('cta')}
          </CTAButton>
        </div>
      </div>
    </section>
  );
});

LeadMagnetSection.displayName = 'LeadMagnetSection';

export default LeadMagnetSection; 