import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({ employees }) => {
    const employeeStatusData = employees.reduce((acc, employee) => {
        if (acc[employee.employeeStatus]) {
            acc[employee.employeeStatus]++;
        } else {
            acc[employee.employeeStatus] = 1;
        }
        return acc;
    }, {});

    // Donut Chart Options
    const donutChartOptions = {
        labels: Object.keys(employeeStatusData),
    };

    // Donut Chart Series
    const donutChartSeries = Object.values(employeeStatusData);
    
    return (
        <ReactApexChart
            options={donutChartOptions}
            series={donutChartSeries}
            type="donut"
            height={300}
        />
    );
};

export default DonutChart;
