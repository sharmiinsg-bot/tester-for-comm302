import React from 'react';
import { X, BarChart2, Globe, Newspaper, Users, Sliders, Calendar, DollarSign, Shield, Moon, Sun, ChevronRight } from 'lucide-react';
import { TabType } from '../types/market';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onGetStarted: () => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  darkMode,
  onToggleTheme,
  onGetStarted
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className={`relative w-[300px] max-w-[85vw] h-full shadow-2xl z-50 flex flex-col justify-between overflow-y-auto no-scrollbar transition-all ${
        darkMode ? 'bg-[#1E222D] text-white' : 'bg-white text-[#131722]'
      }`}>
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-[#2A2E39] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <svg className={`w-8 h-6 ${darkMode ? 'text-white' : 'text-[#131722]'}`} fill="currentColor" viewBox="0 0 36 28">
                <rect height="5.2" rx="1" width="9.6" x="0" y="2" />
                <rect height="23" rx="1" width="4" x="2.8" y="2" />
                <path d="M11.5 2h9.6l-5.8 23h-4.2z" />
                <path d="M21.5 2h9.8l4.7 18.2h-4.3L29 9.5l-2.7 10.7h-4.8z" />
              </svg>
              <span className="font-extrabold text-base tracking-tight">TradingView</span>
            </div>
            <button 
              onClick={onClose}
              className={`p-1.5 rounded-full ${
                darkMode ? 'hover:bg-[#2A2E39] text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Sign In Promo */}
          <div className="p-4 border-b border-gray-100 dark:border-[#2A2E39]">
            <h4 className="font-bold text-sm mb-1">Look first / Then leap.</h4>
            <p className="text-xs text-gray-400 mb-3">Join over 60M+ traders and investors analyzing markets worldwide.</p>
            <button
              onClick={() => {
                onClose();
                onGetStarted();
              }}
              className="w-full tv-btn-gradient text-white text-xs font-bold py-2.5 rounded-full shadow-md cursor-pointer"
            >
              Get started for free
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-2">
            <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Navigation
            </div>

            <button
              onClick={() => {
                onSelectTab('markets');
                onClose();
              }}
              className={`w-full px-4 py-2.5 flex items-center justify-between text-sm font-medium transition ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Markets, everywhere</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onSelectTab('charts');
                onClose();
              }}
              className={`w-full px-4 py-2.5 flex items-center justify-between text-sm font-medium transition ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <BarChart2 className="w-4 h-4 text-[#089981]" />
                <span>Supercharts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onSelectTab('news');
                onClose();
              }}
              className={`w-full px-4 py-2.5 flex items-center justify-between text-sm font-medium transition ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Newspaper className="w-4 h-4 text-amber-500" />
                <span>News &amp; Analysis</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onSelectTab('community');
                onClose();
              }}
              className={`w-full px-4 py-2.5 flex items-center justify-between text-sm font-medium transition ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Community &amp; Ideas</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onSelectTab('more');
                onClose();
              }}
              className={`w-full px-4 py-2.5 flex items-center justify-between text-sm font-medium transition ${
                darkMode ? 'hover:bg-[#252A37]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sliders className="w-4 h-4 text-cyan-500" />
                <span>Tools &amp; Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Market Status Section */}
          <div className="p-4 border-t border-gray-100 dark:border-[#2A2E39]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Market Hours
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse" />
              <span className="font-semibold text-[#089981]">US Markets Open</span>
              <span className="text-gray-400">· 9:30 AM - 4:00 PM EST</span>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-gray-100 dark:border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400">
            <span>Theme:</span>
            <span className={darkMode ? 'text-white' : 'text-[#131722]'}>
              {darkMode ? 'Dark' : 'Light'}
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border flex items-center space-x-1.5 text-xs font-semibold ${
              darkMode ? 'border-[#2A2E39] bg-[#252A37]' : 'border-gray-200 bg-gray-50'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
