import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';

export default function LegalIndexPage() {
  const t = useTranslations('Footer');
  
  const legalPages = [
    {
      title: t('links.privacy'),
      href: '/legal/privacy-policy',
      description: 'Conoce cómo recopilamos, usamos y protegemos tu información personal.'
    },
    {
      title: t('links.terms'),
      href: '/legal/terms-of-service',
      description: 'Lee los términos y condiciones que rigen el uso de nuestros servicios.'
    },
    {
      title: t('links.accessibility'),
      href: '/legal/accessibility',
      description: 'Nuestro compromiso con la accesibilidad web y la inclusión digital.'
    }
  ];

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
          Información Legal
        </h1>
        
        <p className="text-white/60 text-lg">
          Transparencia y confianza en cada interacción
        </p>
      </div>

      {/* Legal pages grid */}
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {legalPages.map((page, index) => (
          <Link
            key={index}
            href={page.href}
            className="group block p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/5"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white group-hover:text-white/90">
              {page.title}
            </h2>
            <p className="text-white/60 leading-relaxed">
              {page.description}
            </p>
            <div className="mt-4 text-white/40 text-sm flex items-center">
              Leer más
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Contact section */}
      <div className="mt-16 p-8 rounded-lg border border-white/10 bg-white/5">
        <h3 className="text-xl font-semibold mb-4 text-white">
          ¿Tienes preguntas?
        </h3>
        <p className="text-white/60 mb-6">
          Si tienes alguna pregunta sobre nuestras políticas legales, no dudes en contactarnos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:ignacio.gomez@bit-a.com"
            className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar email
          </a>
          <a
            href="tel:+59896695979"
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +598 96 695 979
          </a>
        </div>
      </div>
    </div>
  );
} 