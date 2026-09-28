import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, TrendingUp, TrendingDown, PlusCircle, Check } from 'lucide-react';
import { COMMUNITY_POSTS } from '../data/marketData';
import { CommunityPost } from '../types/market';

interface CommunityScreenProps {
  darkMode: boolean;
  onSelectSymbol: (symbol: string) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  darkMode,
  onSelectSymbol
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [userVote, setUserVote] = useState<'bull' | 'bear' | null>(null);
  const [bullVotes, setBullVotes] = useState(68);
  const [bearVotes, setBearVotes] = useState(32);

  const handleVote = (type: 'bull' | 'bear') => {
    if (userVote === type) return;
    if (type === 'bull') {
      setBullVotes(prev => prev + 1);
      if (userVote === 'bear') setBearVotes(prev => prev - 1);
    } else {
      setBearVotes(prev => prev + 1);
      if (userVote === 'bull') setBullVotes(prev => prev - 1);
    }
    setUserVote(type);
  };

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const totalVotes = bullVotes + bearVotes;
  const bullPercentage = Math.round((bullVotes / totalVotes) * 100);
  const bearPercentage = 100 - bullPercentage;

  return (
    <div className={`pb-24 px-4 pt-3 transition-colors ${darkMode ? 'text-white' : 'text-[#131722]'}`}>
      {/* Title & Publish CTA */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Community Ideas</h1>
          <p className="text-xs text-gray-400">Trade setups and technical analysis from verified traders</p>
        </div>
        <button className="tv-btn-gradient text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-sm cursor-pointer whitespace-nowrap">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post</span>
        </button>
      </div>

      {/* Community Sentiment Poll Card */}
      <div className={`p-4 rounded-2xl border mb-5 transition-colors ${
        darkMode ? 'bg-[#1E222D] border-[#2A2E39]' : 'bg-white border-[#E0E3EB] shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Daily Market Sentiment
          </span>
          <span className="text-xs font-semibold text-blue-500">S&amp;P 500 Outlook</span>
        </div>

        <h3 className="font-extrabold text-sm mb-3">
          Where will the US markets close this Friday?
        </h3>

        {/* Voting Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-700 mb-2">
          <div 
            className="bg-[#089981] h-full transition-all duration-300" 
            style={{ width: `${bullPercentage}%` }} 
          />
          <div 
            className="bg-[#F23645] h-full transition-all duration-300" 
            style={{ width: `${bearPercentage}%` }} 
          />
        </div>

        <div className="flex items-center justify-between text-xs font-bold mb-3">
          <span className="text-[#089981]">Bullish {bullPercentage}%</span>
          <span className="text-[#F23645]">Bearish {bearPercentage}%</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleVote('bull')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 cursor-pointer ${
              userVote === 'bull'
                ? 'bg-[#089981] text-white border-[#089981]'
                : darkMode 
                ? 'border-emerald-800 text-emerald-400 hover:bg-emerald-950/40' 
                : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            {userVote === 'bull' && <Check className="w-3.5 h-3.5" />}
            <span>Vote Bullish (Higher)</span>
          </button>

          <button
            onClick={() => handleVote('bear')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 cursor-pointer ${
              userVote === 'bear'
                ? 'bg-[#F23645] text-white border-[#F23645]'
                : darkMode 
                ? 'border-rose-800 text-rose-400 hover:bg-rose-950/40' 
                : 'border-rose-300 text-rose-700 hover:bg-rose-50'
            }`}
          >
            {userVote === 'bear' && <Check className="w-3.5 h-3.5" />}
            <span>Vote Bearish (Lower)</span>
          </button>
        </div>
      </div>

      {/* Ideas Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <article
            key={post.id}
            className={`p-4 rounded-2xl border transition-colors ${
              darkMode ? 'bg-[#1E222D] border-[#2A2E39]' : 'bg-white border-[#E0E3EB] shadow-sm'
            }`}
          >
            {/* Author bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-xs leading-none">{post.author}</span>
                    {post.authorBadge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500">
                        {post.authorBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">{post.timeAgo}</span>
                </div>
              </div>

              {/* Ticker & Bias */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => onSelectSymbol(post.symbol)}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                >
                  ${post.symbol}
                </button>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  post.bias === 'Long'
                    ? 'bg-emerald-500/15 text-[#089981]'
                    : 'bg-rose-500/15 text-[#F23645]'
                }`}>
                  {post.bias} ({post.chartTimeframe})
                </span>
              </div>
            </div>

            {/* Post Title & Content */}
            <h3 className="font-bold text-sm sm:text-base leading-snug mb-2">
              {post.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed mb-3">
              {post.content}
            </p>

            {/* Simulated Chart Preview Thumbnail */}
            <div className={`w-full h-24 rounded-xl border flex items-center justify-center relative overflow-hidden mb-3 ${
              darkMode ? 'bg-[#131722] border-[#2A2E39]' : 'bg-gray-50 border-gray-200'
            }`}>
              <svg className="w-full h-full opacity-60" viewBox="0 0 300 80" preserveAspectRatio="none">
                <path
                  d={post.bias === 'Long' ? "M 0,60 Q 60,70 120,40 T 220,30 T 300,10" : "M 0,20 Q 60,15 120,45 T 220,50 T 300,75"}
                  fill="none"
                  stroke={post.bias === 'Long' ? "#089981" : "#F23645"}
                  strokeWidth="2.5"
                />
              </svg>
              <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-gray-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs text-white">
                TradingView Idea Chart
              </span>
            </div>

            {/* Footer metrics */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-100 dark:border-[#2A2E39]">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center space-x-1.5 transition cursor-pointer ${
                  post.isLiked ? 'text-blue-500 font-bold' : 'hover:text-blue-500'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" fill={post.isLiked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comments}</span>
                </span>
                <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-200">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{post.shares}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
