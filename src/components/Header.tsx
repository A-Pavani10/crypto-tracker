import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';
import { BarChart2, TrendingUp, Search } from 'lucide-react';

const Header: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.marketCap, 0);
  
  const formatMarketCap = (value: number) => {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  };

  // Calculate overall market trend (last 24h)
  const marketTrend = assets.reduce((sum, asset) => {
    // Weight by market cap
    return sum + (asset.change24h * (asset.marketCap / totalMarketCap));
  }, 0);

  const trendColorClass = marketTrend >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <header className="bg-gray-900 py-6 px-4 border-b border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <BarChart2 className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-white">CryptoTracker</h1>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search cryptocurrency..."
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-400 mb-1">Total Market Cap</div>
            <div className="text-xl font-bold text-white">{formatMarketCap(totalMarketCap)}</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-400 mb-1">24h Market Trend</div>
            <div className={`text-xl font-bold flex items-center ${trendColorClass}`}>
              <TrendingUp className={`h-5 w-5 mr-1 ${marketTrend >= 0 ? '' : 'rotate-180'}`} />
              {Math.abs(marketTrend).toFixed(2)}%
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-400 mb-1">Assets Tracked</div>
            <div className="text-xl font-bold text-white">{assets.length}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;