import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Locale = typeof routing.locales[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener el locale solicitado
  let locale = await requestLocale;

  // Validar que el locale existe en nuestra configuración
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
}); 