import React, { useState } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Instrument } from '../types/market';
import { 
  US_INDICES, 
  WORLD_INDICES, 
  US_STOCKS, 
  FUTURES_DATA, 
  FOREX_DATA, 
  BONDS_DATA, 
  CRYPTO_DATA 
} from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstrument: (instrument: Instrument) => void;
  darkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectInstrument,
  darkMode
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices'>('all');

  if (!isOpen) return null;

  const allInstruments: Instrument[] = [
    ...US_INDICES,
    ...WORLD_INDICES,
    ...US_STOCKS,
    ...FUTURES_DATA,
    ...FOREX_DATA,
    ...BONDS_DATA,
    ...CRYPTO_DATA
  ];

  const filtered = allInstruments.filter(inst => {
    const matchesQuery = 
      inst.symbol.toLowerCase().includes(query.toLowerCase()) ||
      inst.name.toLowerCase().includes(query.toLowerCase()) ||
      (inst.exchange && inst.exchange.toLowerCase().includes(query.toLowerCase()));

    if (!matchesQuery) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'stocks' && inst.category === 'us_stocks') return true;
    if (activeTab === 'crypto' && inst.category === 'crypto') return true;
    if (activeTab === 'forex' && inst.category === 'forex') return true;
    if (activeTab === 'indices' && (inst.category === 'indices' || inst.category === 'world_stocks')) return true;
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Search Container */}
      <div className={`relative w-full max-w-xl rounded-2xl shadow-2xl z-50 overflow-hidden mt-6 sm:mt-12 border transition-all ${
        darkMode ? 'bg-[#1E222D] text-white border-[#2A2E39]' : 'bg-white text-[#131722] border-[#E0E3EB]'
      }`}>
        {/* Input Bar */}
        <div className="p-3.5 border-b border-gray-100 dark:border-[#2A2E39] flex items-center space-x-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search markets, symbols, companies (e.g. NVDA, BTC, S&P 500)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className={`w-full bg-transparent text-sm sm:text-base font-medium focus:outline-none placeholder-gray-400 ${
              darkMode ? 'text-white' : 'text-[#131722]'
            }`}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 px-3 py-2 border-b border-gray-100 dark:border-[#2A2E39] overflow-x-auto no-scrollbar">
          {(['all', 'stocks', 'crypto', 'forex', 'indices'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : darkMode ? 'text-gray-400 hover:bg-[#2A2E39]' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto no-scrollbar divide-y divide-gray-100 dark:divide-[#2A2E39]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">
              No matching symbols found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((inst) => {
              const isPositive = inst.isPositive;
              return (
                <div
                  key={inst.id}
                  onClick={() => {
                    onSelectInstrument(inst);
                    onClose();
                  }}
                  className={`p-3 sm:px-4 flex items-center justify-between cursor-pointer transition ${
                    darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span 
                      className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: inst.badgeBg || '#131722', color: inst.badgeTextColor || '#FFF' }}
                    >
                      {inst.badgeText || inst.symbol.slice(0, 3)}
                    </span>
                    <div>
                      <div className="font-bold text-sm leading-tight flex items-center space-x-1.5">
                        <span>{inst.symbol}</span>
                        <span className="text-[10px] text-gray-400 font-normal px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800">
                          {inst.exchange || 'INDEX'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[200px]">
                        {inst.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm">
                      {inst.price >= 1000 ? inst.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : inst.price.toFixed(2)}
                    </div>
                    <div className={`text-xs font-semibold flex items-center justify-end space-x-0.5 ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPositive ? `+${inst.changePercent.toFixed(2)}%` : `${inst.changePercent.toFixed(2)}%`}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
