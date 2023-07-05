import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ employees }) => {
    // Extracting the year from the joiningDate for each employee
    const yearData = employees.map((employee) => {
        const joinDate = new Date(employee.joiningDate);
        return joinDate.getFullYear();
    });

    // Counting the number of employees joined in each year
    const yearCount = yearData.reduce((acc, year) => {
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});

    // Extracting the years and counts as separate arrays
    const years = Object.keys(yearCount);
    const counts = Object.values(yearCount);

    // Bar Chart options
    const chartOptions = {
        chart: {
            type: 'bar',
            events: {},
            theme: {
                palette: 'palette1',
            },
            toolbar: {
                show: false, // Hide the toolbar
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
            },
        },
        xaxis: {
            categories: years,
        },
    };

    // Bar Chart series
    const chartSeries = [
        {
            name: 'Employee Count',
            data: counts,
        },
    ];

    return (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
    );

};

export default BarChart;