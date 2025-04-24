import React, { memo } from 'react';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import { CryptoAsset } from '../types/crypto';

interface CryptoRowProps {
  asset: CryptoAsset;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ asset }) => {
  const {
    rank,
    logo,
    name,
    symbol,
    price,
    change1h,
    change24h,
    change7d,
    marketCap,
    volume24h,
    circulatingSupply,
    maxSupply,
    chartData,
  } = asset;

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  // Format price with appropriate decimals
  const formatPrice = (p: number) => {
    if (p < 0.01) return `$${p.toFixed(6)}`;
    if (p < 1) return `$${p.toFixed(4)}`;
    if (p < 10) return `$${p.toFixed(3)}`;
    if (p < 1000) return `$${p.toFixed(2)}`;
    return `$${p.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-150">
      <td className="py-4 px-3 text-center text-gray-400">{rank}</td>
      <td className="py-4 px-3">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-8 h-8 mr-3"
            onError={(e) => {
              // Fallback for logo loading errors
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32';
            }}
          />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-400">{symbol}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 font-mono font-medium">{formatPrice(price)}</td>
      <td className="py-4 px-3"><PriceChange value={change1h} /></td>
      <td className="py-4 px-3"><PriceChange value={change24h} /></td>
      <td className="py-4 px-3"><PriceChange value={change7d} /></td>
      <td className="py-4 px-3 text-gray-300 font-mono">{formatNumber(marketCap)}</td>
      <td className="py-4 px-3 text-gray-300 font-mono">{formatNumber(volume24h)}</td>
      <td className="py-4 px-3">
        <div className="text-gray-300 font-mono">
          {circulatingSupply.toLocaleString()} {symbol}
        </div>
        {maxSupply && (
          <div className="text-xs text-gray-400 mt-1">
            Max: {maxSupply.toLocaleString()} {symbol}
          </div>
        )}
      </td>
      <td className="py-4 px-3">
        <MiniChart data={chartData} change7d={change7d} />
      </td>
    </tr>
  );
};

export default memo(CryptoRow);