import React from 'react';
import ReactApexChart from 'react-apexcharts';

// const SellerChart = ({data,series, labels , categories, setSelectedIndex}) => {

const SellerChart = ({data,data2,series}) => {


    const chartOptions = {
         options : {
            chart: {
                height: 350,
                type: "line",
            },
            stroke: {
                curve: "smooth",
                width: [3, 3], // 라인의 두께 설정
            },
            dataLabels: {
                enabled: false, // 데이터 라벨 비활성화
            },
            colors: ["#008FFB", "#00E396"], // 데이터 세트 색상
            xaxis: {
                categories: [1, 2, 3, 4, 5], // X축 레이블
            },
            yaxis: [
                {
                    title: {
                        text: "Dataset 1",
                    },
                    labels: {
                        show:false,
                        style: {
                            colors: "#008FFB",
                        },
                    },
                },
                {
                    opposite: true, // 두 번째 Y축을 오른쪽에 표시
                    title: {
                        text: "Dataset 2",
                    },
                    labels: {
                        show:false,
                        style: {
                            colors: "#00E396",
                        },
                    },
                },
            ],
            tooltip: {
                shared: true,
                intersect: false, // 포인트 교차하지 않음
            },
        },

         series : [
            {
                name: "Dataset 1",
                data: [1000000, 2000000, 3000000, 4000000, 1000000], // 첫 번째 데이터 세트
            },
            {
                name: "Dataset 2",
                data: [1, 4, 1, 2, 1], // 두 번째 데이터 세트
            },
        ]
    }

    return <ReactApexChart options={chartOptions.options}
                           series={chartOptions.series} type="line"
                           width={500}
                           height={350} />;


};




export default SellerChart;