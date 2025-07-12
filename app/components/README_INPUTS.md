# Componente Input

El componente `Input` proporciona una interfaz estandarizada para campos de entrada de datos con sanitización automática y múltiples variantes de estilo.

## Características

- 🎨 **Múltiples variantes**: default, primary, secondary, outline, ghost, error, success
- 📏 **Tamaños flexibles**: sm, md, lg, xl
- 🛡️ **Sanitización automática**: Previene XSS y otras vulnerabilidades
- 🎭 **Estados visuales**: error, success, loading
- 🔧 **Iconos**: Soporte para iconos izquierda/derecha
- ♿ **Accesibilidad**: Labels, ARIA attributes
- 🎯 **TypeScript**: Tipado completo

## Props

### Principales
- `variant`: Estilo del input ('default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'success')
- `size`: Tamaño del input ('sm' | 'md' | 'lg' | 'xl')
- `rounded`: Bordes redondeados ('none' | 'sm' | 'md' | 'lg' | 'full')
- `label`: Etiqueta opcional del campo
- `error`: Mensaje de error (cambia automáticamente la variante a 'error')
- `success`: Mensaje de éxito (cambia automáticamente la variante a 'success')
- `loading`: Muestra indicador de carga
- `sanitize`: Activa/desactiva sanitización automática (por defecto: true)
- `leftIcon`: Icono en el lado izquierdo
- `rightIcon`: Icono en el lado derecho

### Hereda todas las props nativas de HTMLInputElement

## Ejemplos de uso

### Básico
```tsx
<Input placeholder="Ingresa tu nombre" />
```

### Con label y variante
```tsx
<Input 
  label="Email"
  variant="primary"
  type="email"
  placeholder="tu@email.com"
/>
```

### Con validación
```tsx
<Input 
  label="Contraseña"
  type="password"
  error="La contraseña debe tener al menos 8 caracteres"
  variant="error"
/>
```

### Con iconos
```tsx
<Input 
  label="Buscar"
  leftIcon={<SearchIcon />}
  rightIcon={<FilterIcon />}
  placeholder="Buscar productos..."
/>
```

### Con estado de carga
```tsx
<Input 
  label="Verificando..."
  loading={true}
  disabled={true}
  placeholder="Ingresa el código"
/>
```

### Diferentes tamaños
```tsx
<Input size="sm" placeholder="Pequeño" />
<Input size="md" placeholder="Mediano" />
<Input size="lg" placeholder="Grande" />
<Input size="xl" placeholder="Extra grande" />
```

### Sin sanitización (usar con cuidado)
```tsx
<Input 
  sanitize={false}
  placeholder="Contenido HTML permitido"
/>
```

## Sanitización de datos

El componente incluye sanitización automática que:
- Remueve caracteres HTML peligrosos (`<`, `>`, `'`, `"`)
- Elimina scripts maliciosos (`javascript:`, `vbscript:`)
- Filtra event handlers (`onclick`, `onmouseover`, etc.)
- Bloquea data URLs
- Limpia espacios en blanco

### Desactivar sanitización
```tsx
// Solo para casos específicos donde necesites HTML
<Input sanitize={false} />
```

## Variantes de estilo

### Default
Campo estándar con borde gris

### Primary
Campo con borde blanco, ideal para fondos oscuros

### Secondary
Campo con fondo gris claro

### Outline
Campo transparente con borde blanco

### Ghost
Campo semi-transparente con borde sutil

### Error
Campo con borde rojo para errores

### Success
Campo con borde verde para éxito

## Mejores prácticas

1. **Usa labels**: Siempre incluye un label para accesibilidad
2. **Maneja errores**: Usa la prop `error` para mostrar mensajes de validación
3. **Sanitiza datos**: Mantén `sanitize={true}` excepto en casos específicos
4. **Feedback visual**: Usa las variantes `error` y `success` para retroalimentación
5. **Estados de carga**: Activa `loading` durante operaciones asíncronas

## Notas de seguridad

- La sanitización está activada por defecto
- Nunca desactives la sanitización para datos del usuario
- Usa `sanitize={false}` solo para contenido controlado
- Valida siempre los datos en el backend también 