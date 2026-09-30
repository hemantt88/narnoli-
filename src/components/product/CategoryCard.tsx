import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CategoryCardProps {
  category: Category;
  onSelect: (categorySlug: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(category.slug)}
      className="group relative overflow-hidden bg-[#FAF7F2] border border-[#E8DFC8]/70 rounded-[20px] cursor-pointer transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 flex flex-col justify-between"
    >
      {/* Category Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE4D8]">
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-opacity duration-300" />
        
        {/* Count Badge on image */}
        <div className="absolute top-3.5 right-3.5 text-[10px] tracking-[0.2em] uppercase font-medium text-[#FAF7F2] bg-[#1C1917]/75 backdrop-blur-xs px-3 py-1 rounded-[8px] border border-white/20 shadow-xs">
          {category.featuredCount}
        </div>

        {/* Floating Title on bottom of image */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#EADBBF] block mb-1">
            {category.tagline}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium drop-shadow-xs">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Description & Action */}
      <div className="p-5 flex items-center justify-between bg-[#FAF7F2]">
        <p className="text-xs text-[#6E6458] line-clamp-2 max-w-xs pr-3 font-normal leading-relaxed">
          {category.description}
        </p>
        <span className="w-9 h-9 rounded-full border border-[#D5C7B4] flex items-center justify-center text-[#5E5244] group-hover:bg-[#1C1917] group-hover:text-[#FAF7F2] group-hover:border-[#1C1917] transition-all duration-300 shrink-0 shadow-2xs">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </div>
    </div>
  );
};
