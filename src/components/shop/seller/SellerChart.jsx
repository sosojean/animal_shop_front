import React from 'react';
import ReactApexChart from 'react-apexcharts';

// const SellerChart = ({data,series, labels , categories, setSelectedIndex}) => {

const SellerChart = ({data,data2,categories,setSelectedIndex}) => {


    const chartOptions = {
        title:{text:"장바구니/구매 건수 추이"},

            // Define your chart options here
            chart: {

                animations: {
                    enabled: false},
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
                name: "판매건수",
                data: data, // 첫 번째 데이터 세트
            },
            {
                name: "장바구니 담긴 횟수",
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