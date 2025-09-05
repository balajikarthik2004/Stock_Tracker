'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  TrendingUp,
  Star,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const POPULAR_STOCKS: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: 2856.15,
    change: 42.35,
    changePercent: 1.51,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    price: 3897.5,
    change: -23.75,
    changePercent: -0.61,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    price: 1672.8,
    change: 15.2,
    changePercent: 0.92,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    price: 1645.25,
    change: -8.35,
    changePercent: -0.51,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    price: 1098.6,
    change: 22.4,
    changePercent: 2.08,
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd.',
    price: 435.75,
    change: 5.25,
    changePercent: 1.22,
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: 782.4,
    change: 12.6,
    changePercent: 1.64,
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    price: 1125.3,
    change: -7.2,
    changePercent: -0.64,
  },
];

const mockSearchStocks = async (query: string): Promise<Stock[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) return [];

  return POPULAR_STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const searchStocks = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      const results = await mockSearchStocks(searchQuery);
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(searchStocks, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleStockSelect = (symbol: string) => {
    setSearchQuery('');
    setShowResults(false);
    router.push(`/stock/${symbol}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Stock Search
          </h1>
          <p className="text-gray-600">Find stocks by company name or symbol</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for stocks (e.g., RELIANCE, TCS, INFY...)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-black"
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="mt-2 border border-gray-200 rounded-lg shadow-lg bg-white max-h-60 overflow-y-auto z-10 text-black">
              {searchResults.map((stock) => (
                <div
                  key={stock.symbol}
                  className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  onClick={() => handleStockSelect(stock.symbol)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {stock.symbol}
                      </div>
                      <div className="text-sm text-gray-600">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ₹{stock.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stock.change >= 0 ? '+' : ''}
                        {stock.change.toFixed(2)} (
                        {stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showResults &&
            searchQuery.length >= 2 &&
            searchResults.length === 0 &&
            !isSearching && (
              <div className="text-black mt-4 p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                {`No stocks found for "${searchQuery}"`}
              </div>
            )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Popular Stocks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POPULAR_STOCKS.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/stock/${stock.symbol}`}
                className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {stock.symbol}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-1">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-black">
                      ₹{stock.price.toFixed(2)}
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(stock.change).toFixed(2)} (
                      {stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">View details →</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500 ml-1">4.5</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Search Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>
                  Search by company name (e.g., &quot;Reliance&quot;) or symbol (e.g., &quot;RELIANCE&quot;)
                </span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>
                  Click on any stock to view detailed information and charts
                </span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Browse popular stocks below for quick access</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Future feature: Recent searches and favorite stocks will appear here
          </p>
        </div>
      </div>
    </div>
  );
}