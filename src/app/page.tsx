import Link from 'next/link';
import { Search, BarChart3, TrendingUp, Shield, Users, Globe, Twitter, Linkedin, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import TickerBar from '../components/TickerBar';

const POPULAR_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'HDFC', name: 'HDFC Bank' },
  { symbol: 'ICICI', name: 'ICICI Bank' },
  { symbol: 'ITC', name: 'ITC Limited' },
];

const FEATURES = [
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Deep insights with technical indicators and performance metrics"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Real-time Data",
    description: "Live market data with minimal latency for informed decisions"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Reliable",
    description: "Bank-level security ensuring your data remains protected"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "User-friendly",
    description: "Intuitive interface designed for both beginners and experts"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Coverage",
    description: "Access to stocks from multiple exchanges worldwide"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Smart Search",
    description: "Find stocks instantly with intelligent search algorithms"
  }
];

const FOOTER_LINKS = {
  'Market Data': ['Stocks', 'Indices', 'Commodities', 'Currencies'],
  'Resources': ['Learning Center', 'Market Analysis', 'Investment Strategies', 'Webinars'],
  'Company': ['About Us', 'Careers', 'Press', 'Contact'],
  'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security']
};

const SOCIAL_LINKS = [
  { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#' },
  { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: '#' },
  { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', url: '#' },
  { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', url: '#' }
];

const CONTACT_INFO = [
  { icon: <Mail className="w-4 h-4" />, text: 'info@tradebrains.in' },
  { icon: <Phone className="w-4 h-4" />, text: '[+91] 8088491790' },
  { icon: <MapPin className="w-4 h-4" />, text: '22nd Cross Rd, Sector 3, HSR Layout, Bengaluru, Karnataka' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockPro
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Search
              </Link>
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Markets
              </Link>
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Features
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/search" 
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link 
                href="/search"
                className="hidden md:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search Stocks</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Intelligent Stock Analysis{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Track real-time market data, analyze trends, and make informed investment decisions with our advanced platform. 
              Everything you need for successful trading in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Explore Stocks</span>
              </Link>
              <Link
                href="/features"
                className="border border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: 'Active Stocks' },
              { number: '50+', label: 'Global Exchanges' },
              { number: '1M+', label: 'Users' },
              { number: '24/7', label: 'Real-time Data' }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Smart Investing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to stay ahead in the market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Stocks Section */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Stocks
            </h2>
            <p className="text-gray-600">
              Explore these frequently searched companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {POPULAR_STOCKS.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/stock/${stock.symbol}`}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">
                      {stock.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xl mb-2">
                    {stock.symbol}
                  </h3>
                  <p className="text-gray-500 mb-4 line-clamp-1">
                    {stock.name}
                  </p>
                  <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    View Analysis →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-10 md:mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of investors who trust our platform for their stock market analysis and decision making.
            </p>
            <Link
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      {/*Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StockPro
                </span>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Advanced stock analysis platform providing real-time market data, 
                technical indicators, and investment insights for smart investors.
              </p>
              <div className="flex space-x-4 mb-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-12 h-12 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                    aria-label={social.name}
                  >
                    <div className="text-gray-300 group-hover:text-white">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
              <div className="space-y-3">
                {CONTACT_INFO.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300">
                    <div className="text-blue-400">
                      {contact.icon}
                    </div>
                    <span className="text-sm">{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-6 text-white border-b border-gray-700 pb-2">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-blue-400 transition-colors text-base hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} StockPro. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-gray-600">•</span>
                <span className="text-green-400 text-sm flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Live Market Data
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                Data Security
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-40">
        <TickerBar />
      </div>
    </div>
  );
}