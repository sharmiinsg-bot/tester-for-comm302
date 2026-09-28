import React, { useState } from 'react';
import { Star, Bell, DollarSign, Calendar, Sliders, Moon, Sun, ShieldCheck, ChevronRight, User, Wallet } from 'lucide-react';

interface MoreScreenProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onGetStarted: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({
  darkMode,
  onToggleTheme,
  onGetStarted,
  onSelectSymbol
}) => {
  const [paperBalance, setPaperBalance] = useState(100000);
  const [activeAlertsCount, setActiveAlertsCount] = useState(3);

  const sampleWatchlist = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 141.54, change: '+2.85%', isPositive: true },
    { symbol: 'AAPL', name: 'Apple Inc', price: 232.15, change: '+0.64%', isPositive: true },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 218.89, change: '-1.12%', isPositive: false },
    { symbol: 'BTCUSD', name: 'Bitcoin', price: 65840.00, change: '+2.40%', isPositive: true },
  ];

  return (
    <div className={`pb-24 px-4 pt-3 transition-colors ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-black tracking-tight">More &amp; Tools</h1>
        <p className="text-xs text-gray-400">Trading tools, account profile, watchlists and settings</p>
      </div>

      {/* User Profile Card */}
      <div className={`p-4 rounded-2xl border mb-5 flex items-center justify-between transition-colors ${
        darkMode ? 'bg-[#1E222D] border-[#2A2E39]' : 'bg-white border-[#E0E3EB] shadow-sm'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Guest Trader</h3>
            <p className="text-xs text-gray-400">Join to sync watchlists across all devices</p>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="tv-btn-gradient text-white text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
        >
          Sign in
        </button>
      </div>

      {/* Paper Trading Simulator Banner */}
      <div className={`p-4 rounded-2xl border mb-5 transition-colors ${
        darkMode ? 'bg-[#1E222D] border-[#2A2E39]' : 'bg-white border-[#E0E3EB] shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-xs uppercase tracking-wider text-gray-400">Paper Trading</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-[#089981]">
            Active Simulator
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <div>
            <div className="text-2xl font-black tabular-nums">${paperBalance.toLocaleString()}.00</div>
            <div className="text-xs text-[#089981] font-semibold">+$2,450.00 (+2.45%) simulated profit</div>
          </div>
          <button
            onClick={() => alert('Order simulation executed! Virtual balance updated.')}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#2A2E39] cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold flex items-center space-x-1.5">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>Default Watchlist</span>
          </h3>
          <span className="text-xs text-blue-600 font-semibold cursor-pointer">Edit</span>
        </div>

        <div className={`border rounded-2xl overflow-hidden divide-y ${
          darkMode ? 'bg-[#1E222D] border-[#2A2E39] divide-[#2A2E39]' : 'bg-white border-[#E0E3EB] divide-[#E0E3EB]'
        }`}>
          {sampleWatchlist.map(item => (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol(item.symbol)}
              className={`p-3 flex items-center justify-between cursor-pointer transition ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div>
                <span className="font-bold text-sm block">{item.symbol}</span>
                <span className="text-xs text-gray-400">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm block">${item.price >= 1000 ? item.price.toLocaleString() : item.price.toFixed(2)}</span>
                <span className={`text-xs font-semibold ${item.isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Tools List */}
      <div className={`border rounded-2xl overflow-hidden divide-y ${
        darkMode ? 'bg-[#1E222D] border-[#2A2E39] divide-[#2A2E39]' : 'bg-white border-[#E0E3EB] divide-[#E0E3EB]'
      }`}>
        <div 
          onClick={onToggleTheme}
          className={`p-3.5 flex items-center justify-between cursor-pointer ${
            darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            <span className="text-sm font-medium">Dark Mode Appearance</span>
          </div>
          <span className="text-xs font-bold text-blue-500">
            {darkMode ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        <div className={`p-3.5 flex items-center justify-between cursor-pointer ${
          darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3">
            <Bell className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">Price Alerts</span>
          </div>
          <span className="text-xs font-bold text-gray-400">{activeAlertsCount} Active</span>
        </div>

        <div className={`p-3.5 flex items-center justify-between cursor-pointer ${
          darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Economic Calendar</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className={`p-3.5 flex items-center justify-between cursor-pointer ${
          darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium">Currency Display</span>
          </div>
          <span className="text-xs font-bold text-gray-400">USD ($)</span>
        </div>
      </div>
    </div>
  );
};
