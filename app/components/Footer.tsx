'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';

export default function Footer(props: React.ComponentPropsWithoutRef<'footer'>) {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  
  const socialLinks = [
    { name: 'TikTok', href: 'https://www.tiktok.com/@codigochamo' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61575155107794' },
    { name: 'Instagram', href: 'https://www.instagram.com/bita.software/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/bit-a/' }
  ];

  return (
    <footer {...props} className={`py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-20 ${props.className || ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img 
              src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1741375820/Bit-A/Logo/gqj2p6jgbsaditwrqlfk.png" 
              alt="bit-a logo completo" 
              className="h-10 sm:h-12 mb-4 opacity-90"
            />
            <p className="text-white/50 text-sm sm:text-base max-w-xs sm:max-w-sm lg:max-w-md leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Columnas de navegación, legal y redes sociales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 justify-items-center lg:justify-items-end">
            {/* Enlaces de navegación */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full">
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Navegación</h4>
              <div className="flex flex-col space-y-2 sm:space-y-3 items-center lg:items-end w-full">
                <Link
                  href="/services"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {tNav('services')}
                </Link>
                <Link 
                  href="/real-estate-web"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {tNav('realEstateWeb')}
                </Link>
                <Link 
                  href="/about"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {tNav('about')}
                </Link>
                <a 
                  href="#casos"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {tNav('cases')}
                </a>
                <a 
                  href="#contacto"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {tNav('contact')}
                </a>
              </div>
            </div>

            {/* Enlaces legales */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full">
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Legal</h4>
              <div className="flex flex-col space-y-2 sm:space-y-3 items-center lg:items-end w-full">
                <Link 
                  href="/legal/privacy-policy"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('links.privacy')}
                </Link>
                <Link 
                  href="/legal/terms-of-service"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('links.terms')}
                </Link>
                <Link 
                  href="/legal/accessibility"
                  className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('links.accessibility')}
                </Link>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full sm:col-span-2 lg:col-span-1">
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">{t('social.title')}</h4>
              <div className="flex flex-col space-y-2 sm:space-y-3 items-center lg:items-end w-full">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
                    aria-label={`Visitar ${social.name}`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 sm:pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs sm:text-sm">
            © {new Date().getFullYear()} bit-a
          </p>
        </div>
      </div>
    </footer>
  );
} 