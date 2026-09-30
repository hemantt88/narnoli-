import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const alignmentClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClasses[align]} ${className}`}>
      {kicker && (
        <span className="text-[11px] font-medium tracking-[0.25em] text-[#9E896F] uppercase mb-2">
          {kicker}
        </span>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] tracking-normal leading-tight [text-wrap:balance]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-[#6E6458] leading-relaxed max-w-xl font-normal">
          {description}
        </p>
      )}
      <div className={`mt-4 w-12 h-px bg-[#C4A777]/80 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
};
