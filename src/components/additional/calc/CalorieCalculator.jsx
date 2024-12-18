import { useState } from "react";
import CalorieInput from "./CalorieInput";
import CalorieResult from "./CalorieResult";
import "../../../assets/styles/additional/calorieCalc.scss"

const CalorieCalculator = () => {

    const [calcData, setCalcData] = useState(); 
    const [amount, setAmount] = useState(0);
    const [showFeeding, setShowFeeding] = useState(false);
        // {species: "dog", birth: "20200120", size: "small"}

    return (
        <div className="calrorie-calc">
            <h1 className="calrorie-calc-header">칼로리 계산기</h1>
            <div className="calrorie-calc-section">
                <CalorieInput calcData={calcData} setCalcData={setCalcData}
                    showFeeding={showFeeding} setShowFeeding={setShowFeeding}
                    amount={amount} setAmount={setAmount}/>
                <CalorieResult calcData={calcData} amount={amount} showFeeding={showFeeding}/>    
            </div>
          
        </div>
    )
}

export default CalorieCalculator;