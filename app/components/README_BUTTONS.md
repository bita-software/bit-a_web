# Componentes de Botón

Este proyecto incluye dos componentes de botón estandarizados para mantener la consistencia en toda la aplicación:

## Button (Componente Base)

El componente `Button` es el componente base que proporciona toda la funcionalidad de los botones.

### Uso

```tsx
import Button from '../components/Button';

// Botón básico
<Button>Texto del botón</Button>

// Botón con variante específica
<Button variant="primary">Botón Primario</Button>

// Botón con tamaño específico
<Button size="lg">Botón Grande</Button>

// Botón con estado de carga
<Button loading={isLoading}>Enviando...</Button>

// Botón deshabilitado
<Button disabled>Deshabilitado</Button>
```

### Props

- `variant`: `'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'` (default: 'default')
- `size`: `'sm' | 'md' | 'lg' | 'xl'` (default: 'md')
- `rounded`: `'none' | 'sm' | 'md' | 'lg' | 'full'` (default: 'full')
- `loading`: `boolean` (default: false)
- `disabled`: `boolean` (default: false)
- `className`: `string` - Clases CSS adicionales
- Todas las props nativas de `HTMLButtonElement`

## CTAButton (Componente Especializado)

El componente `CTAButton` es un wrapper especializado del componente `Button` para llamadas a la acción.

### Uso

```tsx
import CTAButton from '../components/CTAButton';

// CTA básico
<CTAButton>¡Comenzar ahora!</CTAButton>

// CTA con variante específica
<CTAButton variant="primary">Botón Principal</CTAButton>

// CTA con tamaño específico
<CTAButton size="large">CTA Grande</CTAButton>
```

### Props

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: 'primary')
- `size`: `'small' | 'medium' | 'large'` (default: 'medium')
- `disabled`: `boolean` (default: false)
- `type`: `'button' | 'submit' | 'reset'` (default: 'button')
- `className`: `string` - Clases CSS adicionales
- `onClick`: `() => void` - Función de click

## Variantes

### Primary
- Fondo blanco, texto negro
- Ideal para acciones principales

### Secondary
- Fondo negro, borde blanco, texto blanco
- Hover: fondo blanco, texto negro

### Outline
- Fondo transparente, borde blanco, texto blanco
- Hover: fondo blanco, texto negro

### Ghost
- Fondo semi-transparente, borde semi-transparente
- Hover: fondo más opaco

### Destructive (solo Button)
- Fondo rojo para acciones destructivas

## Características

- **Bordes redondeados**: Todos los botones tienen `rounded-full` por defecto
- **Transiciones suaves**: Animaciones de 300ms
- **Efectos hover**: Escalado y cambios de color
- **Accesibilidad**: Focus rings y estados disabled
- **Estado de carga**: Spinner integrado (solo Button)
- **Responsivo**: Funciona en todos los tamaños de pantalla

## Mejores Prácticas

1. **Usar CTAButton** para llamadas a la acción principales
2. **Usar Button** para botones más generales y funcionales
3. **Mantener consistencia** en variantes y tamaños
4. **Usar loading state** para operaciones asíncronas
5. **Proporcionar feedback visual** para todas las interacciones 