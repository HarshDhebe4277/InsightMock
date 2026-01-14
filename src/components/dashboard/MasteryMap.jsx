import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Card from '../ui/Card';
import './MasteryMap.css';

// Register ChartJS components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const MasteryMap = ({ masteryData }) => {
    const chartRef = useRef(null);

    // Prepare data for the radar chart
    const patterns = Object.keys(masteryData);
    const scores = Object.values(masteryData);

    const data = {
        labels: patterns,
        datasets: [
            {
                label: 'Pattern Mastery',
                data: scores,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: (context) => `Mastery: ${context.parsed.r}%`,
                },
            },
        },
        scales: {
            r: {
                min: 0,
                max: 100,
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                    color: 'rgba(255, 255, 255, 0.5)',
                    backdropColor: 'transparent',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 12,
                        weight: '500',
                    },
                },
            },
        },
    };

    return (
        <Card className="mastery-map-card">
            <div className="mastery-map-header">
                <h3>📊 Mastery Map</h3>
                <p>Your algorithmic pattern proficiency</p>
            </div>
            <div className="mastery-map-chart">
                <Radar ref={chartRef} data={data} options={options} />
            </div>
        </Card>
    );
};

export default MasteryMap;
