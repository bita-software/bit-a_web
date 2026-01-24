import { NavConfig } from './types';

export const navConfig: NavConfig = {
  mainNavItems: [
    {
      id: 'services',
      label: 'services',
      href: '/services',
      submenu: [
        {
          id: 'realEstateWeb',
          label: 'realEstateWeb',
          href: '/real-estate-web',
          description: 'realEstateWebDescription',
        },
        {
          id: 'express',
          label: 'expressLanding',
          href: '/services#services',
          description: 'expressDescription',
          isAnchor: true,
        },
        {
          id: 'ecommerce',
          label: 'ecommercePremium',
          href: '/services#services',
          description: 'ecommerceDescription',
          isAnchor: true,
        },
        {
          id: 'corporate',
          label: 'corporateWeb',
          href: '/services#services',
          description: 'corporateDescription',
          isAnchor: true,
        },
        {
          id: 'automation',
          label: 'automationAI',
          href: '/services#services',
          description: 'automationDescription',
          isAnchor: true,
        },
        {
          id: 'branding',
          label: 'digitalBranding',
          href: '/services#services',
          description: 'brandingDescription',
          isAnchor: true,
        },
        {
          id: 'diagnosis',
          label: 'digitalDiagnosis',
          href: '/services#services',
          description: 'diagnosisDescription',
          isAnchor: true,
        },
      ]
    },
    {
      id: 'realEstateWeb',
      label: 'realEstateWeb',
      href: '/real-estate-web'
    },
    {
      id: 'insights',
      label: 'insights',
      href: '/insights'
    },
    {
      id: 'about',
      label: 'about',
      href: '/about',
    },
    {
      id: 'contact',
      label: 'contact',
      href: '/contact',
      isButton: true,
    }
  ],
  logo: {
    src: 'https://res.cloudinary.com/dhq5ewbyu/image/upload/v1751507728/Iso_Tipo_White_wvt1xq.svg',
    alt: 'bit-a isotipo',
    href: '/',
    className: 'w-10 h-10 opacity-90 hover:opacity-100 transition-opacity duration-300'
  },
  languageToggle: {
    enabled: true,
    className: 'text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium border border-white/20 px-3 py-1 rounded-md hover:border-white/40'
  },
  mobile: {
    enabled: true,
    breakpoint: 'md'
  }
};

// Función para obtener configuración con traducciones
export const getNavConfigWithTranslations = (t: (key: string) => string): NavConfig => {
  const config = { ...navConfig };

  // Traducir elementos principales
  config.mainNavItems = config.mainNavItems.map(item => ({
    ...item,
    label: t(item.label),
    submenu: item.submenu?.map(subItem => ({
      ...subItem,
      label: t(subItem.label),
      description: subItem.description ? t(subItem.description) : undefined
    }))
  }));

  return config;
}; 