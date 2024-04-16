import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
    }[];
}

const LineChartComponent = () => {
    const [chartData , setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                label: 'My First dataset',
                data: [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            }
        ]
    });

    // Assume this function gets data from your backend
    const fetchDataFromBackend = async () => {
        // Replace this with actual fetch from backend
        return {
            x: ['January', 'February', 'March', 'April', 'May'],
            y: [65, 59, 80, 81, 56]
        };
    };

    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchDataFromBackend();
            setChartData({
                labels: data.x,
                datasets: [
                    {
                        label: 'My First dataset',
                        data: data.y,
                        fill: false,
                        backgroundColor: 'rgb(75, 192, 192)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        };

        fetchAndSetData().then(r => console.log('Data fetched and set'));
    }, []);

    return (
        <div>
            {<Line data={chartData} />}
        </div>
    );
};

export default LineChartComponent;
