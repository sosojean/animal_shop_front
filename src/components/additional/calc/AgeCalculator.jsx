import { useState } from "react";
import AgeInput from "./AgeInput";
import AgeResult from "./AgeResult";


const AgeCalculator = () => {

    const [calcData, setCalcData] = useState();
        // {species: "dog", birth: "20200120", size: "small"}

    return (
        <div>
            <h1>나이 계산기</h1>
            <AgeInput
                calcData={calcData} setCalcData={setCalcData}
            />
            <AgeResult
                calcData={calcData} setCalcData={setCalcData}
            />
        </div>
    )
}

export default AgeCalculator;