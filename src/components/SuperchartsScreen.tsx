import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Layers, BarChart2, Maximize2, Settings, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { generateCandleData } from '../data/marketData';

interface SuperchartsScreenProps {
  initialSymbol?: string;
  darkMode: boolean;
}

export const SuperchartsScreen: React.FC<SuperchartsScreenProps> = ({
  initialSymbol = 'NVDA',
  darkMode
}) => {
  const symbols = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 141.54, change: 3.92, changePercent: 2.85 },
    { symbol: 'AAPL', name: 'Apple Inc', price: 232.15, change: 1.48, changePercent: 0.64 },
    { symbol: 'SPX', name: 'S&P 500 Index', price: 5864.67, change: 26.12, changePercent: 0.45 },
    { symbol: 'BTCUSD', name: 'Bitcoin', price: 65840.00, change: 1540.00, changePercent: 2.40 },
    { symbol: 'EURUSD', name: 'Euro / USD', price: 1.1165, change: 0.0028, changePercent: 0.25 }
  ];

  const [currentSymbol, setCurrentSymbol] = useState(initialSymbol);
  const [chartType, setChartType] = useState<'candles' | 'area'>('candles');
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '1D' | '1W'>('1D');
  const [showMA20, setShowMA20] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeInstrument = symbols.find(s => s.symbol === currentSymbol) || symbols[0];

  // Generate candlesticks
  const candleData = useMemo(() => {
    return generateCandleData(activeInstrument.price, 36);
  }, [activeInstrument.symbol, activeInstrument.price, timeframe]);

  // Chart coordinates calculation
  const chartWidth = 380;
  const chartHeight = 220;
  const volumeHeight = 50;

  const minPrice = Math.min(...candleData.map(c => c.low));
  const maxPrice = Math.max(...candleData.map(c => c.high));
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candleData.map(c => c.volume));

  const candleSpacing = chartWidth / candleData.length;
  const candleWidth = Math.max(candleSpacing * 0.65, 3);

  // Calculate 20-period Simple Moving Average
  const ma20Points = useMemo(() => {
    const ma: { x: number; y: number }[] = [];
    const period = 7;
    for (let i = 0; i < candleData.length; i++) {
      if (i >= period - 1) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
          sum += candleData[i - j].close;
        }
        const avg = sum / period;
        const x = i * candleSpacing + candleSpacing / 2;
        const y = chartHeight - ((avg - minPrice) / priceRange) * (chartHeight - 30) - 20;
        ma.push({ x, y });
      }
    }
    return ma;
  }, [candleData, minPrice, priceRange, candleSpacing]);

  let maPath = '';
  if (ma20Points.length > 0) {
    maPath = `M ${ma20Points[0].x},${ma20Points[0].y}`;
    for (let i = 1; i < ma20Points.length; i++) {
      maPath += ` L ${ma20Points[i].x},${ma20Points[i].y}`;
    }
  }

  // Active hover candle info
  const activeCandle = hoverIndex !== null ? candleData[hoverIndex] : candleData[candleData.length - 1];

  return (
    <div className={`pb-24 transition-colors ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
      {/* Symbol Switcher Pill Bar */}
      <div className={`px-4 py-2 border-b flex items-center space-x-2 overflow-x-auto no-scrollbar ${
        darkMode ? 'border-[#2A2E39] bg-[#1E222D]' : 'border-[#E0E3EB] bg-gray-50'
      }`}>
        {symbols.map(s => (
          <button
            key={s.symbol}
            onClick={() => setCurrentSymbol(s.symbol)}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
              currentSymbol === s.symbol
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode ? 'text-gray-400 hover:bg-[#2A2E39]' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.symbol}
          </button>
        ))}
      </div>

      {/* Symbol Details Bar */}
      <div className="px-4 pt-3 pb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black tracking-tight">{activeInstrument.symbol}</h2>
            <span className="text-xs text-gray-500 font-semibold">{activeInstrument.name}</span>
          </div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-black tracking-tight tabular-nums">
              ${activeCandle ? activeCandle.close.toFixed(2) : activeInstrument.price.toFixed(2)}
            </span>
            <div className="flex items-center space-x-1 text-xs font-bold text-[#089981]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{activeInstrument.change.toFixed(2)}</span>
              <span>(+{activeInstrument.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>

        {/* Chart Style Switcher */}
        <div className="flex items-center space-x-1.5 p-1 rounded-lg border border-gray-200 dark:border-[#2A2E39]">
          <button
            onClick={() => setChartType('candles')}
            className={`px-2 py-1 text-[11px] font-bold rounded ${
              chartType === 'candles' ? 'bg-blue-600 text-white' : 'text-gray-400'
            }`}
          >
            Candles
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-2 py-1 text-[11px] font-bold rounded ${
              chartType === 'area' ? 'bg-blue-600 text-white' : 'text-gray-400'
            }`}
          >
            Line
          </button>
        </div>
      </div>

      {/* OHLC Tooltip Header */}
      {activeCandle && (
        <div className="px-4 py-1 text-[11px] font-mono text-gray-400 flex items-center space-x-3 overflow-x-auto no-scrollbar">
          <span>Date: <strong className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{activeCandle.time}</strong></span>
          <span>O: <strong className={darkMode ? 'text-gray-200' : 'text-gray-700'}>${activeCandle.open.toFixed(2)}</strong></span>
          <span>H: <strong className="text-[#089981]">${activeCandle.high.toFixed(2)}</strong></span>
          <span>L: <strong className="text-[#F23645]">${activeCandle.low.toFixed(2)}</strong></span>
          <span>C: <strong className={darkMode ? 'text-gray-200' : 'text-gray-700'}>${activeCandle.close.toFixed(2)}</strong></span>
        </div>
      )}

      {/* Interactive Candlestick Canvas */}
      <div className="px-2 pt-2">
        <div 
          className={`relative border rounded-2xl overflow-hidden cursor-crosshair ${
            darkMode ? 'bg-[#131722] border-[#2A2E39]' : 'bg-[#FAFCFF] border-[#E0E3EB]'
          }`}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const idx = Math.floor((x / rect.width) * candleData.length);
            setHoverIndex(Math.min(idx, candleData.length - 1));
          }}
          onMouseLeave={() => setHoverIndex(null)}
          onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
            const idx = Math.floor((x / rect.width) * candleData.length);
            setHoverIndex(Math.min(idx, candleData.length - 1));
          }}
          onTouchEnd={() => setHoverIndex(null)}
        >
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-20">
            <div className="border-b border-gray-400"></div>
            <div className="border-b border-gray-400"></div>
            <div className="border-b border-gray-400"></div>
            <div className="border-b border-gray-400"></div>
          </div>

          <svg className="w-full h-[280px]" preserveAspectRatio="none" viewBox={`0 0 ${chartWidth} ${chartHeight + volumeHeight}`}>
            {/* Candle Bars or Area Chart */}
            {chartType === 'candles' ? (
              candleData.map((c, i) => {
                const isBullish = c.close >= c.open;
                const candleColor = isBullish ? '#089981' : '#F23645';

                const x = i * candleSpacing + candleSpacing / 2;
                const highY = chartHeight - ((c.high - minPrice) / priceRange) * (chartHeight - 30) - 20;
                const lowY = chartHeight - ((c.low - minPrice) / priceRange) * (chartHeight - 30) - 20;
                const openY = chartHeight - ((c.open - minPrice) / priceRange) * (chartHeight - 30) - 20;
                const closeY = chartHeight - ((c.close - minPrice) / priceRange) * (chartHeight - 30) - 20;

                const bodyY = Math.min(openY, closeY);
                const bodyHeight = Math.max(Math.abs(openY - closeY), 2);

                return (
                  <g key={i}>
                    {/* Wick */}
                    <line
                      x1={x}
                      y1={highY}
                      x2={x}
                      y2={lowY}
                      stroke={candleColor}
                      strokeWidth="1.5"
                    />
                    {/* Body */}
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={candleColor}
                      rx="1"
                    />
                  </g>
                );
              })
            ) : (
              // Area Chart
              <g>
                <defs>
                  <linearGradient id="area-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#2962FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2962FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <path
                  d={`M ${candleSpacing / 2},${chartHeight - ((candleData[0].close - minPrice) / priceRange) * (chartHeight - 30) - 20} ` +
                    candleData.map((c, i) => `L ${i * candleSpacing + candleSpacing / 2},${chartHeight - ((c.close - minPrice) / priceRange) * (chartHeight - 30) - 20}`).join(' ') +
                    ` L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
                  fill="url(#area-grad)"
                />
                <path
                  d={`M ${candleSpacing / 2},${chartHeight - ((candleData[0].close - minPrice) / priceRange) * (chartHeight - 30) - 20} ` +
                    candleData.map((c, i) => `L ${i * candleSpacing + candleSpacing / 2},${chartHeight - ((c.close - minPrice) / priceRange) * (chartHeight - 30) - 20}`).join(' ')}
                  fill="none"
                  stroke="#2962FF"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* Moving Average Line Overlay */}
            {showMA20 && maPath && (
              <path
                d={maPath}
                fill="none"
                stroke="#FF9800"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}

            {/* Volume Histogram Bars */}
            {showVolume && candleData.map((c, i) => {
              const isBullish = c.close >= c.open;
              const barHeight = (c.volume / maxVolume) * (volumeHeight - 10);
              const x = i * candleSpacing + (candleSpacing - candleWidth) / 2;
              const y = chartHeight + volumeHeight - barHeight;

              return (
                <rect
                  key={`vol-${i}`}
                  x={x}
                  y={y}
                  width={candleWidth}
                  height={barHeight}
                  fill={isBullish ? '#089981' : '#F23645'}
                  opacity={0.35}
                />
              );
            })}

            {/* Interactive Crosshair */}
            {hoverIndex !== null && (
              <>
                <line
                  x1={hoverIndex * candleSpacing + candleSpacing / 2}
                  y1={0}
                  x2={hoverIndex * candleSpacing + candleSpacing / 2}
                  y2={chartHeight + volumeHeight}
                  stroke={darkMode ? '#FFFFFF' : '#131722'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Chart Indicators & Controls */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Timeframes */}
        <div className="flex items-center space-x-1">
          {(['1m', '5m', '15m', '1h', '1D', '1W'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 text-xs font-bold rounded transition ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMA20(!showMA20)}
            className={`text-xs font-bold px-2 py-1 rounded transition border ${
              showMA20 
                ? 'bg-amber-500/15 border-amber-500 text-amber-500' 
                : 'border-gray-200 dark:border-gray-700 text-gray-400'
            }`}
          >
            MA 20
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`text-xs font-bold px-2 py-1 rounded transition border ${
              showVolume 
                ? 'bg-blue-500/15 border-blue-500 text-blue-500' 
                : 'border-gray-200 dark:border-gray-700 text-gray-400'
            }`}
          >
            VOL
          </button>
        </div>
      </div>

      {/* Trading Order Simulator Bar */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-3">
        <button className="bg-[#F23645] hover:bg-[#d62635] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between shadow-md cursor-pointer transition">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">Sell / Short</span>
            <span className="text-base font-extrabold tabular-nums">${(activeInstrument.price * 0.999).toFixed(2)}</span>
          </div>
          <ArrowDownRight className="w-5 h-5" />
        </button>

        <button className="bg-[#089981] hover:bg-[#077f6b] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between shadow-md cursor-pointer transition">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">Buy / Long</span>
            <span className="text-base font-extrabold tabular-nums">${(activeInstrument.price * 1.001).toFixed(2)}</span>
          </div>
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
