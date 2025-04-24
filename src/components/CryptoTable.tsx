import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';
import CryptoRow from './CryptoRow';
import { ArrowUpDown } from 'lucide-react';

type SortKey = 'rank' | 'price' | 'change1h' | 'change24h' | 'change7d' | 'marketCap' | 'volume24h';
type SortOrder = 'asc' | 'desc';

const CryptoTable: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortHeader: React.FC<{ title: string; sortId: SortKey }> = ({ title, sortId }) => (
    <th 
      className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors whitespace-nowrap"
      onClick={() => handleSort(sortId)}
    >
      <div className="flex items-center">
        <span>{title}</span>
        {sortKey === sortId && (
          <ArrowUpDown 
            size={14} 
            className={`ml-1 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <SortHeader title="#" sortId="rank" />
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Name
            </th>
            <SortHeader title="Price" sortId="price" />
            <SortHeader title="1h %" sortId="change1h" />
            <SortHeader title="24h %" sortId="change24h" />
            <SortHeader title="7d %" sortId="change7d" />
            <SortHeader title="Market Cap" sortId="marketCap" />
            <SortHeader title="24h Volume" sortId="volume24h" />
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Circulating Supply
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {sortedAssets.map(asset => (
            <CryptoRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;