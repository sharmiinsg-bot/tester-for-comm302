import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryNav } from './components/CategoryNav';
import { IndexCard } from './components/IndexCard';
import { CommunityTrends } from './components/CommunityTrends';
import { VolumeStocksTable } from './components/VolumeStocksTable';
import { BottomNav } from './components/BottomNav';
import { InstrumentModal } from './components/InstrumentModal';
import { SearchModal } from './components/SearchModal';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { AccountModal } from './components/AccountModal';
import { SuperchartsScreen } from './components/SuperchartsScreen';
import { NewsScreen } from './components/NewsScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { MoreScreen } from './components/MoreScreen';

import { 
  MarketCategory, 
  TabType, 
  Instrument 
} from './types/market';

import { 
  US_INDICES, 
  WORLD_INDICES, 
  US_STOCKS, 
  FUTURES_DATA, 
  FOREX_DATA, 
  BONDS_DATA, 
  CRYPTO_DATA 
} from './data/marketData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('markets');
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('indices');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'fluid'>('mobile');

  // Modals & Drawers state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [superchartsSymbol, setSuperchartsSymbol] = useState<string>('NVDA');

  // Live price simulation
  const [usIndices, setUsIndices] = useState(US_INDICES);
  const [worldIndices, setWorldIndices] = useState(WORLD_INDICES);
  const [usStocks, setUsStocks] = useState(US_STOCKS);

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle random fluctuation for live market effect
      setUsIndices(prev => prev.map(item => {
        if (Math.random() > 0.6) {
          const delta = (Math.random() - 0.48) * (item.price * 0.0004);
          const newPrice = Number((item.price + delta).toFixed(2));
          const newChange = Number((item.change + delta).toFixed(2));
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: Number(((newChange / (newPrice - newChange)) * 100).toFixed(2))
          };
        }
        return item;
      }));

      setUsStocks(prev => prev.map(item => {
        if (Math.random() > 0.65) {
          const delta = (Math.random() - 0.48) * (item.price * 0.0006);
          const newPrice = Number((item.price + delta).toFixed(2));
          const newChange = Number((item.change + delta).toFixed(2));
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: Number(((newChange / (newPrice - newChange)) * 100).toFixed(2))
          };
        }
        return item;
      }));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleOpenSupercharts = (symbol: string) => {
    setSuperchartsSymbol(symbol);
    setCurrentTab('charts');
  };

  const handleSelectTrend = (symbol: string) => {
    // Search instrument by symbol
    const found = [...usStocks, ...usIndices, ...worldIndices, ...FUTURES_DATA, ...CRYPTO_DATA].find(
      i => i.symbol.toLowerCase().includes(symbol.toLowerCase())
    );
    if (found) {
      setSelectedInstrument(found);
    } else {
      handleOpenSupercharts(symbol);
    }
  };

  // Determine which carousel to show under category selection
  const renderCategoryCarousel = () => {
    if (selectedCategory === 'futures') {
      return (
        <section className="mb-7" data-purpose="futures-cards-carousel">
          <div className="px-4 mb-2 flex items-center justify-between">
            <h2 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
              Commodities &amp; Futures
            </h2>
          </div>
          <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
            {FUTURES_DATA.map(item => (
              <IndexCard
                key={item.id}
                instrument={item}
                darkMode={darkMode}
                onSelect={setSelectedInstrument}
                showSubtitle={true}
              />
            ))}
          </div>
        </section>
      );
    }

    if (selectedCategory === 'forex') {
      return (
        <section className="mb-7" data-purpose="forex-cards-carousel">
          <div className="px-4 mb-2 flex items-center justify-between">
            <h2 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
              Forex Major Pairs
            </h2>
          </div>
          <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
            {FOREX_DATA.map(item => (
              <IndexCard
                key={item.id}
                instrument={item}
                darkMode={darkMode}
                onSelect={setSelectedInstrument}
                showSubtitle={true}
              />
            ))}
          </div>
        </section>
      );
    }

    if (selectedCategory === 'bonds') {
      return (
        <section className="mb-7" data-purpose="bonds-cards-carousel">
          <div className="px-4 mb-2 flex items-center justify-between">
            <h2 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
              Sovereign Debt &amp; Bond Yields
            </h2>
          </div>
          <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
            {BONDS_DATA.map(item => (
              <IndexCard
                key={item.id}
                instrument={item}
                darkMode={darkMode}
                onSelect={setSelectedInstrument}
                showSubtitle={true}
              />
            ))}
          </div>
        </section>
      );
    }

    if (selectedCategory === 'crypto') {
      return (
        <section className="mb-7" data-purpose="crypto-cards-carousel">
          <div className="px-4 mb-2 flex items-center justify-between">
            <h2 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
              Top Cryptocurrencies
            </h2>
          </div>
          <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
            {CRYPTO_DATA.map(item => (
              <IndexCard
                key={item.id}
                instrument={item}
                darkMode={darkMode}
                onSelect={setSelectedInstrument}
                showSubtitle={true}
              />
            ))}
          </div>
        </section>
      );
    }

    // Default 'indices' or other general categories
    return (
      <section className="mb-7" data-purpose="indices-cards-carousel">
        <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
          {usIndices.map(item => (
            <IndexCard
              key={item.id}
              instrument={item}
              darkMode={darkMode}
              onSelect={setSelectedInstrument}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode ? 'bg-[#0E1117]' : 'bg-[#F0F3FA]'
    }`}>
      {/* Outer Layout Wrapper: Either iPhone device canvas or fluid width */}
      <div className={`mx-auto transition-all ${
        viewMode === 'mobile' 
          ? 'max-w-[430px] my-0 sm:my-4 rounded-none sm:rounded-[36px] overflow-hidden shadow-2xl border-0 sm:border sm:border-gray-300 dark:sm:border-gray-800' 
          : 'max-w-screen-md shadow-lg'
      }`}>
        <div className={`min-h-screen transition-colors flex flex-col justify-between ${
          darkMode ? 'bg-[#131722] text-[#D1D4DC]' : 'bg-white text-[#131722]'
        }`}>
          {/* Main Top Header */}
          <Header
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onGetStarted={() => setIsAccountOpen(true)}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
            viewMode={viewMode}
            onToggleViewMode={() => setViewMode(viewMode === 'mobile' ? 'fluid' : 'mobile')}
          />

          {/* Body Content according to active tab */}
          <main className="flex-1">
            {currentTab === 'markets' && (
              <div className="pb-28">
                {/* Hero Section: Markets, everywhere */}
                <HeroSection
                  darkMode={darkMode}
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                />

                {/* Category Navigation Pill Bar */}
                <CategoryNav
                  darkMode={darkMode}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Top Carousel (US Indices or active category) */}
                {renderCategoryCarousel()}

                {/* World Indices Section */}
                {(selectedRegion === 'all' || selectedRegion === 'europe' || selectedRegion === 'asia') && (
                  <section className="mb-7" data-purpose="world-indices">
                    <div className="px-4 mb-3.5">
                      <button
                        onClick={() => setSelectedCategory('world_stocks')}
                        className="inline-flex items-center group text-left focus:outline-none cursor-pointer"
                      >
                        <h2 className={`text-xl font-bold tracking-tight transition ${
                          darkMode ? 'text-white group-hover:text-blue-400' : 'text-[#131722] group-hover:text-blue-600'
                        }`}>
                          World indices
                        </h2>
                        <svg className={`w-4 h-4 ml-1 transition group-hover:translate-x-0.5 ${
                          darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-[#131722] group-hover:text-blue-600'
                        }`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
                      {worldIndices.map(item => (
                        <IndexCard
                          key={item.id}
                          instrument={item}
                          darkMode={darkMode}
                          onSelect={setSelectedInstrument}
                          showSubtitle={true}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* US Stocks Section */}
                {(selectedRegion === 'all' || selectedRegion === 'americas') && (
                  <section className="mb-7" data-purpose="us-stocks-section">
                    <div className="px-4 mb-3.5">
                      <button 
                        onClick={() => setSelectedCategory('us_stocks')}
                        className="inline-flex items-center group text-left focus:outline-none cursor-pointer"
                      >
                        <span aria-label="United States Flag" className="mr-2 text-2xl inline-block" role="img">🇺🇸</span>
                        <h2 className={`text-xl font-bold tracking-tight transition ${
                          darkMode ? 'text-white group-hover:text-blue-400' : 'text-[#131722] group-hover:text-blue-600'
                        }`}>
                          US stocks
                        </h2>
                        <svg className={`w-4 h-4 ml-1 transition group-hover:translate-x-0.5 ${
                          darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-[#131722] group-hover:text-blue-600'
                        }`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex overflow-x-auto no-scrollbar smooth-scroll px-4 space-x-3.5 snap-x snap-mandatory">
                      {usStocks.map(item => (
                        <IndexCard
                          key={item.id}
                          instrument={item}
                          darkMode={darkMode}
                          onSelect={setSelectedInstrument}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Community Trends Section */}
                <CommunityTrends
                  darkMode={darkMode}
                  onSelectTrend={handleSelectTrend}
                />

                {/* Highest Volume Stocks Section */}
                <VolumeStocksTable
                  darkMode={darkMode}
                  onSelectInstrument={setSelectedInstrument}
                  onViewAllActives={() => setSelectedCategory('us_stocks')}
                />
              </div>
            )}

            {/* Screen 2: Supercharts */}
            {currentTab === 'charts' && (
              <SuperchartsScreen
                initialSymbol={superchartsSymbol}
                darkMode={darkMode}
              />
            )}

            {/* Screen 3: News */}
            {currentTab === 'news' && (
              <NewsScreen
                darkMode={darkMode}
                onSelectTicker={handleSelectTrend}
              />
            )}

            {/* Screen 4: Community */}
            {currentTab === 'community' && (
              <CommunityScreen
                darkMode={darkMode}
                onSelectSymbol={handleSelectTrend}
              />
            )}

            {/* Screen 5: More */}
            {currentTab === 'more' && (
              <MoreScreen
                darkMode={darkMode}
                onToggleTheme={() => setDarkMode(!darkMode)}
                onGetStarted={() => setIsAccountOpen(true)}
                onSelectSymbol={handleSelectTrend}
              />
            )}
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Slide-out Menu Drawer */}
      <SideMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectTab={setCurrentTab}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onGetStarted={() => setIsAccountOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectInstrument={setSelectedInstrument}
        darkMode={darkMode}
      />

      {/* Detailed Instrument Bottom Sheet Modal */}
      <InstrumentModal
        instrument={selectedInstrument}
        isOpen={selectedInstrument !== null}
        onClose={() => setSelectedInstrument(null)}
        onOpenSupercharts={handleOpenSupercharts}
        darkMode={darkMode}
      />

      {/* Account / Get Started Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
