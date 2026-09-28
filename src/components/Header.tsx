import React from 'react';
import { Search, Menu, Moon, Sun, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onGetStarted: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  viewMode: 'mobile' | 'fluid';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenSearch,
  onGetStarted,
  darkMode,
  onToggleTheme,
  viewMode,
  onToggleViewMode
}) => {
  return (
    <header className={`sticky top-0 z-40 transition-colors backdrop-blur-md border-b px-4 h-16 flex items-center justify-between ${
      darkMode 
        ? 'bg-[#131722]/95 border-[#2A2E39] text-[#D1D4DC]' 
        : 'bg-white/95 border-[#E0E3EB]/80 text-[#131722]'
    }`}>
      {/* Left: Hamburger & Brand Logo */}
      <div className="flex items-center space-x-3.5">
        <button 
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu" 
          className={`p-1 rounded-md active:opacity-60 transition ${
            darkMode ? 'hover:bg-[#1E222D]' : 'hover:bg-gray-100'
          }`}
        >
          <Menu className="w-6 h-6" strokeWidth={2.2} />
        </button>

        {/* TradingView Signature Geometric Monogram */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="TradingView Home" 
          className="flex items-center focus:outline-none"
        >
          <svg className={`w-9 h-7 ${darkMode ? 'text-white' : 'text-[#131722]'}`} fill="currentColor" viewBox="0 0 36 28">
            <rect height="5.2" rx="1" width="9.6" x="0" y="2" />
            <rect height="23" rx="1" width="4" x="2.8" y="2" />
            <path d="M11.5 2h9.6l-5.8 23h-4.2z" />
            <path d="M21.5 2h9.8l4.7 18.2h-4.3L29 9.5l-2.7 10.7h-4.8z" />
          </svg>
        </button>
      </div>

      {/* Right Controls: View Switcher, Theme Toggle, Search, and CTA */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Responsive Simulator Toggle */}
        <button
          onClick={onToggleViewMode}
          title={viewMode === 'mobile' ? 'Switch to Full Screen View' : 'Switch to Mobile Frame'}
          className={`p-1.5 rounded-full transition text-xs flex items-center justify-center ${
            darkMode ? 'hover:bg-[#2A2E39] text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
          aria-label="Toggle display frame"
        >
          {viewMode === 'mobile' ? (
            <Monitor className="w-4 h-4" />
          ) : (
            <Smartphone className="w-4 h-4" />
          )}
        </button>

        {/* Dark/Light mode toggle */}
        <button
          onClick={onToggleTheme}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`p-1.5 rounded-full transition ${
            darkMode ? 'hover:bg-[#2A2E39] text-yellow-400' : 'hover:bg-gray-100 text-gray-700'
          }`}
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Search Icon */}
        <button 
          onClick={onOpenSearch}
          aria-label="Search markets and symbols" 
          className={`p-2 rounded-full active:opacity-60 transition ${
            darkMode ? 'hover:bg-[#2A2E39] text-[#D1D4DC]' : 'hover:bg-gray-100 text-[#131722]'
          }`}
        >
          <Search className="w-5 h-5" strokeWidth={2.2} />
        </button>

        {/* Get Started Button */}
        <button 
          onClick={onGetStarted}
          className="tv-btn-gradient text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
