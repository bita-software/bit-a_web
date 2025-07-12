import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | Bit-A - Boutique Digital de Branding y Tecnología",
  description: "Servicios digitales premium: Landing de lujo, E-commerce escalable, Asistente IA, Web corporativa, Automatización y Branding digital. Transformamos marcas audaces en leyendas digitales.",
  keywords: "servicios digitales, desarrollo web premium, e-commerce, automatización, branding digital, IA, landing page, web corporativa",
  openGraph: {
    title: "Servicios | Bit-A - Boutique Digital",
    description: "Servicios digitales premium que transforman marcas audaces en leyendas digitales.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios | Bit-A - Boutique Digital",
    description: "Servicios digitales premium que transforman marcas audaces en leyendas digitales.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 