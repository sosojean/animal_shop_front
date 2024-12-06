import React from 'react';
import ReactApexChart from 'react-apexcharts';

// const SellerChart = ({data,series, labels , categories, setSelectedIndex}) => {

const SellerChart = ({data,data2,categories,setSelectedIndex}) => {


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
                        console.log(e,chart,opts)
                        setSelectedIndex(opts.dataPointIndex?opts.dataPointIndex:0)

                        //     opts.selectedDataPoints[0][0]:0)
                    }
                }
            },


         series : [
            {
                name: "Dataset 1",
                data: data, // 첫 번째 데이터 세트
            },
            {
                name: "Dataset 2",
                data: data2, // 두 번째 데이터 세트
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

    }

    return <ReactApexChart options={chartOptions}
                           series={chartOptions.series}
                           type="line"
                           width={500}
                           height={350} />;


};




export default SellerChart;