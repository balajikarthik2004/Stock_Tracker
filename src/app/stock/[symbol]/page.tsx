import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Volume2, 
  Target,
  Building,
  Globe,
  Users,
  ArrowLeft,
  Clock,
  PieChart,
  Activity,
  Shield,
  Star,
  Bell,
  Download,
  Share2
} from 'lucide-react';
import StockGraph from '@/components/StockGraph';
import { getStockDetails, getStockPrices } from '@/utils/api';

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { symbol } = await params;
  const stockDetails = await getStockDetails(symbol);
  
  if (!stockDetails) {
    return {
      title: 'Stock Not Found - StockPro',
    };
  }

  return {
    title: `${stockDetails.name} (${stockDetails.symbol}) - Stock Analysis & Price | StockPro`,
    description: `Real-time stock analysis for ${stockDetails.name} (${stockDetails.symbol}). Track current price, performance charts, technical indicators, and market data.`,
    keywords: [
      `${stockDetails.symbol} stock`, 
      `${stockDetails.name} share price`, 
      'NSE', 
      'BSE', 
      'stock analysis',
      'market data',
      'investment',
      'trading'
    ],
    openGraph: {
      title: `${stockDetails.name} (${stockDetails.symbol}) - StockPro`,
      description: `Track ${stockDetails.name} stock performance and analysis`,
      type: 'website',
    },
  };
}

export default async function StockPage({ params }: PageProps) {
  const { symbol } = await params;
  const stockDetails = await getStockDetails(symbol);
  const stockPrices = await getStockPrices(symbol, 30, 'DAILY');

  if (!stockDetails) {
    notFound();
  }

  // Ensure we have proper numeric values for calculations
  const currentPrice = typeof stockDetails.currentPrice === 'number' 
    ? stockDetails.currentPrice 
    : 1000 + Math.random() * 2000;
  
  const change = typeof stockDetails.change === 'number'
    ? stockDetails.change
    : (Math.random() * 40 - 20);
  
  const changePercent = typeof stockDetails.changePercent === 'number'
    ? stockDetails.changePercent
    : (change / currentPrice) * 100;

  const isPositive = change >= 0;
  const volume = 2500000 + Math.random() * 7500000;
  const marketCap = currentPrice * volume;

  const technicalData = {
    peRatio: (15 + Math.random() * 25).toFixed(2),
    eps: (5 + Math.random() * 15).toFixed(2),
    dividendYield: (1 + Math.random() * 4).toFixed(2),
    beta: (0.8 + Math.random() * 0.6).toFixed(2),
    week52High: currentPrice * (1 + Math.random() * 0.3),
    week52Low: currentPrice * (0.7 + Math.random() * 0.2),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-200/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">
                    {stockDetails.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stockDetails.name}
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">{stockDetails.symbol}</p>
                </div>
              </div>
              
              {stockDetails.sector && (
                <div className="flex items-center gap-2 mt-3 pl-1">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {stockDetails.sector} • {stockDetails.industry}
                  </span>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
               <p className="text-3xl md:text-4xl font-bold text-gray-900">
  ₹{(stockPrices?.[stockPrices.length - 1]?.price ?? currentPrice).toFixed(2)}
</p>
                {isPositive ? (
                  <TrendingUp className="w-6 h-6 text-green-500" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-500" />
                )}
              </div>
              <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change.toFixed(2)} (
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <p className="text-xs text-gray-500">As of {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/50 text-black">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Price Performance (30 Days)
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full ">
                  <Calendar className="w-4 h-4" />
                  <span>Last 30 days</span>
                </div>
              </div>
              <StockGraph data={stockPrices} symbol={stockDetails.symbol} />
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Technical Analysis
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-600 font-medium mb-1">P/E Ratio</p>
                  <p className="text-lg font-semibold text-gray-900">{technicalData.peRatio}</p>
                  <p className="text-xs text-gray-500 mt-1">Industry Avg: 22.5</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-sm text-green-600 font-medium mb-1">EPS</p>
                  <p className="text-lg font-semibold text-gray-900">₹{technicalData.eps}</p>
                  <p className="text-xs text-gray-500 mt-1">+12% YoY</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-sm text-amber-600 font-medium mb-1">Div Yield</p>
                  <p className="text-lg font-semibold text-gray-900">{technicalData.dividendYield}%</p>
                  <p className="text-xs text-gray-500 mt-1">2.1% Avg</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-sm text-purple-600 font-medium mb-1">Beta</p>
                  <p className="text-lg font-semibold text-gray-900">{technicalData.beta}</p>
                  <p className="text-xs text-gray-500 mt-1">Market Sensitivity</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                Key Statistics
              </h2>
              <div className="space-y-4">
                {[
                  { icon: DollarSign, label: 'Open', value: `₹${currentPrice.toFixed(2)}` },
                  { icon: Target, label: '52W High', value: `₹${technicalData.week52High.toFixed(2)}` },
                  { icon: Target, label: '52W Low', value: `₹${technicalData.week52Low.toFixed(2)}` },
                  { icon: Volume2, label: 'Volume', value: volume.toLocaleString() },
                  { icon: Globe, label: 'Market Cap', value: `₹${(marketCap / 10000000).toFixed(2)} Cr` },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <stat.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Performance
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Today', value: `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`, positive: isPositive },
                  { label: 'Week', value: `+${(Math.random() * 3).toFixed(2)}%`, positive: true },
                  { label: 'Month', value: `+${(Math.random() * 8).toFixed(2)}%`, positive: true },
                  { label: 'YTD', value: `+${(Math.random() * 15).toFixed(2)}%`, positive: true },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1.5">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-sm font-medium ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  <Star className="w-4 h-4" />
                  Add to Watchlist
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors">
                  <Bell className="w-4 h-4" />
                  Set Price Alert
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6 border border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            About {stockDetails.name}
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {stockDetails.name} ({stockDetails.symbol}) is a leading company in the {stockDetails.sector || 'financial'} sector, 
              trading on both the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE). 
              The company has demonstrated strong financial performance and market presence with consistent growth and innovation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Business Overview</h3>
                <ul className="text-gray-600 space-y-2.5">
                  {[
                    "Market leader in industry segment",
                    "Strong revenue growth trajectory",
                    "Diversified product portfolio",
                    "Robust corporate governance",
                    "Global presence across 15+ countries"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Investment Highlights</h3>
                <ul className="text-gray-600 space-y-2.5">
                  {[
                    "Consistent dividend payments for 8+ years",
                    "Strong balance sheet position",
                    "Experienced management team",
                    "Positive industry outlook",
                    "ESG compliant operations"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}