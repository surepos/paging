import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

type GraphProps = {
  labels: string[];
  dataPoints: number[];
  title?: string;
  lineColor?: string;
  pointColor?: string;
  xTitle?: string;
  yTitle?: string;
};

export default function Graph({
  labels,
  dataPoints,
  title = 'Page Faults Over Time',
  xTitle = 'Memory Access Sequence',
  yTitle = 'Page Faults'
}: GraphProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Page Faults',
        data: dataPoints,
        borderColor: '#0275ff',
        backgroundColor: 'rgba(2, 117, 255, 0.2)',
        tension: 0.3,
        pointBackgroundColor: '#000',
        borderWidth: 2,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb'
        }
      },
      title: {
        display: true,
        text: title,
        color: '#f3f4f6',
        font: {
          size: 16
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xTitle,
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        title: {
          display: true,
          text: yTitle,
          color: '#9ca3af'
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    }
  };

  return (
    <div className="bg-dark-secondary rounded-xl p-6 mb-8 border border-neutral-700 shadow-lg max-w-7xl flex items-center justify-center">
      <Line data={data} options={options} className="w-full h-full"/>
    </div>
  );
}