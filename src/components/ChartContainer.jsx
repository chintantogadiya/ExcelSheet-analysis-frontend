import React from 'react';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import MultiLineChart from './Charts/MuiltiLineChart';
import DonutChart from './Charts/DonutChart';
const ChartContainer = ({ employees }) => {
    return (
        <>
            <div className="box-container">
                <div className="box-item">
                    <div>
                        <h2>Skills Distribution</h2>
                        <PieChart employees={employees} />
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        <h2>Employee Status</h2>
                        <DonutChart employees={employees} />
                    </div>
                </div>
                <div className="box-item">
                    <div >
                        <h2>Employee Count by Joining Year</h2>
                        <BarChart employees={employees} />
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        <h2>Age Distribution</h2>
                        <LineChart employees={employees} />
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        <h2>Salary Trends</h2>
                        <MultiLineChart employees={employees} />
                    </div>
                </div>
            </div>
        </>
    )

}


export default ChartContainer;