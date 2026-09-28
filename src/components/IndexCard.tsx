import React from 'react';
import { Instrument } from '../types/market';

interface IndexCardProps {
  instrument: Instrument;
  darkMode: boolean;
  onSelect: (instrument: Instrument) => void;
  showSubtitle?: boolean;
}

export const IndexCard: React.FC<IndexCardProps> = ({
  instrument,
  darkMode,
  onSelect,
  showSubtitle = false
}) => {
  const isPositive = instrument.isPositive;
  const greenColor = '#089981';
  const redColor = '#F23645';
  const strokeColor = isPositive ? greenColor : redColor;

  // Convert sparklinePoints to SVG path
  const width = 160;
  const height = 40;
  const points = instrument.sparklinePoints;
  const step = width / (points.length - 1);
  
  // Build smooth bezier path
  let pathD = `M 0,${points[0]}`;
  for (let i = 1; i < points.length; i++) {
    const prevX = (i - 1) * step;
    const prevY = points[i - 1];
    const currX = i * step;
    const currY = points[i];
    const cpX1 = prevX + step * 0.45;
    const cpY1 = prevY;
    const cpX2 = currX - step * 0.45;
    const cpY2 = currY;
    pathD += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${currX},${currY}`;
  }
  
  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;
  const gradId = `grad-${instrument.id}-${darkMode ? 'dark' : 'light'}`;

  // Render Icon according to iconType
  const renderIcon = () => {
    if (instrument.iconType === 'nvidia') {
      return (
        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center p-1 flex-shrink-0">
          <svg className="w-full h-full fill-[#76B900]" viewBox="0 0 100 100">
            <path d="M78 49.5c0-10.4-7.5-19.1-17.5-20.8v-8.2C76 22.3 88 34.5 88 49.5s-12 27.2-27.5 29v-8.2c10-1.7 17.5-10.4 17.5-20.8z" />
            <path d="M52 30.5c-9.5 1.5-16.5 9.7-16.5 19.5s7 18 16.5 19.5V80C36 78.3 23 65.4 23 49.5S36 20.7 52 19v11.5z" />
            <circle cx="52" cy="50" r="7" />
          </svg>
        </div>
      );
    }

    if (instrument.iconType === 'apple') {
      return (
        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center p-1.5 text-white flex-shrink-0">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.79-11.72-14.24-6.3-9.97-11.16-20.9-14.58-32.8C7.62 99.4 5.9 87.72 5.9 77.83c0-14.2 3.65-26.06 10.96-35.58 7.3-9.53 16.3-14.38 27-14.56 5.48 0 11.16 1.48 17.06 4.45 5.9 2.97 9.87 4.51 11.91 4.62 1.54-.11 5.76-1.74 12.67-4.9 6.9-3.15 12.98-4.58 18.23-4.28 14.07.65 25.1 5.94 33.1 15.86-12.44 7.55-18.52 17.84-18.24 30.87.27 10.22 4.17 18.72 11.7 25.49 3.51 3.2 7.5 5.65 11.96 7.36-2.58 7.58-5.87 15.28-9.88 23.09zM119.22 33.11c0-7.72 2.76-14.95 8.28-21.68 5.53-6.73 12.28-10.87 20.26-12.43.23 1.1.34 2.15.34 3.16 0 7.6-2.88 14.88-8.63 21.84-5.76 6.96-12.89 11.1-21.4 12.43-.22-1.12-.34-2.22-.34-3.32z" />
          </svg>
        </div>
      );
    }

    if (instrument.iconType === 'amazon') {
      return (
        <div className="w-7 h-7 rounded-full bg-[#FF9900] flex items-center justify-center font-black text-black text-xs flex-shrink-0">
          a
        </div>
      );
    }

    return (
      <span 
        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center tracking-tighter flex-shrink-0"
        style={{ backgroundColor: instrument.badgeBg || '#131722', color: instrument.badgeTextColor || '#FFFFFF' }}
      >
        {instrument.badgeText || instrument.symbol.slice(0, 3)}
      </span>
    );
  };

  return (
    <article
      onClick={() => onSelect(instrument)}
      className={`flex-shrink-0 w-[240px] sm:w-[260px] border rounded-2xl p-4 snap-start transition duration-150 flex flex-col justify-between h-[184px] cursor-pointer group active:scale-[0.99] ${
        darkMode
          ? 'bg-[#1E222D] border-[#2A2E39] hover:border-gray-600 hover:shadow-lg'
          : 'bg-white border-[#E0E3EB] hover:shadow-md hover:border-gray-300'
      }`}
    >
      <div>
        {/* Symbol Header */}
        <div className="flex items-start space-x-2.5">
          {renderIcon()}
          <div className="leading-tight truncate">
            <span className={`font-bold text-[15px] sm:text-[16px] tracking-tight block truncate ${
              darkMode ? 'text-white' : 'text-[#131722]'
            }`}>
              {instrument.symbol}
            </span>
            {showSubtitle && (
              <span className="text-xs text-gray-500 font-normal block truncate">
                {instrument.name}
              </span>
            )}
            {!showSubtitle && instrument.exchange && instrument.category === 'us_stocks' && (
              <span className="text-xs text-gray-500 font-normal block truncate">
                {instrument.exchange}
              </span>
            )}
          </div>
        </div>

        {/* Price & Performance Metrics */}
        <div className="mt-2.5">
          <div className={`text-[20px] font-extrabold tracking-tight leading-none ${
            darkMode ? 'text-white' : 'text-[#131722]'
          }`}>
            {instrument.price >= 1000 ? instrument.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : instrument.price.toFixed(2)}
            {instrument.currency === 'USD' && (instrument.category === 'us_stocks' || instrument.category === 'crypto') && (
              <span className="text-xs font-normal text-gray-400 ml-1">USD</span>
            )}
          </div>
          <div className="flex items-center space-x-1.5 mt-1 text-[13px] font-semibold" style={{ color: strokeColor }}>
            <span>{isPositive ? `+${instrument.change.toFixed(2)}` : instrument.change.toFixed(2)}</span>
            <span>({isPositive ? `+${instrument.changePercent.toFixed(2)}` : instrument.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      {/* Sparkline Chart */}
      <div className="h-10 w-full overflow-hidden mt-1 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={gradId} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <path d={fillD} fill={`url(#${gradId})`} />
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </article>
  );
};
