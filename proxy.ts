import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/routing';

export const proxy = createMiddleware({
  // Lista de idiomas soportados
  locales,

  // Idioma por defecto
  defaultLocale,

  // Prefijo para el idioma por defecto
  localePrefix: 'always'
});

export const config = {
  // Coincidir con todas las rutas excepto api, _next/static, _next/image, favicon.ico
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico).*)']
}; 