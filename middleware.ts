import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/routing';

export default createMiddleware({
  // Lista de idiomas soportados
  locales,
  
  // Idioma por defecto
  defaultLocale,
  
  // Prefijo para el idioma por defecto
  localePrefix: 'always'
});

export const config = {
  // Coincidir con todas las rutas excepto api, _next/static, _next/image, favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 