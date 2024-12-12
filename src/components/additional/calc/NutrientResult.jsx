import { useEffect } from "react";


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
    
            if (petData?.species === "고양이") {
                switch(name) {
                    case "조단백질":
                        targetValue = age === "1살미만" ? 30.0 : 26.0;
                        break;
                    case "조지방":
                        targetValue = 9.0;
                        break;
                    case "칼슘":
                        targetValue = age === "1살미만" ? 1.0 : 0.6;
                        break;
                    case "인":
                        targetValue = age === "1살미만" ? 0.8 : 0.5;
                        break;
                }
            } else {
                // 강아지
                switch(name) {
                    case "조단백질":
                        targetValue = age === "1살미만" ? 22.5 : 18.0;
                        break;
                    case "조지방":
                        targetValue = age === "1살미만" ? 8.5 : 5.5;
                        break;
                    case "칼슘":
                        targetValue = age === "1살미만" ? 1.2 : 0.5;
                        break;
                    case "인":
                        targetValue = age === "1살미만" ? 1.0 : 0.4;
                        break;
                }
            }
            
            isTargetMet = convert >= targetValue;
            
            results.push({
                name: name,
                convert: convert,
                isTargetMet: isTargetMet,
                targetValue: targetValue || 0
            });
        });
        
        return results;
    };

    return (
        <div>
            {getNutrientAnalysis(petData?.age).map((result, index) => {

                return (
                    <div>
                        <span>{result.name} </span>
                        <span>{result.targetValue} </span>
                        <span>{result.convert} </span>
                        <span>{result.isTargetMet ? "충족" : "미충족"}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default NutrientResult;