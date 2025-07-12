import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Bit-A - Boutique Digital de Branding y Tecnología",
  description: "Conoce la historia y visión de Bit-A. Transformamos marcas audaces en leyendas digitales con tecnología que hace vibrar tu marca.",
  keywords: "about bit-a, nosotros, historia, visión, boutique digital, branding, tecnología",
  openGraph: {
    title: "Nosotros | Bit-A - Boutique Digital",
    description: "Conoce la historia y visión de Bit-A. Transformamos marcas audaces en leyendas digitales.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Bit-A - Boutique Digital",
    description: "Conoce la historia y visión de Bit-A. Transformamos marcas audaces en leyendas digitales.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 