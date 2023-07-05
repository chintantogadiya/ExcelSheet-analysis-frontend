import React from 'react';
import Chart from 'react-apexcharts';

const MuiltiLineChart = ({ employees }) => {

    // Helper function to parse salary string and convert it to a number
    const parseSalary = (salary) => {
        const numericString = salary.replace(/[^0-9.-]+/g, '');
        return parseInt(numericString, 10);
    };

    // Prepare data for the chart
    const skillsData = employees.reduce((acc, employee) => {
        employee.skills.forEach((skill) => {
            const individualSkills = skill.split(", "); // Split skills by comma and space
            individualSkills.forEach((individualSkill) => {
                const normalizedSkill = individualSkill.toLowerCase(); // Normalize skill by converting to lowercase
                if (acc[normalizedSkill]) {
                    acc[normalizedSkill].count++;
                    acc[normalizedSkill].totalSalary += parseSalary(employee.salaryDetails);
                } else {
                    acc[normalizedSkill] = {
                        count: 1,
                        totalSalary: parseSalary(employee.salaryDetails),
                    };
                }
            });
        });
        return acc;
    }, {});

    const skillLabels = Object.keys(skillsData);
    const averageSalaries = Object.values(skillsData).map(
        (skillData) => skillData.totalSalary / skillData.count
    );
    const employeeCounts = Object.values(skillsData).map(
        (skillData) => skillData.count
    );

    

    // Chart options
    const options = {
        chart: {
            toolbar: {
                show: false,
            },
            events: {},
        },
        theme: {
            palette: 'palette1',
        },
        legend: {
            position: 'top',
        },
        xaxis: {
            categories: skillLabels,
            labels: {
                rotate: -45,
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Salary (in dollars)',
                },
                labels: {
                    formatter: (value) => `$${value}`,
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Number of Employees',
                },
                labels: {

                    formatter: function (value) {
                        return Math.round(value);
                    },
                }
            },
        ],
    };

    // Chart series data
    const series = [
        {
            name: 'Average Salary',
            type: 'bar',
            data: averageSalaries,
        },
        {
            name: 'Number of Employees',
            type: 'line',
            data: employeeCounts,
            yAxisIndex: 1,
        },
    ];

    return (
        <div>
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );

};

export default MuiltiLineChart;