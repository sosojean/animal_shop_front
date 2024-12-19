import React from 'react';
import Chart from 'react-apexcharts';


const TestComp = ({data, selectedMonth}) => {


    // const data = [
    //     {name: '상품 1', options: {a: 400, b: 240, c: 100}},
    //     {name: '상품 2', options: {e: 300, f: 200, g: 150}},
    //     {name: '상품 3', options: {h: 500, i: 300}},
    //     {name: '상품 4', options: {j: 700, k: 400, l: 350}},
    //     {name: '상품 5', options: {o: 600, p: 400, q: 350}},
    //
    // ];

// 모든 옵션 이름을 추출 (중복 제거)
    const allOptions = [
        ...new Set(data.flatMap(item => Object.keys(item.options)))
    ];


// series 데이터 준비
    const series = allOptions.map(option => ({
        name: option,
        data: data.map(item => item.options[option] || 0), // 해당 옵션이 없으면 0으로 처리
    }));

// 차트 옵션 설정
    const chartOptions = {
        title:{text:`${selectedMonth} 월 상품 판매액`},
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            animations: {
                enabled: false},
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        xaxis: {
            categories: data.map(item => item.name), // 상품명
        },
        fill: {
            opacity: 1,
        },

        legend: {
            show: false
        },
    };

    return (
        <div>
            <Chart options={chartOptions}
                   series={series}
                   type="bar"
                   width={500}
                   height={350}/>
        </div>
    );

}
export default TestComp;

