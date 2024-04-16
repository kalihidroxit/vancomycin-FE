import React, { useEffect, useRef } from 'react';
import {ChartDataType} from "./ChartData.type";
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import resetIcon from './asset/reset-svgrepo-com.svg';
import {Mode} from "chartjs-plugin-zoom/types/options";

Chart.register(...registerables, zoomPlugin);

function LineChart( data: ChartDataType ) {
    const chartRef = useRef(null);

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: '2 - Compartment Model',
                data: data.datasets[0].data,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.8)',
                pointRadius: 0,
                borderWidth: 3,
            },
        ],
    };

    const mode: Mode = 'x';

    const options = {
        responsive: true,
        tooltips: {enabled: true},
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: false
                    },
                    drag: {
                        enabled: true,
                        mode: 'x',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    onZoom: ({ chart }) => {
                        chart.canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                    },
                    onZoomComplete: ({ chart }) => {
                        chart.canvas.style.backgroundColor = '';
                    }
                },
                pan: {
                    enabled: true,
                    mode: mode
                }
            },
            legend: {
                position: "right" as const,
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: "Time (hours)",
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: "Concentration (mg/L)",
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    font: {
                        size: 16
                    }
                }
            }
        }
    };

    useEffect(() => {
        const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options
        });
        chartRef.current = chartInstance;

        return () => {
            chartInstance.destroy();
        };
    }, [chartData, options]);

    const resetZoom = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    return (
        <div className="chart-container" style={{position: 'relative'}}>
            <canvas id="myChart" width={'100%'} height={'100%'}></canvas>
            <button style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                zIndex: 1000,
                transition: 'transform 0.3s ease-in-out' // Add this line
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} // Add this line
            onMouseOut={(e) => e.currentTarget.style.transform = ''} // And this line
            onClick={resetZoom}>
                <img src={resetIcon} alt="Reset Zoom" width="30" height="30"/>
            </button>
        </div>
    );
}

export default LineChart;