import { useState } from "react";
import NutrientInput from "./NutrientInput";
import NutrientResult from "./NutrientResult";


const NutrientCalculator = () => {

    const [petData, setPetData] = useState();
    const [nutrientData, setNutrientData] = useState([]);
    const [showResult, setShowResult] = useState(false);

    return (
        <div>
            <h1>사료 영양성분 계산기</h1>
            <NutrientInput petData={petData} setPetData={setPetData}
                nutrientData={nutrientData} setNutrientData={setNutrientData}
                showResult={showResult} setShowResult={setShowResult}/>
            {showResult &&
                <NutrientResult petData={petData} nutrientData={nutrientData}/>
            }  
        </div>
    )
}

export default NutrientCalculator;