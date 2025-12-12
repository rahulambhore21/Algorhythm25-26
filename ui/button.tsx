import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
    
    let variantStyles = '';
    switch (variant) {
      case 'ghost':
        variantStyles = 'hover:bg-white/10 hover:text-white';
        break;
      case 'outline':
        variantStyles = 'border border-gray-600 hover:bg-white/10 hover:text-white';
        break;
      default:
        variantStyles = 'bg-blue-600 text-white hover:bg-blue-700';
    }
    
    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'h-8 px-3 text-xs';
        break;
      case 'lg':
        sizeStyles = 'h-10 px-8';
        break;
      default:
        sizeStyles = 'h-9 px-4 py-2';
    }

    const combinedClassName = [baseStyles, variantStyles, sizeStyles, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
