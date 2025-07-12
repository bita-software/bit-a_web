'use client';

import { Link } from '../../i18n/routing';
import { useTranslations } from 'next-intl';

interface LegalSection {
  title: string;
  content: string;
}

interface LegalPageTemplateProps {
  title: string;
  lastUpdated: string;
  sections: Record<string, LegalSection>;
}

export default function LegalPageTemplate({ title, lastUpdated, sections }: LegalPageTemplateProps) {
  const t = useTranslations('Footer');
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <Link 
          href="/"
          className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {title}
        </h1>
        
        <p className="text-white/60 text-lg">
          {lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {Object.entries(sections).map(([key, section]) => (
          <section key={key} className="border-l-2 border-white/20 pl-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {section.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Footer navigation */}
      <div className="mt-16 pt-8 border-t border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/legal/privacy-policy"
              className="text-white/60 hover:text-white transition-colors"
            >
              {t('links.privacy')}
            </Link>
            <Link 
              href="/legal/terms-of-service"
              className="text-white/60 hover:text-white transition-colors"
            >
              {t('links.terms')}
            </Link>
            <Link 
              href="/legal/accessibility"
              className="text-white/60 hover:text-white transition-colors"
            >
              {t('links.accessibility')}
            </Link>
          </div>
          <Link 
            href="/"
            className="text-white/60 hover:text-white transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
} 