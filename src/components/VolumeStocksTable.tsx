import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Instrument } from '../types/market';
import { HIGHEST_VOLUME_STOCKS } from '../data/marketData';

interface VolumeStocksTableProps {
  darkMode: boolean;
  onSelectInstrument: (instrument: Instrument) => void;
  onViewAllActives?: () => void;
}

export const VolumeStocksTable: React.FC<VolumeStocksTableProps> = ({
  darkMode,
  onSelectInstrument,
  onViewAllActives
}) => {
  const [expanded, setExpanded] = useState(false);

  // Show top 3 initially matching screenshot, or all if expanded
  const displayStocks = expanded ? HIGHEST_VOLUME_STOCKS : HIGHEST_VOLUME_STOCKS.slice(0, 3);

  return (
    <section className="px-4 mb-8" data-purpose="market-movers-list">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            if (onViewAllActives) onViewAllActives();
            else setExpanded(!expanded);
          }}
          className="inline-flex items-center group text-left focus:outline-none"
        >
          <h3 className={`text-[17px] font-bold tracking-tight transition ${
            darkMode 
              ? 'text-white group-hover:text-blue-400' 
              : 'text-[#131722] group-hover:text-blue-600'
          }`}>
            Highest volume stocks
          </h3>
          <ChevronRight className={`w-4 h-4 ml-1 transition group-hover:translate-x-0.5 ${
            darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-[#131722] group-hover:text-blue-600'
          }`} strokeWidth={2.2} />
        </button>
      </div>

      {/* Movers List Table */}
      <div className={`border rounded-2xl overflow-hidden shadow-sm divide-y transition-colors ${
        darkMode 
          ? 'bg-[#1E222D] border-[#2A2E39] divide-[#2A2E39]' 
          : 'bg-white border-[#E0E3EB] divide-[#E0E3EB]'
      }`}>
        {displayStocks.map((stock) => {
          const isPositive = stock.isPositive;
          return (
            <div
              key={stock.id}
              onClick={() => onSelectInstrument(stock)}
              className={`p-3.5 flex items-center justify-between transition cursor-pointer active:opacity-75 ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: stock.badgeBg || (darkMode ? '#2A2E39' : '#F0F3FA'),
                    color: stock.badgeTextColor || (darkMode ? '#FFFFFF' : '#131722')
                  }}
                >
                  {stock.badgeText || stock.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className={`font-bold text-sm leading-snug ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
                    {stock.symbol}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stock.exchange} · {stock.volume}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
                  ${stock.price.toFixed(2)}
                </div>
                <span className={`inline-block text-xs font-semibold px-1.5 py-0.5 rounded mt-0.5 ${
                  isPositive 
                    ? darkMode ? 'bg-emerald-950/60 text-[#089981]' : 'bg-[#E8F5F1] text-[#089981]' 
                    : darkMode ? 'bg-rose-950/60 text-[#F23645]' : 'bg-[#FDF0F1] text-[#F23645]'
                }`}>
                  {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* See all link */}
      <div className="mt-2.5 text-right">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer focus:outline-none"
        >
          {expanded ? 'Show less ↑' : 'See all most actively traded stocks →'}
        </button>
      </div>
    </section>
  );
};
