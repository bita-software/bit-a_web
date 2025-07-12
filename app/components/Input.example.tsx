import React, { useState } from 'react';
import Input from './Input';

// Iconos de ejemplo (puedes usar cualquier librería de iconos)
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const InputExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    search: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Limpiar errores cuando el usuario empieza a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };

    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simular petición a servidor
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSuccess(true);
    
    // Resetear éxito después de 3 segundos
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Ejemplos del Componente Input</h1>
        <p className="text-gray-600">Diferentes variantes, tamaños y usos del componente Input</p>
      </div>

      {/* Formulario funcional */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Formulario Funcional</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nombre completo"
            variant="primary"
            size="md"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChange={handleChange('name')}
            error={errors.name}
            leftIcon={<UserIcon />}
          />

          <Input
            label="Email"
            type="email"
            variant="primary"
            size="md"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            leftIcon={<EmailIcon />}
          />

          <Input
            label="Contraseña"
            type="password"
            variant="primary"
            size="md"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>

          {success && (
            <p className="text-green-600 text-center">¡Formulario enviado exitosamente!</p>
          )}
        </form>
      </section>

      {/* Variantes */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Variantes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input variant="default" placeholder="Default" />
          <Input variant="primary" placeholder="Primary" />
          <Input variant="secondary" placeholder="Secondary" />
          <Input variant="outline" placeholder="Outline" />
          <Input variant="ghost" placeholder="Ghost" />
          <Input variant="error" placeholder="Error" error="Mensaje de error" />
          <Input variant="success" placeholder="Success" success="Mensaje de éxito" />
        </div>
      </section>

      {/* Tamaños */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Tamaños</h2>
        <div className="space-y-4">
          <Input size="sm" placeholder="Small (sm)" />
          <Input size="md" placeholder="Medium (md)" />
          <Input size="lg" placeholder="Large (lg)" />
          <Input size="xl" placeholder="Extra Large (xl)" />
        </div>
      </section>

      {/* Con iconos */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Con Iconos</h2>
        <div className="space-y-4">
          <Input
            placeholder="Con icono izquierdo"
            leftIcon={<SearchIcon />}
          />
          <Input
            placeholder="Con icono derecho"
            rightIcon={<UserIcon />}
          />
          <Input
            placeholder="Con ambos iconos"
            leftIcon={<SearchIcon />}
            rightIcon={<UserIcon />}
          />
        </div>
      </section>

      {/* Estados especiales */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Estados Especiales</h2>
        <div className="space-y-4">
          <Input placeholder="Estado normal" />
          <Input placeholder="Cargando..." loading={true} />
          <Input placeholder="Deshabilitado" disabled={true} />
        </div>
      </section>

      {/* Diferentes tipos */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Diferentes Tipos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="text" placeholder="Texto" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Contraseña" />
          <Input type="number" placeholder="Número" />
          <Input type="tel" placeholder="Teléfono" />
          <Input type="url" placeholder="URL" />
        </div>
      </section>

      {/* Búsqueda interactiva */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Búsqueda Interactiva</h2>
        <Input
          placeholder="Buscar productos..."
          value={formData.search}
          onChange={handleChange('search')}
          leftIcon={<SearchIcon />}
          size="lg"
          rounded="full"
        />
        {formData.search && (
                     <p className="mt-2 text-sm text-gray-600">
             Buscando: &quot;{formData.search}&quot;
           </p>
        )}
      </section>
    </div>
  );
};

export default InputExample; 