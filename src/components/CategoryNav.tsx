import React from 'react';
import { MarketCategory } from '../types/market';

interface CategoryNavProps {
  darkMode: boolean;
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  darkMode,
  selectedCategory,
  onSelectCategory
}) => {
  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'indices', label: 'Indices' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Government bonds' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'us_stocks', label: 'US stocks' },
    { id: 'world_stocks', label: 'World stocks' },
    { id: 'etfs', label: 'ETFs' },
  ];

  return (
    <nav aria-label="Market Categories" className="px-4 mb-5" data-purpose="category-tabs">
      <div className={`border rounded-full p-1 flex items-center overflow-x-auto no-scrollbar smooth-scroll space-x-1 shadow-sm transition-colors ${
        darkMode 
          ? 'bg-[#1E222D] border-[#2A2E39]' 
          : 'bg-white border-[#E0E3EB]'
      }`}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? darkMode 
                    ? 'bg-white text-[#131722] shadow-sm' 
                    : 'bg-[#131722] text-white shadow-sm'
                  : darkMode
                    ? 'text-[#D1D4DC] hover:bg-[#2A2E39] font-medium'
                    : 'text-[#131722] hover:bg-gray-100 font-medium'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
