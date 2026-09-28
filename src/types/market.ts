export type MarketCategory = 
  | 'indices' 
  | 'futures' 
  | 'forex' 
  | 'bonds' 
  | 'crypto' 
  | 'us_stocks' 
  | 'world_stocks' 
  | 'etfs';

export type TabType = 'charts' | 'markets' | 'news' | 'community' | 'more';

export interface SparklinePoint {
  x: number;
  y: number;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  category: MarketCategory;
  volume?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  iconType?: 'number' | 'nvidia' | 'apple' | 'amazon' | 'crypto' | 'flag' | 'text' | 'generic';
  flag?: string;
  sparklinePoints: number[]; // 8-12 normalized points from 0 to 40
  high52?: number;
  low52?: number;
  marketCap?: string;
  peRatio?: string;
  divYield?: string;
  description?: string;
  technicalSentiment?: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  analystRating?: {
    buy: number;
    hold: number;
    sell: number;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  summary: string;
  category: 'all' | 'stocks' | 'crypto' | 'forex' | 'economy';
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  relatedTickers: string[];
  readTime: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  authorBadge?: string;
  timeAgo: string;
  symbol: string;
  title: string;
  content: string;
  bias: 'Long' | 'Short' | 'Neutral';
  chartTimeframe: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}
