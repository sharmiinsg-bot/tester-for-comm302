import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  selectedRegion,
  onSelectRegion
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const regions = [
    { id: 'all', label: 'Markets, everywhere' },
    { id: 'americas', label: 'Americas' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia', label: 'Asia-Pacific' }
  ];

  const currentLabel = regions.find(r => r.id === selectedRegion)?.label || 'Markets, everywhere';

  return (
    <section className="px-4 pt-5 pb-3 relative" data-purpose="page-title-dropdown">
      <div className="relative inline-block">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-left group active:opacity-75 focus:outline-none"
          aria-expanded={isOpen}
        >
          <h1 className={`text-[27px] font-extrabold tracking-tight leading-tight transition-colors ${
            darkMode ? 'text-white' : 'text-[#131722]'
          }`}>
            {currentLabel}
          </h1>
          <ChevronDown 
            className={`w-5 h-5 mt-1 transition-transform ${
              isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            } ${darkMode ? 'text-white' : 'text-[#131722]'}`} 
            strokeWidth={2.6} 
          />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <div className={`absolute left-0 mt-2 w-56 rounded-xl shadow-xl border z-50 py-1.5 overflow-hidden transition-all ${
              darkMode 
                ? 'bg-[#1E222D] border-[#2A2E39] text-white' 
                : 'bg-white border-[#E0E3EB] text-[#131722]'
            }`}>
              <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-gray-400">
                Select Region
              </div>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    onSelectRegion(reg.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm font-medium flex items-center justify-between transition-colors ${
                    selectedRegion === reg.id
                      ? darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : darkMode ? 'hover:bg-[#2A2E39]' : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{reg.label}</span>
                  {selectedRegion === reg.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
