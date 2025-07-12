import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Web de Lujo | Bit-A - Sitios Premium para Inmobiliarias",
  description: "Crea una presencia digital tan premium como las propiedades que ofrecés. Sitios web de lujo que impresionan desde el primer clic y convierten visitas en consultas reales.",
  keywords: "sitios web inmobiliarias, real estate web premium, páginas web propiedades, diseño web lujo, sitios web agencias inmobiliarias",
  openGraph: {
    title: "Real Estate Web de Lujo | Bit-A",
    description: "Es hora de tener una presencia digital tan premium como las propiedades que ofrecés",
    type: "website",
    images: [
      {
        url: "/images/real-estate-web-og.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate Web de Lujo - Bit-A"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Web de Lujo | Bit-A",
    description: "Es hora de tener una presencia digital tan premium como las propiedades que ofrecés"
  }
};

export default function RealEstateWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 