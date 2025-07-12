# Sistema de Navegación Modular

Este sistema de navegación permite crear menús modulares y extensibles con soporte para submenús, responsividad y fácil configuración.

## Estructura

```
navbar/
├── types.ts          # Tipos TypeScript
├── config.ts         # Configuración modular del menú
├── NavItem.tsx       # Componente para elementos del menú
├── MobileMenu.tsx    # Componente para menú mobile
└── README.md         # Esta documentación
```

## Características

✅ **Configuración modular**: Fácil agregar/quitar elementos del menú
✅ **Soporte para submenús**: Desplegables con descripción e íconos
✅ **Responsivo**: Menú hamburguesa para mobile
✅ **Multiidioma**: Integración con next-intl
✅ **Animaciones suaves**: Transiciones y efectos hover
✅ **Accesibilidad**: Navegación por teclado y aria labels
✅ **Flexible**: Soporte para links internos, externos y anchors

## Uso Básico

### Agregar un nuevo elemento del menú

En `config.ts`, agrega un nuevo item al array `mainNavItems`:

```typescript
{
  id: 'nuevo-item',
  label: 'nuevoItem', // Clave de traducción
  href: '/nueva-pagina'
}
```

### Agregar un submenú

```typescript
{
  id: 'servicios',
  label: 'services',
  submenu: [
    {
      id: 'servicio1',
      label: 'servicio1',
      href: '/servicios/servicio1',
      description: 'descripcionServicio1',
      icon: '🚀'
    }
  ]
}
```

### Configurar traducciones

En `messages/es.json` y `messages/en.json`:

```json
{
  "Navigation": {
    "nuevoItem": "Nuevo Item",
    "servicio1": "Servicio 1",
    "descripcionServicio1": "Descripción del servicio"
  }
}
```

## Tipos de Enlaces

### Link interno (Next.js)
```typescript
{
  id: 'about',
  label: 'about',
  href: '/about' // Ruta interna
}
```

### Link externo
```typescript
{
  id: 'external',
  label: 'external',
  href: 'https://example.com',
  isExternal: true,
  target: '_blank'
}
```

### Anchor (scroll a sección)
```typescript
{
  id: 'contact',
  label: 'contact',
  href: '#contacto',
  isAnchor: true
}
```

## Personalización

### Cambiar el logo
En `config.ts`:
```typescript
logo: {
  src: 'tu-logo.svg',
  alt: 'Tu marca',
  href: '/',
  className: 'w-10 h-10 hover:opacity-100'
}
```

### Deshabilitar menú mobile
```typescript
mobile: {
  enabled: false,
  breakpoint: 'md'
}
```

### Personalizar estilos
Los estilos se manejan con Tailwind CSS. Puedes modificar las clases en cada componente o usar `className` en la configuración.

## Estructura de Datos

### NavItem
```typescript
interface NavItem {
  id: string;           // Identificador único
  label: string;        // Clave de traducción
  href?: string;        // URL del enlace
  submenu?: SubMenuItem[]; // Elementos del submenú
  isExternal?: boolean; // Si es enlace externo
  isAnchor?: boolean;   // Si es anchor (#)
  target?: string;      // Target del enlace
  className?: string;   // Clases CSS personalizadas
}
```

### SubMenuItem
```typescript
interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  description?: string; // Descripción del submenú
  isExternal?: boolean;
  isAnchor?: boolean;
  target?: string;
  icon?: string;        // Emoji o ícono
  className?: string;
}
```

## Ejemplos de Uso

### Menú con submenús complejos
```typescript
{
  id: 'productos',
  label: 'products',
  submenu: [
    {
      id: 'web-design',
      label: 'webDesign',
      href: '/productos/web-design',
      description: 'webDesignDesc',
      icon: '🎨'
    },
    {
      id: 'ecommerce',
      label: 'ecommerce',
      href: '/productos/ecommerce',
      description: 'ecommerceDesc',
      icon: '🛒'
    }
  ]
}
```

### Menú con links mixtos
```typescript
{
  id: 'recursos',
  label: 'resources',
  submenu: [
    {
      id: 'blog',
      label: 'blog',
      href: '/blog',
      icon: '📝'
    },
    {
      id: 'docs',
      label: 'documentation',
      href: 'https://docs.example.com',
      isExternal: true,
      icon: '📚'
    },
    {
      id: 'faq',
      label: 'faq',
      href: '#faq',
      isAnchor: true,
      icon: '❓'
    }
  ]
}
```

## Funcionalidades Avanzadas

### Hover delay en submenús
Los submenús tienen un delay de 150ms para evitar cierres accidentales.

### Detección de ruta activa
Puedes pasar `isActive` al componente `NavItem` para resaltar la ruta actual.

### Cierre automático en mobile
El menú mobile se cierra automáticamente al hacer clic en cualquier elemento.

## Mejores Prácticas

1. **IDs únicos**: Usa IDs descriptivos y únicos
2. **Traducciones**: Siempre incluye traducciones en ambos idiomas
3. **Iconos**: Usa emojis simples o librerías de iconos
4. **Descripciones**: Mantén las descripciones cortas y claras
5. **Organización**: Agrupa elementos relacionados en submenús

## Solución de Problemas

### Los submenús no aparecen
- Verifica que el array `submenu` tenga elementos
- Asegúrate de que las traducciones estén definidas

### El menú mobile no funciona
- Verifica que `mobile.enabled` esté en `true`
- Asegúrate de que el breakpoint sea correcto

### Las traducciones no aparecen
- Verifica que las claves estén en ambos archivos de traducciones
- Asegúrate de que `useTranslations('Navigation')` esté correctamente configurado 