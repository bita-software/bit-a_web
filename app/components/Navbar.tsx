'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '../../i18n/routing';
import { getNavConfigWithTranslations } from './navbar/config';
import NavItem from './navbar/NavItem';
import MobileMenu from './navbar/MobileMenu';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Obtener el idioma actual del pathname
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'es'; // El primer segmento después de '/' es el locale
  const switchLocale = currentLocale === 'es' ? 'en' : 'es';
  console.log(currentLocale, switchLocale);
  
  // Extraer la ruta sin el locale para evitar duplicación
  const pathWithoutLocale = pathSegments.slice(2).join('/') || '/';

  // Obtener configuración del menú con traducciones
  const navConfig = getNavConfigWithTranslations(t);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center bg-[#11111177] border border-[#ffffff11] rounded-[3rem] py-2 px-6 backdrop-blur-sm">
          <div className='absolute top-0 left-0 w-full h-full bg-[#00000077] rounded-[3rem] py-2 px-6 backdrop-blur-sm -z-10'></div>
          {/* Logo */}
          <div className="flex items-center">
            <Link href={navConfig.logo.href} className="flex items-center">
              <img 
                src={navConfig.logo.src}
                alt={navConfig.logo.alt}
                className={navConfig.logo.className}
              />
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navConfig.mainNavItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
            
            {/* Selector de idioma */}
            {navConfig.languageToggle.enabled && (
              <a 
                href={`/${switchLocale}/${pathWithoutLocale}`} 
                className={navConfig.languageToggle.className}
              >
                {switchLocale.toUpperCase()}
              </a>
            )}
          </div>

          {/* Botón hamburguesa para mobile */}
          <div className="md:hidden">
            <button
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Menú mobile - Fuera del contenedor del navbar */}
      {navConfig.mobile.enabled && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
          items={navConfig.mainNavItems}
          switchLocale={switchLocale}
          pathWithoutLocale={pathWithoutLocale}
        />
      )}
    </>
  );
} 