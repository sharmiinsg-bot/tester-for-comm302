import React from 'react';
import { TabType } from '../types/market';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  darkMode: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  darkMode
}) => {
  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t px-6 py-2 flex items-center justify-between max-w-screen-md mx-auto transition-colors ${
        darkMode 
          ? 'bg-[#131722]/95 border-[#2A2E39]' 
          : 'bg-white/95 border-[#E0E3EB]'
      }`}
      data-purpose="mobile-bottom-bar"
    >
      {/* Tab 1: Charts */}
      <button 
        onClick={() => onSelectTab('charts')}
        className={`flex flex-col items-center cursor-pointer transition active:opacity-70 focus:outline-none ${
          currentTab === 'charts' 
            ? 'text-blue-600' 
            : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#787B86] hover:text-[#131722]'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'charts' ? "2.4" : "2"} viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <span className={`text-[10px] ${currentTab === 'charts' ? 'font-bold' : 'font-medium'}`}>
          Charts
        </span>
      </button>

      {/* Tab 2: Markets (Active by default) */}
      <button 
        onClick={() => onSelectTab('markets')}
        className={`flex flex-col items-center cursor-pointer transition active:opacity-70 focus:outline-none ${
          currentTab === 'markets' 
            ? 'text-blue-600' 
            : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#787B86] hover:text-[#131722]'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'markets' ? "2.4" : "2"} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className={`text-[10px] ${currentTab === 'markets' ? 'font-bold' : 'font-medium'}`}>
          Markets
        </span>
      </button>

      {/* Tab 3: News */}
      <button 
        onClick={() => onSelectTab('news')}
        className={`flex flex-col items-center cursor-pointer transition active:opacity-70 focus:outline-none ${
          currentTab === 'news' 
            ? 'text-blue-600' 
            : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#787B86] hover:text-[#131722]'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'news' ? "2.4" : "2"} viewBox="0 0 24 24">
          <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span className={`text-[10px] ${currentTab === 'news' ? 'font-bold' : 'font-medium'}`}>
          News
        </span>
      </button>

      {/* Tab 4: Community */}
      <button 
        onClick={() => onSelectTab('community')}
        className={`flex flex-col items-center cursor-pointer transition active:opacity-70 focus:outline-none ${
          currentTab === 'community' 
            ? 'text-blue-600' 
            : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#787B86] hover:text-[#131722]'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'community' ? "2.4" : "2"} viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className={`text-[10px] ${currentTab === 'community' ? 'font-bold' : 'font-medium'}`}>
          Community
        </span>
      </button>

      {/* Tab 5: More */}
      <button 
        onClick={() => onSelectTab('more')}
        className={`flex flex-col items-center cursor-pointer transition active:opacity-70 focus:outline-none ${
          currentTab === 'more' 
            ? 'text-blue-600' 
            : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#787B86] hover:text-[#131722]'
        }`}
      >
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'more' ? "2.4" : "2"} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="19" cy="12" r="1.5" />
          <circle cx="5" cy="12" r="1.5" />
        </svg>
        <span className={`text-[10px] ${currentTab === 'more' ? 'font-bold' : 'font-medium'}`}>
          More
        </span>
      </button>
    </nav>
  );
};
