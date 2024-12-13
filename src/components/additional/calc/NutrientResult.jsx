import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const NutrientResult = (props) => {

    const {petData, nutrientData} = props;
    // state {name: 조단백질, convert: ??, isTargetMet: true, 기준치 기입 필요}

    const getEliminateWater = (value, water) => {
        const result = value / (1 - water/100);
        return Math.round(result * 100) / 100;
    }

    const getNutrientAnalysis = (age) => {
        const nutrient = nutrientData;
        const waterIndex = nutrient.findIndex(nu => nu.name === "수분");
        const water = nutrient[waterIndex]?.value || 0;
        
        const nutrients = ["조단백질", "조지방", "칼슘", "인"];
        let results = [];
        
        if (!age) return "나이를 작성해주세요";
    
        nutrients.forEach(name => {
            const index = nutrient.findIndex(nu => nu.name === name);
            const value = nutrient[index]?.value || 0;
            const convert = getEliminateWater(value, water);
            
            let targetValue;
            let isTargetMet = false;
            let maxValue = null;
    
            if (petData?.species === "고양이") {
                switch(name) {
                    case "조단백질":
                        targetValue = age === "1살미만" ? 30.0 : 26.0;
                        maxValue = null;
                        break;
                    case "조지방":
                        targetValue = 9.0;
                        maxValue = null;
                        break;
                    case "칼슘":
                        targetValue = age === "1살미만" ? 1.0 : 0.6;
                        maxValue = null;
                        break;
                    case "인":
                        targetValue = age === "1살미만" ? 0.8 : 0.5;
                        maxValue = null;
                        break;
                }
            } else {
                // 강아지
                switch(name) {
                    case "조단백질":
                        targetValue = age === "1살미만" ? 22.5 : 18.0;
                        maxValue = null; // 최대치 없음
                        break;
                    case "조지방":
                        targetValue = age === "1살미만" ? 8.5 : 5.5;
                        maxValue = null; // 최대치 없음
                        break;
                    case "칼슘":
                        targetValue = age === "1살미만" ? 1.2 : 0.5;
                        if (petData?.isLarge && age === "1살미만") maxValue = 1.8;
                        else maxValue = 2.5;
                        break;
                    case "인":
                        targetValue = age === "1살미만" ? 1.0 : 0.4;
                        maxValue = 1.6;
                        break;
                }
            }
            
            if (maxValue !== null) {
                isTargetMet = convert >= targetValue && convert < maxValue
            } else {
                isTargetMet = convert >= targetValue;   
            }
            
            results.push({
                name: name,
                convert: convert,
                isTargetMet: isTargetMet,
                targetValue: targetValue || 0,
                maxValue: maxValue
            });
        });
        
        return results;
    };

    // 칼슘 인 비율 
    const getRate = () => {
        const nutrientResults = getNutrientAnalysis(petData?.age);
        // console.log("nutrientResults", nutrientResults)

        const calciumIndex = nutrientResults.findIndex((result, index) => {
            return result.name === "칼슘"});
        const phosphorusIndex = nutrientResults.findIndex((result, index) => {
            return result.name === "인"});

        const calcium = nutrientResults[calciumIndex].convert;
        const phosphorus = nutrientResults[phosphorusIndex].convert;

        const rate = calcium/phosphorus;
        let isTargetMet;

        switch(petData?.species) {
            case "고양이":
                switch(petData?.age) {
                    case "1살미만":
                        isTargetMet = rate >= 1/0.8 ? "충족" : "미충족";
                        return isTargetMet;
                    case "성견/성묘":
                        isTargetMet = rate >= 1/0.83 ? "충족" : "미충족";
                        return isTargetMet;
                    default:
                        return "아기 고양이인지 성묘인지 표시해주세요"
                }
            case "강아지":
                switch(petData?.age) {
                    case "1살미만":
                        isTargetMet = 2 > (rate >= 1 && rate < 2) ? "충족" : "미충족";
                        return isTargetMet;
                    case "성견/성묘":
                        isTargetMet = 2 > (rate >= 1 && rate < 2) ? "충족" : "미충족";
                        return isTargetMet;
                    default:
                        return "아기 강아지인지 성견인지 표시해주세요"
                }
            default:
                return "강아지인지 고양이인지 표시해주세요"
        }

    }

    const results = getNutrientAnalysis(petData?.age);

    const macroOptions = {
        chart: {
            height: 250,
            type: 'bar',
            toolbar: { show: false }
        },
        series: [{
            name: '대량영양소',
            data: [
                {
                    x: '조단백질',
                    y: results.find(item => item.name === "조단백질")?.convert,
                    goals: [{
                        name: '기준치',
                        value: results.find(item => item.name === "조단백질")?.targetValue,
                        strokeHeight: 5,
                        strokeColor: '#FEB019'
                    }]
                },
                {
                    x: '조지방',
                    y: results.find(item => item.name === "조지방")?.convert,
                    goals: [{
                        name: '기준치',
                        value: results.find(item => item.name === "조지방")?.targetValue,
                        strokeHeight: 5,
                        strokeColor: '#FEB019'
                    }]
                }
            ]
        }],
        colors: ['#008FFB'],
        yaxis: {
            min: 0,
            max: 35,
            title: { text: "대량영양소 (%)" }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val.toFixed(1) + '%'
        }
    };

    const microOptions = {
        chart: {
            height: 250,
            type: 'bar',
            toolbar: { show: false }
        },
        series: [{
            name: '미량영양소',
            data: [
                {
                    x: '칼슘',
                    y: results.find(item => item.name === "칼슘")?.convert,
                    goals: [
                        {
                            name: '기준치',
                            value: results.find(item => item.name === "칼슘")?.targetValue,
                            strokeHeight: 5,
                            strokeColor: '#FEB019'
                        },
                        {
                            name: '최대치',
                            value: results.find(item => item.name === "칼슘")?.maxValue,
                            strokeHeight: 5,
                            strokeColor: '#FF4560'
                        }
                    ]
                },
                {
                    x: '인',
                    y: results.find(item => item.name === "인")?.convert,
                    goals: [
                        {
                            name: '기준치',
                            value: results.find(item => item.name === "인")?.targetValue,
                            strokeHeight: 5,
                            strokeColor: '#FEB019'
                        },
                        {
                            name: '최대치',
                            value: results.find(item => item.name === "인")?.maxValue,
                            strokeHeight: 5,
                            strokeColor: '#FF4560'
                        }
                    ]
                }
            ]
        }],
        colors: ['#00E396'],
        yaxis: {
            min: 0,
            max: 3,
            title: { text: "미량영양소 (%) - 칼슘:인 비율 " + getRate() }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val.toFixed(1) + '%'
        }
    };

    return (
        <div>
            {/* {getNutrientAnalysis(petData?.age).map((result, index) => {

                return (
                    <div>
                        <span>{result.name} </span>
                        <span>{result.targetValue} </span>
                        <span>{result.convert} </span>
                        <span>{result.isTargetMet ? "충족" : "미충족"}</span>
                    </div>
                )
            })}
            <div>{getRate()}</div> */}
            <div>
                {/* 기존 결과 표시 부분 */}
                <div style={{ marginBottom: '20px', width: '50%' }}>
                    <ReactApexChart 
                        options={macroOptions} 
                        series={macroOptions.series} 
                        type="bar" 
                        height={250} 
                    />
                </div>
                <div style={{ width: '50%' }}>
                    <ReactApexChart 
                        options={microOptions} 
                        series={microOptions.series} 
                        type="bar" 
                        height={250} 
                    />
                </div>
            </div>
        </div>
    )
}

export default NutrientResult;