'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockPrice } from '@/utils/api';

interface StockGraphProps {
  data: StockPrice[];
  symbol: string;
}

const StockGraph = ({ data }: StockGraphProps) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tickFormatter={(time) => {
              const date = new Date(time);
              return date.toLocaleDateString();
            }}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip 
            formatter={(value) => [`₹${value}`, 'Price']}
            labelFormatter={(label) => `Time: ${new Date(label).toLocaleString()}`}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;