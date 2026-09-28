import React, { useState } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Clock, ChevronRight, ExternalLink, Bookmark } from 'lucide-react';
import { NEWS_STORIES } from '../data/marketData';
import { NewsArticle } from '../types/market';

interface NewsScreenProps {
  darkMode: boolean;
  onSelectTicker: (ticker: string) => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({
  darkMode,
  onSelectTicker
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'economy'>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const filteredNews = NEWS_STORIES.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={`pb-24 px-4 pt-3 transition-colors ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
      {/* Title */}
      <div className="mb-3">
        <h1 className="text-2xl font-black tracking-tight">Market News &amp; Insights</h1>
        <p className="text-xs text-gray-400">Real-time headlines curated from global financial desks</p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-3">
        {(['all', 'stocks', 'crypto', 'forex', 'economy'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode ? 'bg-[#1E222D] text-gray-300 hover:bg-[#2A2E39]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Breaking News Banner */}
      <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <span>Breaking News</span>
        </div>
        <h3 className="font-extrabold text-sm sm:text-base leading-snug">
          Global Semiconductor Index reaches all-time peak amidst custom AI accelerator boom
        </h3>
        <div className="flex items-center justify-between text-xs text-blue-100 mt-2">
          <span>Reuters · 8m ago</span>
          <span className="underline font-semibold cursor-pointer">Read analysis →</span>
        </div>
      </div>

      {/* Articles Feed */}
      <div className="space-y-3">
        {filteredNews.map(story => (
          <article
            key={story.id}
            onClick={() => setSelectedArticle(story)}
            className={`p-4 rounded-2xl border transition cursor-pointer active:scale-[0.99] ${
              darkMode 
                ? 'bg-[#1E222D] border-[#2A2E39] hover:border-gray-600' 
                : 'bg-white border-[#E0E3EB] hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-500">{story.source}</span>
                <span>·</span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {story.timeAgo}
                </span>
              </div>
              <button 
                onClick={(e) => toggleBookmark(story.id, e)}
                className={`p-1 rounded-full transition ${
                  bookmarkedIds.includes(story.id) ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={bookmarkedIds.includes(story.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h3 className="font-bold text-sm sm:text-base leading-snug mb-1.5">
              {story.title}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
              {story.summary}
            </p>

            <div className="flex items-center justify-between">
              {/* Tickers */}
              <div className="flex items-center space-x-1.5">
                {story.relatedTickers.map(ticker => (
                  <button
                    key={ticker}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTicker(ticker);
                    }}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded transition ${
                      darkMode ? 'bg-[#2A2E39] text-gray-200 hover:bg-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    ${ticker}
                  </button>
                ))}
              </div>

              {/* Sentiment */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                story.sentiment === 'Bullish' 
                  ? 'bg-emerald-500/15 text-[#089981]' 
                  : story.sentiment === 'Bearish' 
                  ? 'bg-rose-500/15 text-[#F23645]' 
                  : 'bg-gray-500/15 text-gray-400'
              }`}>
                {story.sentiment}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedArticle(null)} />
          <div className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl z-50 max-h-[85vh] overflow-y-auto no-scrollbar border ${
            darkMode ? 'bg-[#1E222D] text-white border-[#2A2E39]' : 'bg-white text-[#131722] border-[#E0E3EB]'
          }`}>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span className="font-bold text-blue-500">{selectedArticle.source}</span>
              <span>{selectedArticle.timeAgo} · {selectedArticle.readTime}</span>
            </div>

            <h2 className="text-xl font-extrabold leading-tight mb-3">
              {selectedArticle.title}
            </h2>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
              {selectedArticle.summary}
            </p>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
              Financial market participants continue to balance macroeconomic expectations against record quarterly revenues reported across primary components. Institutional sentiment scores indicate continued preference toward high-conviction momentum assets and low leverage ratios.
            </p>

            <div className="pt-4 border-t border-gray-100 dark:border-[#2A2E39] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="tv-btn-gradient text-white font-bold text-xs px-5 py-2 rounded-full cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
