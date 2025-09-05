'use client';

import { useEffect, useState } from 'react';
import { getTickerData, TickerData } from '@/utils/api';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const TickerBar = () => {
  const [tickerData, setTickerData] = useState<TickerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTickerData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching ticker data...');
      
      const data = await getTickerData();
      console.log('Ticker data received:', data);
      
      if (data && data.length > 0) {
        setTickerData(data);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError('No data available');
      }
    } catch (error) {
      console.error('Failed to fetch ticker data:', error);
      setError('Failed to load live data. Showing demo data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
   
    fetchTickerData();
      const interval = setInterval(fetchTickerData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading && tickerData.length === 0) {
    return (
      <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 overflow-hidden relative border-b border-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-blue-400">LIVE</span>
            <RefreshCw className="h-3 w-3 text-gray-400 animate-spin" />
          </div>
          <span className="text-xs text-gray-400">Loading market data...</span>
        </div>
      </div>
    );
  }
  if (tickerData.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 overflow-hidden relative border-b border-gray-700">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-blue-400">LIVE</span>
          {isLoading ? (
            <RefreshCw className="h-3 w-3 text-gray-400 animate-spin" />
          ) : (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
        
        {lastUpdated && (
          <span className="text-xs text-gray-400 hidden md:block">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {error && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <span className="text-xs text-yellow-400 bg-yellow-900/50 px-2 py-1 rounded">
            {error}
          </span>
        </div>
      )}

      {/* Ticker content */}
      <div className="ml-32 mr-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {tickerData.map((item, index) => (
            <span
              key={`${item.symbol}-${index}-${item.price}`}
              className="inline-flex items-center mx-4 py-1 px-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 transition-colors duration-200"
            >
              <span className="font-bold text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {item.symbol}
              </span>
              
              <span className="mx-2 text-gray-300">•</span>
              
              <span className="font-mono text-sm">₹{item.price.toFixed(2)}</span>
              
              <span className="mx-2 text-gray-300">•</span>
              
              <span className={`inline-flex items-center text-sm font-medium ${
                item.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {item.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(item.change).toFixed(2)} ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10" />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 60s linear infinite;
          padding-left: 100%;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 45s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default TickerBar;