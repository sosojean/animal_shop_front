import React from 'react';
import ReactApexChart from 'react-apexcharts';


const Chart = ({data,series, labels , categories, setSelectedIndex}) => {
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
                    setSelectedIndex(opts.selectedDataPoints[0][0]?opts.selectedDataPoints[0][0]:0)
                }
            }
        },
        series: [
            {
                name: 'Series 1',
                data: data,
            },
        ],
        xaxis: {
            categories:categories ,
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

        series: series,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: labels,
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
            <div style={{width: '1080px', display:"flex" ,justifyContent:"space-between"}}>
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