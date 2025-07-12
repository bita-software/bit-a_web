'use client';

import { useState } from 'react';
import { Link } from '../../../i18n/routing';
import { NavItem as NavItemType } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  items: NavItemType[];
  switchLocale: string;
  pathWithoutLocale: string;
}

export default function MobileMenu({ 
  isOpen, 
  onToggle, 
  items, 
  switchLocale, 
  pathWithoutLocale 
}: MobileMenuProps) {
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (itemId: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(itemId)) {
      newOpenSubmenus.delete(itemId);
    } else {
      newOpenSubmenus.add(itemId);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const handleItemClick = () => {
    onToggle(); // Cerrar menú al hacer clic en un item
  };

  return (
    <>
      {/* Menú desplegable */}
      <div
        className={`
          fixed inset-0 z-[9999] md:hidden
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        {/* Overlay */}
        <div
          className={`
            absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={onToggle}
        />

        {/* Menú */}
        <div
          className={`
            absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-black/95 backdrop-blur-sm border-l border-white/10
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="p-6 pt-20 space-y-6 h-full overflow-y-auto">
            {/* Logo en mobile */}
            <div className="flex justify-center mb-8">
              <Link href="/" onClick={handleItemClick}>
                <img 
                  src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1751507728/Iso_Tipo_White_wvt1xq.svg" 
                  alt="bit-a isotipo" 
                  className="w-12 h-12 opacity-90"
                />
              </Link>
            </div>

            {/* Items del menú */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="space-y-2">
                  {/* Item principal */}
                  <div className="flex items-center justify-between">
                    {item.href ? (
                      item.isAnchor ? (
                        <a
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors duration-300 text-base font-medium flex-1"
                          onClick={handleItemClick}
                        >
                          {item.label}
                        </a>
                      ) : item.isExternal ? (
                        <a
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors duration-300 text-base font-medium flex-1"
                          target={item.target || '_blank'}
                          rel="noopener noreferrer"
                          onClick={handleItemClick}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors duration-300 text-base font-medium flex-1"
                          onClick={handleItemClick}
                        >
                          {item.label}
                        </Link>
                      )
                    ) : (
                      <span className="text-white/70 text-base font-medium flex-1">
                        {item.label}
                      </span>
                    )}

                    {/* Botón para desplegar submenú */}
                    {item.submenu && item.submenu.length > 0 && (
                      <button
                        className="p-2 text-white/50 hover:text-white transition-colors duration-300"
                        onClick={() => toggleSubmenu(item.id)}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openSubmenus.has(item.id) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Submenú */}
                  {item.submenu && item.submenu.length > 0 && (
                    <div
                      className={`
                        pl-4 space-y-2 overflow-hidden transition-all duration-300
                        ${openSubmenus.has(item.id) 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0'
                        }
                      `}
                    >
                      {item.submenu.map((subItem) => (
                        <div key={subItem.id} className="border-l border-white/10 pl-4">
                          {subItem.isAnchor ? (
                            <a
                              href={subItem.href}
                              className="block p-2 text-white/50 hover:text-white/80 transition-colors duration-300"
                              onClick={handleItemClick}
                            >
                              <div className="flex items-start gap-3">
                                {subItem.icon && (
                                  <span className="text-sm mt-0.5">{subItem.icon}</span>
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{subItem.label}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-white/30 mt-1">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </a>
                          ) : subItem.isExternal ? (
                            <a
                              href={subItem.href}
                              className="block p-2 text-white/50 hover:text-white/80 transition-colors duration-300"
                              target={subItem.target || '_blank'}
                              rel="noopener noreferrer"
                              onClick={handleItemClick}
                            >
                              <div className="flex items-start gap-3">
                                {subItem.icon && (
                                  <span className="text-sm mt-0.5">{subItem.icon}</span>
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{subItem.label}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-white/30 mt-1">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </a>
                          ) : (
                            <Link
                              href={subItem.href}
                              className="block p-2 text-white/50 hover:text-white/80 transition-colors duration-300"
                              onClick={handleItemClick}
                            >
                              <div className="flex items-start gap-3">
                                {subItem.icon && (
                                  <span className="text-sm mt-0.5">{subItem.icon}</span>
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{subItem.label}</div>
                                  {subItem.description && (
                                    <div className="text-xs text-white/30 mt-1">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selector de idioma */}
            <div className="pt-6 border-t border-white/10">
              <a
                href={`/${switchLocale}/${pathWithoutLocale}`} 
                className="block w-full text-center text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium border border-white/20 px-3 py-2 rounded-md hover:border-white/40"
                onClick={handleItemClick}
              >
                {switchLocale.toUpperCase()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 