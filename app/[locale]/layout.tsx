import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import Navbar from '../components/Navbar';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import LenisProvider from '../components/Providers/LenisProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bit-A | Boutique Digital de Branding y Tecnología de Alto Impacto",
  description: "Transformamos marcas audaces en leyendas digitales. Sitios de lujo que mueven corazones y métricas.",
  keywords: "branding digital, desarrollo web premium, e-commerce de lujo, automatización IA, Next.js, boutique digital",
  authors: [{ name: "Bit-A" }],
  creator: "Bit-A",
  publisher: "Bit-A",
  openGraph: {
    title: "Bit-A | Digital Legends",
    description: "Luxury sites that move hearts and metrics",
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bit-A | Digital Legends",
    description: "Luxury sites that move hearts and metrics",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Validar que el locale existe
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Obtener mensajes para el locale actual
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} antialiased`}>
        <LenisProvider>
          <SmoothScrollProvider>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <div className=' bg-[#11111177] border border-[#ffffff11] max-w-7xl mx-auto rounded-[3rem] overflow-hidden mt-[7rem]'>
              {children}
              </div>
            </NextIntlClientProvider>
          </SmoothScrollProvider>
        </LenisProvider>
      </body>
    </html>
  );
} 