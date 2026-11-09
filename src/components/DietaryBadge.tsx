import React from 'react';
import { DietaryType } from '../types';

interface DietaryBadgeProps {
  type: DietaryType;
  className?: string;
  showText?: boolean;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({ type, className = '', showText = false }) => {
  const isVeg = type === 'veg';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div
        className={`w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 border ${
          isVeg
            ? 'border-[#1E7E34] bg-[#1E7E34]/10'
            : 'border-[#B71C1C] bg-[#B71C1C]/10'
        }`}
        aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isVeg ? 'bg-[#1E7E34]' : 'bg-[#B71C1C]'
          }`}
        />
      </div>
      {showText && (
        <span
          className={`text-[11px] font-bold uppercase tracking-wider ${
            isVeg ? 'text-[#1E7E34]' : 'text-[#B71C1C]'
          }`}
        >
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};

