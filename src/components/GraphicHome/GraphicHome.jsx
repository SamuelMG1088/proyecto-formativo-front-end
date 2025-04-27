import React from 'react';
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import './css/graphicHome.css'; // Import the CSS file
import '../../styles/variables.css' // import variable

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const GraphicHome = () => {
  const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Execution Percentage',
        data: [10, 25, 45, 30, 45, 80, 53, 30, 20, 40, 70, 60],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)', // Slightly more opacity for better visibility on white
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4CAF50',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip for white background
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#333', // Darker text for white background
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Darker grid lines for white background
          borderDash: [3, 3],
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#333', // Darker text for white background
          callback: function(value) {
            return value + '%';
          },
          stepSize: 20,
        },
        min: 0,
        max: 100,
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-wrapper">
      <div className="card">
        <div className="header">
          <h2 className="title">En Ejecución</h2>
          <div className="date-selector">
            <span className="date-text">October</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        
        <div className="chart-container">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default GraphicHome;