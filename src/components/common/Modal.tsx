import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Surface */}
      <div
        className={`relative z-10 w-full ${maxWidthClasses[maxWidth]} bg-[#FAF7F2] border border-[#E5DDD0]/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] rounded-[22px] p-6 sm:p-8 my-8 text-[#24211D] transition-all transform duration-300`}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 text-[#7A6E60] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#F3EDE2] cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {(title || subtitle) && (
          <div className="mb-6 pr-8">
            {subtitle && (
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#9E896F] uppercase block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="font-serif text-2xl text-[#1C1917] tracking-tight">
                {title}
              </h3>
            )}
            <div className="mt-2 w-8 h-px bg-[#C4A777]" />
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};
