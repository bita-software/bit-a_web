import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const smoothScrollTo = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a') as HTMLAnchorElement;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.includes('#')) return;

      // Usamos el objeto URL para normalizar la comparación de rutas
      const url = new URL(link.href);
      const currentUrl = new URL(window.location.href);

      // Si es la misma página (mismo pathname) y hay un hash
      if (url.pathname === currentUrl.pathname && url.hash) {
        e.preventDefault();
        const targetId = url.hash.substring(1);
        if (targetId) {
          smoothScrollTo(targetId);
          // Actualizar la URL sin recargar
          window.history.pushState(null, '', url.hash);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}; 