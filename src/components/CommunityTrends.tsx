import React from 'react';
import { COMMUNITY_TRENDS } from '../data/marketData';

interface CommunityTrendsProps {
  darkMode: boolean;
  onSelectTrend: (symbol: string) => void;
}

export const CommunityTrends: React.FC<CommunityTrendsProps> = ({
  darkMode,
  onSelectTrend
}) => {
  return (
    <section className="px-4 mb-7" data-purpose="community-trends">
      <div className="mb-3">
        <h3 className={`text-[17px] font-bold tracking-tight ${
          darkMode ? 'text-white' : 'text-[#131722]'
        }`}>
          Community trends
        </h3>
      </div>

      {/* Horizontally Scrollable Pills */}
      <div className="flex overflow-x-auto no-scrollbar smooth-scroll space-x-2 pb-1">
        {COMMUNITY_TRENDS.map((item) => (
          <button
            key={item.symbol}
            onClick={() => onSelectTrend(item.symbol)}
            className={`flex items-center space-x-2 px-3 py-1.5 border rounded-lg flex-shrink-0 active:scale-95 transition cursor-pointer ${
              darkMode 
                ? 'bg-[#1E222D]/60 border-[#2A2E39] hover:bg-[#2A2E39]' 
                : 'bg-gray-50/70 border-[#E0E3EB] hover:bg-gray-100'
            }`}
          >
            <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
              {item.symbol}
            </span>
            <span className={`text-xs font-semibold ${
              item.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
            }`}>
              {item.change}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
