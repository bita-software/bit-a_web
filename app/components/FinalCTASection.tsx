import { forwardRef } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { useTranslations } from 'next-intl';
import CalReact from './Cal/Cal';

const FinalCTASection = forwardRef<HTMLElement>((props, ref) => {
  const t = useTranslations('DiscoverYourPotential');
  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-20" id="schedule">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedTitle
          as="h2"
          className="fade-in text-4xl sm:text-6xl font-bold text-white mb-8 leading-tight"
        >
          <span className="text-gradient">{t('title')}</span>
        </AnimatedTitle>
        <p className="fade-in text-xl sm:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          {t('description')}
        </p>
        <CalReact scheduleId='30min'/>
      </div>
    </section>
  );
});

FinalCTASection.displayName = 'FinalCTASection';

export default FinalCTASection; 