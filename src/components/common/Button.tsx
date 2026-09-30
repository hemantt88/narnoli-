import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-wider uppercase text-xs rounded-xl transition-all duration-300 ease-out select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6854F]/50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 shadow-xs hover:shadow-sm active:translate-y-px';

  const sizeStyles = {
    sm: 'py-2.5 px-4 text-[11px] tracking-widest rounded-[10px]',
    md: 'py-3 px-6 text-xs tracking-[0.15em] rounded-xl',
    lg: 'py-4 px-8 text-xs tracking-[0.2em] rounded-[14px]',
  };

  const variantStyles = {
    primary:
      'bg-[#1C1917] text-[#FAF7F2] hover:bg-[#2F2925] active:bg-[#141210] border border-[#1C1917]/80 hover:shadow-md',
    secondary:
      'bg-[#F5EFE6] text-[#24211D] hover:bg-[#EAE3D6] border border-[#D5C7B4]/80 hover:border-[#C4A777]',
    outline:
      'bg-transparent text-[#24211D] border border-[#BFA888] hover:border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2]',
    ghost:
      'bg-transparent text-[#24211D] hover:text-[#A6854F] border-b border-transparent hover:border-[#A6854F] rounded-none px-0 py-1 shadow-none hover:shadow-none',
    gold:
      'bg-[#C4A777] text-[#1C1917] hover:bg-[#B3935E] border border-[#B3935E]/80 hover:shadow-md',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="ml-2 inline-flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};
