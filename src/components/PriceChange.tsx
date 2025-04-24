import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChangeProps {
  value: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value }) => {
  const isPositive = value >= 0;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
  const Icon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <div className={`flex items-center ${colorClass} font-medium transition-colors duration-300`}>
      <Icon size={16} className="mr-1" />
      <span className="tabular-nums">{value.toFixed(2)}%</span>
    </div>
  );
};

export default PriceChange;