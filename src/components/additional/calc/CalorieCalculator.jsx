import { useState } from "react";
import CalorieInput from "./CalorieInput";
import CalorieResult from "./CalorieResult";


const CalorieCalculator = () => {

    const [calcData, setCalcData] = useState(); 
    const [amount, setAmount] = useState(0);
    const [showFeeding, setShowFeeding] = useState(false);
        // {species: "dog", birth: "20200120", size: "small"}

    return (
        <div>
            <h1>칼로리 계산기</h1>
            <CalorieInput calcData={calcData} setCalcData={setCalcData}
                showFeeding={showFeeding} setShowFeeding={setShowFeeding}
                amount={amount} setAmount={setAmount}/>
            <CalorieResult calcData={calcData} amount={amount} showFeeding={showFeeding}/>              
        </div>
    )
}

export default CalorieCalculator;