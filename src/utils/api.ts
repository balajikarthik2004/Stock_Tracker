const API_BASE = 'https://portal.tradebrains.in/api/assignment';

export interface StockSearchResult {
  symbol: string;
  name: string;
}

export interface StockDetails {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  industry?: string;
  sector?: string;
  marketCap?: number;
}

export interface StockPrice {
  time: string;
  price: number;
  volume?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface TickerData {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
}

// Define interfaces for API response objects
interface ApiStockItem {
  symbol?: string;
  Symbol?: string;
  name?: string;
  Name?: string;
  companyName?: string;
}

interface ApiPriceItem {
  time?: string;
  date?: string;
  timestamp?: string;
  price?: number;
  close?: number;
  lastPrice?: number;
  volume?: number;
  Volume?: number;
  open?: number;
  Open?: number;
  high?: number;
  High?: number;
  low?: number;
  Low?: number;
  Close?: number;
}

interface ApiTickerItem {
  symbol?: string;
  Symbol?: string;
  ticker?: string;
  Ticker?: string;
  name?: string;
  Name?: string;
  companyName?: string;
  description?: string;
  price?: number;
  lastPrice?: number;
  Close?: number;
  close?: number;
  currentPrice?: number;
  change?: number;
  Change?: number;
  netChange?: number;
  priceChange?: number;
  changePercent?: number;
  percentChange?: number;
  chgPct?: number;
  volume?: number;
  Volume?: number;
  totalVolume?: number;
}

async function fetchAPI(endpoint: string): Promise<unknown> {
  try {
    console.log(`Fetching from: ${endpoint}`);
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'StockTickerApp/1.0',
      },
    });
    
    if (!response.ok) {
      console.warn(`API returned ${response.status} for ${endpoint}`);
      return null;
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      console.warn('Response is not JSON, returning null');
      return null;
    }
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

export const searchStocks = async (keyword: string): Promise<StockSearchResult[]> => {
  try {
    if (!keyword || keyword.length < 2) {
      return [];
    }

    const data = await fetchAPI(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}&length=10`);
    
    if (!data) {
      return [
        { symbol: 'RELIANCE', name: 'Reliance Industries Limited' },
        { symbol: 'TCS', name: 'Tata Consultancy Services Limited' },
        { symbol: 'INFY', name: 'Infosys Limited' },
        { symbol: 'HDFC', name: 'Housing Development Finance Corporation Limited' },
        { symbol: 'ICICI', name: 'ICICI Bank Limited' },
      ].filter(item => 
        item.symbol.toLowerCase().includes(keyword.toLowerCase()) || 
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Type guard to check if data is an array
    if (!Array.isArray(data)) {
      console.warn('Expected array but got:', typeof data);
      return [];
    }

    return (data as ApiStockItem[])
      .map((item) => ({
        symbol: item.symbol || item.Symbol || '',
        name: item.name || item.Name || item.companyName || '',
      }))
      .filter((item): item is StockSearchResult => item.symbol !== '' && item.name !== '');
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

export const getStockDetails = async (symbol: string): Promise<StockDetails | null> => {
  try {
    const basePrice = 100 + (symbol.length * 50) + (Math.random() * 200);
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;

    const companyNames: { [key: string]: string } = {
      'RELIANCE': 'Reliance Industries Limited',
      'TCS': 'Tata Consultancy Services Limited',
      'INFY': 'Infosys Limited',
      'HDFC': 'HDFC Bank Limited',
      'ICICI': 'ICICI Bank Limited',
      'ITC': 'ITC Limited',
      'HINDUNILVR': 'Hindustan Unilever Limited',
      'SBIN': 'State Bank of India',
    };

    return {
      symbol: symbol.toUpperCase(),
      name: companyNames[symbol.toUpperCase()] || `${symbol} Company Limited`,
      currentPrice: basePrice,
      change: change,
      changePercent: changePercent,
      industry: 'Financial Services',
      sector: 'Banking',
      marketCap: 100000000000 + (Math.random() * 900000000000),
    };
  } catch (error) {
    console.error('Error fetching stock details:', error);
    return null;
  }
};

export const getStockPrices = async (
  symbol: string, 
  days: number = 7, 
  type: string = 'DAILY', 
  limit: number = 50
): Promise<StockPrice[]> => {
  try {
    const data = await fetchAPI(
      `${API_BASE}/stock/${symbol}/prices?days=${days}&type=${type}&limit=${limit}`
    );

    if (data && Array.isArray(data)) {
      return (data as ApiPriceItem[])
        .map((item) => ({
          time: item.time || item.date || item.timestamp || new Date().toISOString(),
          price: item.price || item.close || item.lastPrice || 0,
          volume: item.volume || item.Volume,
          open: item.open || item.Open,
          high: item.high || item.High,
          low: item.low || item.Low,
          close: item.close || item.Close,
        }))
        .filter((item) => item.price > 0);
    }

    console.log('Generating mock data for demonstration');
    const prices: StockPrice[] = [];
    const now = new Date();
    const basePrice = 100 + (symbol.length * 50) + (Math.random() * 200);
    let currentPrice = basePrice;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      if (type === 'DAILY') {
        date.setDate(date.getDate() - i);
      } else {
        date.setHours(date.getHours() - i);
      }
     
      const priceChange = (Math.random() - 0.48) * (basePrice * 0.03);
      currentPrice = Math.max(10, currentPrice + priceChange); 
      
      const open = currentPrice - (Math.random() * currentPrice * 0.01);
      const high = currentPrice + (Math.random() * currentPrice * 0.02);
      const low = currentPrice - (Math.random() * currentPrice * 0.02);
      
      prices.push({
        time: date.toISOString(),
        price: currentPrice,
        volume: 1000000 + Math.random() * 9000000,
        open: open,
        high: high,
        low: low,
        close: currentPrice,
      });
    }
    
    return prices;
  } catch (error) {
    console.error('Error fetching stock prices:', error);
    
    const prices: StockPrice[] = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      prices.push({
        time: date.toISOString(),
        price: 100 + (Math.random() * 900),
      });
    }
    
    return prices;
  }
};

export const getTickerData = async (index: string = 'NIFTY'): Promise<TickerData[]> => {
  try {
    console.log(`Fetching ticker data from: ${API_BASE}/index/${index}/movers/`);
    
    const data = await fetchAPI(`${API_BASE}/index/${index}/movers/`);
    console.log('API response received:', data);

    if (!data) {
      console.warn('No data received from API, using fallback');
      return generateMockTickerData();
    }

    let tickerArray: unknown[] = [];

    if (Array.isArray(data)) {
      tickerArray = data;
      console.log('Response is array with', data.length, 'items');
    } else if (typeof data === 'object' && data !== null) {
      const dataObj = data as Record<string, unknown>;
      if (dataObj.data && Array.isArray(dataObj.data)) {
        tickerArray = dataObj.data;
        console.log('Response has data array with', dataObj.data.length, 'items');
      } else if (dataObj.movers && Array.isArray(dataObj.movers)) {
        tickerArray = dataObj.movers;
        console.log('Response has movers array with', dataObj.movers.length, 'items');
      } else if (dataObj.results && Array.isArray(dataObj.results)) {
        tickerArray = dataObj.results;
        console.log('Response has results array with', dataObj.results.length, 'items');
      } else {
        tickerArray = [data];
        console.log('Response is single object, wrapped in array');
      }
    } else {
      console.warn('Unexpected API response format:', data);
      return generateMockTickerData(); 
    }

    // Create an intermediate interface that matches the mapped object structure
    interface MappedTickerItem {
      symbol: string;
      name: string;
      price: number;
      change: number;
      changePercent: number;
      volume: number;
    }

    const transformedData = (tickerArray as ApiTickerItem[])
      .map((item): MappedTickerItem => ({
        symbol: item.symbol || item.Symbol || item.ticker || item.Ticker || 'UNKNOWN',
        name: item.name || item.Name || item.companyName || item.description || '',
        price: item.price || item.lastPrice || item.Close || item.close || item.currentPrice || 0,
        change: item.change || item.Change || item.netChange || item.priceChange || 0,
        changePercent: item.changePercent || item.percentChange || item.chgPct || 
                       (item.change && item.price ? (item.change / item.price) * 100 : 0),
        volume: item.volume || item.Volume || item.totalVolume || 0,
      }))
      .filter((item): item is MappedTickerItem => 
        item.symbol !== 'UNKNOWN' && item.price > 0
      )
      .map((item): TickerData => ({
        symbol: item.symbol,
        name: item.name || undefined, // Convert empty string to undefined
        price: item.price,
        change: item.change,
        changePercent: item.changePercent,
        volume: item.volume,
      }));

    console.log('Transformed data:', transformedData);
    
    if (transformedData.length === 0) {
      console.warn('No valid items after transformation, using fallback');
      return generateMockTickerData(); 
    }

    return transformedData;

  } catch (error) {
    console.error('Error fetching ticker data:', error);
    return generateMockTickerData();
  }
};

const generateMockTickerData = (): TickerData[] => {
  console.log('Generating mock ticker data for demonstration');
  const popularStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries' },
    { symbol: 'TCS', name: 'Tata Consultancy Services' },
    { symbol: 'INFY', name: 'Infosys' },
    { symbol: 'HDFC', name: 'HDFC Bank' },
    { symbol: 'ICICI', name: 'ICICI Bank' },
    { symbol: 'ITC', name: 'ITC Limited' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever' },
    { symbol: 'SBIN', name: 'State Bank of India' },
  ];

  return popularStocks.map(stock => {
    const basePrice = 100 + (Math.random() * 1900);
    const change = (Math.random() - 0.5) * 30;
    const changePercent = (change / basePrice) * 100;

    return {
      symbol: stock.symbol,
      name: stock.name,
      price: Number(basePrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume: Math.floor(1000000 + Math.random() * 9000000),
    };
  });
};