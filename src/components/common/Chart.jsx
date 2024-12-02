import React from 'react';
import ReactApexChart from 'react-apexcharts';


const Chart = () => {
    const chartOptions = {
        // Define your chart options here
        chart: {
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom:{
                enabled: false,
            },

            events:{

                dataPointSelection: function(e, chart, opts) {
                    console.log(e, opts)
                }
            }
        },
        series: [
            {
                name: 'Series 1',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125,30, 40, 35, 50, 49, 60, 70, 91, 125],
            },        {
                name: 'Series 2',
                data: [60, 20, 38, 44, 99, 45, 10, 77, 12,60, 20, 38, 44, 99, 45, 10, 77, 12],
            },
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },

        selection:{
            enabled: true,
            type: 'x',
            stroke:{
                width: 2,
            }
        },
        tooltip: {
            intersect: true,
            shared: false
        },
        markers: {
            size: 6,
        },

        dataLabels: {
            enabled: false
        },

        // stroke:
        //     {curve: "smooth",}

    };

    const pieOptions = {
        // Define your chart options here

        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };


    return (
        <>
            <div style={{width: '1080px', display:"flex"}}>
                <ReactApexChart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="line"
                    height={350}
                    width={500}
                />


                <ReactApexChart
                    options={pieOptions.options}
                    series={pieOptions.series}
                    type="pie"
                    height={350}
                    width={500}
                />
            </div>
        </>


    );
};

export default Chart;