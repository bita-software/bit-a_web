'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from '../../../i18n/routing';
import { NavItem as NavItemType } from './types';
import Button from '../Button';

interface NavItemProps {
  item: NavItemType;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavItem({ item, isActive, onClick, className = '' }: NavItemProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSubmenuOpen(false);
    }, 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Si tiene submenu pero también tiene href, navegamos al enlace principal
    // El submenu se maneja solo con hover
    if (item.submenu && item.submenu.length > 0 && !item.href) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    }
    onClick?.();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const linkClasses = `
    text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium
    ${isActive ? 'text-white' : ''}
    ${className}
  `;

  const content = (
    <span className="flex items-center gap-1">
      {item.label}
      {item.submenu && item.submenu.length > 0 && (
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isSubmenuOpen ? 'rotate-180' : ''
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
      )}
    </span>
  );

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Elemento principal del menú */}
      {item.href ? (
        item.isAnchor ? (
          <a
            href={item.href}
            className={linkClasses}
            onClick={handleClick}
            target={item.target || '_self'}
          >
            {content}
          </a>
        ) : item.isExternal ? (
          <a
            href={item.href}
            className={linkClasses}
            onClick={handleClick}
            target={item.target || '_blank'}
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : item.isButton ? (
          <Button
            onClick={handleClick}
            variant='glass'
          >
            <Link href={item.href}>
            {content}
            </Link>
          </Button>
        ) : (
          <Link
            href={item.href}
            className={linkClasses}
            onClick={handleClick}
          >
            {content}
          </Link>
        )
      ) : (
        <button
          className={linkClasses}
          onClick={handleClick}
        >
          {content}
        </button>
      )}

      {/* Submenú desplegable */}
      {item.submenu && item.submenu.length > 0 && (
        <div
          ref={submenuRef}
          className={`
            absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl
            transform transition-all duration-200 origin-top
            ${isSubmenuOpen 
              ? 'opacity-100 visible scale-100 translate-y-0' 
              : 'opacity-0 invisible scale-95 -translate-y-2'
            }
          `}
        >
          <div className="p-4 space-y-2">
            {item.submenu.map((subItem) => (
              <div key={subItem.id}>
                {subItem.isAnchor ? (
                  <a
                    href={subItem.href}
                    className="block p-3 rounded-md hover:bg-white/5 transition-colors duration-200 group"
                    target={subItem.target || '_self'}
                  >
                    <div className="flex items-start gap-3">
                      {subItem.icon && (
                        <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">
                          {subItem.icon}
                        </span>
                      )}
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium group-hover:text-white/90">
                          {subItem.label}
                        </div>
                        {subItem.description && (
                          <div className="text-white/50 text-xs mt-1 group-hover:text-white/60">
                            {subItem.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ) : subItem.isExternal ? (
                  <a
                    href={subItem.href}
                    className="block p-3 rounded-md hover:bg-white/5 transition-colors duration-200 group"
                    target={subItem.target || '_blank'}
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-start gap-3">
                      {subItem.icon && (
                        <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">
                          {subItem.icon}
                        </span>
                      )}
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium group-hover:text-white/90">
                          {subItem.label}
                        </div>
                        {subItem.description && (
                          <div className="text-white/50 text-xs mt-1 group-hover:text-white/60">
                            {subItem.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    href={subItem.href}
                    className="block p-3 rounded-md hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      {subItem.icon && (
                        <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">
                          {subItem.icon}
                        </span>
                      )}
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium group-hover:text-white/90">
                          {subItem.label}
                        </div>
                        {subItem.description && (
                          <div className="text-white/50 text-xs mt-1 group-hover:text-white/60">
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
        </div>
      )}
    </div>
  );
} 