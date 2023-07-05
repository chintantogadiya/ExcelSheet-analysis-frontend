import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ employees }) => {

    const parseSalary = (salary) => {
        const numericString = salary.replace(/[^0-9.-]+/g, '');
        return parseInt(numericString, 10);
    };

    const skillsData = employees.reduce((acc, employee) => {
        employee.skills.forEach((skill) => {
            const individualSkills = skill.split(", ");
            individualSkills.forEach((individualSkill) => {
                const normalizedSkill = individualSkill.toLowerCase();
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

    const pieChartOptions = {
        labels: Object.keys(skillsData),
        legend: {
            show: true,
            position: 'left',
        },
        theme: {
            palette: 'palette1'
        }
    };

    const pieChartSeries = Object.values(skillsData).map(data => data.count);

    return (
        <div>
            <ReactApexChart
                options={pieChartOptions}
                series={pieChartSeries}
                type="pie"
                height={400}
            />
        </div>
    );
};

export default PieChart;
