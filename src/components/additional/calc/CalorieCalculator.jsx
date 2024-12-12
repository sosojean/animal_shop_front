import { useState } from "react";
import CalorieInput from "./CalorieInput";
import CalorieResult from "./CalorieResult";


const CalorieCalculator = () => {

    const [calcData, setCalcData] = useState();
        // {species: "dog", birth: "20200120", size: "small"}

    return (
        <div>
            <h1>칼로리 계산기</h1>
            <CalorieInput calcData={calcData} setCalcData={setCalcData}/>
            <CalorieResult calcData={calcData}/>
        </div>
    )
}

export default CalorieCalculator;