import React, { forwardRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  label?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  sanitize?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Función para sanitizar datos de entrada
const sanitizeInput = (value: string): string => {
  if (!value) return '';
  
  // Remover caracteres potencialmente peligrosos
  return value
    .replace(/[<>'"]/g, '') // Remover caracteres HTML básicos
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/vbscript:/gi, '') // Remover vbscript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .replace(/data:/gi, '') // Remover data URLs
    .trim();
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    rounded = 'md',
    label,
    error,
    success,
    loading = false,
    sanitize = true,
    leftIcon,
    rightIcon,
    onChange,
    disabled,
    type = 'text',
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string>('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const sanitizedValue = sanitize ? sanitizeInput(rawValue) : rawValue;
      
      setInternalValue(sanitizedValue);
      
      if (onChange) {
        // Crear un nuevo evento con el valor sanitizado
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitizedValue
          }
        };
        onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
      }
    }, [onChange, sanitize]);

    const baseClasses = 'flex w-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400';
    
    const variantClasses = {
      default: 'text-white border-2 border-gray-200 focus:border-gray-400 focus:ring-gray-400/50',
      primary: 'text-white border-2 border-white focus:border-gray-300 focus:ring-white/50',
      secondary: 'text-white border-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500/50',
      outline: 'text-white border-2 border-white focus:border-gray-300 focus:ring-white/50',
      ghost: 'text-white border border-white/20 focus:border-white/40 focus:ring-white/50',
      error: 'text-white border-2 border-red-500 focus:border-red-600 focus:ring-red-500/50',
      success: 'text-white border-2 border-green-500 focus:border-green-600 focus:ring-green-500/50'
    };
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
      xl: 'px-8 py-6 text-xl'
    };
    
    const roundedClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    };

    const inputClasses = cn(
      baseClasses,
      variantClasses[error ? 'error' : success ? 'success' : variant],
      sizeClasses[size],
      roundedClasses[rounded],
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={inputClasses}
            disabled={disabled || loading}
            onChange={handleChange}
            value={props.value !== undefined ? props.value : internalValue}
            {...props}
          />
          
          {(rightIcon || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {success && (
          <p className="mt-1 text-sm text-green-600">{success}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 