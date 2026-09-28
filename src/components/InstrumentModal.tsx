import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Star, Bell, ExternalLink, BarChart2 } from 'lucide-react';
import { Instrument } from '../types/market';

interface InstrumentModalProps {
  instrument: Instrument | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSupercharts: (symbol: string) => void;
  darkMode: boolean;
}

export const InstrumentModal: React.FC<InstrumentModalProps> = ({
  instrument,
  isOpen,
  onClose,
  onOpenSupercharts,
  darkMode
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '3M' | '1Y' | 'ALL'>('1D');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!isOpen || !instrument) return null;

  const isPositive = instrument.isPositive;
  const strokeColor = isPositive ? '#089981' : '#F23645';

  // Generate simulated chart points for the selected timeframe
  const pointsCount = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : 40;
  const simulatedPoints: number[] = [];
  let base = instrument.price * 0.96;
  for (let i = 0; i < pointsCount; i++) {
    const trend = isPositive ? (i / pointsCount) * (instrument.price * 0.08) : -(i / pointsCount) * (instrument.price * 0.08);
    const noise = (Math.sin(i * 0.8) + Math.cos(i * 0.5)) * (instrument.price * 0.015);
    simulatedPoints.push(base + trend + noise);
  }
  simulatedPoints[simulatedPoints.length - 1] = instrument.price;

  const minVal = Math.min(...simulatedPoints);
  const maxVal = Math.max(...simulatedPoints);
  const range = maxVal - minVal || 1;

  const svgWidth = 340;
  const svgHeight = 140;
  const step = svgWidth / (simulatedPoints.length - 1);

  let pathD = `M 0,${svgHeight - ((simulatedPoints[0] - minVal) / range) * (svgHeight - 20) - 10}`;
  for (let i = 1; i < simulatedPoints.length; i++) {
    const prevX = (i - 1) * step;
    const prevY = svgHeight - ((simulatedPoints[i - 1] - minVal) / range) * (svgHeight - 20) - 10;
    const currX = i * step;
    const currY = svgHeight - ((simulatedPoints[i] - minVal) / range) * (svgHeight - 20) - 10;
    const cpX1 = prevX + step * 0.45;
    const cpX2 = currX - step * 0.45;
    pathD += ` C ${cpX1},${prevY} ${cpX2},${currY} ${currX},${currY}`;
  }

  const fillD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  const hoveredPrice = hoverIndex !== null ? simulatedPoints[hoverIndex] : instrument.price;

  // 52-week position calculation
  const low52 = instrument.low52 || instrument.price * 0.75;
  const high52 = instrument.high52 || instrument.price * 1.15;
  const range52 = high52 - low52;
  const positionPercent = Math.min(Math.max(((instrument.price - low52) / range52) * 100, 0), 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Sheet */}
      <div className={`relative w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl z-50 p-5 transition-all ${
        darkMode ? 'bg-[#1E222D] text-white border border-[#2A2E39]' : 'bg-white text-[#131722]'
      }`}>
        {/* Top Handle on Mobile */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header Bar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span 
              className="w-10 h-10 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-sm"
              style={{ backgroundColor: instrument.badgeBg || '#131722', color: instrument.badgeTextColor || '#FFF' }}
            >
              {instrument.badgeText || instrument.symbol.slice(0, 3)}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold tracking-tight">{instrument.symbol}</h2>
                <span className="text-xs text-gray-500 font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  {instrument.exchange || 'INDEX'}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-normal truncate max-w-[220px]">
                {instrument.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={`p-2 rounded-full transition ${
                isWatchlisted 
                  ? 'text-yellow-400 bg-yellow-400/10' 
                  : darkMode ? 'text-gray-400 hover:bg-[#2A2E39]' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Add to Watchlist"
            >
              <Star className="w-5 h-5" fill={isWatchlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition ${
                darkMode ? 'text-gray-400 hover:bg-[#2A2E39]' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Price & Change */}
        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-black tracking-tight tabular-nums">
              ${hoveredPrice >= 1000 ? hoveredPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : hoveredPrice.toFixed(2)}
              <span className="text-xs font-normal text-gray-400 ml-1.5">{instrument.currency}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-sm font-semibold mt-1" style={{ color: strokeColor }}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? `+${instrument.change.toFixed(2)}` : instrument.change.toFixed(2)}</span>
              <span>({isPositive ? `+${instrument.changePercent.toFixed(2)}` : instrument.changePercent.toFixed(2)}%)</span>
              <span className="text-xs text-gray-400 font-normal">Today</span>
            </div>
          </div>

          {instrument.technicalSentiment && (
            <div className="text-right">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400 block">
                Technical
              </span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                instrument.technicalSentiment.includes('Buy')
                  ? 'bg-emerald-500/20 text-[#089981]'
                  : instrument.technicalSentiment.includes('Sell')
                  ? 'bg-rose-500/20 text-[#F23645]'
                  : 'bg-yellow-500/20 text-yellow-600'
              }`}>
                {instrument.technicalSentiment}
              </span>
            </div>
          )}
        </div>

        {/* Timeframe Buttons */}
        <div className="flex items-center space-x-1 mt-4 p-1 rounded-xl bg-gray-100 dark:bg-[#131722]/80">
          {(['1D', '5D', '1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                timeframe === tf
                  ? darkMode ? 'bg-[#2A2E39] text-white shadow-sm' : 'bg-white text-[#131722] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Interactive SVG Chart */}
        <div 
          className="mt-3 relative w-full h-[150px] bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 rounded-xl overflow-hidden cursor-crosshair"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const idx = Math.floor((x / rect.width) * simulatedPoints.length);
            setHoverIndex(Math.min(idx, simulatedPoints.length - 1));
          }}
          onMouseLeave={() => setHoverIndex(null)}
          onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
            const idx = Math.floor((x / rect.width) * simulatedPoints.length);
            setHoverIndex(Math.min(idx, simulatedPoints.length - 1));
          }}
          onTouchEnd={() => setHoverIndex(null)}
        >
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            <defs>
              <linearGradient id="modal-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <path d={fillD} fill="url(#modal-grad)" />
            <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Crosshair indicator */}
            {hoverIndex !== null && (
              <line
                x1={hoverIndex * step}
                y1={0}
                x2={hoverIndex * step}
                y2={svgHeight}
                stroke={darkMode ? '#FFFFFF' : '#131722'}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            )}
          </svg>
        </div>

        {/* 52-Week Range Bar */}
        <div className="mt-5 p-3 rounded-xl border border-gray-100 dark:border-[#2A2E39] bg-gray-50/50 dark:bg-[#131722]/40">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
            <span>52W Low: ${low52.toFixed(2)}</span>
            <span className="font-bold text-[#131722] dark:text-white">Current Range</span>
            <span>52W High: ${high52.toFixed(2)}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${positionPercent}%` }}
            />
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 text-left">
          <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#2A2E39] bg-gray-50/40 dark:bg-[#131722]/40">
            <span className="text-[11px] text-gray-400 uppercase font-semibold block">Market Cap</span>
            <span className="text-sm font-bold">{instrument.marketCap || '$3.4T'}</span>
          </div>
          <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#2A2E39] bg-gray-50/40 dark:bg-[#131722]/40">
            <span className="text-[11px] text-gray-400 uppercase font-semibold block">P/E Ratio</span>
            <span className="text-sm font-bold">{instrument.peRatio || '32.4'}</span>
          </div>
          <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#2A2E39] bg-gray-50/40 dark:bg-[#131722]/40">
            <span className="text-[11px] text-gray-400 uppercase font-semibold block">Div Yield</span>
            <span className="text-sm font-bold">{instrument.divYield || '0.55%'}</span>
          </div>
        </div>

        {/* Description snippet */}
        {instrument.description && (
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {instrument.description}
          </p>
        )}

        {/* Bottom CTAs */}
        <div className="mt-5 flex items-center space-x-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenSupercharts(instrument.symbol);
            }}
            className="flex-1 tv-btn-gradient text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Open in Supercharts</span>
          </button>
        </div>
      </div>
    </div>
  );
};
