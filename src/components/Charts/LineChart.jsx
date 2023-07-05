import React from 'react';
import Chart from 'react-apexcharts';
const LineChart = ({ employees }) => {
    // Calculate the age of each employee
    const currentDate = new Date();
    const ageData = employees.map((employee) => {
        const birthDate = new Date(employee.birthDate);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age;
    });

    // Group employees into age intervals and count the number of employees in each interval
    const ageIntervals = ['20-29', '30-39', '40-49', '50-59', '60+'];
    const ageCounts = ageIntervals.map((interval) => {
        const [start, end] = interval.split('-').map(Number);
        const count = ageData.filter((age) => age >= start && age <= end).length;
        return count;
    });

    // Prepare data in the format expected by ApexCharts
    const chartData = ageIntervals.map((interval, index) => ({
        x: interval,
        y: ageCounts[index],
    }));

    // Configure ApexCharts options
    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false, // Hide the toolbar
            },
            events: {},
            theme: {
                palette: 'palette1',
            },
        },
        xaxis: {
            categories: ageIntervals,
        },
        yaxis: {
            title: {
                text: 'Employee Count',
            },
        },
        title: {
            text: 'Age Distribution',
            align: 'center',
        },
    };

    return (
        <Chart
            options={chartOptions}
            series={[{ data: chartData }]}
            type="line"
            width="100%"
            height="300px"
        />
    );
};

export default LineChart;