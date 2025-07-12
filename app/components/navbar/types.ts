export interface NavItem {
  id: string;
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
  isExternal?: boolean;
  isAnchor?: boolean;
  target?: '_blank' | '_self';
  className?: string;
}

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  isAnchor?: boolean;
  target?: '_blank' | '_self';
  icon?: string;
  className?: string;
}

export interface NavConfig {
  mainNavItems: NavItem[];
  cta?: {
    label: string;
    href: string;
    className?: string;
  };
  logo: {
    src: string;
    alt: string;
    href: string;
    className?: string;
  };
  languageToggle: {
    enabled: boolean;
    className?: string;
  };
  mobile: {
    enabled: boolean;
    breakpoint: 'sm' | 'md' | 'lg' | 'xl';
  };
}

export interface NavState {
  activeSubmenu: string | null;
  isMobileMenuOpen: boolean;
} 