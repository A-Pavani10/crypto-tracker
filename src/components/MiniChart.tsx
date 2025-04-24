import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface MiniChartProps {
  data: number[];
  change7d: number;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, change7d }) => {
  const isPositive = change7d >= 0;
  const lineColor = isPositive ? '#10B981' : '#EF4444';
  
  // Last 7 days labels
  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.getDate().toString();
  });

  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: lineColor,
        backgroundColor: `${lineColor}20`,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className="h-12 w-24">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MiniChart;